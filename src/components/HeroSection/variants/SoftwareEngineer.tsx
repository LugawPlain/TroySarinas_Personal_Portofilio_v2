"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";
import InfoIcon from "@/../public/Icons/InformationIcon";
import Image from "next/image";
import { HeroConfig, SocialLink } from "@/lib/roles";
import { Code2, Terminal, Cpu, Layers } from "lucide-react";

interface SoftwareEngineerHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
  socialLinks?: SocialLink[];
}

const roleTitles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "DevOps Specialist",
];

const SoftwareEngineerHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
  socialLinks,
}: SoftwareEngineerHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    subHeadline: "Building Intelligent Digital Solutions",
    ctaPrimary: "View my Work",
    ctaSecondary: "Resume",
    showAvatar: true,
    showStatusCards: false,
    showSocialLinks: true,
    displayName: "Troy Sarinas",
    accentColor: "#3b82f6",
  };

  // Typing animation state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentRole = roleTitles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          setTypingSpeed(100 + Math.random() * 50);
        } else {
          // Pause at end
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roleTitles.length);
          setTypingSpeed(500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <div
      id="herosection"
      className="flex flex-col xl:flex-row w-full min-h-[auto] xl:min-h-screen relative overflow-hidden"
    >
      {/* Left Content */}
      <div className="flex flex-col justify-center px-4 sm:px-8 py-12 sm:py-16 xl:px-20 xl:py-20 w-full xl:w-[55%] xl:max-w-[55%] z-10">
        {/* Profile Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          {config.showAvatar && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 xl:w-20 xl:h-20 overflow-hidden rounded-full bg-secondary/10 flex items-center justify-center ring-2 ring-secondary/20 shrink-0">
              <Avatar className="w-12 h-12 sm:w-14 sm:h-14 xl:w-18 xl:h-18 bg-primary">
                <AvatarImage src={config.avatarUrl || "/Me2.webp"} />
                <AvatarFallback className="text-lg font-bold">
                  TS
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg sm:text-xl xl:text-2xl font-semibold font-fraunces text-secondary/90 truncate">
              {config.displayName}
            </h1>
            <p className="text-xs sm:text-sm font-spacemono text-stone-600/80 tracking-tight truncate">
              {headline || "Software Engineer"}
            </p>
          </div>
        </div>

        {/* Main Headline with Typing Animation */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-secondary/70" />
            <span className="text-xs sm:text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Specializing in
            </span>
          </div>
          <h2 className="font-spacemono text-2xl sm:text-4xl xl:text-5xl font-bold text-secondary leading-tight min-h-[2.5rem] sm:min-h-[3.5rem]">
            {displayText}
            <span className="inline-block w-[3px] h-[1em] bg-secondary ml-1 animate-pulse align-middle" />
          </h2>
        </div>

        {/* Sub Headline */}
        <h3 className="text-xl sm:text-2xl xl:text-3xl font-semibold text-secondary/80 mb-3 sm:mb-4 font-fraunces">
          {config.subHeadline || "Building Intelligent Digital Solutions"}
        </h3>

        {/* Bio */}
        <p className="text-sm sm:text-base xl:text-lg text-stone-600/90 font-light font-spacemono leading-relaxed mb-6 sm:mb-8 max-w-xl">
          {bio ||
            "Passionate about creating scalable applications and solving complex technical challenges with modern technologies."}
        </p>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white">
              <Code2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
              <Cpu className="w-5 h-5 text-green-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white">
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <span className="text-sm font-spacemono text-stone-500">
            React • TypeScript • Node.js • Python
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            onClick={() => {
              hero.trackContactOpen({ source: "hero_button" });
              hero.setIsContactModalOpen(true);
            }}
            className="rounded-full cursor-pointer font-semibold px-8 py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground tracking-tight shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            {config.ctaPrimary}
          </Button>
          <Button
            onClick={hero.handleResumeClick}
            variant="outline"
            className="rounded-full cursor-pointer font-semibold px-8 py-6 border-2 border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5 tracking-tight shadow-lg transition-all hover:-translate-y-0.5"
          >
            {config.ctaSecondary}
          </Button>
        </div>

        {/* Social Links */}
        {config.showSocialLinks && <SocialLinks className="" size={28} links={socialLinks} />}

        <ContactModal
          isOpen={hero.isContactModalOpen}
          onClose={() => hero.setIsContactModalOpen(false)}
        />

        {hero.isResumeOpen && (
          <Resume
            resumeUrl={resumeUrl}
            onClose={() => hero.setIsResumeOpen(false)}
          />
        )}
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center px-4 sm:px-8 py-6 sm:py-8 xl:px-12 xl:py-20 w-full xl:w-[45%] xl:max-w-[45%] gap-4 sm:gap-6">
        {/* Status Cards */}
        <div className="flex flex-col sm:flex-row w-full relative gap-4 xl:gap-8">
          <div className="flex-1 min-w-0 backdrop-blur-[20%] z-10 bg-linear-to-br from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)] hover:from-[rgba(17,153,142,0.10)] hover:to-[rgba(56,239,125,0.10)] shadow-2xl hover:shadow-[rgba(56,239,125,0.8)] transition-all duration-150 shadow-[rgba(56,239,125,0.4)] border-[rgba(17,153,142,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2 overflow-hidden">
            <div className="flex flex-row gap-4">
              <div className="flex items-center relative justify-center">
                <div className="bg-green-600 ml-2 w-3 h-3 rounded-full"></div>
                <div className="bg-green-300 ml-2 absolute w-4 h-4 rounded-full animate-ping"></div>
              </div>
              <div className="bg-green-400/20 pointer-events-none rounded-full text-xs px-3 py-1">
                Available
              </div>
            </div>
            <h2 className="text-lg sm:text-xl">Ready to Start</h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              Full-time opportunities and Freelance projects
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="shadow-ms hover:bg-white/30 rounded-full bg-white/20 p-2 hover:shadow-lg hover:-translate-y-1 transition duration-300 text-xs sm:text-sm">
                💼 Open to work
              </div>
              <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300 p-2 text-xs sm:text-sm">
                🌍 Remote Friendly
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 backdrop-blur-[20%] z-10 bg-linear-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)] hover:from-[rgba(102,126,234,0.10)] hover:to-[rgba(118,75,162,0.1)] hover:shadow-[rgba(118,75,162,0.8)] transition-all duration-150 shadow-2xl shadow-[rgba(118,75,162,0.4)] border-[rgba(102,126,234,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2 overflow-hidden">
            <div className="flex flex-row gap-4">
              <InfoIcon className="text-violet-500 w-5 h-5 sm:w-6 sm:h-6" />
              <div className="pointer-events-none bg-violet-600/10 rounded-full text-xs px-3 py-1">
                Fast Response
              </div>
            </div>
            <h2 className="text-lg sm:text-xl">2-4 Hours</h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              Average response time on business days
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300 p-2 text-xs sm:text-sm">
                ⚡ Quick Turnaround
              </div>
              <div className="shadow-sm hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300 p-2 text-xs sm:text-sm">
                🔄️ Regular Updates
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="relative group hidden sm:block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-violet-200 to-purple-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/50">
            <Image
              src="/Code_Snippet.png"
              alt="Code Snippet"
              width={700}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="w-full h-32 sm:h-48 xl:h-56 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-100/50 via-transparent to-violet-100/50 rounded-3xl blur-xl" />
          <DotLottieReact
            src="https://lottie.host/9efb8419-fa6e-4e40-8488-6a5632587950/9M6NqyO9Bg.lottie"
            loop
            autoplay
            className="relative z-10"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SoftwareEngineerHeroSection;
