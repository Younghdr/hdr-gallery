import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./norway.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const HERO = "https://res.cloudinary.com/fjordtours/image/upload/w_auto/dpr_auto/c_fill/f_auto/q_auto/c_limit,w_2400/v1/norway/places-to-visit/western-norway/gudvangen/plan-your-trip/naeroyfjord";
const ROAD = "https://static.visitnorway.com/images/jlrwvnbf/production/ff29c43603538c655e77f967c68669f4faa3c28b-1080x720.jpg?auto=format&fit=crop&q=88&w=2400";

export const metadata: Metadata = {
  title: "挪威縮影｜一張票穿越峽灣與山谷",
  description: "從卑爾根出發，串連沃斯、古德旺恩、納柔依峽灣、弗洛姆與米達爾的挪威縮影旅程。",
  alternates: { canonical: "/travel/norway/" },
};

const stops = [
  { km: "RAIL", place: "卑爾根", en: "BERGEN", note: "從濕潤的港城登上卑爾根鐵路，車窗外的房屋逐漸讓位給山谷與森林。" },
  { km: "BUS", place: "沃斯", en: "VOSS", note: "在山城換乘巴士，沿斯塔爾海姆的連續彎道下降，前往峽灣最深處。" },
  { km: "PIER", place: "古德旺恩", en: "GUDVANGEN", note: "碼頭被高聳岩壁包圍。船離岸之後，村落很快縮成水面上的一個小點。" },
  { km: "FJORD", place: "納柔依峽灣", en: "NÆRØYFJORD", note: "兩側山壁將水道收窄，瀑布從雲下垂落；這段航程是整趟旅程最安靜的核心。" },
  { km: "TRAIN", place: "弗洛姆・米達爾", en: "FLÅM → MYRDAL", note: "弗洛姆鐵路從海平面一路攀升，穿過瀑布、隧道與高山聚落，再接回卑爾根鐵路。" },
];

export default function NorwayPage() {
  return <SiteFrame><main className="no-page">
    <section className="no-hero">
      <img src={HERO} alt="挪威縮影航線穿越納柔依峽灣" />
      <div className="no-hero-shade" />
      <header className="no-topline"><a href={`${BASE_PATH}/travel/`}>YH / TRAVEL ARCHIVE</a><span>60.4720° N · 8.4689° E</span><b>NO. 14</b></header>
      <div className="no-route-badge"><span>N</span><small>NORWAY<br />IN A NUTSHELL</small></div>
      <div className="no-hero-copy"><p>RAIL · BUS · FJORD · RAIL</p><h1>一張票，穿過<br /><em>挪威縮影</em></h1><div><span>BERGEN</span><span>NÆRØYFJORD</span><span>FLÅM RAILWAY</span></div></div>
      <div className="no-mile-rule" aria-hidden="true"><span>SEA</span><i /><i /><i /><i /><b>866M</b></div>
    </section>
    <section className="no-opening"><div><span>01 / TRANSIT LOG</span><h2>火車鑽進山裡，<br />船在峽灣之間接手。</h2></div><p>「挪威縮影」不是一個景點，而是一段由鐵路、巴士與渡輪接力完成的旅程。從卑爾根出發，一天之內從港城進入高山，再降到聯合國世界遺產峽灣的水面，交通本身就是風景。</p></section>
    <section className="no-roadbook"><header><span>NORWAY IN A NUTSHELL</span><h2>四種交通，五段風景</h2><p>BERGEN → FLÅM → MYRDAL</p></header><div className="no-stops">{stops.map((stop, index) => <article key={stop.en}><span className="no-km">MODE<br /><b>{stop.km}</b></span><div className="no-dot">{String(index + 1).padStart(2, "0")}</div><div><small>{stop.en}</small><h3>{stop.place}</h3></div><p>{stop.note}</p></article>)}</div></section>
    <section className="no-image-break"><img src={ROAD} alt="弗洛姆鐵路沿著陡峭山谷與河流前進" /><div><span>RAIL NOTE / 02</span><h2>列車沿著河谷，<br />把海拔慢慢拉高。</h2><p>弗洛姆鐵路離開峽灣水面，沿著河流切入陡峭山谷。綠色車廂在瀑布、隧道與雪峰之間轉彎，直到米達爾的高山月台。</p></div><small>PHOTO · FLÅM RAILWAY</small></section>
    <section className="no-notes"><header><span>PRACTICAL FIELD NOTES</span><h2>轉乘之前</h2></header><div><article><b>01</b><h3>方向</h3><p>可從卑爾根或奧斯陸方向開始。若想留宿弗洛姆，將套票拆成兩天，節奏會比一日往返從容。</p></article><article><b>02</b><h3>座位</h3><p>弗洛姆鐵路與峽灣船班旺季容易客滿。提早確認每段時間，轉乘時仍保留步行與找月台的餘裕。</p></article><article><b>03</b><h3>行李</h3><p>一天會多次上下車船，輕量行李最方便。即使夏季也準備防風防雨外套，甲板上的體感溫度偏低。</p></article></div><a href={`${BASE_PATH}/travel/`}>返回旅行檔案 <span>↗</span></a></section>
  </main></SiteFrame>;
}
