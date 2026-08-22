"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground/90">
            About the Project
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="p-6 bg-primary rounded-xl border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground text-center">
              Project Links
            </h3>
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
