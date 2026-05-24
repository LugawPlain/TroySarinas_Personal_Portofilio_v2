"use client";

import React from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../../DynamicIcon";
import { TrendingUp, Camera, Heart, BarChart3, ArrowRight } from "lucide-react";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface SocialTechnologiesProps {
  initialTech: TechItem[];
}

const workflowStages = [
  {
    id: "creation",
    name: "Content Creation",
    icon: Camera,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    keywords: ["canva", "adobe", "photoshop", "premiere", "capcut", "content"],
  },
  {
    id: "scheduling",
    name: "Scheduling",
    icon: Heart,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    keywords: ["buffer", "hootsuite", "later", "sprout", "scheduling"],
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    keywords: ["analytics", "insights", "metric", "google", "data"],
  },
  {
    id: "engagement",
    name: "Engagement",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
    keywords: ["engagement", "community", "moderation", "interaction"],
  },
];

const categorizeTech = (techName: string): string => {
  const name = techName.toLowerCase();
  for (const stage of workflowStages) {
    if (stage.keywords.some((k) => name.includes(k))) return stage.id;
  }
  return "creation";
};

const SocialTechnologies = ({ initialTech }: SocialTechnologiesProps) => {
  const techByStage = initialTech.reduce((acc, tech) => {
    const stage = categorizeTech(tech.name);
    if (!acc[stage]) acc[stage] = [];
    acc[stage].push(tech);
    return acc;
  }, {} as Record<string, TechItem[]>);

  return (
    <motion.div
      id="technologies"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative py-20 px-4 sm:px-8 bg-gray-950"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-pink-400" />
          </div>
          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">
            Social Stack
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Content Workflow
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          End-to-end social media workflow from content creation to community engagement.
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="max-w-6xl mx-auto">
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
                        className="flex items-center gap-3 bg-gray-900/50 rounded-xl p-3 border border-gray-800 hover:border-gray-700 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                          <DynamicIcon name={tech.icon_name} size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Arrow between stages */}
                {stageIndex < workflowStages.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SocialTechnologies;
