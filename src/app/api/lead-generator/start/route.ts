import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60 * 1000 });
const MAX_RESULTS = 10;
const N8N_TIMEOUT_MS = 30 * 1000;

function normalizeResults(payload: unknown) {
  const body = payload as Record<string, unknown> | null;
  const candidateResults: unknown = Array.isArray(body?.results)
    ? body.results
    : Array.isArray((body?.results as Record<string, unknown> | undefined)?.places)
      ? (body?.results as Record<string, unknown>).places
      : Array.isArray(body?.places)
        ? body.places
        : Array.isArray(payload) && (payload[0] as Record<string, unknown>)?.places
          ? (payload[0] as Record<string, unknown>).places
          : [];
  const rawResults = Array.isArray(candidateResults) ? candidateResults : [];

  return rawResults.slice(0, MAX_RESULTS).map((value) => {
    const place = value as Record<string, unknown>;
    return {
    name:
      typeof place.name === "string"
        ? place.name
        : typeof (place.displayName as Record<string, unknown> | undefined)?.text === "string"
          ? (place.displayName as Record<string, unknown>).text
          : "",
    category:
      typeof place.category === "string"
        ? place.category
        : typeof place.primaryType === "string"
          ? place.primaryType
          : "",
    address: typeof place.address === "string" ? place.address : place.formattedAddress || "",
    phone:
      typeof place.phone === "string"
        ? place.phone
        : place.nationalPhoneNumber || place.internationalPhoneNumber || "",
    website: typeof place.website === "string" ? place.website : place.websiteUri || "",
    rating: place.rating ?? null,
    user_rating_count: place.userRatingCount ?? null,
    business_status: place.businessStatus ?? "",
      google_maps_url: place.google_maps_url || place.googleMapsUri || "",
    };
  });
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    await limiter.check(1, getClientIp(request));
  } catch {
    return NextResponse.json(
      { error: "Please wait before starting another search." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const projectId = typeof body?.projectId === "string" ? body.projectId : "";
  const query = typeof body?.query === "string" ? body.query.trim() : "";
  const location =
    typeof body?.location === "string" ? body.location.trim() : "";

  if (
    !projectId ||
    !query ||
    !location ||
    query.length > 100 ||
    location.length > 100
  ) {
    return NextResponse.json(
      { error: "Enter a business type and location." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.N8N_LEAD_GENERATOR_WEBHOOK;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Lead demo is not configured yet." },
      { status: 503 },
    );
  }

  const supabase = createServiceRoleClient();
  const { data: requestRow, error: insertError } = await supabase
    .from("lead_generator_requests")
    .insert({ project_id: projectId, query, location })
    .select("id")
    .single();

  if (insertError || !requestRow) {
    console.error("Unable to create lead generator request:", insertError);
    return NextResponse.json(
      { error: "Unable to start the search." },
      { status: 500 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_id: requestRow.id,
        project_id: projectId,
        query,
        location,
        max_results: MAX_RESULTS,
        callback_url: `${request.nextUrl.origin}/api/lead-generator/callback`,
      }),
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!webhookResponse.ok) {
      const responseText = await webhookResponse.text();
      throw new Error(
        `n8n returned ${webhookResponse.status}: ${responseText.slice(0, 500)}`,
      );
    }

    const workflowResponse = await webhookResponse.json();
    const results = normalizeResults(workflowResponse);

    if (results.length === 0) {
      throw new Error("n8n returned a successful response without any places");
    }

    const { error: resultError } = await supabase
      .from("lead_generator_requests")
      .update({
        status: "complete",
        results,
        completed_at: new Date().toISOString(),
      })
      .eq("id", requestRow.id);

    if (resultError) throw new Error(`Unable to save workflow results: ${resultError.message}`);
  } catch (error) {
    console.error("Unable to trigger lead generator workflow:", error);
    await supabase
      .from("lead_generator_requests")
      .update({
        status: "failed",
        error_message: "Workflow could not be started.",
      })
      .eq("id", requestRow.id);
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.name === "AbortError"
            ? "The lead search timed out. Please try again later."
            : "Unable to complete the lead search.",
      },
      { status: error instanceof Error && error.name === "AbortError" ? 504 : 502 },
    );
  }

  return NextResponse.json({ requestId: requestRow.id }, { status: 200 });
}
