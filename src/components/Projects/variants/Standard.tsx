"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { MdArrowOutward } from "react-icons/md";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import { Project } from "@/lib/projects";

interface ProjectsProps {
  projects: Project[];
  role?: string;
}

const StandardProjects = ({ projects, role }: ProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";

  return (
    <div
      id="projects"
      className="items-center flex flex-col py-0 px-4 relative overflow-x-clip"
    >
      <div className="absolute top-10 bg-secondary/50 h-80 w-800 -skew-12 -z-10 "></div>
      <div className="space-y-6 flex flex-col justify-center items-center max-w-[85rem]">
        <h1 className="text-center font-bold text-2xl sm:text-3xl mt-1 text-foreground/90">
          Projects
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="pb-1.5 card bg-primary font-fraunces flex-col flex shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 max-w-sm"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-gray-500 border-b border-border">
                <Link href={`${rolePrefix}/projects/${project.id}`}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition duration-300 hover:grayscale-50"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-600">
                      No Image
                    </div>
                  )}
                </Link>
              </div>
              <div className="px-3 xl:px-4 mt-2 mb-2 text-center flex h-full flex-col flex-1">
                <div className="space-y-1.5 mb-2">
                  <h3 className="font-semibold text-xl text-secondary">
                    {project.title}
                  </h3>
                  <p className="text-start text-muted-foreground text-sm line-clamp-3">
                    &emsp; {project.description}
                  </p>
                </div>
                <div className="mt-auto border-t border-border pt-2">
                  <div className="flex flex-wrap text-[10px] text-white gap-1.5 mt-auto">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <div
                        key={tech}
                        className="bg-secondary/80 pointer-events-none text-secondary-foreground px-2 py-0.5 rounded-full"
                      >
                        {tech}
                      </div>
                    ))}
                    {project.technologies.length > 5 && (
                      <div className="bg-secondary/40 pointer-events-none text-secondary-foreground px-2 py-0.5 rounded-full">
                        +{project.technologies.length - 5}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {project.liveUrl ? (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant={"default"}
                          className="w-full text-secondary text-xs cursor-pointer font-semibold px-3 py-2 rounded-lg hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-1.5"
                        >
                          <FiExternalLink size={16} />
                          Live Demo
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex-1 opacity-40 grayscale cursor-not-allowed">
                        <Button
                          variant={"default"}
                          disabled
                          className="w-full text-secondary text-xs font-semibold px-3 py-2 rounded-lg flex items-center justify-center gap-1.5"
                        >
                          <FiExternalLink size={16} />
                          Live Demo
                        </Button>
                      </div>
                    )}

                    {project.githubUrl ? (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant={"outline"}
                          className="w-full text-secondary text-xs cursor-pointer font-semibold px-3 py-2 rounded-lg hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-1.5"
                        >
                          <FiGithub size={16} />
                          Code
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex-1 opacity-40 grayscale cursor-not-allowed">
                        <Button
                          variant={"outline"}
                          disabled
                          className="w-full text-secondary text-xs font-semibold px-3 py-2 rounded-lg flex items-center justify-center gap-1.5"
                        >
                          <FiGithub size={16} />
                          Private
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link href={`${rolePrefix}/projects`}>
        <Button className="mx-auto mt-4 h-9 text-sm" variant={"outline"}>
          See more <MdArrowOutward />
        </Button>
      </Link>
    </div>
  );
};

export default StandardProjects;
