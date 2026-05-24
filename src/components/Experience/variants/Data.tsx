"use client";

import Image from "next/image";
import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import { motion } from "framer-motion";
import { TrendingUp, Brain, BarChart3, ArrowUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

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

interface DataExperienceProps {
  initialExperience: ExperienceItem[];
}

// Sample impact data for visualization
const impactData = [
  { metric: "Churn Rate", before: 18.5, after: 12.3, unit: "%" },
  { metric: "Data Processing", before: 45, after: 120, unit: "GB/day" },
  { metric: "Report Time", before: 72, after: 8, unit: "hours" },
  { metric: "Accuracy", before: 82, after: 94.5, unit: "%" },
];

const timelineData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 25 },
  { month: "Apr", value: 32 },
  { month: "May", value: 38 },
  { month: "Jun", value: 45 },
  { month: "Jul", value: 52 },
  { month: "Aug", value: 58 },
  { month: "Sep", value: 65 },
  { month: "Oct", value: 72 },
  { month: "Nov", value: 78 },
  { month: "Dec", value: 85 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {entry.value}
            {entry.name === "before" || entry.name === "after" ? "%" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Parse highlights to extract impact metrics
const parseMetric = (title: string): { value: string; label: string } | null => {
  const metricMatch = title.match(/^(\d+%?|\$?[\d.]+[MK]?)\s*(.+)$/i);
  if (metricMatch) {
    return { value: metricMatch[1], label: metricMatch[2] };
  }
  return null;
};

const DataExperience = ({ initialExperience }: DataExperienceProps) => {
  return (
    <div id="experience" className="relative py-20 px-4 sm:px-8 bg-white">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Career Impact
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Experience & Impact
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Driving business decisions through data-driven insights and analytics.
        </p>
      </motion.div>

      {/* Impact Overview Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-700">
                Impact Overview
              </h3>
              <p className="text-sm text-slate-400">
                Before vs After key metrics
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-slate-300" />
                <span className="text-slate-500">Before</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-slate-500">After</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={impactData} margin={{ top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="metric"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="before"
                name="Before"
                fill="#cbd5e1"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey="after"
                name="After"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Experience Cards */}
      <div className="max-w-4xl mx-auto">
        {initialExperience.map((exp, index) => {
          const metricHighlights = exp.highlights
            .map((h) => ({ ...h, metric: parseMetric(h.title) }))
            .filter((h) => h.metric);

          return (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-12 last:mb-0"
            >
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                {/* Top Bar */}
                <div
                  className={`${
                    exp.logo_bg_color || "bg-slate-50"
                  } p-6 flex items-center gap-4`}
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm border border-slate-100">
                    {exp.logo_url ? (
                      <Image
                        src={exp.logo_url}
                        height={40}
                        width={40}
                        alt={exp.company}
                        className="object-contain"
                      />
                    ) : (
                      <MdImageNotSupported size={24} className="text-slate-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {exp.company}
                    </h3>
                    <p className="text-slate-500">{exp.title}</p>
                  </div>
                </div>

                {/* Metrics Banner */}
                {metricHighlights.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-violet-50 border-b border-slate-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        Key Impact
                      </span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {metricHighlights.slice(0, 3).map((highlight, idx) => (
                        <div
                          key={idx}
                          className="text-center bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
                        >
                          <p className="text-2xl font-bold text-slate-900">
                            {highlight.metric!.value}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {highlight.metric!.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                    <span className="text-sm text-slate-400">{exp.location}</span>
                  </div>

                  <p className="text-slate-500 mb-6">{exp.description}</p>

                  {/* Mini Timeline Chart */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-600">
                        Project Growth Timeline
                      </span>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        +85% Growth
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={80}>
                      <AreaChart data={timelineData}>
                        <defs>
                          <linearGradient
                            id={`expGradient-${index}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3b82f6"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="100%"
                              stopColor="#3b82f6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fill={`url(#expGradient-${index})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DataExperience;
