import type { Metadata } from "next";
import "../guide-pages.css";
import "./overview.css";

export const metadata: Metadata = {
  title: "快速認識納米比亞",
  description: "從古老沙漠、國土尺度、野生動物、世界遺產到低光害星空，快速認識納米比亞。",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const chapters = [
  {
    number: "01",
    label: "TIME",
    title: "古老沙漠與千年活化石",
    lead: "有些風景的時間，不以年計算，而以千萬年計算。",
    paragraphs: [
      "納米布沙漠被認為已有數千萬年歷史，是世界最古老的沙漠之一。風、河流與大西洋洋流持續搬運沙粒，形成今天延伸至海岸的巨大沙海。",
      "Deadvlei 的白色鹽地上，數百年前枯死的駱駝刺樹因極度乾燥而沒有完全腐朽；納米布沙漠特有的千歲蘭，一生只長出兩片葉子，部分植株則能存活超過千年。",
    ],
    facts: ["55 MILLION YEARS", "DEADVLEI", "WELWITSCHIA"],
  },
  {
    number: "02",
    label: "SCALE",
    title: "大得難以想像的土地",
    lead: "約三百萬人，生活在約二十三個台灣大的國土上。",
    paragraphs: [
      "納米比亞面積約 82.4 萬平方公里，人口卻僅約三百萬。約 22% 的國土是沙漠，約 70% 屬乾燥或半乾燥地帶；北部與東北部雨量較多，也形成較集中的聚落與人口帶。",
      "Etosha 國家公園面積約 22,935 平方公里，光是一座國家公園，就接近台灣面積的三分之二。這種尺度，也改變了我們對距離與旅行時間的理解。",
    ],
    facts: ["≈ 23 × TAIWAN", "3 MILLION PEOPLE", "ETOSHA ≈ 64% TAIWAN"],
  },
  {
    number: "03",
    label: "LIFE",
    title: "在乾旱中學會生存",
    lead: "荒野看似空無，生命卻以自己的方式留了下來。",
    paragraphs: [
      "納米比亞擁有全球規模最大的自由活動獵豹族群。Etosha 的水源周圍，則聚集大象、長頸鹿、犀牛、獅子與不同羚羊。",
      "西北部荒野還生活著適應乾旱環境的沙漠象與沙漠獅。牠們沿著乾涸河床長距離移動，記住散落在荒野中的水源與食物。",
    ],
    facts: ["CHEETAH COUNTRY", "DESERT ELEPHANTS", "DESERT LIONS"],
  },
  {
    number: "04",
    label: "CULTURE",
    title: "岩石留下的記憶",
    lead: "這片土地不只有自然史，也保存著跨越數千年的人類痕跡。",
    paragraphs: [
      "Twyfelfontein 保存兩千多幅岩刻，是非洲規模最大、最重要的岩刻集中地之一，並被列為世界文化遺產。Spitzkoppe 的花崗岩洞穴與岩壁間，也留有古老的桑人岩畫。",
      "辛巴、赫雷羅、桑人與其他族群的語言、服飾及生活傳統，和 Swakopmund 街道上的德國殖民建築並存，形成納米比亞複雜而多層次的人文面貌。",
    ],
    facts: ["TWYFELFONTEIN", "SAN ROCK ART", "SWAKOPMUND"],
  },
  {
    number: "05",
    label: "LAND & LIGHT",
    title: "花崗岩、沙海與黑夜",
    lead: "白天的地貌與夜晚的星空，同樣改變人對尺度的感受。",
    paragraphs: [
      "Spitzkoppe 的花崗岩群峰、天然拱門與奇特岩體從平原升起；在 Sandwich Harbour，巨型沙丘則直接落入大西洋，形成少見的沙海相連景觀。",
      "人口稀少、城市相距遙遠，大片荒野幾乎沒有人工照明。當夜晚降臨，銀河不再只是天空的背景，而成為地景的一部分。",
    ],
    facts: ["SPITZKOPPE", "SANDWICH HARBOUR", "DARK SKY"],
  },
];

export default function NamibiaOverviewPage() {
  return <main className="guide-page overview-page">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a><a href={`${BASE_PATH}/travel/`}>JOURNEY ↗</a></header>

    <section className="overview-cover">
      <p>GUIDE / 01 · START HERE</p>
      <h1>快速認識<br />納米比亞</h1>
      <div><span>TIME · SCALE · LIFE</span><span>CULTURE · LAND &amp; LIGHT</span></div>
    </section>

    <section className="overview-opening">
      <div><p>NOT ONLY SAFARI</p><h2>這裡，<br />不只有動物。</h2></div>
      <div className="overview-opening-copy">
        <p>很多人想到非洲，第一個想到的是 Safari。</p>
        <p>但納米比亞真正令人難忘的，是一片經過數千萬年形成的沙漠、直抵大西洋的巨大沙丘、在乾旱中學會生存的生命，以及城市之外幾乎沒有人工照明的黑夜。</p>
        <p>這個人口不多的國家，卻擁有大得難以想像的土地。</p>
      </div>
    </section>

    <section className="overview-scale">
      <figure>
        <img src={`${BASE_PATH}/travel/namibia-taiwan-scale-preview.webp`} alt="納米比亞面積約為台灣二十三倍的比例概念圖" />
        <figcaption><span>SCALE STUDY</span><b>約 23 個台灣的面積</b><small>概念示意，非精確排列</small></figcaption>
      </figure>
      <div className="scale-numbers">
        <article><b>3,022,401</b><span>2023 年人口普查</span></article>
        <article><b>≈ 23×</b><span>約為台灣國土面積的二十三倍</span></article>
        <article><b>≈ 1/8</b><span>人口大約只有台灣的八分之一</span></article>
        <p className="scale-note">離開首都、沿海城鎮與北部人口較集中的地區後，公路可能連續行駛數小時，眼前仍只有砂石路、荒漠與地平線。部分偏遠路段不只車流稀少，行動通訊也不穩定，甚至完全沒有訊號；一旦車輛拋錨，可能遇不到其他人，也無法立即聯絡救援，確實存在安全風險。</p>
        <p className="scale-safety">長途移動前，必須確認燃油、備胎、飲水與離線地圖，並讓同行者或住宿方知道預計抵達時間。</p>
      </div>
    </section>

    <section className="overview-places">
      <header><p>PLACES ON OUR ROUTE</p><h2>一路走過的，<br />納米比亞。</h2><div><p>城市只是這趟旅程的一部分。從首都出發後，路線穿越國家公園、岩石荒原與兩片性格完全不同的沙漠。</p><p>這五個區域不只是地圖上的停靠點，也代表納米比亞從城市、動物、海岸到沙漠不斷轉換的面貌。</p></div></header>
      <div className="places-grid">
        <article><span>01 / CAPITAL</span><h3>Windhoek<br />溫得和克</h3><p>位於中央高原的首都，也是政府、商業、航空與公路交通中心。多數國際旅程從這裡開始整備，再向北部國家公園或西部沙漠出發。</p></article>
        <article><span>02 / COAST</span><h3>Swakopmund · Walvis Bay<br />海岸城市</h3><p>Swakopmund 的德國殖民建築與咖啡館，是荒野路線中少見的城市停頓；Walvis Bay 則是重要港口、潟湖及前往 Sandwich Harbour 的入口。</p></article>
        <article><span>03 / NATIONAL PARK</span><h3>Etosha<br />埃托沙國家公園</h3><p>接近台灣三分之二大的野生動物國家公園。旱季時，大象、長頸鹿、犀牛、獅子與羚羊會集中到少數水源周圍。</p></article>
        <article><span>04 / NAMIB</span><h3>Namib · Sossusvlei<br />納米布沙漠</h3><p>世界最古老的沙漠之一。巨大的紅色沙丘、Sossusvlei 鹽沼與 Deadvlei 枯樹，構成納米比亞最具代表性的地貌。</p></article>
        <article><span>05 / KALAHARI</span><h3>Kalahari<br />喀拉哈里</h3><p>位於旅程尾聲的紅色沙地與稀疏草原。它比納米布沙漠多了一些植被與生命，也讓旅程從巨大沙丘慢慢回到有人活動的土地。</p></article>
      </div>
    </section>

    <section className="overview-chapters">
      {chapters.map((chapter) => <article className="overview-chapter" key={chapter.number}>
        <header><span>{chapter.number}</span><small>{chapter.label}</small></header>
        <div className="chapter-title"><h2>{chapter.title}</h2><blockquote>{chapter.lead}</blockquote></div>
        <div className="chapter-copy">{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="chapter-facts">{chapter.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
      </article>)}
    </section>

    <section className="overview-ending"><p>這些不是散落的景點，<br />而是一趟旅程即將穿越的土地。</p><a href={`${BASE_PATH}/travel/#route`}>查看 13 天納米比亞路線 →</a></section>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>查看所有旅行攻略 ↗</a><span>EXPERIENCE · 2025.09 / REVIEWED · 2026.07</span></footer>
  </main>;
}
