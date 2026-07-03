"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Award, Calendar, Briefcase, ArrowRight, BadgeCheck } from "lucide-react";
import { HeroConfig } from "@/lib/roles";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";

interface CPAHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const trustLogos = [
  { name: "Deloitte", initial: "D", color: "bg-navy-50 text-navy-700 border-navy-200" },
  { name: "PwC", initial: "P", color: "bg-navy-50 text-navy-700 border-navy-200" },
  { name: "EY", initial: "E", color: "bg-navy-50 text-navy-700 border-navy-200" },
  { name: "KPMG", initial: "K", color: "bg-navy-50 text-navy-700 border-navy-200" },
];

const CPAHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: CPAHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    subHeadline: "Licensed CPA Committed to Financial Excellence",
    ctaPrimary: "Request Engagement Letter",
    ctaSecondary: "Download Resume",
    showAvatar: true,
    showStatusCards: false,
    showSocialLinks: false,
    displayName: "Troy Sarinas",
    accentColor: "#1e3a5f",
  };

  return (
    <div
      id="herosection"
      className="relative flex flex-col w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#1e3a5f 1px, transparent 1px), linear-gradient(90deg, #1e3a5f 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row w-full px-4 sm:px-8 py-16 sm:py-20 xl:px-20 xl:py-24 gap-12 xl:gap-16 relative z-10 flex-1">
        {/* Left Content */}
        <div className="flex flex-col justify-center w-full xl:w-[50%] xl:max-w-[50%]">
          {/* License Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 w-fit"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] text-white px-4 py-2 rounded-full shadow-lg">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold">Licensed CPA</span>
              <span className="text-xs text-amber-300">State of CA</span>
            </div>
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">TS</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                  <BadgeCheck className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold font-fraunces text-gray-900">
                {config.displayName}
              </h1>
              <p className="text-sm font-medium text-[#1e3a5f] tracking-wide">
                {headline || "Certified Public Accountant"}
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
              Trusted Financial{" "}
              <span className="bg-gradient-to-r from-[#1e3a5f] via-[#2d5a8f] to-[#c9a227] bg-clip-text text-transparent">
                Expertise
              </span>{" "}
              & Integrity
            </h2>
          </motion.div>

          {/* Sub Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4 font-fraunces"
          >
            {config.subHeadline || "Licensed CPA Committed to Financial Excellence"}
          </motion.h3>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-xl"
          >
            {bio ||
              "Experienced CPA providing comprehensive accounting, auditing, and tax services. Committed to maintaining the highest standards of professional ethics and delivering accurate financial insights that drive informed business decisions."}
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
              className="rounded-full cursor-pointer font-semibold px-8 py-6 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] hover:from-[#162d4a] hover:to-[#1e3a5f] text-white tracking-tight shadow-xl shadow-blue-900/20 hover:shadow-2xl transition-all hover:-translate-y-1 text-base"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              {config.ctaPrimary}
            </Button>
            <Button
              onClick={hero.handleResumeClick}
              variant="outline"
              className="rounded-full cursor-pointer font-semibold px-8 py-6 border-2 border-gray-300 hover:border-[#1e3a5f] hover:bg-blue-50/50 tracking-tight shadow-lg transition-all hover:-translate-y-1 text-base"
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
              <div className="w-2 h-2 rounded-full bg-[#1e3a5f]" />
              <span>Auditing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#c9a227]" />
              <span>Tax Planning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Advisory</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Credentials & Trust */}
        <div className="flex flex-col justify-center w-full xl:w-[50%] xl:max-w-[50%] gap-6">
          {/* License Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className="bg-white rounded-2xl border-2 border-[#1e3a5f]/20 shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold">CPA License</h3>
                  <p className="text-sm text-white/80">California State Board</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">License Number</span>
                <span className="text-sm font-bold text-[#1e3a5f]">CPA-12345678</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Years Licensed</span>
                <span className="text-sm font-bold text-[#1e3a5f]">8+ Years</span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>CPE Credits: 40/80 hrs completed</span>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[#1e3a5f] to-[#c9a227] rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Years Experience", value: "10+", icon: Calendar },
              { label: "Clients Served", value: "200+", icon: Briefcase },
              { label: "Tax Returns", value: "500+", icon: Award },
              { label: "Audits Completed", value: "150+", icon: Shield },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <metric.icon className="w-5 h-5 text-[#1e3a5f] mb-2" />
                <h4 className="text-2xl font-bold text-gray-900">{metric.value}</h4>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </motion.div>
            ))}
          </div>
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
              Trusted by leading firms
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

export default CPAHeroSection;
