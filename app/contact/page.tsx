import { copy } from "@/lib/copy";
import { getMusicItems } from "@/lib/site-data";
import { PageIntro, SiteFrame, TextPanel } from "@/components/site-components";

export default function ContactPage() {
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.contact.title}
        titleZh={copy.contact.titleZh}
        subtitle={copy.contact.subtitle}
        subtitleZh={copy.contact.subtitleZh}
      />
      <TextPanel>
        <p className="text-xl leading-9 text-pearl">{copy.contact.bodyZh}</p>
        <p className="mt-4 text-base leading-8 text-mist">{copy.contact.bodyEn}</p>
        <a
          className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:scale-[1.03]"
          href="mailto:hello@younghunghdr.studio"
        >
          Start a Conversation / 開始聯繫
        </a>
      </TextPanel>
    </SiteFrame>
  );
}
