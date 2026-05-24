"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import SocialLinks from "../../SocialLinks";
import { TrendingUp, ArrowUpRight, Mail, Phone, MapPin, Calendar } from "lucide-react";

const MarketingFooter = () => {
  const router = useRouter();
  const { setIsContactModalOpen } = useContactModal();

  const quickLinks = [
    { name: "Campaign Portfolio", href: "/projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Blog", href: "/blog" },
    { name: "MarTech Stack", href: "/#technologies" },
  ];

  return (
    <footer id="contacts" className="relative bg-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* CTA Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-medium text-orange-400">Available for consulting</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to{" "}
              <span className="text-orange-500">Grow</span>{" "}
              Your Brand?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Let&apos;s discuss how strategic marketing can accelerate your business growth.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="rounded-full px-8 py-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Let&apos;s Talk Strategy
              </Button>
              <Button
                onClick={() => router.push("/?resume=true")}
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-gray-700 hover:border-orange-500 hover:text-orange-400 text-gray-300 transition-all"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Download Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-[80rem] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Troy Sarinas</h3>
            <p className="text-gray-400 mb-6">
              Marketing Manager & Growth Strategist helping brands scale through data-driven campaigns and strategic positioning.
            </p>
            <SocialLinks size={22} />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 md:col-start-6"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:troysarinas22@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors">
                  troysarinas22@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+639569878251" className="text-gray-400 hover:text-orange-400 transition-colors">
                  +63 956 987 8251
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400">Remote / Worldwide</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400">Response time: 2-4 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Troy Sarinas. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Built with Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;
