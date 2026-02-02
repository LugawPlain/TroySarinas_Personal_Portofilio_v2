import Link from "next/link";
import React from "react";
import { getBlogPosts } from "@/lib/blog";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  const validRoles = ["software-engineer", "gtm-engineer", "video-editor"];
  if (!validRoles.includes(role)) {
    return notFound();
  }

  const blogPosts = await getBlogPosts(role);

  return (
    <div className="min-h-screen pt-8 pb-8 px-4 sm:px-8 max-w-5xl mx-auto font-inter">
      <h1 className="text-3xl sm:text-5xl font-bold font-fraunces text-center mb-4 text-foreground/90">
        {role.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Blog
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Tailored insights and articles curated for your role as a{" "}
        {role.replace("-", " ")}.
      </p>

      <div className="space-y-8">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/portfolio/${role}/blog/${post.slug}`}
              className="block group"
            >
              <article className="p-6 rounded-2xl bg-primary border border-border transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:border-secondary/50 flex flex-col-reverse sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 whitespace-nowrap"
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
                </div>
                {post.imageUrl && (
                  <div className="relative w-full sm:w-64 h-48 sm:h-40 shrink-0 rounded-xl overflow-hidden self-start">
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
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
            <p className="text-muted-foreground">
              No blog posts found for this role yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleBlogPage;
