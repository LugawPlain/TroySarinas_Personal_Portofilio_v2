"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useTrack } from "@/hooks/use-track";
import { motion } from "framer-motion";
import { TrendingUp, Target, DollarSign, ArrowRight, BarChart3 } from "lucide-react";

interface MarketingProjectsProps {
  projects: Project[];
  role?: string;
}

const MarketingProjects = ({ projects, role }: MarketingProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");

  return (
    <div id="projects" className="py-20 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-[85rem] mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-medium text-orange-600 uppercase tracking-wider mb-4 block">Campaign Portfolio</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Growth Campaigns</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Performance-driven marketing campaigns with measurable ROI and business impact.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-video">
                <Link href={`${rolePrefix}/projects/${project.id}`} onClick={() => trackProject({ project_id: project.id, project_title: project.title, action: "view_detail" })}>
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-orange-300" />
                    </div>
                  )}
                </Link>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">{(index + 2) * 150}% ROI</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-semibold">{(index + 1) * 5}K Leads</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{tech}</span>
                  ))}
                </div>

                <Link href={`${rolePrefix}/projects/${project.id}`} onClick={() => trackProject({ project_id: project.id, project_title: project.title, action: "view_detail" })}>
                  <Button variant="outline" className="rounded-full border-orange-300 hover:border-orange-500 text-orange-600 hover:bg-orange-50">
                    View Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingProjects;
