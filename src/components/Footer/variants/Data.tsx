"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import SocialLinks from "../../SocialLinks";
import { Database, Brain, ArrowUpRight, Mail, MapPin, BarChart3 } from "lucide-react";

const DataFooter = () => {
  const { setIsContactModalOpen } = useContactModal();

  const quickLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Technologies", href: "#technologies" },
  ];

  return (
    <footer id="contacts" className="relative bg-white border-t border-slate-200">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                Data Analyst & Scientist
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Let&apos;s Uncover{" "}
              <span className="text-blue-600">Insights</span>
            </h2>
            <p className="text-slate-500 mb-8">
              Ready to transform your data into strategic decisions? Let&apos;s
              discuss your analytics needs.
            </p>

            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="rounded-full px-6 py-5 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20"
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-slate-500 hover:text-blue-600 transition-colors"
                  >
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a
                    href="mailto:troyjeffreysarinas@gmail.com"
                    className="text-slate-700 hover:text-blue-600"
                  >
                    troyjeffreysarinas@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-slate-700">Remote / Worldwide</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <SocialLinks size={22} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">© 2025 Troy Sarinas</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-slate-400">
              Available for projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DataFooter;
