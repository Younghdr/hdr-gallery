import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getMusicItems, getPhotographyItems } from "@/lib/site-data";
import { PageIntro, PhotoMasonry, SectionHeader, SiteFrame } from "@/components/site-components";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "HDR 攝影作品",
  description:
    "瀏覽 HDR 攝影作品：山脈、海岸、城市邊界與旅途中的片刻寧靜。以高動態範圍工作流程保留現場的光線層次與空氣感。",
  keywords: [
    "HDR 攝影",
    "HDR Photography",
    "風景攝影",
    "旅行攝影",
    "高動態範圍",
    "Landscape Photography",
    "Travel Photography",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: `${BASE_PATH}/photography/`,
  },
};

export default function PhotographyPage() {
  const { details } = getPhotographyItems();
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.photography.title}
        titleZh={copy.photography.titleZh}
        subtitle={copy.photography.subtitle}
        subtitleZh={copy.photography.subtitleZh}
        intro={copy.photography.intro}
        introZh={copy.photography.introZh}
      />
      <section className="px-5 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="HDR Photography"
          title={copy.photography.gridTitle}
          titleZh={copy.photography.gridTitleZh}
          subtitle={copy.photography.gridSubtitle}
          subtitleZh={copy.photography.gridSubtitleZh}
        />
        <PhotoMasonry photos={details} />
      </section>
    </SiteFrame>
  );
}
