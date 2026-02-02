"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import DynamicIcon from "./DynamicIcon";

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
  role?: string;
  initialExperience: ExperienceItem[];
}

const Experience = ({ role, initialExperience }: ExperienceProps) => {
  return (
    <div
      id="experience"
      className="px-4 font-inter flex relative flex-col space-y-8 justify-center overflow-x-clip items-center"
    >
      <div className="absolute top-1/2 bg-secondary/50 h-100 w-900 skew-12 -z-10 "></div>
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6 text-foreground/90">
        Experience
      </h1>

      {initialExperience.map((exp, index) => (
        <div
          key={exp.id || index}
          className="shadow-lg bg-primary hover:shadow-2xl transition duration-150 border-border border overflow-clip rounded-2xl max-w-[80rem] w-full grid grid-cols-1 xl:grid-cols-[minmax(0,160px)_1fr] xl:grid-rows-1"
        >
          {/* Logo Section */}
          <div
            className={`${exp.logo_bg_color || "bg-black"} flex justify-center items-center h-full shrink xl:border-r-2 border-border p-4`}
          >
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
              {exp.logo_url ? (
                <Image
                  src={exp.logo_url}
                  height={80}
                  width={80}
                  alt={`${exp.company} Logo`}
                  className="object-contain"
                />
              ) : (
                <MdImageNotSupported size={24} className="text-gray-400" />
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col xl:flex-row py-4">
            {/* Main Info */}
            <div className="flex grow flex-col px-4">
              <h2 className="text-2xl text-secondary font-semibold ">
                {exp.title}
              </h2>
              <h3 className="text-lg text-secondary font-medium">
                {exp.company}
              </h3>
              <p className="mt-2 font-medium">{exp.period}</p>
              <p className="text-sm text-muted-foreground">{exp.location}</p>
              <p className="mt-2 font-fraunces text-md">{exp.description}</p>
              <hr className="my-4 border-border" />
            </div>

            <div className="flex flex-col px-4 border-l border-border xl:min-w-80 xl:max-w-80">
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl text-secondary font-bold text-start mt-2">
                    Highlights
                  </h2>
                  <div className="space-y-2 mt-2">
                    {exp.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="mx-auto min-w-full flex bg-gray-200/50 hover:bg-gray-200 hover:-translate-x-1 transition duration-300 hover:-translate-y-1 border-border min-h-20 items-center rounded-lg p-3"
                      >
                        <div className="flex items-center">
                          <div className="shrink min-w-fit text-accent">
                            {highlight.icon && (
                              <DynamicIcon name={highlight.icon} size={40} />
                            )}
                          </div>
                          <div className="grow text-start ml-2">
                            <h4 className="text-lg/6 font-semibold font-montserrat text-gray-800">
                              {highlight.title}
                            </h4>
                            <p className=" text-sm text-muted-foreground">
                              {highlight.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg text-secondary font-semibold mt-2">
                  Technologies
                </h3>
                <div className="flex flex-wrap text-xs text-white gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className="bg-secondary/80 px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
