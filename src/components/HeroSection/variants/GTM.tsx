"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";
import { HeroConfig } from "@/lib/roles";
import { TrendingUp, Users, Target, BarChart3, ArrowDown, Sparkles, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GTMHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const metrics = [
  { label: "Pipeline Growth", value: "3x", suffix: "", icon: TrendingUp, color: "from-emerald-500/20 to-teal-500/10", borderColor: "border-emerald-500/30", iconColor: "text-emerald-600", shadowColor: "shadow-emerald-500/20" },
  { label: "Revenue Influenced", value: "2", suffix: "M+", icon: BarChart3, color: "from-blue-500/20 to-cyan-500/10", borderColor: "border-blue-500/30", iconColor: "text-blue-600", shadowColor: "shadow-blue-500/20" },
  { label: "Lead Quality", value: "340", suffix: "%", icon: Target, color: "from-violet-500/20 to-purple-500/10", borderColor: "border-violet-500/30", iconColor: "text-violet-600", shadowColor: "shadow-violet-500/20" },
  { label: "Campaigns Launched", value: "50", suffix: "+", icon: Users, color: "from-amber-500/20 to-orange-500/10", borderColor: "border-amber-500/30", iconColor: "text-amber-600", shadowColor: "shadow-amber-500/20" },
];

const trustLogos = [
  { name: "Salesforce", initial: "SF", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "HubSpot", initial: "HS", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "Google", initial: "G", color: "bg-red-50 text-red-700 border-red-200" },
  { name: "Meta", initial: "M", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { name: "LinkedIn", initial: "LI", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { name: "Marketo", initial: "MK", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

const floatingBadges = [
  { icon: Zap, text: "CRM Expert", position: "top-20 right-10", delay: 0 },
  { icon: Sparkles, text: "Automation Pro", position: "bottom-32 right-20", delay: 0.5 },
  { icon: Target, text: "Data-Driven", position: "top-32 left-10", delay: 1 },
];

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {numericValue > 0 ? displayValue : value}
      {suffix}
    </span>
  );
}

const GTMHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: GTMHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    subHeadline: "Driving Revenue Through Strategic GTM Execution",
    ctaPrimary: "Let's Talk Strategy",
    ctaSecondary: "Download Resume",
    showAvatar: true,
    showStatusCards: true,
    showSocialLinks: false,
    displayName: "Troy Sarinas",
    accentColor: "#10b981",
  };

  return (
    <div
      id="herosection"
      className="relative flex flex-col w-full min-h-screen overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-200/20 rounded-full blur-3xl" />

        {/* Floating Badges - Desktop Only */}
        {floatingBadges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: badge.delay + 0.5, duration: 0.6 }}
            className={`hidden xl:flex absolute ${badge.position} items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50`}
          >
            <badge.icon className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-700">{badge.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row w-full px-4 sm:px-8 py-16 sm:py-20 xl:px-20 xl:py-24 gap-12 xl:gap-16 relative z-10 flex-1">
        {/* Left Content - Intro */}
        <div className="flex flex-col justify-center w-full xl:w-[48%] xl:max-w-[48%]">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 w-fit"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Available for GTM Consulting
            </span>
          </motion.div>

          {/* Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            {config.showAvatar && (
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl">
                  <Avatar className="w-14 h-14 sm:w-18 sm:h-18 bg-transparent">
                    <AvatarImage src={config.avatarUrl || "/Me2.webp"} className="object-cover" />
                    <AvatarFallback className="text-xl font-bold text-white bg-emerald-600">
                      TS
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold font-fraunces text-gray-900">
                {config.displayName}
              </h1>
              <p className="text-sm font-medium text-emerald-600 tracking-wide">
                {headline || "GTM Engineer & Revenue Strategist"}
              </p>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Scaling Pipeline Through{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                Data-Driven
              </span>{" "}
              GTM Strategy
            </h2>
          </motion.div>

          {/* Sub Headline */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4 font-fraunces"
          >
            {config.subHeadline || "Driving Revenue Through Strategic GTM Execution"}
          </motion.h3>

          {/* Bio */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-xl"
          >
            {bio ||
              "Experienced GTM Engineer specializing in pipeline generation, revenue operations, and marketing automation. I build scalable growth systems that connect marketing, sales, and customer success."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button
              onClick={() => {
                hero.trackContactOpen({ source: "hero_button" });
                hero.setIsContactModalOpen(true);
              }}
              className="rounded-full cursor-pointer font-semibold px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white tracking-tight shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-1 text-base"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {config.ctaPrimary}
            </Button>
            <Button
              onClick={hero.handleResumeClick}
              variant="outline"
              className="rounded-full cursor-pointer font-semibold px-8 py-6 border-2 border-gray-300 hover:border-emerald-500 hover:bg-emerald-50/50 tracking-tight shadow-lg transition-all hover:-translate-y-1 text-base"
            >
              {config.ctaSecondary}
            </Button>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Revenue Ops</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Growth Marketing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span>Marketing Automation</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Metrics Grid */}
        <div className="flex flex-col justify-center w-full xl:w-[52%] xl:max-w-[52%] gap-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden bg-gradient-to-br ${metric.color} ${metric.borderColor} border-2 rounded-2xl sm:rounded-3xl flex flex-col px-5 sm:px-6 py-5 sm:py-6 gap-3 shadow-lg ${metric.shadowColor} hover:shadow-xl transition-shadow`}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center shadow-sm">
                    <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-600">{metric.label}</span>
                </div>
                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Mini Chart Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">Pipeline Growth Trajectory</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+156% YoY</span>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[35, 45, 40, 55, 50, 70, 65, 85, 80, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-md min-w-[8px]"
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Q1</span>
              <span>Q2</span>
              <span>Q3</span>
              <span>Q4</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm py-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
              Trusted by leading platforms
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              {trustLogos.map((logo) => (
                <div
                  key={logo.name}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${logo.color}`}
                >
                  <span className="text-xs font-bold">{logo.initial}</span>
                  <span className="text-sm font-semibold">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-gray-400" />
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

export default GTMHeroSection;
