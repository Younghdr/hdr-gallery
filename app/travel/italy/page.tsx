import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./italy.css";
import "./hero-hdr.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "ITALIA — 義大利旅行相片紀錄",
  description: "沿著羅馬、托斯卡尼與威尼斯，收藏一段義大利夏日的光影、街道與慢速日常。",
};

const chapters = [
  { number: "01", place: "ROMA", zh: "羅馬", note: "石牆記得每一道斜陽" },
  { number: "02", place: "TOSCANA", zh: "托斯卡尼", note: "把時間交給蜿蜒的路" },
  { number: "03", place: "VENEZIA", zh: "威尼斯", note: "水面替城市保存黃昏" },
];

export default function ItalyPage() {
  return (
    <SiteFrame>
      <main className="italy-page">
        <section className="italy-hero" aria-labelledby="italy-title">
          <picture className="italy-hero-picture">
            <img
              src={`${BASE_PATH}/travel/italy/dolomites-panorama-wide-web.jpg`}
              alt="雲層之下的冬季 Dolomites 雪山全景"
            />
          </picture>
          <div
            className="italy-hero-wash"
            style={{ background: "linear-gradient(90deg, rgba(17,21,20,.7), rgba(17,21,20,.05) 64%), linear-gradient(0deg, rgba(15,18,17,.62), transparent 46%)" }}
          />
          <div className="italy-hero-copy">
            <p>DOLOMITES · ALTO ADIGE · INVERNO</p>
            <h1 id="italy-title">ITALIA</h1>
            <div className="italy-title-line"><span>46.5405° N</span><b>義大利旅行相片紀錄</b><span>11.6743° E</span></div>
            <div className="italy-hdr-format"><span className="italy-hdr-dot" />HDR PHOTOGRAPHY <i>·</i> DOLOMITES</div>
          </div>
          <a className="italy-scroll" href="#journal"><span>SCROLL TO WANDER</span><i /></a>
        </section>

        <section className="italy-opening" id="journal">
          <div className="italy-stamp" aria-hidden="true"><span>IT</span></div>
          <p className="italy-eyebrow">TRE CITTÀ · UNA LENTA ESTATE</p>
          <h2>有些地方不是抵達，<br /><em>是慢慢顯影。</em></h2>
          <div className="italy-opening-copy">
            <p>十二天，三座城市，一捲還沒拍完的夏天。這不是景點清單，而是光落在石牆上的角度、轉角傳來的咖啡香，和那些來不及命名的片刻。</p>
            <p>從羅馬的赭紅屋瓦一路往北，穿過托斯卡尼起伏的田野，最後在威尼斯的水道邊，等一扇窗亮起。</p>
          </div>
        </section>

        <nav className="italy-chapters" aria-label="義大利旅程章節">
          {chapters.map((chapter) => (
            <a href={`#${chapter.place.toLowerCase()}`} key={chapter.place}>
              <span>{chapter.number}</span><div><b>{chapter.place}</b><small>{chapter.zh} · {chapter.note}</small></div><i>↘</i>
            </a>
          ))}
        </nav>

        <section className="italy-chapter italy-rome" id="roma">
          <header><span>CAPITOLO 01 / ROMA</span><h2>永恆之城，<br />傍晚六點。</h2></header>
          <figure className="italy-wide-photo">
            <img src={`${BASE_PATH}/travel/italy/rome-hero.png`} alt="金色時刻的羅馬城市風景" />
            <figcaption><b>ROMA, LAZIO</b><span>FRAME 01 — 18:42</span></figcaption>
          </figure>
          <blockquote>「城市不急著解釋自己，<br />它只是讓光，一層一層地落下。」</blockquote>
        </section>

        <section className="italy-chapter italy-tuscany" id="toscana">
          <div className="italy-section-copy"><span>CAPITOLO 02 / TOSCANA</span><h2>走進地圖<br />沒有標記的地方。</h2><p>清晨的道路只有柏樹知道方向。車窗外的山丘像呼吸一樣起伏，時間在這裡不再用分鐘計算，而是用影子的長度。</p></div>
          <figure className="italy-feature-photo">
            <img src={`${BASE_PATH}/travel/italy/tuscany-road.png`} alt="托斯卡尼清晨的柏樹與蜿蜒道路" />
            <figcaption><b>VAL D'ORCIA</b><span>FRAME 18 — 06:17</span></figcaption>
          </figure>
          <aside className="italy-margin-note"><small>NOTE 07</small><p>在 Pienza 之前停下。沒有觀景台，只有風和遠方剛醒來的農舍。</p></aside>
        </section>

        <section className="italy-chapter italy-venice" id="venezia">
          <figure className="italy-portrait-photo">
            <img src={`${BASE_PATH}/travel/italy/venice-canal.png`} alt="藍色時刻的威尼斯小運河" />
            <figcaption><b>VENEZIA</b><span>FRAME 32 — 20:51</span></figcaption>
          </figure>
          <div className="italy-section-copy"><span>CAPITOLO 03 / VENEZIA</span><h2>迷路，是這座城<br />最好的路線。</h2><p>離開人聲之後，水道收起白天的喧鬧。木船輕輕碰著岸，一扇窗亮了，又一扇。威尼斯真正的方向，藏在倒影裡。</p><div className="italy-place-list"><span>CASTELLO</span><span>CANNAREGIO</span><span>DORSODURO</span></div></div>
        </section>

        <section className="italy-contact-sheet">
          <div><small>ROLL 01 / 36 EXPOSURES</small><h2>光走過以後，<br />照片留下來。</h2></div>
          <div className="italy-film-strip" aria-label="義大利旅程照片精選">
            <figure><img src={`${BASE_PATH}/travel/italy/rome-hero.png`} alt="羅馬夕陽" /><span>01A</span></figure>
            <figure><img src={`${BASE_PATH}/travel/italy/tuscany-road.png`} alt="托斯卡尼道路" /><span>18A</span></figure>
            <figure><img src={`${BASE_PATH}/travel/italy/venice-canal.png`} alt="威尼斯運河" /><span>32A</span></figure>
          </div>
          <a href={`${BASE_PATH}/travel/`}>回到所有旅程 <span>→</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
