import type { Metadata } from "next";

type GuideSeo = {
  title: string;
  description: string;
  path: string;
};

export function guideMetadata({ title, description, path }: GuideSeo): Metadata {
  const image = "/travel/guide/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: "Young HDR Gallery",
      title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: "納米比亞旅行指南｜Young HDR Gallery" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
