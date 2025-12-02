import Link from "next/link";
import React from "react";
import { blogPosts } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Troy Sarinas",
  description:
    "Read my thoughts on software engineering, automation, and web development.",
};

const BlogPage = () => {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 max-w-4xl mx-auto font-inter">
      <h1 className="text-3xl sm:text-5xl font-bold font-fraunces text-center mb-4 text-foreground/90">
        Blog
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Thoughts, tutorials, and insights on software engineering, automation, and
        building digital products.
      </p>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <article className="p-6 rounded-2xl bg-primary border border-border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:border-secondary/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-foreground/90 mb-3 group-hover:text-secondary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 text-secondary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <span>→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
