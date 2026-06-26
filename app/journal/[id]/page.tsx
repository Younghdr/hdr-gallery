import { notFound } from "next/navigation";
import { getJournalArticle, getJournalItems, getMusicItems } from "@/lib/site-data";
import type { JournalPhoto, JournalSection, JournalArticle } from "@/lib/site-data";
import { SiteFrame } from "@/components/site-components";

export function generateStaticParams() {
  const items = getJournalItems();
  return items
    .map((item) => {
      if (!item.url) return null;
      try {
        const url = new URL(item.url, "http://localhost");
        return { id: url.searchParams.get("id") || "" };
      } catch {
        return null;
      }
    })
    .filter((param): param is { id: string } => Boolean(param?.id));
}

function normalizePhoto(photo: string | JournalPhoto, fallbackAlt: string): JournalPhoto {
  if (typeof photo === "string") {
    return { src: photo, alt: fallbackAlt, caption: "" };
  }
  return {
    src: photo.src,
    alt: photo.alt || photo.caption || fallbackAlt,
    caption: photo.caption || "",
  };
}

function imageSrc(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${normalized}`;
}

function PhotoFigure({ photo, fallbackAlt }: { photo: string | JournalPhoto; fallbackAlt: string }) {
  const item = normalizePhoto(photo, fallbackAlt);
  return (
    <figure className="overflow-hidden rounded-[8px] border border-white/10 bg-white/8">
      <img src={imageSrc(item.src)} alt={item.alt} className="w-full" loading="lazy" decoding="async" />
      {item.caption ? <figcaption className="px-4 py-3 text-sm leading-6 text-mist">{item.caption}</figcaption> : null}
    </figure>
  );
}

export default async function JournalArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = getJournalArticle(id);
  if (!article) notFound();

  const usedPhotoSources = new Set<string>();

  return (
    <SiteFrame music={getMusicItems()}>
      <article className="px-5 pb-24 pt-32 lg:px-8">
        <header className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Travel Journal</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-pearl md:text-5xl lg:text-6xl">{article.title}</h1>
          {article.subtitle ? <p className="mt-3 text-xl text-pearl/85">{article.subtitle}</p> : null}
          {article.date ? <p className="mt-4 text-sm text-mist">{article.date}</p> : null}
          {article.sourceUrl ? (
            <div className="mt-6">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-pearl transition hover:bg-white/15 hover:text-gold"
              >
                {article.sourceTitle || "Read original"}
              </a>
            </div>
          ) : null}
        </header>

        {article.hero ? (
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[12px]">
            <img src={imageSrc(article.hero)} alt={article.title} className="w-full" />
          </div>
        ) : null}

        <section className="mx-auto mt-12 max-w-4xl">
          {article.intro ? <p className="text-lg leading-9 text-pearl/90">{article.intro}</p> : null}
          {article.stats?.length ? (
            <ul className="mt-6 space-y-2 border-l-2 border-gold/60 pl-5 text-lg text-mist">
              {article.stats.map((stat, index) => (
                <li key={index}>{stat}</li>
              ))}
            </ul>
          ) : null}
        </section>

        {article.video ? (
          <section className="mx-auto mt-12 max-w-5xl">
            <div className="aspect-video overflow-hidden rounded-[12px] bg-black">
              <iframe
                className="h-full w-full"
                src={article.video}
                title={`${article.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}

        {article.sections?.map((section: JournalSection, index: number) => {
          for (const photo of section.photos || []) {
            usedPhotoSources.add(normalizePhoto(photo, article.title).src);
          }
          return (
            <section key={index} className="mx-auto mt-14 max-w-4xl">
              <h2 className="text-2xl font-semibold text-pearl md:text-3xl">{section.heading}</h2>
              <p className="mt-4 text-lg leading-9 text-mist">{section.body}</p>
              {section.photos?.length ? (
                <div className="mt-6 grid gap-5">
                  {section.photos.map((photo, photoIndex) => (
                    <PhotoFigure key={photoIndex} photo={photo} fallbackAlt={article.title} />
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}

        {(() => {
          const remainingPhotos = (article.gallery || []).filter((photo) => {
            return !usedPhotoSources.has(normalizePhoto(photo, article.title).src);
          });
          if (!remainingPhotos.length) return null;
          return (
            <section className="mx-auto mt-16 max-w-5xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Selected Frames</p>
              <h2 className="mt-3 text-3xl font-semibold text-pearl">Selected Frames</h2>
              <div className="mt-6 columns-1 gap-4 md:columns-2 lg:columns-3">
                {remainingPhotos.map((photo, index) => (
                  <div key={index} className="mb-4 break-inside-avoid">
                    <PhotoFigure photo={photo} fallbackAlt={article.title} />
                  </div>
                ))}
              </div>
            </section>
          );
        })()}
      </article>
    </SiteFrame>
  );
}
