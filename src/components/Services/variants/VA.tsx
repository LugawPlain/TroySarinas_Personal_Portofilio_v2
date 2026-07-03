"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Headphones,
  FolderOpen,
  Share2,
  BarChart3,
  Sparkles,
  Check,
  Zap,
} from "lucide-react";

interface ServiceCategory {
  icon: React.ElementType;
  title: string;
  items: string[];
  gradient: string;
  shadowColor: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    icon: Calendar,
    title: "Executive Assistance",
    items: [
      "Calendar & Schedule Management",
      "Email & Inbox Management",
      "Appointment Setting",
      "Travel Arrangements",
      "Meeting Coordination",
    ],
    gradient: "from-[#0d9488] to-[#14b8a6]",
    shadowColor: "shadow-[#0d9488]/15",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    items: [
      "Phone Support",
      "Email Support",
      "Live Chat Support",
      "Order & Issue Management",
      "Customer Follow-ups",
    ],
    gradient: "from-[#0891b2] to-[#06b6d4]",
    shadowColor: "shadow-[#0891b2]/15",
  },
  {
    icon: FolderOpen,
    title: "Administrative Support",
    items: [
      "Data Entry",
      "File Organization",
      "Document Preparation",
      "Internet Research",
      "Reporting & Documentation",
    ],
    gradient: "from-[#0f766e] to-[#0d9488]",
    shadowColor: "shadow-[#0f766e]/15",
  },
  {
    icon: Share2,
    title: "Social Media Support",
    items: [
      "Canva Graphic Design",
      "Content Creation",
      "Caption Writing",
      "Post Scheduling",
      "Content Planning",
    ],
    gradient: "from-[#14b8a6] to-[#2dd4bf]",
    shadowColor: "shadow-[#14b8a6]/15",
  },
  {
    icon: BarChart3,
    title: "Data & Task Management",
    items: [
      "Data Entry & Updates",
      "Lead Generation",
      "Spreadsheet Management",
      "Task Coordination",
      "Weekly Reports",
    ],
    gradient: "from-[#0e7490] to-[#0d9488]",
    shadowColor: "shadow-[#0e7490]/15",
  },
  {
    icon: Zap,
    title: "AI Tools Proficiency",
    items: [
      "ChatGPT",
      "Google Gemini",
      "Canva AI",
      "CapCut",
      "Microsoft Office Suite",
    ],
    gradient: "from-[#2dd4bf] to-[#14b8a6]",
    shadowColor: "shadow-[#2dd4bf]/15",
  },
];

const VAServices = () => {
  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-24 overflow-hidden bg-gradient-to-b from-[#f0fdfa] to-white"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0d9488]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#14b8a6]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[85rem] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-[#0d9488]/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#0d9488]" />
            <span className="text-sm font-bold text-[#0d9488] uppercase tracking-wider">My Services</span>
          </div>

          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-900 font-fraunces mb-4 leading-tight">
            What I Can Do{" "}
            <span className="bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#0f766e] bg-clip-text text-transparent">
              For Your Business
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reliable support for your daily operations so you can focus on growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-lg ${category.shadowColor} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              {/* Hover gradient glow */}
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}
              />

              <div className="relative">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg shrink-0`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {category.title}
                    </h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-[#0d9488] to-[#14b8a6] rounded-full mt-2" />
                  </div>
                </div>

                {/* Service Items */}
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#0d9488]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#0d9488]" />
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Value Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 p-6 sm:p-8 shadow-2xl">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #2dd4bf 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d9488] to-[#14b8a6] flex items-center justify-center shadow-lg shrink-0">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <p className="text-center sm:text-left text-white text-lg sm:text-xl font-medium leading-relaxed">
                I provide{" "}
                <span className="text-[#2dd4bf] font-bold">efficient</span>
                ,{" "}
                <span className="text-[#2dd4bf] font-bold">organized</span>
                , and{" "}
                <span className="text-[#2dd4bf] font-bold">reliable</span>{" "}
                support to help your business run smoothly so you can focus on what matters most —{" "}
                <span className="text-[#2dd4bf] font-bold">growing your business</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VAServices;
