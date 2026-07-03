import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getJournalItems, getMusicItems } from "@/lib/site-data";
import { JournalList, PageIntro, SectionHeader, SiteFrame } from "@/components/site-components";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "影像札記",
  description:
    "閱讀 Young Hung 的影像札記：關於旅行、光線、HDR 攝影與觀看方式的現場筆記。",
  keywords: [
    "影像札記",
    "旅行攝影筆記",
    "HDR 攝影心得",
    "攝影隨筆",
    "Journal",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: `${BASE_PATH}/journal/`,
  },
};

export default function JournalPage() {
  const journals = getJournalItems();
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.journal.title}
        titleZh={copy.journal.titleZh}
        subtitle={copy.journal.subtitle}
          subtitleZh="Journey notes through light, travel, and images."
        intro={copy.journal.intro}
        introZh={copy.journal.introZh}
      />
      <section className="px-5 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="Journal"
          title={copy.journal.sectionTitle}
          titleZh={copy.journal.sectionTitleZh}
          subtitle="Looking back at the journey through images, and understanding the journey again through them."
          subtitleZh="Looking back through images, and understanding the journey again."
        />
        <JournalList items={journals} />
      </section>
    </SiteFrame>
  );
}
