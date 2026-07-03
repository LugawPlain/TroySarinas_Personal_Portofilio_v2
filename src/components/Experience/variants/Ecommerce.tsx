"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import DynamicIcon from "../../DynamicIcon";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

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

interface ExperienceProps {
  initialExperience: ExperienceItem[];
}

const EcommerceExperience = ({ initialExperience }: ExperienceProps) => {
  return (
    <div id="experience" className="relative py-20 px-4 bg-slate-50">
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <ShoppingCart className="w-4 h-4" />
            Brand Portfolio
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            Store Development{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
            >
              Experience
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Building and optimizing e-commerce stores that drive revenue and
            customer loyalty.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-300 via-emerald-200 to-transparent hidden md:block" />

          <div className="space-y-12"
          >
            {initialExperience.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 lg:left-1/2 top-0 w-4 h-4 -translate-x-1/2 bg-emerald-500 rounded-full border-4 border-white shadow-lg hidden md:block" />

                  {/* Content Card */}
                  <div
                    className={`md:w-1/2 ${
                      isEven ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"
                    }`}
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-500"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center border border-emerald-100 shrink-0"
                        >
                          {exp.logo_url ? (
                            <Image
                              src={exp.logo_url}
                              height={48}
                              width={48}
                              alt={exp.company}
                              className="object-contain"
                            />
                          ) : (
                            <MdImageNotSupported
                              size={24}
                              className="text-slate-400"
                            />
                          )}
                        </div>
                        <div className="flex-1"
                        >
                          <div className="flex items-center gap-2 mb-1"
                          >
                            <h3 className="text-xl font-bold text-slate-900"
                            >
                              {exp.company}
                            </h3>
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
                            >
                              <BadgeCheck className="w-3 h-3" />
                              Active Store
                            </span>
                          </div>
                          <p className="text-emerald-600 font-medium"
                          >
                            {exp.title}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500"
                          >
                            <span className="flex items-center gap-1"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed mb-6"
                      >
                        {exp.description}
                      </p>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
                      >
                        <div className="bg-emerald-50 rounded-xl p-3 text-center"
                        >
                          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1"
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase font-bold"
                            >
                              Conversion
                            </span>
                          </div>
                          <div className="text-lg font-bold text-slate-900"
                          >
                            4.{8 + index}%
                          </div>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-3 text-center"
                        >
                          <div className="flex items-center justify-center gap-1 text-amber-600 mb-1"
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase font-bold"
                            >
                              AOV
                            </span>
                          </div>
                          <div className="text-lg font-bold text-slate-900"
                          >
                            ${(120 + index * 15)}
                          </div>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-3 text-center"
                        >
                          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase font-bold"
                            >
                              Orders
                            </span>
                          </div>
                          <div className="text-lg font-bold text-slate-900"
                          >
                            {(index + 2) * 8}K
                          </div>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-3 text-center"
                        >
                          <div className="flex items-center justify-center gap-1 text-amber-600 mb-1"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase font-bold"
                            >
                              Rating
                            </span>
                          </div>
                          <div className="text-lg font-bold text-slate-900"
                          >
                            4.{9 - index}★
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6"
                      >
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full flex items-center gap-1"
                          >
                            <CreditCard className="w-3 h-3 text-emerald-600" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="border-t border-slate-100 pt-5"
                        >
                          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3"
                          >
                            Key Impact
                          </h4>
                          <div className="space-y-2"
                          >
                            {exp.highlights.map((highlight, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 text-sm"
                              >
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"
                                >
                                  {highlight.icon ? (
                                    <DynamicIcon
                                      name={highlight.icon}
                                      size={18}
                                    />
                                  ) : (
                                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-semibold text-slate-900"
                                  >
                                    {highlight.title}
                                  </span>
                                  <span className="text-slate-500"
                                  >
                                    {" "}
                                    - {highlight.label}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceExperience;
