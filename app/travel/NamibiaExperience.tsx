"use client";

import { useState } from "react";
import RealRouteMap from "./RealRouteMap";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const stops = [
  { day: "01–02", place: "Windhoek", stay: "Windhoek Gardens", nights: "1 NIGHT", distance: "45 KM", drive: "38 MIN", lat: -22.5609, lng: 17.0658, note: "從首都出發，整備裝備，在金色夕陽下進入納米比亞的節奏。" },
  { day: "02–03", place: "Otjiwarongo", stay: "Otjibamba Lodge", nights: "1 NIGHT", distance: "245 KM", drive: "2H 15M", lat: -20.4637, lng: 16.6477, note: "沿著高原公路北行，地貌從城市邊界逐漸轉為灌木荒原。" },
  { day: "03–06", place: "Etosha Fringe", stay: "Epacha Game Lodge", nights: "3 NIGHTS", distance: "175 KM", drive: "1H 57M", lat: -19.4125, lng: 15.9942, note: "追蹤大象、獅群與羚羊，在鹽湖邊等待荒野最安靜的時刻。" },
  { day: "06–07", place: "Brandberg", stay: "White Lady Lodge", nights: "1 NIGHT", distance: "348 KM", drive: "4H 05M", lat: -21.1387, lng: 14.5774, note: "穿越乾涸河床，抵達納米比亞最高峰與古老岩畫的所在地。" },
  { day: "07–08", place: "Spitzkoppe", stay: "Cabin Camp", nights: "1 NIGHT", distance: "132 KM", drive: "2H 19M", lat: -21.8292, lng: 15.1947, note: "花崗岩群峰像島嶼升起，在營地仰望毫無光害的銀河。" },
  { day: "08–10", place: "Swakopmund", stay: "Sand & Sea House", nights: "2 NIGHTS", distance: "154 KM", drive: "1H 50M", lat: -22.6784, lng: 14.5266, note: "沙漠在大西洋岸突然停止；搭乘四驅車探索沙海交界。" },
  { day: "10–12", place: "Sossusvlei", stay: "Little Sossus Lodge", nights: "2 NIGHTS", distance: "361 KM", drive: "4H 45M", lat: -24.7286, lng: 15.3424, note: "清晨攀上世界最高的紅沙丘，俯瞰白色鹽沼與死亡谷。" },
  { day: "12–13", place: "Kalahari", stay: "Teufelskrallen Lodge", nights: "1 NIGHT", distance: "252 KM", drive: "3H 09M", lat: -24.1508, lng: 18.0015, note: "在喀拉哈里紅土與草原間收束旅程，最後一次迎接荒野日落。" },
];

export default function NamibiaExperience() {
  const [active, setActive] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const selected = stops[active];

  return (
    <main className="travel-page">
      <header className="travel-nav">
        <a className="travel-mark" href={`${BASE_PATH}/`} aria-label="返回 Young HDR Gallery 首頁"><span>YH</span><b>EXPEDITIONS</b></a>
        <nav aria-label="旅遊頁導覽"><a href="#route">ROUTE</a><a href="#guide">GUIDE</a><a href="#journal">JOURNAL</a><a href="#field-notes">FIELD NOTES</a></nav>
        <a className="nav-cta" href="#route">EXPLORE</a>
      </header>

      <section className="namibia-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(8,8,6,.62),rgba(8,8,6,.12) 60%,rgba(8,8,6,.35)),url('${BASE_PATH}/travel/namibia-hero.png')` }}>
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="kicker">TAIWAN ↔ NAMIBIA · 16 DAYS TOTAL · 13 DAYS IN NAMIBIA</p>
          <h1>INTO THE<br /><em>WILD</em></h1>
          <div className="hero-meta"><span>NAMIBIA</span><span>22°34′S 17°05′E</span><span>SEP — OCT 2025</span></div>
        </div>
        <div className="scroll-cue"><i />SCROLL TO EXPLORE</div>
      </section>

      <section className="country-portrait" aria-labelledby="country-portrait-title">
        <div className="portrait-heading">
          <p className="section-label">QUICK PORTRAIT / 01</p>
          <h2 id="country-portrait-title">快速認識<br />納米比亞</h2>
          <strong>這裡不只有動物</strong>
          <p>很多人想到非洲，第一個想到的是 Safari。</p>
          <p>但納米比亞真正令人難忘的，是一片經過數千萬年形成的沙漠、直抵大西洋的巨大沙丘、在乾旱中學會生存的生命，以及城市之外幾乎沒有人工照明的黑夜。</p>
          <p>這個人口不多的國家，卻擁有大得難以想像的土地。</p>
          <figure className="portrait-scale-figure">
            <img src={`${BASE_PATH}/travel/namibia-taiwan-scale-preview.webp`} alt="納米比亞與台灣面積約二十三倍的比例概念圖" loading="lazy" />
            <figcaption><span>SCALE STUDY / PREVIEW</span><b>約 23 個台灣的面積</b><small>概念示意，非精確排列</small></figcaption>
          </figure>
        </div>
        <div className="portrait-list">
          <article><span>01 / TIME</span><h3>古老沙漠與千年活化石</h3><p>納米布沙漠歷經數千萬年的風、洋流與地質變化；外形奇特的千歲蘭一生只長出兩片葉子，部分植株能在沙漠中存活超過千年。</p></article>
          <article><span>02 / SCALE</span><h3>一個納米比亞，約等於二十三個台灣</h3><p>納米比亞人口僅約三百萬，國土面積卻約為台灣的二十三倍；光是 Etosha 國家公園，就接近台灣的三分之二大。</p></article>
          <article><span>03 / LIFE</span><h3>獵豹、沙漠象與沙漠獅</h3><p>納米比亞擁有全球規模最大的自由活動獵豹族群；在 Etosha 與西北部荒野，也能看見適應乾旱環境的象、獅與其他野生動物。</p></article>
          <article><span>04 / CULTURE</span><h3>世界遺產與多層次文化</h3><p>Twyfelfontein 保存兩千多幅古老岩刻；Spitzkoppe 的桑人岩畫、不同族群的傳統，以及 Swakopmund 的德國殖民痕跡，也留下不同時代的人文記憶。</p></article>
          <article><span>05 / LAND & LIGHT</span><h3>花崗岩群峰、沙海與星空</h3><p>Spitzkoppe 的花崗岩巨石與天然拱門從平原升起；Sandwich Harbour 的沙丘直接落入大西洋。遠離城市後，幾乎沒有人工照明的黑夜，則讓銀河成為地景的一部分。</p></article>
          <div className="portrait-link"><p>這些不是散落的景點，而是這趟旅程即將穿越的土地。</p><a href={`${BASE_PATH}/travel/guide/`}>完整認識納米比亞 <b>→</b></a></div>
        </div>
      </section>

      <section className="route-intro" id="route">
        <div><p className="section-label">THE ROUTE / 01</p><h2>2,000 公里，<br />深入荒野核心。</h2></div>
        <p>從溫得和克出發，穿越埃托沙邊緣、達馬拉蘭岩峰與大西洋霧岸，最後抵達索蘇斯維來的紅色沙海。這不是觀光路線，而是一條沿著地貌、野生動物與星空前進的探險軌跡。</p>
      </section>

      <section className="expedition-map">
        <div className="map-panel" aria-label="納米比亞真實行程地圖">
          <RealRouteMap stops={stops} active={active} onSelect={setActive} />
          <div className="map-shade" />
          <div className="map-compass"><b>N</b><span>✦</span></div>
          <div className="map-scale">0 ━━━ 200 KM</div>
          <div className="selected-card">
            <p>SELECTED WAYPOINT</p><strong>{selected.place}</strong><span>{selected.note}</span>
          </div>
        </div>

        <div className="itinerary-panel">
          <div className="itinerary-head"><p>WAYPOINTS</p><span>{String(active + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}</span></div>
          <div className="stop-list">
            {stops.map((stop, index) => (
              <button key={stop.place} onClick={() => setActive(index)} className={`stop-item ${active === index ? "is-active" : ""}`}>
                <span className="stop-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="stop-main"><small>DAY {stop.day}</small><b>{stop.place}</b><em>{stop.stay}</em></span>
                <span className="stop-stay">{stop.nights}<i>↗</i></span>
              </button>
            ))}
          </div>
          <div className="travel-stats"><div><small>FROM PREVIOUS</small><b>{selected.distance}</b></div><div><small>EST. DRIVE</small><b>{selected.drive}</b></div><div><small>MODE</small><b>4×4</b></div></div>
        </div>
      </section>

      <section className="guide-teaser" id="guide">
        <p className="section-label">BEFORE YOU GO / GUIDE</p>
        <div>
          <a className="guide-title-link" href={`${BASE_PATH}/travel/guide/`} aria-label="進入納米比亞旅行攻略">
            <h2>準備前往<br />納米比亞？</h2>
          </a>
          <div className="guide-teaser-copy">
            <p>從簽證、航班與路線規劃，到攝影器材與荒野安全，把真正用得到的資訊整理成一套旅行指南。</p>
            <a className="guide-teaser-cta" href={`${BASE_PATH}/travel/guide/`}><span>開始準備這趟旅行</span><b>→</b></a>
          </div>
        </div>
      </section>

      <section className="travel-journal" id="journal">
        <div className="journal-heading">
          <p className="section-label">TRAVEL JOURNAL / 02</p>
          <h2>有些旅程，<br />在回家之後才抵達。</h2>
          <p className="journal-deck">一部八分鐘的 8K HDR 影像紀錄，與一張走了三個月才抵達台灣的明信片。</p>
        </div>

        <div className="journal-video">
          <div className="video-frame">
            {videoOpen ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/cAJiCyvlY7E?autoplay=1&rel=0&modestbranding=1"
                title="Namibia 8K HDR 旅遊紀錄"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button className="video-poster" type="button" onClick={() => setVideoOpen(true)} aria-label="播放 Namibia 8K HDR 影片">
                <img src={`${BASE_PATH}/Photo/2Y6A7079-1781977032501.avif`} alt="Deadvlei 納米比亞死亡谷" loading="lazy" />
                <span className="poster-shade" />
                <span className="poster-label"><small>AN 8K HDR FILM</small><b>NAMIBIA</b></span>
                <span className="poster-play"><i>▶</i><em>PLAY FILM</em></span>
              </button>
            )}
          </div>
          <div className="video-caption"><span>FILM 01</span><strong>NAMIBIA · 8K HDR</strong><a href="https://youtu.be/cAJiCyvlY7E" target="_blank" rel="noreferrer">WATCH ON YOUTUBE ↗</a></div>
        </div>

        <div className="film-afterword">
          <p>這趟旅程沒有旁白，畫面會說話。</p>
          <span>八分鐘，帶你走進一個大部分人一生不會踏上的地方。</span>
        </div>

        <article className="postcard-story">
          <aside><span>POSTCARD / 2025</span><b>FROM NAMIBIA<br />TO TAIWAN</b><i>3 MONTHS<br />IN TRANSIT</i></aside>
          <div className="story-copy">
            <p className="story-chapter">三個月後抵達的明信片</p>
            <h3>最近收到了一張明信片。</h3>
            <p className="story-lead">準確來說，是一張三個月前從納米比亞寄出的明信片。我早已放棄它會抵達的希望，甚至忘記了自己寄過這張卡片。</p>
            <figure className="postcard-photo">
              <img src={`${BASE_PATH}/travel/namibia-postcard.jpg`} alt="從納米比亞寄回台灣、寫滿同行旅伴留言與簽名的明信片" loading="lazy" />
              <figcaption><span>THE CARD THAT MADE IT HOME</span><b>NAMIBIA → TAIWAN · 3 MONTHS</b></figcaption>
            </figure>
            <p>打開信箱的那一刻，我看著上面模糊的郵戳，開始思考：是旅遊嚮導忘了幫我寄？還是它在某個非洲小鎮的郵局裡躺了三個月，才終於啟程前往台灣？</p>

            <hr />
            <h4>明信片的意義</h4>
            <p>其實一開始的旅行，我對於寄明信片是抗拒的。只是因為朋友要寄，所以乾脆一起寄。</p>
            <p>為什麼還要寄明信片？在這個通訊發達的時代，傳訊息、打視訊電話，都比明信片快上千百倍。但明信片的意義，或許正在於它的「慢」。</p>
            <blockquote>你在旅途中的某一刻停下腳步，挑選一張卡片，寫下此刻的心情。然後它開始一段獨立的旅程。</blockquote>
            <p>它跨越海洋、穿過邊境、經過無數雙手，最後出現在某個人的信箱裡。這個過程，本身就是一種浪漫。</p>
            <p>至於它會不會抵達？何時抵達？那都是命運的一部分。就像旅行本身，充滿不確定性，但也因此更加珍貴。</p>
          </div>
        </article>

        <div className="journey-credits">
          <span>WITH GRATITUDE</span>
          <p>Albert Hu · 賴小豬 · Nai-Wei Chen · 許世傑 · Wen Chang · Angel Pig · Rick Hsu · Stefan Shih · David Mr.T · Nature Travel Namibia</p>
          <strong>沒有你，這趟旅程少了一半的重量。</strong>
          <small>📍 NAMIBIA, 2025 · 紀念</small>
        </div>
      </section>

      <section className="field-notes" id="field-notes">
        <p className="section-label">FIELD NOTES / 03</p>
        <div className="notes-grid">
          <article><span>01</span><h3>沙漠不是空無</h3><p>風、光線和溫度持續改寫沙丘。清晨出發，才能看見它最銳利的輪廓。</p></article>
          <article><span>02</span><h3>保持距離</h3><p>荒野的規則很簡單：我們是訪客。所有觀察都以不干擾動物為前提。</p></article>
          <article><span>03</span><h3>仰望黑夜</h3><p>離開城市光害後，銀河不再只是背景，而是每天旅程的最後一站。</p></article>
        </div>
      </section>

      <footer className="travel-footer"><p>NAMIBIA · PRIVATE EXPEDITION</p><h2>荒野正在等待。</h2><a href={`${BASE_PATH}/contact/`}>START THE JOURNEY <span>↗</span></a><small>FIRST CONCEPT · ADVENTURE EDITION</small></footer>
    </main>
  );
}
