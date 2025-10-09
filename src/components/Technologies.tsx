"use client";

import React, { useState } from "react";
import HtmlIcon from "./Icons/HtmlIcon";
import CssIcon from "./Icons/CssIcon";
import CloudfareIcon from "./Icons/CloudfareIcon";
import { SiFramer } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { FaRust } from "react-icons/fa";
import { RiSvelteFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { DiRuby } from "react-icons/di";
import { FaSwift } from "react-icons/fa";
import { SiKotlin } from "react-icons/si";
import { SiJest } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiN8N } from "react-icons/si";
import { SiMake } from "react-icons/si";
import { SiZapier } from "react-icons/si";
import { FaHubspot } from "react-icons/fa";
import { IoLogoFigma } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { BiLogoGit } from "react-icons/bi";
import { IoLogoFirebase } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { SiNetlify } from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiPrisma } from "react-icons/si";
import { FaFlutter } from "react-icons/fa6";
import { FaWix } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { SiWoocommerce } from "react-icons/si";
import { FaSquarespace } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiAframe } from "react-icons/si";
import { SiThreedotjs } from "react-icons/si";
import { FaWordpress } from "react-icons/fa";
import { motion } from "framer-motion";
import { PiOpenAiLogo } from "react-icons/pi";
import { SiGooglegemini } from "react-icons/si";
import { SiClaude } from "react-icons/si";
import { RiPerplexityLine } from "react-icons/ri";
import { SiOllama } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";
import { RiSupabaseLine } from "react-icons/ri";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";

const technologies = [
  { name: "HTML", IconComponent: FaHtml5, Percent: 100 },
  { name: "CSS", IconComponent: IoLogoCss3, Percent: 95 },
  { name: "JavaScript", IconComponent: IoLogoJavascript, Percent: 90 },
  { name: "TypeScript", IconComponent: SiTypescript, Percent: 90 },
  { name: "React", IconComponent: FaReact, Percent: 90 },
  { name: "Node.js", IconComponent: FaNodeJs, Percent: 85 },
  { name: "Next.js", IconComponent: SiNextdotjs, Percent: 90 },
  { name: "Python", IconComponent: FaPython, Percent: 95 },
  { name: "Docker", IconComponent: FaDocker, Percent: 80 },
  { name: "Framer", IconComponent: SiFramer, Percent: 60 },
  { name: "Tailwind CSS", IconComponent: RiTailwindCssFill, Percent: 92 },
  { name: "Three.js", IconComponent: SiThreedotjs, Percent: 60 },
  { name: "MongoDB", IconComponent: SiMongodb, Percent: 80 },
  { name: "Supabase", IconComponent: RiSupabaseLine, Percent: 75 },
  { name: "MySQL", IconComponent: SiMysql, Percent: 85 },
  { name: "PostgreSQL", IconComponent: BiLogoPostgresql, Percent: 80 },
  { name: "Prisma", IconComponent: SiPrisma, Percent: 50 },
  { name: "AWS", IconComponent: FaAws, Percent: 60 },
  { name: "Cloudfare", IconComponent: CloudfareIcon, Percent: 70 },
  { name: "n8n", IconComponent: SiN8N, Percent: 98 },
  { name: "Make", IconComponent: SiMake, Percent: 80 },
  { name: "Zapier", IconComponent: SiZapier, Percent: 40 },
  { name: "HubSpot", IconComponent: FaHubspot, Percent: 30 },
  { name: "OpenAI", IconComponent: PiOpenAiLogo, Percent: 98 },
  { name: "Google Gemini", IconComponent: SiGooglegemini, Percent: 95 },
  { name: "Claude", IconComponent: SiClaude, Percent: 98 },
  { name: "Perplexity", IconComponent: RiPerplexityLine, Percent: 80 },
  { name: "Ollama", IconComponent: SiOllama, Percent: 98 },
  { name: "Huggingface", IconComponent: SiHuggingface, Percent: 95 },
];

const Technologies = () => {
  const [showAll, setShowAll] = useState(false);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const gridVariants = {
    hidden: {
      height: "15rem",
      opacity: 1,
      transition: { duration: 0.75, ease: "easeInOut" as const },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  const variants = {
    idle: { scaleX: 1, scaleY: 1, rotateY: 0 },
    active: { scaleX: 1.05, scaleY: 1.2, rotateY: 180 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-4"
    >
      <h2 className="text-center mb-10 font-bold">
        <span className="text-3xl sm:text-4xl">Technologies I use 🧑‍💻</span>
      </h2>
      <div className="relative">
        <motion.div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 95%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 95%, transparent 100%)",
          }}
          className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 py-4 pb-8 max-w-[80rem] mx-auto"
          variants={gridVariants}
          initial="hidden"
          animate={showAll ? "visible" : "hidden"}
        >
          {technologies.map(({ name, IconComponent, Percent = 50 }, index) => {
            const isActive = tappedIndex === index;

            return (
              <motion.div
                onTap={() => setTappedIndex(isActive ? null : index)}
                initial={{ zIndex: 0 }}
                animate={{ zIndex: isActive ? 100 : 0 }}
                key={index}
                className="group perspective-1000 cursor-pointer"
                tabIndex={0}
              >
                <motion.div
                  variants={variants}
                  animate={isActive ? "active" : "idle"}
                  className="relative shadow-2xl rounded-2xl w-full h-8 xl:h-10 hover:scale-105 hover:-translate-y-1 hover:-translate-x-1  group-focus-within:scale-120 transform transition duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute px-4 py-2 flex items-center justify-between inset-0 rounded-lg bg-secondary text-secondary-foreground"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {<IconComponent size={24} />}
                    <p className="text-sm font-medium font-inter">{name}</p>
                  </div>
                  <div
                    className="absolute py-2 rounded-lg inset-0 bg-gray-200 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-center text-xs xl:text-md font-semibold">
                      {(() => {
                        if (Percent < 30) return "Entry Level";
                        if (Percent < 50) return "Junior";
                        if (Percent < 70) return "Mid-Level";
                        if (Percent < 80) return "Senior";
                        if (Percent < 90) return "Expert";
                        return "Advanced";
                      })()}
                    </p>
                    <div className="min-h-3 overflow-hidden w-full bg-gray-100 flex justify-start items-center relative">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{
                          width: isActive ? `${Percent}%` : "0%",
                          filter: isActive
                            ? `hue-rotate(${(Percent / 100) * 120}deg)`
                            : "none",
                        }}
                        transition={{ duration: 1.5, ease: "linear" }}
                        className="flex flex-col top-0 left-0 bg-red-500/50 h-full relative"
                      >
                        <div className="absolute text-[10px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-fit font-bold text-white drop-shadow-sm">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 3 }}
                          >
                            {Percent}%
                          </motion.p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="block mx-auto font-semibold text-sm mt-4 px-4 py-2 rounded-md border border-input bg-blue-600 text-white hover:bg-blue-700 font-montserrat"
      >
        {showAll ? "Show Less" : "Show More"}
      </button>
    </motion.div>
  );
};

export default Technologies;
