"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useTrack } from "@/hooks/use-track";
import { motion } from "framer-motion";
import { Heart, Share2, MessageCircle, Eye, ArrowRight } from "lucide-react";

interface SocialProjectsProps {
  projects: Project[];
  role?: string;
}

const SocialProjects = ({ projects, role }: SocialProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");

  return (
    <div id="projects" className="relative py-20 px-4 sm:px-8"
      style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)" }}
    >
      <div className="max-w-[85rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-pink-400 uppercase tracking-wider mb-4 block">Campaign Portfolio</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Viral Campaigns</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Data-driven social media campaigns that engage audiences and drive conversions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all"
            >
              <div className="relative aspect-video">
                <Link
                  href={`${rolePrefix}/projects/${project.id}`}
                  onClick={() => trackProject({ project_id: project.id, project_title: project.title, action: "view_detail" })}
                >
                  {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-900/30 to-purple-900/30 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-pink-500/30" />
                    </div>
                  )}
                </Link>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-pink-400">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{(index + 1) * 12}K</span>
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{(index + 1) * 3}K</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{(index + 1) * 50}K</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/50 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">{tech}</span>
                  ))}
                </div>

                <Link href={`${rolePrefix}/projects/${project.id}`}
                  onClick={() => trackProject({ project_id: project.id, project_title: project.title, action: "view_detail" })}
                >
                  <Button variant="outline" className="rounded-full border-pink-500/30 hover:border-pink-500 text-pink-400 hover:bg-pink-500/10">
                    View Campaign
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

export default SocialProjects;
