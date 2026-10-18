"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { SiteExampleSlug } from "@lugawplain/website-examples/thumbnails";

const previews: Record<SiteExampleSlug, ComponentType> = {
  brassrazor: dynamic(
    () => import("@lugawplain/website-examples/brassrazor"),
    { ssr: false },
  ),
  "celestial-oud": dynamic(
    () => import("@lugawplain/website-examples/celestial-oud"),
    { ssr: false },
  ),
  headshot: dynamic(
    () => import("@lugawplain/website-examples/headshot"),
    { ssr: false },
  ),
  skypiercer: dynamic(
    () => import("@lugawplain/website-examples/skypiercer"),
    { ssr: false },
  ),
  velora: dynamic(() => import("@lugawplain/website-examples/velora"), {
    ssr: false,
  }),
  verdantdew: dynamic(
    () => import("@lugawplain/website-examples/verdantdew"),
    { ssr: false },
  ),
  wanderlust: dynamic(
    () => import("@lugawplain/website-examples/wanderlust"),
    { ssr: false },
  ),
  wayfare: dynamic(() => import("@lugawplain/website-examples/wayfare"), {
    ssr: false,
  }),
};

export default function WebsiteExamplePreview({
  slug,
}: {
  slug: SiteExampleSlug;
}) {
  const Preview = previews[slug];
  return <Preview />;
}
