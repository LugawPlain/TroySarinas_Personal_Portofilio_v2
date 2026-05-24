"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../../DynamicIcon";
import { Clapperboard } from "lucide-react";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface CinematicTechnologiesProps {
  initialTech: TechItem[];
}

const CinematicTechnologies = ({ initialTech }: CinematicTechnologiesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="technologies"
      className="relative py-20 px-4 sm:px-8 bg-black overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-amber-400/80 mb-4 block">
            Toolkit
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Software & Tools
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            The creative suite powering every project.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {initialTech.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group flex flex-col items-center gap-3 px-6 py-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 shrink-0 cursor-pointer min-w-[120px]"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                  <DynamicIcon name={tech.icon_name} size={32} />
                </div>
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            ))}

            {/* Duplicate for infinite scroll effect */}
            {initialTech.slice(0, 4).map((tech, index) => (
              <motion.div
                key={`dup-${tech.name}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (initialTech.length + index) * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group flex flex-col items-center gap-3 px-6 py-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 shrink-0 cursor-pointer min-w-[120px] opacity-50"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                  <DynamicIcon name={tech.icon_name} size={32} />
                </div>
                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-6 py-3 border border-white/10">
            <Clapperboard className="w-4 h-4 text-amber-400/60" />
            <span className="text-sm text-white/40">
              Proficiency measured by portfolio quality, not self-rated scores
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CinematicTechnologies;
