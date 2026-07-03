"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, Code2, Wrench } from "lucide-react";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface EcommerceTechnologiesProps {
  initialTech: TechItem[];
}

const categories = [
  {
    name: "Platforms",
    icon: ShoppingCart,
    color: "emerald",
    techs: ["Shopify", "WooCommerce", "BigCommerce", "Magento"],
  },
  {
    name: "Payments",
    icon: CreditCard,
    color: "amber",
    techs: ["Stripe", "PayPal", "Square", "Shopify Payments"],
  },
  {
    name: "Frontend",
    icon: Code2,
    color: "blue",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Liquid"],
  },
  {
    name: "Tools",
    icon: Wrench,
    color: "purple",
    techs: ["Algolia", "Klaviyo", "Recharge", "ShipStation"],
  },
];

const getCategoryForTech = (techName: string) => {
  for (const cat of categories) {
    if (cat.techs.some((t) => t.toLowerCase() === techName.toLowerCase())) {
      return cat;
    }
  }
  return categories[3]; // Default to Tools
};

const EcommerceTechnologies = ({ initialTech }: EcommerceTechnologiesProps) => {
  // Group techs by category
  const groupedTechs = initialTech.reduce((acc, tech) => {
    const category = getCategoryForTech(tech.name);
    if (!acc[category.name]) {
      acc[category.name] = { category, techs: [] };
    }
    acc[category.name].techs.push(tech);
    return acc;
  }, {} as Record<string, { category: (typeof categories)[0]; techs: TechItem[] }>);

  return (
    <div id="skills" className="relative py-20 px-4 bg-white">
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
            <Wrench className="w-4 h-4" />
            Tech Stack
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            E-Commerce{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
            >
              Platforms
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            The complete toolkit I use to build, optimize, and scale online
            stores.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8"
        >
          {Object.values(groupedTechs).map(({ category, techs }, idx) => {
            const Icon = category.icon;
            const colors: Record<
              string,
              { bg: string; border: string; text: string; bar: string }
            > = {
              emerald: {
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                text: "text-emerald-700",
                bar: "bg-emerald-500",
              },
              amber: {
                bg: "bg-amber-50",
                border: "border-amber-200",
                text: "text-amber-700",
                bar: "bg-amber-500",
              },
              blue: {
                bg: "bg-blue-50",
                border: "border-blue-200",
                text: "text-blue-700",
                bar: "bg-blue-500",
              },
              purple: {
                bg: "bg-purple-50",
                border: "border-purple-200",
                text: "text-purple-700",
                bar: "bg-purple-500",
              },
            };
            const color = colors[category.color] || colors.emerald;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`${color.bg} border-2 ${color.border} rounded-3xl p-8`}
              >
                <div className="flex items-center gap-3 mb-6"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}
                  >
                    <Icon className={`w-6 h-6 ${color.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900"
                  >
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-4"
                >
                  {techs.map((tech) => (
                    <div key={tech.name}
                    >
                      <div className="flex items-center justify-between mb-1"
                      >
                        <span className="font-semibold text-slate-800"
                        >
                          {tech.name}
                        </span>
                        <span className="text-sm text-slate-500"
                        >
                          {tech.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden"
                      >
                        <div
                          className={`h-full ${color.bar} rounded-full transition-all duration-1000`}
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EcommerceTechnologies;
