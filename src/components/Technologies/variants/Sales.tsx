"use client";

import { motion } from "framer-motion";
import DynamicIcon from "../../DynamicIcon";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface TechnologiesProps {
  initialTech: TechItem[];
}

const SalesTechnologies = ({ initialTech }: TechnologiesProps) => {
  const categories = [
    { name: "CRM", color: "#dc2626" },
    { name: "Outreach", color: "#1f2937" },
    { name: "Intelligence", color: "#dc2626" },
    { name: "Communication", color: "#1f2937" },
    { name: "Productivity", color: "#dc2626" },
  ];

  return (
    <motion.div
      id="technologies"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-4 pb-16 relative overflow-clip py-16"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <DynamicIcon name="Zap" size={16} className="text-red-600" />
          </div>
          <span className="text-sm font-bold text-red-600 uppercase tracking-wider">
            Sales Stack
          </span>
        </div>
        <h2 className="text-center font-bold text-3xl sm:text-4xl text-gray-900 font-fraunces mb-4">
          Sales Technology Stack
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          The tools and platforms that power my sales workflow
        </p>
      </div>

      {/* Sales Stack Grid */}
      <div className="max-w-[80rem] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {initialTech.map(({ name, icon_name }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <DynamicIcon name={icon_name} size={24} className="text-red-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">{name}</span>
            </motion.div>
          ))}
        </div>

        {/* Categories Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-gray-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SalesTechnologies;
