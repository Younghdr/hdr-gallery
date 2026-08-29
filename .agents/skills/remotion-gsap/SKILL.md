---
name: remotion-gsap
description: Use when building or revising Remotion compositions in this project that need GSAP timelines, staggered choreography, easing, SVG or DOM animation, deterministic scrubbing, or frame-accurate rendering.
---

# Remotion + GSAP

在 Remotion composition 中使用 GSAP 時，讓 Remotion 擁有時間軸。GSAP 只負責描述 tween 與編排，不得依賴瀏覽器時鐘自行播放。

## 開始前

1. 讀取專案根目錄 `AGENTS.md`、`package.json`、既有 Remotion composition 與影片規格。
2. 實作前讀取 [references/remotion-gsap-pattern.md](references/remotion-gsap-pattern.md)。
3. 若專案尚未安裝 Remotion 或 GSAP，只在使用者要求實作影片時新增相依套件；單純規劃或檢視時不可改動套件。
4. 所有 `remotion` 與 `@remotion/*` 套件使用完全相同的精確版本，不加 `^`。

## 核心模式

- 使用官方 `@remotion/gsap` 的 `useGsapTimeline()`。
- 將所有 animated tweens 加入 hook 提供的 `timeline`；Remotion 會依目前 frame 驅動已暫停的 timeline。
- 把 hook 回傳的 ref 掛在 HTML 或 SVG 範圍根節點，並用 `selector()` 或直接 element ref 鎖定目標。
- 當 timeline builder 讀取會改變動畫結構或數值的 props 時，放入 `dependencies`。
- GSAP 時間以秒表示；從 frame 規格換算時使用 `seconds = frames / fps`。
- 優先動畫 `x`、`y`、`scale`、`rotation`、`autoAlpha` 等 transform／opacity 屬性。

## 確定性限制

- **No playback or seeking:** 不呼叫 `play()`、`resume()`、`restart()`、`reverse()`、`seek()`、`time()` 或 `progress()`；Remotion 擁有播放頭。
- **No callbacks:** 不使用 `onStart`、`onUpdate`、`onComplete`、`timeline.call()`、`eventCallback()` 或 Promise builder。
- 不使用獨立的 animated `gsap.to()`、`gsap.from()`、`gsap.delayedCall()`；它們會落入 wall-clock timeline。
- tween 只指向 DOM 或 SVG element。數字與資料物件改用 `useCurrentFrame()`、`interpolate()` 或 `spring()` 推導。
- 不使用 `Math.random()`、GSAP `random(...)`、random stagger 或 `repeatRefresh`。需要亂數時使用穩定資料或 Remotion `random()`。
- 目前不把 ScrollTrigger、Draggable 等 GSAP plugin 放進可渲染 composition；需要相似效果時改寫成 frame-driven motion。

## 驗證

1. 執行 TypeScript 檢查與 Remotion 專案既有測試。
2. 在 Studio 前後拖曳播放頭，確認任意 frame 與反向 scrub 都一致。
3. 渲染開頭、中段、結尾的代表 frame，再執行一次完整短片渲染。
4. 確認沒有閃爍、殘留 inline style、重複 timeline 或 React Strict Mode 警告。
5. timeline 超過數百個 tween 時，先簡化或拆段，再評估每 frame 從零 seek 的成本。
