import type { Metadata } from "next";
import "./finland.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "芬蘭｜赫爾辛基的冬日光線",
  description: "從赫爾辛基主教座堂出發，以雪白建築、海港風與北歐冬光，記錄一段安靜的芬蘭城市旅程。",
  alternates: { canonical: "/travel/finland/" },
};

const moments = [
  { time: "09:12", title: "SENAATINTORI", text: "白色立面接住陰天裡最細微的亮度，廣場把城市的聲音慢慢拉遠。" },
  { time: "11:40", title: "KAUPPATORI", text: "走向海港，鹹冷的風穿過市場棚架，也把清晨最後一點霧帶走。" },
  { time: "14:26", title: "KATAJANOKKA", text: "電車、紅磚與結冰的水面，讓赫爾辛基的冬日保持一種安靜秩序。" },
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
        <figure className="fi-photo-detail"><img src={`${BASE_PATH}/travel/finland/helsinki-cathedral.avif`} alt="赫爾辛基主教座堂圓頂細節" /><figcaption>DETAIL · THE DOME</figcaption></figure>
        <blockquote>「冬日不是沒有顏色，<br />只是每一種顏色都更靠近光。」</blockquote>
      </section>

      <section className="fi-timeline" id="field-note">
        <header><p>ONE WINTER DAY / HELSINKI</p><h2>跟著有限的日光，<br />走過三段城市。</h2></header>
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
