import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  output: isGithubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGithubPages,
  reactStrictMode: true,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;
