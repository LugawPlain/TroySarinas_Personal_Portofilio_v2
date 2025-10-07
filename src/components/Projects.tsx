import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { MdArrowOutward } from "react-icons/md";
import { CiLink } from "react-icons/ci";
import { PiGithubLogoLight } from "react-icons/pi";
import Link from "next/link";

const Projects = () => {
  return (
    <div id="projects" className="items-center flex flex-col py-2 px-4 ">
      <div className="space-y-8 flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-3xl mt-2">PROJECTS</h1>
        <div className="pb-2 card card font-fraunces shadow-2xl rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-video overflow-hidden bg-gray-500 border-b border-border">
            <Image
              src="/YorticiaWebsite.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="px-2 mt-2 mb-2 text-center space-y-2">
            <h3 className="font-semibold text-2xl">Yorticia.com</h3>
            <p className="text-start text-muted-foreground">
              &emsp; Created a stunning personal portfolio website for model
              Yorticia, enhancing her online presence and providing a dedicated
              space to display her work and connect with industry professionals.
              The site features an image-rich gallery and detailed service
              listings
            </p>
            <div className="flex flex-wrap text-xs text-white gap-2 mt-8">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Next.js
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Tailwind CSS
              </div>

              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Javascript
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Cloudflare
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Firebase
              </div>
            </div>
            <div className="flex justify-around gap-4 mt-4 flex-wrap ">
              <Link href="https://Yorticia.com/">
                <Button
                  variant={"link"}
                  className="text-sm font-medium px-2 py-2 bg-secondary tracking-tighter shadow-sm gap-1"
                >
                  <CiLink size={32} />
                  View Project
                </Button>
              </Link>
              <Link href="">
                <Button
                  variant={"link"}
                  className="text-sm font-medium px-2 py-2 gap-1 bg-secondary tracking-tighter shadow-sm"
                >
                  <PiGithubLogoLight size={32} />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="pb-2 card card font-fraunces shadow-2xl rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-video overflow-hidden bg-gray-500 border-b border-border">
            <Image src="/VRSSCR.webp" alt="" fill className="object-cover" />
          </div>
          <div className="px-2 mt-2 mb-2 text-center space-y-2">
            <h3 className="font-semibold text-2xl">VR SSCR</h3>
            <p className="text-start text-muted-foreground">
              &emsp; Created a VR educational experience for SSCRDC students
              focused on microcontrollers and logic gates. The simulation
              allowed students to interactively build virtual circuits,
              visualize signal flow, and grasp complex digital logic concepts in
              an intuitive 3D environment
            </p>
            <div className="flex flex-wrap text-xs text-white gap-2 mt-8">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Javascript
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">Aframe</div>

              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Three.js
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">Python</div>
            </div>
            <div className="flex justify-around gap-4 mt-4 flex-wrap ">
              <Link href="https://vr-sscr.netlify.app/">
                <Button
                  variant={"link"}
                  className="text-sm font-medium px-2 py-2 bg-secondary tracking-tighter shadow-sm gap-1"
                >
                  <CiLink size={32} />
                  View Project
                </Button>
              </Link>
              <Link href="">
                <Button
                  variant={"link"}
                  className="text-sm font-medium px-2 py-2 gap-1 bg-secondary tracking-tighter shadow-sm"
                >
                  <PiGithubLogoLight size={32} />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="pb-2 card card font-fraunces shadow-2xl rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-video overflow-hidden bg-gray-50 border-b border-border">
            <Image src="/AgentsN8n.png" alt="" fill className="object-cover" />
          </div>
          <div className="px-2 mt-2 mb-2 text-center space-y-2">
            <h3 className="font-semibold text-2xl">N8n Automations</h3>
            <p className="text-start text-muted-foreground">
              &emsp; Creating automations for streamlining workflows and
              integrating various APIs to enhance productivity.Using AI Agents
              to automate tasks and improve efficiency.
            </p>
            <div className="flex flex-wrap text-xs text-white gap-2 mt-8">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">N8n</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Javascript
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">Python</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                API Integrations
              </div>
            </div>
            <div className="flex justify-around gap-4 mt-4 flex-wrap ">
              <Link href="https://vr-sscr.netlify.app/">
                <Button
                  variant={"link"}
                  className="text-sm font-medium px-2 py-2 bg-secondary tracking-tighter shadow-sm gap-1"
                >
                  <CiLink size={32} />
                  View Project
                </Button>
              </Link>
              <Link href="">
                <Button
                  variant={"link"}
                  className="text-sm font-medium px-2 py-2 gap-1 bg-secondary tracking-tighter shadow-sm"
                >
                  <PiGithubLogoLight size={32} />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link href="/projects ">
        <Button className="mx-auto mt-4" variant={"outline"}>
          See more <MdArrowOutward />{" "}
        </Button>
      </Link>
    </div>
  );
};

export default Projects;
