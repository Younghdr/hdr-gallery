import type { Metadata } from "next";
import "./chiang-mai.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "清邁｜山城慢行筆記",
  description: "從清晨寺院、古城巷弄到素帖山與北方咖啡，收進一冊清邁慢行攝影筆記。",
  alternates: { canonical: "/travel/chiang-mai/" },
};

const chapters = [
  { time: "06:10", title: "寺院醒來以前", text: "趁金色屋脊還留著柔光，沿古城安靜的磚牆向東走。" },
  { time: "09:40", title: "市場的第二頓早餐", text: "糯米、烤豬與北方香腸，把早晨的路線帶進最日常的清邁。" },
  { time: "14:20", title: "山路穿過雲層", text: "離開城牆，讓雙條車沿著彎道爬上素帖山的森林線。" },
  { time: "18:35", title: "暮色落在湄平河", text: "回到河岸，晚風把白日的熱氣慢慢帶走。" },
];

export default function ChiangMaiPage() {
  return (
    <main className="cm-page">
      <header className="cm-nav">
        <a href={`${BASE_PATH}/travel/`} className="cm-back">← 旅程目錄</a>
        <span>18.7883° N · 98.9853° E</span>
        <a href={`${BASE_PATH}/`}>YH / EXPEDITIONS</a>
      </header>

      <section className="cm-hero">
        <div className="cm-hero-photo" />
        <div className="cm-hero-card">
          <p>FIELD NOTE 16 · NORTHERN THAILAND</p>
          <h1>清邁，<br />在晨霧裡慢慢醒來</h1>
          <div className="cm-rule" />
          <span>四天三夜，沿著古城、山路與市場，記下北方光線的溫度。</span>
        </div>
        <div className="cm-hero-caption"><b>01</b><span>DOI SUTHEP<br />FIRST LIGHT</span></div>
      </section>

      <section className="cm-opening">
        <div className="cm-stamp"><small>最佳步調</small><strong>慢</strong><span>NOV — FEB</span></div>
        <div>
          <p className="cm-label">A CITY MADE FOR THE MORNING</p>
          <h2>不是追趕景點，<br />而是跟著一天的光走。</h2>
          <p>清邁適合把行程排得鬆一些。清晨先去寺院，午後躲進老屋咖啡館，傍晚再回到市場與河邊。真正留下來的，往往是轉角一張矮凳、炭火上的香氣，或雨後忽然變深的綠。</p>
        </div>
      </section>

      <section className="cm-photo-essay" aria-label="清邁影像札記">
        <figure className="cm-photo cm-photo-tall"><div /><figcaption><b>01</b> 古城的金色清晨</figcaption></figure>
        <article className="cm-pullquote"><span>“</span><p>山城不催促你。<br />它只是把每一段路，<br />放回適合步行的速度。</p></article>
        <figure className="cm-photo cm-photo-wide"><div /><figcaption><b>02</b> 雲霧之上的北方山線</figcaption></figure>
      </section>

      <section className="cm-daybook">
        <header><p className="cm-label">ONE DAY / FOUR TEMPOS</p><h2>一日慢行簿</h2><span>OLD CITY → MARKET → MOUNTAIN → RIVER</span></header>
        <div className="cm-timeline">
          {chapters.map((chapter, index) => (
            <article key={chapter.time}><b>{chapter.time}</b><span>0{index + 1}</span><div><h3>{chapter.title}</h3><p>{chapter.text}</p></div></article>
          ))}
        </div>
      </section>

      <section className="cm-flavours">
        <div className="cm-flavour-image" />
        <div className="cm-flavour-copy">
          <p className="cm-label">NORTHERN TABLE</p>
          <h2>一碗咖哩麵，<br />是最短的地方史。</h2>
          <p>椰奶的圓潤、炸麵的脆、醃菜與檸檬的酸，最後才是辣。清邁的味道不只在餐廳，也藏在清晨市場與路邊小桌。</p>
          <dl><div><dt>必吃</dt><dd>咖哩麵、香草豬肉腸</dd></div><div><dt>最佳時間</dt><dd>07:00–10:00</dd></div><div><dt>點餐提示</dt><dd>辣度先從少辣開始</dd></div></dl>
        </div>
      </section>

      <section className="cm-practical">
        <p className="cm-label">POCKET NOTES</p>
        <h2>出發前，放進口袋的四件事</h2>
        <div className="cm-note-grid">
          <article><span>01</span><h3>季節</h3><p>十一月至二月早晚涼爽，進山請多帶一件薄外套。</p></article>
          <article><span>02</span><h3>移動</h3><p>古城適合步行；跨區可搭雙條車，出發前先確認價格。</p></article>
          <article><span>03</span><h3>寺院</h3><p>穿著覆蓋肩膀與膝蓋，進入殿內前脫鞋並放低音量。</p></article>
          <article><span>04</span><h3>拍攝</h3><p>清晨六至八點光線柔和，也能避開午後高溫與人潮。</p></article>
        </div>
      </section>

      <footer className="cm-footer"><div><p>NEXT MORNING</p><h2>把鬧鐘調早一點。</h2></div><a href={`${BASE_PATH}/travel/`}>返回所有旅程 ↗</a></footer>
    </main>
  );
}
