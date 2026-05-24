"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import Resume from "@/components/Resume";
import { useHeroSection } from "@/hooks/use-hero-section";
import { HeroConfig } from "@/lib/roles";
import { motion, useInView } from "framer-motion";
import {
  Database,
  Brain,
  LineChart,
  BarChart3,
  Activity,
  TrendingUp,
  BarChart,
  AreaChart,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  AreaChart as ReAreaChart,
  Area,
  BarChart as ReBarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
} from "recharts";

interface DataHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

// E-commerce sample data for visualizations
const monthlyData = [
  { month: "Jan", revenue: 425000, transactions: 3200, conversionRate: 2.8 },
  { month: "Feb", revenue: 380000, transactions: 2850, conversionRate: 2.6 },
  { month: "Mar", revenue: 520000, transactions: 4100, conversionRate: 3.2 },
  { month: "Apr", revenue: 480000, transactions: 3750, conversionRate: 3.0 },
  { month: "May", revenue: 610000, transactions: 4600, conversionRate: 3.4 },
  { month: "Jun", revenue: 720000, transactions: 5400, conversionRate: 3.6 },
  { month: "Jul", revenue: 680000, transactions: 5100, conversionRate: 3.5 },
  { month: "Aug", revenue: 590000, transactions: 4400, conversionRate: 3.1 },
  { month: "Sep", revenue: 650000, transactions: 4900, conversionRate: 3.3 },
  { month: "Oct", revenue: 780000, transactions: 5800, conversionRate: 3.8 },
  { month: "Nov", revenue: 950000, transactions: 7100, conversionRate: 4.2 },
  { month: "Dec", revenue: 1100000, transactions: 8200, conversionRate: 4.5 },
];

const analysisTypeData = [
  { name: "Customer Behavior", value: 32, color: "#3b82f6" },
  { name: "Sales Analytics", value: 28, color: "#8b5cf6" },
  { name: "Inventory", value: 22, color: "#06b6d4" },
  { name: "Marketing", value: 18, color: "#10b981" },
];

const accuracyData = [
  { model: "Churn", accuracy: 94.2, benchmark: 88.5 },
  { model: "CLV", accuracy: 92.8, benchmark: 85.0 },
  { model: "Demand", accuracy: 96.5, benchmark: 90.2 },
  { model: "Fraud", accuracy: 98.1, benchmark: 93.5 },
  { model: "Price", accuracy: 91.3, benchmark: 86.8 },
];

const metrics = [
  {
    label: "Datasets Analyzed",
    value: "500+",
    change: "+127%",
    icon: Database,
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "text-blue-600",
    chartColor: "#3b82f6",
  },
  {
    label: "Models Deployed",
    value: "45",
    change: "+83%",
    icon: Brain,
    color: "bg-violet-50",
    borderColor: "border-violet-200",
    iconColor: "text-violet-600",
    chartColor: "#8b5cf6",
  },
  {
    label: "Insights Generated",
    value: "2K+",
    change: "+156%",
    icon: LineChart,
    color: "bg-cyan-50",
    borderColor: "border-cyan-200",
    iconColor: "text-cyan-600",
    chartColor: "#06b6d4",
  },
  {
    label: "Avg. Accuracy",
    value: "94%",
    change: "+4.2%",
    icon: Activity,
    color: "bg-emerald-50",
    borderColor: "border-emerald-200",
    iconColor: "text-emerald-600",
    chartColor: "#10b981",
  },
];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const [displayValue, setDisplayValue] = React.useState(0);
  const suffix = value.replace(/[\d,]/g, "");

  React.useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {numericValue > 0 ? displayValue.toLocaleString() : value}
      {suffix}
    </span>
  );
}

const MiniSparkline = ({ color, dataKey }: { color: string; dataKey: string }) => {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <ReAreaChart data={monthlyData.slice(-6)}>
        <defs>
          <linearGradient id={`sparkline-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#sparkline-${color.replace("#", "")})`}
        />
      </ReAreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name === "processed" ? "GB" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DataHeroSection = ({
  headline,
  bio,
  resumeUrl,
  heroConfig,
}: DataHeroSectionProps) => {
  const hero = useHeroSection(resumeUrl);
  const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");
  const [timeRange, setTimeRange] = useState<"6m" | "1y">("1y");
  const config = heroConfig || {
    subHeadline: "Turning Raw Data Into Actionable Intelligence",
    ctaPrimary: "Explore My Work",
    ctaSecondary: "Download Resume",
    showAvatar: true,
    showStatusCards: true,
    showSocialLinks: false,
    displayName: "Troy Sarinas",
    accentColor: "#3b82f6",
  };

  const displayData = timeRange === "6m" ? monthlyData.slice(-6) : monthlyData;

  return (
    <div
      id="herosection"
      className="relative flex flex-col w-full min-h-screen overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col xl:flex-row w-full px-4 sm:px-8 py-16 sm:py-20 xl:px-20 xl:py-24 gap-12 xl:gap-16 flex-1">
        {/* Left Content - Intro */}
        <div className="flex flex-col justify-center w-full xl:w-[45%]">
          {/* Role Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 w-fit"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              Data Analyst & Scientist
            </span>
          </motion.div>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            {config.showAvatar && (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-xl">
                <Avatar className="w-14 h-14 bg-transparent">
                  <AvatarImage
                    src={config.avatarUrl || "/Me2.webp"}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl font-bold text-white bg-blue-600">
                    TS
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {config.displayName}
              </h1>
              <p className="text-sm text-blue-600">
                {headline || "Data Analyst & Scientist"}
              </p>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1]">
              Transforming Data Into{" "}
              <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                Strategic Insights
              </span>
            </h2>
          </motion.div>

          {/* Sub Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-500 mb-8 max-w-xl"
          >
            {bio ||
              "Experienced data analyst and scientist specializing in statistical analysis, machine learning, and business intelligence. I turn complex datasets into clear, actionable insights that drive strategic decisions."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Button
              onClick={() => {
                hero.trackContactOpen({ source: "hero_button" });
                hero.setIsContactModalOpen(true);
              }}
              className="rounded-full font-semibold px-8 py-6 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {config.ctaPrimary}
            </Button>
            <Button
              onClick={hero.handleResumeClick}
              variant="outline"
              className="rounded-full font-semibold px-8 py-6 border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-600 transition-all hover:-translate-y-1"
            >
              {config.ctaSecondary}
            </Button>
          </motion.div>
        </div>

        {/* Right Content - Interactive Dashboard */}
        <div className="flex flex-col justify-center w-full xl:w-[55%] gap-4">
          {/* Interactive Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            {/* Chart Controls */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">
                  E-Commerce Revenue Performance
                </h4>
                <p className="text-xs text-slate-400">
                  Monthly revenue & transaction volume
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Time Range Toggle */}
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setTimeRange("6m")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      timeRange === "6m"
                        ? "bg-white text-slate-700 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    6M
                  </button>
                  <button
                    onClick={() => setTimeRange("1y")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      timeRange === "1y"
                        ? "bg-white text-slate-700 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    1Y
                  </button>
                </div>
                {/* Chart Type Toggle */}
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setChartType("area")}
                    className={`p-1 rounded-md transition-all ${
                      chartType === "area"
                        ? "bg-white shadow-sm"
                        : "text-slate-400"
                    }`}
                    title="Area Chart"
                  >
                    <AreaChart className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setChartType("bar")}
                    className={`p-1 rounded-md transition-all ${
                      chartType === "bar"
                        ? "bg-white shadow-sm"
                        : "text-slate-400"
                    }`}
                    title="Bar Chart"
                  >
                    <BarChart className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setChartType("line")}
                    className={`p-1 rounded-md transition-all ${
                      chartType === "line"
                        ? "bg-white shadow-sm"
                        : "text-slate-400"
                    }`}
                    title="Line Chart"
                  >
                    <LineChart className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={200}>
              {chartType === "area" ? (
                <ReAreaChart data={displayData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: any, name: any) => {
                      if (name === "Revenue ($)") {
                        return [`$${Number(value).toLocaleString()}`, name];
                      }
                      return [Number(value).toLocaleString(), name];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue ($)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                    yAxisId="left"
                  />
                  <Area
                    type="monotone"
                    dataKey="transactions"
                    name="Transactions"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#colorTransactions)"
                    yAxisId="right"
                  />
                </ReAreaChart>
              ) : chartType === "bar" ? (
                <ReBarChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: any, name: any) => {
                      if (name === "Revenue ($)") {
                        return [`$${Number(value).toLocaleString()}`, name];
                      }
                      return [Number(value).toLocaleString(), name];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#3b82f6" radius={[4, 4, 0, 0]} yAxisId="left" />
                  <Bar dataKey="transactions" name="Transactions" fill="#8b5cf6" radius={[4, 4, 0, 0]} yAxisId="right" />
                </ReBarChart>
              ) : (
                <ReLineChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: any, name: any) => {
                      if (name === "Revenue ($)") {
                        return [`$${Number(value).toLocaleString()}`, name];
                      }
                      return [Number(value).toLocaleString(), name];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue ($)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 0, r: 3 }}
                    yAxisId="left"
                  />
                  <Line
                    type="monotone"
                    dataKey="transactions"
                    name="Transactions"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 3 }}
                    yAxisId="right"
                  />
                </ReLineChart>
              )}
            </ResponsiveContainer>
          </motion.div>

          {/* Bottom Row: Donut Chart + Model Accuracy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Analysis Type Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <h4 className="text-sm font-semibold text-slate-700 mb-1">
                Analysis Distribution
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                By methodology type
              </p>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={analysisTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {analysisTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2">
                            <p className="text-xs font-medium" style={{ color: payload[0].payload.color }}>
                              {payload[0].name}: {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center">
                {analysisTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-slate-500">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Model Accuracy Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <h4 className="text-sm font-semibold text-slate-700 mb-1">
                Model Performance
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Accuracy vs industry benchmark
              </p>
              <ResponsiveContainer width="100%" height={140}>
                <ReBarChart data={accuracyData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[80, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="model"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
                    width={35}
                  />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2">
                            <p className="text-xs font-semibold text-slate-700">{label}</p>
                            {payload.map((entry: any, idx: number) => (
                              <p key={idx} className="text-xs" style={{ color: entry.color }}>
                                {entry.name}: {entry.value}%
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine x={90} stroke="#94a3b8" strokeDasharray="3 3" />
                  <Bar
                    dataKey="accuracy"
                    name="My Model"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    barSize={16}
                  />
                  <Bar
                    dataKey="benchmark"
                    name="Benchmark"
                    fill="#cbd5e1"
                    radius={[0, 4, 4, 0]}
                    barSize={16}
                  />
                </ReBarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={hero.isContactModalOpen}
        onClose={() => hero.setIsContactModalOpen(false)}
      />

      {hero.isResumeOpen && (
        <Resume resumeUrl={resumeUrl} onClose={() => hero.setIsResumeOpen(false)} />
      )}
    </div>
  );
};

export default DataHeroSection;
