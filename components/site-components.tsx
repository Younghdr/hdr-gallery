"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MusicPlayer } from "@/components/music-player";
import { trackEvent } from "@/components/analytics";
import type { JournalItem, MusicItem, PhotoItem, VideoItem } from "@/lib/site-data";
import { brand, copy, navItems } from "@/lib/copy";

type MotionProps = {
  children: React.ReactNode;
  className?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function photoPath(photo: PhotoItem) {
  const src = photo.fullSrc || photo.src;
  if (/^https?:\/\//.test(src)) return src;
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (basePath && normalized.startsWith(`${basePath}/`)) return normalized;
  return `${basePath}${normalized}`;
}

function appHref(href: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${href}`;
}

function youtubeId(input = "") {
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.split("/").filter(Boolean)[0] || "";
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/").filter(Boolean)[1] || "";
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/").filter(Boolean)[1] || "";
    return url.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

export function Reveal({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SiteFrame({ children, music }: { children: React.ReactNode; music?: MusicItem[] }) {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      {children}
      <MusicPlayer playlist={music} />
      <Footer />
    </div>
  );
}

function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href="/" className="min-w-0">
          <span className="block text-sm font-semibold tracking-[0.18em] text-pearl">{brand.name}</span>
          <span className="block text-xs text-mist">{brand.taglineEn}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active ? "bg-white/12 text-pearl" : "text-mist hover:bg-white/8 hover:text-pearl"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-gold">{brand.name}</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist">{copy.footer.zh}</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-mist">{copy.footer.en}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-mist transition hover:text-pearl">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
        <span>© Young Hung HDR Studio. All rights reserved.</span>
        <span>{brand.keywords}</span>
      </div>
    </footer>
  );
}

export function Hero({ image }: { image: string }) {
  return (
    <section className="relative min-h-[92vh] px-5 pb-16 pt-32 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,13,0.86),rgba(7,9,13,0.2)_58%,rgba(7,9,13,0.82))]" />
      </div>
      <motion.div
        className="mx-auto flex min-h-[72vh] max-w-7xl items-end"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{copy.hero.eyebrow}</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight text-pearl md:text-7xl lg:text-8xl">{copy.hero.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-pearl md:text-2xl">{copy.hero.zh}</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-mist md:text-lg">{copy.hero.en}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:scale-[1.03]" href="/photography">
              {copy.hero.primary} / {copy.hero.primaryZh}
            </Link>
            <Link className="glass rounded-full px-6 py-3 text-sm font-semibold text-pearl transition hover:scale-[1.03]" href="/films">
              {copy.hero.secondary} / {copy.hero.secondaryZh}
            </Link>
            <Link className="glass rounded-full px-6 py-3 text-sm font-semibold text-pearl transition hover:scale-[1.03]" href="/journal">
              {copy.hero.tertiary} / {copy.hero.tertiaryZh}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  titleZh,
  subtitle,
  subtitleZh,
}: {
  eyebrow?: string;
  title: string;
  titleZh: string;
  subtitle?: string;
  subtitleZh?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-semibold text-pearl md:text-5xl">{title}</h2>
      <p className="mt-2 text-2xl font-semibold text-pearl/85">{titleZh}</p>
      {subtitleZh ? <p className="mt-5 text-base leading-8 text-mist">{subtitleZh}</p> : null}
      {subtitle ? <p className="mt-2 text-base leading-8 text-mist">{subtitle}</p> : null}
    </Reveal>
  );
}

export function PortfolioPaths({ image }: { image: string }) {
  const items = [
    { ...copy.portfolio.photography, href: "/photography", image },
    { ...copy.portfolio.films, href: "/films", image },
  ];

  return (
    <section className="px-5 py-24 lg:px-8">
      <SectionHeader
        eyebrow="Portfolio"
        title={copy.portfolio.title}
        titleZh={copy.portfolio.titleZh}
        subtitle={copy.portfolio.subtitle}
        subtitleZh={copy.portfolio.subtitleZh}
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.href}>
            <Link href={item.href} className="group glass block overflow-hidden rounded-[8px]">
              <div className="relative h-[24rem] overflow-hidden">
                <img src={item.image} alt="" className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">0{index + 1}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-pearl">{item.title}</h3>
                  <p className="mt-1 text-xl font-semibold text-pearl/80">{item.titleZh}</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-mist">{item.subtitleZh}</p>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-mist">{item.subtitle}</p>
                  <span className="mt-6 inline-flex rounded-full bg-white/12 px-4 py-2 text-sm text-pearl">
                    {item.cta} / {item.ctaZh}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PhotoMasonry({ photos }: { photos: PhotoItem[] }) {
  return (
    <div className="masonry mx-auto mt-12 w-full px-4 lg:px-8 xl:px-12">
      {photos.map((photo, index) => (
        <motion.a
          key={`${photoPath(photo)}-${index}`}
          href={appHref(`/photography?photo=${encodeURIComponent(photoPath(photo))}`)}
          onClick={() =>
            trackEvent("photo_open", {
              photo_title: photo.title || "HDR Frame",
              photo_src: photoPath(photo),
            })
          }
          className="group mb-4 block break-inside-avoid overflow-hidden rounded-[8px] border border-white/10 bg-white/8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.32) }}
          whileHover={{ y: -4 }}
        >
          <img src={photoPath(photo)} alt={photo.title} className="w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">HDR Photography</p>
            <h3 className="mt-2 text-lg font-semibold text-pearl">{photo.title || "HDR Frame"}</h3>
            {photo.description ? <p className="mt-2 text-sm leading-6 text-mist">{photo.description}</p> : null}
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export function FilmGrid({ films }: { films: VideoItem[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-2">
      {films.map((film, index) => {
        const id = youtubeId(film.youtube);
        return (
          <Reveal key={`${film.youtube}-${index}`}>
            <article className="glass overflow-hidden rounded-[8px]">
              <div className="aspect-video bg-black">
                {id ? (
                  <iframe
                    onLoad={() =>
                      trackEvent("film_embed_load", {
                        film_title: film.title,
                        youtube_id: id,
                      })
                    }
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&vq=highres`}
                    title={film.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : null}
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">HDR Films</p>
                <h3 className="mt-2 text-2xl font-semibold text-pearl">{film.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{film.description || "Films crafted for HDR playback and luminous screens."}</p>
                <a
                  href={film.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("film_youtube_click", {
                      film_title: film.title,
                      youtube_url: film.youtube,
                    })
                  }
                  className="mt-5 inline-flex items-center justify-center rounded-[8px] bg-white/10 px-5 py-3 text-sm font-semibold text-pearl transition hover:bg-white/20"
                >
                  觀看 YouTube HDR
                </a>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function PageIntro({
  title,
  titleZh,
  subtitle,
  subtitleZh,
  intro,
  introZh,
}: {
  title: string;
  titleZh: string;
  subtitle: string;
  subtitleZh: string;
  intro?: string;
  introZh?: string;
}) {
  return (
    <section className="px-5 pb-14 pt-32 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{brand.keywords}</p>
        <h1 className="mt-5 text-5xl font-semibold text-pearl md:text-7xl">{title}</h1>
        <p className="mt-2 text-3xl font-semibold text-pearl/85">{titleZh}</p>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-pearl/90">{subtitleZh}</p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-mist">{subtitle}</p>
        {introZh ? <p className="mt-8 max-w-4xl text-base leading-8 text-mist">{introZh}</p> : null}
        {intro ? <p className="mt-3 max-w-4xl text-base leading-8 text-mist">{intro}</p> : null}
      </Reveal>
    </section>
  );
}

export function JournalList({ items }: { items: JournalItem[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={`${item.title}-${index}`}>
          <article className="glass overflow-hidden rounded-[8px]">
            {item.cover ? <img src={item.cover} alt={item.title} className="h-72 w-full object-cover opacity-85" /> : null}
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{item.date || "Field Notes"}</p>
              <h3 className="mt-2 text-2xl font-semibold text-pearl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{item.description || "A note on travel, light, and the imaging process."}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function TextPanel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
      <div className="glass rounded-[8px] p-7 md:p-10">{children}</div>
    </Reveal>
  );
}
