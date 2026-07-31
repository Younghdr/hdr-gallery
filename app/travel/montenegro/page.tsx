import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./montenegro.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Montenegro｜蒙特內哥羅公路圖誌",
  description: "沿著科托爾灣、洛夫琴山路與杜米托爾高原前進，一趟從亞得里亞海到蒙特內哥羅腹地的攝影公路旅行。",
  alternates: { canonical: "/travel/montenegro/" },
};

const route = [
  { day: "01", place: "KOTOR", zh: "科托爾", distance: "0 KM", note: "海灣的第一道藍光" },
  { day: "02", place: "BUDVA", zh: "布德瓦", distance: "23 KM", note: "沿著亞得里亞海岸前進" },
  { day: "03", place: "CETINJE", zh: "策提涅", distance: "55 KM", note: "走進世界最小首都的舊時光" },
  { day: "04", place: "LOVĆEN", zh: "洛夫琴山", distance: "78 KM", note: "山頂英雄墓陵與峽灣遠景" },
];

export default function MontenegroPage() {
  return (
    <SiteFrame>
      <main className="mn-page">
        <section className="mn-hero" aria-labelledby="mn-title">
          <img className="mn-hero-image" src={`${BASE_PATH}/travel/montenegro/20170073-hero.avif`} alt="從科托爾城牆俯瞰峽灣、舊城與群山" />
          <div className="mn-hero-scrim" />
          <div className="mn-kicker"><span>42.4247° N</span><b>ROAD JOURNAL / 2026</b><span>18.7712° E</span></div>
          <div className="mn-hero-copy">
            <p>ADRIATIC / DINARIC ALPS</p>
            <h1 id="mn-title">MONTENEGRO</h1>
            <p className="mn-hero-zh">蒙特內哥羅</p>
            <h2>被遺忘的，才是真實的。</h2>
            <div>
              <strong>多數人都不清楚它在哪裡。我的路線從科托、布德瓦，走進過去曾是全世界最小首都之一的策提涅，再登上洛夫琴山。</strong>
              <span>KOTOR / BUDVA / CETINJE / LOVĆEN</span>
            </div>
          </div>
          <a className="mn-scroll" href="#field-notes">開始行程 <i>↓</i></a>
        </section>

        <section className="mn-intro" id="field-notes">
          <header><span>FIELD NOTE 001</span><h2>這個國家很小，<br />但每一公里都在換景。</h2></header>
          <div className="mn-intro-copy">
            <p>從科托峽灣的水面出發，沿著亞得里亞海抵達布德瓦；公路再貼著石灰岩向上，海突然退到很遠的地方。</p>
            <p>我在策提涅停下。這座舊王都過去曾是全世界最小的首都之一，低矮街廓與使館遺跡，和海岸的觀光城市像是兩個不同時代。再往上，就是洛夫琴山與英雄墓陵。</p>
          </div>
          <aside><b>04</b><span>DAYS</span><b>196</b><span>KILOMETRES</span></aside>
        </section>

        <section className="mn-route" aria-labelledby="route-title">
          <div className="mn-route-head"><span>THE TRACE / 路線</span><h2 id="route-title">從峽灣到英雄墓陵</h2><p>Kotor → Budva → Cetinje → Lovćen</p></div>
          <ol>
            {route.map((stop) => <li key={stop.day}><span>{stop.day}</span><div><b>{stop.place}</b><small>{stop.zh}</small></div><p>{stop.note}</p><em>{stop.distance}</em></li>)}
          </ol>
        </section>

        <section className="mn-ferry-note" aria-labelledby="ferry-title">
          <header>
            <span>ROAD NOTE / BOKA BAY</span>
            <h2 id="ferry-title">把車開上渡輪，<br />比沿著峽灣繞一圈更快。</h2>
          </header>
          <div className="mn-ferry-story">
            <p>第一次連人帶車駛上渡輪，車輪停妥、引擎熄火，幾分鐘後對岸已經靠近。這段橫越科托灣的航程很短，卻省下沿著曲折海岸線繞行的時間；對自駕旅人來說，它不只是交通工具，也是旅程突然切換節奏的一刻。</p>
            <figure className="mn-ferry-photo">
              <img src={`${BASE_PATH}/travel/montenegro/ferry-20170363.avif`} alt="汽車與巴士停放在橫渡科托灣的渡輪甲板上" />
              <figcaption><b>ON BOARD / BOKA BAY</b><span>車輛登船，比沿岸繞行更快</span></figcaption>
            </figure>
            <blockquote>車還在甲板上，<br />峽灣已從路線變成風景。</blockquote>
          </div>
          <aside>
            <b>LEPETANE ↔ KAMENARI</b>
            <span>DRIVE ON · ENGINE OFF · CROSS THE BAY</span>
          </aside>
        </section>

        <section className="mn-roadworks">
          <div><span>M.23 / FIELD EXPERIENCE</span><h2>導航說來得及，<br />公路施工不這麼想。</h2></div>
          <div className="mn-roadworks-copy">
            <p>M.23 公路一路遇上施工，單線放行、臨時停等與突然收窄的車道，把原本看似充裕的回程時間一點點吃掉。</p>
            <p>偏偏那天要趕飛機。每一次車流停住，都只能盯著時間往前跳；直到重新開動，才發現山路上追回的幾分鐘，很快又會在下一個工區消失。</p>
            <strong>在蒙特內哥羅自駕，回程前往機場時，別只看導航抵達時間。預留施工、渡輪排隊與山路慢車的緩衝，才不會把最後一段旅程變成驚險片。</strong>
          </div>
        </section>

        <section className="mn-chapter mn-budva">
          <div className="mn-chapter-copy"><span>02 / BUDVA</span><h2>城牆伸進海裡，<br />布德瓦在藍色中醒來。</h2><p>從空中看，布德瓦舊城像一艘停在海岸邊的石船。橘紅屋瓦被城牆收攏，碼頭與新城沿著山腳向兩側展開；這是海岸線最明亮、也最直接的一章。</p><dl><div><dt>VIEW</dt><dd>舊城 / 城牆 / 碼頭</dd></div><div><dt>PACE</dt><dd>步行 / 空拍</dd></div></dl></div>
          <figure><img className="mn-editorial-photo" src={`${BASE_PATH}/travel/montenegro/budva-panorama-lossless.webp`} alt="空拍全景呈現布德瓦舊城、城牆、海灣與後方山脈" /><figcaption><b>BUDVA / OLD TOWN</b><span>LOSSLESS AERIAL PANORAMA · 2017</span></figcaption></figure>
        </section>

        <section className="mn-cetinje">
          <header><span>03 / CETINJE</span><h2>曾經的首都，<br />沒有首都的喧鬧。</h2><p>策提涅過去曾是全世界最小的首都之一。低矮住宅、草地與舊使館散落在山間盆地裡；拉成全景後，更能看見這座舊王都刻意留白的尺度。</p></header>
          <figure><img src={`${BASE_PATH}/travel/montenegro/cetinje-panorama.avif`} alt="策提涅低矮城區與後方連綿山脈的全景" /><figcaption><b>CETINJE / OLD ROYAL CAPITAL</b><span>PANORAMA · 2017</span></figcaption></figure>
        </section>

        <section className="mn-road-note">
          <p>ROAD NOTE / P1</p><blockquote>「離開海岸之後，<br />道路就是風景本身。」</blockquote>
          <div className="mn-switchbacks" aria-label="洛夫琴盤山公路的二十五道彎"><span>25</span><b>SWITCHBACKS</b><i /></div>
        </section>

        <section className="mn-chapter mn-lovcen">
          <figure className="mn-lovcen-main"><img className="mn-editorial-photo" src={`${BASE_PATH}/travel/montenegro/lovcen-mausoleum-aerial.avif`} alt="洛夫琴山脊上的彼得二世英雄墓陵與長形步道" /><figcaption><b>LOVĆEN / NJEGOŠ MAUSOLEUM</b><span>AERIAL FRAME · 13:37</span></figcaption></figure>
          <div className="mn-chapter-copy"><span>04 / LOVĆEN</span><h2>英雄墓陵，<br />把山脊變成一條軸線。</h2><p>彼得二世的墓陵落在洛夫琴山最裸露的稜線上。從空中看，步道穿過岩峰、進入隧道，再抵達方正的石造建築；人走在其中，才顯出山與建築真正的尺度。</p><div className="mn-tags"><span>NJEGOŠ</span><span>MAUSOLEUM</span><span>1,657 M</span></div></div>
          <figure className="mn-lovcen-secondary"><img src={`${BASE_PATH}/travel/montenegro/lovcen-mausoleum-ridge.avif`} alt="遊客沿著洛夫琴山脊步道走向英雄墓陵" /><figcaption><b>THE FINAL APPROACH</b><span>山脊、平台與墓陵</span></figcaption></figure>
        </section>

        <section className="mn-utility">
          <div><span>PRACTICAL / 隨身筆記</span><h2>帶著餘裕上路</h2></div>
          <ul><li><b>季節</b><span>五月下旬至六月、九月初；避開海岸盛夏人潮。</span></li><li><b>渡輪</b><span>開車橫渡科托灣通常比沿岸繞行更快，但旺季仍要預留排隊時間。</span></li><li><b>駕駛</b><span>M.23 與山路施工難以預測；趕飛機時至少預留比導航更多的緩衝。</span></li><li><b>影像</b><span>廣角留給灣岸，70–200mm 用來壓縮高原層次。</span></li></ul>
          <a href={`${BASE_PATH}/travel/`}>返回旅行索引 <span>↗</span></a>
          <p className="mn-photo-credit">HERO PHOTO · KOTOR BAY / 2017</p>
        </section>
      </main>
    </SiteFrame>
  );
}
