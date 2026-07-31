import type { Metadata } from "next";
import "./denmark.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "丹麥｜把日常過成設計",
  description: "從新港的清晨、運河邊的單車，到北歐餐桌與哥本哈根街區，一本以日常尺度閱讀丹麥的城市旅行誌。",
  alternates: { canonical: "/travel/denmark/" },
};

const route = [
  ["08:10", "NYHAVN", "趁彩色屋舍還沒被人潮填滿，沿著運河慢慢走一圈。"],
  ["10:40", "INDRE BY", "穿過舊城窄巷，在麵包店點一顆豆蔻捲與黑咖啡。"],
  ["14:20", "NØRREBRO", "騎單車過橋，把午後留給設計店、二手家具與街角公園。"],
  ["18:30", "VESTERBRO", "在肉品市場旁吃晚餐，等北國夏夜把光線拉得很長。"],
];

export default function DenmarkPage() {
  return (
    <main className="dk-page">
      <header className="dk-nav">
        <a href={`${BASE_PATH}/travel/`} className="dk-mark"><b>YH</b><span>FIELD JOURNAL</span></a>
        <p>15 / DENMARK</p>
        <nav aria-label="丹麥章節導覽"><a href="#route">路線</a><a href="#notes">筆記</a></nav>
      </header>

      <section className="dk-hero">
        <img src="https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=2400&q=90" alt="哥本哈根新港兩側的彩色屋舍與水面" />
        <div className="dk-title">
          <p>COPENHAGEN · 55.6761° N</p>
          <h1>丹麥，<br />把日常過成設計</h1>
        </div>
        <aside><span>ISSUE 15</span><b>DK</b><small>城市 / 單車 / 餐桌</small></aside>
      </section>

      <section className="dk-intro">
        <p className="dk-index">01 / FIRST IMPRESSION</p>
        <div><h2>這裡的好看，<br />從來不需要大聲說話。</h2><p>哥本哈根最迷人的不是某一棟建築，而是城市如何把秩序、舒服與美感安放進每一天。單車道有自己的節奏，窗邊永遠留一盞燈，連一份開放式三明治都像仔細排過版。</p></div>
      </section>

      <section className="dk-mosaic" aria-label="哥本哈根城市印象">
        <figure className="dk-wide"><img src="https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=2000&q=88" alt="哥本哈根運河與城市建築" /><figcaption>HARBOUR LIGHT / 07:46</figcaption></figure>
        <div className="dk-quote"><span>HYGGE, RECONSIDERED</span><blockquote>舒適不是裝飾，<br />是生活被好好安排之後，<br />自然留下的餘裕。</blockquote></div>
        <figure className="dk-tall"><img src="https://images.unsplash.com/photo-1552560880-2482cef14240?auto=format&fit=crop&w=1400&q=88" alt="哥本哈根街道上的單車與紅磚建築" /><figcaption>THE BICYCLE CITY</figcaption></figure>
      </section>

      <section className="dk-route" id="route">
        <header><p>ONE DAY ON TWO WHEELS</p><h2>沿著港灣，<br />騎過一座城市。</h2></header>
        <ol>{route.map(([time, place, note], index) => <li key={place}><span>{String(index + 1).padStart(2, "0")}</span><time>{time}</time><h3>{place}</h3><p>{note}</p></li>)}</ol>
      </section>

      <section className="dk-notes" id="notes">
        <div><p>FIELD NOTE / CPH</p><h2>把行程排鬆一點，<br />才看得見丹麥。</h2></div>
        <dl><div><dt>BASE</dt><dd>KØBENHAVN</dd></div><div><dt>PACE</dt><dd>BY BIKE</dd></div><div><dt>BEST LIGHT</dt><dd>07:00—09:00</dd></div><div><dt>ORDER</dt><dd>KARDEMOMMESNURRE</dd></div></dl>
      </section>

      <footer className="dk-footer"><p>DENMARK / DESIGNED FOR LIVING</p><a href={`${BASE_PATH}/travel/`}>回到旅行索引 <span>↗</span></a></footer>
    </main>
  );
}
