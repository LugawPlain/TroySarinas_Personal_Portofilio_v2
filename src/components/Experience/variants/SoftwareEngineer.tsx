"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import DynamicIcon from "../../DynamicIcon";
import { Terminal, Briefcase, MapPin, Calendar } from "lucide-react";

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

const SoftwareEngineerExperience = ({ initialExperience }: ExperienceProps) => {
  return (
    <div
      id="experience"
      className="relative py-16 px-4"
    >
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Career Path
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            Professional Experience
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            My journey through the tech industry, building scalable solutions and leading development teams.
          </p>
        </div>

        <div className="space-y-8">
          {initialExperience.map((exp, index) => {
            const isEven = index % 2 === 0;
            const gradient = isEven 
              ? "from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)]"
              : "from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)]";
            const borderColor = isEven
              ? "border-[rgba(102,126,234,0.3)]"
              : "border-[rgba(17,153,142,0.3)]";
            const shadowColor = isEven
              ? "shadow-[rgba(118,75,162,0.3)]"
              : "shadow-[rgba(56,239,125,0.3)]";

            return (
              <div
                key={exp.id || index}
                className={`relative backdrop-blur-[20%] bg-linear-to-br ${gradient} 
                  ${borderColor} border-2 rounded-3xl overflow-hidden
                  hover:shadow-2xl hover:${shadowColor} transition-all duration-500
                  hover:-translate-y-1`}
              >
                <div className="grid grid-cols-1 xl:grid-cols-[140px_1fr]">
                  {/* Logo Section */}
                  <div className={`${exp.logo_bg_color || "bg-gradient-to-br from-gray-100 to-gray-200"} 
                    flex justify-center items-center p-6 xl:border-r-2 ${borderColor}`}
                  >
                    <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                      {exp.logo_url ? (
                        <Image
                          src={exp.logo_url}
                          height={60}
                          width={60}
                          alt={`${exp.company} Logo`}
                          className="object-contain"
                        />
                      ) : (
                        <MdImageNotSupported size={24} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 xl:p-8">
                    <div className="flex flex-col xl:flex-row xl:gap-8">
                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="font-fraunces text-2xl font-semibold text-secondary">
                            {exp.title}
                          </h3>
                          <span className="text-sm font-spacemono text-stone-500">
                            @ {exp.company}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-stone-500 font-spacemono">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-stone-600/80 font-light leading-relaxed mb-6">
                          {exp.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <div
                              key={idx}
                              className="bg-white/40 backdrop-blur-sm text-secondary text-xs font-medium px-3 py-1 rounded-full border border-white/50"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mt-6 xl:mt-0 xl:min-w-72 xl:max-w-80">
                          <h4 className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider mb-4">
                            Key Highlights
                          </h4>
                          <div className="space-y-3">
                            {exp.highlights.map((highlight, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 bg-white/30 backdrop-blur-sm rounded-xl p-3 border border-white/50 hover:bg-white/50 hover:-translate-x-1 hover:-translate-y-0.5 transition-all duration-300"
                              >
                                <div className="shrink-0 text-secondary/70">
                                  {highlight.icon && (
                                    <DynamicIcon name={highlight.icon} size={32} />
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-sm text-secondary">
                                    {highlight.title}
                                  </h5>
                                  <p className="text-xs text-stone-500">
                                    {highlight.label}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SoftwareEngineerExperience;
