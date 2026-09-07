import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

const DASHSCOPE_BASE_URL =
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";
const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1/chat/completions";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:7b-instruct";
const MAX_SOURCE_LENGTH = 80_000;
const PROVIDER_TIMEOUT_MS = Number(process.env.AI_GENERATION_TIMEOUT_MS) || 300_000;

type ChatDraft = {
  persona: string;
  suggestedQuestions: string[];
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function validateDraft(value: unknown): ChatDraft {
  if (!value || typeof value !== "object")
    throw new Error("Model returned a non-object.");
  const candidate = value as Record<string, unknown>;
  if (!isString(candidate.persona)) {
    throw new Error(
      `Generated persona failed validation: expected a string, received ${typeof candidate.persona}.`,
    );
  }
  if (candidate.persona.length < 80 || candidate.persona.length > 12_000) {
    throw new Error(
      `Generated persona failed validation: received ${candidate.persona.length} characters; expected 80-12000.`,
    );
  }

  const questions = candidate.suggestedQuestions;
  if (
    !Array.isArray(questions) ||
    questions.length < 3 ||
    questions.length > 6 ||
    !questions.every(
      (question) =>
        isString(question) && question.length >= 8 && question.length <= 160,
    )
  ) {
    throw new Error(
      `Generated suggested questions failed validation: expected 3-6 strings of 8-160 characters, received ${Array.isArray(questions) ? questions.length : typeof questions}.`,
    );
  }

  return {
    persona: candidate.persona,
    suggestedQuestions: questions,
  };
}

function parseModelJson(content: string): unknown {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

async function callProvider(provider: "ollama" | "qwen", prompt: string) {
  const endpoint = provider === "qwen" ? DASHSCOPE_BASE_URL : OLLAMA_BASE_URL;
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (provider === "qwen") {
    if (!process.env.DASHSCOPE_API_KEY)
      throw new Error("DASHSCOPE_API_KEY is not configured.");
    headers.Authorization = `Bearer ${process.env.DASHSCOPE_API_KEY}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        model: provider === "qwen" ? "qwen3.6-flash" : OLLAMA_MODEL,
        messages: [
          {
            role: "system",
            content: "Return only valid JSON. Do not use markdown fences.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
        format: provider === "ollama" ? "json" : undefined,
        stream: false,
        temperature: 0.2,
        max_tokens: 2_500,
      }),
    });
    const responseText = await response.text();
    let body: any = null;
    try {
      body = JSON.parse(responseText);
    } catch {
      // Preserve the raw provider response for the diagnostic below.
    }
    if (!response.ok) {
      const providerMessage =
        body?.error?.message || body?.error || responseText.slice(0, 500);
      throw new Error(
        `Provider returned HTTP ${response.status}: ${String(providerMessage)}`,
      );
    }
    const content = body?.choices?.[0]?.message?.content;
    if (!isString(content)) {
      throw new Error(
        `Provider returned no model content. Response: ${responseText.slice(0, 500)}`,
      );
    }
    return content;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const roleId = body?.roleId;
  const provider = body?.provider === "qwen" ? "qwen" : "ollama";
  if (typeof roleId !== "string") {
    return NextResponse.json({ error: "roleId is required." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const [
    { data: role },
    { data: roleProjects },
    { data: roleExperience },
    { data: roleEducation },
    { data: roleCertifications },
    { data: roleTechnologies },
  ] = await Promise.all([
    supabase
      .from("job_roles")
      .select("id, slug, title, headline, bio, personal_profile")
      .eq("id", roleId)
      .single(),
    supabase
      .from("role_projects")
      .select("project_id, projects(title, description, technologies, tags)")
      .eq("role_id", roleId),
    supabase
      .from("role_experience")
      .select(
        "experience(company, title, period, description, highlights, technologies)",
      )
      .eq("role_id", roleId),
    supabase
      .from("role_education")
      .select("education(school, degree, period, description, highlights)")
      .eq("role_id", roleId),
    supabase
      .from("role_certifications")
      .select("certifications(title, description, organizer)")
      .eq("role_id", roleId),
    supabase
      .from("role_technologies")
      .select("technologies(name, proficiency)")
      .eq("role_id", roleId),
  ]);

  if (!role)
    return NextResponse.json({ error: "Role not found." }, { status: 404 });

  const { data: resumes, error: resumeError } = await supabase
    .from("gateway_resumes")
    .select("id, resume_text, created_at, updated_at")
    .eq("role_key", role.slug)
    .is("link_id", null)
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1);
  const resume = resumes?.[0] ?? null;

  const rawSource = {
    role,
    resumeText: resume?.resume_text || null,
    projects: roleProjects || [],
    experience: roleExperience || [],
    education: roleEducation || [],
    certifications: roleCertifications || [],
    technologies: roleTechnologies || [],
  };

  const source = JSON.stringify(rawSource).slice(0, MAX_SOURCE_LENGTH);
  const verifiedProjectTitles = roleProjects
    ?.map((item: any) => item.projects?.title)
    .filter((title: unknown): title is string => typeof title === "string")
    .join(", ") || "none";
  const sourceSummary = {
    roleTitle: role.title,
    roleSlug: role.slug,
    hasResumeText: Boolean(resume?.resume_text?.trim()),
    resumeRecordFound: Boolean(resume),
    resumeRecordId: resume?.id ?? null,
    resumeLookupError: resumeError?.message ?? null,
    resumeTextLength: resume?.resume_text?.length ?? 0,
    projectCount: roleProjects?.length ?? 0,
    experienceCount: roleExperience?.length ?? 0,
    educationCount: roleEducation?.length ?? 0,
    certificationCount: roleCertifications?.length ?? 0,
    technologyCount: roleTechnologies?.length ?? 0,
  };

  const prompt = `Generate the configuration for a visitor-facing AI portfolio chatbot for the role: ${role.title}.

The output has two purposes:
1. persona: a system prompt that controls how the chatbot speaks and behaves when answering visitors.
2. suggestedQuestions: starter questions visitors can use to learn about Troy's work for this role.

Use SOURCE_DATA only as factual evidence. Never return SOURCE_DATA itself. Do not use information from memory, previous generations, saved personas, or examples outside SOURCE_DATA.

Only mention a project by name if that exact project title appears in SOURCE_DATA. Verified linked project titles for this role are: ${verifiedProjectTitles}

SOURCE_DATA_START
${source}
SOURCE_DATA_END

Return ONLY one valid JSON object with exactly these keys:
{"persona":"...","suggestedQuestions":["...","...","..."]}

PERSONA REQUIREMENTS:
- Write 800-2,000 characters.
- Speak as Troy in first person.
- Be professional-casual and specific to the role.
- Use only facts supported by SOURCE_DATA; never invent facts.
- Do not mention Hamming Code, Axelrod's Tournament, Enigma Machine, Space Time gravity, orbit simulations, or any other project unless it appears in SOURCE_DATA.
- If a visitor asks about an unavailable project or fact, say that it is not included in this role profile and offer to discuss the verified work instead.
- Explain how to handle questions when the source does not contain an answer.

SUGGESTED_QUESTIONS REQUIREMENTS:
- Return 3-6 questions.
- Each question must be 8-160 characters.
- Questions must be relevant to this role and useful to portfolio visitors.

FINAL CHECK: Do not echo these instructions. Do not echo SOURCE_DATA. Do not add an introduction. Your entire response must be the JSON object beginning with { and ending with }. No markdown, explanation, or extra keys.`;

  try {
    const raw = await callProvider(provider, prompt);
    let parsed: unknown;
    try {
      parsed = parseModelJson(raw);
    } catch {
      throw new Error(
        `Model returned invalid JSON. Raw response: ${raw.slice(0, 500)}`,
      );
    }
    const draft = validateDraft(parsed);
    return NextResponse.json({
      ok: true,
      draft,
      debug: {
        sourceSummary,
        sourcePreview: rawSource,
        promptPreview: prompt.slice(0, 6000),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? `${provider} timed out after ${PROVIDER_TIMEOUT_MS / 1000} seconds while generating the draft.`
        : error instanceof Error
          ? error.message
          : "Generation failed.";
    return NextResponse.json(
      {
        error: message,
        diagnostics: {
          provider,
          model: provider === "qwen" ? "qwen3.6-flash" : OLLAMA_MODEL,
          timeoutMs: PROVIDER_TIMEOUT_MS,
          sourceChars: source.length,
          promptChars: prompt.length,
          sourceSummary,
        },
      },
      { status: 502 },
    );
  }
}
