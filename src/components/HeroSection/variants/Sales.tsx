"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Target, DollarSign, Trophy, ArrowDown, Zap, Users, BarChart3 } from "lucide-react";
import { HeroConfig } from "@/lib/roles";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";

interface SalesHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const metrics = [
  { label: "Quota Attainment", value: "185", suffix: "%", icon: Trophy, color: "from-red-500/20 to-red-400/10", borderColor: "border-red-500/30", iconColor: "text-red-600", shadowColor: "shadow-red-500/20" },
  { label: "Pipeline Generated", value: "2.5", suffix: "M+", icon: BarChart3, color: "from-red-600/20 to-red-500/10", borderColor: "border-red-600/30", iconColor: "text-red-700", shadowColor: "shadow-red-600/20" },
  { label: "Deals Closed", value: "150", suffix: "+", icon: Target, color: "from-gray-700/20 to-gray-600/10", borderColor: "border-gray-700/30", iconColor: "text-gray-800", shadowColor: "shadow-gray-700/20" },
  { label: "Avg Deal Growth", value: "150", suffix: "%", icon: TrendingUp, color: "from-red-400/20 to-red-300/10", borderColor: "border-red-400/30", iconColor: "text-red-500", shadowColor: "shadow-red-400/20" },
];

const trustLogos = [
  { name: "Salesforce", initial: "SF", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "HubSpot", initial: "HS", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "LinkedIn", initial: "LI", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { name: "ZoomInfo", initial: "ZI", color: "bg-red-50 text-red-700 border-red-200" },
  { name: "Gong", initial: "G", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "Outreach", initial: "OR", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
];

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
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
          setDisplayValue(Math.floor(current * 10) / 10);
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

const SalesHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: SalesHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    subHeadline: "Closing Deals & Exceeding Quotas",
    ctaPrimary: "Let's Close Deals",
    ctaSecondary: "Download Resume",
    showAvatar: true,
    showStatusCards: false,
    showSocialLinks: false,
    displayName: "Troy Sarinas",
    accentColor: "#dc2626",
  };

  return (
    <div
      id="herosection"
      className="relative flex flex-col w-full min-h-screen overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#dc2626 1px, transparent 1px), linear-gradient(90deg, #dc2626 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-3xl" />
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="text-sm font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Available for Sales Opportunities
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">TS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold font-fraunces text-gray-900">
                {config.displayName}
              </h1>
              <p className="text-sm font-medium text-red-600 tracking-wide">
                {headline || "Senior Sales Representative"}
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
              Exceeding Quotas Through{" "}
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-gray-800 bg-clip-text text-transparent">
                Strategic
              </span>{" "}
              Selling
            </h2>
          </motion.div>

          {/* Sub Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4 font-fraunces"
          >
            {config.subHeadline || "Closing Deals & Exceeding Quotas"}
          </motion.h3>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-xl"
          >
            {bio ||
              "Results-driven sales professional with a proven track record of exceeding quotas and building lasting client relationships. I leverage data-driven insights and proven methodologies to close complex deals."}
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
              className="rounded-full cursor-pointer font-semibold px-8 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white tracking-tight shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/30 transition-all hover:-translate-y-1 text-base"
            >
              <Zap className="w-4 h-4 mr-2" />
              {config.ctaPrimary}
            </Button>
            <Button
              onClick={hero.handleResumeClick}
              variant="outline"
              className="rounded-full cursor-pointer font-semibold px-8 py-6 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50/50 tracking-tight shadow-lg transition-all hover:-translate-y-1 text-base"
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
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span>B2B Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800" />
              <span>Enterprise</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span>SaaS</span>
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

          {/* Quota Attainment Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700">Quota Attainment by Quarter</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">Avg: 142%</span>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[85, 110, 95, 130, 105, 140, 120, 155, 135, 185].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                  className={`flex-1 rounded-t-md min-w-[8px] ${
                    height >= 100 ? "bg-gradient-to-t from-red-600 to-red-400" : "bg-gradient-to-t from-gray-400 to-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>Q1</span>
              <span>Q2</span>
              <span>Q3</span>
              <span>Q4</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-gray-600">Above Quota</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-gray-600">Below Quota</span>
                </div>
              </div>
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
            <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
              Trusted by leading companies
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

export default SalesHeroSection;
