import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getEducation } from "@/lib/roles";

interface EducationProps {
  role?: string;
}

const Education = async ({ role }: EducationProps) => {
  const educationItems = await getEducation(role);

  if (educationItems.length === 0) return null;

  return (
    <div
      id="education"
      className="px-4 flex-col flex items-center justify-center relative w-full"
    >
      <h1 className="text-center text-3xl sm:text-4xl mb-10 font-bold text-foreground/90">
        Education 🎓
      </h1>
      <div className="flex flex-col gap-8 w-full max-w-[80rem]">
        {educationItems.map((edu) => (
          <div
            key={edu.id}
            className="shadow-2xl bg-primary overflow-clip rounded-2xl font-inter relative w-full grid grid-cols-1 xl:grid-cols-[minmax(0,160px)_1fr]"
          >
            <div
              className={`bg-[#6a0106] flex justify-center items-center h-full min-h-[160px] xl:min-h-0 shrink`}
            >
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center p-2 shadow-inner">
                {edu.logo_url ? (
                  <Image
                    src={edu.logo_url}
                    height="80"
                    width="80"
                    alt={`${edu.school} Logo`}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-4xl text-primary font-bold">
                    {edu.school.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col xl:flex-row py-4">
              <div className="p-4 gap-2 flex flex-col grow">
                <h2 className="text-2xl font-semibold text-secondary">
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
                </h2>
                <div>
                  <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
                    {edu.degree}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {edu.period}
                  </p>
                </div>
                <p className="text-sm leading-relaxed mt-2">
                  {edu.description}
                </p>
              </div>
              <div className="flex flex-col px-4 border-l border-border xl:min-w-80 xl:max-w-80">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-start mt-2 text-secondary">
                    Key Courses & Highlights
                  </h2>
                  <ul className="text-sm mt-3 gap-3 flex flex-col">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div className="text-lg leading-none">
                          {highlight.icon}
                        </div>
                        <p className="leading-tight">{highlight.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
