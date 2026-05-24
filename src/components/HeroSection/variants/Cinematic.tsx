"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";
import { HeroConfig } from "@/lib/roles";

interface CinematicHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const CinematicHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: CinematicHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const config = heroConfig || {
    ctaPrimary: "Watch My Reel",
    ctaSecondary: "Get in Touch",
    showAvatar: false,
    showStatusCards: false,
    showSocialLinks: false,
    displayName: "Troy Sarinas",
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Video Background */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          poster="/video-poster.jpg"
        >
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback gradient if video doesn't load */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-0" : "opacity-100"
          }`} 
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Film Grain Effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Content */}
      <motion.div 
        style={{ opacity, y: textY }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-amber-400/80">
            Video Editor & Motion Designer
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl sm:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          {headline || "Crafting Visual"}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">
            Stories
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mb-10 font-light leading-relaxed"
        >
          {bio || "Professional video editor specializing in cinematic storytelling, motion graphics, and color grading for brands and filmmakers."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="rounded-full cursor-pointer font-semibold px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white tracking-tight shadow-xl shadow-orange-500/20 hover:shadow-2xl transition-all hover:-translate-y-1 text-base"
          >
            <Play className="w-5 h-5 mr-2" />
            {config.ctaPrimary}
          </Button>
          
          <Button
            onClick={() => {
              hero.trackContactOpen({ source: "hero_button" });
              hero.setIsContactModalOpen(true);
            }}
            variant="outline"
            className="rounded-full cursor-pointer font-semibold px-8 py-6 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white tracking-tight transition-all hover:-translate-y-1 text-base"
          >
            {config.ctaSecondary}
          </Button>
        </motion.div>

        {/* Name at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-20 left-0 right-0 text-center"
        >
          <p className="text-sm text-white/40 tracking-[0.2em] uppercase">
            {config.displayName}
          </p>
        </motion.div>
      </motion.div>

      {/* Video Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Contact Modal */}
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
  );
};

export default CinematicHeroSection;
