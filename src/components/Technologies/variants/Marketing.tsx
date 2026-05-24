"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../../DynamicIcon";
import { Layers, BarChart3, Megaphone, Mail, Search, FileText } from "lucide-react";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface TechnologiesProps {
  initialTech: TechItem[];
}

// Category mapping for Marketing tools
const categories = [
  { id: "advertising", name: "Advertising", icon: Megaphone, color: "bg-orange-100 text-orange-700 border-orange-300", gradient: "from-orange-50 to-orange-100/50" },
  { id: "email", name: "Email Marketing", icon: Mail, color: "bg-amber-100 text-amber-700 border-amber-300", gradient: "from-amber-50 to-amber-100/50" },
  { id: "analytics", name: "Analytics", icon: BarChart3, color: "bg-blue-100 text-blue-700 border-blue-300", gradient: "from-blue-50 to-blue-100/50" },
  { id: "cms", name: "CMS & Content", icon: FileText, color: "bg-red-100 text-red-700 border-red-300", gradient: "from-red-50 to-red-100/50" },
  { id: "seo", name: "SEO & Research", icon: Search, color: "bg-violet-100 text-violet-700 border-violet-300", gradient: "from-violet-50 to-violet-100/50" },
  { id: "other", name: "Other Tools", icon: Layers, color: "bg-gray-100 text-gray-700 border-gray-300", gradient: "from-gray-50 to-gray-100/50" },
];

// Simple keyword matching to categorize tools
const categorizeTech = (techName: string): string => {
  const name = techName.toLowerCase();
  if (name.includes("google ads") || name.includes("facebook") || name.includes("meta") || name.includes("linkedin") || name.includes("twitter") || name.includes("tiktok") || name.includes("ad") || name.includes("pixel")) return "advertising";
  if (name.includes("mailchimp") || name.includes("klaviyo") || name.includes("sendgrid") || name.includes("email") || name.includes("campaign")) return "email";
  if (name.includes("google analytics") || name.includes("mixpanel") || name.includes("amplitude") || name.includes("segment") || name.includes("looker") || name.includes("tableau")) return "analytics";
  if (name.includes("wordpress") || name.includes("contentful") || name.includes("webflow") || name.includes("cms") || name.includes("blog")) return "cms";
  if (name.includes("seo") || name.includes("semrush") || name.includes("ahrefs") || name.includes("moz") || name.includes("keyword")) return "seo";
  return "other";
};

const MarketingTechnologies = ({ initialTech }: TechnologiesProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Group technologies by category
  const techByCategory = initialTech.reduce((acc, tech) => {
    const category = categorizeTech(tech.name);
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  const filteredTech = activeCategory
    ? techByCategory[activeCategory] || []
    : initialTech;

  return (
    <motion.div
      id="technologies"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-4 pb-16 relative overflow-clip px-4 sm:px-8"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Layers className="w-4 h-4 text-orange-600" />
          </div>
          <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
            Tech Stack
          </span>
        </div>
        <h2 className="text-center mb-3 font-bold font-fraunces">
          <span className="text-3xl sm:text-4xl xl:text-5xl text-gray-900">
            MarTech Stack
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A comprehensive marketing technology stack spanning advertising, email, analytics, and content management — 
          integrated to drive measurable growth.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeCategory === null
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Tools
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeCategory === cat.id
                ? `${cat.color} shadow-lg`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Tech Stack Grid */}
      <div className="max-w-[80rem] mx-auto">
        {activeCategory === null ? (
          // Show all categories with their tools
          <div className="space-y-8">
            {categories.map((cat) => {
              const catTechs = techByCategory[cat.id] || [];
              if (catTechs.length === 0) return null;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-r ${cat.gradient} rounded-2xl border-2 ${cat.color.split(' ')[2]} p-6 sm:p-8`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl ${cat.color.split(' ')[0]} flex items-center justify-center`}>
                      <cat.icon className={`w-5 h-5 ${cat.color.split(' ')[1]}`} />
                    </div>
                    <h3 className={`text-xl font-bold ${cat.color.split(' ')[1]}`}>{cat.name}</h3>
                    <span className="ml-auto text-sm font-medium text-gray-500">
                      {catTechs.length} tools
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {catTechs.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                          <DynamicIcon name={tech.icon_name} size={28} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 text-center">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Show filtered tools
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredTech.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                  <DynamicIcon name={tech.icon_name} size={28} />
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Integration Ecosystem Note */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-6 py-3">
          <Megaphone className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium text-gray-700">
            All tools integrated for seamless campaign execution and attribution tracking
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketingTechnologies;
