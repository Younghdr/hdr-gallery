import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://younghdr.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "tests", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "films", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "photography", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "journal", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "contact", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "travel", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "travel/namibia", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/canada", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/italy", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/Bolivia", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/iceland", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/turkiye", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/montenegro", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/tokyo", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/cebu", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/hong-kong-macau", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/sweden", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/germany-switzerland-france", priority: 0.9, changeFrequency: "weekly" as const },
  ...Array.from({ length: 12 }, (_, index) => ({
    path: `travel/germany-switzerland-france/day/${String(index + 1).padStart(2, "0")}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  })),
  { path: "travel/guide", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "travel/guide/overview", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/guide/visa", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/guide/flights", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "travel/guide/itinerary", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "travel/guide/transport", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "travel/guide/practical", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "travel/guide/photography", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "travel/guide/money-shopping", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority, changeFrequency }) => {
    const pathname = path ? `${path}/` : "";
    return {
      url: `${SITE_URL}${BASE_PATH}/${pathname}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });
}
