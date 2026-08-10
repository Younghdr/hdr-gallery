const fs = require("fs");
const http = require("http");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const TOOL_ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "site-data.js");
const ALPINE_DATA_FILE = path.join(ROOT, "data", "alpine-dispatch.json");
const PORT = Number(process.env.PORT || 4174);
const HOST = process.env.HOST || "127.0.0.1";
const WINDOWS_GIT = "C:\\Program Files\\Git\\cmd\\git.exe";
const GIT = process.env.GIT_PATH || (process.platform === "win32" && fs.existsSync(WINDOWS_GIT) ? WINDOWS_GIT : "git");
const PREVIEW_PATHSPECS = [".next-preview-github*", ".preview-github*"];
const TEN_MB = 10 * 1024 * 1024;
const HUNDRED_MB = 100 * 1024 * 1024;

const TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".flac": "audio/flac",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function sendJson(res, status, body) {
  send(res, status, JSON.stringify(body, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function readSiteData() {
  const source = fs.readFileSync(DATA_FILE, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox);
  return sandbox.window.HDR_SITE_DATA;
}

function writeSiteData(data) {
  const output = `window.HDR_SITE_DATA = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(DATA_FILE, output, "utf8");
}

function readAlpineData() {
  return JSON.parse(fs.readFileSync(ALPINE_DATA_FILE, "utf8"));
}

function validateAlpineData(data) {
  const statuses = new Set(["planned", "editing", "published"]);
  if (!data || !Array.isArray(data.days) || data.days.length !== 12) {
    throw new Error("德瑞法資料必須包含 DAY 01 至 DAY 12。 ");
  }
  const days = new Set();
  for (const day of data.days) {
    if (!/^\d{2}$/.test(day.day) || days.has(day.day) || !statuses.has(day.status)) {
      throw new Error(`DAY ${day.day || "?"} 的日次或狀態不正確。`);
    }
    days.add(day.day);
    const publicLocation = [day.city, ...(Array.isArray(day.route) ? day.route : [])].join(" ");
    if (day.status === "published" && /(飯店|酒店|hotel|hostel|民宿|\b-?\d{1,3}\.\d{4,}\s*,\s*-?\d{1,3}\.\d{4,}\b)/i.test(publicLocation)) {
      throw new Error(`DAY ${day.day} 的公開位置包含住宿名稱或疑似精確座標，請改為城市／景點層級。`);
    }
  }
}

function writeAlpineData(data) {
  validateAlpineData(data);
  fs.writeFileSync(ALPINE_DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function splitBuffer(buffer, delimiter) {
  const parts = [];
  let start = 0;
  let index = buffer.indexOf(delimiter, start);

  while (index !== -1) {
    parts.push(buffer.subarray(start, index));
    start = index + delimiter.length;
    index = buffer.indexOf(delimiter, start);
  }

  parts.push(buffer.subarray(start));
  return parts;
}

function sanitizeName(name) {
  const ext = path.extname(name);
  const base = path
    .basename(name, ext)
    .replace(/[<>:"/\\|?*\x00-\x1f]+/g, "-")
    .replace(/^[\s.-]+|[\s.-]+$/g, "");
  const safeBase = base.length > 100 ? base.slice(0, 100) : base;
  return `${safeBase || "file"}-${Date.now()}${ext.toLowerCase()}`;
}

function parseMultipart(buffer, contentType) {
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!boundaryMatch) {
    throw new Error("Missing multipart boundary");
  }

  const boundary = Buffer.from(`--${boundaryMatch[1] || boundaryMatch[2]}`);
  return splitBuffer(buffer, boundary)
    .slice(1, -1)
    .map((part) => {
      let clean = part;
      if (clean.subarray(0, 2).toString() === "\r\n") clean = clean.subarray(2);
      if (clean.subarray(clean.length - 2).toString() === "\r\n") clean = clean.subarray(0, clean.length - 2);

      const marker = Buffer.from("\r\n\r\n");
      const headerEnd = clean.indexOf(marker);
      if (headerEnd < 0) return null;

      const headers = clean.subarray(0, headerEnd).toString("utf8");
      const content = clean.subarray(headerEnd + marker.length);
      const disposition = headers.match(/content-disposition:[^\n]+/i)?.[0] || "";
      const field = disposition.match(/name="([^"]+)"/)?.[1] || "";
      const filename = disposition.match(/filename="([^"]*)"/)?.[1] || "";
      const type = headers.match(/content-type:\s*([^\r\n]+)/i)?.[1] || "application/octet-stream";

      return { field, filename, type, content };
    })
    .filter(Boolean);
}

function runGit(args) {
  return execFileSync(GIT, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function untrackPreviewArtifacts() {
  const tracked = runGit(["ls-files", ...PREVIEW_PATHSPECS])
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  for (let index = 0; index < tracked.length; index += 100) {
    runGit(["rm", "--cached", "--ignore-unmatch", "--", ...tracked.slice(index, index + 100)]);
  }

  return tracked.length;
}

function isImageFile(file) {
  return [".avif", ".heic", ".heif", ".jpg", ".jpeg"].includes(
    path.extname(file).toLowerCase(),
  );
}

function isAlpineImageFile(file) {
  return [".avif", ".jpg", ".jpeg"].includes(path.extname(file).toLowerCase());
}

function isMusicFile(file) {
  return [".mp3", ".wav", ".ogg", ".flac", ".m4a", ".aac"].includes(
    path.extname(file).toLowerCase(),
  );
}

function cleanTitleFromFile(file) {
  return path
    .basename(file, path.extname(file))
    .replace(/-\d{10,}$/g, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function scanMissingPhotos(category = "photo", target = "photoDetails") {
  const photoDir = path.join(ROOT, "Photo");
  const data = readSiteData();
  data.photos = data.photos || [];
  if (!Array.isArray(data.photoDetails)) {
    data.photoDetails = data.photos.map((photo) => ({ ...photo }));
  }
  const targetList = target === "photos" ? data.photos : data.photoDetails;
  const allPhotos = [...data.photos, ...data.photoDetails];

  const known = new Set(
    allPhotos.flatMap((photo) => [photo.src, photo.fullSrc]).filter(Boolean).map((item) => item.replace(/\\/g, "/")),
  );

  const added = [];
  if (!fs.existsSync(photoDir)) return { data, added };

  for (const file of fs.readdirSync(photoDir)) {
    const fullPath = path.join(photoDir, file);
    if (!fs.statSync(fullPath).isFile() || !isImageFile(file)) continue;

    const sitePath = `Photo/${file}`;
    if (known.has(sitePath)) continue;

    // Make sure the file is also available to the Next.js public folder.
    const publicPhotoDir = path.join(ROOT, "public", "Photo");
    fs.mkdirSync(publicPhotoDir, { recursive: true });
    const publicPath = path.join(publicPhotoDir, file);
    if (!fs.existsSync(publicPath)) {
      fs.copyFileSync(fullPath, publicPath);
    }

    const item = {
      title: cleanTitleFromFile(file),
      category,
      src: sitePath,
      fullSrc: sitePath,
      description: "HDR photo work.",
      meta: "AVIF / Ultra HDR JPEG / HEIC original",
    };

    targetList.unshift(item);
    added.push(item);
  }

  return { data, added };
}

async function handleApi(req, res) {
  const requestUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const apiPath = requestUrl.pathname;

  if (apiPath === "/api/alpine" && req.method === "GET") {
    return sendJson(res, 200, readAlpineData());
  }

  if (apiPath === "/api/alpine" && req.method === "POST") {
    const payload = JSON.parse((await readBody(req)).toString("utf8"));
    writeAlpineData(payload);
    return sendJson(res, 200, { ok: true });
  }

  if (apiPath === "/api/alpine-upload" && req.method === "POST") {
    const dayNumber = requestUrl.searchParams.get("day") || "";
    if (!/^\d{2}$/.test(dayNumber) || !readAlpineData().days.some((day) => day.day === dayNumber)) {
      return sendJson(res, 400, { ok: false, error: "日次必須是 DAY 01 至 DAY 12。" });
    }
    const body = await readBody(req);
    const parts = parseMultipart(body, req.headers["content-type"] || "");
    const folder = path.join(ROOT, "public", "travel", "germany-switzerland-france", `day-${dayNumber}`);
    fs.mkdirSync(folder, { recursive: true });
    const saved = [];
    for (const part of parts) {
      if (!part.filename || !part.content.length) continue;
      if (!isAlpineImageFile(part.filename)) {
        throw new Error(`${part.filename} 不是支援的 AVIF／JPEG 照片。影片請使用 YouTube 網址。`);
      }
      if (part.content.length >= HUNDRED_MB) {
        throw new Error(`${part.filename} 已達 GitHub 100 MB 單檔限制，請先最佳化後再上傳。`);
      }
      const filename = sanitizeName(part.filename);
      fs.writeFileSync(path.join(folder, filename), part.content);
      const warning = part.content.length > TEN_MB ? `${part.filename} 超過 10 MB，建議輸出較小的 Web 版本。` : "";
      saved.push({
        warning,
        photo: {
          src: `/travel/germany-switzerland-france/day-${dayNumber}/${filename}`,
          alt: cleanTitleFromFile(part.filename),
          caption: "",
          orientation: "landscape",
          hdr: true,
        },
      });
    }
    return sendJson(res, 200, { ok: true, files: saved });
  }

  if (apiPath === "/api/data" && req.method === "GET") {
    return sendJson(res, 200, readSiteData());
  }

  if (apiPath === "/api/data" && req.method === "POST") {
    const payload = JSON.parse((await readBody(req)).toString("utf8"));
    writeSiteData(payload);
    return sendJson(res, 200, { ok: true });
  }

  if (apiPath === "/api/upload" && req.method === "POST") {
    const body = await readBody(req);
    const parts = parseMultipart(body, req.headers["content-type"] || "");
    const saved = [];

    for (const part of parts) {
      if (!part.filename || !part.content.length) continue;

      const folder = path.join(ROOT, "Photo");
      fs.mkdirSync(folder, { recursive: true });
      const filename = sanitizeName(part.filename);
      const fullPath = path.join(folder, filename);
      fs.writeFileSync(fullPath, part.content);

      // Keep public/Photo in sync so the Next.js site can serve the file too.
      if (isImageFile(part.filename)) {
        const publicFolder = path.join(ROOT, "public", "Photo");
        fs.mkdirSync(publicFolder, { recursive: true });
        fs.copyFileSync(fullPath, path.join(publicFolder, filename));
      }

      saved.push({
        field: part.field,
        type: part.type,
        path: path.relative(ROOT, fullPath).replace(/\\/g, "/"),
      });
    }

    return sendJson(res, 200, { ok: true, files: saved });
  }

  if (apiPath === "/api/upload-music" && req.method === "POST") {
    const body = await readBody(req);
    const parts = parseMultipart(body, req.headers["content-type"] || "");
    const saved = [];

    for (const part of parts) {
      if (!part.filename || !part.content.length) continue;
      if (!isMusicFile(part.filename)) continue;

      const folder = path.join(ROOT, "public", "music");
      fs.mkdirSync(folder, { recursive: true });
      const filename = sanitizeName(part.filename);
      const fullPath = path.join(folder, filename);
      fs.writeFileSync(fullPath, part.content);
      const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");
      const publicPath = relativePath.replace(/^public\//, "");
      saved.push({
        field: part.field,
        type: part.type,
        path: publicPath,
        originalName: part.filename,
      });
    }

    return sendJson(res, 200, { ok: true, files: saved });
  }

  if (apiPath === "/api/stats" && req.method === "GET") {
    const trackingEndpoint = process.env.TRACKING_ENDPOINT || "";
    const trackingToken = process.env.TRACKING_ADMIN_TOKEN || "";

    if (!trackingEndpoint) {
      return sendJson(res, 200, {
        ok: true,
        configured: false,
        message: "Tracking endpoint is not configured. Set TRACKING_ENDPOINT in your .env file.",
      });
    }

    try {
      const statsUrl = new URL("/stats", trackingEndpoint).toString();
      const headers = trackingToken ? { Authorization: `Bearer ${trackingToken}` } : {};
      const response = await fetch(statsUrl, { headers });
      const payload = await response.json();

      if (!response.ok) {
        return sendJson(res, response.status, {
          ok: false,
          configured: true,
          error: payload.error || "Failed to fetch stats",
        });
      }

      return sendJson(res, 200, { ok: true, configured: true, ...payload });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        configured: true,
        error: error.message || "Failed to fetch stats",
      });
    }
  }

  if (apiPath === "/api/scan-photos" && req.method === "POST") {
    const payload = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    const { data, added } = scanMissingPhotos(payload.category || "photo", payload.target || "photoDetails");
    writeSiteData(data);
    return sendJson(res, 200, { ok: true, added });
  }

  if (apiPath === "/api/publish" && req.method === "POST") {
    const payload = JSON.parse((await readBody(req)).toString("utf8") || "{}");
    const message = payload.message || "Update HDR gallery";
    const logs = [];

    try {
      logs.push(runGit(["status", "--short"]));
      if (payload.scope === "alpine") {
        runGit(["add", "--", "data/alpine-dispatch.json", "public/travel/germany-switzerland-france"]);
        logs.push("Staged only Alpine Dispatch data and media.");
      } else {
        runGit(["add", "-A"]);
        const untrackedPreviewCount = untrackPreviewArtifacts();
        if (untrackedPreviewCount) {
          logs.push(`Removed ${untrackedPreviewCount} local preview build artifact(s) from Git tracking.`);
        }
      }
      try {
        logs.push(runGit(["commit", "-m", message]));
      } catch (error) {
        const output = `${error.stdout || ""}${error.stderr || ""}`;
        if (!output.includes("nothing to commit")) throw error;
        logs.push(output);
      }
      logs.push(runGit(["push"]));
      return sendJson(res, 200, { ok: true, logs: logs.join("\n") });
    } catch (error) {
      return sendJson(res, 500, {
        ok: false,
        error: `${error.message}\n${error.stdout || ""}${error.stderr || ""}`,
      });
    }
  }

  return sendJson(res, 404, { ok: false, error: "Unknown API route" });
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const localToolFiles = new Set([
    "/admin.html",
    "/admin.js",
    "/alpine-admin.html",
    "/alpine-admin.js",
    "/alpine-admin.css",
  ]);
  const base = localToolFiles.has(pathname) ? TOOL_ROOT : ROOT;
  const filePath = path.normalize(path.join(base, pathname.replace(/^\/+/, "")));

  if (!filePath.startsWith(base)) {
    return send(res, 403, "Forbidden", "text/plain; charset=utf-8");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      return send(res, 404, "Not found", "text/plain; charset=utf-8");
    }

    send(res, 200, content, TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream");
  });
}

http
  .createServer((req, res) => {
    if (req.url.startsWith("/api/")) {
      handleApi(req, res).catch((error) => sendJson(res, 500, { ok: false, error: error.message }));
      return;
    }

    serveStatic(req, res);
  })
  .listen(PORT, HOST, () => {
    console.log(`HDR admin is running at http://${HOST}:${PORT}/admin.html`);
    console.log(`Alpine Dispatch is running at http://${HOST}:${PORT}/alpine-admin.html`);
  });
