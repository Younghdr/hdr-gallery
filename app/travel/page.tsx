import type { Metadata } from "next";
import "./destinations.css";
import "./destination-mobile.css";
import "./unified-cards.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Travel Expeditions｜攝影旅程",
  description: "Young HDR Gallery 的旅行攝影專題，從納米比亞沙漠、加拿大北境到玻利維亞高原，以 HDR 影像與文字記錄每段旅程。",
  alternates: { canonical: "/travel/" },
};

export default function TravelPage() {
  return (
    <main className="destinations-page">
      <header className="destinations-nav">
        <a href={`${BASE_PATH}/`} className="destinations-mark"><span>YH</span><b>EXPEDITIONS</b></a>
        <nav className="destinations-country-nav" aria-label="國家旅程快速連結">
          <span>COUNTRIES</span>
          <a href={`${BASE_PATH}/travel/namibia/`}>NA</a>
          <a href={`${BASE_PATH}/travel/canada/`}>CA</a>
          <a href={`${BASE_PATH}/travel/italy/`}>IT</a>
          <a href={`${BASE_PATH}/travel/iceland/`}>IS</a>
          <a href={`${BASE_PATH}/travel/Bolivia/`}>BO</a>
          <a href={`${BASE_PATH}/travel/turkiye/`}>TR</a>
          <a href={`${BASE_PATH}/travel/peru/`}>PE</a>
          <a href={`${BASE_PATH}/travel/montenegro/`}>ME</a>
        </nav>
        <a href={`${BASE_PATH}/photography/`}>PHOTOGRAPHY ↗</a>
      </header>

      <section className="destinations-intro">
        <p>TRAVEL ARCHIVE · 08 JOURNEYS</p>
        <h1>每一個國家，<br /><em>都有自己的光。</em></h1>
        <span>從乾燥的南方沙漠，到北緯 62 度的夜空。選擇一段旅程，繼續往下走。</span>
      </section>

      <section className="destination-grid" aria-label="國家旅程">
        <a className="destination-card namibia" href={`${BASE_PATH}/travel/namibia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/namibia-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 01</small><h2>NAMIBIA</h2><p>INTO THE WILD</p><b>循著沙丘座標出發</b></div>
          <i>AFRICA / NAMIB</i>
        </a>
        <a className="destination-card canada" href={`${BASE_PATH}/travel/canada/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/canada/hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 02</small><h2>CANADA</h2><p>CHASING THE NORTHERN LIGHTS</p><b>等待下一道極光</b></div>
          <i>NORTH AMERICA / AURORA</i>
        </a>
        <a className="destination-card italy" href={`${BASE_PATH}/travel/italy/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/italy/dolomites-panorama-wide-web.jpg')`, backgroundPosition: "center 42%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 03</small><h2>ITALIA</h2><p>LIGHT ACROSS THE ALPS</p><b>展開山城明信片</b></div>
          <i>EUROPE / DOLOMITES</i>
        </a>
        <a className="destination-card iceland" href={`${BASE_PATH}/travel/iceland/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/iceland/iceland-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 04</small><h2>ICELAND</h2><p>THE LIVING EARTH</p><b>踏上火與冰的裂縫</b></div>
          <i>NORDIC / SOUTH COAST</i>
        </a>
        <a className="destination-card bolivia" href={`${BASE_PATH}/travel/Bolivia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/bolivia/salar-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 05</small><h2>BOLIVIA</h2><p>THE ALTIPLANO</p><b>升上海拔 3,656 米</b></div>
          <i>SOUTH AMERICA / UYUNI</i>
        </a>
        <a className="destination-card turkiye" href={`${BASE_PATH}/travel/turkiye/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/turkiye/cappadocia-sunrise.png')`, backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 06</small><h2>TÜRKIYE</h2><p>BETWEEN TWO CONTINENTS</p><b>穿過兩洲之門</b></div>
          <i>EURASIA / CAPPADOCIA</i>
        </a>
        <a className="destination-card peru" href={`${BASE_PATH}/travel/peru/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/peru/machu-picchu.jpg')`, backgroundPosition: "center 58%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 07</small><h2>PERU</h2><p>ABOVE THE CLOUDS</p><b>沿著安地斯山脈向上</b></div>
          <i>SOUTH AMERICA / ANDES</i>
        </a>
        <a className="destination-card montenegro" href={`${BASE_PATH}/travel/montenegro/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/montenegro/road-journal.png')`, backgroundPosition: "left center", backgroundSize: "300% 100%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 08</small><h2>MONTENEGRO</h2><p>BETWEEN SEA AND STONE</p><b>打開黑山公路圖誌</b></div>
          <i>EUROPE / ADRIATIC</i>
        </a>
      </section>

      <footer className="destinations-footer"><p>YOUNG HUNG HDR STUDIO</p><span>TRAVEL · LIGHT · MEMORY</span></footer>
    </main>
  );
}
