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
  const selected = stops[active];

  return (
    <main className="travel-page">
      <header className="travel-nav">
        <a className="travel-mark" href={`${BASE_PATH}/`} aria-label="返回 Young HDR Gallery 首頁"><span>YH</span><b>EXPEDITIONS</b></a>
        <nav aria-label="旅遊頁導覽"><a href="#route">ROUTE</a><a href="#journal">JOURNAL</a><a href="#field-notes">FIELD NOTES</a></nav>
        <a className="nav-cta" href="#route">EXPLORE</a>
      </header>

      <section className="namibia-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(8,8,6,.62),rgba(8,8,6,.12) 60%,rgba(8,8,6,.35)),url('${BASE_PATH}/travel/namibia-hero.png')` }}>
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="kicker">13 DAYS · 12 NIGHTS · PRIVATE EXPEDITION</p>
          <h1>INTO THE<br /><em>WILD</em></h1>
          <div className="hero-meta"><span>NAMIBIA</span><span>22°34′S 17°05′E</span><span>SEP — OCT 2025</span></div>
        </div>
        <div className="scroll-cue"><i />SCROLL TO EXPLORE</div>
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

      <section className="travel-journal" id="journal">
        <div className="journal-heading">
          <p className="section-label">TRAVEL JOURNAL / 02</p>
          <h2>有些旅程，<br />在回家之後才抵達。</h2>
          <p className="journal-deck">一段 8 分鐘的影像，與一張走了三個月才抵達台灣的明信片。</p>
        </div>

        <div className="journal-video">
          <div className="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/cAJiCyvlY7E?rel=0&modestbranding=1"
              title="Namibia 8K HDR 旅遊紀錄"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="video-caption"><span>FILM 01</span><strong>NAMIBIA · 8K HDR</strong><a href="https://youtu.be/cAJiCyvlY7E" target="_blank" rel="noreferrer">WATCH ON YOUTUBE ↗</a></div>
        </div>

        <article className="postcard-story">
          <aside><span>POSTCARD / 2025</span><b>FROM NAMIBIA<br />TO TAIWAN</b><i>3 MONTHS<br />IN TRANSIT</i></aside>
          <div className="story-copy">
            <p className="story-chapter">三個月後抵達的明信片</p>
            <h3>最近收到了一張明信片。</h3>
            <p className="story-lead">準確來說，是一張三個月前從納米比亞寄出的明信片。我早已放棄它會抵達的希望，甚至忘記了自己寄過這張卡片。</p>
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

        <article className="namibia-note">
          <div className="namibia-note-title"><p className="story-chapter">納米比亞 🇳🇦</p><h3>壯麗的自然景觀<br /><span>不只是動物</span></h3></div>
          <div className="note-copy">
            <p>很多人提到非洲，第一個想到的是「Safari 看動物」。但納米比亞不只有動物，這個國家的自然景觀，豐富到令人難以置信。</p>
            <ul>
              <li><b>3,000,000</b><span>三百萬人，散落在二十三個台灣大的土地上。</span></li>
              <li><b>55,000,000</b><span>沙漠有五千五百萬年的歷史。</span></li>
              <li><b>1,000 YEARS</b><span>枯樹站在白色鹽地裡，已經站了近千年。</span></li>
            </ul>
            <p>象群學會了在沙漠裡行走與生活，全世界只有這裡。有些地方，安靜到你會開始聽見自己。</p>
            <p className="film-line">這趟旅程沒有旁白。畫面會說話。<br />8 分鐘，帶你去一個大部分人一生不會踏上的地方。</p>
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
