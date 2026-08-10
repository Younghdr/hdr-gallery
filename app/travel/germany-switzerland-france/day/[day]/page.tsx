import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  alpineDispatch,
  dayStatusLabel,
  getTripDay,
  youtubeEmbedUrl,
} from "@/lib/alpine-dispatch";
import "../../alpine.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const TRIP_PATH = `${BASE_PATH}/travel/germany-switzerland-france`;

export const dynamicParams = false;

export function generateStaticParams() {
  return alpineDispatch.days.map((day) => ({ day: day.day }));
}

export async function generateMetadata({ params }: { params: Promise<{ day: string }> }): Promise<Metadata> {
  const { day } = await params;
  const entry = getTripDay(day);
  if (!entry) return {};
  const image = entry.hero || entry.photos[0]?.src || "/travel/germany-switzerland-france/alpine-dispatch-og.png";
  return {
    title: `DAY ${entry.day}｜${entry.title}｜德瑞法現場影像誌`,
    description: entry.summary,
    alternates: { canonical: `/travel/germany-switzerland-france/day/${entry.day}/` },
    openGraph: {
      title: `DAY ${entry.day}｜${entry.title}`,
      description: entry.summary,
      url: `/travel/germany-switzerland-france/day/${entry.day}/`,
      images: [{ url: image, alt: entry.title }],
    },
  };
}

export default async function AlpineDayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const entry = getTripDay(day);
  if (!entry) notFound();

  const index = alpineDispatch.days.findIndex((item) => item.day === entry.day);
  const previous = index > 0 ? alpineDispatch.days[index - 1] : undefined;
  const next = index < alpineDispatch.days.length - 1 ? alpineDispatch.days[index + 1] : undefined;
  const embedUrl = youtubeEmbedUrl(entry.videoUrl);
  const hasMedia = Boolean(embedUrl || entry.photos.length);
  const hero = entry.hero || entry.photos[0]?.src || alpineDispatch.heroImage;
  const heroImage = hero.startsWith("http") ? hero : `${BASE_PATH}${hero}`;
  const gearItems = [
    ["CAMERA", entry.gear.camera],
    ["LENS", entry.gear.lens],
    ["FORMAT", entry.gear.format],
    ["CAPTURED", entry.gear.shotAt],
  ].filter(([, value]) => value);

  return (
    <main className={`alpine-day-page theme-${entry.theme}`}>
      <header className="alpine-day-nav">
        <a href={`${TRIP_PATH}/`}><span>YH</span><b>ALPINE ROUTE</b></a>
        <p>EXPEDITION {alpineDispatch.expedition} / DAY {entry.day}</p>
        <a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS ↗</a>
      </header>

      <section className="alpine-day-hero" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="alpine-day-hero-shade" />
        {!entry.hero && !entry.photos.length && <div className="alpine-day-concept-label">PRE-TRIP ROUTE VISUAL</div>}
        <div className="alpine-day-status"><i /><span>{dayStatusLabel(entry.status)}</span><b>{entry.publishedAt || "SEP–OCT 2026"}</b></div>
        <div className="alpine-day-title">
          <p>{entry.countryCode} / {entry.city}</p>
          <h1><span>DAY {entry.day}</span>{entry.title}</h1>
          <div>{entry.route.map((stop, routeIndex) => <span key={`${stop}-${routeIndex}`}>{stop}</span>)}</div>
        </div>
        <a className="alpine-day-down" href="#dispatch">TODAY&apos;S DISPATCH <span>↓</span></a>
      </section>

      <section className="alpine-day-intro" id="dispatch">
        <aside><span>FIELD NOTE / {entry.day}</span><b>{entry.country}</b><small>{entry.date || alpineDispatch.season}</small></aside>
        <div><h2>{entry.summary}</h2><p>{entry.note}</p></div>
      </section>

      <section className="alpine-day-route-strip" aria-label={`第 ${entry.day} 天路線`}>
        <p>ROUTE / DAY {entry.day}</p>
        <ol>{entry.route.map((stop, routeIndex) => <li key={`${stop}-${routeIndex}`}><span>{String(routeIndex + 1).padStart(2, "0")}</span><b>{stop}</b></li>)}</ol>
        <small>城市級位置於內容發佈後更新</small>
      </section>

      {embedUrl ? (
        <section className="alpine-day-film">
          <header><p>SAME DAY EDIT / FILM</p><span>HDR · 8K · YOUTUBE</span></header>
          <div className="alpine-film-frame"><iframe src={embedUrl} title={`DAY ${entry.day} ${entry.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          <p>DAY {entry.day} · {entry.city}<span>PLAY IN HDR WHEN AVAILABLE</span></p>
        </section>
      ) : (
        <section className="alpine-day-film alpine-day-film-pending">
          <header><p>SAME DAY EDIT / FILM</p><span>{entry.status === "editing" ? "EDITING NOW" : "COMING DURING THE JOURNEY"}</span></header>
          <div><span className="film-rail" /><p>今日影像整理中</p><small>{entry.status === "editing" ? "影片與照片正在整理；已完成的照片仍會先行顯示。" : "完成剪輯與上傳後，影片會直接出現在這個位置。"}</small></div>
        </section>
      )}

      {entry.photos.length ? (
        <section className="alpine-day-photos">
          <header><p>DAILY FRAMES / {String(entry.photos.length).padStart(2, "0")}</p><span>HDR PHOTO ESSAY</span></header>
          <div className="alpine-photo-grid">
            {entry.photos.map((photo, photoIndex) => (
              <figure key={`${photo.src}-${photoIndex}`} className={`orientation-${photo.orientation}`}>
                <img src={photo.src.startsWith("http") ? photo.src : `${BASE_PATH}${photo.src}`} alt={photo.alt} loading={photoIndex < 2 ? "eager" : "lazy"} />
                <figcaption><b>{String(photoIndex + 1).padStart(2, "0")}</b><p>{photo.caption || photo.alt}</p><span>{photo.hdr ? "HDR" : "SDR"}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <section className="alpine-photo-pending">
          <div><p>DAILY FRAMES</p><span>00 / 15</span></div>
          <h2>今日影像整理中</h2>
          <p>{hasMedia ? "影片已先行發佈，照片完成後會依拍攝節奏加入。" : "這裡不使用其他旅程的照片代替。當天選出的 HDR 影像會以全幅、雙欄與圖說軌完成編排。"}</p>
        </section>
      )}

      <section className="alpine-day-metadata">
        <header><p>CAPTURE DATA</p><span>LIGHTWEIGHT FIELD METADATA</span></header>
        <div>
          {gearItems.length ? gearItems.map(([label, value]) => <article key={label}><span>{label}</span><b>{value}</b></article>) : <p>拍攝器材與時間會在每日內容確認後補上。</p>}
        </div>
      </section>

      <nav className="alpine-day-switcher" aria-label="前後日誌">
        {previous ? <a href={`${TRIP_PATH}/day/${previous.day}/`}><span>← PREVIOUS</span><b>DAY {previous.day}</b><small>{previous.title}</small></a> : <span />}
        <a className="alpine-day-home" href={`${TRIP_PATH}/`}><span>ROUTE INDEX</span><b>12 DAYS</b></a>
        {next ? <a className="next" href={`${TRIP_PATH}/day/${next.day}/`}><span>NEXT →</span><b>DAY {next.day}</b><small>{next.title}</small></a> : <span />}
      </nav>

      <footer className="alpine-day-footer">
        <p>{alpineDispatch.titleEn}</p><span>{alpineDispatch.countriesEn}</span><small>YOUNG HUNG HDR STUDIO · EXPEDITION {alpineDispatch.expedition}</small>
      </footer>
    </main>
  );
}
