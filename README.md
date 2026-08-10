# Young HDR Gallery

HDR portfolio site for YouTube HDR videos, HDR photos, and travel journals.

Public site:

```text
https://younghdr.github.io/hdr-gallery/
```

## Local Preview

Preview the Next.js website locally:

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

`127.0.0.1` is local to your own computer. It is not a public GitHub preview URL.

## Local Admin

The admin tool is local-only and is not published to GitHub Pages.

### macOS 與 Windows 共用

Codex 只能看到目前電腦已開啟的本機資料夾；Windows 的 `C:\Users\HPOMEN\Documents\HDR` 不會直接出現在 Mac。兩台電腦以同一個 GitHub repository 同步：

```bash
# Mac 第一次設定
git clone <你的 GitHub repository 網址> ~/Documents/HDR
cd ~/Documents/HDR
npm ci
npm run admin
```

接著在 macOS Codex 使用「Open Folder」開啟 `~/Documents/HDR`，並瀏覽：

```text
http://127.0.0.1:4174/alpine-admin.html
```

預覽 Next.js 網站時，另開一個 Terminal 執行：

```bash
npm run dev
```

每日工作順序為 `git pull` → 加入當日照片與 YouTube 網址 → 儲存 → 預覽 → 確認發佈。照片必須放在 Mac 這份 clone 內，不可引用 Windows 的 `C:\...` 路徑。Mac 只需在整理、預覽與推送期間開機連網；Windows 不必保持開機。

日更控制台的發佈按鈕只會暫存 `data/alpine-dispatch.json` 與 `public/travel/germany-switzerland-france/`，不會把一般相簿尚未完成的修改混進同一筆 commit。Git 使用系統 `PATH`，也可以透過 `GIT_PATH` 指定執行檔，因此 macOS 與 Windows 共用同一套後台程式。

```powershell
.\local-tools\start-admin.ps1
```

Open:

```text
http://127.0.0.1:4174/admin.html
```

Use the admin tool to:

- Add HDR YouTube videos.
- Upload AVIF, Ultra HDR JPEG, or HEIC photos.
- Upload a whole photo folder into one topic.
- Add travel journal entries.
- Scan the `Photo/` folder for missing HDR photos.
- Save `site-data.js`.
- Publish to GitHub Pages when ready.

For iPhone upload on the same Wi-Fi, start the admin tool and type:

```text
iphone
```

Then open the LAN URL shown in PowerShell, for example:

```text
http://192.168.x.x:4174/admin.html
```

## HDR Photo Format

This site uses HDR-oriented originals directly instead of SDR preview files.

Recommended photo formats:

- `AVIF` for HDR-capable modern browsers.
- `JPG/JPEG` when exported as Ultra HDR JPEG with gain map.
- `HEIC/HEIF` for original iPhone HDR files, with browser support depending on the viewer device.

The photo gallery loads the original HDR file directly through `src` and `fullSrc`. This preserves HDR metadata better than browser canvas resizing, which can destroy Ultra HDR gain maps.

## GitHub Pages

GitHub Pages is free for normal public portfolio use. Keep the repository reasonably small and avoid publishing huge raw photo sets at once.

This project deploys through GitHub Actions. After pushing to GitHub, the workflow builds a static Next.js export and publishes it to:

```text
https://younghdr.github.io/hdr-gallery/
```

For a local GitHub Pages style build, run:

```powershell
npm run build:github
```

## Analytics and Music

The site supports optional GA4 analytics and a floating music player.

Set these GitHub repository variables in `Settings > Secrets and variables > Actions > Variables`:

```text
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MUSIC_SRC=/hdr-gallery/music/your-track.mp3
NEXT_PUBLIC_TRACKING_ENDPOINT=https://your-worker.your-subdomain.workers.dev/track
```

Tracked GA4 events:

- `page_view`: pages and routes.
- `photo_open`: which HDR photo visitors open.
- `film_embed_load`: which HDR film embed is loaded.
- `music_play`: when a visitor starts music.
- `music_pause`: when a visitor pauses music.

For music, put the audio file in `public/music/` locally, then use a GitHub Pages path such as `/hdr-gallery/music/ambient.mp3`.

### Private View Counter Backend

GitHub Pages cannot store view counts by itself because it is static hosting. For a private backend record, deploy the sample Cloudflare Worker in:

```text
tracking/cloudflare-worker.js
tracking/schema.sql
```

The worker stores every event in D1 and exposes:

```text
POST /track
GET /stats
```

Use `/stats` with:

```text
Authorization: Bearer YOUR_ADMIN_TOKEN
```

The stats response includes:

- total events and unique visitors
- top viewed photos
- music play and pause counts
- page views by path

Useful practical limits:

- Keep each published photo as small as you can while preserving HDR.
- Prefer curated albums instead of uploading every original shoot file.
- Test locally first, then publish only when the page looks right.

## Data File

Content lives in:

```text
site-data.js
```

Categories:

```text
3c
travel
photo
```
