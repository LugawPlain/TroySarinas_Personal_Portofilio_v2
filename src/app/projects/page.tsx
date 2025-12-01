"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import IntersectingTiltAngles from "@/components/Icons/IntersectingTiltAngles";
import { Button } from "@/components/ui/button";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import ArcDivider from "@/components/Icons/ArcDivider";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  clickedImage: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectsData: Project[] = [
  {
    id: "yorticia",
    title: "Yorticia.com",
    description:
      "Created a stunning personal portfolio website for model Yorticia, enhancing her online presence and providing a dedicated space to display her work and connect with industry professionals. The site features an image-rich gallery and detailed service listings,implementing Authentication and Authorization for CRUD operations",
    image: "/YorticiaWebsiteThumbnail.png",
    clickedImage: "/YorticiaWebsite.png",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Javascript",
      "Cloudflare",
      "Firebase",
    ],
    liveUrl: "https://Yorticia.com/",
    githubUrl: "https://github.com/LugawPlain/Yorticia",
  },
  {
    id: "vr-sscr",
    title: "VR SSCR",
    description:
      "Created a VR educational experience for SSCRDC students focused on microcontrollers and logic gates. The simulation allowed students to interactively build virtual circuits, visualize signal flow, and grasp complex digital logic concepts in an intuitive 3D environment",
    image: "/VRSSCR.webp",
    clickedImage: "/VRSSCR.png",
    technologies: ["Javascript", "Aframe", "Three.js", "Blender", "Python"],
    liveUrl: "https://vr-sscr.netlify.app/",
    githubUrl: "https://github.com/LugawPlain/VR-SSCR",
  },
  {
    id: "LeadEntryAutomation",
    title: "Lead Entry & Enrichment Automation",
    description:
      "Automating Lead Entry Process storing them in Airtable along lead enrichment using APIFY and Firecrawl to extract data from websites and APIs lastly creating a Notion page for each lead",
    image: "/LeadEntryProjectThumbnail.png",
    clickedImage: "/LeadEntryProject.png",
    technologies: ["N8n", "APIFY", "Firecrawl", "Tally ", "Airtable", "Notion"],
    liveUrl: "https://tally.so/r/5BXrkd",
    githubUrl: "",
  },
  {
    id: "RAGVectorDatabaseAutomation",
    title: "RAG Vector Database Automation",
    description:
      "Automating Lead Entry Process storing them in Airtable along lead enrichment using APIFY and Firecrawl to extract data from websites and APIs lastly creating a Notion page for each lead",
    image: "/RAGVectorDatabaseThumbnail.png",
    clickedImage: "/RAGVectorDatabase.png",
    technologies: ["N8n", "Supabase", "Google Drive", "OpenAI", "Postgres"],
    liveUrl: "#",
    githubUrl: "",
  },
];

import { useMediaQuery } from "@/hooks/use-media-query";

const ProjectsContent = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const selectedProject =
    projectsData.find((p) => p.id === projectId) || projectsData[0];
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className="h-svh">
        <h1 className="mt-2 mb-2 text-center font-bold text-3xl sm:text-4xl  text-foreground/90">
          Projects
        </h1>
        <div className="px-4 py-4">
          <ResizablePanelGroup
            direction={isDesktop ? "horizontal" : "vertical"}
            className="min-h-[600px] max-h-[800px] w-[95%] rounded-lg border-3 md:min-w-[450px]"
          >
            <ResizablePanel defaultSize={75}>
              <div className="relative h-full w-full flex flex-col  items-center">
                <IntersectingTiltAngles className="top-0 absolute -z-10 opacity-85" />
                <motion.div
                  key={selectedProject.id}
                  className="relative w-full min-h-[70%] h-[70%] max-h-[70%] max-w-4xl aspect-video mb-6"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                >
                  <Image
                    className="object-contain"
                    src={selectedProject.clickedImage}
                    fill
                    alt={selectedProject.title}
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                </motion.div>
                <div className="absolute top-[60%] h-[40%] w-full">
                  <ArcDivider className="top-0 absolute h-full w-full -z-10" />
                </div>
                <motion.div
                  key={`${selectedProject.id}-details`}
                  className="w-full min-h-[30%] h-[30%] max-h-[30%] text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                >
                  <div className="px-2 xl:px-4 mt-auto mb-2 text-center flex h-full flex-col max-w-4xl mx-auto flex-1">
                    <div className="space-y-2 mb-2">
                      <h3 className="font-semibold font-fraunces text-3xl text-secondary">
                        {selectedProject.title}
                      </h3>
                      <p className="text-start  text-muted-foreground">
                        &emsp; {selectedProject.description}
                      </p>
                    </div>
                    <div className="border-t border-secondary pt-2">
                      <div className="flex flex-wrap justify-center text-sm text-white gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <div
                            key={tech}
                            className="bg-secondary/80 pointer-events-none text-secondary-foreground px-2 py-0.5 rounded-full"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-4">
                        {selectedProject.liveUrl && (
                          <Link
                            href={selectedProject.liveUrl}
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

                        {selectedProject.githubUrl && (
                          <Link
                            href={selectedProject.githubUrl}
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

                        {!selectedProject.githubUrl &&
                          selectedProject.liveUrl && (
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
                </motion.div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="w-1" />
            <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
              <div className="flex flex-col overflow-y-auto h-full  gap-8  p-4">
                {projectsData.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects?id=${project.id}`}
                    className={`pb-2 card group cursor-pointer bg-primary font-fraunces flex-col flex rounded-2xl shadow-lg min-h-[280px] transition-all duration-300 ${
                      selectedProject.id === project.id
                        ? "border-3 border-secondary scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                  >
                    <div className="relative w-full aspect-video overflow-hidden rounded-t-lg  bg-gray-500 border-b border-border">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-125 transition duration-300 group-hover:grayscale-50"
                      />
                    </div>
                    <div className="px-2 xl:px-4 mt-1 mb-1 text-center flex h-full flex-col flex-1">
                      <div className="space-y-2 mb-1">
                        <h3 className="font-semibold text-xl text-secondary line-clamp-1">
                          {project.title}
                        </h3>
                      </div>
                      <div className=" border-t border-border pt-1">
                        <div className="flex  flex-wrap text-xs text-white gap-2  overflow-hidden">
                          {project.technologies.map((tech) => (
                            <div
                              key={tech}
                              className="bg-secondary/80 pointer-events-none text-secondary-foreground px-2 py-0.5 rounded-full"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectsContent />
    </Suspense>
  );
};

export default Page;
