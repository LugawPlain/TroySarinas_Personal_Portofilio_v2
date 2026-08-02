"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Icon, addCollection } from "@iconify/react";
import mdiData from "@iconify-json/mdi/icons.json";
import { CheckCircle, Sparkles } from "lucide-react";
import { HeroConfig } from "@/lib/roles";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";

let mdiCollectionAdded = false;

function loadMDICollection() {
  if (mdiCollectionAdded) return;
  addCollection(mdiData as any);
  mdiCollectionAdded = true;
}

interface VAHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const trustLogos = [
  {
    name: "Startups",
    initial: "ST",
    color: "bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/30",
  },
  {
    name: "Agencies",
    initial: "AG",
    color: "bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/30",
  },
  {
    name: "Consultants",
    initial: "CO",
    color: "bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/30",
  },
  {
    name: "Executives",
    initial: "EX",
    color: "bg-[#0d9488]/10 text-[#0d9488] border-[#0d9488]/30",
  },
];

const servicePills = [
  { label: "Email Management", icon: "mdi:mail" },
  { label: "Calendar Scheduling", icon: "mdi:calendar" },
  { label: "Research", icon: "mdi:magnify" },
  { label: "Documentation", icon: "mdi:file-document" },
  { label: "Communication", icon: "mdi:message-text" },
];

const VAHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: VAHeroSectionProps) => {
  useEffect(() => {
    loadMDICollection();
  }, []);

  const hero = useHeroSection(resumeUrl);
  const config = heroConfig || {
    subHeadline: "Organizing Your Business, One Task at a Time",
    ctaPrimary: "Let's Get Organized",
    ctaSecondary: "Download Resume",
    showAvatar: true,
    showStatusCards: false,
    showSocialLinks: false,
    displayName: "Troy Sarinas",
    accentColor: "#0d9488",
  };

  return (
    <div
      id="herosection"
      className="relative flex flex-col w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-[#f0fdfa] to-[#0d9488]/10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#0d9488]/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#5eead4]/30 rounded-full blur-3xl"
        />
        <div className="absolute top-1/4 left-10 w-3 h-3 bg-[#0d9488]/40 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#0f766e]/40 rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-4 h-4 bg-[#0d9488]/30 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row w-full px-4 sm:px-8 py-16 sm:py-20 xl:px-20 xl:py-24 gap-12 xl:gap-16 relative z-10 flex-1">
        {/* Left Content */}
        <div className="flex flex-col justify-center w-full xl:w-[50%] xl:max-w-[50%]">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 w-fit"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d9488] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0d9488]"></span>
            </span>
            <span className="text-sm font-bold text-[#0d9488] bg-[#0d9488]/10 px-3 py-1 rounded-full border border-[#0d9488]/30">
              Available for VA Work
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
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-br from-[#0d9488] to-[#0f766e] shadow-xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#f0fdfa] ring-2 ring-white">
                    <Avatar className="w-full h-full">
                      <AvatarImage
                        src={config.avatarUrl || "/Me2.webp"}
                        alt="Troy Sarinas"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl font-bold text-[#0d9488] bg-[#f0fdfa]">
                        TS
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 bg-[#0d9488] rounded-full border-[3px] border-white flex items-center justify-center shadow-md">
                  <Icon icon="mdi:check-circle" className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold font-fraunces text-gray-900 truncate">
                {config.displayName}
              </h1>
              <p className="text-sm font-bold text-[#0d9488] tracking-wide truncate">
                {headline || "Virtual Assistant"}
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
              Organizing Your{" "}
              <span className="bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#0f766e] bg-clip-text text-transparent">
                Business
              </span>{" "}
              One Task at a Time
            </h2>
          </motion.div>

          {/* Sub Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4 font-fraunces"
          >
            {config.subHeadline ||
              "Organizing Your Business, One Task at a Time"}
          </motion.h3>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 font-light leading-relaxed mb-8 max-w-xl"
          >
            {bio ||
              "Detail-oriented Virtual Assistant specializing in administrative support, email management, scheduling, and workflow automation. I help busy professionals and businesses reclaim their time by handling the tasks that slow them down."}
          </motion.p>

          {/* Service Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {servicePills.map((service) => (
              <div
                key={service.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#0d9488]/20 text-xs sm:text-sm font-medium text-[#0f766e] shadow-sm hover:shadow-md hover:border-[#0d9488]/40 transition-all"
              >
                <Icon icon={service.icon} className="w-3.5 h-3.5 text-[#0d9488]" />
                {service.label}
              </div>
            ))}
          </motion.div>

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
              className="rounded-full cursor-pointer font-semibold px-8 py-6 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#0f766e] text-white tracking-tight shadow-xl shadow-[#0d9488]/25 hover:shadow-2xl transition-all hover:-translate-y-1 text-base"
            >
              <Icon icon="mdi:briefcase" className="w-4 h-4 mr-2" />
              {config.ctaPrimary}
            </Button>
            <Button
              onClick={hero.handleResumeClick}
              variant="outline"
              className="rounded-full cursor-pointer font-semibold px-8 py-6 border-2 border-gray-300 hover:border-[#0d9488] hover:bg-[#0d9488]/5 tracking-tight shadow-lg transition-all hover:-translate-y-1 text-base"
            >
              {config.ctaSecondary}
            </Button>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0d9488]" />
              <span>Administrative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#0f766e]" />
              <span>Email Management</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#5eead4]" />
              <span>Scheduling</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Visual Dashboard */}
        <div className="flex flex-col justify-center w-full xl:w-[50%] xl:max-w-[50%] gap-6">
          {/* Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0d9488]/20 via-[#5eead4]/20 to-[#0f766e]/20 rounded-[2.5rem] blur-2xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-[#0d9488]/20 p-6 shadow-2xl shadow-[#0d9488]/10">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#0f766e] flex items-center justify-center shadow-lg">
                    <Icon icon="mdi:sparkles" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Productivity Dashboard
                    </h3>
                    <p className="text-xs text-gray-500">
                      Real-time task overview
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0d9488] bg-[#0d9488]/10 px-3 py-1 rounded-full">
                  Live
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    label: "Hours Saved",
                    value: "1,000+",
                    icon: "mdi:clock",
                    gradient: "from-[#0d9488]/20 to-[#0d9488]/5",
                  },
                  {
                    label: "Task Completion",
                    value: "99%",
                    icon: "mdi:check-circle",
                    gradient: "from-[#0f766e]/20 to-[#0f766e]/5",
                  },
                  {
                    label: "Clients Served",
                    value: "50+",
                    icon: "mdi:account-multiple",
                    gradient: "from-[#5eead4]/40 to-[#5eead4]/10",
                  },
                  {
                    label: "Response Time",
                    value: "<2h",
                    icon: "mdi:calendar",
                    gradient: "from-[#0d9488]/20 to-[#5eead4]/10",
                  },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className={`bg-gradient-to-br ${metric.gradient} rounded-2xl border border-white/60 p-4 hover:shadow-md transition-shadow`}
                  >
                    <Icon icon={metric.icon} className="w-5 h-5 text-[#0d9488] mb-2" />
                    <h4 className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </h4>
                    <p className="text-xs text-gray-500">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Calendar Mockup */}
              <div className="bg-[#f0fdfa] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-700">
                    Efficient Scheduling
                  </span>
                  <span className="text-xs font-bold text-[#0d9488] bg-[#0d9488]/10 px-2 py-1 rounded-full">
                    Organized
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { time: "9:00 AM", task: "Client Meeting", done: true },
                    { time: "10:30 AM", task: "Email Management", done: true },
                    { time: "1:00 PM", task: "Project Research", done: false },
                    {
                      time: "3:00 PM",
                      task: "Report Preparation",
                      done: false,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white shadow-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.done ? "bg-[#0d9488] border-[#0d9488]" : "border-gray-300"}`}
                      >
                        {item.done && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 w-16 font-medium">
                        {item.time}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="hidden sm:flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#0d9488]/20 p-4 shadow-lg ml-auto w-fit"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0d9488] to-[#0f766e] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Sparkles
                    key={i}
                    className="w-3 h-3 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Trusted by{" "}
                <span className="font-bold text-[#0d9488]">50+ clients</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

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

export default VAHeroSection;
