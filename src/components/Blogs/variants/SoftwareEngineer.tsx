"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";
import { BlogPost } from "@/lib/blog";
import { BookOpen, Feather } from "lucide-react";

interface BlogsProps {
  initialBlogs: BlogPost[];
  role?: string;
}

const SoftwareEngineerBlogs = ({ initialBlogs, role }: BlogsProps) => {
  if (initialBlogs.length === 0) return null;

  const rolePrefix = role ? `/portfolio/${role}` : "";

  return (
    <div
      id="blogs"
      className="relative py-16 px-4"
    >
      <div className="max-w-[85rem] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Feather className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Insights
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            Latest Writings
          </h2>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            Thoughts on {role?.replace("-", " ") || "technology"}, software architecture, 
            and the future of engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialBlogs.map((blog, index) => {
            const gradients = [
              "from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)]",
              "from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)]",
              "from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.1)]",
            ];
            const borderColors = [
              "border-[rgba(102,126,234,0.3)]",
              "border-[rgba(17,153,142,0.3)]",
              "border-[rgba(59,130,246,0.3)]",
            ];

            return (
              <Link
                key={blog.slug}
                href={`${rolePrefix}/blog/${blog.slug}`}
                className={`group flex flex-col h-full backdrop-blur-[20%] bg-linear-to-br ${gradients[index % 3]} 
                  ${borderColors[index % 3]} border-2 rounded-3xl overflow-hidden
                  hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {blog.imageUrl ? (
                    <Image
                      src={blog.imageUrl}
                      alt={blog.imageAlt || blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-secondary shadow-sm"
                    >
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-spacemono text-stone-500"
                    >
                      <span>{blog.date}</span>
                      <span className="h-1 w-1 rounded-full bg-stone-400" />
                      <span>{blog.tags[0] || "Article"}</span>
                    </div>
                    <h3 className="font-fraunces text-xl font-bold text-secondary group-hover:text-secondary/80 transition-colors leading-snug line-clamp-2"
                    >
                      {blog.title}
                    </h3>
                    <p className="text-stone-600/80 font-light leading-relaxed line-clamp-3"
                    >
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/30 flex items-center text-sm font-semibold text-secondary group-hover:gap-2 transition-all"
                  >
                    Read Article
                    <MdArrowOutward className="ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {initialBlogs.length >= 3 && (
          <div className="text-center mt-12">
            <Link href={`${rolePrefix}/blog`}>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-secondary/30 hover:border-secondary/60 hover:bg-secondary/5 font-semibold tracking-tight shadow-lg transition-all hover:-translate-y-0.5"
              >
                Explore Full Library
                <MdArrowOutward className="ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareEngineerBlogs;
