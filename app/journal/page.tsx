import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getJournalItems, getMusicItems } from "@/lib/site-data";
import { JournalList, PageIntro, SectionHeader, SiteFrame } from "@/components/site-components";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { absUrl } from "@/lib/url";

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

function journalCanonical(url?: string): string {
  if (!url) return absUrl("/journal/");
  try {
    const parsed = new URL(url, "http://localhost");
    const id = parsed.searchParams.get("id");
    return id ? absUrl(`/journal/${id}/`) : absUrl("/journal/");
  } catch {
    return absUrl("/journal/");
  }
}

export default function JournalPage() {
  const journals = getJournalItems();
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <BreadcrumbJsonLd
        items={[
          { name: "首頁", url: "/" },
          { name: "影像札記", url: "/journal/" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: journals.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "BlogPosting",
              headline: item.title,
              description: item.description || copy.journal.subtitleZh,
              url: journalCanonical(item.url),
              image: item.cover ? absUrl(item.cover) : undefined,
              datePublished: item.date,
              author: {
                "@type": "Person",
                name: "Young Hung",
                url: absUrl("/about/"),
              },
            },
          })),
        }}
      />
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
