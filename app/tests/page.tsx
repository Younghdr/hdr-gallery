import { copy } from "@/lib/copy";
import { getMusicItems, getTestItems } from "@/lib/site-data";
import { PageIntro, SectionHeader, SiteFrame, TestGrid } from "@/components/site-components";
import { PeakBrightnessTest } from "@/components/peak-brightness-test";
import { HdrDiagnostics } from "@/components/hdr-diagnostics";
import { HdrSummary } from "@/components/hdr-summary";
import Script from "next/script";

export default function TestsPage() {
  const tests = getTestItems();
  const music = getMusicItems();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.tests.title}
        titleZh={copy.tests.titleZh}
        subtitle={copy.tests.subtitle}
        subtitleZh={copy.tests.subtitleZh}
        intro={copy.tests.intro}
        introZh={copy.tests.introZh}
      />
      <HdrDiagnostics />
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
