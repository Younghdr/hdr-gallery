import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./bali.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "峇里島｜在火山與潮汐之間",
  description: "從烏布稻田的晨霧、火山日出，到南岸寺廟與海潮，一篇以島嶼節奏編排的峇里島旅行誌。",
  alternates: { canonical: "/travel/bali/" },
};

const rhythm = [
  ["05:10", "BATUR", "火山", "在黑暗裡上山，等第一道橙光越過阿貢山。"],
  ["08:40", "TEGALLALANG", "稻田", "沿著水圳走進梯田，聽見水、蟲鳴與農人的早晨。"],
  ["14:20", "UBUD", "林間", "把午後留給石牆小徑、寺廟香氣與一場短暫熱雨。"],
  ["18:06", "ULUWATU", "潮汐", "在斷崖看太陽沉入印度洋，讓一天跟著浪聲收尾。"],
];

export default function BaliPage() {
  return <SiteFrame><main className="bl-page">
    <header className="bl-nav"><a href={`${BASE_PATH}/travel/`}><b>YH</b><span>ISLAND JOURNAL</span></a><p>16 / BALI · INDONESIA</p><a href="#rhythm">島嶼路線 ↓</a></header>
    <section className="bl-hero">
      <img src="https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=2600&q=90" alt="峇里島烏布層疊的翠綠稻田" />
      <div className="bl-veil" /><div className="bl-title"><p>PULAU DEWATA · 08.3405° S</p><h1>在火山與潮汐之間</h1><span>峇里島，不只是一座度假島嶼。</span></div><aside><span>旱季 / MAY—SEP</span><b>BALI</b><small>VOL. 16</small></aside>
    </section>
    <section className="bl-opening"><p className="bl-label">島嶼序章 / PROLOGUE</p><h2>一天從祭祀的花開始，<br />在海浪裡結束。</h2><div><p>峇里島的風景從來不是孤立的景點。稻田的水來自山，寺廟的門朝向火山，巷口的花籃替日常留下一個神聖的位置。真正適合這座島的旅行，不是快速收集地標，而是跟著光線、氣味與潮汐慢下來。</p><dl><div><dt>BASE</dt><dd>UBUD / ULUWATU</dd></div><div><dt>PACE</dt><dd>7 DAYS · SLOW</dd></div><div><dt>FIRST LIGHT</dt><dd>05:58</dd></div></dl></div></section>
    <section className="bl-photo-break"><figure><img src="https://images.unsplash.com/photo-1531662439848-a7ed93c51468?auto=format&fit=crop&w=2200&q=88" alt="陽光下的德哥拉朗梯田" /><figcaption>SUBAK / 水沿著山勢，也沿著共同生活的規則流動。</figcaption></figure><blockquote><span>TRI HITA KARANA</span>人、自然與精神世界，<br />在同一座島上維持平衡。</blockquote></section>
    <section className="bl-rhythm" id="rhythm"><header><p>ONE ISLAND / FOUR TEMPOS</p><h2>用一日光線，<br />讀懂峇里島。</h2></header><ol>{rhythm.map(([time, place, zh, note], index) => <li key={place}><b>{String(index + 1).padStart(2, "0")}</b><time>{time}</time><div><small>{zh}</small><h3>{place}</h3></div><p>{note}</p></li>)}</ol></section>
    <section className="bl-coast"><img src="https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=2400&q=88" alt="峇里島海岸與熱帶山崖" /><article><span>SOUTH COAST / 18:06</span><h2>把最後一段路，<br />留給印度洋。</h2><p>南岸的節奏和烏布不同。空氣裡少了稻田的濕氣，多了鹽、風與浪。傍晚以前抵達斷崖，不急著找最好的位置；先讓眼睛適應逆光，看寺廟剪影、海鳥與潮線慢慢變成同一種金色。</p></article></section>
    <section className="bl-notes"><div><p>FIELD NOTES / 實用筆記</p><h2>留一點空白，<br />給午後的雨。</h2></div><div className="bl-note-grid"><article><b>移動</b><p>島上距離不長，車程卻常被交通拉長。每天安排同一區域，避免南北來回。</p></article><article><b>禮儀</b><p>進入寺廟穿著紗籠並遮住肩膀；不要踩過地上的祭祀花籃，拍攝儀式前先詢問。</p></article><article><b>光線</b><p>清晨適合稻田與火山；海岸則把時間留給日落前一小時，以及日落後的藍調。</p></article></div></section>
    <footer className="bl-footer"><p>BALI / BETWEEN VOLCANO &amp; TIDE</p><a href={`${BASE_PATH}/travel/`}>回到所有旅程 ↗</a></footer>
  </main></SiteFrame>;
}
