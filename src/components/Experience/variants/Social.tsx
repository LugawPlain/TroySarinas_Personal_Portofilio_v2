"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import { motion } from "framer-motion";
import { TrendingUp, Users, Heart } from "lucide-react";

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

interface SocialExperienceProps {
  initialExperience: ExperienceItem[];
}

// Parse highlights to extract impact metrics
const parseMetric = (title: string): { value: string; label: string } | null => {
  const metricMatch = title.match(/^(\d+%?|\$?[\d.]+[MK]?)\s*(.+)$/i);
  if (metricMatch) {
    return { value: metricMatch[1], label: metricMatch[2] };
  }
  return null;
};

const SocialExperience = ({ initialExperience }: SocialExperienceProps) => {
  return (
    <div
      id="experience"
      className="relative py-20 px-4 sm:px-8 bg-gray-950"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">
            Career Impact
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Experience & Impact
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Driving engagement and growth through strategic social media management.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {initialExperience.map((exp, index) => {
          const metricHighlights = exp.highlights
            .map((h) => ({ ...h, metric: parseMetric(h.title) }))
            .filter((h) => h.metric);

          return (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-12 last:mb-0"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all">
                {/* Top Bar */}
                <div className={`${exp.logo_bg_color || "bg-gray-800"} p-6 flex items-center gap-4`}>
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                    {exp.logo_url ? (
                      <Image
                        src={exp.logo_url}
                        height={40}
                        width={40}
                        alt={exp.company}
                        className="object-contain"
                      />
                    ) : (
                      <MdImageNotSupported size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <p className="text-white/70">{exp.title}</p>
                  </div>
                </div>

                {/* Metrics Banner */}
                {metricHighlights.length > 0 && (
                  <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-b border-gray-800 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-pink-400" />
                      <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Key Impact</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {metricHighlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                          <p className="text-2xl font-bold text-white">
                            {highlight.metric!.value}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{highlight.metric!.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-500 bg-gray-800 px-3 py-1 rounded-full">{exp.period}</span>
                    <span className="text-sm text-gray-500">{exp.location}</span>
                  </div>

                  <p className="text-gray-400 mb-6">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialExperience;
