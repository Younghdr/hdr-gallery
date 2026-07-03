import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { getMusicItems } from "@/lib/site-data";
import { PageIntro, SiteFrame, TextPanel } from "@/components/site-components";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "關於 Young Hung",
  description:
    "認識 HDR 攝影師 Young Hung：專注於 HDR Photography、HDR Imaging Workflow、旅行與風景攝影，以安靜的方式記錄光的層次。",
  keywords: [
    "Young Hung",
    "HDR 攝影師",
    "HDR Photography",
    "HDR Imaging Workflow",
    "旅行攝影",
    "風景攝影",
    "Young HDR Gallery",
  ],
  alternates: {
    canonical: `${BASE_PATH}/about/`,
  },
};

export default function AboutPage() {
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <PageIntro
        title={copy.about.title}
        titleZh={copy.about.titleZh}
        subtitle={copy.about.subtitle}
        subtitleZh={copy.about.subtitleZh}
      />
      <TextPanel>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-base leading-8 text-mist">{copy.about.bodyZh}</p>
            <p className="mt-4 text-base leading-8 text-mist">{copy.about.bodyEn}</p>
          </div>
          <div className="rounded-[8px] border border-white/10 bg-white/8 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Expertise / 專長</p>
            <ul className="mt-5 space-y-3 text-pearl">
              <li>HDR Photography / HDR 攝影</li>
              <li>HDR Imaging Workflow / HDR 影像流程</li>
              <li>Travel Photography / 旅行攝影</li>
              <li>Landscape Photography / 風景攝影</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{copy.about.philosophyTitle}</p>
          <h2 className="mt-3 text-3xl font-semibold text-pearl">{copy.about.philosophyTitleZh}</h2>
          <p className="mt-5 text-base leading-8 text-mist">{copy.about.philosophyZh}</p>
          <p className="mt-3 text-base leading-8 text-mist">{copy.about.philosophyEn}</p>
        </div>
      </TextPanel>
    </SiteFrame>
  );
}
