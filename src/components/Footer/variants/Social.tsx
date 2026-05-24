"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import SocialLinks from "../../SocialLinks";
import { TrendingUp, ArrowUpRight, Mail, MapPin } from "lucide-react";

const SocialFooter = () => {
  const { setIsContactModalOpen } = useContactModal();

  const quickLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Technologies", href: "#technologies" },
  ];

  return (
    <footer id="contacts" className="relative bg-gray-950 border-t border-gray-800">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-pink-400" />
              </div>
              <span className="text-sm font-medium text-pink-400">Social Media Manager</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Let&apos;s Boost Your{" "}
              <span className="text-pink-400">Social Presence</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Ready to grow your brand&apos;s social media presence? Let&apos;s discuss your content strategy.
            </p>

            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="rounded-full px-6 py-5 bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg shadow-pink-500/20"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 lg:col-start-7"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-6">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center text-gray-400 hover:text-pink-400 transition-colors">
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:troysarinas22@gmail.com" className="text-white hover:text-pink-400">
                    troysarinas22@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
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

      <div className="border-t border-gray-800">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">© 2025 Troy Sarinas</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-600">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;
