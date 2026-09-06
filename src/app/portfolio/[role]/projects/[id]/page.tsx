import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { FiArrowLeft } from "react-icons/fi";
import { Layers } from "lucide-react";
import { Metadata } from "next";
import { ProjectDetailsClient } from "@/components/ProjectDetailsClient";

interface Props {
  params: Promise<{ role: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function RoleProjectPage({ params }: Props) {
  const { role, id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 sm:px-8 max-w-6xl mx-auto font-inter">
      <Link
        href={`/portfolio/${role}/projects`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to {role.replace("-", " ")} Projects
      </Link>

      <div className="space-y-10">
        {/* Header Section */}
        <div className="max-w-4xl space-y-5 text-center sm:text-left">
          {project.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {project.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/portfolio/${role}/projects?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-secondary/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary transition-colors hover:bg-secondary/20"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <h1 className="text-4xl leading-[1.05] sm:text-6xl font-bold font-fraunces text-foreground/90">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Built with
            </span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-secondary/20 bg-secondary/5 px-2.5 py-1 text-xs font-medium text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Client-side synchronized content */}
        <ProjectDetailsClient project={project} />
      </div>
    </div>
  );
}
