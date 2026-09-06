"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import ProjectImage from "@/components/ProjectImage";
import { Project } from "@/lib/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import LeadGeneratorDemo from "@/components/LeadGeneratorDemo";

interface ProjectDetailsClientProps {
  project: Project;
}

export const ProjectDetailsClient = ({
  project,
}: ProjectDetailsClientProps) => {
  const [isAssetLoaded, setIsAssetLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Image Section - This triggers the reveal */}
      <ProjectImage
        project={project}
        onLoadingComplete={() => setIsAssetLoaded(true)}
      />

      {project.demoType === "lead-generator" && (
        <LeadGeneratorDemo projectId={project.id} />
      )}

      {/* Content Section - Animated only after image starts showing or with a stagger */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isAssetLoaded ? "visible" : "hidden"}
        className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
      >
        <motion.div variants={itemVariants} className="space-y-5 md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-secondary/50" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary/70">
              Project story
            </p>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground/90">
            About the Project
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {project.description}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="rounded-2xl border border-border bg-primary p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Project Links
              </h3>
              <Layers className="h-5 w-5 text-secondary/60" />
            </div>
            <div className="space-y-3">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 hover:bg-secondary hover:text-background transition-colors font-semibold ">
                    <FiExternalLink /> Live Demo
                  </Button>
                </Link>
              )}
              {project.githubUrl ? (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 font-semibold"
                  >
                    <FiGithub /> View Code
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="w-full gap-2 font-semibold opacity-70 cursor-not-allowed"
                >
                  <FiGithub /> Private Repository
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
