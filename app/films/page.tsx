import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getFilmItems, getMusicItems } from "@/lib/site-data";
import { FilmGrid, PageIntro, SectionHeader, SiteFrame } from "@/components/site-components";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "HDR 影像作品",
  description:
    "觀看為 YouTube HDR 與高亮度顯示器製作的 HDR 影片。從旅行、自然到城市，記錄光線在時間中的流動。",
  keywords: [
    "HDR 影片",
    "HDR Films",
    "YouTube HDR",
    "HDR 旅行影片",
    "HDR 自然影片",
    "高動態範圍影像",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: `${BASE_PATH}/films/`,
  },
};

export default function FilmsPage() {
  const films = getFilmItems();
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.films.title}
        titleZh={copy.films.titleZh}
        subtitle={copy.films.subtitle}
        subtitleZh={copy.films.subtitleZh}
        intro={copy.films.intro}
        introZh={copy.films.introZh}
      />
      <section className="px-5 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="HDR Films"
          title={copy.films.gridTitle}
          titleZh={copy.films.gridTitleZh}
          subtitle={copy.films.gridSubtitle}
          subtitleZh={copy.films.gridSubtitleZh}
        />
        <FilmGrid films={films} />
      </section>
    </SiteFrame>
  );
}
