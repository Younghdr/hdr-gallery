import type { Metadata } from "next";
import "./finland.css";
import "./finland-chapters.css";
import "./finland-header-fixes.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "芬蘭｜赫爾辛基的冬日光線",
  description: "從赫爾辛基主教座堂出發，以雪白建築、海港風與北歐冬光，記錄一段安靜的芬蘭城市旅程。",
  alternates: { canonical: "/travel/finland/" },
};

const moments = [
  { time: "09:12", title: "SENAATINTORI", text: "從元老院廣場仰望主教座堂，先讓眼睛習慣冬日裡不同層次的白。" },
  { time: "10:05", title: "USPENSKI", text: "越過海港，紅磚外牆與金色穹頂把陰天染成另一種溫度。" },
  { time: "11:20", title: "VANHA KAUPPAHALLI", text: "走進老市場，水果、鮭魚與攤販交談的聲音，讓城市從地標回到日常。" },
  { time: "13:40", title: "TEMPPELIAUKIO", text: "光從銅頂邊緣落進岩壁，管風琴與石材共同圍出沉靜的聲場。" },
  { time: "15:10", title: "SIBELIUSPUISTO", text: "在天色再次變暗以前，從鋼管下方抬頭，看一座紀念碑如何接住天空。" },
];

export default function FinlandPage() {
  return (
    <main className="fi-page">
      <header className="fi-nav">
        <a className="fi-mark" href={`${BASE_PATH}/`}><span>YH</span><b>EXPEDITIONS</b></a>
        <p>13 / FINLAND</p>
        <nav aria-label="芬蘭旅程導覽"><a href={`${BASE_PATH}/travel/`}>所有旅程</a><a href="#journal">城市光線</a><a href="#field-note">旅途筆記</a></nav>
      </header>

      <section className="fi-hero">
        <img src={`${BASE_PATH}/travel/finland/helsinki-cathedral.avif`} alt="冬日雲層下的赫爾辛基主教座堂與元老院廣場階梯" />
        <div className="fi-hero-wash" />
        <div className="fi-hero-copy">
          <p>HELSINKI · 60.1699° N</p>
          <h1>芬蘭，<br />在白色之間呼吸。</h1>
          <span>FINLAND / A STUDY OF WINTER LIGHT</span>
        </div>
        <p className="fi-scroll">SCROLL TO WALK THE CITY <i>↓</i></p>
      </section>

      <section className="fi-opening" id="journal">
        <aside><span>FIELD 01</span><b>HELSINKI</b><small>DECEMBER LIGHT<br />BALTIC COAST</small></aside>
        <article>
          <p className="fi-kicker">一座城市，如何在冬天保留光。</p>
          <h2>不是耀眼的晴朗，<br />而是雲層裡緩慢浮現的白。</h2>
          <div className="fi-copy"><p>站在元老院廣場，先看見的不是建築細節，而是不同層次的白：天空、立面、階梯，以及行人吐出的霧氣。赫爾辛基主教座堂沒有壓過城市，它只是安靜地把光收住。</p><p>這趟旅程不急著追逐地標。沿著海港、電車軌道與街角咖啡館移動，讓短暫的日照決定一天的節奏。芬蘭的冬天，適合把步伐放慢，也適合重新學會觀看。</p></div>
        </article>
      </section>

      <section className="fi-photo-study" aria-label="赫爾辛基主教座堂影像細節">
        <figure className="fi-photo-main"><img src={`${BASE_PATH}/travel/finland/helsinki-cathedral.avif`} alt="赫爾辛基主教座堂完整正面" /><figcaption>FRAME 01 · SENAATINTORI / 雲層將光線壓低，白色建築反而更清楚。</figcaption></figure>
        <blockquote><span>「冬日不是沒有顏色，</span><span>只是每一種顏色都更靠近光。」</span></blockquote>
      </section>

      <section className="fi-faith" aria-labelledby="fi-faith-title">
        <header><p>CHAPTER 02 / KATAJANOKKA</p><h2 id="fi-faith-title">同一片冬日天空，兩種截然不同的光。</h2><span>從主教座堂的白，走向烏斯佩斯基大教堂的紅磚、深色石柱與金色聖像。城市沒有突然轉換語言，只是讓光在另一組材質裡停留。</span></header>
        <div className="fi-faith-images">
          <figure className="fi-uspenski-exterior"><img src={`${BASE_PATH}/travel/finland/uspenski-exterior.avif`} alt="冬日裡的烏斯佩斯基大教堂紅磚外觀" /><figcaption><b>OUTSIDE</b> 紅磚、積雪與陰天構成海港旁最濃重的色彩。</figcaption></figure>
          <figure className="fi-uspenski-interior"><img src={`${BASE_PATH}/travel/finland/uspenski-interior.avif`} alt="烏斯佩斯基大教堂內部的石柱、吊燈與聖像" /><figcaption><b>INSIDE</b> 走進室內，冬日亮度被金色與深色石材收住。</figcaption></figure>
        </div>
      </section>

      <section className="fi-sound" aria-labelledby="fi-sound-title">
        <header><span>MATERIAL STUDY / 03</span><h2 id="fi-sound-title">石頭、銅與鋼管，讓聲音有了形狀。</h2><p>岩石教堂向地下收攏，西貝流士紀念碑則朝天空展開。兩處空間相隔一段城市路程，卻都以材質取代裝飾，讓觀看自然地靠近聆聽。</p></header>
        <figure className="fi-rock-panorama"><img src={`${BASE_PATH}/travel/finland/temppeliaukio-panorama.avif`} alt="岩石教堂內部全景、天然岩壁與管風琴" /><figcaption>岩石教堂全景：銅頂、岩壁與管風琴圍出一座向內的空間。</figcaption></figure>
        <div className="fi-sibelius-grid">
          <figure><img src={`${BASE_PATH}/travel/finland/sibelius-pipes.avif`} alt="從下方仰望西貝流士紀念碑的鋼管" /><figcaption>LOOK UP / 鋼管把灰白天空切成無數圓形取景框。</figcaption></figure>
          <figure><img src={`${BASE_PATH}/travel/finland/sibelius-park.avif`} alt="雪地裡完整的西貝流士紀念碑與公園" /><figcaption>SIBELIUSPUISTO / 先看見公園，再走進紀念碑的尺度。</figcaption></figure>
          <blockquote><p>向內，是岩石包覆的安靜。<br />向上，是鋼管之間流動的風。</p></blockquote>
        </div>
      </section>

      <section className="fi-market" aria-labelledby="fi-market-title">
        <header><p>CHAPTER 04 / VANHA KAUPPAHALLI</p><h2 id="fi-market-title">市場裡，冬日重新有了顏色。</h2><span>離開教堂與紀念碑，回到海港旁的老市場。這裡不需要宏大的視角；水果、鮭魚、紙標價與排隊的人，就是赫爾辛基最具體的日常。</span></header>
        <div className="fi-market-images">
          <figure><img src={`${BASE_PATH}/travel/finland/old-market-fruit.avif`} alt="赫爾辛基老市場裡的水果攤販與顧客" /><figcaption>COUNTER 01 / 水果攤的暖色，讓室外的灰白暫時退到門後。</figcaption></figure>
          <figure><img src={`${BASE_PATH}/travel/finland/old-market-salmon.avif`} alt="赫爾辛基老市場海鮮櫃中的鮭魚" /><figcaption>COUNTER 02 / 鮭魚、手寫價格與玻璃倒影，都是市場真正的表情。</figcaption></figure>
        </div>
        <div className="fi-market-notes"><article><b>看見</b><p>攤販整理水果，熟客沿著狹窄走道停下來交談。</p></article><article><b>吃到</b><p>煙燻魚、鮭魚與熱湯，把海港的冷風留在門外。</p></article><article><b>帶走</b><p>比起制式紀念品，更想記住手寫標價與櫃檯裡的顏色。</p></article></div>
      </section>

      <section className="fi-timeline" id="field-note">
        <header><p>ONE WINTER DAY / HELSINKI</p><h2>跟著有限的日光，走過五段城市。</h2></header>
        <ol>{moments.map((moment, index) => <li key={moment.time}><span>0{index + 1}</span><time>{moment.time}</time><div><h3>{moment.title}</h3><p>{moment.text}</p></div></li>)}</ol>
      </section>

      <section className="fi-notes">
        <div><span>FIELD NOTE / 01</span><h2>冬天的照片，<br />不必急著變暖。</h2><p>保留陰天的冷色、雪地與石材之間的細微灰階，再讓窗光、路燈或人物成為少量的暖色。畫面不需要用飽和度證明寒冷，真正重要的是白色之間仍然保有層次。</p></div>
        <dl><div><dt>BASE</dt><dd>HELSINKI</dd></div><div><dt>SEASON</dt><dd>WINTER</dd></div><div><dt>LIGHT</dt><dd>5 H 49 M</dd></div><div><dt>PACE</dt><dd>SLOW WALK</dd></div></dl>
      </section>

      <footer className="fi-footer"><p>FINLAND · NORTH OF SILENCE</p><h2>把冬日留在白色裡。</h2><a href={`${BASE_PATH}/travel/`}>回到所有旅程 <span>↗</span></a></footer>
    </main>
  );
}
