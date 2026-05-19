"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DynamicIcon from "../../DynamicIcon";
import { Cpu, Zap } from "lucide-react";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface TechnologiesProps {
  initialTech: TechItem[];
}

const SoftwareEngineerTechnologies = ({ initialTech }: TechnologiesProps) => {
  const [showAll, setShowAll] = useState(false);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const gridVariants = {
    hidden: {
      height: "16rem",
      opacity: 1,
      transition: { duration: 0.75, ease: "easeInOut" as const },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency < 30) return "bg-red-400/60";
    if (proficiency < 50) return "bg-orange-400/60";
    if (proficiency < 70) return "bg-yellow-400/60";
    if (proficiency < 80) return "bg-green-400/60";
    if (proficiency < 90) return "bg-emerald-400/60";
    return "bg-blue-400/60";
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency < 30) return "Entry Level";
    if (proficiency < 50) return "Junior";
    if (proficiency < 70) return "Mid-Level";
    if (proficiency < 80) return "Senior";
    if (proficiency < 90) return "Expert";
    return "Advanced";
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      "from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)]",
      "from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)]",
      "from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.1)]",
    ];
    return gradients[index % 3];
  };

  const getBorderColor = (index: number) => {
    const colors = [
      "border-[rgba(102,126,234,0.3)]",
      "border-[rgba(17,153,142,0.3)]",
      "border-[rgba(59,130,246,0.3)]",
    ];
    return colors[index % 3];
  };

  return (
    <motion.div
      id="technologies"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative py-16 px-4"
    >
      <div className="max-w-[80rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Tech Stack
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            Technologies I Use
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            Tools and frameworks I work with daily to build modern, scalable applications.
          </p>
        </div>

        <div className="relative">
          <motion.div
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 95%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 95%, transparent 100%)",
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-8"
            variants={gridVariants}
            initial="hidden"
            animate={showAll ? "visible" : "hidden"}
          >
            {initialTech.map(({ name, icon_name, proficiency }, index) => {
              const isActive = tappedIndex === index;

              return (
                <motion.div
                  onTap={() => setTappedIndex(isActive ? null : index)}
                  initial={{ zIndex: 0 }}
                  animate={{ zIndex: isActive ? 100 : 0 }}
                  key={index}
                  className="group cursor-pointer"
                  tabIndex={0}
                >
                  <motion.div
                    animate={{
                      rotateY: isActive ? 180 : 0,
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`relative backdrop-blur-[20%] bg-linear-to-br ${getCardGradient(index)} 
                      ${getBorderColor(index)} border-2 rounded-2xl p-4
                      hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                      h-24 flex flex-col items-center justify-center gap-2`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <DynamicIcon name={icon_name} size={28} />
                      <p className="text-sm font-medium text-secondary text-center">
                        {name}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <p className="text-xs font-semibold text-secondary mb-2">
                        {getProficiencyLabel(proficiency)}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{
                            width: isActive ? `${proficiency}%` : "0%",
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${getProficiencyColor(proficiency)}`}
                        />
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs font-bold text-secondary mt-1"
                      >
                        {proficiency}%
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="block mx-auto font-semibold text-sm px-6 py-3 rounded-full 
            bg-secondary text-secondary-foreground hover:bg-secondary/90 
            shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {showAll ? "Show Less" : "Show More"}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default SoftwareEngineerTechnologies;
