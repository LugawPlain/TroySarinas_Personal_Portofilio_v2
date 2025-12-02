import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Troy Sarinas Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Troy Sarinas"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-8 pb-8 pb-16 px-4 sm:px-8 max-w-3xl mx-auto font-inter">
      <Link
        href="/blog"
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="mb-8 border-b border-border pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 no-underline"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-fraunces text-foreground/90 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <div
          className="blog-content text-foreground/80 leading-relaxed space-y-6 
            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground/90 [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:font-fraunces
            [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-foreground/90 [&>h3]:mt-6 [&>h3]:mb-3
            [&>p]:text-base [&>p]:leading-7 [&>p]:mb-4
            [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:space-y-2
            [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:space-y-2
            [&>li]:text-base [&>li]:leading-7
            [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-4
            [&>pre>code]:bg-transparent [&>pre>code]:text-gray-100 [&>pre>code]:p-0
            [&>code]:bg-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:text-secondary
            [&>blockquote]:border-l-4 [&>blockquote]:border-secondary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4
            [&>strong]:font-semibold [&>strong]:text-foreground
            [&>a]:text-secondary [&>a]:underline [&>a]:hover:text-secondary/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
