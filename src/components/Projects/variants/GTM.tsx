"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { MdArrowOutward } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useTrack } from "@/hooks/use-track";
import { Target, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectsProps {
  projects: Project[];
  role?: string;
}

// Mock metrics for case studies - in production, these would come from the database
const caseStudyMetrics: Record<string, { metric: string; label: string }[]> = {
  default: [
    { metric: "150%", label: "Increase in MQLs" },
    { metric: "2.5x", label: "Pipeline Growth" },
    { metric: "40%", label: "Cost Per Lead Reduction" },
  ],
};

const getMetrics = (projectId: string) => {
  return caseStudyMetrics[projectId] || caseStudyMetrics.default;
};

const GTMProjects = ({ projects, role }: ProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");
  const trackExternal = useTrack("project_external_link", "projects");

  return (
    <div id="projects" className="relative py-16 px-4 sm:px-8">
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
              Case Studies
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            GTM Impact & Results
          </h2>
          <p className="text-gray-600 font-light max-w-2xl mx-auto text-lg">
            Real-world growth initiatives that delivered measurable revenue outcomes. 
            Each case study follows the Problem → Strategy → Result framework.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const metrics = getMetrics(project.id);
            const layoutClass = isEven
              ? "flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
              : "flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-start";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className={layoutClass}>
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl group">
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
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
                            <Target className="w-16 h-16 text-emerald-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        
                        {/* Project Number Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                            Case Study {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Content Side - Problem → Strategy → Result */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 font-fraunces">
                      {project.title}
                    </h3>

                    {/* Problem */}
                    <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">The Challenge</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Strategy */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">The Strategy</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">The Results</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {metrics.map((metric) => (
                          <div key={metric.label} className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-emerald-700">{metric.metric}</p>
                            <p className="text-xs text-gray-600 mt-1">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      {project.liveUrl && (
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
                        >
                          <Button className="rounded-full text-sm font-semibold px-6 py-5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                            <FiExternalLink size={16} className="mr-2" />
                            View Case Study
                          </Button>
                        </Link>
                      )}
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
                        <Button variant="outline" className="rounded-full text-sm font-semibold px-6 py-5 border-2 border-gray-300 hover:border-emerald-600 hover:text-emerald-600 transition-all">
                          Read Full Story
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div className="mt-16 border-b border-gray-200" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
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
              className="rounded-full px-8 py-6 border-2 border-emerald-600/30 hover:border-emerald-600/60 hover:bg-emerald-50 font-semibold tracking-tight shadow-lg transition-all hover:-translate-y-0.5"
            >
              View All Case Studies
              <MdArrowOutward className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GTMProjects;
