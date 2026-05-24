"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Film, Calendar } from "lucide-react";

interface ExperienceHighlights {
  icon?: string;
  title: string;
  label: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  highlights: ExperienceHighlights[];
  technologies: string[];
  logo_url: string;
  logo_bg_color: string;
}

interface CinematicExperienceProps {
  initialExperience: ExperienceItem[];
}

const CinematicExperience = ({ initialExperience }: CinematicExperienceProps) => {
  return (
    <div
      id="experience"
      className="relative py-20 px-4 sm:px-8 bg-black overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-medium tracking-[0.3em] uppercase text-amber-400/80 mb-4 block">
          Career
        </span>
        <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-4">
          Clients & Collaborations
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mx-auto">
          Brands and productions I've had the pleasure to work with.
        </p>
      </motion.div>

      {/* Client Logos Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-[80rem] mx-auto mb-16"
      >
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {initialExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="group relative"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300">
                {exp.logo_url ? (
                  <Image
                    src={exp.logo_url}
                    alt={exp.company}
                    width={80}
                    height={80}
                    className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <Film className="w-8 h-8 text-white/30" />
                )}
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-xs text-white/60">{exp.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Compact Timeline */}
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-white/10 to-transparent" />

          {initialExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12 sm:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[11px] sm:left-[27px] top-2 w-3 h-3 rounded-full bg-amber-500 border-2 border-black shadow-lg shadow-amber-500/30" />

              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <div className="flex items-center gap-2 text-amber-400/80 shrink-0">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs font-medium tracking-wider">{exp.period}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-sm text-white/50 mb-2">{exp.company}</p>
                  <p className="text-sm text-white/30 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinematicExperience;
