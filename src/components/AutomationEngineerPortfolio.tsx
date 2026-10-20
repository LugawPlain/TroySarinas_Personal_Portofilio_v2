import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Workflow,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import type { Project } from "@/lib/projects";
import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  HeroConfig,
  SocialLink,
  TechItem,
} from "@/lib/roles";
import { TrackedSection } from "@/components/TrackedSection";
import AutomationWorkflowBrief from "@/components/AutomationWorkflowBrief";

interface AutomationEngineerPortfolioProps {
  role: string;
  resumeUrl: string | null;
  heroConfig: HeroConfig;
  projects: Project[];
  technologies: TechItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  blogs: BlogPost[];
  socialLinks: SocialLink[];
}

const capabilities = [
  {
    icon: Workflow,
    title: "Workflow orchestration",
    description:
      "Connect triggers, business rules, and handoffs into workflows people can understand and maintain.",
    link: { label: "How I approach it", href: "#approach" },
  },
  {
    icon: Bot,
    title: "AI-assisted operations",
    description:
      "Put language models to work where they add value, with clear review points for uncertain decisions.",
    link: { label: "See it in practice", href: "#projects" },
  },
  {
    icon: Braces,
    title: "Reliable integrations",
    description:
      "Bring APIs and everyday tools together with sensible error paths, retries, and room to evolve.",
    link: { label: "Browse the toolkit", href: "#technologies" },
  },
];

const approach = [
  {
    number: "01",
    title: "Discover the pain",
    description:
      "Listen for what is repetitive, manual, or error-prone, and what it costs the client when it goes wrong.",
    deliverable: "discovery notes",
  },
  {
    number: "02",
    title: "Map the process",
    description:
      "Shadow the real work and document every step, handoff, and exception before deciding what deserves automation.",
    deliverable: "process map",
  },
  {
    number: "03",
    title: "Design the flow",
    description:
      "Choose tools that fit the client's stack and make every trigger, decision, and human checkpoint explicit.",
    deliverable: "flow spec",
  },
  {
    number: "04",
    title: "Build and test",
    description:
      "Ship one workflow end-to-end on real data, then push edge cases, outages, and duplicates until it holds.",
    deliverable: "tested workflow",
  },
  {
    number: "05",
    title: "Deploy with observability",
    description:
      "Run alongside the manual process, alert loudly on failure, and log everything in plain language.",
    deliverable: "monitored rollout",
  },
  {
    number: "06",
    title: "Hand over ownership",
    description:
      "Document, train the team, and leave the workflow clear enough for the client to run without me.",
    deliverable: "team-owned runbook",
  },
];

const caseStudyCopy: Record<
  string,
  { problem: string; workflow: string; outcome: string }
> = {
  "clay lead enrichment & crm sync": {
    problem:
      "Prospect records need useful company context, and manually keeping CRM records current slows down follow-up.",
    workflow:
      "Clay enriches lead and company details, then syncs the results to Airtable to create or refresh CRM records for follow-up.",
    outcome:
      "Enriched lead records land in one Airtable pipeline, ready for review and follow-up without repetitive copy-and-paste.",
  },
  "ai voice receptionist": {
    problem:
      "Callers need answers to policy and scheduling questions without waiting for someone to coordinate every request.",
    workflow:
      "VAPI handles the conversation while n8n connects tool calls to policies, Google Calendar, Google Sheets, and Gmail.",
    outcome:
      "A single voice entry point handles inquiries, policy lookups, and appointment scheduling.",
  },
  "lead entry & enrichment automation": {
    problem:
      "New leads need research, enrichment, and organized follow-up before they are useful to a sales team.",
    workflow:
      "Tally captures the lead, Apify and Firecrawl enrich the record, and n8n writes the result to Airtable and creates a Notion page.",
    outcome:
      "Each submission becomes an enriched lead record with a dedicated Notion page for follow-up.",
  },
  "automated client onboarding channels": {
    problem:
      "A converted lead needs separate internal and client communication channels set up consistently.",
    workflow:
      "A ClickUp status change triggers n8n, which creates the internal and client-facing Slack channels.",
    outcome:
      "The team and client get dedicated kickoff spaces as soon as the lead converts.",
  },
};

function ProjectImage({ project, featured = false }: { project: Project; featured?: boolean }) {
  if (!project.image) {
    return (
      <div className="automation-image-fallback" aria-label={`${project.title} project artwork`}>
        <span>WORKFLOW / {featured ? "FEATURED" : "PROJECT"}</span>
        <div className="automation-flow-mark" aria-hidden="true">
          <span>Trigger</span>
          <ArrowRight />
          <span>Action</span>
        </div>
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
      priority={featured}
      sizes={featured ? "(max-width: 52rem) 100vw, 48vw" : "(max-width: 52rem) 100vw, 40vw"}
    />
  );
}

export default function AutomationEngineerPortfolio({
  role,
  resumeUrl,
  heroConfig,
  projects,
  technologies,
  experience,
  education,
  certifications,
  blogs,
  socialLinks,
}: AutomationEngineerPortfolioProps) {
  const caseStudies = projects
    .flatMap((project) => {
      const copy = caseStudyCopy[project.title.trim().toLowerCase()];
      return copy ? [{ project, copy }] : [];
    })
    .slice(0, 3);
  const displayName = heroConfig.displayName || "Troy Sarinas";

  return (
    <div className="automation-page">
      <main className="automation-main">
        <TrackedSection id="hero_view">
          <section className="automation-hero" id="overview">
            <div className="automation-hero-inner">
              <div className="automation-hero-layout">
                <div className="automation-hero-copy">
                  <div className="automation-identity">
                    {heroConfig.showAvatar && heroConfig.avatarUrl ? (
                      <Image
                        className="automation-avatar"
                        src={heroConfig.avatarUrl}
                        alt=""
                        width={44}
                        height={44}
                        unoptimized
                      />
                    ) : (
                      <span className="automation-avatar-fallback" aria-hidden="true">
                        TS
                      </span>
                    )}
                    <div>
                      <p className="automation-name">{displayName}</p>
                      <p className="automation-role">AI &amp; workflow automation</p>
                    </div>
                  </div>

                  <div className="automation-intro">
                    <h1>I automate the work between your tools.</h1>
                    <p className="automation-bio">
                      I build n8n workflows, AI agents, and API integrations
                      around the way your team actually works.
                    </p>
                  </div>

                  <div className="automation-hero-actions">
                    <Link
                      className="automation-button automation-button-primary"
                      href={`/portfolio/${role}/projects`}
                    >
                      Explore all work <ArrowUpRight aria-hidden="true" />
                    </Link>
                    <a className="automation-button automation-button-secondary" href="#workflow-brief">
                      Map my workflow <ArrowUpRight aria-hidden="true" />
                    </a>
                    {resumeUrl && (
                      <a className="automation-link" href={resumeUrl}>
                        View resume <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <div className="automation-signal" aria-hidden="true">
                    <span className="automation-signal-status">Pipeline nominal</span>
                    <div className="automation-signal-track">
                      <span className="automation-signal-pulse" />
                      <span className="automation-signal-node" />
                      <span className="automation-signal-node" />
                      <span className="automation-signal-node" />
                    </div>
                    <div className="automation-signal-stops">
                      <span>Trigger</span>
                      <span>Rules</span>
                      <span>Handoff</span>
                    </div>
                  </div>

                  {socialLinks.length > 0 && (
                    <nav className="automation-social-links" aria-label="Social profiles">
                      {socialLinks.map((link) => (
                        <a
                          className="automation-social-link"
                          href={link.url}
                          key={link.id}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.name} <ArrowUpRight aria-hidden="true" />
                        </a>
                      ))}
                    </nav>
                  )}
                </div>

                <div className="automation-console" aria-hidden="true">
                  <div className="automation-console-header">
                    <span className="automation-console-title">RUN — lead enrichment</span>
                    <span className="automation-console-status">
                      <span className="automation-console-dot" /> live
                    </span>
                  </div>
                  <ul className="automation-console-log">
                    <li>
                      <span className="automation-console-time">09:41:02</span>
                      <span className="automation-console-tag">trigger</span>
                      <span>Tally form submitted</span>
                    </li>
                    <li>
                      <span className="automation-console-time">09:41:03</span>
                      <span className="automation-console-tag">enrich</span>
                      <span>Apify + Firecrawl record lookup</span>
                    </li>
                    <li>
                      <span className="automation-console-time">09:41:05</span>
                      <span className="automation-console-tag">write</span>
                      <span>Airtable row created</span>
                    </li>
                    <li>
                      <span className="automation-console-time">09:41:05</span>
                      <span className="automation-console-tag">create</span>
                      <span>Notion follow-up page</span>
                    </li>
                    <li className="is-done">
                      <span className="automation-console-time">09:41:06</span>
                      <span className="automation-console-tag">done</span>
                      <span>Lead enriched</span>
                    </li>
                  </ul>
                  <div className="automation-console-footer">
                    <div className="automation-console-track">
                      <span className="automation-console-fill" />
                    </div>
                    <span className="automation-console-caret" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TrackedSection>

        <div className="automation-sections">
          <section className="automation-services" id="capabilities">
            <div className="automation-services-heading">
              <div>
                <p className="automation-stage">
                  <span>1.0</span> Capabilities
                </p>
                <h2>Less busywork. Better-connected systems.</h2>
              </div>
              <p>
                Practical automation begins with understanding the process.
                The technology should make the work clearer, not harder to trust.
              </p>
            </div>
            <div className="automation-service-grid">
              {capabilities.map(({ icon: Icon, title, description, link }, index) => (
                <article className="automation-service-card" key={title}>
                  <span className="automation-service-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  {index === 0 && (
                    <div className="automation-flow-mark automation-service-flow" aria-hidden="true">
                      <span>Trigger</span>
                      <ArrowRight />
                      <span>Rules</span>
                      <ArrowRight />
                      <span>Handoff</span>
                    </div>
                  )}
                  <a className="automation-link" href={link.href}>
                    {link.label} <ArrowRight aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <TrackedSection id="projects_view">
            <section className="automation-projects" id="projects">
              <div className="automation-projects-heading">
                <div>
                  <p className="automation-stage">
                    <span>2.0</span> Selected work
                  </p>
                  <h2>Automation in practice.</h2>
                  <p>
                    Featured builds with the problem, the connected system,
                    and the result — the full archive is one click away.
                  </p>
                </div>
                <Link className="automation-all-projects" href={`/portfolio/${role}/projects`}>
                  Browse all work <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>

              {caseStudies.length > 0 ? (
                <>
                  <div className="automation-featured-grid">
                    {caseStudies.map(({ project, copy }) => (
                      <article className="automation-featured-card" key={project.id}>
                        <Link
                          className="automation-project-image automation-featured-card-image"
                          href={`/portfolio/${role}/projects/${project.id}`}
                          aria-label={`View ${project.title}`}
                        >
                          <ProjectImage project={project} />
                          <span className="automation-project-image-arrow" aria-hidden="true">
                            <ArrowUpRight />
                          </span>
                        </Link>
                        <div className="automation-featured-card-body">
                          <p className="automation-project-category">
                            {project.tags.slice(0, 2).join(" / ") || "Automation project"}
                          </p>
                          <h3>
                            <Link href={`/portfolio/${role}/projects/${project.id}`}>
                              {project.title}
                            </Link>
                          </h3>
                          <p className="automation-featured-card-outcome">{copy.outcome}</p>
                          {project.technologies.length > 0 && (
                            <ul className="automation-project-technologies" aria-label="Technologies used">
                              {project.technologies.slice(0, 3).map((technology) => (
                                <li key={technology}>{technology}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="automation-projects-cta">
                    <Link
                      className="automation-button automation-button-primary"
                      href={`/portfolio/${role}/projects`}
                    >
                      Explore all projects <ArrowUpRight aria-hidden="true" />
                    </Link>
                    {projects.length > caseStudies.length && (
                      <p className="automation-project-count">
                        Featuring {caseStudies.length} of {projects.length} published projects.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p className="automation-empty-projects">
                  Case studies are being prepared. In the meantime, explore the
                  capabilities and approach behind my automation practice.
                </p>
              )}
            </section>
          </TrackedSection>

          <section className="automation-approach" id="approach">
            <div className="automation-section-heading">
              <p className="automation-stage">
                <span>3.0</span> The process
              </p>
              <h2>Every engagement, end to end.</h2>
              <p>
                Automation work is a process, not a black box — discovery
                before tooling, explicit flow before build, ownership before
                handoff.
              </p>
            </div>
            <ol className="automation-approach-list">
              {approach.map((step) => (
                <li className="automation-approach-step" key={step.number}>
                  <span className="automation-approach-node" aria-hidden="true">
                    {step.number}
                  </span>
                  <div className="automation-approach-copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <span className="automation-approach-deliverable">
                    <span className="automation-visually-hidden">Output: </span>
                    {step.deliverable}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <AutomationWorkflowBrief role={role} />

          {technologies.length > 0 && (
            <section className="automation-toolkit" id="technologies">
              <div className="automation-section-heading">
                <p className="automation-stage">
                  <span>4.0</span> Toolkit
                </p>
                <h2>Built with the right tools for the job.</h2>
              </div>
              <ul className="automation-tool-list">
                {technologies.map((technology) => (
                  <li key={technology.name}>{technology.name}</li>
                ))}
              </ul>
            </section>
          )}

          {experience.length > 0 && (
            <TrackedSection id="experience_view">
              <section className="automation-record" id="experience">
                <div className="automation-section-heading">
                  <p className="automation-stage">
                    <span>5.0</span> Record
                  </p>
                  <h2>Where the work comes from.</h2>
                </div>
                <div className="automation-record-list">
                  {experience.map((item) => (
                    <article className="automation-record-item" key={item.id}>
                      <div>
                        <p className="automation-record-period">{item.period}</p>
                        <h3>{item.title}</h3>
                        <p className="automation-record-company">{item.company}</p>
                      </div>
                      <div>
                        <p>{item.description}</p>
                        {item.technologies.length > 0 && (
                          <ul className="automation-inline-tags">
                            {item.technologies.map((technology) => (
                              <li key={technology}>{technology}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </TrackedSection>
          )}

          {blogs.length > 0 && (
            <TrackedSection id="blog_view">
              <section className="automation-record" id="notes">
                <div className="automation-section-heading">
                  <h2>Ideas from the work.</h2>
                </div>
                <div className="automation-notes-list">
                  {blogs.slice(0, 3).map((post) => (
                    <article className="automation-note" key={post.slug}>
                      <p>{post.date} · {post.readTime}</p>
                      <h3>
                        <Link href={`/portfolio/${role}/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p>{post.excerpt}</p>
                    </article>
                  ))}
                </div>
              </section>
            </TrackedSection>
          )}

          {(education.length > 0 || certifications.length > 0) && (
            <section className="automation-record" id="credentials">
              <div className="automation-section-heading">
                <h2>Learning that supports the work.</h2>
              </div>
              <div className="automation-credential-grid">
                {certifications.map((certification) => (
                  <article className="automation-credential" key={certification.title}>
                    <p>{certification.organizer || "Certification"}</p>
                    <h3>{certification.title}</h3>
                    <p>{certification.description}</p>
                    {certification.cert_url && (
                      <a href={certification.cert_url} target="_blank" rel="noreferrer">
                        Verify credential <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                  </article>
                ))}
                {education.map((item) => (
                  <article className="automation-credential" key={item.id}>
                    <p>{item.period}</p>
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                    {item.description && <p>{item.description}</p>}
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
