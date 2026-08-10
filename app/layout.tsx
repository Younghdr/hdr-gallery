import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const SITE_ORIGIN = "https://younghdr.github.io";
const OG_IMAGE = `${BASE_PATH}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ORIGIN}${BASE_PATH}/`),
  title: {
    default: "Young HDR Gallery | HDR 影像作品集",
    template: "%s | Young HDR Gallery",
  },
  description:
    "探索 HDR 旅行、重機與科技影片，以及免費 HDR 顯示器測試工具。Young HDR Gallery 展示高動態範圍影像作品與實用的螢幕 HDR 檢測功能。",
  keywords: [
    "HDR",
    "HDR video",
    "HDR travel",
    "HDR motorcycle",
    "HDR technology",
    "HDR portfolio",
    "HDR 測試",
    "HDR 顯示器測試",
    "峰值亮度測試",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh-Hant",
    siteName: "Young HDR Gallery",
    title: "Young HDR Gallery | HDR 影像作品集",
    description:
      "探索 HDR 旅行、重機與科技影片，以及免費 HDR 顯示器測試工具。",
    url: "/",
    images: {
      url: OG_IMAGE,
      alt: "Young HDR Gallery",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Young HDR Gallery | HDR 影像作品集",
    description:
      "探索 HDR 旅行、重機與科技影片，以及免費 HDR 顯示器測試工具。",
    images: {
      url: OG_IMAGE,
      alt: "Young HDR Gallery",
      width: 1200,
      height: 630,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "zt7I2nMZOVCVQd6D43ysG__pY-qk8t98QB7WXCjkiao",
  },
  other: {
    "color-scheme": "light dark",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
