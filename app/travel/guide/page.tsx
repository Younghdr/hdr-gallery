import type { Metadata } from "next";
import "./guide-pages.css";

export const metadata: Metadata = { title: "Namibia Travel Guide", description: "納米比亞簽證、航班、行程、交通、住宿與攝影旅行攻略。" };
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const guides = [
  { n: "01", en: "START HERE", zh: "快速認識納米比亞", text: "從時間、尺度、生命、人文與光線，先理解這片土地為什麼如此不同。", slug: "overview", ready: true },
  { n: "02", en: "VISA & ENTRY", zh: "簽證與入境", text: "準備文件、六步線上申請與官方入口。", slug: "visa", ready: true },
  { n: "03", en: "FLIGHTS", zh: "機票與轉機", text: "從台灣出發的航線、轉機與行李安排。", slug: "flights" },
  { n: "04", en: "ITINERARY", zh: "行程天數與路線", text: "經典初訪、完整環線與深度攝影三種規劃。", slug: "itinerary" },
  { n: "05", en: "ON THE ROAD", zh: "自駕、導遊或旅行團", text: "砂石路、四輪驅動與旅行方式的選擇。", slug: "transport" },
  { n: "06", en: "STAYS", zh: "住宿選擇", text: "國家公園內外、餐食、活動與拍攝條件。", slug: "stays" },
  { n: "07", en: "WHEN TO GO", zh: "季節與天氣", text: "乾季、雨季、日夜溫差與星空拍攝時機。", slug: "when-to-go" },
  { n: "08", en: "PACKING", zh: "行李與衣物", text: "防風保暖、防曬與長途公路旅行用品。", slug: "packing" },
  { n: "09", en: "PHOTOGRAPHY", zh: "攝影器材與 HDR", text: "焦段、星空、備份、沙塵防護與 8K HDR。", slug: "photography" },
  { n: "10", en: "BUDGET", zh: "預算、貨幣與小費", text: "機票、住宿、活動、現金與刷卡安排。", slug: "budget" },
  { n: "11", en: "CONNECTED", zh: "網路、電力與通訊", text: "SIM、Wi-Fi、插座、車充與離線地圖。", slug: "connectivity" },
  { n: "12", en: "STAY SAFE", zh: "保險、健康與安全", text: "旅遊保險、飲水、道路與荒野安全。", slug: "safety" },
  { n: "13", en: "CHECKLIST", zh: "出發前檢查清單", text: "從三個月前到出發前一天的準備節奏。", slug: "checklist" },
];

export default function GuideHomePage() {
  return <main className="guide-page">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/`}>← RETURN TO JOURNEY</a><span>NAMIBIA · FIELD GUIDE</span></header>
    <section className="guide-cover"><p>BEFORE YOU GO</p><h1>THE<br /><em>FIELD</em><br />GUIDE</h1><div><span>13 CHAPTERS</span><span>NAMIBIA · 2025</span></div></section>
    <section className="guide-opening"><p>準備旅行</p><div><h2>把不確定，<br />留在出發之前。</h2><p>從簽證與航班，到砂石路、星空、鏡頭和行李。這裡收錄的是我們真正走過之後，認為值得先知道的事情。</p></div></section>
    <section className="guide-grid">
      {guides.map((guide) => guide.ready ? <a className="guide-card is-ready" key={guide.n} href={`${BASE_PATH}/travel/guide/${guide.slug}/`}><span>{guide.n}</span><small>{guide.en}</small><h3>{guide.zh}</h3><p>{guide.text}</p><b>READ GUIDE ↗</b></a> : <article className="guide-card" key={guide.n}><span>{guide.n}</span><small>{guide.en}</small><h3>{guide.zh}</h3><p>{guide.text}</p><b>IN PREPARATION</b></article>)}
    </section>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/`}>回到納米比亞旅程 ↗</a><span>YOUNG HUNG HDR STUDIO</span></footer>
  </main>;
}
