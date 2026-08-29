---
name: remotion-d3
description: Use when building or revising Remotion compositions in this project that visualize data with D3 scales, axes, shapes, maps, charts, force layouts, SVG, or frame-driven data animation.
---

# Remotion + D3

使用 D3 計算資料、尺度與 SVG 幾何，由 React 宣告式輸出畫面，並讓 Remotion frame 成為唯一動畫時鐘。

## 開始前

1. 讀取專案根目錄 `AGENTS.md`、`package.json`、資料來源、composition 尺寸與 fps。
2. 實作前讀取 [references/remotion-d3-pattern.md](references/remotion-d3-pattern.md)。
3. 若專案尚未安裝 Remotion 或 D3，只在使用者要求實作影片時新增相依套件。
4. 先確認資料單位、排序、缺值、domain 與視覺敘事，再決定圖表形式。

## 核心模式：declarative SVG

- 使用 `d3-scale`、`d3-array`、`d3-shape`、`d3-format`、`d3-color` 與純 interpolator 計算值。
- 使用 React JSX 建立 `<svg>`、axis ticks、labels、paths 與 marks；同一批 DOM 不交給 D3 selection 與 React 同時管理。
- 使用 `useCurrentFrame()` 與 `useVideoConfig()` 取得時間，以 Remotion `interpolate()`、`spring()` 或 frame-derived progress 驅動 SVG attribute。
- D3 interpolator 可以接收由 frame 推導出的 `progress`，但不可自行排程時間。
- 對固定資料與昂貴 layout 使用 `useMemo()`；不得在 render 中改寫 props 或共用資料。

## 確定性限制

- 不使用 `d3-transition`、`selection.transition()`、CSS animation、timer、timeout、interval 或 requestAnimationFrame。
- 不在 render 中 fetch。先用 `calculateMetadata()`、`delayRender()` 或已載入的 props 準備資料。
- axis 優先以 `scale.ticks()`、`tickFormat()` 與 JSX 呈現，不用 `d3-axis` 在每 frame 改寫 DOM。
- force layout 必須複製 nodes／links，再呼叫 `simulation.stop()` 與固定次數的 `simulation.tick(n)`；不可使用背景 timer 或 tick event 更新畫面。
- 任何亂數、jitter 或抽樣使用固定 seed；同一 frame、輸入與 composition 設定必須得到相同結果。
- domain、tick 數量與 label 版面不得依前一 frame 的 DOM 測量結果漂移。

## 動畫策略

- 長條圖：動畫化 value，再經 y-scale 計算 `y` 與 `height`。
- 折線／區域圖：先用 D3 shape generator 產生 path，再以 clip、mask 或 frame-derived path 參數揭露。
- 圓餅／弧形圖：以 frame-derived progress 插值角度，再交給 `arc()` 產生 path。
- 地圖：固定 projection 與 fit extent；資料值只控制 fill、stroke、opacity 或標記位置。
- 進出場與資料更新使用穩定 key，避免 mark 在 frame 間重新配對。

## 驗證

1. 執行 TypeScript 檢查與 Remotion 專案既有測試。
2. 檢查空資料、單一資料點、負值、極端值、長標籤與缺值。
3. 在 Studio 任意前後 scrub，逐 frame 應完全一致。
4. 渲染開頭、中段、結尾代表 frame，確認 axis、label、clip 與 marks 沒有跳動或裁切。
5. 確認 `<title>`、`<desc>`、單位、資料來源與繁體中文標示正確。
