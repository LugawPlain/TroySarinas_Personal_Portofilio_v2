"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import SocialLinks from "../../SocialLinks";
import { Code2, Terminal, ArrowUpRight, Mail, MapPin } from "lucide-react";

const SoftwareEngineerFooter = () => {
  const router = useRouter();
  const { setIsContactModalOpen } = useContactModal();

  const quickLinks = [
    { name: "About", href: "/#herosection" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Experience", href: "/#experience" },
    { name: "Technologies", href: "/#technologies" },
    { name: "Certifications", href: "/#certifications" },
  ];

  return (
    <footer id="contacts" className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

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
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-400">Software Engineer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Let&apos;s Build Something{" "}
              <span className="text-blue-400">Amazing</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Ready to collaborate on innovative projects? I&apos;m always excited to connect 
              with fellow developers and build scalable solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                className="rounded-full px-6 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
              <Button
                onClick={() => router.push("/?resume=true")}
                variant="outline"
                className="rounded-full px-6 py-5 border-gray-600 hover:border-blue-500 hover:text-blue-400 transition-all"
              >
                <Terminal className="w-4 h-4 mr-2" />
                View Resume
              </Button>
            </div>
          </motion.div>

          {/* Middle - Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 lg:col-start-7"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:troyjeffreysarinas@gmail.com" className="text-white hover:text-blue-400 transition-colors">
                    troyjeffreysarinas@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
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
      <div className="relative border-t border-gray-800">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Troy Sarinas. Built with React, Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Available for work</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SoftwareEngineerFooter;
