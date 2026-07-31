import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./cebu.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const hero = `${BASE_PATH}/travel/cebu/bohol-chocolate-hills-hero.png`;

export const metadata: Metadata = {
  title: "菲律賓宿霧｜從老城走向薄荷色海峽",
  description: "以城市、高地與海峽三種尺度，記錄宿霧老城、Busay 山路與南方島嶼的旅行節奏。",
  alternates: { canonical: "/travel/cebu/" },
  openGraph: { images: [{ url: "/travel/cebu/bohol-chocolate-hills-hero.png", alt: "晨霧與金色側光下的薄荷島巧克力山" }] },
};

const route = [
  ["01", "CEBU CITY", "宿霧市", "老城石牆、街角小吃與傍晚的港口空氣。"],
  ["02", "BUSAY", "布賽高地", "沿山路往上，把城市燈火留在腳下。"],
  ["03", "MOALBOAL", "墨寶", "在沙丁魚群與珊瑚礁之間，重新學會慢慢呼吸。"],
  ["04", "SOUTH CEBU", "南宿霧", "瀑布、海岸公路與清晨出港的螃蟹船。"],
];

export default function CebuPage() {
  return <SiteFrame><main className="cebu-page">
    <section className="cebu-hero" style={{ backgroundImage: `url('${hero}')` }}>
      <div className="cebu-veil" />
      <nav className="cebu-nav"><a href={`${BASE_PATH}/travel/`}>← 所有旅程</a><span>10.3157° N · 123.8854° E</span><b>PHILIPPINES / VISAYAS</b></nav>
      <div className="cebu-title"><p>ISLAND JOURNAL · 016</p><h1>宿霧，<br />在城市與海之間</h1><div><span>CEBU</span><i /><b>CITY · HIGHLANDS · SEA</b></div></div>
      <a className="cebu-down" href="#opening">向南閱讀 ↓</a>
    </section>

    <section className="cebu-opening" id="opening">
      <header><span>THE QUEEN CITY OF THE SOUTH</span><h2>先穿過一座城，<br />才抵達一片海。</h2></header>
      <div className="cebu-copy"><p>宿霧不是只通往跳島碼頭的一座機場。老城留下數百年的航海記憶，山路把濕熱的街道帶往涼風裡；再一路向南，城市聲音才慢慢被海浪取代。</p><p>這段旅程不追求一次看完所有島嶼。我們把視線留給三種尺度：街區的細節、高地的遠景，以及海面之下成群移動的生命。</p></div>
      <aside><b>BEST RHYTHM</b><strong>5–7 DAYS</strong><span>城市 1 日 · 南宿霧 3 日 · 海島 2 日</span></aside>
    </section>

    <figure className="cebu-panorama"><img src={hero} alt="晨霧與金色側光下，薄荷島巧克力山延伸至遠方" /><figcaption><span>FRAME 01 / CHOCOLATE HILLS</span><b>06:18 · BOHOL ISLAND</b></figcaption></figure>

    <section className="cebu-route">
      <header><p>ONE ISLAND / FOUR PACES</p><h2>由北向南，<br />讓風景逐漸安靜。</h2></header>
      <ol>{route.map(([no, en, zh, note]) => <li key={no}><em>{no}</em><div><b>{en}</b><span>{zh}</span></div><p>{note}</p></li>)}</ol>
    </section>

    <section className="cebu-notes">
      <header><span>FIELD NOTES</span><h2>海島旅行，先把餘裕排進行程。</h2></header>
      <div><article><b>01 / MOVE</b><h3>南北移動</h3><p>宿霧島狹長，市區到南部常比地圖看起來更久。換住宿的日子少排一個行程，避開尖峰車流。</p></article><article><b>02 / WATER</b><h3>看海況出發</h3><p>跳島與潛水都受風浪影響。把最想去的海上行程放在前段，保留可以調動的備用日。</p></article><article><b>03 / LIGHT</b><h3>把清晨留給海</h3><p>六點前的光線柔和，海面也通常更平靜。正午回到陰影下，讓島嶼維持自己的節奏。</p></article></div>
    </section>

    <footer className="cebu-footer" style={{ backgroundImage: `url('${hero}')` }}><div><p>END OF ISLAND JOURNAL</p><h2>海風會停，<br />顏色不會。</h2><a href={`${BASE_PATH}/travel/`}>返回所有旅程 ↗</a></div><small>YOUNG HUNG HDR STUDIO · CEBU</small></footer>
  </main></SiteFrame>;
}
