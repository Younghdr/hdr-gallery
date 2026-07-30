import type { Metadata } from "next";
import "./bolivia.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Bolivia｜天空之鏡與高原之路",
  description: "從拉巴斯穿越阿爾蒂普拉諾高原，抵達烏尤尼鹽湖。一份以海拔、光線與留白寫成的玻利維亞旅行誌。",
  alternates: { canonical: "/travel/Bolivia/" },
  openGraph: {
    title: "Bolivia｜天空之鏡與高原之路",
    description: "在海拔 3,650 公尺，地平線開始失去邊界。",
    url: "/travel/Bolivia/",
    images: [{ url: "/travel/bolivia/salar-hero.png", alt: "黎明時分的烏尤尼鹽湖與越野車" }],
  },
};

const stages = [
  { day: "01", place: "LA PAZ", note: "在纜車與峽谷之間，讓身體先學會高原的呼吸。", altitude: "3,640 M" },
  { day: "03", place: "ALTIPLANO", note: "穿越赭紅山谷、火山與成群的安地斯紅鶴。", altitude: "4,500 M" },
  { day: "05", place: "SALAR DE UYUNI", note: "日落後等待星光，直到鹽與天空再也無法分辨。", altitude: "3,656 M" },
];

export default function BoliviaTravelPage() {
  return (
    <main className="bolivia-page">
      <header className="bolivia-nav">
        <a className="bolivia-brand" href={`${BASE_PATH}/`}><span>YH</span><b>EXPEDITIONS</b></a>
        <nav aria-label="玻利維亞旅程導覽">
          <a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS</a>
          <a href="#route">ROUTE</a>
          <a href="#field-note">FIELD NOTE</a>
        </nav>
        <p>16.2902° S / 63.5887° W</p>
      </header>

      <section className="bolivia-hero" style={{ backgroundImage: `url('${BASE_PATH}/travel/bolivia/salar-hero.png')` }}>
        <div className="bolivia-hero-wash" />
        <div className="bolivia-kicker"><span>EXPEDITION 05</span><span>07 DAYS</span><span>THE ALTIPLANO</span></div>
        <div className="bolivia-title">
          <p>玻利維亞・高原紀行</p>
          <h1>BOLI<span>VIA</span></h1>
          <div><b>天空落在<br />鹽的盡頭</b><small>SCROLL TO CROSS<br />THE HORIZON ↓</small></div>
        </div>
      </section>

      <section className="bolivia-intro" id="field-note">
        <p className="section-label">FIELD NOTE / 001</p>
        <div>
          <h2>在 3,656 公尺，<br /><em>地平線失去邊界。</em></h2>
          <div className="bolivia-intro-copy"><p>清晨五點，車燈切開仍未醒來的鹽湖。積水只有薄薄一層，卻足以把整片天空複製到腳下。我們朝沒有道路的方向前進，只憑遠方的火山確認位置。</p><p>這不是一趟追逐景點的旅程，而是一場關於尺度的練習：更慢的呼吸、更遠的視線，以及人在巨大風景裡，恰到好處的渺小。</p></div>
        </div>
      </section>

      <section className="bolivia-facts" aria-label="旅程資訊">
        <div><small>DISTANCE</small><strong>1,120</strong><span>KM / OVERLAND</span></div>
        <div><small>HIGHEST POINT</small><strong>4,910</strong><span>METRES</span></div>
        <div><small>CLIMATE</small><strong>−08°</strong><span>BEFORE SUNRISE</span></div>
      </section>

      <section className="bolivia-route" id="route">
        <header><p className="section-label">THE ROUTE / WEST TO SOUTH</p><h2>三個海拔，<br />三種光。</h2></header>
        <div className="route-list">
          {stages.map((stage) => (
            <article key={stage.day}>
              <span className="route-number">{stage.day}</span>
              <div><small>{stage.altitude}</small><h3>{stage.place}</h3><p>{stage.note}</p></div>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="bolivia-quote"><p>“The horizon is not a line here.<br />It is a place you can enter.”</p><span>— SALAR DE UYUNI, 05:47</span></section>

      <footer className="bolivia-footer"><div><p>NEXT LIGHT</p><h2>THE LAGOONS<br />OF SUD LÍPEZ</h2></div><a href={`${BASE_PATH}/travel/`}>BACK TO JOURNEYS ↗</a></footer>
    </main>
  );
}
