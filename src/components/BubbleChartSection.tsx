"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more";
import { Database, Layers, Filter, X, Maximize2 } from "lucide-react";

interface ProjectData {
  name: string;
  value: number;
  category: string;
  impact: string;
  tools: string[];
  complexity: "Low" | "Medium" | "High";
  roi: string;
  color: string;
}

const categories = [
  { name: "Machine Learning", color: "#3b82f6" },
  { name: "Data Visualization", color: "#8b5cf6" },
  { name: "Data Engineering", color: "#06b6d4" },
  { name: "Business Analytics", color: "#10b981" },
];

const projectsData: ProjectData[] = [
  {
    name: "Customer Churn Prediction",
    value: 850,
    category: "Machine Learning",
    impact: "Reduced subscription churn by 23%, saving $2.4M annually",
    tools: ["Python", "scikit-learn", "SQL", "Tableau"],
    complexity: "High",
    roi: "$2.4M",
    color: "#3b82f6",
  },
  {
    name: "Customer Lifetime Value",
    value: 2400,
    category: "Machine Learning",
    impact: "Identified high-value segments with 96.8% accuracy for targeted campaigns",
    tools: ["Python", "XGBoost", "SQL", "Pandas"],
    complexity: "High",
    roi: "$5.2M",
    color: "#2563eb",
  },
  {
    name: "Product Demand Forecasting",
    value: 960,
    category: "Machine Learning",
    impact: "Reduced stockouts by 42% and overstock by 35%",
    tools: ["Python", "TensorFlow", "AWS SageMaker"],
    complexity: "High",
    roi: "$4.5M",
    color: "#1d4ed8",
  },
  {
    name: "Fraud Detection System",
    value: 520,
    category: "Machine Learning",
    impact: "Flagged 99.2% of fraudulent transactions, reducing losses by $1.2M",
    tools: ["Python", "Isolation Forest", "SQL"],
    complexity: "High",
    roi: "$1.2M",
    color: "#1e40af",
  },
  {
    name: "E-Commerce Sales Dashboard",
    value: 120,
    category: "Data Visualization",
    impact: "Enabled real-time sales tracking, leading to 15% faster decision making",
    tools: ["Tableau", "SQL", "dbt"],
    complexity: "Medium",
    roi: "$1.8M",
    color: "#8b5cf6",
  },
  {
    name: "Executive KPI Dashboard",
    value: 45,
    category: "Data Visualization",
    impact: "Unified view of AOV, CAC, LTV, and conversion rates for C-suite",
    tools: ["PowerBI", "SQL", "Figma"],
    complexity: "Low",
    roi: "$650K",
    color: "#7c3aed",
  },
  {
    name: "Customer Data Pipeline",
    value: 1200,
    category: "Data Engineering",
    impact: "Consolidated data from Shopify, GA4, and CRM into unified warehouse",
    tools: ["Python", "Airflow", "Snowflake", "dbt"],
    complexity: "High",
    roi: "320hrs saved",
    color: "#06b6d4",
  },
  {
    name: "A/B Testing Framework",
    value: 95,
    category: "Data Engineering",
    impact: "Automated experiment analysis for product page optimizations",
    tools: ["Python", "PostgreSQL", "Docker", "Great Expectations"],
    complexity: "Medium",
    roi: "400hrs saved",
    color: "#0891b2",
  },
  {
    name: "Product Data Quality Monitor",
    value: 180,
    category: "Data Engineering",
    impact: "Proactive alerts for missing prices, images, and descriptions",
    tools: ["Python", "Great Expectations", "Slack API"],
    complexity: "Medium",
    roi: "200hrs saved",
    color: "#0e7490",
  },
  {
    name: "RFM Customer Segmentation",
    value: 340,
    category: "Business Analytics",
    impact: "Segmented customers by Recency, Frequency, Monetary for targeted marketing",
    tools: ["Python", "R", "PowerBI"],
    complexity: "Medium",
    roi: "$890K",
    color: "#10b981",
  },
  {
    name: "Inventory Optimization",
    value: 780,
    category: "Business Analytics",
    impact: "Reduced carrying costs by 18% through data-driven reorder points",
    tools: ["Python", "Excel", "Looker"],
    complexity: "High",
    roi: "$3.1M",
    color: "#059669",
  },
  {
    name: "Market Basket Analysis",
    value: 420,
    category: "Business Analytics",
    impact: "Increased cross-sell revenue by 31% through product recommendations",
    tools: ["Python", "MLlib", "Databricks"],
    complexity: "Medium",
    roi: "$2.8M",
    color: "#047857",
  },
];

const BubbleChartSection = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.map((c) => c.name)
  );

  const toggleCategory = useCallback((categoryName: string) => {
    setActiveCategories((prev) => {
      if (prev.includes(categoryName)) {
        return prev.filter((c) => c !== categoryName);
      }
      return [...prev, categoryName];
    });
  }, []);

  // Filter data based on active categories
  const filteredData = useMemo(() => {
    return projectsData
      .filter((p) => activeCategories.includes(p.category))
      .map((project) => ({
        name: project.name,
        value: project.value,
        color: project.color,
        // Store full project data for click handler
        projectData: project,
      }));
  }, [activeCategories]);

  // Chart options
  const chartOptions: Highcharts.Options = {
    chart: {
      type: "packedbubble",
      backgroundColor: "transparent",
      height: "600px",
    },
    title: {
      text: undefined,
    },
    tooltip: {
      useHTML: true,
      formatter: function (this: any) {
        const point = this.point;
        const project = point.projectData as ProjectData;
        if (!project) return "";

        const size =
          project.value >= 1000
            ? `${(project.value / 1000).toFixed(1)}TB`
            : `${project.value}GB`;

        return `
          <div style="padding: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${project.color};"></div>
              <span style="font-size: 11px; color: #64748b;">${project.category}</span>
            </div>
            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 4px;">${project.name}</div>
            <div style="font-size: 12px; color: #475569;">Dataset: <b>${size}</b></div>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${project.impact}</div>
            <div style="margin-top: 6px;">
              <span style="display: inline-block; font-size: 11px; font-weight: 600; color: #059669; background-color: #d1fae5; padding: 2px 8px; border-radius: 9999px;">ROI: ${project.roi}</span>
            </div>
          </div>
        `;
      },
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      borderColor: "#e2e8f0",
      borderRadius: 12,
      borderWidth: 1,
      shadow: {
        color: "rgba(0, 0, 0, 0.1)",
        offsetX: 0,
        offsetY: 4,
        opacity: 0.1,
        width: 8,
      },
      style: {
        color: "#1e293b",
        fontSize: "13px",
      },
    },
    plotOptions: {
      packedbubble: {
        minSize: "20%",
        maxSize: "150%",
        zMin: 0,
        zMax: 2500,
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
          splitSeries: false,
          seriesInteraction: true,
          dragBetweenSeries: true,
          friction: -0.9,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "white",
            textOutline: "none",
            fontWeight: "600",
            fontSize: "10px",
          },
        },
        marker: {
          fillOpacity: 0.8,
        },
        states: {
          hover: {
            enabled: true,
            brightness: 0.1,
          },
        },
        point: {
          events: {
            click: function (this: any) {
              const project = this.options?.projectData as ProjectData;
              if (project) {
                setSelectedProject(project);
              }
            },
          },
        },
      },
    },
    series: [
      {
        type: "packedbubble",
        name: "Projects",
        data: filteredData,
      },
    ] as any,
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Project Portfolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Data Project Universe
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Interactive packed bubble chart. All bubbles interact and push each
            other. Click for details.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          <div className="flex items-center gap-2 mr-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => toggleCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategories.includes(category.name)
                  ? "text-white shadow-md"
                  : "bg-white text-slate-400 border-2 border-slate-200 hover:border-slate-300"
              }`}
              style={
                activeCategories.includes(category.name)
                  ? { backgroundColor: category.color }
                  : {}
              }
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
              {category.name}
              {activeCategories.includes(category.name) && (
                <X className="w-3 h-3 ml-1" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Bubble Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden p-4"
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />

          {/* Instructions */}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500">
              <span className="font-semibold">Click</span> bubble for details •{" "}
              <span className="font-semibold">Hover</span> for info
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
        >
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
            <Database className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-xs text-slate-500">Total Projects</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
            <Layers className="w-6 h-6 text-violet-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">7.9TB</p>
            <p className="text-xs text-slate-500">Data Processed</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
            <Database className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">4</p>
            <p className="text-xs text-slate-500">Categories</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm">
            <Layers className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">$18.7M</p>
            <p className="text-xs text-slate-500">Total Impact</p>
          </div>
        </motion.div>
      </div>

      {/* Selected Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: selectedProject.color + "20",
                      }}
                    >
                      <Maximize2
                        className="w-6 h-6"
                        style={{
                          color: selectedProject.color,
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {selectedProject.name}
                      </h3>
                      <span className="text-sm text-slate-500">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 rounded-lg px-4 py-2">
                      <span className="text-xs text-blue-600">Dataset</span>
                      <p className="text-lg font-bold text-blue-700">
                        {selectedProject.value >= 1000
                          ? `${(selectedProject.value / 1000).toFixed(1)}TB`
                          : `${selectedProject.value}GB`}
                      </p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg px-4 py-2">
                      <span className="text-xs text-emerald-600">ROI</span>
                      <p className="text-lg font-bold text-emerald-700">
                        {selectedProject.roi}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        selectedProject.complexity === "High"
                          ? "bg-red-50"
                          : selectedProject.complexity === "Medium"
                          ? "bg-amber-50"
                          : "bg-green-50"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          selectedProject.complexity === "High"
                            ? "text-red-600"
                            : selectedProject.complexity === "Medium"
                            ? "text-amber-600"
                            : "text-green-600"
                        }`}
                      >
                        Complexity
                      </span>
                      <p
                        className={`text-lg font-bold ${
                          selectedProject.complexity === "High"
                            ? "text-red-700"
                            : selectedProject.complexity === "Medium"
                            ? "text-amber-700"
                            : "text-green-700"
                        }`}
                      >
                        {selectedProject.complexity}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Impact
                    </h4>
                    <p className="text-slate-600">{selectedProject.impact}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">
                      Tools Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BubbleChartSection;
