# Remotion + GSAP 專案模式

## 安裝與版本

先讀取目前 Remotion 版本。使用 Remotion CLI 加入官方整合，並將 GSAP 安裝為精確版本：

```powershell
npx remotion add @remotion/gsap
npm install --save-exact gsap
```

再次檢查 `package.json`：`remotion` 與所有 `@remotion/*` 必須是完全相同的版本，且不可使用 `^`。不要把文件頁面當下顯示的版本號硬編碼進專案。

官方參考：

- [Remotion：@remotion/gsap](https://www.remotion.dev/docs/gsap)
- [Remotion：useGsapTimeline()](https://www.remotion.dev/docs/gsap/use-gsap-timeline)
- [GSAP Timeline](https://gsap.com/docs/v3/GSAP/Timeline/)

## 可直接套用的 composition

```tsx
import {useGsapTimeline} from '@remotion/gsap';
import React from 'react';
import {AbsoluteFill} from 'remotion';

type EditorialIntroProps = {
  enterY: number;
  title: string;
};

export const EditorialIntro: React.FC<EditorialIntroProps> = ({
  enterY,
  title,
}) => {
  const scope = useGsapTimeline<HTMLDivElement>(
    ({timeline, selector}) => {
      timeline
        .fromTo(
          selector('[data-photo]'),
          {scale: 1.08, autoAlpha: 0},
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
        )
        .from(
          selector('[data-title]'),
          {
            y: enterY,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.55',
        )
        .from(
          selector('[data-meta]'),
          {
            y: 18,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '<0.18',
        );
    },
    {dependencies: [enterY]},
  );

  return (
    <AbsoluteFill ref={scope} style={{backgroundColor: '#10100f'}}>
      <div
        data-photo
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.72)), #5f665d',
          willChange: 'transform, opacity',
        }}
      />
      <div style={{position: 'absolute', left: 96, bottom: 88, color: '#fff'}}>
        <h1 data-title style={{fontSize: 88, margin: 0}}>
          {title}
        </h1>
        <div style={{display: 'flex', gap: 24, marginTop: 20}}>
          <span data-meta>24°59′N</span>
          <span data-meta>121°32′E</span>
          <span data-meta>FRAME 001</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

## 選擇與依賴

- 使用 `data-*` selector，避免樣式 class 改名時破壞動畫。
- `selector()` 只會搜尋 scope 後代，避免多個 composition 或重複元件互相選中。
- 只有 builder 實際讀取的 props 才放入 `dependencies`；不要把每個 render 都會變的值放進去。
- 若動畫本質是單一數值插值、spring 或資料物件變化，直接使用 Remotion API；GSAP 留給 DOM／SVG choreography。

## 常見錯誤

| 錯誤 | 修正 |
| --- | --- |
| 在 `useEffect` 中建立自動播放 timeline | 改用 `useGsapTimeline()` |
| builder 內呼叫 `gsap.to()` | 改成 `timeline.to()` |
| 用 callback 更新 React state | 依 frame 推導 state |
| tween plain object 後讀取結果 | 使用 `interpolate()` 或直接動畫 element |
| 使用 random stagger | 依 index 計算穩定延遲 |
| 使用 ScrollTrigger | 將 scroll 進度重新映射為 Remotion frame |
