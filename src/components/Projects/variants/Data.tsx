"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useTrack } from "@/hooks/use-track";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Brain,
  FileText,
  ArrowRight,
  BarChart3,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  GitBranch,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";

interface DataProjectsProps {
  projects: Project[];
  role?: string;
}

// Sample data for project visualizations
const projectVizData: Record<
  number,
  {
    type: string;
    data: any[];
    colors: string[];
    config: any;
  }
> = {
  0: {
    type: "waterfall",
    data: [
      { name: "Raw Data", value: 100000, cumulative: 100000 },
      { name: "Cleaning", value: -15000, cumulative: 85000 },
      { name: "Outliers", value: -8000, cumulative: 77000 },
      { name: "Features", value: 12000, cumulative: 89000 },
      { name: "Final", value: 0, cumulative: 89000 },
    ],
    colors: ["#3b82f6", "#ef4444", "#ef4444", "#10b981", "#8b5cf6"],
    config: { title: "Data Pipeline Flow", subtitle: "Records processed at each stage" },
  },
  1: {
    type: "scatter",
    data: [
      { x: 23, y: 45000, z: 200, segment: "Young" },
      { x: 28, y: 62000, z: 350, segment: "Young" },
      { x: 32, y: 78000, z: 280, segment: "Mid" },
      { x: 35, y: 85000, z: 400, segment: "Mid" },
      { x: 42, y: 95000, z: 320, segment: "Senior" },
      { x: 45, y: 110000, z: 450, segment: "Senior" },
      { x: 51, y: 125000, z: 380, segment: "Senior" },
      { x: 55, y: 140000, z: 300, segment: "Senior" },
    ],
    colors: ["#3b82f6", "#8b5cf6", "#06b6d4"],
    config: { title: "Customer Segmentation", subtitle: "Age vs Income (bubble = CLV)" },
  },
  2: {
    type: "funnel",
    data: [
      { stage: "Impressions", value: 100000, percentage: 100 },
      { stage: "Clicks", value: 8500, percentage: 8.5 },
      { stage: "Signups", value: 2100, percentage: 2.1 },
      { stage: "Activated", value: 980, percentage: 0.98 },
      { stage: "Paid", value: 245, percentage: 0.245 },
    ],
    colors: ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#c084fc"],
    config: { title: "Conversion Funnel", subtitle: "User journey from impression to purchase" },
  },
  3: {
    type: "heatmap",
    data: [
      { hour: "00", mon: 12, tue: 15, wed: 18, thu: 14, fri: 22 },
      { hour: "04", mon: 8, tue: 10, wed: 12, thu: 9, fri: 15 },
      { hour: "08", mon: 45, tue: 52, wed: 48, thu: 55, fri: 62 },
      { hour: "12", mon: 78, tue: 85, wed: 82, thu: 88, fri: 95 },
      { hour: "16", mon: 65, tue: 70, wed: 68, thu: 72, fri: 80 },
      { hour: "20", mon: 35, tue: 42, wed: 38, thu: 45, fri: 55 },
    ],
    colors: ["#eff6ff", "#bfdbfe", "#60a5fa", "#3b82f6", "#1d4ed8"],
    config: { title: "Usage Heatmap", subtitle: "Activity by hour and day" },
  },
  4: {
    type: "composed",
    data: [
      { month: "Jan", actual: 42000, predicted: 40000, confidence: 3500 },
      { month: "Feb", actual: 45000, predicted: 44000, confidence: 3200 },
      { month: "Mar", actual: 51000, predicted: 48000, confidence: 3800 },
      { month: "Apr", actual: 48000, predicted: 52000, confidence: 4100 },
      { month: "May", actual: 56000, predicted: 55000, confidence: 3600 },
      { month: "Jun", actual: 62000, predicted: 59000, confidence: 4200 },
    ],
    colors: ["#3b82f6", "#8b5cf6", "#10b981"],
    config: { title: "Revenue Forecast", subtitle: "Actual vs Predicted with confidence interval" },
  },
};

// Custom tooltip components
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 mb-1">{label || payload[0].payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color || entry.fill }}>
            {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartComponent = ({ projectIndex, project }: { projectIndex: number; project: Project }) => {
  const viz = projectVizData[projectIndex % 5];
  const [chartType, setChartType] = useState<"primary" | "secondary">("primary");

  if (!viz) return null;

  const renderChart = () => {
    switch (viz.type) {
      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="x"
                name="Age"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                label={{ value: "Age", position: "bottom", fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                dataKey="y"
                name="Income"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <ZAxis dataKey="z" range={[50, 400]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                name="Customers"
                data={viz.data}
                fill="#3b82f6"
                fillOpacity={0.6}
              >
                {viz.data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.segment === "Young"
                        ? "#3b82f6"
                        : entry.segment === "Mid"
                        ? "#8b5cf6"
                        : "#06b6d4"
                    }
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "funnel":
        return (
          <div className="space-y-2 py-2">
            {viz.data.map((item: any, index: number) => (
              <div key={item.stage} className="flex items-center gap-3">
                <div className="w-20 text-xs text-slate-500 text-right">{item.stage}</div>
                <div className="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ backgroundColor: viz.colors[index] }}
                  >
                    <span className="text-xs text-white font-medium">
                      {item.value >= 1000
                        ? `${(item.value / 1000).toFixed(1)}k`
                        : item.value}
                    </span>
                  </motion.div>
                </div>
                <div className="w-12 text-xs text-slate-400">{item.percentage}%</div>
              </div>
            ))}
          </div>
        );

      case "heatmap":
        const maxVal = Math.max(...viz.data.flatMap((d: any) => [d.mon, d.tue, d.wed, d.thu, d.fri]));
        const getColor = (val: number) => {
          const intensity = val / maxVal;
          if (intensity > 0.8) return viz.colors[4];
          if (intensity > 0.6) return viz.colors[3];
          if (intensity > 0.4) return viz.colors[2];
          if (intensity > 0.2) return viz.colors[1];
          return viz.colors[0];
        };
        return (
          <div className="py-2">
            <div className="grid grid-cols-6 gap-1">
              <div />
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <div key={day} className="text-xs text-slate-400 text-center">{day}</div>
              ))}
              {viz.data.map((row: any) => (
                <React.Fragment key={row.hour}>
                  <div className="text-xs text-slate-400 text-right pr-2">{row.hour}:00</div>
                  {["mon", "tue", "wed", "thu", "fri"].map((day) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="aspect-square rounded-md flex items-center justify-center text-xs font-medium"
                      style={{ backgroundColor: getColor(row[day]) }}
                    >
                      <span
                        className={
                          row[day] > maxVal * 0.5 ? "text-white" : "text-slate-600"
                        }
                      >
                        {row[day]}
                      </span>
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case "composed":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="actual"
                name="Actual"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="Predicted"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      default: // waterfall
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="cumulative" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30}>
                {viz.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={viz.colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">{viz.config.title}</h4>
          <p className="text-xs text-slate-400">{viz.config.subtitle}</p>
        </div>
      </div>
      {renderChart()}
    </div>
  );
};

const DataProjects = ({ projects, role }: DataProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const trackProject = useTrack("project_click", "projects");

  const getProjectIcon = (index: number) => {
    const icons = [Database, Brain, Activity, GitBranch, TrendingUp];
    return icons[index % icons.length];
  };

  const getProjectType = (index: number) => {
    const types = [
      "Data Pipeline",
      "Customer Segmentation",
      "Conversion Analysis",
      "Usage Analytics",
      "Predictive Modeling",
    ];
    return types[index % types.length];
  };

  return (
    <div id="projects" className="relative py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-[85rem] mx-auto">
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
              <Database className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Data Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Analysis & Insights
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            End-to-end data projects from raw datasets to actionable business
            intelligence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const ProjectIcon = getProjectIcon(index);
            const projectType = getProjectType(index);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Left Side - Project Info */}
                  <div className="lg:col-span-3 p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {projectType}
                      </span>
                      <span className="text-xs text-slate-400">
                        {project.technologies[0] || "Python"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-500 mb-6">{project.description}</p>

                    {/* Data Story Flow */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <Database className="w-5 h-5 text-blue-500 mb-2" />
                        <p className="text-xs text-slate-400 mb-1">Dataset</p>
                        <p className="text-sm font-semibold text-slate-700">Processed</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <Brain className="w-5 h-5 text-violet-500 mb-2" />
                        <p className="text-xs text-slate-400 mb-1">Method</p>
                        <p className="text-sm font-semibold text-slate-700">Analysis</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <FileText className="w-5 h-5 text-emerald-500 mb-2" />
                        <p className="text-xs text-slate-400 mb-1">Output</p>
                        <p className="text-sm font-semibold text-slate-700">Insights</p>
                      </div>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`${rolePrefix}/projects/${project.id}`}
                      onClick={() =>
                        trackProject({
                          project_id: project.id,
                          project_title: project.title,
                          action: "view_detail",
                        })
                      }
                    >
                      <Button
                        variant="outline"
                        className="rounded-full border-blue-200 hover:border-blue-500 hover:bg-blue-50 text-blue-600"
                      >
                        View Analysis
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  {/* Right Side - Chart Visualization */}
                  <div className="lg:col-span-2 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-100 p-6">
                    <ChartComponent projectIndex={index} project={project} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataProjects;
