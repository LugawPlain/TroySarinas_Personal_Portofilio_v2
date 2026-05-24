"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users } from "lucide-react";

interface ExperienceHighlights {
  icon?: string;
  title: string;
  label: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
  highlights: ExperienceHighlights[];
  technologies: string[];
  logo_url: string;
  logo_bg_color: string;
}

interface MarketingExperienceProps {
  initialExperience: ExperienceItem[];
}

const MarketingExperience = ({ initialExperience }: MarketingExperienceProps) => {
  return (
    <div id="experience" className="py-20 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-sm font-medium text-orange-600 uppercase tracking-wider mb-4 block">Career Growth</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Brand Growth Timeline</h2>
        </motion.div>

        <div className="space-y-8">
          {initialExperience.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {exp.logo_url ? (
                    <Image src={exp.logo_url} height={48} width={48} alt={exp.company} className="object-contain" />
                  ) : (
                    <MdImageNotSupported size={24} className="text-gray-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-orange-600 font-medium mb-3">{exp.title}</p>
                  <p className="text-gray-600 mb-4">{exp.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-orange-50 rounded-xl">
                      <DollarSign className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">${(index + 1) * 100}K</p>
                      <p className="text-xs text-gray-500">Budget</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">{(index + 2) * 5}K</p>
                      <p className="text-xs text-gray-500">Leads</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-gray-900">{(index + 1) * 150}%</p>
                      <p className="text-xs text-gray-500">Growth</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingExperience;
