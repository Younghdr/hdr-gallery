export const SITE_ORIGIN = "https://younghdr.github.io";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export function absUrl(path = ""): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
