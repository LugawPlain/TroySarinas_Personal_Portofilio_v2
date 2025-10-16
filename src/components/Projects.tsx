import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { MdArrowOutward } from "react-icons/md";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectsData: Project[] = [
  {
    id: "yorticia",
    title: "Yorticia.com",
    description:
      "Created a stunning personal portfolio website for model Yorticia, enhancing her online presence and providing a dedicated space to display her work and connect with industry professionals. The site features an image-rich gallery and detailed service listings",
    image: "/YorticiaWebsite.png",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Javascript",
      "Cloudflare",
      "Firebase",
    ],
    liveUrl: "https://Yorticia.com/",
    githubUrl: "",
  },
  {
    id: "vr-sscr",
    title: "VR SSCR",
    description:
      "Created a VR educational experience for SSCRDC students focused on microcontrollers and logic gates. The simulation allowed students to interactively build virtual circuits, visualize signal flow, and grasp complex digital logic concepts in an intuitive 3D environment",
    image: "/VRSSCR.webp",
    technologies: ["Javascript", "Aframe", "Three.js", "Python"],
    liveUrl: "https://vr-sscr.netlify.app/",
    githubUrl: "",
  },
  {
    id: "n8n-automations",
    title: "N8n Automations",
    description:
      "Creating automations for streamlining workflows and integrating various APIs to enhance productivity. Using AI Agents to automate tasks and improve efficiency.",
    image: "/AgentsN8n.png",
    technologies: ["N8n", "Javascript", "Python", "API Integrations"],
    liveUrl: "#",
    githubUrl: "",
  },
];

const Projects = () => {
  return (
    <div id="projects" className="items-center flex flex-col py-2 px-4">
      <div className="space-y-8 flex flex-col justify-center items-center max-w-[90rem]">
        <h1 className="text-center font-bold text-3xl sm:text-4xl mt-2 text-foreground/90">
          Projects
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="pb-2 card bg-primary font-fraunces flex-col flex shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-gray-500 border-b border-border">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.liveUrl || "#"}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-125 transition duration-300 hover:grayscale-50"
                  />
                </Link>
              </div>
              <div className="px-2 xl:px-4 mt-2 mb-2 text-center flex h-full flex-col flex-1">
                <div className="space-y-2 mb-2">
                  <h3 className="font-semibold text-2xl text-secondary">
                    {project.title}
                  </h3>
                  <p className="text-start text-muted-foreground">
                    &emsp; {project.description}
                  </p>
                </div>
                <div className="mt-auto border-t border-border pt-2">
                  <div className="flex flex-wrap text-xs text-white gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-full"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant={"default"}
                          className="w-full text-secondary text-sm cursor-pointer font-semibold px-4 py-2.5 rounded-lg hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-2"
                        >
                          <FiExternalLink size={18} />
                          Live Demo
                        </Button>
                      </Link>
                    )}

                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant={"outline"}
                          className="w-full text-secondary text-sm cursor-pointer font-semibold px-4 py-2.5 rounded-lg hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-2"
                        >
                          <FiGithub size={18} />
                          Code
                        </Button>
                      </Link>
                    )}

                    {!project.githubUrl && project.liveUrl && (
                      <div className="flex-1 opacity-50  cursor-not-allowed">
                        <Button
                          variant={"outline"}
                          disabled
                          className="w-full text-secondary text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2"
                        >
                          <FiGithub size={18} />
                          Private
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/projects">
        <Button className="mx-auto mt-4" variant={"outline"}>
          See more <MdArrowOutward />
        </Button>
      </Link>
    </div>
  );
};

export default Projects;
