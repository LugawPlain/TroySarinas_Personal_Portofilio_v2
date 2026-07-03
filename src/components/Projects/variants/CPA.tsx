"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ExternalLink, Award, Building2, TrendingUp } from "lucide-react";
import { useTrack } from "@/hooks/use-track";
import { Project } from "@/lib/projects";

interface ProjectsProps {
  projects: Project[];
  role?: string;
}

const CPAProjects = ({ projects, role }: ProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");
  const trackExternal = useTrack("project_external_link", "projects");

  return (
    <div
      id="projects"
      className="items-center flex flex-col py-16 px-4 relative overflow-x-clip bg-gradient-to-b from-white to-slate-50/50"
    >
      <div className="max-w-[85rem] w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#1e3a5f]" />
            </div>
            <span className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wider">
              Case Studies
            </span>
          </div>
          <h1 className="text-center font-bold text-3xl sm:text-4xl xl:text-5xl text-gray-900 font-fraunces mb-4">
            Engagement Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Selected engagements demonstrating expertise in audit, tax, and advisory services across diverse industries.
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
                      <span className="bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-bold px-2 py-1 rounded-full">
                        {project.technologies[0] || "Audit"}
                      </span>
                      <span className="bg-[#c9a227]/10 text-[#c9a227] text-xs font-bold px-2 py-1 rounded-full">
                        {project.technologies[1] || "Tax"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  </div>
                  <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#1e3a5f]" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Engagement Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <TrendingUp className="w-4 h-4 text-[#1e3a5f] mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">$2.5M</div>
                    <div className="text-[10px] text-gray-500">Value</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-4 h-4 text-[#1e3a5f] mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">98%</div>
                    <div className="text-[10px] text-gray-500">Compliance</div>
                  </div>
                  <div className="text-center">
                    <Building2 className="w-4 h-4 text-[#1e3a5f] mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">12 mo</div>
                    <div className="text-[10px] text-gray-500">Duration</div>
                  </div>
                </div>

                {/* Key Findings */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Key Findings</h4>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-2" />
                    <p className="text-sm text-gray-600">Identified $500K in tax savings through strategic planning</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-2" />
                    <p className="text-sm text-gray-600">Streamlined internal controls reducing audit time by 30%</p>
                  </div>
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
                      <button className="w-full py-3 bg-[#1e3a5f] text-white rounded-xl font-semibold text-sm hover:bg-[#162d4a] transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Engagement
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold text-sm cursor-not-allowed">
                      View Engagement
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
              className="inline-flex items-center gap-2 text-[#1e3a5f] font-semibold hover:underline"
            >
              View All Engagements
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CPAProjects;
