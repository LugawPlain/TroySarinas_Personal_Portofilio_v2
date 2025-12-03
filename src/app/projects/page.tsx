import Image from "next/image";
import Link from "next/link";
import React from "react";
import { projectsData } from "@/lib/projects";

export const metadata = {
  title: "Projects | Troy Sarinas",
  description: "Explore the portfolio projects of Troy Sarinas.",
};

const ProjectsPage = () => {
  return (
    <div className="min-h-screen pt-8 pb-8 px-4 sm:px-8 max-w-7xl mx-auto font-inter relative">
      <h1 className="text-3xl sm:text-4xl font-bold font-fraunces text-center mb-8 text-foreground/90">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group block h-full"
          >
            <div className="h-full bg-primary rounded-2xl overflow-hidden shadow-lg border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col">
              <div className="relative w-full aspect-video bg-gray-800 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
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
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
