"use client";

import React, { useState } from "react";
import HtmlIcon from "./Icons/HtmlIcon";
import CssIcon from "./Icons/CssIcon";
import CloudfareIcon from "./Icons/Cloudfare.con";
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
import { Button } from "./ui/button";
import { PiOpenAiLogo } from "react-icons/pi";
import { SiGooglegemini } from "react-icons/si";
import { SiClaude } from "react-icons/si";
import { RiPerplexityLine } from "react-icons/ri";
import { SiOllama } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";
import { RiSupabaseLine } from "react-icons/ri";
// Define the technology data array
const technologies = [
  { name: "HTML", IconComponent: HtmlIcon },
  { name: "CSS", IconComponent: CssIcon },
  { name: "JavaScript", IconComponent: IoLogoJavascript },
  { name: "TypeScript", IconComponent: SiTypescript },
  { name: "React", IconComponent: FaReact },
  { name: "Node.js", IconComponent: FaNodeJs }, // 10th item
  { name: "Next.js", IconComponent: SiNextdotjs },
  { name: "Python", IconComponent: FaPython },
  //   { name: "Go", IconComponent: FaGolang },
  //   { name: "Rust", IconComponent: FaRust },
  //   { name: "Svelte", IconComponent: RiSvelteFill },
  //   { name: "Jest", IconComponent: SiJest },
  { name: "Docker", IconComponent: FaDocker },
  //   { name: "Figma", IconComponent: IoLogoFigma },
  { name: "Framer", IconComponent: SiFramer },
  { name: "Tailwind CSS", IconComponent: RiTailwindCssFill },
  //   { name: "Aframe", IconComponent: SiAframe },
  { name: "Three.js", IconComponent: SiThreedotjs },
  //   { name: "Ruby", IconComponent: DiRuby },
  //   { name: "GitHub", IconComponent: FaGithub },
  //   { name: "Git", IconComponent: BiLogoGit },
  { name: "MongoDB", IconComponent: SiMongodb },
  { name: "Supabase", IconComponent: RiSupabaseLine },
  { name: "MySQL", IconComponent: SiMysql },
  { name: "PostgreSQL", IconComponent: BiLogoPostgresql },
  { name: "Prisma", IconComponent: SiPrisma },
  //   { name: "Netlify", IconComponent: SiNetlify },
  { name: "AWS", IconComponent: FaAws },
  //   { name: "Firebase", IconComponent: IoLogoFirebase },
  { name: "Cloudfare", IconComponent: CloudfareIcon },
  //   { name: "Swift", IconComponent: FaSwift },
  //   { name: "Kotlin", IconComponent: SiKotlin },
  //   { name: "Flutter", IconComponent: FaFlutter },
  //   { name: "Wix", IconComponent: FaWix },
  //   { name: "Shopify", IconComponent: FaShopify },
  //   { name: "Woocommerce", IconComponent: SiWoocommerce },
  //   { name: "Squarespace", IconComponent: FaSquarespace },
  { name: "n8n", IconComponent: SiN8N },
  { name: "Make", IconComponent: SiMake },
  { name: "Zapier", IconComponent: SiZapier },
  { name: "HubSpot", IconComponent: FaHubspot },
  //   { name: "WordPress", IconComponent: FaWordpress },
  { name: "OpenAI", IconComponent: PiOpenAiLogo },
  { name: "Google Gemini", IconComponent: SiGooglegemini },
  { name: "Claude", IconComponent: SiClaude },
  { name: "Perplexity", IconComponent: RiPerplexityLine },
  { name: "Ollama", IconComponent: SiOllama },
  { name: "Huggingface", IconComponent: SiHuggingface },
];

const Technologies = () => {
  const [showAll, setShowAll] = useState(false);

  // Animation variants for the grid container
  const gridVariants = {
    hidden: {
      height: "15rem",
      opacity: 1,
      transition: { duration: 0.75, ease: "easeInOut" as const }, // ✅ cast or use [0.42, 0, 0.58, 1]
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-20"
    >
      <h2 className="text-center mb-8 font-bold">
        <span className="text-3xl sm:text-4xl">Technologies I use ✨</span>
      </h2>
      <div className="relative px-4">
        {/* AnimatePresence is not strictly needed here if only animating height/maxHeight */}
        {/* but good practice if items were animating in/out individually */}
        {/* Use motion.div and apply variants */}
        <motion.div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 100%, transparent)",
            maskImage: "linear-gradient(to bottom, black 100%, transparent)",
          }}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 overflow-hidden py-4 `}
          variants={gridVariants}
          initial="hidden" // Start hidden (collapsed)
          animate={showAll ? "visible" : "hidden"} // Animate based on state
          // No transition prop here, defined in variants
        >
          {/* Map over the technologies array */}
          {technologies.map(({ name, IconComponent }, index) => (
            <div
              key={index} // Use index as key
              className="px-4 py-2 items-center justify-between rounded-md bg-secondary hover:-translate-y-3 transition-all duration-500 ease-in-out text-secondary-foreground inline-flex"
            >
              {/* Handle custom components vs react-icons */}
              {name === "HTML" || name === "CSS" ? (
                <IconComponent />
              ) : (
                // Add SiFramer check if needed, or keep generic size
                <IconComponent size={24} />
              )}
              <p>{name}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Toggle button - visible only on mobile */}
      <Button
        onClick={() => setShowAll(!showAll)}
        className="block  mx-auto mt-4 px-4 py-2 rounded-md border border-input bg-primary text-primary-foreground  hover:bg-primary/80 hover:text-primary-foreground text-sm"
      >
        {showAll ? "Show Less" : "Show More"}
      </Button>
    </motion.div>
  );
};

export default Technologies;
