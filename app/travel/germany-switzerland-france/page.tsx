import type { Metadata } from "next";
import { AlpineRouteMap } from "@/components/alpine-route-map";
import {
  alpineDispatch,
  dayStatusLabel,
  getLatestActiveDay,
  getPublishedDays,
} from "@/lib/alpine-dispatch";
import "./alpine.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const TRIP_PATH = `${BASE_PATH}/travel/germany-switzerland-france`;

export const metadata: Metadata = {
  title: "德瑞法現場影像誌｜鐵道帶你穿越阿爾卑斯山",
  description: "EXPEDITION 22：德國、瑞士、法國十二日 SAME DAY EDIT。以每日影片、HDR 照片與城市級路線，記錄穿越阿爾卑斯的鐵道旅程。",
  alternates: { canonical: "/travel/germany-switzerland-france/" },
  openGraph: {
    title: "EXPEDITION 22｜ACROSS THE ALPS BY RAIL",
    description: "德瑞法現場影像誌：三個國家，一條鐵道邏輯貫穿始終。",
    url: "/travel/germany-switzerland-france/",
    images: [{
      url: "/travel/germany-switzerland-france/alpine-dispatch-og.png",
      width: 1680,
      height: 945,
      alt: "EXPEDITION 22 德瑞法阿爾卑斯鐵道旅程",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXPEDITION 22｜ACROSS THE ALPS BY RAIL",
    description: "德瑞法現場影像誌：三個國家，一條鐵道邏輯貫穿始終。",
    images: ["/travel/germany-switzerland-france/alpine-dispatch-og.png"],
  },
};

export default function AlpineDispatchPage() {
  const latestDay = getLatestActiveDay();
  const publishedDays = getPublishedDays();
  const heroImage = alpineDispatch.heroImage.startsWith("http") ? alpineDispatch.heroImage : `${BASE_PATH}${alpineDispatch.heroImage}`;

  return (
    <main className="alpine-page">
      <header className="alpine-nav">
        <a className="alpine-mark" href={`${BASE_PATH}/travel/`} aria-label="返回所有旅程">
          <span>YH</span><b>EXPEDITIONS</b>
        </a>
        <nav aria-label="德瑞法現場影像誌導覽">
          <a href="#route">ROUTE</a>
          <a href="#dispatches">DAILY</a>
          <a href="#field-notes">FORMAT</a>
        </nav>
        <a className="alpine-nav-status" href="#latest">
          <i /> PRE-DEPARTURE
        </a>
      </header>

      <section className="alpine-hero" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="alpine-hero-shade" />
        <div className="alpine-hero-topline">
          <span>EXPEDITION {alpineDispatch.expedition}</span>
          <span>{alpineDispatch.countriesEn}</span>
          <span>{alpineDispatch.season}</span>
        </div>
        <div className="alpine-hero-copy">
          <p>{alpineDispatch.region}</p>
          <h1>{alpineDispatch.titleEn}</h1>
          <h2>{alpineDispatch.titleZh}</h2>
          <div className="alpine-hero-meta">
            <span>12 DAYS</span><span>3 COUNTRIES</span><span>4 SCENIC RAILWAYS</span>
          </div>
        </div>
        <a href="#opening" className="alpine-scroll">ENTER THE ROUTE <i>↓</i></a>
        <small className="alpine-hero-credit">{alpineDispatch.heroCredit}</small>
      </section>

      <section className="alpine-opening" id="opening">
        <div className="alpine-opening-head">
          <p>THE JOURNEY / 2026</p>
          <h2>{alpineDispatch.intro}</h2>
        </div>
        <div className="alpine-opening-copy">
          {alpineDispatch.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="alpine-opening-tags">
            <span>GLACIER EXPRESS</span>
            <span>JUNGFRAU</span>
            <span>MATTERHORN</span>
            <span>LUZERN–INTERLAKEN EXPRESS</span>
          </div>
        </div>
      </section>

      <section className="alpine-route-section" id="route">
        <header className="alpine-section-head">
          <p>01 / THREE COUNTRIES</p>
          <h2>一條路線，國境在車窗外改變。</h2>
          <span>法蘭克福出發，穿過亞爾薩斯老城，進入瑞士高山與湖區，再經黑森林回到起點。</span>
        </header>
        <AlpineRouteMap />
      </section>

      <section className="alpine-latest" id="latest">
        <header>
          <p>02 / LATEST DISPATCH</p>
          <span>{latestDay ? `LAST UPDATE · ${latestDay.publishedAt || "整理中"}` : `PLANNING BOARD · ${alpineDispatch.season}`}</span>
        </header>
        {latestDay ? (
          <a className={`alpine-latest-card theme-${latestDay.theme}`} href={`${TRIP_PATH}/day/${latestDay.day}/`}>
            <div>
              <span>DAY {latestDay.day} · {dayStatusLabel(latestDay.status)}</span>
              <h2>{latestDay.title}</h2>
              <p>{latestDay.summary}</p>
            </div>
            <aside><b>{latestDay.countryCode}</b><span>{latestDay.city}</span><i>ENTER ↗</i></aside>
          </a>
        ) : (
          <div className="alpine-latest-empty">
            <div><span className="live-pulse" /><b>行前規劃中</b></div>
            <h2>旅程尚未出發，十二日路線已經成形。</h2>
            <aside className="alpine-plan-copy">
              <p>目前先公開德國、法國、瑞士的城市與鐵道路線。實際日期確認後再補上每日日期；抵達歐洲後，才開始發佈照片、SDE 影片與現場筆記。</p>
              <ul>
                <li><span>ROUTE</span><b>12 DAYS · READY</b></li>
                <li><span>DATE</span><b>SEP–OCT 2026</b></li>
                <li><span>DAILY</span><b>PHOTO · FILM · NOTE</b></li>
              </ul>
            </aside>
          </div>
        )}
      </section>

      <section className="alpine-dispatches" id="dispatches">
        <header className="alpine-section-head alpine-section-head-light">
          <p>03 / 12-DAY LOG</p>
          <h2>每天一頁，<br />沿著鐵道繼續往前。</h2>
          <span>內容尚未抵達時保留完整行程骨架；當天完成的影像會直接取代預告狀態。</span>
        </header>
        <ol className="alpine-day-grid">
          {alpineDispatch.days.map((day) => (
            <li key={day.day} className={`theme-${day.theme} status-${day.status}`}>
              <a href={`${TRIP_PATH}/day/${day.day}/`}>
                <div className="alpine-day-index"><span>DAY</span><b>{day.day}</b></div>
                <div className="alpine-day-copy">
                  <p><span>{day.countryCode}</span>{day.city}</p>
                  <h3>{day.title}</h3>
                  <small>{day.route.join(" → ")}</small>
                </div>
                <div className="alpine-day-state">
                  <span>{dayStatusLabel(day.status)}</span><b>↗</b>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="alpine-published" aria-label="已完成日誌">
        <header><p>PUBLISHED JOURNALS</p><span>{String(publishedDays.length).padStart(2, "0")} / 12</span></header>
        {publishedDays.length ? (
          <div>{publishedDays.map((day) => <a key={day.day} href={`${TRIP_PATH}/day/${day.day}/`}>DAY {day.day} · {day.title}<span>↗</span></a>)}</div>
        ) : (
          <p className="alpine-published-empty">旅程尚未出發。完成的每日影像誌會依發佈時間收錄在這裡。</p>
        )}
      </section>

      <section className="alpine-format" id="field-notes">
        <header className="alpine-section-head">
          <p>04 / SAME DAY EDIT</p>
          <h2>不是即時監看，<br />而是每天完成一個章節。</h2>
          <span>只公開城市級路線；真正的住宿位置與移動細節留在旅程之外。</span>
        </header>
        <div className="alpine-format-grid">
          <article><span>01</span><b>FILM</b><h3>一支當日影片</h3><p>公開或不公開的 YouTube 影片，以 8K／HDR 現場影像作為當日主軸。</p></article>
          <article><span>02</span><b>FRAMES</b><h3>八至十五張照片</h3><p>全幅、雙欄與圖說軌依內容切換，不把每一日套進同一種模板。</p></article>
          <article><span>03</span><b>FIELD NOTE</b><h3>一段現場筆記</h3><p>保留天候、光線與移動感受；器材資訊只作為閱讀影像的補充。</p></article>
        </div>
      </section>

      <footer className="alpine-footer">
        <p>EXPEDITION {alpineDispatch.expedition} · {alpineDispatch.season}</p>
        <div>{alpineDispatch.footerLines.map((line) => <span key={line}>{line}</span>)}</div>
        <h2>移動本身，<br />就是風景。</h2>
        <a href={`${BASE_PATH}/travel/`}>返回所有旅程 <span>↗</span></a>
        <small>YOUNG HUNG HDR STUDIO · GERMANY · SWITZERLAND · FRANCE</small>
      </footer>
    </main>
  );
}
