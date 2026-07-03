"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../../DynamicIcon";
import { Database, Cpu, BarChart3, Brain, ArrowRight, Layers } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

interface TechItem {
  name: string;
  icon_name: string;
  icon_url?: string;
  proficiency: number;
}

interface DataTechnologiesProps {
  initialTech: TechItem[];
}

const skillDimensions = [
  { subject: "Data Collection", A: 95, fullMark: 100 },
  { subject: "Data Cleaning", A: 90, fullMark: 100 },
  { subject: "Statistical Analysis", A: 88, fullMark: 100 },
  { subject: "Data Visualization", A: 92, fullMark: 100 },
  { subject: "Machine Learning", A: 85, fullMark: 100 },
  { subject: "Business Intelligence", A: 87, fullMark: 100 },
];

const workflowStages = [
  {
    id: "collection",
    name: "Data Collection",
    icon: Database,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    chartColor: "#0891b2",
    keywords: ["sql", "python", "api", "scraping", "etl"],
  },
  {
    id: "processing",
    name: "Processing",
    icon: Cpu,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    chartColor: "#7c3aed",
    keywords: ["pandas", "spark", "dbt", "numpy", "cleaning"],
  },
  {
    id: "analysis",
    name: "Analysis",
    icon: BarChart3,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    chartColor: "#059669",
    keywords: ["r", "jupyter", "excel", "statistical", "regression"],
  },
  {
    id: "visualization",
    name: "Visualization",
    icon: BarChart3,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    chartColor: "#d97706",
    keywords: ["tableau", "powerbi", "looker", "matplotlib", "plotly"],
  },
  {
    id: "ml",
    name: "ML / AI",
    icon: Brain,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    chartColor: "#e11d48",
    keywords: ["tensorflow", "sklearn", "pytorch", "modeling", "forecasting"],
  },
];

const categorizeTech = (techName: string): string => {
  const name = techName.toLowerCase();
  for (const stage of workflowStages) {
    if (stage.keywords.some((k) => name.includes(k))) return stage.id;
  }
  return "analysis";
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 mb-1">{label || payload[0].payload.subject}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color || entry.fill }}>
            {entry.name || "Score"}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DataTechnologies = ({ initialTech }: DataTechnologiesProps) => {
  const [activeView, setActiveView] = useState<"radar" | "pipeline">("radar");
  
  const techByStage = initialTech.reduce((acc, tech) => {
    const stage = categorizeTech(tech.name);
    if (!acc[stage]) acc[stage] = [];
    acc[stage].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  // Prepare bar chart data for tool proficiency
  const proficiencyData = initialTech
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 8)
    .map((tech) => ({
      name: tech.name,
      proficiency: tech.proficiency,
      stage: categorizeTech(tech.name),
    }));

  const getStageColor = (stageId: string) => {
    const stage = workflowStages.find((s) => s.id === stageId);
    return stage?.chartColor || "#3b82f6";
  };

  return (
    <motion.div
      id="technologies"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative py-20 px-4 sm:px-8 bg-slate-50"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Analytics Stack
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Data Pipeline
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          End-to-end analytics workflow from data collection to machine learning
          deployment.
        </p>

        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveView("radar")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeView === "radar"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Skill Matrix
            </button>
            <button
              onClick={() => setActiveView("pipeline")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeView === "pipeline"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Pipeline View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {activeView === "radar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-700 mb-1">
                Skill Proficiency Matrix
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Comprehensive skill assessment across data science dimensions
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillDimensions}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                  />
                  <Radar
                    name="Current Level"
                    dataKey="A"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 opacity-30" />
                  <span className="text-xs text-slate-500">Current Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-blue-500" />
                  <span className="text-xs text-slate-500">Target: 100%</span>
                </div>
              </div>
            </motion.div>

            {/* Proficiency Bar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-700 mb-1">
                Tool Proficiency
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Top tools ranked by expertise level
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={proficiencyData}
                  layout="vertical"
                  margin={{ left: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="proficiency" name="Proficiency" radius={[0, 4, 4, 0]} barSize={20}>
                    {proficiencyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getStageColor(entry.stage)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        ) : (
          /* Pipeline View */
          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            {workflowStages.map((stage, stageIndex) => {
              const stageTechs = techByStage[stage.id] || [];
              if (stageTechs.length === 0) return null;

              return (
                <React.Fragment key={stage.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: stageIndex * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex-1 ${stage.bgColor} rounded-2xl border ${stage.borderColor} p-5`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <stage.icon className={`w-5 h-5 ${stage.color}`} />
                      <h3 className={`font-bold ${stage.color}`}>{stage.name}</h3>
                    </div>

                    <div className="space-y-2">
                      {stageTechs.map((tech, idx) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 bg-white rounded-xl p-3 border border-slate-100 hover:border-slate-300 transition-colors shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                            <DynamicIcon name={tech.icon_name} iconUrl={tech.icon_url} size={20} />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-slate-700">{tech.name}</span>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${tech.proficiency}%` }}
                                transition={{ delay: 0.2 + idx * 0.05, duration: 0.8 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: stage.chartColor }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-slate-400">{tech.proficiency}%</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow between stages */}
                  {stageIndex < workflowStages.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DataTechnologies;
