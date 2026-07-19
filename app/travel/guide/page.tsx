import type { Metadata } from "next";
import "./guide-pages.css";

export const metadata: Metadata = {
  title: "納米比亞旅遊攻略｜簽證、行程、交通與實用準備",
  description: "給台灣旅客的納米比亞旅遊攻略：簽證、航班、13 天行程、交通、住宿、攝影與途中實用準備。",
  alternates: { canonical: "/travel/guide/" },
  openGraph: {
    title: "納米比亞旅遊攻略｜出發前完整指南",
    description: "簽證、航班、行程、交通與荒野旅行準備，一次整理。",
    url: "/travel/guide/",
    images: [{ url: "/travel/namibia-hero.png", alt: "納米比亞旅行攻略" }],
  },
};
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const guides = [
  { n: "01", en: "START HERE", zh: "快速認識納米比亞", text: "從時間、尺度、生命、人文與光線，先理解這片土地為什麼如此不同。", slug: "overview", ready: true },
  { n: "02", en: "VISA & ENTRY", zh: "簽證與入境", text: "準備文件、六步線上申請與官方入口。", slug: "visa", ready: true },
  { n: "03", en: "FLIGHTS", zh: "機票與轉機", text: "從台灣出發，如何在時間、票價、簽證與轉機風險之間做選擇。", slug: "flights", ready: true },
  { n: "04", en: "ITINERARY", zh: "行程天數與路線", text: "十三天的環線、順逆時針，以及真正需要放棄的地方。", slug: "itinerary", ready: true },
  { n: "05", en: "HOW TO TRAVEL", zh: "自駕、當地團或台灣跟團", text: "從自由行自駕、半自助當地團到台灣跟團，比較價格、自由度與規劃負擔。", slug: "transport", ready: true },
  { n: "06", en: "FIELD ESSENTIALS", zh: "氣候、網路與途中日常", text: "寒冷海岸、特殊插座、MTC、離線準備，以及生蠔、海鮮與野味。", slug: "practical", ready: true },
  { n: "07", en: "PHOTOGRAPHY", zh: "荒野攝影與 8K HDR", text: "600mm 野生動物、強風縮時、夜間 Safari、備份與沙塵防護。", slug: "photography", ready: true },
  { n: "08", en: "MONEY & SHOPPING", zh: "換錢、付款與購物", text: "現金、刷卡、議價，以及辣醬、寶石原礦與鴕鳥蛋工藝。", slug: "money-shopping", ready: true },
];

export default function GuideHomePage() {
  return <main className="guide-page">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/`}>← RETURN TO JOURNEY</a><span>NAMIBIA · FIELD GUIDE</span></header>
    <section className="guide-cover"><p>BEFORE YOU GO</p><h1>THE<br /><em>FIELD</em><br />GUIDE</h1><div><span>8 CHAPTERS</span><span>NAMIBIA · 2025</span></div></section>
    <section className="guide-opening"><p>準備旅行</p><div><h2>把不確定，<br />留在出發之前。</h2><p>從簽證與航班，到砂石路、星空、鏡頭和行李。這裡收錄的是我們真正走過之後，認為值得先知道的事情。</p></div></section>
    <section className="guide-grid">
      {guides.map((guide) => guide.ready ? <a className="guide-card is-ready" key={guide.n} href={`${BASE_PATH}/travel/guide/${guide.slug}/`}><span>{guide.n}</span><small>{guide.en}</small><h3>{guide.zh}</h3><p>{guide.text}</p><b>READ GUIDE ↗</b></a> : <article className="guide-card" key={guide.n}><span>{guide.n}</span><small>{guide.en}</small><h3>{guide.zh}</h3><p>{guide.text}</p><b>IN PREPARATION</b></article>)}
    </section>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/`}>回到納米比亞旅程 ↗</a><span>YOUNG HUNG HDR STUDIO</span></footer>
  </main>;
}
