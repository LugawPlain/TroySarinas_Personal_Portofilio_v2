import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { FiArrowLeft } from "react-icons/fi";
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
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-8 max-w-5xl mx-auto font-inter">
      <Link
        href={`/portfolio/${role}/projects`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to {role.replace("-", " ")} Projects
      </Link>

      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold font-fraunces text-foreground/90">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
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
