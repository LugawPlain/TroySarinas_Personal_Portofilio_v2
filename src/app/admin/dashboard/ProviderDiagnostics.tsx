"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type Provider = "ollama" | "qwen";

interface TestResult {
  ok: boolean;
  text: string;
}

export function ProviderDiagnostics() {
  const [message, setMessage] = useState("Reply with a short connectivity check.");
  const [running, setRunning] = useState<Provider | null>(null);
  const [results, setResults] = useState<Partial<Record<Provider, TestResult>>>({});

  const testProvider = async (provider: Provider) => {
    setRunning(provider);
    setResults((current) => ({ ...current, [provider]: undefined }));

    try {
      const response = await fetch("/api/admin/provider-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, message }),
      });
      const body = await response.json();
      const output = body.response;
      setResults((current) => ({
        ...current,
        [provider]: {
          ok: response.ok && body.ok === true,
          text: response.ok
            ? typeof output === "string"
              ? output
              : JSON.stringify(output, null, 2)
            : [body.error, body.details].filter(Boolean).join(" "),
        },
      }));
    } catch (error) {
      setResults((current) => ({
        ...current,
        [provider]: {
          ok: false,
          text: error instanceof Error ? error.message : "Request failed.",
        },
      }));
    } finally {
      setRunning(null);
    }
  };

  return (
    <section className="rounded-xl border bg-background p-5 space-y-4">
      <div>
        <h3 className="font-semibold">Provider diagnostics</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Test the local Ollama primary provider and Qwen fallback independently. These checks do not create a visitor chat conversation.
        </p>
      </div>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        maxLength={500}
        rows={2}
        className="w-full rounded-lg border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-accent"
        placeholder="Enter a test message"
      />

      <div className="grid gap-3 md:grid-cols-2">
        {(["ollama", "qwen"] as Provider[]).map((provider) => {
          const result = results[provider];
          return (
            <div key={provider} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium uppercase">{provider}</span>
                <button
                  type="button"
                  onClick={() => testProvider(provider)}
                  disabled={!message.trim() || running !== null}
                  className="rounded-md bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground disabled:opacity-50"
                >
                  {running === provider ? <Loader2 className="w-4 h-4 animate-spin" /> : `Test ${provider}`}
                </button>
              </div>
              {result && (
                <div className={`rounded-md p-3 text-xs ${result.ok ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
                  <div className="flex items-center gap-2 font-semibold">
                    {result.ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {result.ok ? "Connection succeeded" : "Connection failed"}
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap wrap-break-word font-sans">{result.text}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}