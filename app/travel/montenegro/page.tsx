import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./montenegro.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const sheet = `${BASE_PATH}/travel/montenegro/road-journal.png`;

export const metadata: Metadata = {
  title: "Montenegro｜黑山公路圖誌",
  description: "沿著科托爾灣、洛夫琴山路與杜米托爾高原前進，一趟從亞得里亞海到黑山腹地的攝影公路旅行。",
  alternates: { canonical: "/travel/montenegro/" },
};

const route = [
  { day: "01", place: "KOTOR", zh: "科托爾", distance: "0 KM", note: "海灣的第一道藍光" },
  { day: "02", place: "PERAST", zh: "佩拉斯特", distance: "18 KM", note: "石牆、鐘聲與慢船" },
  { day: "03", place: "LOVĆEN", zh: "洛夫琴", distance: "67 KM", note: "二十五道髮夾彎" },
  { day: "04", place: "DURMITOR", zh: "杜米托爾", distance: "196 KM", note: "穿越雲影的高原公路" },
];

function SheetImage({ panel, alt }: { panel: 0 | 1 | 2; alt: string }) {
  return <span className={`mn-photo mn-panel-${panel}`}><img src={sheet} alt={alt} /></span>;
}

export default function MontenegroPage() {
  return (
    <SiteFrame>
      <main className="mn-page">
        <section className="mn-hero" aria-labelledby="mn-title">
          <SheetImage panel={0} alt="清晨俯瞰科托爾灣與盤山公路" />
          <div className="mn-hero-scrim" />
          <div className="mn-kicker"><span>42.4247° N</span><b>ROAD JOURNAL / 2026</b><span>18.7712° E</span></div>
          <div className="mn-hero-copy">
            <p>ADRIATIC / DINARIC ALPS</p>
            <h1 id="mn-title">黑山，<br />在海與岩壁之間</h1>
            <div><strong>MONTENEGRO</strong><span>CRNA GORA</span></div>
          </div>
          <a className="mn-scroll" href="#field-notes">開始行程 <i>↓</i></a>
        </section>

        <section className="mn-intro" id="field-notes">
          <header><span>FIELD NOTE 001</span><h2>這個國家很小，<br />但每一公里都在換景。</h2></header>
          <div className="mn-intro-copy">
            <p>從科托爾灣的水面出發，公路貼著石灰岩向上。車窗外先是教堂尖塔與紅瓦屋頂，轉過山脊後，海突然退到很遠的地方。</p>
            <p>黑山適合慢慢開。不是為了抵達更多景點，而是讓光線、海拔與氣味替旅程分章。四天，兩百公里，從鹽味走進松林。</p>
          </div>
          <aside><b>04</b><span>DAYS</span><b>196</b><span>KILOMETRES</span></aside>
        </section>

        <section className="mn-route" aria-labelledby="route-title">
          <div className="mn-route-head"><span>THE TRACE / 路線</span><h2 id="route-title">從海灣到高原</h2><p>Kotor → Perast → Lovćen → Durmitor</p></div>
          <ol>
            {route.map((stop) => <li key={stop.day}><span>{stop.day}</span><div><b>{stop.place}</b><small>{stop.zh}</small></div><p>{stop.note}</p><em>{stop.distance}</em></li>)}
          </ol>
        </section>

        <section className="mn-chapter mn-perast">
          <div className="mn-chapter-copy"><span>02 / PERAST</span><h2>午後四點，<br />石頭開始變暖。</h2><p>佩拉斯特只有一條沿海主街。船從碼頭緩慢離岸，鐘聲在兩側山壁之間折返；最好的行程，是把車停在鎮外，沿著水走到光線變成橘色。</p><dl><div><dt>BEST LIGHT</dt><dd>16:30—19:10</dd></div><div><dt>PACE</dt><dd>步行 / 慢船</dd></div></dl></div>
          <figure><SheetImage panel={1} alt="佩拉斯特安靜的石造街道與海灣" /><figcaption><b>PERAST / BOKA BAY</b><span>FRAME 14 · 17:42</span></figcaption></figure>
        </section>

        <section className="mn-road-note">
          <p>ROAD NOTE / P1</p><blockquote>「離開海岸之後，<br />道路就是風景本身。」</blockquote>
          <div className="mn-switchbacks" aria-label="洛夫琴盤山公路的二十五道彎"><span>25</span><b>SWITCHBACKS</b><i /></div>
        </section>

        <section className="mn-chapter mn-durmitor">
          <figure><SheetImage panel={2} alt="杜米托爾高原的彎曲公路與岩峰" /><figcaption><b>DURMITOR RING</b><span>FRAME 29 · 10:18</span></figcaption></figure>
          <div className="mn-chapter-copy"><span>04 / DURMITOR</span><h2>山的背面，<br />是另一種天氣。</h2><p>杜米托爾環線穿過裸露岩峰、牧地與黑松。雲層低時，公路像一條細線被收進灰綠色的山谷；不要急著追晴天，移動的陰影正是這裡最好的尺度。</p><div className="mn-tags"><span>ŽABLJAK</span><span>SEDLO PASS</span><span>PIVA</span></div></div>
        </section>

        <section className="mn-utility">
          <div><span>PRACTICAL / 隨身筆記</span><h2>帶著餘裕上路</h2></div>
          <ul><li><b>季節</b><span>五月下旬至六月、九月初；避開海岸盛夏人潮。</span></li><li><b>駕駛</b><span>山路窄、盲彎多，預留比導航多 30% 的時間。</span></li><li><b>影像</b><span>廣角留給灣岸，70–200mm 用來壓縮高原層次。</span></li></ul>
          <a href={`${BASE_PATH}/travel/`}>返回旅行索引 <span>↗</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
