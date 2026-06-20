# HDR Website Local Preview

平常先用本機預覽，不會消耗 Netlify 點數。

## 本機預覽

在 PowerShell 執行：

```powershell
.\start-local-preview.ps1
```

瀏覽器會開啟：

```text
http://127.0.0.1:4173
```

預覽完成後，在 PowerShell 視窗按 `Ctrl+C` 停止伺服器。

## 什麼時候才部署

只有在畫面確認完成、真的要讓外部看到時，才執行 Netlify 部署。這樣可以避免一直消耗 Netlify credit。

## GitHub Pages 實驗

GitHub Pages 可以用 public repository 免費發布這個靜態網站。

建議 repository 名稱：

```text
hdr-gallery
```

上傳時請把發布包資料夾內的檔案放在 repository 根目錄，必須能直接看到：

```text
index.html
styles.css
script.js
.nojekyll
Photo/2Y6A8536.avif
```

啟用位置：

```text
Settings -> Pages -> Deploy from a branch -> main -> /root
```

完成後網址通常是：

```text
https://你的GitHub帳號.github.io/hdr-gallery/
```
