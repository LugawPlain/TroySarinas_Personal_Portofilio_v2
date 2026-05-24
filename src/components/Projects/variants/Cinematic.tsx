"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import { Project } from "@/lib/projects";
import { useTrack } from "@/hooks/use-track";

interface CinematicProjectsProps {
  projects: Project[];
  role?: string;
}

const CinematicProjects = ({ projects }: CinematicProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const trackProject = useTrack("project_click", "projects");

  return (
    <>
      <div id="projects" className="relative py-20 px-4 sm:px-8 bg-black">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-amber-400/80 mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-4">
            Selected Works
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            A curated collection of video projects spanning commercial, narrative, and branded content.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => {
              const isLarge = index === 0 || index === 3;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                    isLarge ? "md:col-span-2 lg:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setSelectedProject(project);
                    trackProject({
                      project_id: project.id,
                      project_title: project.title,
                      action: "view_detail",
                    });
                  }}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          hoveredIndex === index ? "scale-110" : "scale-100"
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-60"
                    }`} 
                  />

                  {/* Play Button */}
                  <motion.div
                    initial={false}
                    animate={{
                      scale: hoveredIndex === index ? 1 : 0.8,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      initial={false}
                      animate={{
                        y: hoveredIndex === index ? 0 : 10,
                        opacity: hoveredIndex === index ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xs font-medium tracking-wider uppercase text-amber-400/80 mb-2 block">
                        {project.technologies[0] || "Video Project"}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <motion.p
                        initial={false}
                        animate={{
                          height: hoveredIndex === index ? "auto" : 0,
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-white/60 overflow-hidden"
                      >
                        {project.description}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Border Glow on Hover */}
                  <div 
                    className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 pointer-events-none ${
                      hoveredIndex === index ? "border-amber-500/50" : "border-transparent"
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Video Placeholder */}
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6">
                  {selectedProject.image ? (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <span className="text-xs font-medium tracking-wider uppercase text-amber-400/80 mb-2 block">
                      {selectedProject.technologies[0] || "Video Project"}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                      {selectedProject.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                        Tools Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm font-medium">Watch Full Video</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CinematicProjects;
