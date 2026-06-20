const fs = require("fs");
const vm = require("vm");

const DATA_FILE = "site-data.js";

function readData() {
  const source = fs.readFileSync(DATA_FILE, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.HDR_SITE_DATA;
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, `window.HDR_SITE_DATA = ${JSON.stringify(data, null, 2)};\n`);
}

function arg(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] || fallback : fallback;
}

function help() {
  console.log(`Usage:
  node manage-site.js video --url <youtube-url> --title <title> --category <3c|travel|photo> [--description <text>] [--featured yes]

Examples:
  node manage-site.js video --url https://youtu.be/abc123 --title "New HDR video" --category 3c --featured yes
`);
}

const command = process.argv[2];

if (command !== "video") {
  help();
  process.exit(command ? 1 : 0);
}

const url = arg("url");
const title = arg("title", "New HDR Video");
const category = arg("category", "3c");
const description = arg(
  "description",
  "HDR 影片展示。嵌入頁可預覽，正式 HDR 觀看建議開啟 YouTube 官方播放器。",
);
const featured = arg("featured", "yes").toLowerCase() !== "no";

if (!url) {
  console.error("Missing --url");
  process.exit(1);
}

const data = readData();
data.videos = data.videos || [];

const existing = data.videos.find((video) => video.youtube === url);
if (existing) {
  existing.title = title;
  existing.category = category;
  existing.description = description;
} else {
  data.videos.unshift({ title, category, youtube: url, description });
}

if (featured) {
  data.featuredVideo = url;
}

writeData(data);
console.log(`Updated ${DATA_FILE}`);
