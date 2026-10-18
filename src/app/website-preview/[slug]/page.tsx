import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WebsiteExamplePreview from "@/components/WebsiteExamplePreview";
import {
  isSiteExampleSlug,
  websiteExampleOptions,
} from "@/lib/website-examples";

interface WebsitePreviewPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return websiteExampleOptions.map(({ value }) => ({ slug: value }));
}

export async function generateMetadata({
  params,
}: WebsitePreviewPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isSiteExampleSlug(slug)) {
    return { title: "Website Preview Not Found" };
  }

  const example = websiteExampleOptions.find((item) => item.value === slug);

  return {
    title: `${example?.label ?? "Website"} Preview | Troy Sarinas`,
    robots: { index: false, follow: false },
  };
}

export default async function WebsitePreviewPage({
  params,
}: WebsitePreviewPageProps) {
  const { slug } = await params;

  if (!isSiteExampleSlug(slug)) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-white">
      <WebsiteExamplePreview slug={slug} />
    </main>
  );
}
