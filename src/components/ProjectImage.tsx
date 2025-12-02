"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";
const ProjectImage = ({ project }: { project: Project }) => {
  return (
    <div>
      <motion.div
        className="relative w-full aspect-video rounded-2xl overflow-hidden  bg-transparent"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={project.clickedImage || project.image}
          alt={project.title}
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
};

export default ProjectImage;
