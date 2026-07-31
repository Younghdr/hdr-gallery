import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./tokyo.css";

export const metadata: Metadata = {
  title: "東京｜霓虹與靜謐之間",
  description: "從淺草的晨鐘、谷中的老街，到澀谷夜色，一篇以光與日常編排的東京攝影旅誌。",
  alternates: { canonical: "/travel/tokyo/" },
};

const districts = [
  { no: "一", name: "淺草", en: "ASAKUSA", note: "晨鐘、仲見世與隅田川的第一道光", time: "05:42" },
  { no: "二", name: "谷中", en: "YANAKA", note: "沿著低矮屋簷，走進東京仍慢著的午後", time: "13:10" },
  { no: "三", name: "澀谷", en: "SHIBUYA", note: "在人潮與霓虹之間，尋找一秒的靜止", time: "18:36" },
  { no: "四", name: "新宿", en: "SHINJUKU", note: "最後一班電車以前，城市仍醒著", time: "23:18" },
];

export default function TokyoPage() {
  return <SiteFrame><main className="tk-page">
    <section className="tk-hero">
      <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2600&q=90" alt="東京夜晚的街道與霓虹燈光" />
      <div className="tk-hero-wash" />
      <div className="tk-hero-meta"><span>35.6762° N / 139.6503° E</span><b>東京旅誌・十三</b><span>春 ／ 秋</span></div>
      <div className="tk-mon"><span>東</span></div>
      <div className="tk-title"><p>東京 · TOKYO</p><h1>霓虹與靜謐之間</h1><span>一座城市，兩種呼吸</span></div>
      <a className="tk-scroll" href="#prologue" aria-label="往下閱讀序章">読む <i>↓</i></a>
    </section>

    <section className="tk-prologue" id="prologue">
      <div className="tk-kicker"><b>序</b><span>PROLOGUE<br />13 / JP</span></div>
      <div className="tk-prologue-copy"><p className="tk-vertical">東京不是一種速度</p><div><h2>清晨先聽見木門開啟，<br />入夜才看見城市發光。</h2><p>東京把極端安放得很自然。寺院的香煙仍在屋簷下盤旋，幾站之外，電子看板已經照亮十字路口。這趟旅程不追趕地標，而是從一天的光線出發，穿過老街、喫茶店、月台與深夜巷弄，讀懂城市安靜的節拍。</p></div></div>
      <dl><div><dt>日程</dt><dd>5 DAYS</dd></div><div><dt>步行</dt><dd>68 KM</dd></div><div><dt>最佳光線</dt><dd>05:30 / 17:40</dd></div></dl>
    </section>

    <section className="tk-asakusa">
      <figure><img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2200&q=88" alt="淺草寺五重塔與傳統日式建築" /><figcaption><span>淺草・朝五時四十二分</span><b>FRAME 013</b></figcaption></figure>
      <article><span>朝の光 · MORNING LIGHT</span><h2>在第一批腳步以前，<br />抵達淺草。</h2><p>清晨的仲見世還沒有拉開鐵門。石板路保留著夜雨，雷門的紅色在微亮天色裡格外安靜。往隅田川走，城市從腳踏車鈴聲與便利商店的門鈴慢慢醒來。</p><blockquote>「早起不是為了避開人群，<br />而是看見一座城市如何開始。」</blockquote></article>
    </section>

    <section className="tk-districts">
      <header><span>街區案內 · DISTRICT NOTES</span><h2>沿著山手線，<br />閱讀四種東京。</h2></header>
      <ol>{districts.map((item) => <li key={item.en}><b>{item.no}</b><div><h3>{item.name}</h3><span>{item.en}</span></div><p>{item.note}</p><time>{item.time}</time></li>)}</ol>
    </section>

    <section className="tk-crossing">
      <img src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=2400&q=88" alt="東京城市街道的夜色與人群" />
      <div><span>夜 · NIGHT STUDY</span><h2>當所有人同時出發，<br />城市反而有了秩序。</h2><p>澀谷的迷人不只在繁忙，而在那套精密的節奏：號誌轉換、人流交會、雨傘在濕亮路面上散開。站到二樓窗邊，讓快門稍微慢一點，東京便從資訊變成光。</p></div>
    </section>

    <section className="tk-day">
      <header><span>一日 · ONE DAY IN TOKYO</span><h2>把東京排成一張時間表</h2></header>
      <div className="tk-timeline"><article><time>05:30</time><h3>淺草晨光</h3><p>雷門至隅田川，步行 2.4 公里。</p></article><article><time>10:20</time><h3>清澄白河</h3><p>咖啡與倉庫街，留一個無目的午後。</p></article><article><time>16:40</time><h3>代代木</h3><p>在森林的暗部等待斜射光。</p></article><article><time>20:10</time><h3>新宿夜景</h3><p>從高處看軌道，把最後一格留給雨。</p></article></div>
    </section>

    <section className="tk-notes"><div><span>旅の覚書 · FIELD NOTES</span><h2>留白，也是一段行程。</h2></div><div className="tk-note-grid"><article><b>交通</b><p>以 IC 卡串連地鐵與私鐵；每天只安排兩個相鄰街區，讓轉車不切碎觀察。</p></article><article><b>光線</b><p>春秋日落約在 17 至 18 時，藍調時間很短，提前找好高點與雨備位置。</p></article><article><b>禮節</b><p>寺社與住宅巷弄保持安靜；拍攝店家、人物與私人空間前先詢問。</p></article></div><a href="../">返回所有旅程 <span>↗</span></a></section>
  </main></SiteFrame>;
}
