"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, TrendingUp, ShoppingBag, Users } from "lucide-react";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, prefix = "", suffix = "", duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const RevenueCounter = () => {
  return (
    <div className="relative py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-600 font-medium text-sm uppercase tracking-wider mb-2"
            >
              Live Performance Metrics
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900"
            >
              Revenue{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
              >
                Generated
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: DollarSign,
              label: "Total Revenue",
              value: 2450000,
              prefix: "$",
              suffix: "+",
              color: "emerald",
            },
            {
              icon: ShoppingBag,
              label: "Orders Processed",
              value: 156000,
              suffix: "+",
              color: "teal",
            },
            {
              icon: Users,
              label: "Happy Customers",
              value: 89000,
              suffix: "+",
              color: "cyan",
            },
            {
              icon: TrendingUp,
              label: "Avg. Conversion",
              value: 48,
              prefix: "",
              suffix: "%",
              color: "green",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colors: Record<
              string,
              { bg: string; text: string; border: string }
            > = {
              emerald: {
                bg: "bg-emerald-50",
                text: "text-emerald-600",
                border: "border-emerald-200",
              },
              teal: {
                bg: "bg-teal-50",
                text: "text-teal-600",
                border: "border-teal-200",
              },
              cyan: {
                bg: "bg-cyan-50",
                text: "text-cyan-600",
                border: "border-cyan-200",
              },
              green: {
                bg: "bg-green-50",
                text: "text-green-600",
                border: "border-green-200",
              },
            };
            const color = colors[stat.color];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`${color.bg} border-2 ${color.border} rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-500`}
              >
                <div
                  className={`w-14 h-14 ${color.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${color.border}`}
                >
                  <Icon className={`w-7 h-7 ${color.text}`} />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2"
                >
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="text-slate-500 font-medium"
                >{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mt-8"
        >
          <span className="relative flex h-3 w-3"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
            />
          </span>
          <p className="text-sm text-slate-500"
          >Live data — updates in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueCounter;
