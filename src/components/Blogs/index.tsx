"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import StandardBlogs from "./variants/Standard";
import { BlogPost } from "@/lib/blog";

interface BlogsProps {
  initialBlogs: BlogPost[];
  role?: string;
}

export default function Blogs({ initialBlogs, role: propRole }: BlogsProps) {
  const { role: contextRole } = usePortfolio();
  const activeRole = contextRole || propRole;

  switch (activeRole) {
    // case "video-editor": return <CinematicBlogs initialBlogs={initialBlogs} />;

    default:
      return <StandardBlogs initialBlogs={initialBlogs} role={activeRole} />;
  }
}
