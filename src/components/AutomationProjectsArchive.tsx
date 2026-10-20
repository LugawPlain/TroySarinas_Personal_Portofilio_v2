import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import type { Project } from "@/lib/projects";

interface AutomationProjectsArchiveProps {
  role: string;
  projects: Project[];
  allProjects: Project[];
  activeTag?: string;
}

function ArchiveProjectImage({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="automation-image-fallback" aria-label={`${project.title} project artwork`}>
        <span>WORKFLOW / PROJECT</span>
        <strong>{project.title}</strong>
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`${project.title} project preview`}
      fill
      unoptimized
      sizes="(max-width: 56rem) 100vw, 33vw"
    />
  );
}

export default function AutomationProjectsArchive({
  role,
  projects,
  allProjects,
  activeTag,
}: AutomationProjectsArchiveProps) {
  const tags = Array.from(
    new Set(allProjects.flatMap((project) => project.tags)),
  ).sort();

  return (
    <div className="automation-page">
      <main className="automation-archive">
        <div className="automation-archive-top">
          <Link className="automation-archive-nav" href={`/portfolio/${role}`}>
            <ArrowLeft aria-hidden="true" /> Back to overview
          </Link>
          <span className="automation-archive-readout" aria-hidden="true">
            {activeTag
              ? `${projects.length} / ${allProjects.length} builds`
              : `${allProjects.length} builds documented`}
          </span>
        </div>

        <header className="automation-archive-header">
          <p className="automation-stage">
            <span>A.0</span> Archive
          </p>
          <h1>Every project, documented.</h1>
          <p className="automation-archive-lede">
            The full index of automation builds — filter by tag, or open any
            project for the problem, the workflow, and the result.
          </p>
        </header>

        <div className="automation-archive-filter">
          <nav className="automation-archive-tags" aria-label="Filter by tag">
            <Link
              href={`/portfolio/${role}/projects`}
              className={activeTag ? undefined : "is-active"}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/portfolio/${role}/projects?tag=${encodeURIComponent(tag)}`}
                className={
                  activeTag?.toLowerCase() === tag.toLowerCase()
                    ? "is-active"
                    : undefined
                }
              >
                {tag}
              </Link>
            ))}
          </nav>
          <form
            action={`/portfolio/${role}/projects`}
            method="get"
            className="automation-archive-search"
          >
            <label
              htmlFor="automation-archive-search-input"
              className="automation-visually-hidden"
            >
              Filter projects by tag
            </label>
            <Search className="automation-archive-search-icon" aria-hidden="true" />
            <input
              id="automation-archive-search-input"
              name="tag"
              type="search"
              defaultValue={activeTag || ""}
              placeholder="Try n8n, AI, scraping"
            />
            <button type="submit" aria-label="Filter projects">
              <Search aria-hidden="true" />
            </button>
          </form>
        </div>

        {projects.length > 0 ? (
          <div className="automation-featured-grid">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${role}/projects/${project.id}`}
                className="automation-featured-card automation-archive-card"
                aria-label={`View ${project.title}`}
              >
                <span className="automation-project-image automation-featured-card-image">
                  <ArchiveProjectImage project={project} />
                  <span className="automation-project-image-arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </span>
                <span className="automation-featured-card-body">
                  <span className="automation-project-category">
                    {project.tags.slice(0, 2).join(" / ") || "Automation project"}
                  </span>
                  <span className="automation-archive-card-title">
                    {project.title}
                  </span>
                  <span className="automation-featured-card-outcome automation-archive-card-desc">
                    {project.description}
                  </span>
                  {project.technologies.length > 0 && (
                    <span className="automation-archive-tech" aria-label="Technologies used">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span>+{project.technologies.length - 4}</span>
                      )}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="automation-empty-projects">
            No projects match this filter. Clear the tag to see the full archive.
          </p>
        )}
      </main>
    </div>
  );
}
