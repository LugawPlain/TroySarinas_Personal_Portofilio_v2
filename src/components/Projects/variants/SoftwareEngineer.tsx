"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { MdArrowOutward } from "react-icons/md";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useTrack } from "@/hooks/use-track";
import { Code2, Layers, Sparkles } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
  role?: string;
}

const SoftwareEngineerProjects = ({ projects, role }: ProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");
  const trackExternal = useTrack("project_external_link", "projects");

  return (
    <div
      id="projects"
      className="relative py-16 px-4"
    >
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            Featured Projects
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            A collection of my recent work showcasing full-stack development, 
            modern frameworks, and scalable architectures.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => {
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
            const shadowColors = [
              "shadow-[rgba(56,239,125,0.3)]",
              "shadow-[rgba(118,75,162,0.3)]",
              "shadow-[rgba(147,51,234,0.3)]",
            ];

            return (
              <div
                key={project.id}
                className={`group relative backdrop-blur-[20%] bg-linear-to-br ${gradients[index % 3]} 
                  hover:shadow-2xl hover:${shadowColors[index % 3]} transition-all duration-500 
                  ${borderColors[index % 3]} border-2 rounded-3xl overflow-hidden
                  hover:-translate-y-1`}
              >
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Link
                    href={`${rolePrefix}/projects/${project.id}`}
                    onClick={() =>
                      trackProject({
                        project_id: project.id,
                        project_title: project.title,
                        action: "view_detail",
                      })
                    }
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <Layers className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-fraunces text-xl font-semibold text-secondary mb-2 group-hover:text-secondary/80 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-600/80 font-light font-spacemono line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <div
                        key={tech}
                        className="bg-white/40 backdrop-blur-sm text-secondary text-xs font-medium px-3 py-1 rounded-full border border-white/50"
                      >
                        {tech}
                      </div>
                    ))}
                    {project.technologies.length > 4 && (
                      <div className="bg-white/30 text-secondary/70 text-xs font-medium px-3 py-1 rounded-full">
                        +{project.technologies.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.liveUrl ? (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackExternal({
                            project_id: project.id,
                            project_title: project.title,
                            url: project.liveUrl,
                            type: "live_demo",
                          })
                        }
                        className="flex-1"
                      >
                        <Button
                          className="w-full rounded-full text-xs font-semibold px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                          <FiExternalLink size={14} className="mr-1.5" />
                          Live Demo
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        className="flex-1 rounded-full text-xs font-semibold px-4 py-2 opacity-40"
                      >
                        <FiExternalLink size={14} className="mr-1.5" />
                        Live Demo
                      </Button>
                    )}

                    {project.githubUrl ? (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackExternal({
                            project_id: project.id,
                            project_title: project.title,
                            url: project.githubUrl,
                            type: "github",
                          })
                        }
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full rounded-full text-xs font-semibold px-4 py-2 border-2 border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5 transition-all hover:-translate-y-0.5"
                        >
                          <FiGithub size={14} className="mr-1.5" />
                          Code
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        variant="outline"
                        className="flex-1 rounded-full text-xs font-semibold px-4 py-2 opacity-40"
                      >
                        <FiGithub size={14} className="mr-1.5" />
                        Private
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`${rolePrefix}/projects`}
            onClick={() =>
              trackProject({
                action: "view_all",
                count: projects.length,
              })
            }
          >
            <Button 
              variant="outline"
              className="rounded-full px-8 py-6 border-2 border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5 font-semibold tracking-tight shadow-lg transition-all hover:-translate-y-0.5"
            >
              View All Projects
              <MdArrowOutward className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SoftwareEngineerProjects;
