import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "Young HDR Gallery",
    title: "納米比亞旅行指南｜Young HDR Gallery",
    description: "從簽證、航班、行程與 Safari，到 Etosha 攝影、住宿、實用準備與購物的納米比亞旅行紀錄。",
    images: [{ url: "/travel/guide/opengraph-image", width: 1200, height: 630, alt: "納米比亞旅行指南" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "納米比亞旅行指南｜Young HDR Gallery",
    description: "簽證、航班、行程、Safari、攝影與實用準備。",
    images: ["/travel/guide/opengraph-image"],
  },
};

export default function TravelGuideLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
