import Link from "next/link";
import { Filter, Search, X } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectTagFilterProps {
  role: string;
  projects: Project[];
  activeTag?: string;
}

export default function ProjectTagFilter({
  role,
  projects,
  activeTag,
}: ProjectTagFilterProps) {
  const hasTags = projects.some((project) => project.tags.length > 0);

  if (!hasTags && !activeTag) return null;

  return (
    <div className="mb-10 border-y border-secondary/15 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
          <Filter className="h-4 w-4" />
          Find projects by tag
        </div>
        <form
          action={`/portfolio/${role}/projects`}
          method="get"
          className="flex w-full max-w-md items-center gap-2"
        >
          <label htmlFor="project-tag-filter" className="sr-only">
            Project tag
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-secondary/20 bg-white/50 px-3 py-2 transition-colors focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-secondary/10">
            <Search className="h-4 w-4 shrink-0 text-secondary/60" />
            <input
              id="project-tag-filter"
              name="tag"
              type="search"
              defaultValue={activeTag || ""}
              placeholder="Try n8n, automation, or AI"
              className="min-w-0 flex-1 bg-transparent text-sm text-secondary outline-none placeholder:text-secondary/45"
            />
          </div>
          <button
            type="submit"
            title="Filter projects"
            aria-label="Filter projects"
            className="rounded-xl bg-secondary p-2.5 text-secondary-foreground transition-opacity hover:opacity-85"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
      {activeTag && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          Showing projects tagged{" "}
          <span className="font-semibold text-secondary">{activeTag}</span>
          <Link
            href={`/portfolio/${role}/projects`}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-secondary"
          >
            <X className="h-3.5 w-3.5" />
            Clear filter
          </Link>
        </div>
      )}
    </div>
  );
}
