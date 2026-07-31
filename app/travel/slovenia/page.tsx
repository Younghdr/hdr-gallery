import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./slovenia.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const hero = `${BASE_PATH}/travel/slovenia/lake-bled-hero.png`;

export const metadata: Metadata = {
  title: "斯洛維尼亞｜湖光與群峰之間",
  description: "從盧比安納、布萊德湖到索查河谷，一段穿過尤利安阿爾卑斯的斯洛維尼亞旅程。",
  alternates: { canonical: "/travel/slovenia/" },
};

const route = [
  ["01", "LJUBLJANA", "盧比安納", "老城與河岸"],
  ["02", "LAKE BLED", "布萊德湖", "晨霧中的湖心島"],
  ["03", "BOHINJ", "博希尼", "走入群山深處"],
  ["04", "SOČA VALLEY", "索查河谷", "沿著翡翠色河流"],
];

export default function SloveniaPage() {
  return <SiteFrame><main className="si-page">
    <section className="si-hero" style={{ backgroundImage: `url('${hero}')` }}>
      <div className="si-veil" />
      <div className="si-meta"><span>46.3625° N</span><b>SLOVENIA / 2026</b><span>14.0938° E</span></div>
      <div className="si-title"><p>ALPINE FIELD NOTES</p><h1>湖光與群峰之間</h1><div><strong>SLOVENIA</strong><span>ALPS · LAKES · VALLEYS</span></div></div>
      <a className="si-down" href="#opening">SCROLL TO BEGIN <span>↓</span></a>
    </section>

    <section className="si-opening" id="opening">
      <div className="si-number">09</div>
      <header><p>THE QUIET SIDE OF THE ALPS</p><h2>一個把山、湖與城市<br />收進短短路程的國度</h2></header>
      <div className="si-prose"><p>斯洛維尼亞的尺度很小，風景卻轉換得很快。早晨還在盧比安納的河岸喝咖啡，午後已能抵達阿爾卑斯山腳；公路穿過森林，湖水與石灰岩山壁輪流出現在車窗之外。</p><p>這趟旅程不追逐地標清單，而是沿著水的方向前進：從布萊德的晨霧，到博希尼安靜的湖面，再循著索查河的翡翠色向西。</p></div>
    </section>

    <section className="si-image-break" style={{ backgroundImage: `url('${hero}')` }}><p>LAKE BLED <span>06:18 / FIRST LIGHT</span></p></section>

    <section className="si-route">
      <header><p>04 DAYS / 286 KM</p><h2>沿著水，穿越山脈</h2></header>
      <ol>{route.map(([day, place, zh, note]) => <li key={day}><em>{day}</em><div><b>{place}</b><span>{zh}</span></div><p>{note}</p></li>)}</ol>
    </section>

    <section className="si-notes">
      <div><p>FIELD NOTE / 01</p><h2>湖面比城市<br />更早醒來</h2></div>
      <blockquote>清晨六點，第一班普萊特納木船還沒離岸。霧停在水面上方，教堂鐘塔與遠處山脊只剩下安靜的輪廓。</blockquote>
      <dl><div><dt>BEST SEASON</dt><dd>SEP — OCT</dd></div><div><dt>ROAD</dt><dd>286 KM</dd></div><div><dt>PACE</dt><dd>SLOW / 4 DAYS</dd></div></dl>
    </section>

    <footer className="si-footer"><a href={`${BASE_PATH}/travel/`}>← 返回所有旅程</a><span>YH EXPEDITIONS / SLOVENIA</span></footer>
  </main></SiteFrame>;
}
