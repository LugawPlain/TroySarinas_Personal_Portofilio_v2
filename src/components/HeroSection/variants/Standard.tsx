"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";
import InfoIcon from "@/../public/Icons/InformationIcon";
import { HeroConfig } from "@/lib/roles";

interface StandardHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const StandardHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: StandardHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    ctaPrimary: "Get in Touch",
    ctaSecondary: "Resume",
    showAvatar: true,
    showStatusCards: true,
    showSocialLinks: true,
    displayName: "Troy Sarinas",
  };

  return (
    <div
      id="herosection"
      className="flex flex-col items-center px-8 min-h-screen"
    >
      <div className="flex flex-col justify-center items-center max-w-[90rem]">
        {/* Avatar Section */}
        {config.showAvatar && (
          <div className="mt-4 w-40 h-40 xl:w-52 xl:h-52 overflow-hidden rounded-full bg-secondary flex items-center justify-center">
            <Avatar className="w-38 h-38 xl:w-48 xl:h-48 bg-primary">
              <AvatarImage src={config.avatarUrl || "/Me2.webp"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Content Section */}
        <div className="space-y-3 flex flex-col lg:justify-center lg:items-center">
          {/* Header */}
          <div>
            <h1 className="text-3xl xl:text-5xl font-semibold font-fraunces text-center text-foreground/90">
              {headline}
            </h1>
            <p className="text-sm xl:text-base text-muted-foreground text-center">
              {config.displayName}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col justify-center items-center">
              {/* Bio */}
              <p className="mt-2 xl:text-lg text-justify">{bio}</p>

              {/* Status Cards */}
              {config.showStatusCards && (
                <div className="grid grid-flow-col grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 font-inter font-semibold gap-8 mt-4 w-full">
                  {/* Available Card */}
                  <div className="backdrop-blur-[20%] bg-gradient-to-br from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)] hover:from-[rgba(17,153,142,0.10)] hover:to-[rgba(56,239,125,0.10)] shadow-2xl hover:shadow-[rgba(56,239,125,0.8)] transition-all duration-150 shadow-[rgba(56,239,125,0.4)] border-[rgba(17,153,142,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2">
                    <div className="flex flex-row gap-4">
                      <div className="flex items-center relative justify-center">
                        <div className="bg-green-600 ml-2 w-3 h-3 rounded-full"></div>
                        <div className="bg-green-300 ml-2 absolute w-4 h-4 rounded-full animate-ping"></div>
                      </div>
                      <div className="bg-green-400/20 pointer-events-none rounded-full text-sm px-3 py-1">
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
                      <div className="shadow-sm  hover:bg-white/30 rounded-full bg-white/20 hover:shadow-lg hover:-translate-y-1 transition duration-300  p-2 text-nowrap text-sm">
                        🌍 Remote Friendly
                      </div>
                    </div>
                  </div>

                  {/* Response Time Card */}
                  <div className="backdrop-blur-[20%] bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)] hover:from-[rgba(102,126,234,0.10)] hover:to-[rgba(118,75,162,0.1)] hover:shadow-[rgba(118,75,162,0.8)] transition-all duration-150 shadow-2xl shadow-[rgba(118,75,162,0.4)] border-[rgba(102,126,234,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2">
                    <div className="flex flex-row gap-4">
                      <InfoIcon className="text-violet-500" />
                      <div className="pointer-events-none bg-violet-600/10 rounded-full text-sm px-3 py-1">
                        Fast Response
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
              )}

              {/* Social Links */}
              {config.showSocialLinks && (
                <SocialLinks className="mt-8" size={28} />
              )}

              {/* CTA Buttons */}
              <div className="flex justify-center gap-4 mt-8 ">
                <Button
                  onClick={() => {
                    hero.trackContactOpen({ source: "hero_button" });
                    hero.setIsContactModalOpen(true);
                  }}
                  className="text-md  cursor-pointer font-semibold px-5 py-5 bg-secondary inset-ring-secondary inset-ring  text-secondary-foreground uppercase tracking-tight shadow-lg"
                >
                  {config.ctaPrimary}
                </Button>
                <Button
                  onClick={hero.handleResumeClick}
                  variant="outline"
                  className="text-md cursor-pointer font-semibold px-5 py-5 border-border border-2 uppercase tracking-tight shadow-lg"
                >
                  {config.ctaSecondary}
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

      {/* Contact Modal */}
      <ContactModal
        isOpen={hero.isContactModalOpen}
        onClose={() => hero.setIsContactModalOpen(false)}
      />

      {hero.isResumeOpen && (
        <Resume resumeUrl={resumeUrl} onClose={() => hero.setIsResumeOpen(false)} />
      )}
    </div>
  );
};

export default StandardHeroSection;
