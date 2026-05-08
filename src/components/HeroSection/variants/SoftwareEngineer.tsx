"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import ContactModal from "@/components/ContactModal";
import InfoIcon from "@/../public/Icons/InformationIcon";
import Image from "next/image";

interface SoftwareEngineerHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
}
const SoftwareEngineerHeroSection = ({
  headline,
  bio,
  resumeUrl,
}: SoftwareEngineerHeroSectionProps) => {
  const router = useRouter();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleResumeClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      router.push("/?resume=true");
    }
  };

  const handleSplineLoad = () => {
    setTimeout(() => {
      const viewer = document.querySelector("spline-viewer");
      if (viewer?.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector("#logo");
        if (logo) {
          (logo as HTMLElement).style.display = "none";
        }
      }
    }, 100);
  };

  return (
    <div
      id="herosection"
      className="flex py-20 w-full min-h-screen max-h-screen gap-20 px-20"
      style={{
        background:
          "linear-gradient(157deg, rgba(184, 229, 255, 1) 0%, rgba(255, 255, 255, 1) 29%, rgba(255, 255, 255, 1) 65%, rgba(248, 222, 255, 1) 99%)",
      }}
    >
      <div className="flex flex-col items-start w-[55%] max-w-[55%]">
        <div className="flex flex-row gap-2 justify-center items-center">
          {/* Avatar Section */}

          <div className=" w-18 h-18 xl:w-18 xl:h-18 overflow-hidden rounded-full bg-secondary flex items-center justify-center">
            <Avatar className="w-16 h-16 xl:w-16 xl:h-16 bg-primary">
              <motion.div
                style={{ perspective: "1000px" }}
                className="w-full h-full"
              >
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{
                    duration: 1,
                    delay: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 8,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative"
                >
                  <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <AvatarImage src="/Me2.webp" />
                    <AvatarFallback>CN</AvatarFallback>
                  </div>

                  <div
                    className="absolute inset-0 bg-gray-100 pointer-events-auto aspect-square w-38 xl:w-50 mx-auto rounded-full overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Spline
                      onSplineMouseDown={() => {}}
                      onSplineMouseUp={() => {}}
                      className="scale-150"
                      onLoad={handleSplineLoad}
                      scene="https://prod.spline.design/9ZcNa-NZOsuRA3Nl/scene.splinecode"
                    />
                    <div className="absolute bottom-0 h-7 left-0 right-0 bg-[#222222]" />
                  </div>
                </motion.div>
              </motion.div>
            </Avatar>
          </div>

          <div className="flex flex-col justify-center text-start ">
            <h1 className="text-md text-secondary/90  font-semibold font-fraunces ">
              {headline}
            </h1>
            <p className="text-md font-spacemono text-stone-800/80 tracking-tightest font-bold   ">
              Troy Sarinas
            </p>
          </div>
        </div>
        <div className="space-y-3 flex flex-col lg:justify-center lg:items-center">
          {/* Main Content Grid */}
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col justify-center font-bold ">
              <h2 className="font-spacemono text-5xl flex flex-col py-4">
                <span className="text-nowrap">Building Intelligent</span>
                <span className="text-nowrap text-secondary text-5xl">
                  Digital Solutions
                </span>
              </h2>
              <p className="mt-2 xl:text-lg text-gray-400 font-light font-spacemono text-justify">
                {bio}
              </p>
              <div className="grid grid-flow-col grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 font-inter font-semibold gap-8 mt-4 w-full">
                {/* Available Card */}
              </div>
              {/* CTA Buttons */}
              <div className="flex justify-start gap-4 mt-8 ">
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  trackId="clicked_contact_hero"
                  className="text-md  rounded-full cursor-pointer font-semibold px-6 py-6 bg-secondary inset-ring-secondary inset-ring  text-secondary-foreground tracking-tight shadow-lg"
                >
                  View my Work
                </Button>
                <Button
                  onClick={handleResumeClick}
                  trackId="clicked_resume_hero"
                  variant="outline"
                  className="text-md rounded-ful cursor-pointer font-semibold px-6 py-6 border-border border-2  tracking-tight shadow-lg"
                >
                  Resume
                </Button>
              </div>
              {/* Social Links */}
              <SocialLinks className="mt-8" size={28} />
            </div>
          </div>
          <div></div>
        </div>
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
      </div>

      <div className="w-[45%] max-w-[45%]">
        <div className="flex w-full relative gap-8 ">
          <div className="backdrop-blur-[20%] z-10 h-1/2 bg-linear-to-br from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)] hover:from-[rgba(17,153,142,0.10)] hover:to-[rgba(56,239,125,0.10)] shadow-2xl hover:shadow-[rgba(56,239,125,0.8)] transition-all duration-150 shadow-[rgba(56,239,125,0.4)] border-[rgba(17,153,142,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-1">
            <div className="flex flex-row gap-4">
              <div className="flex items-center relative justify-center">
                <div className="bg-green-600 ml-2 w-3 h-3 rounded-full"></div>
                <div className="bg-green-300 ml-2 absolute w-4 h-4 rounded-full animate-ping"></div>
              </div>
              <div className="bg-green-400/20 pointer-events-none rounded-full text-xs px-3 py-1">
                Available
              </div>
            </div>
            <h2 className="text-xl">Ready to Start</h2>
            <p className="text-sm text-muted-foreground font-normal">
              Full-time opportunities and Freelance projects
            </p>
            <div className="flex gap-2">
              <div className="shadow-ms hover:bg-white/30 rounded-full bg-white/20 p-2 hover:shadow-lg hover:-translate-y-1 transition duration-300 text-nowrap text-sm">
                💼 Open to work
              </div>
              <div className="shadow-sm  hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300  p-2 text-nowrap text-sm">
                🌍 Remote Friendly
              </div>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="backdrop-blur-[20%]   z-10 bg-linear-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)] hover:from-[rgba(102,126,234,0.10)] hover:to-[rgba(118,75,162,0.1)] hover:shadow-[rgba(118,75,162,0.8)] transition-all duration-150 shadow-2xl shadow-[rgba(118,75,162,0.4)] border-[rgba(102,126,234,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-1">
            <div className="flex flex-row gap-4">
              <InfoIcon className="text-violet-500" />
              <div className="pointer-events-none bg-violet-600/10 rounded-full text-xs px-3 py-1">
                Fast Response
              </div>
            </div>
            <h2 className="text-xl">2-4 Hours</h2>
            <p className="text-sm text-muted-foreground font-normal">
              Average response time on business days
            </p>
            <div className="flex gap-2 mt-auto">
              <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300 p-2 text-nowrap text-sm">
                ⚡ Quick Turnaround
              </div>
              <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300 p-2 text-nowrap text-sm">
                🔄️ Regular Updates
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl max-w-4/5 mx-auto bg-transparent mt-4  ">
          <Image
            src="/Code_Snippet.png"
            alt="Code Snippet"
            width={700}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full h-64 mt-4">
          <DotLottieReact
            src="https://lottie.host/9efb8419-fa6e-4e40-8488-6a5632587950/9M6NqyO9Bg.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SoftwareEngineerHeroSection;
