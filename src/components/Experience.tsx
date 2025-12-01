import Image from "next/image";
import React from "react";
import { MdStars } from "react-icons/md";
import { RiTimer2Line } from "react-icons/ri";
import { MdImageNotSupported } from "react-icons/md";
import { FaBolt } from "react-icons/fa";
import { FaGears, FaStar } from "react-icons/fa6";
interface Highlight {
  icon?: React.ReactNode;
  title: string;
  label: string;
}

interface ExperienceItem {
  logo: string;
  logoSize: { height: number; width: number };
  logoBgColor: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  showHighlights: boolean;
  highlights: Highlight[];
  technologies: string[];
}

const experienceData: ExperienceItem[] = [
  {
    logo: "/FreelanceLogo.png",
    logoSize: { height: 70, width: 70 },
    logoBgColor: "bg-black",
    title: "Software Engineer and Automation Engineer",
    company: "Freelancer",
    period: "June 2024 - Present",
    location: "Remote",
    description:
      "Designed and implemented end-to-end software and automation solutions for clients, combining web development with AI automation. Projects include building custom web applications, integrating APIs, and automating workflows across platforms such as Slack, Airtable, and GoHighLevel to improve productivity and scalability.",
    showHighlights: true,
    highlights: [
      {
        icon: <FaStar size="40" className="text-accent" />,
        title: "Improved app load time by 20%",
        label: "App Performance",
      },
    ],
    technologies: ["Next js", "Javascript", "TailwindCSS", "Python", "N8n"],
  },
  {
    logo: "/FreelanceLogo.png",
    logoSize: { height: 70, width: 70 },
    logoBgColor: "bg-black",
    title: "Software Engineer and Automation Engineer",
    company: "Freelancer",
    period: "June 2024 - Present",
    location: "Remote",
    description:
      "Designed and implemented end-to-end software and automation solutions for clients, combining web development with AI automation. Projects include building custom web applications, integrating APIs, and automating workflows across platforms such as Slack, Airtable, and GoHighLevel to improve productivity and scalability.",
    showHighlights: true,
    highlights: [
      {
        icon: <FaStar size="40" className="text-accent" />,
        title: "Improved app load time by 20%",
        label: "App Performance",
      },
    ],
    technologies: ["Next js", "Javascript", "TailwindCSS", "Python", "N8n"],
  },
  {
    logo: "",
    logoSize: { height: 70, width: 70 },
    logoBgColor: "bg-gray-600",
    title: "AI Automation Engineer",
    company: "Abigail Hub",
    period: "May 2025 - July 2025",
    location: "Canada",
    description:
      "Led the restructuring of business operations by designing and implementing AI-driven automation systems that streamlined workflows and eliminated repetitive manual tasks. Integrated intelligent agents using N8n and OpenAI APIs to enhance productivity, accuracy, and scalability across departments.",
    showHighlights: true,
    highlights: [
      {
        icon: <FaGears size="40" className="text-accent" />,
        title: "Efficiency +40%",
        label: "Automated",
      },
    ],
    technologies: ["N8n", "ParseLlama", "OpenAI", "Python", "Javascript"],
  },
  {
    logo: "/Yortech.png",
    logoSize: { height: 70, width: 70 },
    logoBgColor: "bg-blue-400",
    title: "GoHighLevel Assistant",
    company: "YorTech",
    period: "April 2025 - Present",
    location: "Philippines",
    description:
      "Troubleshoot and optimize GoHighLevel automations while designing high-performing funnels and CRM workflows. Integrated tools such as Zapier and Typeform to enhance lead generation, client engagement, and overall system reliability.",
    showHighlights: true,
    highlights: [
      {
        icon: <FaBolt size="40" className="text-accent" />,
        title: "Built 10+ end-to-end automations in GoHighLevel",
        label: "Automation Workflows",
      },
    ],
    technologies: [
      "Zapier",
      "GoHighLevel",
      "Trello",
      "TypeForm",
      "Javascript",
      "Python",
    ],
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
    showHighlights: true,
    highlights: [
      {
        icon: <MdStars size="40" className="text-primary-500 " />,
        title: "Resolve 97% of technical support tickets",
        label: "Reducing downtime and improving productivity",
      },
    ],
    technologies: [
      "Microsoft Ecosystem",
      "Docker",
      "AWS",
      "Cloudflare",
      "Google Cloud Service",
    ],
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
      "Collaborated with the cybersecurity team to design and implement a web tool that simplified and standardized client penetration testing documentation workflows.",
    showHighlights: true,
    highlights: [
      {
        icon: <RiTimer2Line size="40" className="text-primary-500" />,
        title: "Time Saved",
        label: "+50% faster document generation",
      },
    ],
    technologies: [
      "Next Js",
      "Javascript",
      "Python",
      "Tailwind CSS",
      "REST APIs",
    ],
  },
];

const Experience = () => {
  return (
    <div
      id="experience"
      className="px-4 font-inter flex relative flex-col space-y-8 justify-center overflow-x-clip items-center"
    >
      <div className="absolute top-1/2 bg-secondary/50 h-100 w-900 skew-12 -z-10 "></div>
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6 text-foreground/90">
        Experience
      </h1>

      {experienceData.map((exp, index) => (
        <div
          key={index}
          className="shadow-lg bg-primary hover:shadow-2xl transtion duration-150 border-border border overflow-clip rounded-2xl max-w-[80rem] w-full grid grid-cols-1 xl:grid-cols-[minmax(0,160px)_1fr] xl:grid-rows-1"
        >
          {/* Logo Section */}
          <div
            className={`${exp.logoBgColor} flex justify-center items-center h-full shrink xl:border-r-2 border-border`}
          >
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
              {exp.logo ? (
                <Image
                  src={exp.logo}
                  height={exp.logoSize.height}
                  width={exp.logoSize.width}
                  alt={`${exp.company} Logo`}
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
              <hr />
            </div>

            <div className="flex flex-col px-4 border-l border-border xl:min-w-80 xl:max-w-80">
              {exp.showHighlights && exp.highlights.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-xl text-secondary font-bold text-start mt-2">
                    Highlights
                  </h2>
                  <div className="space-y-2 mt-2">
                    {exp.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="mx-auto  min-w-full flex bg-gray-200/50 hover:bg-gray-200 hover:-translate-x-1 transition duration-300 hover:-translate-y-1 border-border min-h-20 items-center rounded-lg p-3"
                      >
                        <div className="flex items-center">
                          <div className="shrink min-w-fit text-accent">
                            {highlight.icon}
                          </div>
                          <div className="grow text-start ml-2">
                            <h4 className="text-lg/6 font-semibold font-montserrat">
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
                <div className="flex flex-wrap  text-xs text-white gap-2">
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
