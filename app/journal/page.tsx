import { copy } from "@/lib/copy";
import { getJournalItems, getMusicItems } from "@/lib/site-data";
import { JournalList, PageIntro, SectionHeader, SiteFrame } from "@/components/site-components";

export default function JournalPage() {
  const journals = getJournalItems();
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.journal.title}
        titleZh={copy.journal.titleZh}
        subtitle={copy.journal.subtitle}
        subtitleZh={copy.journal.subtitleZh}
        intro={copy.journal.intro}
        introZh={copy.journal.introZh}
      />
      <section className="px-5 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="Journal"
          title={copy.journal.sectionTitle}
          titleZh={copy.journal.sectionTitleZh}
          subtitle="Looking back at the journey through images, and understanding the journey again through them."
          subtitleZh="從旅途中回望影像，也從影像裡重新理解旅途。"
        />
        <JournalList items={journals} />
      </section>
    </SiteFrame>
  );
}
