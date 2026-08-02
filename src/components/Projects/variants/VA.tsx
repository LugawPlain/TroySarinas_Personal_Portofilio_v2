"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon, addCollection } from "@iconify/react";
import mdiData from "@iconify-json/mdi/icons.json";
import { ExternalLink } from "lucide-react";
import { useTrack } from "@/hooks/use-track";
import { Project } from "@/lib/projects";

let mdiCollectionAdded = false;

function loadMDICollection() {
  if (mdiCollectionAdded) return;
  addCollection(mdiData as any);
  mdiCollectionAdded = true;
}

interface ProjectsProps {
  projects: Project[];
  role?: string;
}

const VAProjects = ({ projects, role }: ProjectsProps) => {
  useEffect(() => {
    loadMDICollection();
  }, []);

  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");

  return (
    <div
      id="projects"
      className="items-center flex flex-col py-16 px-4 relative overflow-x-clip bg-gradient-to-b from-white to-[#f0fdfa]/50"
    >
      <div className="max-w-[85rem] w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0d9488]/10 flex items-center justify-center">
              <Icon icon="mdi:check-list" className="w-4 h-4 text-[#0d9488]" />
            </div>
            <span className="text-sm font-semibold text-[#0d9488] uppercase tracking-wider">
              Services
            </span>
          </div>
          <h1 className="text-center font-bold text-3xl sm:text-4xl xl:text-5xl text-gray-900 font-fraunces mb-4">
            Service Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive virtual assistant services designed to streamline your workflow and free up your time.
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
                      <span className="bg-[#0d9488]/10 text-[#0d9488] text-xs font-bold px-2 py-1 rounded-full">
                        {project.technologies[0] || "Administrative"}
                      </span>
                      <span className="bg-[#f0fdfa] text-[#0f766e] text-xs font-bold px-2 py-1 rounded-full">
                        {project.technologies[1] || "Support"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  </div>
                  <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
                    <Icon icon="mdi:check-circle" className="w-6 h-6 text-[#0d9488]" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Service Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[#f0fdfa] rounded-xl">
                  <div className="text-center">
                    <Icon icon="mdi:clock" className="w-4 h-4 text-[#0d9488] mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">20h/mo</div>
                    <div className="text-[10px] text-gray-500">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <Icon icon="mdi:lightning-bolt" className="w-4 h-4 text-[#0d9488] mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">15+</div>
                    <div className="text-[10px] text-gray-500">Tasks/wk</div>
                  </div>
                  <div className="text-center">
                    <Icon icon="mdi:check-circle" className="w-4 h-4 text-[#0d9488] mx-auto mb-1" />
                    <div className="text-sm font-bold text-gray-900">99%</div>
                    <div className="text-[10px] text-gray-500">Accuracy</div>
                  </div>
                </div>

                {/* Before/After */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:arrow-left-right" className="w-4 h-4 text-[#0d9488]" />
                    <span className="text-sm font-bold text-gray-700">Before & After</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs font-bold text-red-700 mb-1">Before</p>
                      <p className="text-xs text-gray-600">Manual scheduling, scattered emails, missed deadlines</p>
                    </div>
                    <div className="bg-[#0d9488]/10 rounded-lg p-3">
                      <p className="text-xs font-bold text-[#0f766e] mb-1">After</p>
                      <p className="text-xs text-gray-600">Automated scheduling, organized inbox, on-time delivery</p>
                    </div>
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
                      <button className="w-full py-3 bg-[#0d9488] text-white rounded-xl font-semibold text-sm hover:bg-[#0f766e] transition-colors flex items-center justify-center gap-2">
                        <Icon icon="mdi:open-in-new" className="w-4 h-4" />
                        View Details
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold text-sm cursor-not-allowed">
                      View Details
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
              className="inline-flex items-center gap-2 text-[#0d9488] font-semibold hover:underline"
            >
              View All Services
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VAProjects;
