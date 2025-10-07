import Image from "next/image";
import React from "react";

const Experience = () => {
  return (
    <div id="experience" className="px-4 font-inter space-y-4">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        Experience
      </h1>
      <div className="shadow-2xl overflow-clip rounded-2xl">
        <div className="h-24 bg-black flex justify-center items-center">
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
            <Image
              src="/FreelanceLogo.png"
              height={70}
              width={70}
              alt="Freelance Logo"
            />
          </div>
        </div>
        <div className="flex flex-col px-4 py-4">
          <h2 className="text-2xl font-semibold">
            Software Engineer and Automation Engineer
          </h2>
          <h3 className="text-lg font-medium">Freelancer</h3>
          <p className="mt-2 font-medium">June 2024 - Present</p>
          <p className="text-sm text-muted-foreground">Remote</p>
          <p className="mt-2 font-fraunces text-md">
            Provided clients with Custom Websites and Custom Automations
          </p>
          <hr />
          <div className="">
            <h3 className="text-lg font-semibold mt-2"></h3>
            <p></p>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold mt-2">Technologies</h3>
            <div className="flex flex-wrap text-xs text-white gap-2">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Next js
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Javascript
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                TailwindCSS
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">Python</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">N8n</div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-2xl overflow-clip rounded-2xl">
        <div className="h-24 bg-cyan-400 flex justify-center items-center">
          <div className=" bg-cyan-400  rounded-full flex items-center justify-center">
            <Image
              src="/RITSLogo.png"
              height={90}
              width={90}
              alt="Freelance Logo"
            />
          </div>
        </div>
        <div className="flex flex-col px-4 py-4">
          <h2 className="text-2xl font-semibold">
            Information Technology Technician
          </h2>
          <h3 className="text-lg font-medium">RITs IT</h3>
          <p className="mt-2 font-medium"> November 2024 - January 2025</p>
          <p className="text-sm text-muted-foreground">Cavite, Philippines</p>
          <p className="mt-2 font-fraunces text-md">
            Responsible for maintaining and troubleshooting computer systems,
            networks, and software. I also provide technical support to users
            and ensure the smooth operation of IT infrastructure.
          </p>
          <hr />
          {/* <div className="">
            <h3 className="text-lg font-semibold mt-2">Highlights</h3>
            <p></p>
          </div> */}
          <div className="">
            <h3 className="text-lg font-semibold mt-2">Technologies</h3>
            <div className="flex flex-wrap text-xs text-white gap-2">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Microsoft Ecosystem
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">Docker</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">AWS</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Cloudflare
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Google Cloud Service
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-2xl overflow-clip rounded-2xl">
        <div className="h-24 bg-white flex justify-center items-center">
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
            <Image
              src="/LZCybersecurityLogo.png"
              height={80}
              width={80}
              alt="Freelance Logo"
            />
          </div>
        </div>
        <div className="flex flex-col px-4 py-4">
          <h2 className="text-2xl font-semibold">Developer Intern</h2>
          <h3 className="text-lg font-medium">LZ Cybersecurity</h3>
          <p className="mt-2 font-medium"> April 2024 - June 2024</p>
          <p className="text-sm text-muted-foreground">Manila, Philippines</p>
          <p className="mt-2 font-fraunces text-md">
            I developed a web application for creating penetration testing
            documents for clients
          </p>
          <hr />
          {/* <div className="">
            <h3 className="text-lg font-semibold mt-2">Highlights</h3>
            <p></p>
          </div> */}
          <div className="">
            <h3 className="text-lg font-semibold mt-2">Technologies</h3>
            <div className="flex flex-wrap text-xs text-white gap-2">
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Microsoft Ecosystem
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">Docker</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">AWS</div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Cloudflare
              </div>
              <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                Google Cloud Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
