import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

export type PhotoItem = {
  title: string;
  category?: string;
  src: string;
  fullSrc?: string;
  sdrSrc?: string;
  description?: string;
  meta?: string;
};

export type VideoItem = {
  title: string;
  category?: string;
  youtube: string;
  description?: string;
};

export type JournalPhoto = {
  src: string;
  alt?: string;
  caption?: string;
};

export type JournalSection = {
  heading: string;
  body: string;
  photos?: (string | JournalPhoto)[];
};

export type JournalArticle = {
  title: string;
  subtitle?: string;
  date?: string;
  category?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  hero?: string;
  video?: string;
  intro?: string;
  stats?: string[];
  sections?: JournalSection[];
  gallery?: (string | JournalPhoto)[];
};

export type JournalItem = {
  title: string;
  category?: string;
  cover?: string;
  description?: string;
  date?: string;
  url?: string;
};

export type MusicItem = {
  title: string;
  src: string;
};

export type TestItem = {
  title: string;
  category?: string;
  items: string[];
};

export type SiteData = {
  categories?: { id: string; label: string }[];
  featuredVideo?: string;
  featuredHero?: string;
  photos?: PhotoItem[];
  photoDetails?: PhotoItem[];
  photoComparisons?: PhotoItem[];
  videos?: VideoItem[];
  travelNotes?: JournalItem[];
  music?: MusicItem[];
  tests?: TestItem[];
};

const fallbackPhoto: PhotoItem = {
  title: "HDR Frame",
  src: "/Photo/2Y6A8536.avif",
  fullSrc: "/Photo/2Y6A8536.avif",
  description: "A quiet study of light, contrast, and preserved detail.",
  meta: "HDR Photography",
};

function withLeadingSlash(src = "") {
  if (!src) return "";
  if (/^https?:\/\//.test(src)) return src;
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${normalized}`;
}

export function photoSrc(photo: PhotoItem) {
  return withLeadingSlash(photo.fullSrc || photo.src);
}

export function getSiteData(): SiteData {
  const file = path.join(process.cwd(), "site-data.js");

  try {
    const source = fs.readFileSync(file, "utf8");
    const sandbox = { window: {} as { HDR_SITE_DATA?: SiteData } };
    vm.createContext(sandbox);
    vm.runInContext(source, sandbox);
    return sandbox.window.HDR_SITE_DATA || {};
  } catch {
    return {};
  }
}

export function getPhotographyItems() {
  const data = getSiteData();
  const homepage = data.photos || [];
  const details = data.photoDetails || homepage;
  return {
    homepage: homepage.length ? homepage : [fallbackPhoto],
    details: details.length ? details : homepage.length ? homepage : [fallbackPhoto],
  };
}

export function getPhotoComparisons() {
  const data = getSiteData();
  return data.photoComparisons || [];
}

export function getFilmItems() {
  const data = getSiteData();
  return data.videos || [];
}

export function getJournalItems() {
  const data = getSiteData();
  return data.travelNotes || [];
}

export function getMusicItems() {
  const data = getSiteData();
  return data.music || [];
}

export function getTestItems() {
  const data = getSiteData();
  return data.tests || [];
}

export function getFeaturedHeroImage() {
  const data = getSiteData();
  if (data.featuredHero) {
    return photoSrc({ title: "Featured", src: data.featuredHero, fullSrc: data.featuredHero });
  }
  const { homepage, details } = getPhotographyItems();
  return photoSrc(homepage[0] || details[0] || fallbackPhoto);
}

export function getJournalData(): Record<string, JournalArticle> {
  const file = path.join(process.cwd(), "journal-data.js");

  try {
    const source = fs.readFileSync(file, "utf8");
    const sandbox = { window: {} as { HDR_JOURNAL_DATA?: Record<string, JournalArticle> } };
    vm.createContext(sandbox);
    vm.runInContext(source, sandbox);
    return sandbox.window.HDR_JOURNAL_DATA || {};
  } catch {
    return {};
  }
}

export function getJournalArticle(id: string): JournalArticle | null {
  const data = getJournalData();
  return data[id] || null;
}

export function youtubeId(input = "") {
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
