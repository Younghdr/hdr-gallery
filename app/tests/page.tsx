import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getMusicItems, getTestItems } from "@/lib/site-data";
import { PageIntro, SectionHeader, SiteFrame, TestGrid, TextPanel } from "@/components/site-components";
import { PeakBrightnessTest } from "@/components/peak-brightness-test";
import { HdrDiagnostics } from "@/components/hdr-diagnostics";
import { HdrSummary } from "@/components/hdr-summary";
import { HdrVideoVisibilityTest } from "@/components/hdr-video-visibility-test";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import Script from "next/script";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "HDR 顯示器測試 | 峰值亮度、暗部與亮部檢查",
  description:
    "免費線上 HDR 顯示器測試工具：峰值亮度測試、Near Black 暗部細節、Near White 亮部細節，幫助你快速了解螢幕的 HDR 表現。",
  keywords: [
    "HDR 測試",
    "HDR 顯示器測試",
    "峰值亮度測試",
    "Peak Brightness Test",
    "暗部細節測試",
    "亮部細節測試",
    "HDR 檢測工具",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: `${BASE_PATH}/tests/`,
  },
};

export default function TestsPage() {
  const tests = getTestItems();
  const music = getMusicItems();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <SiteFrame music={music}>
      <BreadcrumbJsonLd
        items={[
          { name: "首頁", url: "/" },
          { name: "顯示測試", url: "/tests/" },
        ]}
      />
      <PageIntro
        title={copy.tests.title}
        titleZh={copy.tests.titleZh}
        subtitle={copy.tests.subtitle}
        subtitleZh={copy.tests.subtitleZh}
        intro={copy.tests.intro}
        introZh={copy.tests.introZh}
      />
      <TextPanel>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{copy.tests.guideTitle}</p>
        <h2 className="mt-3 text-2xl font-semibold text-pearl md:text-3xl">{copy.tests.guideTitleZh}</h2>
        <p className="mt-5 text-base leading-8 text-mist">{copy.tests.guideIntroZh}</p>
        <p className="mt-3 text-base leading-8 text-mist">{copy.tests.guideIntro}</p>
      </TextPanel>
      <HdrDiagnostics />
      <HdrVideoVisibilityTest />
      <section className="px-5 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="Display Test"
          title={copy.tests.sectionTitle}
          titleZh={copy.tests.sectionTitleZh}
          subtitle={copy.tests.sectionSubtitle}
          subtitleZh={copy.tests.sectionSubtitleZh}
        />
        <TestGrid tests={tests} />
      </section>
      <PeakBrightnessTest />
      <HdrSummary />
      <Script src={`${basePath}/scoring.js`} strategy="afterInteractive" />
    </SiteFrame>
  );
}
