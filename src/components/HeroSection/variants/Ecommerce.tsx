"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Shield, Truck, Star, ArrowRight, BadgeCheck, CreditCard } from "lucide-react";
import { HeroConfig } from "@/lib/roles";

interface EcommerceHeroSectionProps {
  headline?: string;
  bio?: string;
  resumeUrl?: string;
  heroConfig?: HeroConfig;
}

const trustBadges = [
  { icon: Shield, label: "Secure Checkout" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: BadgeCheck, label: "Verified Stores" },
  { icon: CreditCard, label: "PCI Compliant" },
];

const EcommerceHeroSection = ({
  headline,
  bio,
  resumeUrl,
}: EcommerceHeroSectionProps) => {
  return (
    <div id="herosection" className="relative w-full min-h-[85vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-amber-100/30 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <BadgeCheck className="w-4 h-4" />
              Available for E-Commerce Projects
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {headline || "Building High-Converting"}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Online Stores
              </span>
            </h1>

            {/* Bio */}
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              {bio || "I specialize in creating e-commerce experiences that turn visitors into customers. From Shopify to custom headless solutions, I build stores that sell."}
            </p>

            {/* Metrics */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">$2.4M+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Revenue Generated</div>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">150K+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Orders Processed</div>
              </div>
              <div className="w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">4.9★</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Client Rating</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Your Store
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-2 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                View Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-500 text-sm">
                  <badge.icon className="w-4 h-4 text-emerald-600" />
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Store Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-6">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-slate-100 rounded-full h-6 mx-4" />
              </div>
              
              {/* Mock store content */}
              <div className="space-y-4">
                {/* Hero product */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center">
                  <div className="w-32 h-32 bg-white rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center">
                    <ShoppingCart className="w-16 h-16 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Premium E-Commerce</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">$0.00</div>
                </div>
                
                {/* Product grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="w-12 h-12 bg-white rounded-lg mx-auto mb-2 shadow-sm" />
                      <div className="h-2 bg-slate-200 rounded w-3/4 mx-auto mb-1" />
                      <div className="h-2 bg-emerald-200 rounded w-1/2 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm"
              >
                Now Available
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceHeroSection;
