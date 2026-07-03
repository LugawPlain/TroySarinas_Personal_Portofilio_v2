"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import SocialLinks from "../../SocialLinks";
import GitHubStarCount from "../../GithubStarCount";
import GitHubButton from "react-github-btn";
import BuyMeACoffeeButton from "../../BuyMeACoffeeButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Briefcase,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const VAFooter = () => {
  const router = useRouter();
  const { setIsContactModalOpen } = useContactModal();

  const quickLinks = [
    { name: "About", href: "/#herosection" },
    { name: "Services", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Blog", href: "/blog" },
  ];

  const services = [
    "Email Management",
    "Calendar Scheduling",
    "Data Entry",
    "Research",
    "Customer Support",
    "Travel Planning",
  ];

  return (
    <footer id="contacts" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2dd4bf 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0d9488]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#14b8a6]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative max-w-[80rem] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center shadow-lg shadow-[#0d9488]/25">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-[#2dd4bf]">Virtual Assistant</span>
                <h3 className="text-lg font-bold text-white">Troy Sarinas</h3>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to{" "}
              <span className="text-[#2dd4bf]">Reclaim Your Time?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-md">
              Let&apos;s discuss how professional virtual assistance can streamline your workflow, 
              organize your schedule, and help your business run smoother.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="rounded-full px-6 py-5 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#0f766e] hover:to-[#0d9488] text-white font-semibold shadow-lg shadow-[#0d9488]/25 transition-all hover:-translate-y-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Let&apos;s Get Organized
              </Button>
              <Button
                onClick={() => router.push("/?resume=true")}
                variant="outline"
                className="rounded-full px-6 py-5 border-slate-600 hover:border-[#2dd4bf] hover:text-[#2dd4bf] text-slate-300 transition-all"
              >
                View Resume
              </Button>
            </div>

            <div className="hidden sm:block max-w-[200px]">
              <DotLottieReact
                src="https://lottie.host/480ba756-90d7-4ba6-bd6c-5167f02d7187/V1fklWpnHV.lottie"
                loop
                autoplay
              />
            </div>
          </motion.div>

          {/* Middle - Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 lg:col-start-7"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-2 text-slate-400">
                  <CheckCircle className="w-4 h-4 text-[#0d9488]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
                <span className="text-sm font-semibold text-white">Quick Response</span>
              </div>
              <p className="text-xs text-slate-400">Average reply time under 2 hours on business days.</p>
            </div>
          </motion.div>

          {/* Right - Quick Links & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-slate-400 hover:text-[#2dd4bf] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-500 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a
                    href="mailto:troyjeffreysarinas@gmail.com"
                    className="text-white hover:text-[#2dd4bf] transition-colors"
                  >
                    troyjeffreysarinas@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-500 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-white">+639569878251</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white">Remote / Worldwide</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <SocialLinks size={22} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-slate-800">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <GitHubStarCount
                  username="LugawPlain"
                  repo="TroySarinas_Personal_Portfolio"
                />
                <GitHubButton
                  href="https://github.com/LugawPlain/TroySarinas_Personal_Portofilio_v2"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star LugawPlain/TroySarinas_Personal_Portofilio_v2 on GitHub"
                >
                  Stars on Github
                </GitHubButton>
              </div>
              <div className="hidden lg:block">
                <BuyMeACoffeeButton />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-slate-500">
              <p>© 2025 Troy Sarinas. Built with React, Next.js & Tailwind CSS.</p>
              <div className="flex items-center gap-2">
                <span>Available for work</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d9488]"></span>
                </span>
              </div>
            </div>
          </div>        </div>
      </div>
    </footer>
  );
};

export default VAFooter;
