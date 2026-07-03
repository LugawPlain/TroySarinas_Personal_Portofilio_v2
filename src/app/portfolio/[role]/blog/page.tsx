import Link from "next/link";
import React from "react";
import { getBlogPosts } from "@/lib/blog";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Feather, BookOpen, ArrowLeft, Clock, Tag } from "lucide-react";

interface Props {
  params: Promise<{ role: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const roleName = role
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${roleName} Insights | Troy Sarinas`,
    description: `Read my thoughts on ${roleName.toLowerCase()}, and more.`,
  };
}

const RoleBlogPage = async ({ params }: Props) => {
  const { role } = await params;

  const validRoles = ["software-engineer", "gtm-engineer", "video-editor", "ecommerce-developer"];
  if (!validRoles.includes(role)) {
    return notFound();
  }

  const blogPosts = await getBlogPosts(role);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        {/* Back Link */}
        <Link 
          href={`/portfolio/${role}`}
          className="inline-flex items-center gap-2 text-sm font-spacemono text-secondary/70 hover:text-secondary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Feather className="w-5 h-5 text-secondary/70" />
            <span className="text-sm font-spacemono text-secondary/60 uppercase tracking-wider">
              Blog
            </span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-secondary mb-4">
            {role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Blog
          </h1>
          <p className="text-stone-600/80 font-light font-spacemono max-w-2xl mx-auto">
            Tailored insights and articles curated for your role as a{" "}
            {role.replace("-", " ")}.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => {
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
                  key={post.slug}
                  href={`/portfolio/${role}/blog/${post.slug}`}
                  className={`block group backdrop-blur-[20%] bg-linear-to-br ${gradients[index % 3]} 
                    ${borderColors[index % 3]} border-2 rounded-3xl overflow-hidden
                    hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <article className="flex flex-col-reverse sm:flex-row gap-6 p-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 text-sm font-spacemono text-stone-500"
                        >
                          <span>{post.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 rounded-full bg-white/40 backdrop-blur-sm text-secondary border border-white/50 font-medium"
                            >
                              <Tag className="w-3 h-3 inline mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="font-fraunces text-2xl font-semibold text-secondary mb-3 group-hover:text-secondary/80 transition-colors"
                      >
                        {post.title}
                      </h2>
                      <p className="text-stone-600/80 font-light leading-relaxed"
                      >
                        {post.excerpt}
                      </p>
                      <div className="mt-4 text-sm font-semibold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Read Article <span>→</span>
                      </div>
                    </div>
                    {post.imageUrl && (
                      <div className="relative w-full sm:w-64 h-48 sm:h-40 shrink-0 rounded-2xl overflow-hidden self-start"
                      >
                        <Image
                          src={post.imageUrl}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </article>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-20 backdrop-blur-[20%] bg-linear-to-br from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.05)] border-2 border-[rgba(102,126,234,0.2)] rounded-3xl"
            >
              <BookOpen className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-stone-500 font-spacemono">
                No blog posts found for this role yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleBlogPage;
