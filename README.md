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
