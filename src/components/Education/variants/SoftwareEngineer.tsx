"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, BookOpen, Award } from "lucide-react";

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  logo_url: string;
  website_url?: string;
  description: string;
  highlights: { icon: string; text: string }[];
}

interface EducationProps {
  educationItems: EducationItem[];
}

const SoftwareEngineerEducation = ({ educationItems }: EducationProps) => {
  if (educationItems.length === 0) return null;

  return (
    <div
      id="education"
      className="relative py-16 px-4"
    >
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Academic Background
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            Education
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            Formal education and continuous learning that shaped my technical foundation.
          </p>
        </div>

        <div className="space-y-8">
          {educationItems.map((edu, index) => {
            const isEven = index % 2 === 0;
            const gradient = isEven 
              ? "from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.1)]"
              : "from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)]";
            const borderColor = isEven
              ? "border-[rgba(59,130,246,0.3)]"
              : "border-[rgba(17,153,142,0.3)]";

            return (
              <div
                key={edu.id}
                className={`relative backdrop-blur-[20%] bg-linear-to-br ${gradient} 
                  ${borderColor} border-2 rounded-3xl overflow-hidden
                  hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
              >
                <div className="grid grid-cols-1 xl:grid-cols-[140px_1fr]">
                  {/* Logo Section */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center p-6 xl:border-r-2 border-gray-200/50"
                  >
                    <div className="h-24 w-24 bg-white rounded-2xl flex items-center justify-center p-3 shadow-lg"
                    >
                      {edu.logo_url ? (
                        <Image
                          src={edu.logo_url}
                          height="60"
                          width="60"
                          alt={`${edu.school} Logo`}
                          className="object-contain"
                        />
                      ) : (
                        <div className="text-3xl text-secondary font-bold">
                          {edu.school.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 xl:p-8">
                    <div className="flex flex-col xl:flex-row xl:gap-8">
                      <div className="flex-1">
                        <h3 className="font-fraunces text-2xl font-semibold text-secondary mb-2">
                          {edu.website_url ? (
                            <Link
                              href={edu.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent transition-colors"
                            >
                              {edu.school}
                            </Link>
                          ) : (
                            edu.school
                          )}
                        </h3>
                        <div className="mb-4">
                          <span className="text-sm font-bold uppercase tracking-wider text-secondary/70">
                            {edu.degree}
                          </span>
                          <span className="mx-2 text-stone-400">•</span>
                          <span className="text-sm font-spacemono text-stone-500">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-stone-600/80 font-light leading-relaxed">
                          {edu.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="mt-6 xl:mt-0 xl:min-w-72 xl:max-w-80">
                        <h4 className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider mb-4">
                          Key Courses & Highlights
                        </h4>
                        <ul className="space-y-3">
                          {edu.highlights.map((highlight, idx) => (
                            <li 
                              key={idx} 
                              className="flex gap-3 items-start bg-white/30 backdrop-blur-sm rounded-xl p-3 border border-white/50"
                            >
                              <span className="text-lg leading-none mt-0.5">
                                {highlight.icon}
                              </span>
                              <span className="text-sm text-stone-600 leading-relaxed">
                                {highlight.text}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
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

export default SoftwareEngineerEducation;
