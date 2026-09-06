"use client";

import { KeyboardEvent, useState } from "react";
import { Plus, X } from "lucide-react";

interface ProjectTagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const normalizeTag = (tag: string) => tag.trim().replace(/\s+/g, " ");

export default function ProjectTagInput({
  tags,
  onChange,
}: ProjectTagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = (value = draft) => {
    const tag = normalizeTag(value);
    if (
      !tag ||
      tags.some(
        (existingTag) => existingTag.toLowerCase() === tag.toLowerCase(),
      )
    ) {
      setDraft("");
      return;
    }
    onChange([...tags, tag]);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
    if (event.key === "Backspace" && !draft && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-3 transition-colors focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/10">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-700"
          >
            {tag}
            <button
              type="button"
              onClick={() =>
                onChange(tags.filter((existingTag) => existingTag !== tag))
              }
              aria-label={`Remove ${tag} tag`}
              className="rounded-full p-0.5 transition-colors hover:bg-purple-500/20"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <div className="flex min-w-48 flex-1 items-center gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addTag()}
            placeholder={
              tags.length
                ? "Add another tag..."
                : "Type a tag, then press Enter"
            }
            className="min-w-0 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground/70"
            aria-label="Add project tag"
          />
          <button
            type="button"
            onClick={() => addTag()}
            disabled={!draft.trim()}
            aria-label="Add project tag"
            className="rounded-md p-1.5 text-purple-600 transition-colors hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground">
        Use focused labels such as <span className="font-semibold">n8n</span>,
        automation, or lead generation.
      </p>
    </div>
  );
}
