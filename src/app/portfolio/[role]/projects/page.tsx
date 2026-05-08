import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getProjects } from "@/lib/projects";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ role: string }>;
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

const RoleProjectsPage = async ({ params }: Props) => {
  const { role } = await params;

  const validRoles = ["software-engineer", "gtm-engineer", "video-editor"];
  if (!validRoles.includes(role)) {
    return notFound();
  }

  const projects = await getProjects(role);

  return (
    <div className="min-h-screen pt-8 pb-8 px-4 sm:px-8 max-w-7xl mx-auto font-inter relative">
      <h1 className="text-3xl sm:text-4xl font-bold font-fraunces text-center mb-4 text-foreground/90">
        {role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
        Projects
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        A curated selection of work showcasing my expertise as a{" "}
        {role.replace("-", " ")}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${role}/projects/${project.id}`}
              className="group block h-full"
            >
              <div className="h-full bg-primary rounded-2xl overflow-hidden shadow-lg border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col">
                <div className="relative w-full aspect-video bg-gray-800 overflow-hidden">
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
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-secondary mb-2 group-hover:text-secondary/80 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
            <p className="text-muted-foreground">
              No projects found for this role yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleProjectsPage;
