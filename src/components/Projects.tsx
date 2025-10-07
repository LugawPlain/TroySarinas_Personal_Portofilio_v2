import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Projects = () => {
  return (
    <div className=" border-border border-2 items-center py-2 px-4 ">
      <div className="space-y-2">
        <h1 className="text-center font-bold text-3xl mt-2">PROJECTS</h1>
        <div className="pb-2 card card font-fraunces shadow-2xl rounded-2xl overflow-hidden">
          <div className=" min-h-40 min-w-4/5 bg-gray-500 ">
            <Image src="" alt=""></Image>
          </div>
          <div className="px-2 mt-2 mb-2 text-center space-y-4">
            <h3 className="font-bold text-2xl">Yorticia.com</h3>
            <p className="text-start">
              &emsp; Created a stunning personal portfolio website for model
              Yorticia, enhancing her online presence and providing a dedicated
              space to display her work and connect with industry professionals.
              The site features an image-rich gallery and detailed service
              listings
            </p>
            <div className="flex flex-wrap text-xs text-white gap-2">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Automation
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Javascript
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">HTML</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Natural AI training and Processing
              </div>
            </div>
            <div className="flex justify-between px-2">
              <Button>View Project</Button>
              <Button>View on Github</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
