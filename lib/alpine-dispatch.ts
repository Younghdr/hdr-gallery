import rawTrip from "@/data/alpine-dispatch.json";

export type TripStatus = "planned" | "editing" | "published";
export type TripTheme = "germany" | "france" | "switzerland";
export type TripPhotoOrientation = "landscape" | "portrait" | "square";

export type TripPhoto = {
  src: string;
  alt: string;
  caption: string;
  orientation: TripPhotoOrientation;
  hdr: boolean;
};

export type TripGear = {
  camera: string;
  lens: string;
  format: string;
  shotAt: string;
};

export type TripDay = {
  day: string;
  date: string;
  status: TripStatus;
  theme: TripTheme;
  country: string;
  countryCode: string;
  city: string;
  route: string[];
  title: string;
  summary: string;
  note: string;
  hero: string;
  videoUrl: string;
  photos: TripPhoto[];
  gear: TripGear;
  publishedAt: string;
};

export type AlpineDispatch = {
  expedition: string;
  season: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  countriesEn: string;
  region: string;
  heroImage: string;
  heroAlt: string;
  heroCredit: string;
  intro: string;
  story: string[];
  footerLines: string[];
  days: TripDay[];
};

export const alpineDispatch = rawTrip as AlpineDispatch;

export function getTripDay(day: string): TripDay | undefined {
  return alpineDispatch.days.find((entry) => entry.day === day.padStart(2, "0"));
}

export function getPublishedDays(): TripDay[] {
  return alpineDispatch.days.filter((day) => day.status === "published");
}

export function getLatestActiveDay(): TripDay | undefined {
  return [...alpineDispatch.days]
    .reverse()
    .find((day) => day.status === "published" || day.status === "editing");
}

export function youtubeEmbedUrl(url: string): string {
  const value = url.trim();
  if (!value) return "";
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return `https://www.youtube-nocookie.com/embed/${value}`;

  try {
    const parsed = new URL(value);
    let id = "";
    if (parsed.hostname.includes("youtu.be")) id = parsed.pathname.split("/").filter(Boolean)[0] || "";
    else if (parsed.pathname.startsWith("/shorts/") || parsed.pathname.startsWith("/embed/")) {
      id = parsed.pathname.split("/").filter(Boolean)[1] || "";
    } else id = parsed.searchParams.get("v") || "";
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : "";
  } catch {
    return "";
  }
}

export function dayStatusLabel(status: TripStatus): string {
  if (status === "published") return "已發佈";
  if (status === "editing") return "影像整理中";
  return "行程預告";
}

export const alpineRouteStops = [
  { label: "法蘭克福", country: "DE", x: 18, y: 17 },
  { label: "海德堡", country: "DE", x: 25, y: 29 },
  { label: "史特拉斯堡", country: "FR", x: 18, y: 46 },
  { label: "科瑪", country: "FR", x: 22, y: 58 },
  { label: "伯恩", country: "CH", x: 44, y: 62 },
  { label: "策馬特", country: "CH", x: 48, y: 84 },
  { label: "安德瑪特", country: "CH", x: 64, y: 68 },
  { label: "茵特拉根", country: "CH", x: 51, y: 54 },
  { label: "少女峰", country: "CH", x: 55, y: 71 },
  { label: "盧森", country: "CH", x: 69, y: 49 },
  { label: "蘇黎世", country: "CH", x: 79, y: 34 },
  { label: "蒂蒂湖", country: "DE", x: 42, y: 28 },
  { label: "斯圖加特", country: "DE", x: 49, y: 13 }
] as const;
