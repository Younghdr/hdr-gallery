import type { Metadata } from "next";
import "./sweden.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const hero = "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=2800&q=90";
const islands = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=88";

export const metadata: Metadata = {
  title: "瑞典｜在水與島嶼之間慢行",
  description: "從斯德哥爾摩老城搭船進入群島，一篇關於北歐水岸、城市散步與夏日長光的瑞典旅誌。",
  alternates: { canonical: "/travel/sweden/" },
};

const stops = [
  ["01", "GAMLA STAN", "老城清晨", "在旅行團抵達以前，沿著窄巷讀門牌、石牆與斜進街角的光。"],
  ["02", "DJURGÅRDEN", "博物館島午後", "搭電車穿過綠蔭，把瓦薩博物館與水岸散步排進同一個午後。"],
  ["03", "VAXHOLM", "群島第一站", "從 Strandvägen 上船，城市輪廓退後，紅色木屋與礁岩開始接管視野。"],
];

export default function SwedenPage() {
  return <main className="se-page">
    <header className="se-nav"><a href={`${BASE_PATH}/travel/`} className="se-brand"><b>YH</b><span>群島航線誌</span></a><nav aria-label="瑞典旅程導覽"><a href="#route">航線</a><a href="#city">城市</a><a href="#notes">旅途筆記</a></nav><p>59.3293° N / 18.0686° E</p></header>
    <section className="se-hero" style={{backgroundImage:`url('${hero}')`}}><div className="se-hero-shade"/><div className="se-issue"><span>FIELD JOURNAL</span><b>22</b></div><div className="se-title"><p>SWEDEN / STOCKHOLM ARCHIPELAGO</p><h1>沿著水面，<br/>讀一座城市。</h1><div><span>瑞典 · 夏日長光</span><i>07 DAYS / 03 STOPS</i></div></div><a href="#route" className="se-scroll">SCROLL TO DEPARTURE ↓</a></section>
    <section className="se-departure" id="route"><div className="se-stamp"><span>SL</span><b>VALID<br/>07 DAYS</b></div><div className="se-intro"><small>DEPARTURE NOTE / 06:42</small><h2>斯德哥爾摩不是一座<br/>被水切開的城市，<br/><em>水就是它的街道。</em></h2><p>清晨先走進老城，再從碼頭登船。島嶼不是行程以外的遠方，而是城市自然延伸出去的生活邊界。這趟旅程不追求最快抵達；我們沿著水路，看光線如何在磚牆、船身與波紋之間移動。</p></div></section>
    <section className="se-route" aria-label="瑞典三站路線">{stops.map(([no,en,zh,copy])=><article key={no}><span>{no}</span><div><small>{en}</small><h3>{zh}</h3><p>{copy}</p></div><b>→</b></article>)}</section>
    <section className="se-photo-story" id="city"><figure style={{backgroundImage:`url('${hero}')`}}><figcaption>FRAME 014 / STRANDVÄGEN / 20:18</figcaption></figure><div><small>THE CITY ON WATER</small><h2>把黃昏留給<br/>港口的另一側。</h2><p>六月的日落來得很晚。與其追逐景點，不如選一座橋、一段岸線，等渡輪一班班穿過畫面。暖色建築會慢慢接住低角度陽光，藍色水面則把城市拉得更寬。</p><dl><div><dt>最佳步行段</dt><dd>市政廳 → 老城 → Strandvägen</dd></div><div><dt>乘船方向</dt><dd>Slussen → Vaxholm</dd></div><div><dt>黃昏光線</dt><dd>20:00–22:00</dd></div></dl></div></section>
    <section className="se-field" id="notes"><header><small>FIELD NOTES / BEFORE BOARDING</small><h2>上船之前，<br/>留意三件事。</h2></header><div className="se-notes"><article><b>01 / 船班</b><p>群島船班依季節調整。先決定回程，再安排登島停留時間。</p></article><article><b>02 / 天氣</b><p>夏季日照長，但甲板風冷；薄羽絨與防風外套比厚重單件實用。</p></article><article><b>03 / 節奏</b><p>把一天只交給一座島。走離碼頭二十分鐘，才會看見島上的日常。</p></article></div><figure style={{backgroundImage:`url('${islands}')`}}><span>ARCHIPELAGO / BETWEEN PINE &amp; WATER</span></figure></section>
    <footer className="se-footer"><p>SWEDEN / THE CITY FLOWS OUT TO SEA</p><a href={`${BASE_PATH}/travel/`}>回到所有旅程 ↗</a></footer>
  </main>;
}
