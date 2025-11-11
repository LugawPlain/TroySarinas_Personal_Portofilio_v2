import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
    technologies: ["N8n", "Javascript", "API Integrations", "Python"],
    liveUrl: "#",
    githubUrl: "",
  },
];

const page = () => {
  return (
    <>
      <h1 className="mt-8 mb-8 text-center font-bold text-3xl sm:text-4xl  text-foreground/90">
        Projects
      </h1>
      <div className="px-4">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px] max-h-[700px] w-[95%] rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="mx-4" />
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <div className="flex flex-col overflow-y-auto h-full  items-center gap-4 p-4">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="pb-2 card group cursor-pointer bg-primary font-fraunces flex-col flex rounded-2xl shadow-sm min-h-[280px]"
                >
                  <div className="relative w-full aspect-video overflow-hidden rounded-t-lg  bg-gray-500 border-b border-border">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.liveUrl || "#"}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-125 transition duration-300 group-hover:grayscale-50"
                      />
                    </Link>
                  </div>
                  <div className="px-2 xl:px-4 mt-1 mb-1 text-center flex h-full flex-col flex-1">
                    <div className="space-y-2 mb-1">
                      <h3 className="font-semibold text-xl text-secondary line-clamp-1">
                        {project.title}
                      </h3>
                      {/* <p className="text-start text-sm text-muted-foreground">
                        &emsp; {project.description}
                      </p> */}
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
                </div>
              ))}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default page;
