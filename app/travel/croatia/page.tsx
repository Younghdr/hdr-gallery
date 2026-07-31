import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./croatia.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "克羅埃西亞｜亞得里亞海航海日誌",
  description: "從杜布羅夫尼克的城牆、赫瓦爾的港灣到十六湖的水色，一段沿著克羅埃西亞海岸展開的攝影旅程。",
  alternates: { canonical: "/travel/croatia/" },
};

const ports = [
  ["01", "DUBROVNIK", "杜布羅夫尼克", "42.6507° N", "從城牆讀懂海的尺度"],
  ["02", "SPLIT", "斯普利特", "43.5081° N", "在羅馬石柱間喝一杯咖啡"],
  ["03", "HVAR", "赫瓦爾島", "43.1729° N", "讓風決定今天停靠的港灣"],
  ["04", "RASTOKE", "拉斯托克水車村", "45.1214° N", "在河流交會處聽見水車轉動"],
  ["05", "PLITVICE", "十六湖", "44.8654° N", "離開鹽味，走進水與森林"],
];

export default function CroatiaPage() {
  return <SiteFrame><main className="hr-page">
    <section className="hr-hero">
      <img src={`${BASE_PATH}/travel/croatia/dubrovnik-hero.png`} alt="夕陽下的杜布羅夫尼克古城與亞得里亞海" />
      <div className="hr-hero-wash" />
      <div className="hr-hero-top"><span>42°39′ N / 18°05′ E</span><b>COASTAL LOG · 12</b><span>JUN — SEP</span></div>
      <div className="hr-title"><p>CROATIA / HRVATSKA</p><h1>沿著海風，<br />駛入石城與群島</h1><div><span>ADRIATIC</span><i /><em>1,777 KM OF COAST</em></div></div>
      <a className="hr-down" href="#manifest">READ THE LOG <span>↓</span></a>
    </section>

    <section className="hr-manifest" id="manifest">
      <div className="hr-manifest-label"><span>SHIP&apos;S MANIFEST</span><b>12 / HR</b></div>
      <div className="hr-manifest-copy"><h2>這裡的旅程，<br />由海面來排版。</h2><p>克羅埃西亞不是一條從北到南的直線。公路貼著石灰岩海岸轉彎，渡輪把城鎮與島嶼重新排列。清晨屬於港口，午後留給松林和礁石；傍晚，杜布羅夫尼克的城牆把最後一束光折回海上。</p></div>
      <dl><div><dt>PACE</dt><dd>8 DAYS</dd></div><div><dt>ROUTE</dt><dd>612 KM</dd></div><div><dt>FERRIES</dt><dd>03</dd></div></dl>
    </section>

    <section className="hr-ports"><header><span>PORTS OF CALL</span><h2>五次停靠，五種水色</h2></header><ol>{ports.map(([no,en,zh,coordinate,note]) => <li key={no}><b>{no}</b><div><h3>{en}</h3><span>{zh}</span></div><p>{note}</p><em>{coordinate}</em></li>)}</ol></section>

    <section className="hr-harbor">
      <figure><img src={`${BASE_PATH}/travel/croatia/hvar-harbor.png`} alt="赫瓦爾島清晨安靜的石造港灣" /><figcaption><span>HVAR / 07:12</span><b>FRAME 018</b></figcaption></figure>
      <article><span>ISLAND NOTE · 03</span><h2>港口醒來之前，<br />先聽見繩索與水。</h2><p>赫瓦爾的早晨很輕。石牆還留著夜裡的涼意，小艇在透明的水面上輕碰碼頭。沿著窄巷往裡走，百葉窗逐一打開，麵包香比觀光客更早抵達廣場。</p><aside><b>LOCAL RHYTHM</b><span>06:30 市集</span><span>07:10 港邊咖啡</span><span>08:00 第一班渡輪</span></aside></article>
    </section>

    <section className="hr-tide-note"><span>TIDE NOTE / 02</span><blockquote>不要急著抵達島嶼。<br />渡輪上的四十分鐘，本身就是一段風景。</blockquote><b>JADRANSKO MORE</b></section>

    <section className="hr-watermill">
      <header><span>RIVER VILLAGE · 04</span><h2>水車村，<br />河流替時間慢了下來。</h2><p>拉斯托克位在斯盧尼契察河與科拉納河交會處。溪水穿過木屋與石造磨坊，在屋簷下分流成一道道小瀑布；水車曾經研磨穀物，如今仍讓整座村莊保留著沿水而生的節奏。</p></header>
      <figure><img src={`${BASE_PATH}/travel/croatia/rastoke-watermill.webp`} alt="秋日陽光下的拉斯托克水車村、瀑布與跨河橋梁" /><figcaption><span>RASTOKE / SLUNJ</span><b>2017 · FRAME 8132</b><em>45°07′17″ N</em></figcaption></figure>
      <aside><b>WATER NOTE</b><span>斯盧尼契察河在村中分成多股水道，最後匯入科拉納河。</span></aside>
    </section>

    <section className="hr-lakes">
      <div className="hr-lakes-copy"><span>INLAND CURRENT · 05</span><h2>海水退場以後，<br />森林接住了藍色。</h2><p>十六湖把克羅埃西亞的另一種水色藏在內陸。木棧道貼著湖面前進，瀑布不是終點，而是一層又一層的聲音。最好趕在第一班接駁車之前進入，讓薄霧與山毛櫸替你保留清晨。</p><div><b>BEST LIGHT</b><span>07:00 — 09:30</span><b>TRAIL</b><span>PROGRAM C / 8 KM</span></div></div>
      <figure><img src={`${BASE_PATH}/travel/croatia/plitvice-lakes.png`} alt="秋日薄霧裡的十六湖瀑布與木棧道" /><figcaption>PLITVICE LAKES · AUTUMN CURRENT</figcaption></figure>
    </section>

    <section className="hr-practical"><header><span>FIELD NOTES</span><h2>把時間留給海況</h2></header><div className="hr-note-grid"><article><b>01 / 渡輪</b><p>旺季車位比座位更早售罄；帶車跳島至少提前一小時抵達港口。</p></article><article><b>02 / 光線</b><p>石灰岩反光強，城市拍攝優先安排清晨與日落前兩小時。</p></article><article><b>03 / 節奏</b><p>島嶼之間少排一個目的地，反而會得到更完整的海岸記憶。</p></article></div><a href={`${BASE_PATH}/travel/`}>返回所有旅程 <span>↗</span></a></section>
  </main></SiteFrame>;
}
