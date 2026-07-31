import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./koh-samui.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const hero = `${BASE_PATH}/travel/koh-samui-hero.png`;

export const metadata: Metadata = {
  title: "蘇美島｜潮汐之間的慢行手札",
  description: "從椰林晨光、漁村餐桌到安通群島，以四天時間讀懂蘇美島的潮汐與生活節奏。",
  alternates: { canonical: "/travel/koh-samui/" },
};

const route = [
  { time: "05:52", place: "LIPA NOI", zh: "利帕諾伊", note: "西岸第一道光，海面像一張還沒寫字的紙。" },
  { time: "09:20", place: "TALING NGAM", zh: "塔靈岩", note: "沿著椰林慢慢往南，把午後留給沒有名字的小路。" },
  { time: "16:40", place: "FISHERMAN’S VILLAGE", zh: "漁人村", note: "木屋、香料與炭火，傍晚是島上最有聲音的時刻。" },
  { time: "07:10", place: "ANG THONG", zh: "安通群島", note: "離岸看島，四十二座石灰岩島嶼在霧裡逐一浮現。" },
];

export default function KohSamuiPage() {
  return <SiteFrame><main className="ks-page">
    <section className="ks-hero" style={{ backgroundImage: `url('${hero}')` }}>
      <div className="ks-hero-shade" />
      <header className="ks-masthead"><a href={`${BASE_PATH}/travel/`}>YH / TRAVEL</a><span>09.5120° N — 100.0136° E</span><b>THAILAND · 2026</b></header>
      <div className="ks-title">
        <p>ISLAND FIELD JOURNAL · NO. 10</p>
        <h1>蘇美島，<br />潮汐讓時間慢下來</h1>
        <div><span>KOH SAMUI</span><i /> <b>4 DAYS / 1 ISLAND / 0 RUSH</b></div>
      </div>
      <a className="ks-scroll" href="#journal">READ THE JOURNAL <span>↓</span></a>
    </section>

    <section className="ks-opening" id="journal">
      <div className="ks-index">10<span>/ 10</span></div>
      <div className="ks-opening-copy"><p>THE GULF OF THAILAND</p><h2>不是逃離日常，<br />只是把速度還給海。</h2></div>
      <div className="ks-prose"><p>蘇美島最迷人的並不是某一片完美沙灘，而是島嶼自有的時間感。清晨先聽見椰葉，再看見光；午後的雨來得快，也走得乾淨。只要離開環島公路一個轉彎，生活便回到漁港、果園與低矮木屋之間。</p><p>這是一條不追景點數量的路線。我們用四天沿著海岸移動，把日出、正午與退潮留給不同方向，也為一頓沒有預約的晚餐保留空白。</p></div>
    </section>

    <section className="ks-tide" aria-label="蘇美島一天的潮汐節奏">
      <div className="ks-tide-photo" style={{ backgroundImage: `url('${hero}')` }}><span>WEST COAST / 06:07</span></div>
      <div className="ks-tide-note"><p>TIDE NOTE / 01</p><h2>跟著光，<br />而不是行程表。</h2><blockquote>「島嶼不催促你。它只用潮水，提醒每件事都有自己的時刻。」</blockquote><dl><div><dt>SUNRISE</dt><dd>05:52</dd></div><div><dt>SEA</dt><dd>28°C</dd></div><div><dt>PACE</dt><dd>SLOW</dd></div></dl></div>
    </section>

    <section className="ks-route">
      <header><p>ONE ISLAND / FOUR MOMENTS</p><h2>沿岸，不繞遠路</h2><span>路線依光線與潮汐排列。島不大，真正需要預留的是停下來的時間。</span></header>
      <ol>{route.map((stop, index) => <li key={stop.place}><em>{String(index + 1).padStart(2, "0")}</em><time>{stop.time}</time><div><b>{stop.place}</b><span>{stop.zh}</span></div><p>{stop.note}</p></li>)}</ol>
    </section>

    <section className="ks-fieldnotes">
      <article><span>01 / STAY</span><h3>住在西岸</h3><p>看得到落日，也離主要海灘的喧鬧遠一些。選一間步行就能到海邊的小旅店。</p></article>
      <article><span>02 / MOVE</span><h3>租車環島</h3><p>主路好走，進村後放慢。午後短雨常見，機車騎士記得預留安全的避雨點。</p></article>
      <article><span>03 / TASTE</span><h3>從市場吃起</h3><p>椰奶咖哩、烤魚與酸辣海鮮。先看當日漁獲，再決定今晚的菜單。</p></article>
    </section>

    <footer className="ks-footer" style={{ backgroundImage: `url('${hero}')` }}><div><p>NEXT TIDE / NEXT JOURNEY</p><h2>把一點海風<br />帶回日常。</h2><a href={`${BASE_PATH}/travel/`}>返回旅行檔案 <span>↗</span></a></div><small>YOUNG HUNG HDR STUDIO · KOH SAMUI</small></footer>
  </main></SiteFrame>;
}
