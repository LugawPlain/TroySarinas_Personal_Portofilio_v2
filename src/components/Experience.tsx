import Image from "next/image";
import React from "react";

// Define your experience data here
const experienceData = [
  {
    logo: "/FreelanceLogo.png",
    logoSize: { height: 70, width: 70 },
    logoBgColor: "bg-black",
    title: "Software Engineer and Automation Engineer",
    company: "Freelancer",
    period: "June 2024 - Present",
    location: "Remote",
    description: "Provided clients with Custom Websites and Custom Automations",
    showHighlights: true,
    highlights: [], // Add your highlights as strings if needed
    technologies: ["Next js", "Javascript", "TailwindCSS", "Python", "N8n"],
    layout: "full", // 'full' for the detailed layout with highlights section
  },
  {
    logo: "/RITSLogo.png",
    logoSize: { height: 80, width: 80 },
    logoBgColor: "bg-cyan-400",
    title: "Information Technology Technician",
    company: "RITs IT",
    period: "November 2024 - January 2025",
    location: "Cavite, Philippines",
    description:
      "Responsible for maintaining and troubleshooting computer systems,networks, and software. I also provide technical support to usersand ensure the smooth operation of IT infrastructure. Additionally, I assist in the deployment and configuration of new hardware and software.",
    showHighlights: false,
    highlights: [],
    technologies: [
      "Microsoft Ecosystem",
      "Docker",
      "AWS",
      "Cloudflare",
      "Google Cloud Service",
    ],
    layout: "simple",
  },
  {
    logo: "/LZCybersecurityLogo.png",
    logoSize: { height: 80, width: 80 },
    logoBgColor: "bg-white",
    title: "Developer Intern",
    company: "LZ Cybersecurity",
    period: "April 2024 - June 2024",
    location: "Manila, Philippines",
    description:
      "I developed a web application for creating penetration testing documents for clients",
    showHighlights: true,
    highlights: ["Showd sghasdaswpoaspdlk", "ASDADWIDUASODAIUSODIASsdasds"],
    technologies: ["Next Js", "Javascript", "Python", "Tailwind CSS"],
    layout: "simple",
  },
];

const Experience = () => {
  return (
    <div
      id="experience"
      className="px-4 font-inter flex flex-col space-y-4 justify-center items-center"
    >
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        Experience
      </h1>

      {experienceData.map((exp, index) => (
        <div
          key={index}
          className="shadow-2xl overflow-clip rounded-2xl max-w-[80rem] w-full grid grid-cols-1 xl:grid-cols-[minmax(0,160px)_1fr] xl:grid-rows-1"
        >
          {/* Logo Section */}
          <div
            className={`${exp.logoBgColor} flex justify-center items-center h-full shrink`}
          >
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
              <Image
                src={exp.logo}
                height={exp.logoSize.height}
                width={exp.logoSize.width}
                alt={`${exp.company} Logo`}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col xl:flex-row py-4">
            {/* Main Info */}
            <div className="flex grow flex-col px-4">
              <h2 className="text-2xl font-semibold">{exp.title}</h2>
              <h3 className="text-lg font-medium">{exp.company}</h3>
              <p className="mt-2 font-medium">{exp.period}</p>
              <p className="text-sm text-muted-foreground">{exp.location}</p>
              <p className="mt-2 font-fraunces text-md">{exp.description}</p>
              <hr />
            </div>

            {/* Highlights and Technologies Section */}
            {exp.layout === "full" && (
              <div className="flex flex-col px-4 border-l border-border w-80">
                {exp.showHighlights && exp.highlights.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-start mt-2">
                      Highlights
                    </h2>
                    <div className="space-y-2 mt-2">
                      {exp.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="mx-auto min-w-full bg-gray-200 border-border min-h-20 rounded-lg p-3"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mt-2">Technologies</h3>
                  <div className="flex flex-wrap text-xs text-white gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-500 px-2 py-0.5 rounded-full"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Simple Layout - Technologies Only */}
            {exp.layout === "simple" && (
              <div className="px-4">
                <h3 className="text-lg font-semibold mt-2">Technologies</h3>
                <div className="flex flex-wrap text-xs text-white gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
