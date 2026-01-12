import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
  imageUrl: string | null;
  imageAlt: string | null;
}

interface SupabaseBlogPost {
  id: string;
  slug: string | Record<string, unknown>;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  date?: string;
  read_time?: string;
  tags?: string[];
  status: string;
  images?: Array<{ url: string; alt: string }>;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

// Internal function that fetches from Supabase
async function fetchBlogPostsFromDB(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return (data as SupabaseBlogPost[]).map((post) => ({
    slug: String(post.slug || ''),
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date || post.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: post.read_time || "5 min read",
    content: post.content,
    tags: post.tags || [],
    imageUrl: post.images?.[0]?.url || null,
    imageAlt: post.images?.[0]?.alt || null,
  }));
}

// Cached version with Next.js cache (persistent across requests, revalidates every 60 seconds)
const getCachedBlogPosts = unstable_cache(
  async () => fetchBlogPostsFromDB(),
  ['blog-posts'],
  { 
    revalidate: 60, // Cache for 60 seconds
    tags: ['blog-posts'] 
  }
);

// React cache for request-level memoization
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return getCachedBlogPosts();
});

// Internal function that fetches a single post from Supabase
async function fetchBlogPostBySlugFromDB(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  const post = data as SupabaseBlogPost;

  return {
    slug: String(post.slug || ''),
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date || post.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: post.read_time || "5 min read",
    content: post.content,
    tags: post.tags || [],
    imageUrl: post.images?.[0]?.url || null,
    imageAlt: post.images?.[0]?.alt || null,
  };
}

// Cached version with dynamic cache key based on slug
const getCachedBlogPost = (slug: string) => unstable_cache(
  async () => fetchBlogPostBySlugFromDB(slug),
  [`blog-post-${slug}`],
  { 
    revalidate: 60,
    tags: [`blog-post-${slug}`] 
  }
)();

// React cache for request-level memoization
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return getCachedBlogPost(slug);
});
