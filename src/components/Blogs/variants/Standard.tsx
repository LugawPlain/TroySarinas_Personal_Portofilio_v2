"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";
import { BlogPost } from "@/lib/blog";

interface BlogsProps {
  initialBlogs: BlogPost[];
  role?: string;
}

const StandardBlogs = ({ initialBlogs, role }: BlogsProps) => {
  if (initialBlogs.length === 0) return null;

  const rolePrefix = role ? `/portfolio/${role}` : "";

  return (
    <div
      id="blogs"
      className="items-center flex flex-col py-0 px-4 relative overflow-x-clip w-full"
    >
      <div className="absolute top-10 bg-accent/10 h-80 w-[120%] skew-y-3 -z-10 "></div>
      <div className="space-y-12 flex flex-col justify-center items-center w-full max-w-[85rem]">
        <div className="text-center space-y-4">
          <h1 className="font-bold text-3xl sm:text-4xl text-foreground/90 leading-tight">
            Latest Insights & Writings ✍️
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Thoughts on {role?.replace("-", " ") || "technology"}, design, and
            the future of engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {initialBlogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`${rolePrefix}/blog/${blog.slug}`}
              className="group flex flex-col h-full bg-card hover:bg-muted/50 transition-all duration-300 rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl"
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
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-bold">
                      {blog.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm">
                    {blog.readTime}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-accent tracking-widest uppercase">
                    <span>{blog.date}</span>
                    <span className="h-1 w-1 rounded-full bg-accent/50" />
                    <span>{blog.tags[0] || "Article"}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-border/50 flex items-center font-bold text-sm text-secondary group-hover:gap-2 transition-all">
                  Read Article{" "}
                  <MdArrowOutward className="ml-1 opacity-50 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {initialBlogs.length >= 3 && (
          <Link href={`${rolePrefix}/blog`}>
            <Button
              className="mt-4 rounded-full px-8 h-12 text-sm font-bold shadow-lg hover:shadow-primary/20 transition-all"
              variant={"outline"}
            >
              Explore Full Library <MdArrowOutward className="ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StandardBlogs;
