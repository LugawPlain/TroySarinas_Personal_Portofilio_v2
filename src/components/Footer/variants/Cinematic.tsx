"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import SocialLinks from "../../SocialLinks";
import { Film, Play, ArrowUpRight, Mail, Clapperboard } from "lucide-react";

const CinematicFooter = () => {
  const router = useRouter();
  const { setIsContactModalOpen } = useContactModal();

  const quickLinks = [
    { name: "Showreel", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Tools", href: "#technologies" },
  ];

  return (
    <footer id="contacts" className="relative bg-black text-white overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Background Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.8) 100%)'
        }}
      />

      {/* Main Content */}
      <div className="relative max-w-[80rem] mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                <Film className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s Create{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Together
              </span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how 
              we can bring your vision to life through compelling visuals.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="rounded-full px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Start a Project
              </Button>
              <Button
                onClick={() => router.push("/?resume=true")}
                variant="outline"
                className="rounded-full px-8 py-6 border-white/20 hover:border-amber-500/50 hover:bg-white/5 text-white transition-all"
              >
                <Play className="w-4 h-4 mr-2" />
                View Showreel
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-white/10">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-white/60 hover:text-amber-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Contact
            </h3>
            <div className="space-y-3 text-white/60">
              <p>troyjeffreysarinas@gmail.com</p>
              <p>+63 956 987 8251</p>
              <p>Remote / Worldwide</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
              Connect
            </h3>
            <SocialLinks size={22} />
            <div className="mt-6 flex items-center gap-2 text-sm text-white/40">
              <Clapperboard className="w-4 h-4" />
              <span>Available for freelance</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wider">
            © 2025 TROY SARINAS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <span className="hover:text-white/60 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white/60 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CinematicFooter;
