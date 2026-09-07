"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";
const ProjectImage = ({
  project,
  onLoadingComplete,
}: {
  project: Project;
  onLoadingComplete?: () => void;
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadingComplete?.();
  };

  return (
    <div className="relative">
      <motion.div
        className="relative z-10 w-full aspect-video my-24 "
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.clickedImage || project.image ? (
          <Image
            src={(project.clickedImage || project.image)!}
            alt={project.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain p-2 sm:p-4 origin-center"
            priority
            onLoad={handleLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground">No Preview Available</span>
          </div>
        )}
      </motion.div>

      {!isLoaded && (project.clickedImage || project.image) && (
        <div className="absolute inset-0 w-full aspect-video rounded-2xl bg-transparent animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProjectImage;
