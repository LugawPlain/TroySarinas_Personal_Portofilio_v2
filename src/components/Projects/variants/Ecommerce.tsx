"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  Star,
  Eye,
  TrendingUp,
  Plus,
  Check,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EcommerceProjectsProps {
  projects: Project[];
  role?: string;
}

const EcommerceProjects = ({ projects, role }: EcommerceProjectsProps) => {
  const rolePrefix = role ? `/portfolio/${role}` : "";
  const { addItem, items } = useCart();
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleAddToCart = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (items.find((i) => i.id === project.id)) return;

    setAnimatingId(project.id);
    setTimeout(() => setAnimatingId(null), 1000);

    addItem({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image || undefined,
      technologies: project.technologies,
    });
  };

  const isInCart = (projectId: string) =>
    items.some((item) => item.id === projectId);

  return (
    <div id="projects" className="relative py-20 px-4 bg-white">
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <ShoppingCart className="w-4 h-4" />
            Store Portfolio
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
          >
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500"
            >
              Products
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Add projects to your cart to explore them later. Click "Visit Store"
            to see them live.
          </p>
        </div>

        {/* Projects Grid - Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProductCard
              key={project.id}
              project={project}
              index={index}
              rolePrefix={rolePrefix}
              isInCart={isInCart(project.id)}
              isAnimating={animatingId === project.id}
              onAddToCart={(e) => handleAddToCart(project, e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual product card component
function ProductCard({
  project,
  index,
  rolePrefix,
  isInCart,
  isAnimating,
  onAddToCart,
}: {
  project: Project;
  index: number;
  rolePrefix: string;
  isInCart: boolean;
  isAnimating: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
          >
            <ShoppingCart className="w-20 h-20 text-slate-300" />
          </div>
        )}

        {/* Add to Cart Button - Floating */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAddToCart}
          disabled={isInCart}
          className={`absolute top-4 right-16 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isInCart
              ? "bg-emerald-600 text-white"
              : "bg-white text-slate-700 hover:bg-emerald-50"
          }`}
        >
          <AnimatePresence mode="wait">
            {isAnimating ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-5 h-5" />
              </motion.div>
            ) : isInCart ? (
              <motion.div
                key="added"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Check className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Plus className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Sale Badge */}
        <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          LIVE STORE
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1"
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold">4.{8 + (index % 2)}</span>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
        >
          <Link href={`${rolePrefix}/projects/${project.id}`}>
            <Button className="bg-white text-slate-900 hover:bg-emerald-50 rounded-full px-6"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6"
      >
        <div className="flex items-start justify-between mb-3"
        >
          <div className="flex-1"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors"
            >
              {project.title}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2"
            >
              {project.description}
            </p>
          </div>
        </div>

        {/* Price Tag Style Metrics */}
        <div className="flex items-center gap-4 mb-4 py-3 border-y border-slate-100"
        >
          <div className="flex items-center gap-1.5"
          >
            <Tag className="w-4 h-4 text-emerald-600" />
            <span className="text-lg font-bold text-emerald-600"
            >
              +{(index + 2) * 150}%
            </span>
            <span className="text-sm text-slate-400">ROI</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1"
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-700"
            >
              {(index + 1) * 12}K
            </span>
            <span className="text-sm text-slate-400">Orders</span>
          </div>
        </div>

        {/* Technologies as Product Specs */}
        <div className="flex flex-wrap gap-2 mb-5"
        >
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-400 rounded-full"
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3"
        >
          <button
            onClick={onAddToCart}
            disabled={isInCart}
            className={`flex-1 py-3 px-4 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              isInCart
                ? "bg-emerald-100 text-emerald-700 cursor-default"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            href={`${rolePrefix}/projects/${project.id}`}
            className="flex-1"
          >
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              View Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EcommerceProjects;
