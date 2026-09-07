"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateChatConfig, updateChatPersona } from "./portfolio-actions";
import {
  MessageSquare,
  Type,
  HelpCircle,
  Loader2,
  Save,
  Bot,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

interface ChatConfig {
  welcomeMessage?: string;
  suggestedQuestions?: string[];
  statusText?: string;
  typingIndicator?: string;
}

interface ChatConfigEditorProps {
  selectedRole: {
    id: string;
    slug: string;
    chat_config?: ChatConfig;
    chat_persona?: string;
  };
  onSave: (status: string) => void;
}

export function ChatConfigEditor({
  selectedRole,
  onSave,
}: ChatConfigEditorProps) {
  const router = useRouter();
  const [config, setConfig] = useState<ChatConfig>(
    selectedRole.chat_config || {
      welcomeMessage: "",
      suggestedQuestions: [],
      statusText: "",
      typingIndicator: "",
    },
  );
  const [persona, setPersona] = useState(selectedRole.chat_persona || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [debugData, setDebugData] = useState<any>(null);
  const [generationError, setGenerationError] = useState<{
    message: string;
    diagnostics?: Record<string, any>;
    elapsedMs: number;
  } | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyText = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedItem(label);
    window.setTimeout(() => setCopiedItem(null), 1500);
  };

  const CopyButton = ({ label, value }: { label: string; value: string }) => (
    <button
      type="button"
      onClick={() => copyText(label, value)}
      className="inline-flex items-center gap-1 rounded-md border border-current/20 px-2 py-1 text-[10px] font-semibold uppercase text-muted-foreground hover:bg-muted"
      title={`Copy ${label}`}
    >
      {copiedItem === label ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copiedItem === label ? "Copied" : "Copy"}
    </button>
  );

  const qualitySummary = debugData
    ? {
        resumeStatus: debugData.sourceSummary?.hasResumeText
          ? "Resume parsed"
          : "Resume missing",
        resumeTextLength: debugData.sourceSummary?.resumeTextLength ?? 0,
        projects: debugData.sourceSummary?.projectCount ?? 0,
        experience: debugData.sourceSummary?.experienceCount ?? 0,
        technologies: debugData.sourceSummary?.technologyCount ?? 0,
      }
    : null;

  const qualityWarnings = qualitySummary
    ? [
        !qualitySummary.resumeTextLength
          ? "No parsed resume text is being sent to the AI. Upload a PDF resume for this role to improve persona depth."
          : null,
        qualitySummary.projects < 3
          ? "Few projects are linked to this role. Add more role-specific projects for stronger output."
          : null,
        qualitySummary.experience < 1
          ? "No experience entries are linked to this role. Add role-specific experience to improve accuracy."
          : null,
        qualitySummary.technologies < 5
          ? "Very little technology data is linked to this role. Add more skills or technologies for a better persona."
          : null,
      ].filter(Boolean)
    : [];

  useEffect(() => {
    setConfig(
      selectedRole.chat_config || {
        welcomeMessage: "",
        suggestedQuestions: [],
        statusText: "",
        typingIndicator: "",
      },
    );
    setPersona(selectedRole.chat_persona || "");
    setHasDraft(false);
  }, [selectedRole.id, selectedRole.chat_config, selectedRole.chat_persona]);

  const handleConfigChange = (field: keyof ChatConfig, value: any) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    onSave("Saving chat config...");

    const result = await updateChatConfig(selectedRole.id, config);

    if (!result.error) {
      onSave("Chat config synced");
      router.refresh();
    } else {
      onSave(`Error saving config: ${result.error}`);
    }
    setIsSaving(false);
  };

  const handleSavePersona = async () => {
    setIsSaving(true);
    onSave("Saving persona...");

    const result = await updateChatPersona(selectedRole.id, persona);

    if (!result.error) {
      onSave("Persona synced");
      router.refresh();
    } else {
      onSave(`Error saving persona: ${result.error}`);
    }
    setIsSaving(false);
  };

  const handleGenerateDraft = async () => {
    const startedAt = Date.now();
    let diagnosticsCaptured = false;
    setIsGenerating(true);
    setGenerationError(null);
    onSave("Generating role chat draft...");

    try {
      const response = await fetch("/api/admin/chat-config/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleId: selectedRole.id,
          roleSlug: selectedRole.slug,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.draft) {
        setGenerationError({
          message: result.error || "Could not generate a draft.",
          diagnostics: result.diagnostics,
          elapsedMs: Date.now() - startedAt,
        });
        diagnosticsCaptured = true;
        throw new Error(result.error || "Could not generate a draft.");
      }

      setPersona(result.draft.persona);
      setConfig((current) => ({
        ...current,
        suggestedQuestions: result.draft.suggestedQuestions,
      }));
      setDebugData(result.debug || null);
      setHasDraft(true);
      onSave("Draft ready for review");
    } catch (error) {
      if (!diagnosticsCaptured) {
        setGenerationError({
          message: error instanceof Error ? error.message : "Draft generation failed",
          elapsedMs: Date.now() - startedAt,
        });
      }
      onSave(
        error instanceof Error ? error.message : "Draft generation failed",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveDraft = async () => {
    setIsSaving(true);
    onSave("Approving chat draft...");

    const [personaResult, configResult] = await Promise.all([
      updateChatPersona(selectedRole.id, persona),
      updateChatConfig(selectedRole.id, config),
    ]);

    if (!personaResult.error && !configResult.error) {
      setHasDraft(false);
      onSave("Chat draft approved and saved");
      router.refresh();
    } else {
      onSave(
        `Error approving chat draft: ${personaResult.error || configResult.error}`,
      );
    }
    setIsSaving(false);
  };

  const suggestedQuestionsText = config.suggestedQuestions?.join("\n") || "";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Role chat draft
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Generate from this role&apos;s portfolio data and default resume,
            then review before publishing.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {hasDraft && (
            <button
              onClick={handleApproveDraft}
              disabled={isSaving || isGenerating}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-[10px] font-bold uppercase text-accent-foreground transition-opacity disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {isSaving ? "Saving..." : "Approve & save draft"}
            </button>
          )}
          <button
            onClick={handleGenerateDraft}
            disabled={isSaving || isGenerating}
            className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-background px-3 py-2 text-[10px] font-bold uppercase text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
          >
            <Sparkles
              className={`h-3.5 w-3.5 ${isGenerating ? "animate-pulse" : ""}`}
            />
            {isGenerating
              ? "Generating..."
              : hasDraft
                ? "Regenerate draft"
                : "Generate draft"}
          </button>
        </div>
      </div>
      {hasDraft && (
        <p className="text-xs font-medium text-amber-700">
          This is an unpublished draft. Review every field before approving it.
        </p>
      )}

      {generationError && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-950">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">
              Generation diagnostics
            </p>
            <span className="text-[10px] font-semibold text-red-700">
              {(generationError.elapsedMs / 1000).toFixed(1)}s elapsed
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold break-words">{generationError.message}</p>
          <div className="mt-2">
            <CopyButton
              label="generation error"
              value={JSON.stringify(
                { error: generationError.message, diagnostics: generationError.diagnostics },
                null,
                2,
              )}
            />
          </div>
          {generationError.diagnostics && (
            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2 md:grid-cols-4">
              <div><span className="text-red-700">Provider</span><div className="font-semibold">{generationError.diagnostics.provider}</div></div>
              <div><span className="text-red-700">Model</span><div className="font-semibold break-words">{generationError.diagnostics.model}</div></div>
              <div><span className="text-red-700">Prompt</span><div className="font-semibold">{generationError.diagnostics.promptChars} chars</div></div>
              <div><span className="text-red-700">Timeout</span><div className="font-semibold">{generationError.diagnostics.timeoutMs / 1000}s</div></div>
            </div>
          )}
          {generationError.diagnostics?.sourceSummary && (
            <details className="mt-3 rounded-lg border border-red-200 bg-white/60 p-3">
              <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-red-700">
                View source snapshot used for failed attempt
              </summary>
              <div className="mt-2">
                <CopyButton
                  label="failed source snapshot"
                  value={JSON.stringify(generationError.diagnostics.sourceSummary, null, 2)}
                />
              </div>
              <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[10px]">
                {JSON.stringify(generationError.diagnostics.sourceSummary, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      {debugData && (
        <div className="rounded-xl border border-dashed border-accent/30 bg-accent/5 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              AI generation source debug
            </p>
            <span className="rounded-full border border-accent/20 bg-background px-2 py-1 text-[9px] font-semibold uppercase text-accent">
              {qualitySummary?.resumeStatus || "Status unknown"}
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border bg-background p-2">
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Resume</div>
              <div className="mt-1 text-xs font-semibold">{qualitySummary?.resumeTextLength ?? 0} chars</div>
            </div>
            <div className="rounded-lg border bg-background p-2">
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Projects</div>
              <div className="mt-1 text-xs font-semibold">{qualitySummary?.projects ?? 0}</div>
            </div>
            <div className="rounded-lg border bg-background p-2">
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Experience</div>
              <div className="mt-1 text-xs font-semibold">{qualitySummary?.experience ?? 0}</div>
            </div>
            <div className="rounded-lg border bg-background p-2">
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Tech</div>
              <div className="mt-1 text-xs font-semibold">{qualitySummary?.technologies ?? 0}</div>
            </div>
          </div>

          {debugData.sourceSummary?.resumeLookupError && (
            <p className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-800">
              Resume lookup failed: {debugData.sourceSummary.resumeLookupError}
            </p>
          )}
          {!debugData.sourceSummary?.resumeRecordFound && !debugData.sourceSummary?.resumeLookupError && (
            <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
              No default resume row was found for role key &quot;{debugData.sourceSummary?.roleSlug}&quot;.
            </p>
          )}
          {debugData.sourceSummary?.resumeRecordFound && !debugData.sourceSummary?.hasResumeText && (
            <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
              A default resume row was found, but its parsed text is empty. Re-upload the PDF for this role.
            </p>
          )}

          {qualityWarnings.length > 0 && (
            <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                Source quality warnings
              </p>
              <ul className="mt-2 space-y-2 text-xs text-amber-800">
                {qualityWarnings.map((warning) => (
                  <li key={warning} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <details className="mt-4 rounded-lg border bg-background p-3">
            <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-muted-foreground">
              View exact data sent to the AI
            </summary>
            <div className="mt-2">
              <CopyButton
                label="source payload"
                value={JSON.stringify(debugData.sourcePreview, null, 2)}
              />
            </div>
            <pre className="mt-3 max-h-[28rem] overflow-auto whitespace-pre-wrap break-words rounded-md bg-slate-950 p-3 text-[10px] text-slate-100">
              {JSON.stringify(debugData.sourcePreview, null, 2)}
            </pre>
          </details>
          {debugData.promptPreview && (
            <details className="mt-3 rounded-lg border bg-background p-3">
              <summary className="cursor-pointer text-xs font-bold uppercase tracking-widest text-muted-foreground">
                View exact prompt sent to the AI
              </summary>
              <div className="mt-2">
                <CopyButton label="prompt" value={debugData.promptPreview} />
              </div>
              <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap break-words rounded-md bg-slate-950 p-3 text-[10px] text-slate-100">
                {debugData.promptPreview}
              </pre>
            </details>
          )}
        </div>
      )}
      {/* Persona Editor */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" />
            AI Persona / System Prompt
          </label>
          <button
            onClick={handleSavePersona}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase hover:bg-accent/20 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Persona"}
          </button>
        </div>
        <textarea
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          rows={12}
          className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-accent outline-none text-sm leading-relaxed shadow-sm transition-all font-mono"
          placeholder="Enter the AI persona/system prompt for this role..."
        />
        <p className="text-[10px] text-muted-foreground">
          This persona will be used by the AI when visitors chat with this role
          variant. Leave empty to use the default Troy Sarinas persona.
        </p>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-6">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Chat UI Configuration
          </label>
          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase hover:bg-accent/20 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Config"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Text */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Status Text
            </label>
            <input
              type="text"
              value={config.statusText || ""}
              onChange={(e) => handleConfigChange("statusText", e.target.value)}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="not a robot 🤖 beep boop"
            />
          </div>

          {/* Welcome Message */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Welcome Message
            </label>
            <textarea
              value={config.welcomeMessage || ""}
              onChange={(e) =>
                handleConfigChange("welcomeMessage", e.target.value)
              }
              rows={2}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="Hi there! I'm Troy..."
            />
          </div>

          {/* Typing Indicator */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Type className="w-3 h-3" />
              Typing Indicator Text
            </label>
            <input
              type="text"
              value={config.typingIndicator || ""}
              onChange={(e) =>
                handleConfigChange("typingIndicator", e.target.value)
              }
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="Hello! How can I help you?"
            />
          </div>

          {/* Suggested Questions */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              Suggested Questions (one per line)
            </label>
            <textarea
              value={suggestedQuestionsText}
              onChange={(e) =>
                handleConfigChange(
                  "suggestedQuestions",
                  e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter((s) => s !== ""),
                )
              }
              rows={5}
              className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-accent outline-none text-sm shadow-sm transition-all"
              placeholder="Tell me about yourself&#10;What are your technical skills?&#10;..."
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Chat Configuration...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Chat Configuration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
