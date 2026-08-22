"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Download, Loader2, Search, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadGeneratorDemoProps {
  projectId: string;
}

interface LeadResult {
  name?: string;
  business_name?: string;
  address?: string;
  phone?: string;
  website?: string;
  category?: string;
  rating?: number | string;
  user_rating_count?: number | string;
  business_status?: string;
  google_maps_url?: string;
}

export default function LeadGeneratorDemo({
  projectId,
}: LeadGeneratorDemoProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "complete" | "failed"
  >("idle");
  const [results, setResults] = useState<LeadResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const submitInProgress = useRef(false);
  const pollAttempts = useRef(0);

  useEffect(() => {
    if (!requestId || status !== "pending") return;
    pollAttempts.current = 0;
    const timer = window.setInterval(async () => {
      pollAttempts.current += 1;
      if (pollAttempts.current > 24) {
        setStatus("failed");
        setError("The search is taking too long. Please try again later.");
        return;
      }

      try {
        const response = await fetch(`/api/lead-generator/status/${requestId}`, {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Status request failed");
        const data = await response.json();
        if (data.status === "complete" || data.status === "failed") {
          setStatus(data.status);
          setResults(Array.isArray(data.results) ? data.results : []);
          setError(data.error || null);
        }
      } catch {
        setStatus("failed");
        setError("Unable to check the search status. Please try again later.");
      }
    }, 2500);
    return () => window.clearInterval(timer);
  }, [requestId, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitInProgress.current) return;
    submitInProgress.current = true;
    setError(null);
    setResults([]);
    setStatus("pending");
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 35_000);
      const response = await fetch("/api/lead-generator/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, query, location }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const data = await response.json();
      if (!response.ok) {
        setStatus("failed");
        setError(data.error || "Unable to start the search.");
        return;
      }
      setRequestId(data.requestId);
    } catch (requestError) {
      setStatus("failed");
      setError(
        requestError instanceof DOMException && requestError.name === "AbortError"
          ? "The search timed out. Please try again later."
          : "Unable to connect to the lead generator.",
      );
    } finally {
      submitInProgress.current = false;
    }
  }

  function exportResults() {
    const headers = [
      "Business",
      "Category",
      "Rating",
      "Review Count",
      "Status",
      "Address",
      "Phone",
      "Website",
      "Google Maps",
    ];
    const escapeCsvValue = (value: unknown) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = results.map((lead) => [
      lead.name || lead.business_name,
      lead.category,
      lead.rating,
      lead.user_rating_count,
      lead.business_status,
      lead.address,
      lead.phone,
      lead.website,
      lead.google_maps_url,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lead-results-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-7">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-emerald-600 p-2 text-white">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-emerald-950">
            Try the lead finder
          </h2>
          <p className="mt-1 text-sm text-emerald-900/70">
            Run a small, personalized sample search.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <label className="text-sm font-medium text-emerald-950">
          Business type
          <input
            required
            maxLength={100}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Dentists"
            className="mt-1 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="text-sm font-medium text-emerald-950">
          Location
          <input
            required
            maxLength={100}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Austin, TX"
            className="mt-1 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <Button
          type="submit"
          disabled={status === "pending"}
          className="gap-2 bg-emerald-700 hover:bg-emerald-800"
        >
          {status === "pending" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Find leads
        </Button>
      </form>
      {status === "pending" && (
        <p className="mt-4 text-sm text-emerald-900/70">
          Searching and preparing your sample results...
        </p>
      )}
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      {status === "complete" && (
        <div className="mt-6 space-y-3">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={exportResults}
              disabled={results.length === 0}
              className="gap-2 border-emerald-300 text-emerald-800 hover:bg-emerald-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-emerald-200 bg-white">
            <table className="w-full min-w-150 text-left text-sm">
            <thead className="border-b border-emerald-100 bg-emerald-50 text-emerald-950">
              <tr>
                <th className="p-3">Business</th>
                <th className="p-3">Category</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
                <th className="p-3">Address</th>
                <th className="p-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {results.map((lead, index) => (
                <tr
                  key={`${lead.name || lead.business_name || "lead"}-${index}`}
                  className="border-b border-emerald-50 last:border-0"
                >
                  <td className="p-3 font-medium">
                    {lead.name || lead.business_name || "-"}
                  </td>
                  <td className="p-3">{lead.category || "-"}</td>
                  <td className="p-3">
                    {lead.rating ? `${lead.rating}/5` : "-"}
                    {lead.user_rating_count !== null && lead.user_rating_count !== undefined && (
                      <span className="ml-1 text-xs text-slate-500">
                        ({lead.user_rating_count} reviews)
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={lead.business_status === "OPERATIONAL" ? "text-emerald-700" : "text-slate-600"}>
                      {lead.business_status || "-"}
                    </span>
                  </td>
                  <td className="p-3">
                    {lead.google_maps_url ? (
                      <a
                        href={lead.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {lead.address || "Open in Google Maps"}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                        {lead.address || "-"}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      {lead.phone && <div>{lead.phone}</div>}
                      {lead.website ? (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950"
                        >
                          Website
                        </a>
                      ) : !lead.phone ? "-" : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
