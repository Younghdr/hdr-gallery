# Remotion + D3 專案模式

## 安裝

只有在實作任務需要時才新增套件：

```powershell
npm install --save-exact d3
npm install --save-dev --save-exact @types/d3
```

優先從 `d3` 匯入實際使用的 symbols，避免無意間引入 selection、transition 或 timer 型 API。

官方參考：

- [D3：Getting started 與 React](https://d3js.org/getting-started)
- [D3：Scales](https://d3js.org/d3-scale)
- [D3：Shapes](https://d3js.org/d3-shape)
- [D3：Force simulations](https://d3js.org/d3-force/simulation)
- [Remotion：Animating properties](https://www.remotion.dev/docs/animating-properties)

## 可直接套用的動態長條圖

```tsx
import {extent, scaleBand, scaleLinear} from 'd3';
import React, {useMemo} from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type Datum = {
  id: string;
  label: string;
  value: number;
};

type AnimatedBarsProps = {
  data: Datum[];
  title: string;
};

const WIDTH = 1600;
const HEIGHT = 900;
const MARGIN = {top: 130, right: 90, bottom: 120, left: 150};

export const AnimatedBars: React.FC<AnimatedBarsProps> = ({data, title}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const safeData = useMemo(
    () => data.filter((datum) => Number.isFinite(datum.value)),
    [data],
  );

  const x = useMemo(
    () =>
      scaleBand<string>()
        .domain(safeData.map((datum) => datum.id))
        .range([MARGIN.left, WIDTH - MARGIN.right])
        .padding(0.22),
    [safeData],
  );

  const y = useMemo(() => {
    const [minimum = 0, maximum = 1] = extent(
      safeData,
      (datum) => datum.value,
    );

    return scaleLinear()
      .domain([Math.min(0, minimum), Math.max(0, maximum)])
      .nice()
      .range([HEIGHT - MARGIN.bottom, MARGIN.top]);
  }, [safeData]);

  const ticks = useMemo(() => y.ticks(5), [y]);
  const progress = interpolate(frame, [0, fps * 1.2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const baseline = y(0);

  return (
    <AbsoluteFill style={{backgroundColor: '#f3efe7', color: '#20201e'}}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%">
        <title>{title}</title>
        <desc>各地點影像張數的動態長條圖</desc>

        <text x={MARGIN.left} y={72} fontSize={48} fontWeight={700}>
          {title}
        </text>

        {ticks.map((tick) => {
          const tickY = y(tick);
          return (
            <g key={tick}>
              <line
                x1={MARGIN.left}
                x2={WIDTH - MARGIN.right}
                y1={tickY}
                y2={tickY}
                stroke="#c9c2b6"
                strokeWidth={1}
              />
              <text
                x={MARGIN.left - 24}
                y={tickY}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={24}
              >
                {tick}
              </text>
            </g>
          );
        })}

        {safeData.map((datum, index) => {
          const itemProgress = Math.max(
            0,
            Math.min(1, progress * safeData.length - index),
          );
          const animatedValue = datum.value * itemProgress;
          const valueY = y(animatedValue);
          const barY = Math.min(baseline, valueY);
          const barX = x(datum.id) ?? MARGIN.left;

          return (
            <g key={datum.id}>
              <rect
                x={barX}
                y={barY}
                width={x.bandwidth()}
                height={Math.abs(baseline - valueY)}
                rx={8}
                fill="#b55332"
              />
              <text
                x={barX + x.bandwidth() / 2}
                y={HEIGHT - MARGIN.bottom + 42}
                textAnchor="middle"
                fontSize={24}
              >
                {datum.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
```

這個範例刻意讓 D3 只產生 scale 與 ticks，所有 DOM 都由 React 管理，動畫值則只來自 Remotion frame。

## Force layout

force simulation 會改寫輸入 nodes。先建立深拷貝或結構化複本，停止內建 timer，再固定步數求出靜態 layout：

```tsx
const layout = useMemo(() => {
  const nodesCopy = nodes.map((node) => ({...node}));
  const linksCopy = links.map((link) => ({...link}));

  const simulation = forceSimulation(nodesCopy)
    .force('link', forceLink(linksCopy).id((node) => node.id))
    .force('charge', forceManyBody().strength(-90))
    .force('center', forceCenter(width / 2, height / 2))
    .stop();

  simulation.tick(300);
  return {nodes: nodesCopy, links: linksCopy};
}, [nodes, links, width, height]);
```

動畫時從固定起點插值到 `layout` 座標。不要用 `simulation.on('tick')` 更新 React state。

## 常見錯誤

| 錯誤 | 修正 |
| --- | --- |
| `selection.transition()` 動畫圖表 | 以 frame-derived progress 計算 attribute |
| `d3-axis` 與 React 同時管理 `<g>` | 用 `ticks()` 與 JSX 畫 axis |
| render 中建立自動 force simulation | `stop()` 後固定次數 `tick()` |
| 直接把 props nodes 傳給 force simulation | 複製 nodes／links 後再計算 |
| 每 frame 重新 fit domain | 以完整資料固定 domain |
| 以 index 作為可重排資料的 key | 使用穩定資料 ID 或 label |
