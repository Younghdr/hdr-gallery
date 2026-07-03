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
