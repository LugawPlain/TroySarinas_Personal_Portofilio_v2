import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DASHSCOPE_BASE_URL =
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";
const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ||
  "http://localhost:11434/v1/chat/completions";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:7b-instruct";
const TEST_TIMEOUT_MS = 30_000;

function getMessage(body: unknown) {
  if (!body || typeof body !== "object") return "";
  const message = (body as { message?: unknown }).message;
  return typeof message === "string" ? message.trim() : "";
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const provider = body?.provider;
  const message = getMessage(body);

  if (provider !== "qwen" && provider !== "ollama") {
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  }

  if (!message || message.length > 500) {
    return NextResponse.json(
      { error: "Enter a message between 1 and 500 characters." },
      { status: 400 },
    );
  }

  const endpoint =
    provider === "qwen"
      ? DASHSCOPE_BASE_URL
      : OLLAMA_BASE_URL;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TEST_TIMEOUT_MS);

  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const payload =
      provider === "qwen" || provider === "ollama"
        ? {
        model: provider === "qwen" ? "qwen3.6-flash" : OLLAMA_MODEL,
            messages: [{ role: "user", content: message }],
            stream: false,
            max_tokens: 250,
            temperature: 0.2,
          }
        : {
            message,
            source: "portfolio-admin-provider-test",
            timestamp: new Date().toISOString(),
          };

    if (provider === "qwen") {
      const apiKey = process.env.DASHSCOPE_API_KEY;
      if (!apiKey) {
        return NextResponse.json(
            { error: "DASHSCOPE_API_KEY is not configured." },
          { status: 503 },
        );
      }
      headers.Authorization = `Bearer ${apiKey}`;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });
    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `${provider === "qwen" ? "Qwen" : "n8n"} returned HTTP ${response.status}.`,
          details: responseText.slice(0, 500),
        },
        { status: 502 },
      );
    }

    let responseBody: unknown = responseText;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      // Plain-text n8n responses are valid for this connectivity check.
    }

    const providerReply =
      (provider === "qwen" || provider === "ollama") &&
      typeof responseBody === "object" &&
      responseBody !== null &&
      "choices" in responseBody
        ? (responseBody as { choices?: Array<{ message?: { content?: string } }> })
            .choices?.[0]?.message?.content
        : undefined;

    return NextResponse.json({
      ok: true,
      provider,
      response: providerReply || responseBody,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Provider timed out after 30 seconds."
        : error instanceof Error
          ? error.message
          : "Provider request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}