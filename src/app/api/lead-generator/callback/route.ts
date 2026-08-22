import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.N8N_LEAD_CALLBACK_SECRET;
  const suppliedSecret = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");
  if (!expectedSecret || suppliedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const requestId = typeof body?.request_id === "string" ? body.request_id : "";
  const status = body?.status === "failed" ? "failed" : "complete";
  const rawResults = Array.isArray(body?.results)
    ? body.results
    : Array.isArray(body?.results?.places)
      ? body.results.places
    : Array.isArray(body?.places)
      ? body.places
      : Array.isArray(body) && body[0]?.places
        ? body[0].places
        : [];
  const results = rawResults.slice(0, 10).map((place: Record<string, unknown>) => ({
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
  }));

  if (!requestId || (status === "complete" && rawResults.length === 0)) {
    return NextResponse.json(
      { error: "Invalid callback payload." },
      { status: 400 },
    );
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("lead_generator_requests")
    .update({
      status,
      results: status === "complete" ? results : [],
      error_message:
        status === "failed"
          ? String(body?.error || "Search failed.").slice(0, 500)
          : null,
      completed_at: new Date().toISOString(),
    })
    .eq("id", requestId);

  if (error) {
    console.error("Unable to save lead generator callback:", error);
    return NextResponse.json(
      { error: "Unable to save results." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
