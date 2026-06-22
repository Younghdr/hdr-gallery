import { copy } from "@/lib/copy";
import { getPhotographyItems } from "@/lib/site-data";
import { PageIntro, PhotoMasonry, SectionHeader, SiteFrame } from "@/components/site-components";

export default function PhotographyPage() {
  const { details } = getPhotographyItems();

  return (
    <SiteFrame>
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
