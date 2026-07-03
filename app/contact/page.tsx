import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getMusicItems } from "@/lib/site-data";
import { PageIntro, SiteFrame, TextPanel } from "@/components/site-components";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "聯繫 Young Hung",
  description:
    "有合作、授權、影像製作或 HDR 工作流程相關問題？歡迎透過 Email 與 Young Hung 聯繫，討論你的影像計畫。",
  keywords: [
    "聯繫 Young Hung",
    "HDR 合作",
    "HDR 授權",
    "影像製作",
    "HDR 工作流程",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: `${BASE_PATH}/contact/`,
  },
};

export default function ContactPage() {
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <BreadcrumbJsonLd
        items={[
          { name: "首頁", url: "/" },
          { name: "聯繫", url: "/contact/" },
        ]}
      />
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
