"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InfoIcon from "../../public/Icons/InformationIcon";
import SocialLinks from "./SocialLinks";
import { Button } from "./ui/button";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HeroSection = () => {
  const handleSplineLoad = (spline: any) => {
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
    <div className="flex flex-col items-center px-8 min-h-screen">
      <div className="flex flex-col justify-center items-center max-w-[90rem]">
        {/* Avatar Section */}
        <div className="mt-4 w-40 h-40 xl:w-52 xl:h-52 overflow-hidden rounded-full bg-secondary flex items-center justify-center">
          <Avatar className="w-38 h-38 xl:w-48 xl:h-48 bg-primary">
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
                  <AvatarImage src="/me2.webp" />
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

        {/* Content Section */}
        <div className="space-y-3 flex flex-col lg:justify-center lg:items-center">
          {/* Header */}
          <div>
            <h2 className="text-3xl xl:text-5xl font-semibold font-fraunces text-center">
              Troy Sarinas
            </h2>
            <p className="text-sm xl:text-base text-muted-foreground text-center">
              AI Automation & Full Stack Engineer
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col justify-center items-center">
              {/* Bio */}
              <p className="mt-2 xl:text-lg text-justify">
                🚀 I am a graduate of Computer Engineering with a passion for
                technology and design. Collaborating with companies worldwide to
                create visually stunning, highly functional, and user-friendly
                digital experiences that deliver measurable results and support
                business growth.
              </p>
              {/* Status Cards */}
              <div className="grid grid-flow-col grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 font-inter font-semibold gap-8 mt-4 w-full">
                {/* Available Card */}
                <div className="backdrop-blur-[20%] bg-gradient-to-br from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)] hover:from-[rgba(17,153,142,0.10)] hover:to-[rgba(56,239,125,0.10)] shadow-2xl hover:shadow-[rgba(56,239,125,0.8)] transition-all duration-150 shadow-[rgba(56,239,125,0.4)] border-[rgba(17,153,142,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2">
                  <div className="flex flex-row gap-4">
                    <div className="flex items-center relative justify-center">
                      <div className="bg-green-600 ml-2 w-3 h-3 rounded-full"></div>
                      <div className="bg-green-300 ml-2 absolute w-4 h-4 rounded-full animate-ping"></div>
                    </div>
                    <div className="bg-green-400/20 rounded-full text-sm px-3 py-1">
                      Available
                    </div>
                  </div>
                  <h2 className="text-2xl">Ready to Start</h2>
                  <p className="text-md text-muted-foreground font-normal">
                    Full-time opportunities and Freelance projects
                  </p>
                  <div className="flex gap-2">
                    <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 p-2 hover:shadow-lg hover:-translate-y-1 transition duration-300 text-nowrap text-sm">
                      💼 Open to work
                    </div>
                    <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300  p-2 text-nowrap text-sm">
                      🌍 Remote Friendly
                    </div>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="backdrop-blur-[20%] bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)] hover:from-[rgba(102,126,234,0.10)] hover:to-[rgba(118,75,162,0.1)] hover:shadow-[rgba(118,75,162,0.8)] transition-all duration-150 shadow-2xl shadow-[rgba(118,75,162,0.4)] border-[rgba(102,126,234,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2">
                  <div className="flex flex-row gap-4">
                    <InfoIcon className="text-violet-500" />
                    <div className="bg-violet-600/10 rounded-full text-sm px-3 py-1">
                      Available
                    </div>
                  </div>
                  <h2 className="text-2xl">2-4 Hours</h2>
                  <p className="text-md text-muted-foreground font-normal">
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

              {/* Social Links */}
              <SocialLinks className="mt-8" size={28} />

              {/* CTA Buttons */}
              <div className="flex justify-center gap-4 mt-8 ">
                <Button className="text-md font-semibold px-5 py-5 bg-secondary inset-ring-secondary inset-ring  text-secondary-foreground uppercase tracking-tight shadow-lg">
                  Get in Touch
                </Button>
                <Button
                  variant="outline"
                  className="text-md font-semibold px-5 py-5 border-border border-2 uppercase tracking-tight shadow-lg"
                >
                  Resume
                </Button>
              </div>
            </div>

            {/* Lottie Animation */}
            <div className="w-full max-w-xl flex-grow">
              <DotLottieReact
                src="https://lottie.host/9efb8419-fa6e-4e40-8488-6a5632587950/9M6NqyO9Bg.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
