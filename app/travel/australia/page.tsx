import type { Metadata } from "next";
import "./australia.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "雪梨與黃金海岸｜Australia Night Journal",
  description: "從雪梨港灣與藍山三姊妹峰走到黃金海岸，再深入 Springbrook 自然橋尋找藍光螢火蟲。",
  alternates: { canonical: "/travel/australia/" },
};

const stops = [
  ["DAY 1", "TAIPEI → AUSTRALIA", "夜航前往澳洲", "DEPARTURE"],
  ["DAY 2", "BRISBANE → GOLD COAST", "市政廳、庫莎山、藍儂酒莊", "COASTBOUND"],
  ["DAY 3", "GOLD COAST HINTERLAND", "天堂鄉農莊、神仙灣、自然橋藍光螢火蟲", "SPRINGBROOK"],
  ["DAY 4", "SEA WORLD", "從海洋動物認識澳洲水域", "MARINE PARK"],
  ["DAY 5", "BLUE MOUNTAINS", "三姊妹峰與傑米遜谷", "1,015 M"],
  ["DAY 6", "SYDNEY HARBOUR", "奧運會場、歌劇院、魚市場、水族館、海德公園", "CITY DAY"],
  ["DAY 7", "SYDNEY COAST", "邦黛海灘、新南威爾斯藝術館、雪梨灣遊船、岩石區", "HARBOUR FINALE"],
];

const attractionGroups = [
  {
    region: "QUEENSLAND",
    title: "布里斯本與黃金海岸",
    intro: "從河岸城市、山頂視野與酒莊，走向海岸度假區和內陸雨林。",
    places: [
      ["布里斯本市政廳", "位於市中心的歷史地標，以古典立面、鐘塔與公共空間認識布里斯本的城市發展。"],
      ["庫莎山", "從山頂俯瞰布里斯本市區、河道與遠方山脈，是理解整座城市地理位置的最佳視角之一。"],
      ["藍儂酒莊", "從葡萄園、釀造到餐桌感受昆士蘭內陸的農業景觀，也讓城市行程多了一段緩慢的鄉間節奏。"],
      ["黃金海岸", "綿長沙灘、高樓天際線與衝浪文化並存；海岸之外，西側山區很快就轉入截然不同的雨林環境。"],
      ["天堂鄉農莊", "以無尾熊、袋鼠、綿羊與牧場生活為主題，集中呈現澳洲原生動物和農莊文化。"],
      ["神仙灣", "規劃完整的濱水社區，以遊艇碼頭、餐飲與悠閒步道呈現黃金海岸另一種安靜的度假面貌。"],
      ["Springbrook 自然橋", "瀑布穿過玄武岩洞頂落入水潭；夜晚關掉燈光後，可以觀察洞頂的藍光螢火蟲。"],
      ["海洋世界", "結合海洋動物展示與保育教育；小藍企鵝、鯊魚及其他海洋生物是認識澳洲水域的入口。"],
    ],
  },
  {
    region: "BLUE MOUNTAINS",
    title: "藍山國家公園",
    intro: "砂岩懸崖、桉樹森林和深谷構成雪梨西側最具代表性的世界遺產地景。",
    places: [
      ["三姊妹峰", "三座受到長期侵蝕形成的砂岩柱矗立於傑米遜谷邊緣，從 Echo Point 可一次看見山峰、峭壁與遼闊森林。"],
      ["傑米遜谷", "層層森林覆蓋谷地，桉樹揮發物與光線交互作用形成遠方的藍色薄霧，也是『藍山』名稱的視覺印象。"],
      ["高原與步道", "觀景台讓短暫停留也能掌握地貌；若時間充裕，森林步道則能從崖頂一路深入蕨類與瀑布環境。"],
    ],
  },
  {
    region: "SYDNEY",
    title: "雪梨港灣與城市海岸",
    intro: "建築、海港、藝術與沙灘彼此相連，城市行程可以在步行、渡輪和遊船之間展開。",
    places: [
      ["雪梨奧運會場", "由大型運動場館、公園與公共空間組成，呈現城市如何將國際賽事場地轉化為持續使用的生活區域。"],
      ["雪梨歌劇院", "不只是港灣地標，也是持續演出的表演藝術中心；建築外殼、平台和周圍水岸值得從不同角度觀看。"],
      ["雪梨魚市場", "透過海鮮攤位與現場餐飲感受港口城市的飲食日常，也是觀察澳洲海產種類最直接的一站。"],
      ["雪梨水族館", "沿著澳洲不同水域環境安排展示，可近距離觀察鯊魚、魟魚、企鵝與卵鞘中的生命發育。"],
      ["海德公園", "位於市中心的歷史公園，以林蔭大道、噴泉與紀念建築連接城市商業區和文化景點。"],
      ["邦黛海灘", "以弧形沙灘、海水泳池與衝浪文化聞名；從海岸步道可繼續觀看砂岩岬角和太平洋浪況。"],
      ["新南威爾斯藝術館", "收藏澳洲、原住民族、亞洲與國際藝術，讓港灣風景之外多一條理解澳洲文化的路徑。"],
      ["雪梨港遊船", "從水面串起歌劇院、港灣大橋與沿岸社區，能比陸上更完整地讀出天然港灣的尺度。"],
      ["岩石區", "雪梨早期港口發展的重要街區，砂岩建築、巷道與倉庫保留了城市最早期的歷史層次。"],
    ],
  },
];

export default function AustraliaPage() {
  return (
    <main className="au-page">
      <header className="au-nav">
        <a href={`${BASE_PATH}/`} className="au-mark"><span>YH</span><b>EXPEDITIONS</b></a>
        <p>11 / AUSTRALIA</p>
        <nav aria-label="澳洲旅誌導覽"><a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS</a><a href="#route">ROUTE</a><a href="#notes">NIGHT NOTES</a></nav>
      </header>

      <section className="au-hero">
        <img src={`${BASE_PATH}/travel/australia/natural-bridge-glowworms.png`} alt="Springbrook 自然橋洞穴中的瀑布與螢火蟲微光" />
        <div className="au-hero-filter" />
        <div className="au-hero-title">
          <span>SPRINGBROOK · AFTER DARK</span>
          <h1>瀑布落進<br />螢火星河</h1>
          <div className="au-stamp"><b>AU</b><small>BRISBANE<br />SYDNEY</small></div>
        </div>
        <p className="au-hero-caption">離開黃金海岸的霓虹，沿著雨林山路往上。自然橋的岩洞裡，水聲蓋過腳步，藍光螢火蟲在頭頂慢慢亮起。</p>
      </section>

      <figure className="au-album-spread">
        <img src={`${BASE_PATH}/travel/australia/sydney-night-skyline.avif`} alt="入夜後的雪梨市中心與港灣大橋" />
        <figcaption><b>ARRIVAL / SYDNEY AFTER DARK</b><span>城市燈火沿著港灣展開，港灣大橋在夜色裡成為清楚的弧線。</span></figcaption>
      </figure>

      <section className="au-dispatch">
        <div className="au-dispatch-index"><span>7-DAY JOURNAL</span><b>AUSTRALIA</b><small>BRISBANE → GOLD COAST → BLUE MOUNTAINS → SYDNEY</small></div>
        <article>
          <p className="au-kicker">SEVEN DAYS / QUEENSLAND TO NEW SOUTH WALES</p>
          <h2>先從昆士蘭的白天出發，<br />最後在雪梨港灣收束。</h2>
          <div className="au-columns"><p>第一天從台北飛往澳洲；第二天走過布里斯本市政廳、庫莎山、酒莊與黃金海岸。第三天進入天堂鄉農莊、神仙灣與 Springbrook 自然橋，讓動物和雨林成為旅程的核心。</p><p>第四天在海洋世界看海洋生物，第五天轉往藍山國家公園。第六、七天回到雪梨，從奧運會場、歌劇院、魚市場一路走到邦黛海灘、藝術館、港灣遊船與岩石區。</p></div>
        </article>
      </section>

      <figure className="au-blue-mountains">
        <img src={`${BASE_PATH}/travel/australia/blue-mountains-three-sisters.avif`} alt="藍山國家公園三姊妹峰與傑米遜谷全景" />
        <figcaption><b>BLUE MOUNTAINS · THREE SISTERS</b><span>三座砂岩峰從傑米遜谷邊緣升起，桉樹林的藍霧一路延伸至地平線。</span><small>PHOTO / YOUNG HUNG</small></figcaption>
      </figure>

      <section className="au-route" id="route">
        <header><span>ROUTE LOG / 7 DAYS</span><h2>從昆士蘭雨林，走到雪梨港灣。</h2></header>
        <ol>{stops.map(([n, en, zh, meta]) => <li key={n}><span>{n}</span><div><h3>{en}</h3><p>{zh}</p></div><b>{meta}</b></li>)}</ol>
      </section>

      <section className="au-attractions" aria-labelledby="attractions-title">
        <header><p>PLACE NOTES / JOURNEY OVERVIEW</p><h2 id="attractions-title">景點不只是清單，而是一路變化的城市與地景。</h2><span>以下依區域整理大方向介紹，保留旅行記憶，也方便之後逐一補上照片與更完整的故事。</span></header>
        <div className="au-attraction-groups">{attractionGroups.map((group, groupIndex) => <article className="au-attraction-group" key={group.region}>
          <div className="au-region-heading"><span>{String(groupIndex + 1).padStart(2, "0")} / {group.region}</span><h3>{group.title}</h3><p>{group.intro}</p></div>
          <dl>{group.places.map(([name, description], placeIndex) => <div key={name}><dt><small>{String(placeIndex + 1).padStart(2, "0")}</small>{name}</dt><dd>{description}</dd></div>)}</dl>
        </article>)}</div>
      </section>

      <section className="au-aquarium" aria-labelledby="aquarium-title">
        <header><p>MARINE FIELD NOTES</p><h2 id="aquarium-title">水族館裡，最小的身影與尚未孵化的生命。</h2><span>海洋世界與雪梨水族館是兩段不同的參觀記憶：一段看企鵝如何生活，一段隔著卵鞘觀察鯊魚生命的起點。</span></header>
        <figure className="au-dolphin-panorama"><img src={`${BASE_PATH}/travel/australia/seaworld-dolphins.avif`} alt="海洋世界的兩隻海豚躍出水面" /><figcaption><b>SEA WORLD / DOLPHINS</b><span>速度、躍升與入水，在短短幾秒裡看見海洋哺乳類的身體能力。</span></figcaption></figure>
        <div className="au-marine-grid">
          <article className="au-penguin-note"><img src={`${BASE_PATH}/travel/australia/little-penguins.avif`} alt="四隻並排站立的小藍企鵝" /><div className="au-marine-copy"><span>01 / LITTLE PENGUIN</span><h3>世界上體型最小的企鵝</h3><p>小藍企鵝是全球體型最小的企鵝，背部帶著深藍色調。牠們白天在海上覓食，黃昏後才返回岸邊洞穴；小巧的身形在水下依然快速而靈活。</p><small>GOLD COAST / SEA WORLD</small></div></article>
          <article className="au-shark-note"><img src={`${BASE_PATH}/travel/australia/shark-egg-case.avif`} alt="手持螺旋狀鯊魚卵鞘進行解說" /><div className="au-marine-copy"><span>02 / SHARK EGG CASE</span><h3>鯊魚蛋其實是一只卵鞘</h3><p>部分鯊魚會產下由角蛋白構成的卵鞘。照片中的螺旋形外殼可卡入岩縫，保護胚胎在其中發育；不同鯊魚的卵鞘也有完全不同的輪廓。</p><small>SYDNEY / AQUARIUM NOTE</small></div></article>
        </div>
      </section>

      <section className="au-sydney-essay" aria-labelledby="sydney-essay-title">
        <header><p>SYDNEY / PHOTO ESSAY</p><h2 id="sydney-essay-title">雪梨是在水邊閱讀的城市。</h2><span>市場、老建築、路邊餐亭與渡輪，讓港灣地標之外的城市生活逐漸清楚。</span></header>
        <div className="au-sydney-mosaic">
          <figure className="au-sydney-harbour"><img src={`${BASE_PATH}/travel/australia/opera-house-ferry.avif`} alt="雪梨歌劇院前方駛過一艘綠白渡輪" /><figcaption>歌劇院與渡輪 / BENNELONG POINT</figcaption></figure>
          <figure className="au-sydney-market-sign"><img src={`${BASE_PATH}/travel/australia/fish-market-sign.avif`} alt="雪梨魚市場入口招牌與旗幟" /><figcaption>雪梨魚市場 / PYRMONT</figcaption></figure>
          <figure className="au-sydney-crab"><img src={`${BASE_PATH}/travel/australia/fish-market-crab.avif`} alt="雪梨魚市場工作人員展示皇帝蟹" /><figcaption>市場裡的皇帝蟹 / MORNING</figcaption></figure>
          <figure className="au-sydney-qvb"><img src={`${BASE_PATH}/travel/australia/qvb-interior.avif`} alt="維多利亞女王大廈中庭與大鐘" /><figcaption>維多利亞女王大廈 / CITY CENTRE</figcaption></figure>
          <figure className="au-sydney-harrys"><img src={`${BASE_PATH}/travel/australia/harrys-cafe-de-wheels.avif`} alt="夜間亮起霓虹燈的 Harry’s Cafe de Wheels 餐亭" /><figcaption>Harry’s Cafe de Wheels / WOOLLOOMOOLOO</figcaption></figure>
          <figure className="au-sydney-wide"><img src={`${BASE_PATH}/travel/australia/sydney-harbour-skyline.avif`} alt="從港灣望向雪梨市中心天際線" /><figcaption>從水面回望城市 / SYDNEY HARBOUR</figcaption></figure>
        </div>
      </section>

      <section className="au-southern-notes" aria-labelledby="southern-notes-title">
        <header><p>SOUTHERN HEMISPHERE / OBSERVATIONS</p><h2 id="southern-notes-title">到了南半球，熟悉的事物都有一點不同。</h2><span>從洞頂的藍光到夜空的方向，這些是旅途中真正停下來觀察的三件事。</span></header>
        <div className="au-observation-grid">
          <article><b>01</b><small>GLOW-WORM</small><h3>不是螢火蟲，<br />也不是蠕蟲。</h3><p>牠是外形像小蠕蟲的蕈蚋幼蟲。會從洞頂垂下帶有黏液珠的絲線，以藍綠色微光吸引並捕捉小型昆蟲。</p></article>
          <article><b>02</b><small>SOUTHERN SKY</small><h3>找南十字星，<br />不是找北極星。</h3><p>澳洲看不見指向北方的北極星；南天也沒有同樣明亮的「南極星」。南十字星可以協助辨認南方。</p></article>
          <article><b>03</b><small>CORIOLIS MYTH</small><h3>水槽漩渦，<br />不一定相反。</h3><p>南北半球的科氏力方向確實相反，但對水槽或馬桶太微弱。日常排水方向主要由容器形狀、出水方式與原有水流決定。</p></article>
        </div>
      </section>

      <footer className="au-footer"><p>END OF NIGHT JOURNAL · QUEENSLAND</p><h2>城市熄燈以後，<br />森林才開始發光。</h2><a href={`${BASE_PATH}/travel/`}>回到所有旅程 <span>↗</span></a></footer>
    </main>
  );
}
