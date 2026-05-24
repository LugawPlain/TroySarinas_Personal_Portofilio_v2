"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";
import { HeroConfig } from "@/lib/roles";
import { Heart, Share2, Users, MessageCircle, TrendingUp, Smartphone } from "lucide-react";

interface SocialHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const metrics = [
  { label: "Total Impressions", value: "1M+", icon: Share2, gradient: "from-pink-500 to-rose-500" },
  { label: "Followers Grown", value: "50K+", icon: Users, gradient: "from-purple-500 to-violet-500" },
  { label: "Engagement Rate", value: "12%", icon: Heart, gradient: "from-orange-500 to-amber-500" },
  { label: "Campaigns Run", value: "100+", icon: MessageCircle, gradient: "from-cyan-500 to-blue-500" },
];

const SocialHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: SocialHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    ctaPrimary: "Let's Go Viral",
    ctaSecondary: "View My Work",
    displayName: "Troy Sarinas",
  };

  return (
    <div
      id="herosection"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Role Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Smartphone className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300">Social Media Manager & Content Strategist</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            Creating Content That{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              Converts
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            {bio || "Social media strategist specializing in viral content creation, community building, and data-driven growth across all major platforms."}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-3`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-xs text-white/50">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => {
                hero.trackContactOpen({ source: "hero_button" });
                hero.setIsContactModalOpen(true);
              }}
              className="rounded-full px-8 py-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-xl shadow-pink-500/25 transition-all hover:-translate-y-1"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {config.ctaPrimary}
            </Button>
            <Button
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="outline"
              className="rounded-full px-8 py-6 border-white/20 hover:border-white/40 text-white hover:bg-white/5 transition-all"
            >
              {config.ctaSecondary}
            </Button>
          </div>
        </motion.div>
      </div>

      <ContactModal isOpen={hero.isContactModalOpen} onClose={() => hero.setIsContactModalOpen(false)} />
      {hero.isResumeOpen && <Resume resumeUrl={resumeUrl} onClose={() => hero.setIsResumeOpen(false)} />}
    </div>
  );
};

export default SocialHeroSection;
