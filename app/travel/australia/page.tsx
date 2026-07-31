import type { Metadata } from "next";
import "./australia.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "雪梨與黃金海岸｜Australia Night Journal",
  description: "從雪梨港灣走到黃金海岸，再深入 Springbrook 自然橋的瀑布與螢火蟲洞。",
  alternates: { canonical: "/travel/australia/" },
};

const stops = [
  ["01", "SYDNEY", "從港灣開始", "33.8688° S"],
  ["02", "GOLD COAST", "城市與浪之間", "28.0167° S"],
  ["03", "SPRINGBROOK", "雨林裡的夜路", "45 KM"],
  ["04", "NATURAL BRIDGE", "瀑布落進星光", "GLOW WORMS"],
];

export default function AustraliaPage() {
  return (
    <main className="au-page">
      <header className="au-nav">
        <a href={`${BASE_PATH}/`} className="au-mark"><span>YH</span><b>EXPEDITIONS</b></a>
        <p>11 / AUSTRALIA</p>
        <nav aria-label="澳洲旅誌導覽"><a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS</a><a href="#route">ROUTE</a><a href="#notes">NIGHT NOTES</a></nav>
      </header>

      <section className="au-hero">
        <img src={`${BASE_PATH}/travel/australia/natural-bridge-glowworms.png`} alt="Springbrook 自然橋洞穴中的瀑布與螢火蟲微光" />
        <div className="au-hero-filter" />
        <div className="au-hero-title">
          <span>SPRINGBROOK · AFTER DARK</span>
          <h1>瀑布落進<br />螢火星河</h1>
          <div className="au-stamp"><b>AU</b><small>SYDNEY<br />GOLD COAST</small></div>
        </div>
        <p className="au-hero-caption">離開黃金海岸的霓虹，沿著雨林山路往上。自然橋的岩洞裡，水聲蓋過腳步，微小藍光在頭頂慢慢亮起。</p>
      </section>

      <section className="au-dispatch">
        <div className="au-dispatch-index"><span>DISPATCH 10</span><b>AUSTRALIA</b><small>SYDNEY → GOLD COAST</small></div>
        <article>
          <p className="au-kicker">TWO CITIES, ONE RAINFOREST NIGHT</p>
          <h2>先看見城市的光，<br />再走進森林的暗。</h2>
          <div className="au-columns"><p>雪梨是旅程的第一個畫面：港灣、渡輪、砂岩街區與海風。光線在建築和水面之間不停移動，城市總像剛剛醒來。</p><p>到了黃金海岸，節奏變得明亮而鬆散。真正難忘的一夜卻在內陸——Springbrook 的濕冷雨林，把城市聲音留在山腳。</p></div>
        </article>
      </section>

      <section className="au-route" id="route">
        <header><span>ROUTE LOG / EAST COAST</span><h2>從港灣與海浪，<br />走進會發光的洞穴。</h2></header>
        <ol>{stops.map(([n, en, zh, meta]) => <li key={n}><span>{n}</span><div><h3>{en}</h3><p>{zh}</p></div><b>{meta}</b></li>)}</ol>
      </section>

      <section className="au-contact" id="notes">
        <div className="au-frame au-frame-wide"><img src={`${BASE_PATH}/travel/australia/natural-bridge-glowworms.png`} alt="自然橋洞穴頂部的螢火蟲群" /><span>FRAME 01 / NATURAL BRIDGE</span></div>
        <div className="au-field-note"><span>NIGHT NOTE / SPRINGBROOK</span><h2>讓眼睛先適應黑，<br />星光才會出現。</h2><p>螢火蟲對光線敏感。進洞後收起閃光燈、降低手機亮度，也不要直接照向洞頂。雨後步道濕滑，安靜慢走反而能看得更久。</p><dl><div><dt>LOCATION</dt><dd>SPRINGBROOK NP</dd></div><div><dt>BEST TIME</dt><dd>AFTER DUSK</dd></div><div><dt>CAMERA</dt><dd>NO FLASH</dd></div></dl></div>
        <div className="au-frame au-frame-detail"><img src={`${BASE_PATH}/travel/australia/natural-bridge-glowworms.png`} alt="自然橋岩洞、瀑布和雨林出口" /><span>FRAME 02 / WATERFALL CAVE</span></div>
      </section>

      <footer className="au-footer"><p>END OF NIGHT JOURNAL · QUEENSLAND</p><h2>城市熄燈以後，<br />森林才開始發光。</h2><a href={`${BASE_PATH}/travel/`}>回到所有旅程 <span>↗</span></a></footer>
    </main>
  );
}
