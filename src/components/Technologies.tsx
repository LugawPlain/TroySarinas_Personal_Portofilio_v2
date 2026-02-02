"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import LayeredSlants from "./Icons/LayeredSlants";
import DynamicIcon from "./DynamicIcon";

interface TechItem {
  name: string;
  icon_name: string;
  proficiency: number;
}

interface TechnologiesProps {
  role?: string;
  initialTech: TechItem[];
}

const Technologies = ({ role, initialTech }: TechnologiesProps) => {
  const [showAll, setShowAll] = useState(false);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const gridVariants = {
    hidden: {
      height: "15rem",
      opacity: 1,
      transition: { duration: 0.75, ease: "easeInOut" as const },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  const variants = {
    idle: { scaleX: 1, scaleY: 1, rotateY: 0 },
    active: { scaleX: 1.05, scaleY: 1.2, rotateY: 180 },
  };

  return (
    <motion.div
      id="technologies"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-4 pb-8 relative overflow-clip"
    >
      <LayeredSlants className="bottom-0 absolute -z-99" />
      <h2 className="text-center mb-10 font-bold">
        <span className="text-3xl sm:text-4xl text-foreground/90">
          Technologies I use 🧑‍💻
        </span>
      </h2>
      <div className="relative">
        <motion.div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 95%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 95%, transparent 100%)",
          }}
          className="px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 py-4 pb-8 max-w-[80rem] mx-auto"
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
                className="group perspective-1000 cursor-pointer"
                tabIndex={0}
              >
                <motion.div
                  variants={variants}
                  animate={isActive ? "active" : "idle"}
                  className="relative shadow-2xl rounded-2xl w-full h-8 xl:h-10 hover:scale-105 hover:-translate-y-1 hover:-translate-x-1  group-focus-within:scale-120 transform transition duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute px-4 py-2 flex items-center justify-between inset-0 rounded-lg bg-secondary text-secondary-foreground"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <DynamicIcon name={icon_name} size={24} />
                    <p className="text-sm font-medium font-inter">{name}</p>
                  </div>
                  <div
                    className="absolute py-2 rounded-lg inset-0 bg-gray-200 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-center text-xs xl:text-md font-semibold text-gray-800">
                      {(() => {
                        if (proficiency < 30) return "Entry Level";
                        if (proficiency < 50) return "Junior";
                        if (proficiency < 70) return "Mid-Level";
                        if (proficiency < 80) return "Senior";
                        if (proficiency < 90) return "Expert";
                        return "Advanced";
                      })()}
                    </p>
                    <div className="min-h-3 overflow-hidden w-full bg-gray-100 flex justify-start items-center relative">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{
                          width: isActive ? `${proficiency}%` : "0%",
                          filter: isActive
                            ? `hue-rotate(${(proficiency / 100) * 120}deg)`
                            : "none",
                        }}
                        transition={{ duration: 1.5, ease: "linear" }}
                        className="flex flex-col top-0 left-0 bg-red-500/50 h-full relative"
                      >
                        <div className="absolute text-[10px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-fit font-bold text-white drop-shadow-sm">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 3 }}
                          >
                            {proficiency}%
                          </motion.p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="block mx-auto font-semibold text-sm mt-4 px-4 py-2 rounded-md border border-input bg-accent text-white hover:scale-110 transition duration-200 font-montserrat"
      >
        {showAll ? "Show Less" : "Show More"}
      </button>
    </motion.div>
  );
};

export default Technologies;
