import type { Metadata } from "next";
import "../guide-pages.css";
import "../cta.css";
import "../cta-4k.css";
import "./overview.css";
import "./coast-city.css";
import MapSecretLink from "./MapSecretLink";

export const metadata: Metadata = {
  title: "快速認識納米比亞",
  description: "從古老沙漠、國土尺度、野生動物、世界遺產到低光害星空，快速認識納米比亞。",
  alternates: { canonical: "/travel/guide/overview/" },
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const chapters = [
  {
    number: "01",
    label: "TIME",
    title: "古老沙漠與千年活化石",
    lead: "有些風景的時間，不以年計算，而以千萬年計算。",
    paragraphs: [
      "這裡說的不是五千年，而是約五千五百萬年。納米布被認為是地球上維持乾旱環境最久的沙漠之一；更精確地說，古老的是整個乾旱地景，今天仍在移動的沙丘則是不斷被風重新塑造的年輕表面。",
      "它和撒哈拉不同：撒哈拉幅員更大，氣候也曾在草原與沙漠之間反覆轉換；南美洲阿塔卡馬同樣是極古老的沿海沙漠，因此「世界最古老」並不是完全沒有爭議的稱號。東側的卡拉哈里則多為能長出草木的半乾旱沙地，不像納米布如此極端。",
      "納米布最獨特之處，是寒冷的本格拉洋流讓海岸少雨卻多霧。來自非洲內陸的砂石，經河流送到大西洋，再由洋流向北搬運、由風推回陸地，形成巨大的紅色沙海；在幾乎沒有雨的地方，霧反而成為昆蟲、植物與其他生命的重要水源。",
      "Deadvlei 的白色鹽地上，數百年前枯死的駱駝刺樹因極度乾燥而沒有完全腐朽；納米布沙漠特有的千歲蘭，一生只長出兩片葉子，部分植株則能存活超過千年。",
    ],
    facts: ["≈ 55 MILLION YEARS", "COASTAL FOG DESERT", "RIVER · CURRENT · WIND"],
  },
  {
    number: "02",
    label: "SCALE",
    title: "大得難以想像的土地",
    lead: "約三百萬人，生活在約二十三個台灣大的國土上。",
    paragraphs: [
      "納米比亞面積約 82.4 萬平方公里，約為台灣的二十三倍；人口卻只有約三百萬，大約是台灣的八分之一，因此成為世界上人口密度最低的國家之一。約 22% 的國土是沙漠，約 70% 屬乾燥或半乾燥地帶；北部與東北部雨量較多，也形成較集中的聚落與人口帶。",
      "Etosha 是一座以野生動物保育為核心的國家公園，面積約 22,935 平方公里，接近台灣面積的三分之二。這種尺度，也改變了我們對距離與旅行時間的理解。",
    ],
    facts: ["≈ 23 × TAIWAN", "3 MILLION PEOPLE", "ETOSHA ≈ 64% TAIWAN"],
  },
  {
    number: "03",
    label: "LIFE",
    title: "這不是大遷徙的草原",
    lead: "在東非，目光追著獸群移動；在納米比亞，先找到水，才等得到生命。",
    paragraphs: [
      "肯亞與坦尚尼亞的 Safari，常以遼闊草原、豐沛雨季與成千上萬移動的獸群震撼旅人；納米比亞的動物密度較低，荒野也更安靜，卻擁有全球規模最大的自由活動獵豹族群。到了旱季，Etosha 僅存的水塘反而成為舞台：大象、長頸鹿、犀牛、獅子與羚羊，依照自己的節奏輪流現身。",
      "西北部的沙漠象與沙漠獅並不是另一個物種，而是在極端乾燥環境中形成特殊行為的族群。牠們沿乾涸河床尋找零星植被與水源；沙漠象能比東非的同類走得更遠，也能忍受更少的可用水。在這裡，看動物不是追逐數量，而是看生命如何讀懂一片缺水的土地。",
    ],
    facts: ["CHEETAH COUNTRY", "DESERT ELEPHANTS", "DESERT LIONS"],
  },
  {
    number: "04",
    label: "HISTORY",
    title: "從殖民地走向獨立",
    lead: "今天的納米比亞，是古老文化、殖民歷史與現代國家重疊而成的土地。",
    paragraphs: [
      "在歐洲殖民之前，桑人、納馬、達馬拉、赫雷羅與奧萬博等族群，早已在不同地貌中建立生活方式。1884 年起，這片土地成為德屬西南非洲；第一次世界大戰後，則由南非統治。",
      "經過長期獨立運動與國際斡旋，納米比亞直到 1990 年 3 月 21 日才正式獨立，成為非洲較晚取得獨立的國家之一。當許多非洲國家早在 1950 至 1960 年代陸續脫離殖民統治時，納米比亞又多等待了近三十年。德國殖民建築仍留在 Windhoek 與 Swakopmund，但殖民統治造成的傷痕，也是理解這個國家不可省略的一部分。",
    ],
    facts: ["1884 · GERMAN COLONY", "1990 · INDEPENDENCE", "21 MARCH"],
  },
  {
    number: "05",
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
    number: "06",
    label: "LAND & LIGHT",
    title: "花崗岩、沙海與黑夜",
    lead: "白天的地貌與夜晚的星空，同樣改變人對尺度的感受。",
    paragraphs: [
      "Spitzkoppe 的花崗岩群峰、天然拱門與奇特岩體從平原升起；在 Sandwich Harbour，巨型沙丘則直接落入大西洋，形成少見的沙海相連景觀。",
      "人口稀少、城市相距遙遠，大片荒野幾乎沒有人工照明。當夜晚降臨，銀河不再只是天空的背景，而成為地景的一部分。",
    ],
    facts: ["SPITZKOPPE", "SANDWICH HARBOUR", "DARK SKY"],
  },
  {
    number: "07",
    label: "RESOURCES & ECONOMY",
    title: "沙漠之下的富饒",
    lead: "看似空無的土地，地下、海底與荒野本身，都是這個國家的資源。",
    paragraphs: [
      "納米比亞的鑽石不只來自陸上礦區，也從大西洋海床被採起。鑽石、鈾、金、鋅與其他礦產長期支撐出口，其中鑽石自 1908 年開始開採，至今仍是最具代表性的礦產。",
      "寒冷的本格拉洋流一面造成海岸多霧、陸地乾燥，一面也把營養帶到海面，養出重要漁場。魚類、礦產與畜牧產品，共同構成這個人口不多國家的對外貿易。",
      "觀光則把另一種稀有資源帶進經濟：遙遠的距離、完整的荒野、野生動物與低光害星空。旅客購買的不是密集景點，而是進入廣大土地的時間與機會。",
      "但資源豐富並不代表每個人都同樣富有。礦業高度依賴國際價格，也未必創造大量工作；失業、貧富差距與乾旱風險，仍是理解納米比亞經濟時不能忽略的另一面。",
    ],
    facts: ["DIAMONDS ON LAND & AT SEA", "URANIUM · FISHERIES", "WILDERNESS TOURISM"],
  },
];

export default function NamibiaOverviewPage() {
  return <main className="guide-page overview-page">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a><a href={`${BASE_PATH}/travel/`}>JOURNEY ↗</a></header>

    <section className="overview-cover">
      <p>GUIDE / 01 · START HERE</p>
      <h1>快速認識<br />納米比亞</h1>
      <div><span>TIME · SCALE · LIFE</span><span>HISTORY · CULTURE · LAND · ECONOMY</span></div>
    </section>

    <section className="overview-opening">
      <div><p>NOT ONLY SAFARI</p><h2>這裡，<br />不只有動物。</h2></div>
      <div className="overview-opening-copy">
        <p>很多人想到非洲，第一個想到的是 Safari。</p>
        <p>但納米比亞真正令人難忘的，是一片經過數千萬年形成的沙漠、直抵大西洋的巨大沙丘、在乾旱中學會生存的生命，以及城市之外幾乎沒有人工照明的黑夜。</p>
        <p>在非洲旅遊目的地中，納米比亞給人的感受相對穩定而整潔，這也是我們選擇這裡的原因之一。Windhoek 與 Swakopmund 的德國殖民建築、咖啡館與街廓，也讓部分城市帶著鮮明的歐洲街景感。一路上，嚮導總說這裡很安全，但到大賣場採買時，我們仍會輪流留人在車旁看顧行李；真正安排夜間移動時，他們也相對保守，不隨意步行、不臨時改道。這裡的安全感，仍建立在警覺與妥善安排之上，尤其是在入夜後的城市與通訊不穩的偏遠道路上。</p>
        <p>這個人口不多的國家，卻擁有大得難以想像的土地。</p>
      </div>
    </section>

    <section className="country-facts" aria-label="納米比亞地理與歷史速寫">
      <header><p>WHERE WE ARE</p><h2>先知道它在哪裡，<br />再走進這片土地。</h2></header>
      <div className="country-facts-grid">
        <article><span>01 / SOUTHWEST AFRICA</span><strong>位於非洲西南部，南接南非</strong><p>納米比亞西面是南大西洋，東鄰波札那，北方與安哥拉相連，東北狹長的國土則伸向尚比亞。西側約一千五百公里的海岸線，幾乎全被納米布沙漠與霧氣覆蓋。</p></article>
        <article><span>02 / TWO DESERTS</span><strong>西邊納米布，東邊卡拉哈里</strong><p>納米布沿著大西洋海岸延伸，受寒冷的本格拉洋流與海霧影響，是極度乾燥的沿海沙漠；卡拉哈里分布在國土東側，延伸進波札那與南非，更接近有草木生長的半乾旱沙地。兩者之間，則是南北延伸的中央高原與大斷崖。</p></article>
        <article><span>03 / A YOUNG REPUBLIC</span><strong>相繼經歷德國與南非統治</strong><p>1884 年起，這裡成為德屬西南非洲。第一次世界大戰期間，南非軍隊占領這片土地，其後長期由南非治理，並帶入種族隔離制度。經過數十年的獨立運動與聯合國斡旋，納米比亞終於在 1990 年 3 月 21 日獨立，是非洲最晚獨立的國家之一。</p></article>
        <article><span>04 / WINDHOEK</span><strong>一座從熱泉旁發展起來的高原城市</strong><p>首都 Windhoek 位於國土中央、海拔約一千六百五十公尺的高原盆地。Windhoek 常被直譯為「風之角」，但名稱來源仍有不同說法。更早的聚落確實因天然熱泉而形成：Nama 名稱「/Ai-//Gams」意為火之水，Herero 名稱「Otjomuise」意為蒸氣之地；1920 年代鑽井取水後，原有泉水逐漸乾涸。</p></article>
      </div>
    </section>

    <section className="overview-scale">
      <details className="map-secret" id="map-secret-story">
        <summary><span>MAP SECRET / 右上角的彩蛋</span><strong>一條想橫跨非洲，最後卻停在瀑布前的「手臂」。</strong><b>揭開故事 ＋</b></summary>
        <div><p>十九世紀末，德國在非洲西岸擁有德屬西南非洲，在遙遠的東岸也控制著德屬東非洲。德國想像著：如果能從西側殖民地抵達贊比西河，或許就能順流向東，建立一條朝向印度洋的貿易與運輸通道。</p><p>於是 1890 年，德國與英國談判取得一條狹長走廊，讓國土一路向東伸到贊比西河。這片土地後來以當時的德國首相 Leo von Caprivi 命名，成為 <em>Caprivi Strip</em>。在外交官的地圖上，河流像一條通往東岸的藍色道路，計畫看起來幾乎完成了。</p><p>但真正的非洲，並不服從桌上的直線。走廊抵達贊比西河後不遠，水勢便在維多利亞瀑布轟然墜落，讓船隻不可能如想像般一路通往印度洋。德國得到了一條通往河流的走廊，卻沒有得到夢想中的跨洲航道。</p><p>帝國的計畫最終落空，邊界卻留了下來。今天這裡主要稱為 Zambezi Region，氣候也和納米比亞大部分地區截然不同——河流、濕地與綠色林地取代大片乾旱荒漠。一次失敗的殖民構想，反而成為納米比亞地圖上最醒目的形狀。</p><small>這趟旅程沒有走到這裡；先把它留作地圖上的下一個故事。</small></div>
      </details>
      <figure>
        <div className="scale-map-wrap">
          <img src={`${BASE_PATH}/travel/namibia-taiwan-scale-preview.webp`} alt="納米比亞面積約為台灣二十三倍的比例概念圖" />
          <MapSecretLink />
        </div>
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

    <section className="overview-chapters">
      {chapters.map((chapter) => <article className="overview-chapter" key={chapter.number}>
        <header><span>{chapter.number}</span><small>{chapter.label}</small></header>
        <div className="chapter-title"><h2>{chapter.title}</h2><blockquote>{chapter.lead}</blockquote></div>
        <div className="chapter-copy">{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="chapter-facts">{chapter.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
      </article>)}
    </section>

    <section className="overview-places">
      <header><p>PLACES ON OUR ROUTE</p><h2>把認識，<br />放回這趟路線。</h2><div><p>前面的時間、尺度、生命與歷史，最後都落在我們真正走過的地方。從首都出發後，路線穿越國家公園、岩石荒原、海岸與兩片性格完全不同的沙漠。</p><p>以下不是另一份景點清單，而是把納米比亞的不同面貌，重新放回這趟旅程的行進順序。</p></div></header>
      <div className="places-grid">
        <article><span>01 / CAPITAL</span><h3>Windhoek<br />溫得和克</h3><p>位於中央高原的首都，也是政府、商業、航空與公路交通中心。多數國際旅程從這裡開始整備，再向北部國家公園或西部沙漠出發。</p></article>
        <article><span>02 / NATIONAL PARK</span><h3>Etosha<br />埃托沙國家公園</h3><p>它是一座以野生動物保育為核心的國家公園，面積接近台灣的三分之二。旱季時，大象、長頸鹿、犀牛、獅子與羚羊會集中到少數水源周圍。</p></article>
        <article><span>03 / ROCK & HERITAGE</span><h3>Brandberg · Spitzkoppe<br />岩峰與古老痕跡</h3><p>離開 Etosha 後，路線進入乾涸河床與花崗岩荒原。Brandberg 的岩畫、Spitzkoppe 的天然拱門與營地星空，讓地貌與人類留下的痕跡在同一段路上相遇。</p></article>
        <article className="coast-city-card"><span>04 / COAST</span><h3>Swakopmund · Walvis Bay<br />海岸城市</h3><p className="coast-city-lead">帶著歐洲街景的非洲海岸城市。</p><img src={`${BASE_PATH}/travel/swakopmund-european-streets.avif`} alt="Swakopmund 的德國殖民建築街景"/><p>Swakopmund 的德國殖民建築與咖啡館，是荒野路線中少見的城市停頓；Walvis Bay 則是重要港口、潟湖及前往 Sandwich Harbour 的入口。</p></article>
        <article><span>05 / NAMIB</span><h3>Namib · Sossusvlei<br />納米布沙漠</h3><p>世界最古老的沙漠之一。巨大的紅色沙丘、Sossusvlei 鹽沼與 Deadvlei 枯樹，構成納米比亞最具代表性的地貌。</p></article>
        <article><span>06 / KALAHARI</span><h3>Kalahari<br />喀拉哈里</h3><p>位於旅程尾聲的紅色沙地與稀疏草原。它比納米布沙漠多了一些植被與生命，也讓旅程從巨大沙丘慢慢回到有人活動的土地。</p></article>
      </div>
    </section>

    <section className="overview-ending"><p>理解了這片土地，<br />再開始安排真正走過的十三天。</p><a href={`${BASE_PATH}/travel/guide/visa/`}>下一步：確認簽證與入境準備 →</a></section>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>查看所有旅行攻略 ↗</a><span>EXPERIENCE · 2025.09 / REVIEWED · 2026.07</span></footer>
  </main>;
}
