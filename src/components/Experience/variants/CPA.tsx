"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import DynamicIcon from "../../DynamicIcon";
import { motion } from "framer-motion";
import { Shield, Building2, TrendingUp, Briefcase } from "lucide-react";

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

interface ExperienceProps {
  initialExperience: ExperienceItem[];
}

const parseMetric = (title: string): { value: string; label: string } | null => {
  const metricMatch = title.match(/^(\d+%?|\$?[\d.]+[MK]?|\d+x)\s*(.+)$/i);
  if (metricMatch) {
    return { value: metricMatch[1], label: metricMatch[2] };
  }
  return null;
};

const CPAExperience = ({ initialExperience }: ExperienceProps) => {
  return (
    <div
      id="experience"
      className="px-4 sm:px-8 font-inter flex relative flex-col space-y-12 justify-center overflow-x-clip items-center py-16"
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-[#1e3a5f]" />
          </div>
          <span className="text-sm font-semibold text-[#1e3a5f] uppercase tracking-wider">
            Professional Experience
          </span>
        </div>
        <h1 className="text-center text-3xl sm:text-4xl xl:text-5xl font-bold mb-4 text-gray-900 font-fraunces">
          Firm Experience & Client Impact
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A track record of delivering exceptional financial services across audit, tax, and advisory engagements.
        </p>
      </div>

      {/* Timeline Line */}
      <div className="relative w-full max-w-[80rem]">
        <div className="absolute left-4 sm:left-8 xl:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e3a5f] via-[#2d5a8f] to-[#1e3a5f]/20 hidden sm:block" />

        {initialExperience.map((exp, index) => {
          const isEven = index % 2 === 0;
          const metricHighlights = exp.highlights
            .map((h) => ({ ...h, metric: parseMetric(h.title) }))
            .filter((h) => h.metric);

          const itemClass = isEven
            ? "relative flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12"
            : "relative flex flex-col sm:flex-row-reverse gap-6 sm:gap-12 mb-12";

          const contentClass = isEven
            ? "w-full sm:w-[calc(50%-2rem)] sm:ml-auto sm:pl-8 xl:pl-0"
            : "w-full sm:w-[calc(50%-2rem)] sm:mr-auto sm:pr-8 xl:pr-0";

          return (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={itemClass}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 sm:left-8 xl:left-1/2 w-4 h-4 bg-[#1e3a5f] rounded-full border-4 border-white shadow-lg hidden sm:block transform -translate-x-1/2 mt-8 z-10" />

              {/* Content Card */}
              <div className={contentClass}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Top Bar with Logo and Company Info */}
                  <div className={(exp.logo_bg_color || "bg-[#1e3a5f]") + " p-6 flex items-center gap-4"}>
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-md shrink-0">
                      {exp.logo_url ? (
                        <Image
                          src={exp.logo_url}
                          height={56}
                          width={56}
                          alt={exp.company + " Logo"}
                          className="object-contain"
                        />
                      ) : (
                        <MdImageNotSupported size={28} className="text-gray-400" />
                      )}
                    </div>
                    <div className="text-white">
                      <h2 className="text-xl font-bold">{exp.company}</h2>
                      <p className="text-white/80 text-sm">{exp.title}</p>
                    </div>
                  </div>

                  {/* Metrics Banner - Big Numbers */}
                  {metricHighlights.length > 0 && (
                    <div className="bg-gradient-to-r from-[#1e3a5f]/5 to-[#c9a227]/5 border-b border-[#1e3a5f]/10 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-[#1e3a5f]" />
                        <span className="text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">Key Impact</span>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {metricHighlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="text-center bg-white rounded-xl p-4 shadow-sm border border-[#1e3a5f]/10">
                            <p className="text-2xl sm:text-3xl font-bold text-[#1e3a5f]">
                              {highlight.metric!.value}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 capitalize">
                              {highlight.metric!.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">{exp.period}</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{exp.description}</p>

                    {/* Industry Tags */}
                    <div className="mb-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Client Industries</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Healthcare", "Technology", "Manufacturing", "Real Estate"].map((industry) => (
                          <span
                            key={industry}
                            className="bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-medium px-3 py-1 rounded-full border border-[#1e3a5f]/20"
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Engagement Types */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Engagement Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Audit", "Tax", "Advisory"].map((type) => (
                          <span
                            key={type}
                            className="bg-[#c9a227]/10 text-[#c9a227] text-xs font-medium px-3 py-1 rounded-full border border-[#c9a227]/20"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Other Highlights */}
                    {exp.highlights.filter(h => !parseMetric(h.title)).length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Highlights</h3>
                        <div className="space-y-2">
                          {exp.highlights
                            .filter((h) => !parseMetric(h.title))
                            .map((highlight, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                              >
                                <div className="shrink-0 text-[#1e3a5f] mt-0.5">
                                  {highlight.icon && (
                                    <DynamicIcon name={highlight.icon} size={20} />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-800">
                                    {highlight.title}
                                  </h4>
                                  <p className="text-xs text-gray-500">{highlight.label}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
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

export default CPAExperience;
