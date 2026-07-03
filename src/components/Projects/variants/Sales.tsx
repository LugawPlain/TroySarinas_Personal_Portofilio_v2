"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, DollarSign, TrendingUp, ExternalLink, Trophy, Users, Clock } from "lucide-react";
import { useTrack } from "@/hooks/use-track";
import { Project } from "@/lib/projects";

interface ProjectsProps {
  projects: Project[];
  role?: string;
}

const SalesProjects = ({ projects, role }: ProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");
  const trackExternal = useTrack("project_external_link", "projects");

  return (
    <div
      id="projects"
      className="items-center flex flex-col py-16 px-4 relative overflow-x-clip bg-gradient-to-b from-white to-gray-50/50"
    >
      <div className="max-w-[85rem] w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-sm font-bold text-red-600 uppercase tracking-wider">
              Deal Wins
            </span>
          </div>
          <h1 className="text-center font-bold text-3xl sm:text-4xl xl:text-5xl text-gray-900 font-fraunces mb-4">
            Closed Deal Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Selected deals showcasing complex sales cycles, strategic wins, and measurable revenue impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                        {project.technologies[0] || "Enterprise"}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">
                        {project.technologies[1] || "SaaS"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-red-600" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Deal Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <DollarSign className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">$450K</div>
                    <div className="text-[10px] text-gray-500">Deal Size</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">4 mo</div>
                    <div className="text-[10px] text-gray-500">Sales Cycle</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-4 h-4 text-red-600 mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">12</div>
                    <div className="text-[10px] text-gray-500">Stakeholders</div>
                  </div>
                </div>

                {/* Strategy & Result */}
                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Strategy Used</h4>
                    <p className="text-sm text-gray-600">MEDDPICC qualification, multi-threading across C-suite, competitive displacement</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Result</h4>
                    <p className="text-sm text-gray-600">Closed 3-year contract with 95% renewal probability, expanded to 2 additional divisions</p>
                  </div>
                </div>

                {/* Win Rate */}
                <div className="flex items-center justify-between mb-4 p-3 bg-red-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-semibold text-gray-700">Win Rate</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">68%</span>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <button className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Deal Details
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold text-sm cursor-not-allowed">
                      View Deal Details
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > 4 && (
          <div className="text-center mt-8">
            <Link
              href={`${rolePrefix}/projects`}
              onClick={() =>
                trackProject({
                  action: "view_all",
                  count: projects.length,
                })
              }
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
            >
              View All Deals
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesProjects;
