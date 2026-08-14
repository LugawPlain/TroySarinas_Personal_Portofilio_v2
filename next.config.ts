import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkyhwhijbmndzajxaeoy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    const roles = [
      "cpa",
      "data-analyst",
      "ecommerce-developer",
      "gtm-engineer",
      "marketing-manager",
      "sales-representative",
      "social-media-manager",
      "software-engineer",
      "video-editor",
      "virtual-assistant",
    ];

    return roles.flatMap((r) => [
      { source: `/${r}`, destination: `/portfolio/${r}`, permanent: true },
      { source: `/${r}/projects`, destination: `/portfolio/${r}/projects`, permanent: true },
      { source: `/${r}/projects/:id`, destination: `/portfolio/${r}/projects/:id`, permanent: true },
      { source: `/${r}/blog`, destination: `/portfolio/${r}/blog`, permanent: true },
      { source: `/${r}/blog/:slug`, destination: `/portfolio/${r}/blog/:slug`, permanent: true },
    ]);
  },
};

export default nextConfig;
