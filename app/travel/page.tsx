import type { Metadata } from "next";
import "./destinations.css";
import "./destination-mobile.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Travel Expeditions｜攝影旅程",
  description: "Young HDR Gallery 的旅行攝影專題，從納米比亞沙漠到加拿大北境，以 HDR 影像與文字記錄每段旅程。",
  alternates: { canonical: "/travel/" },
};

export default function TravelPage() {
  return (
    <main className="destinations-page">
      <header className="destinations-nav">
        <a href={`${BASE_PATH}/`} className="destinations-mark"><span>YH</span><b>EXPEDITIONS</b></a>
        <p>TRAVEL / COUNTRY INDEX</p>
        <a href={`${BASE_PATH}/photography/`}>PHOTOGRAPHY ↗</a>
      </header>

      <section className="destinations-intro">
        <p>TRAVEL ARCHIVE · 02 JOURNEYS</p>
        <h1>每一個國家，<br /><em>都有自己的光。</em></h1>
        <span>從乾燥的南方沙漠，到北緯 62 度的夜空。選擇一段旅程，繼續往下走。</span>
      </section>

      <section className="destination-grid" aria-label="國家旅程">
        <a className="destination-card namibia" href={`${BASE_PATH}/travel/namibia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/namibia-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 01 · 2025</small><h2>NAMIBIA</h2><p>INTO THE WILD · 16 DAYS</p><b>進入納米比亞旅程 →</b></div>
        </a>
        <a className="destination-card canada" href={`${BASE_PATH}/travel/canada/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/canada/hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 02 · 2024</small><h2>CANADA</h2><p>向北，直到天空發光 · 13 DAYS</p><b>進入加拿大旅程 →</b></div>
          <i>NEW · STORY IN PROGRESS</i>
        </a>
      </section>

      <footer className="destinations-footer"><p>YOUNG HUNG HDR STUDIO</p><span>TRAVEL · LIGHT · MEMORY</span></footer>
    </main>
  );
}
