import type { SiteExampleSlug } from "@lugawplain/website-examples/thumbnails";

export const websiteExampleOptions: {
  value: SiteExampleSlug;
  label: string;
}[] = [
  { value: "brassrazor", label: "Brass Razor" },
  { value: "celestial-oud", label: "Celestial Oud" },
  { value: "headshot", label: "Headshot" },
  { value: "skypiercer", label: "SkyPiercer" },
  { value: "velora", label: "Velora" },
  { value: "verdantdew", label: "Verdant Dew" },
  { value: "wanderlust", label: "Wanderlust" },
  { value: "wayfare", label: "Wayfare" },
];

export function isSiteExampleSlug(value: unknown): value is SiteExampleSlug {
  return (
    typeof value === "string" &&
    websiteExampleOptions.some((example) => example.value === value)
  );
}
