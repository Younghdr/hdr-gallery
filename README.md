# Young HDR Gallery

這是你的 HDR 影片與相片展示網站。

公開網址：

```text
https://younghdr.github.io/hdr-gallery/
```

## 平常先本機預覽

不會消耗 Netlify，也不會立刻發布到網路。

```powershell
.\start-local-preview.ps1
```

瀏覽器會開啟：

```text
http://127.0.0.1:4173
```

## GUI 管理後台

之後更新網站建議用 GUI 後台：

```powershell
.\local-tools\start-admin.ps1
```

瀏覽器會開啟：

```text
http://127.0.0.1:4174/admin.html
```

後台可以做：

- 新增 YouTube HDR 影片
- 上傳 HDR 相片
- 選擇整個相片資料夾批次加入
- 自動產生 WebP 預覽圖
- 分類到 3C / 旅遊 / 拍照
- 新增遊記
- 儲存到 `site-data.js`
- 一鍵發布到 GitHub Pages

後台只綁定 `127.0.0.1`，是本機工具，不會公開到網路。

如果要用 iPhone 上傳 HDR 相片：

```powershell
.\local-tools\start-admin.ps1
```

啟動時輸入：

```text
iphone
```

電腦和 iPhone 必須在同一個 Wi-Fi。PowerShell 會顯示一個像這樣的網址：

```text
http://192.168.x.x:4174/admin.html
```

用 iPhone Safari 打開這個網址，就可以直接從 iPhone 選 HDR 相片上傳。完成後在後台按「發布到 GitHub Pages」。

## GitHub Pages 費用與限制

目前使用 public repository 發布 GitHub Pages 不需要付費。

但 GitHub Pages 有使用限制，適合個人作品集，不適合當大量圖片 CDN：

```text
Repository 建議 1 GB 以內
發布後網站大小上限 1 GB
每月 soft bandwidth 約 100 GB
每小時 soft build limit 約 10 次
```

所以建議：

- 平常先本機預覽
- 累積幾次修改後再發布
- 相片用 WebP 預覽圖，原始 HDR 圖只在點開時載入
- 大量相片一次不要上傳太多，建議 10-30 張一批

## HDR 相片大小建議

相片展示建議分成兩份：

- 原始 HDR 檔：保留完整品質，讓使用者點開觀看。
- 網頁預覽圖：長邊 1600-2400px，速度與畫質比較平衡。

建議尺寸：

```text
1600px：載入最快，適合大量相片
2048px：平衡速度與畫質，最推薦
2400px：高畫質展示，但檔案較大
```

建議檔案大小：

```text
預覽圖：每張 0.5-2 MB
原始 HDR：可以保留較大檔案，但不要一次放太多張在首頁
```

相片頁面會先顯示馬賽克相簿牆，讓訪客快速看到整批作品氛圍；下方再列出每張相片卡片。

## 使用相片縮小工具

本機預覽時開啟：

```text
http://127.0.0.1:4173/photo-resizer.html
```

或在網站右上角點「相片工具」。

注意：瀏覽器產生的縮圖通常會變成 SDR 預覽圖。這是為了速度；原始 HDR 檔請仍放在 `Photo/`，讓訪客點開觀看完整版本。

## 快速更換 YouTube HDR 影片

執行：

```powershell
.\quick-youtube.ps1
```

依提示貼上 YouTube 連結、標題、分類。

分類可用：

```text
3c
travel
photo
```

資料會寫入：

```text
site-data.js
```

## 發布到 GitHub Pages

確認本機預覽沒問題後再發布：

```powershell
.\publish-github.ps1
```

GitHub Pages 通常 1-3 分鐘後更新。

## 手動新增內容

所有內容集中在：

```text
site-data.js
```

影片放在 `videos`，相片放在 `photos`。網站會自動依 `category` 分到 `3C / 旅遊 / 拍照` 主題。
