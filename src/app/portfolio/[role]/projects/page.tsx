import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getProjects } from "@/lib/projects";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Code2, Layers, ArrowLeft, ExternalLink } from "lucide-react";
import ProjectTagFilter from "@/components/Projects/ProjectTagFilter";

interface Props {
  params: Promise<{ role: string }>;
  searchParams: Promise<{ tag?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const roleName = role
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${roleName} Projects | Troy Sarinas`,
    description: `Explore my portfolio projects specifically relevant to ${roleName.toLowerCase()} roles.`,
  };
}

const RoleProjectsPage = async ({ params, searchParams }: Props) => {
  const { role } = await params;
  const { tag } = await searchParams;

  const validRoles = [
    "software-engineer",
    "gtm-engineer",
    "video-editor",
    "ecommerce-developer",
  ];
  if (!validRoles.includes(role)) {
    return notFound();
  }

  const allProjects = await getProjects(role);
  const projects = tag
    ? allProjects.filter((project) =>
        project.tags.some(
          (projectTag) => projectTag.toLowerCase() === tag.toLowerCase(),
        ),
      )
    : allProjects;

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Back Link */}
        <Link
          href={`/portfolio/${role}`}
          className="inline-flex items-center gap-2 text-sm font-spacemono text-secondary/70 hover:text-secondary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            {role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
            Projects
          </h1>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            A curated selection of work showcasing my expertise as a{" "}
            {role.replace("-", " ")}.
          </p>
        </div>

        <ProjectTagFilter role={role} projects={allProjects} activeTag={tag} />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const gradients = [
                "from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)]",
                "from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)]",
                "from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.1)]",
              ];
              const borderColors = [
                "border-[rgba(17,153,142,0.3)]",
                "border-[rgba(102,126,234,0.3)]",
                "border-[rgba(59,130,246,0.3)]",
              ];

              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${role}/projects/${project.id}`}
                  className={`group block h-full backdrop-blur-[20%] bg-linear-to-br ${gradients[index % 3]} 
                    ${borderColors[index % 3]} border-2 rounded-3xl overflow-hidden
                    hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className="h-full flex flex-col">
                    <div className="relative w-full aspect-video overflow-hidden bg-white/50">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                          <Layers className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-secondary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-fraunces text-xl font-semibold leading-tight text-secondary mb-2 group-hover:text-secondary/80 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-stone-600/80 font-light text-sm leading-6 line-clamp-3 mb-5 flex-1">
                        {project.description}
                      </p>
                      <div className="mt-auto border-t border-secondary/15 pt-4">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary/55">
                          Built with
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-secondary/15 bg-white/45 px-2.5 py-1 text-[11px] font-medium text-secondary/80"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="rounded-md border border-secondary/10 bg-white/30 px-2.5 py-1 text-[11px] font-medium text-secondary/60">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between text-sm font-semibold text-secondary">
                        <span>View details</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 backdrop-blur-[20%] bg-linear-to-br from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.05)] border-2 border-[rgba(102,126,234,0.2)] rounded-3xl">
              <Layers className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-stone-500 font-spacemono">
                No projects found for this role yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleProjectsPage;
