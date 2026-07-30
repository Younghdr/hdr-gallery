import type { Metadata } from "next";
import "./turkiye.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "土耳其光影紀行｜卡帕多奇亞日出",
  description: "從博斯普魯斯海峽到卡帕多奇亞，在兩個大陸之間追尋土耳其的晨光、岩谷與古老城市。",
  alternates: { canonical: "/travel/turkiye/" },
  openGraph: {
    title: "土耳其光影紀行｜在兩個大陸之間",
    description: "熱氣球升起以前，安納托利亞的岩谷先被晨光喚醒。",
    url: "/travel/turkiye/",
    images: [{ url: "/travel/turkiye/cappadocia-sunrise.png", alt: "卡帕多奇亞日出與熱氣球" }],
  },
};

export default function TurkiyeTravelPage() {
  return (
    <main className="turkiye-page">
      <header className="turkiye-nav">
        <a className="turkiye-mark" href={`${BASE_PATH}/`}><span>YH</span><b>EXPEDITIONS</b></a>
        <nav aria-label="土耳其旅程導覽"><a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS</a><a href="#route">ROUTE</a><a href="#notes">FIELD NOTES</a></nav>
        <a className="nav-cta" href="#story">READ STORY</a>
      </header>
      <section className="turkiye-hero" style={{ backgroundImage: `url('${BASE_PATH}/travel/turkiye/cappadocia-sunrise.png')` }}>
        <div className="hero-shade" />
        <div className="hero-copy"><p>41°01′N — 38°39′N · ANATOLIA</p><h1>TÜRKIYE</h1><h2>在兩個大陸之間，<br />等待第一道光</h2></div>
        <div className="hero-caption"><span>01</span><p>CAPPADOCIA<br />FIRST LIGHT</p></div>
      </section>
      <section className="turkiye-intro" id="story">
        <p className="eyebrow">FIELD JOURNAL · 06</p>
        <div><h2>清晨五點，<br />整座山谷還沒有醒來。</h2><p>天空先從深藍褪成灰白，接著，第一顆熱氣球越過岩脊。卡帕多奇亞的晨光不是突然出現；它沿著每一道凝灰岩的稜線，緩慢地把土地重新描繪一次。</p></div>
      </section>
      <section className="route-strip" id="route" aria-label="土耳其旅程路線">
        <div><small>01 / BOSPHORUS</small><b>ISTANBUL</b><span>海峽、清真寺與渡輪</span></div>
        <div><small>02 / CENTRAL ANATOLIA</small><b>GÖREME</b><span>岩谷、洞穴與日出</span></div>
        <div><small>03 / AEGEAN</small><b>EPHESUS</b><span>石柱、海風與古城</span></div>
      </section>
      <section className="field-notes" id="notes">
        <aside><span>06:12</span><p>SUNRISE<br />GÖREME</p></aside>
        <article><p>土耳其的風景從來不只是一種顏色。伊斯坦堡的藍，來自博斯普魯斯海峽；卡帕多奇亞的粉，是清晨落在岩層上的光；愛琴海沿岸的白，則留在古城被太陽曬亮的石柱上。</p><blockquote>旅程真正留下來的，往往不是抵達哪裡，而是光線改變的那幾分鐘。</blockquote><p>這是一篇正在展開的旅程。照片與沿途筆記，會隨著底片一格一格整理完成。</p></article>
      </section>
      <footer className="turkiye-footer"><p>TO BE CONTINUED · 未完待續</p><h2>下一站，<br />穿過博斯普魯斯。</h2><a href={`${BASE_PATH}/travel/`}>返回所有旅程 →</a></footer>
    </main>
  );
}
