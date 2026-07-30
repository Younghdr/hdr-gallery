import type { Metadata } from "next";
import "./peru.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "秘魯｜沿著安地斯山脈向上",
  description: "從庫斯科、聖谷到馬丘比丘與彩虹山，一篇以海拔與光線為座標的秘魯旅行札記。",
  alternates: { canonical: "/travel/peru/" },
  openGraph: {
    title: "PERU — 沿著安地斯山脈向上",
    description: "一條從古城走向雲端的安地斯高原路線。",
    url: "/travel/peru/",
    images: [{ url: "/travel/peru/machu-picchu.jpg", alt: "雲霧中的馬丘比丘與安地斯山脈" }],
  },
};

const chapters = [
  { number: "01", place: "CUSCO", zh: "在古城練習呼吸", altitude: "3,399 M", note: "紅瓦屋頂、石牆與午後驟雨，先把步伐放慢。" },
  { number: "02", place: "SACRED VALLEY", zh: "沿烏魯班巴河前行", altitude: "2,800 M", note: "梯田收住山勢，村落與市集把路途切成細小片段。" },
  { number: "03", place: "MACHU PICCHU", zh: "穿過雲霧抵達山城", altitude: "2,430 M", note: "清晨第一班車，把石造城市交還給低雲與光。" },
  { number: "04", place: "VINICUNCA", zh: "在五千公尺看見地層", altitude: "5,036 M", note: "風很薄，礦物的色帶卻比任何地圖都清楚。" },
];

export default function PeruTravelPage() {
  return (
    <main className="peru-page">
      <header className="peru-nav">
        <a className="peru-mark" href={`${BASE_PATH}/`} aria-label="Young HDR Gallery 首頁"><span>YH</span><b>EXPEDITIONS</b></a>
        <p>07 / SOUTH AMERICA</p>
        <nav aria-label="秘魯旅程導覽"><a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS</a><a href="#route">ROUTE</a><a href="#notes">FIELD NOTES</a></nav>
      </header>
      <section className="peru-hero">
        <img src={`${BASE_PATH}/travel/peru/machu-picchu.jpg`} alt="清晨雲霧環繞的馬丘比丘" />
        <div className="peru-hero-wash" />
        <div className="peru-title">
          <p>13°09′48″S · 72°32′44″W</p><h1>PERU</h1>
          <div><h2>沿著安地斯山脈向上</h2><span>一條從古城、聖谷走到五千公尺色彩地層的路。<br />十天，四段海拔，一次重新學會呼吸的旅程。</span></div>
        </div>
        <aside className="peru-hero-note"><b>THE ANDES</b><span>10 DAYS</span><span>2,430—5,036 M</span></aside>
      </section>
      <section className="altitude-strip" aria-label="旅程海拔資訊">
        <p>ALTITUDE / ROUTE PROFILE</p><div className="altitude-line"><i /><i /><i /><i /></div>
        <ol><li><b>LIMA</b><span>0 M</span></li><li><b>CUSCO</b><span>3,399 M</span></li><li><b>MACHU PICCHU</b><span>2,430 M</span></li><li><b>VINICUNCA</b><span>5,036 M</span></li></ol>
      </section>
      <section className="peru-opening">
        <p className="eyebrow">A JOURNEY MEASURED IN BREATH</p><h2>這裡的距離，<br />不是用公里計算。</h2>
        <div className="peru-opening-copy"><p>秘魯的路線有一種垂直感。飛機離開海岸，幾個小時後便降落在三千多公尺的古城；接著沿聖谷下降，再乘火車切入濕潤的山谷，最後重新爬向安地斯高原。</p><p>每天的光線、溫度與呼吸都不同。與其急著收集地標，這趟旅程更像是在調整身體的刻度，讓眼睛跟上山脈的節奏。</p></div>
      </section>
      <section className="peru-route" id="route">
        <header><p>ROUTE / 10 DAYS</p><h2>四段高度，四種觀看方式</h2></header>
        <div className="chapter-list">{chapters.map((chapter) => <article key={chapter.number}><span>{chapter.number}</span><div><small>{chapter.altitude}</small><h3>{chapter.place}</h3><h4>{chapter.zh}</h4></div><p>{chapter.note}</p></article>)}</div>
      </section>
      <figure className="peru-panorama">
        <img src={`${BASE_PATH}/travel/peru/vinicunca.jpg`} alt="旅人行走於秘魯彩虹山的礦物色帶之間" />
        <figcaption><b>VINICUNCA · 5,036 M</b><span>地層在雲影下顯出紅、赭與灰綠色帶。</span><small>PHOTO / JUSTIN ELOO · UNSPLASH</small></figcaption>
      </figure>
      <section className="peru-notes" id="notes">
        <div className="notes-image"><img src={`${BASE_PATH}/travel/peru/alpacas.jpg`} alt="安地斯高原山坡上的羊駝" /><span>ANDEAN PLATEAU / MORNING</span></div>
        <div className="notes-copy"><p className="eyebrow">FIELD NOTES / BEFORE YOU GO</p><h2>把行程留白，<br />給高原一點時間。</h2><dl>
          <div><dt>01 / 高山適應</dt><dd>抵達庫斯科的頭兩天減少劇烈活動，多補充水分；身體需要時間，而不是意志力。</dd></div>
          <div><dt>02 / 光與溫差</dt><dd>安地斯日照強烈，入夜卻迅速降溫。帽子、防曬與可分層穿脫的衣物比厚重單件更實用。</dd></div>
          <div><dt>03 / 觀看的速度</dt><dd>石牆、梯田與村落都值得慢慢走。預留沒有景點的下午，常常才是記憶最清楚的一段。</dd></div>
        </dl></div>
      </section>
      <footer className="peru-footer"><p>NEXT LIGHT / PACIFIC COAST</p><h2>山脈結束以後，<br />旅程仍向西延伸。</h2><a href={`${BASE_PATH}/travel/`}>RETURN TO ALL JOURNEYS <span>↗</span></a></footer>
    </main>
  );
}
