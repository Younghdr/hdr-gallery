import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://younghdr.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}${BASE_PATH}/sitemap.xml`,
  };
}
