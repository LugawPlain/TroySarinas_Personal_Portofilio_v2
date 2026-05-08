"use client";

import { useActionState, useState } from "react";
import { createGatewayLink, deleteGatewayLink } from "./actions";
import { updateResume } from "./resume-actions";
import {
  Plus,
  Loader2,
  CheckCircle2,
  XCircle,
  Link2,
  Trash2,
  Copy,
  Check,
  FileText,
  Save,
  Activity,
  MousePointer2,
  Eye,
} from "lucide-react";
import { getInteractionEvents } from "./actions";
import { useEffect } from "react";

export function InteractionFeed() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getInteractionEvents();
      setEvents(data);
      setIsLoading(false);
    };

    fetchEvents();
    // Refresh every 30 seconds
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading)
    return (
      <div className="bg-card rounded-xl border p-12 text-center text-muted-foreground shadow-sm h-full flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest opacity-50">
          Syncing Live Feed...
        </p>
      </div>
    );

  const refreshEvents = async () => {
    setIsLoading(true);
    const data = await getInteractionEvents();
    setEvents(data);
    setIsLoading(false);
  };

  return (
    <div className="bg-card rounded-xl border p-6 space-y-4 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          Live Activity Feed
        </h2>
        <button
          onClick={refreshEvents}
          disabled={isLoading}
          className="text-muted-foreground hover:text-accent p-1 transition-colors disabled:opacity-50"
          title="Refresh Feed"
        >
          <Loader2 className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <XCircle className="w-8 h-8 text-muted-foreground/20 mb-2" />
            <p className="text-sm text-muted-foreground italic">
              No interactions recorded yet.
            </p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="group relative pl-4 border-l-2 border-muted hover:border-accent transition-colors pb-1"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-tighter text-accent">
                  {event.gateway_links?.label || "Unknown Link"}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {new Date(event.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {event.event_name === "section_view" ? (
                  <Eye className="w-3 h-3 text-blue-500" />
                ) : (
                  <MousePointer2 className="w-3 h-3 text-emerald-500" />
                )}
                <span className="text-sm font-semibold capitalize tracking-tight">
                  {event.event_name.replace(/_/g, " ")}
                </span>
              </div>
              {event.section && (
                <div className="text-[10px] text-muted-foreground mt-0.5 font-bold uppercase tracking-widest opacity-60">
                  Section: {event.section}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function LinkGeneratorForm({ roles }: { roles: any[] }) {
  const [state, formAction, isPending] = useActionState(
    createGatewayLink,
    null,
  );

  return (
    <div className="bg-card rounded-xl border p-6 space-y-4 shadow-sm h-full">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Generate Link
      </h2>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Role</label>
          <select
            name="job_role"
            className="w-full h-10 px-3 rounded-md border bg-background border-input focus:ring-2 focus:ring-accent outline-none"
            required
          >
            {roles.map((role) => (
              <option key={role.slug} value={role.slug}>
                {role.title}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Label (Internal)</label>
          <input
            name="label"
            type="text"
            placeholder="e.g. Spotify Application"
            className="w-full h-10 px-3 rounded-md border bg-background border-input focus:ring-2 focus:ring-accent outline-none"
            required
          />
        </div>

        {state?.error && (
          <div className="text-xs text-destructive flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="text-xs text-green-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-accent text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Create Tracking Link"
          )}
        </button>
      </form>
    </div>
  );
}

export function ResumeManager({
  initialResumes,
  roles,
}: {
  initialResumes: any[];
  roles: any[];
}) {
  const [resumes, setResumes] = useState(initialResumes);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const handleSave = async (role: string, url: string) => {
    setIsSaving(role);
    const result = await updateResume(role, url);
    if (!result.error) {
      setResumes((prev) => {
        const existing = prev.find((r) => r.role_key === role);
        if (existing) {
          return prev.map((r) =>
            r.role_key === role ? { ...r, resume_url: url } : r,
          );
        }
        return [...prev, { role_key: role, resume_url: url }];
      });
    }
    setIsSaving(null);
  };

  return (
    <div className="bg-card rounded-xl border p-6 space-y-4 shadow-sm">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Resume Management
      </h2>
      <div className="space-y-4">
        {roles.map((role) => {
          const currentResume =
            resumes.find((r) => r.role_key === role.slug)?.resume_url || "";
          return (
            <div key={role.slug} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase">
                {role.title}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Paste PDF link here"
                  defaultValue={currentResume}
                  className="flex-1 h-9 px-3 text-sm rounded-md border bg-background border-input focus:ring-1 focus:ring-accent outline-none"
                  onBlur={(e) => {
                    if (e.target.value !== currentResume) {
                      handleSave(role.slug, e.target.value);
                    }
                  }}
                />
                <div className="flex items-center justify-center w-9 h-9">
                  {isSaving === role.slug ? (
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  ) : (
                    <Save className="w-4 h-4 text-muted-foreground opacity-20" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LinkActions({
  linkId,
  verSlug,
  targetRole,
}: {
  linkId: string;
  verSlug: string;
  targetRole: string;
}) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const copyLink = () => {
    const url = `${window.location.origin}/portfolio/${targetRole}/?ver=${verSlug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this link? Analytics data for this link will be lost.",
      )
    ) {
      setIsDeleting(true);
      await deleteGatewayLink(linkId);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={copyLink}
        className="p-2 hover:bg-muted rounded-md transition-colors relative group"
        title="Copy Tracking Link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors disabled:opacity-50"
        title="Delete Link"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
