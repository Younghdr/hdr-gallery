import type { Metadata } from "next";
import "../guide-pages.css";
import "../field-notes.css";
import "../field-notes-footer.css";
import "../cta.css";
import "../cta-4k.css";
import "../photo-inserts.css";
import "./practical.css";

export const metadata: Metadata = {
  title: "氣候、網路與途中日常｜Namibia Travel Guide",
  description: "納米比亞海岸氣候、特殊插座、MTC 網路、偏遠旅行與沿途必吃整理。",
  alternates: { canonical: "/travel/guide/practical/" },
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function PracticalPage() {
  return <main className="field-page">
    <nav className="field-nav"><a href={`${BASE_PATH}/travel/guide/`}>← RETURN TO GUIDE</a><span>06 / FIELD ESSENTIALS</span></nav>

    <section className="field-hero">
      <p>FIELD NOTES / 06</p>
      <h1><i>真正需要準備的，</i><i>都藏在日常裡。</i></h1>
      <div><span>WEATHER · POWER · NETWORK · FOOD</span><span>NAMIBIA · 2025</span></div>
    </section>

    <section className="field-intro">
      <span>BETWEEN THE STOPS</span>
      <p>從沙漠走到大西洋，衣服、插頭、訊號與一頓熱食，常常比景點清單更直接地改變旅行。這一章不列萬用行李表，只留下我們真正遇到、也希望出發前有人先提醒的事。</p>
    </section>

    <section className="field-section">
      <span>01 / WEATHER &amp; PACKING</span>
      <header><div></div><h2><i>非洲不一定炎熱，</i><i>海岸甚至比想像中更冷。</i></h2></header>
      <div className="field-grid">
        <article><b>DESERT</b><h3>同一天，也可能像兩個季節</h3><p>沙漠與高原的清晨很冷，太陽升起後又迅速變熱。日出、Safari 與夜間拍攝都需要保暖，但白天仍要面對日曬與乾燥；比起一件厚衣服，排汗層、保暖層與防風外套更容易調整。</p></article>
        <article><b>ATLANTIC COAST</b><h3>沙漠到了海邊，反而潮濕得曬不乾衣服</h3><p>沙漠是依降雨量判定，不代表空氣一定乾燥。納米比亞內陸多半乾燥，但 Swakopmund 與 Walvis Bay 位在納米布沙漠和大西洋交界，寒冷的本格拉洋流會冷卻海上濕空氣，形成頻繁的海霧、低雲與強風。這裡幾乎不下雨，夜間相對濕度卻可能很高；離開炎熱的內陸後，體感反而更濕、更冷。</p><p>我們原本以為到了沙漠，手洗衣物應該很快就會乾，實際在 Swakopmund 晾了一晚仍帶著濕氣。入住的住宿也沒有除濕機，不能把台灣旅館的乾衣方式直接套過來。若行程只停一兩晚，避免一次清洗厚衣物；可以優先使用快乾材質、把洗衣安排在較乾燥的內陸，或直接詢問住宿是否提供烘衣與送洗服務。海岸段仍建議準備長褲、保暖中層與真正能擋風的外套。</p></article>
      </div>
    </section>

    <section className="field-section">
      <span>02 / NIGHT GEAR</span>
      <header><div></div><h2><i>夜裡看得見，</i><i>也不打斷荒野的黑。</i></h2></header>
      <div className="field-grid">
        <article><b>HEADLAMP</b><h3>拍星空與夜間 Safari，帶兩種光</h3><p>頭燈是行李中很容易忽略、但在沙漠與營地最實用的裝備。夜間拍攝、架設腳架與回房時，優先選有<strong>低亮度紅光模式</strong>的頭燈；它能保留眼睛的暗適應，也不會像白光一樣破壞同行者的拍攝與觀星。</p></article>
        <article><b>SAFETY</b><h3>夜間觀察時，白光只用在安全</h3><p>參加 Lodge 安排的夜間 Safari 或夜間觀察時，白光模式以<strong>走路、上下車與緊急安全</strong>為主。不要自行用強光追照動物；何時照明、照向哪裡，跟著嚮導與保護區規定即可。另備一組電池或可充電備援，低溫與長時間拍攝都會加快耗電。</p></article>
      </div>
    </section>

    <section className="field-section field-light">
      <span>03 / POWER</span>
      <header><div></div><h2><i>三根圓腳看起來相似，</i><i>買錯就是插不進去。</i></h2></header>
      <div className="field-copy">
        <p>納米比亞主要使用南非規格的 Type M，也可能遇到 Type D。兩者都是三根圓腳，但插腳粗細不同；台灣常見的萬國轉接頭未必包含真正可用的 Type M，而台灣實體店也不容易臨時買到。</p>
        <p>出發前應直接對照插頭照片與 Type M 標示，不要只看包裝上的「全球通用」。我們會準備不只一個轉接頭，再接一條台灣延長線，讓相機電池、手機、行動電源與其他器材可以同時充電。Lodge 偶爾能借，但數量有限，不適合把整團的充電需求寄託在櫃檯。</p>
        <p><strong>Spitzkoppe｜有插座，不代表整晚都有足夠電力。</strong><br />我們入住的露營區供電有使用限制，需要在白天櫃檯開放時處理；如果晚上才發現可用電力已經耗盡，就不一定還有人能協助。抵達後應先確認供電方式、櫃檯時間與剩餘電量，並趁白天優先充滿相機電池、手機與行動電源。尤其要拍星空或縮時，不能等到入夜才開始整理電力。</p>
      </div>
    </section>

    <section className="field-section">
      <span>03 / MTC &amp; OFFLINE</span>
      <header><div></div><h2><i>有 SIM，</i><i>也不代表一路都有訊號。</i></h2></header>
      <div className="field-grid">
        <article><b>OUR TRIP / 2025</b><h3>實體 SIM，當時仍是最實際的選擇</h3><p>納米比亞主要電信商是 MTC。我們旅行時使用實體 SIM，也遇到手機本身不支援 eSIM 的問題。MTC 直到 2025 年 9 月 19 日才正式向本地客戶推出 eSIM，幾乎和這趟旅程同時開始。</p></article>
        <article><b>NOW</b><h3>eSIM 已經有了，仍要先確認手機與申辦方式</h3><p>現在 MTC 已提供 eSIM，但官方流程仍要求前往門市取得 QR Code。出發前先用 *#06# 確認手機是否顯示 EID，也不要把 MTC 給納米比亞用戶出國使用的 Travel eSIM，誤認成旅客入境使用的本地方案。</p></article>
        <article><b>NO SIGNAL</b><h3>真正要準備的是離線狀態</h3><p>離開城市後，國家公園、沙漠與偏遠公路都可能長時間沒有訊號。事先下載離線地圖、住宿位置與緊急聯絡資料；兩車同行時則保留對講機或其他不依賴行動網路的聯絡方式。</p></article>
        <article><b>DO NOT DEPEND ON WI-FI</b><h3>Lodge 有網路，不一定在房間裡收得到</h3><p>偏遠 Lodge 的 Wi-Fi 可能只集中在櫃檯或餐廳，速度也會隨住客與天候改變。重要文件、地圖、票券與保險資料應先存入手機，並保留可離線開啟的副本。</p></article>
      </div>
    </section>

    <section className="field-section field-light">
      <span>04 / HEALTH &amp; MOSQUITOES</span>
      <header><div></div><h2><i>疫苗看的是整條航線，</i><i>防蚊看的是實際路線。</i></h2></header>
      <div className="field-grid">
        <article><b>YELLOW FEVER / OUR CASE</b><h3>以前打過，這次要找的是證明</h3><p>我以前前往南美洲時已接種過黃熱病疫苗。依現行國際衛生條例，完成的一劑黃熱病疫苗與正式國際預防接種證明原則上終身有效，不必因黃皮書上曾印有十年期限就自行塗改或急著補打。這次真正要確認的，是原本的黃皮書是否仍在、姓名資料是否一致，以及上一段航程是否會觸發查驗。</p><p>納米比亞並非要求每位旅客接種；若從黃熱病風險國家抵達，或在該國機場轉機超過 12 小時，可能需要出示證明。經 Addis Ababa 等非洲樞紐轉機時，不能只看目的地，還要逐段核對停留時間與最新入境規定。</p></article>
        <article><b>TRAVEL CLINIC</b><h3>同一個國家，不同門診也可能給出不同建議</h3><p>馬偕或其他醫院的旅遊醫學門診，依循的官方疫情資料大致相同，但最後建議可能不完全一致。醫師還會考慮航線、季節、北部停留、年齡、既往疫苗、慢性病、院內供應，以及每個人願意承擔多少風險；因此不是拿到一張「納米比亞必打清單」，而是完成一次個人化評估。</p><p>A 型肝炎、傷寒、小兒麻痺、狂犬病，以及流行性腦脊髓膜炎等疫苗，對某些路線或旅客可能像多買一層保險，但並非全部都適合或需要。尤其「流行性腦脊髓膜炎」與「日本腦炎」是不同疾病，不能只用「腦炎疫苗」概括。應帶著既有接種紀錄、完整航班與每日路線，提早到門診逐項確認。</p></article>
        <article><b>MALARIA</b><h3>風險集中在北部與東北部，不是全國相同</h3><p>Windhoek 沒有瘧疾傳播；Kunene、Otjozondjupa、Oshikoto、Zambezi 與 Kavango 等北部或東北部地區則需提高警覺。行程若包含 Etosha 或北部路線，應把季節、住宿與停留天數交給旅遊醫學醫師判斷是否使用預防藥，而不是只憑「乾季蚊子較少」做決定。</p></article>
        <article><b>BITE PREVENTION</b><h3>真正難找的，是適合人體的高濃度敵避</h3><p>台灣核准的有效成分包括 DEET（敵避／待乙妥）、picaridin（派卡瑞丁）與 IR3535（伊默克）。以 2025 年行前採買的經驗來說，當時在台灣較容易找到的人體用 DEET 約為 12%；我們另外找到一款濃度更高、同樣確認可用於人體的產品，實際打電話詢問時，對方卻告知已經停產。這不是現行法規的濃度上限，而是我們當時實際遇到的供應狀況。</p><p>最後我們改從國外購買，並準備了滾珠與噴劑兩種形式。滾珠較容易控制塗抹位置，適合臉部周圍或較小範圍；噴劑則方便處理手腳等較大面積。無論是哪一種，都要先確認濃度、適用年齡，以及包裝是否明確標示可用於人體皮膚，使用臉部時也應先塗在手上再避開眼口，而不是直接朝臉噴灑。</p><p>市面上也混有只能用於環境的敵避產品，很容易看見成分名稱就買錯。如果找不到合適的 DEET，可向藥師或旅遊醫學門診詢問 picaridin 等核准替代選擇。黃昏到清晨仍要穿著淺色長袖、長褲與襪子，住宿時優先使用紗窗、空調或蚊帳；即使正在服用瘧疾預防藥，這些措施仍不能省略。</p></article>
      </div>
      <div className="child-note health-source-note"><b>WHERE TO CHECK / 先查哪一個網站？</b><p>外交部領事事務局適合查旅遊警示、入境規定與當地安全；傳染病疫區、疫苗及瘧疾預防藥，則應以台灣 CDC「國際旅遊處方箋」與旅遊醫學門診為主。兩個網站回答的是不同問題，不能用其中一個完全取代另一個。</p></div>
      <div className="medicine-block">
        <span>MALARIA MEDICINE / DISCUSS WITH A DOCTOR</span>
        <h3>三種常見預防藥，差別不只在價格。</h3>
        <div className="medicine-table" role="table" aria-label="常見瘧疾預防藥比較">
          <div className="medicine-row medicine-head" role="row"><b role="columnheader">藥物</b><b role="columnheader">服用時程</b><b role="columnheader">可能的優點</b><b role="columnheader">門診前先想清楚</b></div>
          <div className="medicine-row" role="row"><strong role="cell">Malarone<br/><small>Atovaquone / Proguanil</small></strong><p role="cell">進入高風險區前 1–2 天開始，每日一次；離開後續服 7 天。</p><p role="cell">離開疫區後的療程較短，適合不想回國後再服用四週的人。</p><p role="cell">費用較高；腎功能、懷孕、哺乳與其他用藥情況必須交由醫師評估。</p></div>
          <div className="medicine-row" role="row"><strong role="cell">Doxycycline<br/><small>去氧羥四環素</small></strong><p role="cell">進入高風險區前 1–2 天開始，每日一次；離開後續服 4 週。</p><p role="cell">價格較低，也容易理解每日服藥節奏。</p><p role="cell">可能造成光敏感與腸胃不適；納米比亞日照強，攝影與戶外活動者尤其要和醫師討論。孕婦及部分兒童不適用。</p></div>
          <div className="medicine-row" role="row"><strong role="cell">Mefloquine<br/><small>美爾奎寧</small></strong><p role="cell">建議進入高風險區前 2–3 週開始，每週一次；離開後續服 4 週。</p><p role="cell">每週服用一次，長途旅行中較不容易因每日移動而漏服。</p><p role="cell">可能出現惡夢、失眠、焦慮、情緒改變、暈眩等神經精神反應，少數反應可能嚴重或持續。現有或近期憂鬱、焦慮症、精神病、思覺失調、癲癇等病史者有明確禁忌；心律、平衡問題及需要長途駕駛者，也務必主動告知醫師。</p></div>
        </div>
        <div className="child-note"><b>CHILDREN / 小孩可以使用嗎？</b><p>可以評估，但不能把成人藥直接切小就使用。Malarone 可依體重使用於至少 5 公斤的兒童；Doxycycline 一般用於 8 歲以上；Mefloquine 可依體重用於兒童，但小體重可能需要藥師精確調配，也要先排除精神神經、痙攣與心律相關禁忌。</p><p>年幼兒童可能還無法清楚表達惡夢、焦慮、暈眩或思緒異常等早期反應。若醫師選擇 Mefloquine，照顧者應特別留意睡眠突然改變、異常哭鬧或恐懼、情緒與行為改變、步態不穩等狀況，並事前詢問出現症狀時的停藥與替代方案，不要到旅途中才自行判斷。小孩罹患瘧疾後更容易快速惡化，因此不是「怕副作用就不吃」，而是更需要由旅遊醫學醫師依體重、路線與季節選藥。</p></div>
        <div className="child-note"><b>MALARIA PREVENTION / 不是打一針就能完成的準備</b><p>對一般旅客而言，目前沒有一種能在出發前接種、就取代其他措施的常規瘧疾疫苗。真正的預防仍是避免蚊蟲叮咬，並由醫師依目的地、季節與個人狀況評估是否服用預防藥。</p><p>另一個容易忽略的問題是抗藥性：不同地區的瘧原蟲，可能已對部分藥物產生抗藥性。納米比亞存在 Chloroquine（氯奎寧）抗藥性，因此它不能被當成當地通用的預防選擇。這不是人體對藥產生抗藥性，也不代表所有藥物都失效；重點是選藥必須跟著最新的目的地資料，不能自行沿用以前旅行剩下的藥。</p></div>
        <p>這張表只用來理解差異，不是處方。藥物選擇還要配合最新疫情、實際停留地區、個人病史與交互作用；台灣 CDC 建議至少在出國前 4–6 週諮詢旅遊醫學門診。</p>
      </div>
      <p className="field-quote">疫苗與藥物不是一張固定清單。<br />把轉機國家、十二小時門檻與北部路線一起交給醫師看，才是完整的行前評估。</p>
    </section>

    <section className="field-picks" id="food">
      <span>05 / WHAT TO EAT</span>
      <h2>從大西洋的生蠔，<br />吃到荒野裡的味道。</h2>
      <div className="field-grid">
        <article><b>WALVIS BAY OYSTERS</b><h3>生蠔不是配角，而是海岸名產</h3><p>Walvis Bay 遮蔽良好的海灣，加上寒冷而營養豐富的 Benguela Current，形成納米比亞重要的生蠔養殖環境。這裡的生蠔不只供應本地餐桌，部分也出口到南非、歐洲與亞洲；坐在海岸吃到的，是一項真正走向海外的納米比亞水產。</p><p>遊船上常以新鮮生蠔搭配氣泡酒，海岸餐廳則能吃到原味、烤蒜或海鮮拼盤裡的不同版本。它不是旅途中順便出現的一小口，而是到了 Walvis Bay 值得特別留下胃口的味道。除了生蠔，也可以留意 Kabeljou、Kingklip、西海岸龍蝦、淡菜與蝦；冷洋流帶來的不只是海霧，也讓 Swakopmund 與 Walvis Bay 的餐桌和內陸完全不同。</p></article>
        <article><b>GAME TASTING GUIDE</b><h3>第一次吃野味，怎麼點？</h3><p>Windhoek 的 Joe’s Beerhouse 是最有代表性的入門地點之一。第一次最適合從一份 game platter（野味拼盤）開始：份量不用太大，卻能直接比較不同肉質。多數人未必習慣野味風味，淺嚐即可，不必為了「體驗」各點一份主餐。</p><p><strong>這裡所說的野味，是正規餐廳依法供應的 game meat，不是盜獵取得的肉品。</strong>納米比亞對商業獵獲、運送、加工與販售設有許可及食品安全規範；品嘗合法來源的料理，不等於鼓勵盜獵。旅途中仍應選擇正式餐廳或可信商家，避免購買無法說明來源的肉品與野生動物製品。</p><ul className="game-guide"><li><strong>01 · 南非劍羚｜Oryx / Gemsbok</strong>長著筆直長角、適應乾旱環境的羚羊，主要分布在納米比亞、波札那與南非等南部非洲乾燥地區，也是納米比亞國徽上的國獸。肉色深、脂肪少，適合做成牛排，是最推薦先試的一款。</li><li><strong>02 · 跳羚｜Springbok</strong>風味相對細緻，適合菲力、小份排餐，或放在拼盤裡比較。</li><li><strong>03 · 大捻角羚｜Kudu</strong>味道比一般牛肉更深，排餐與慢燉都常見；想感受明顯野味，可以從它開始。</li><li><strong>04 · 鴕鳥｜Ostrich</strong>雖然是禽類，肉色與口感更接近瘦紅肉，通常也是接受度較高的選擇。</li><li><strong>05 · 鱷魚、斑馬｜Crocodile / Zebra</strong>適合放在綜合拼盤裡嘗鮮，不一定需要各點一份主餐；最後的味道仍很看部位與料理方式。</li></ul><p>Joe’s Beerhouse 由德國出生的主廚 Joachim「Joe」Gross 於 1991 年創立。Joe 退休後，Thomas 與 Carol-Jean Rechter 在 2012 年接手；今天仍保留許多由 Joe 蒐集、充滿旅行故事的老物件與招牌氛圍，但已不是創辦人親自經營的年代。</p><p><strong>務必事先訂位。</strong>我們預約晚上七點，點完餐時店裡已經幾乎坐滿。當晚出餐等了很久，直到較後面才輪到我們；若想從容地吃完野味拼盤，建議訂更早的時段，也不要在晚餐後安排需要準時抵達的行程。</p></article>
        <article><b>BILTONG</b><h3>公路上的肉乾</h3><p>Biltong 是南部非洲常見的風乾肉，大捻角羚（kudu）、南非劍羚（oryx）與跳羚（springbok）都可能做成不同風味。它很適合長途車程中少量品嘗，但肉類製品通常不能任意帶回台灣，留在旅途中吃完最單純。</p></article>
        <article><b>SWAKOPMUND / TWO TABLES</b><h3>兩間海景餐廳，兩種完全不同的性格</h3><p><strong>The Tug｜把一艘拖船留在岸上</strong><br />餐廳以退役蒸汽拖船 Danie Hugo 的駕駛艙為核心，貼著海岸保留了粗獷的航海感。Walvis Bay 生蠔、海鮮拼盤、Kingklip、Kabeljou 與起司蒜蝦都是容易入門的選擇。有人特別喜歡它的歷史與地標感；若是第一次來，也很值得看看一艘拖船如何成為餐廳的一部分。</p><p><strong>Jetty 1905｜沿著百年長堤，走到海上吃晚餐</strong><br />它位在建於 1905 年的長堤盡頭，餐桌像伸進大西洋裡，回頭還能看見 Swakopmund 的海岸線。招牌 Kabeljou Jetty 1905 搭配蝦與烤花枝，海鮮拼盤則有烤蒜生蠔與白酒淡菜。以這次實際用餐感受來說，我更喜歡 Jetty 1905：不只因為料理，走過長堤、等著日落，再在海面上吃完一餐，整體體驗更完整。</p><p><strong>兩間都務必事先訂位。</strong>菜單與營業時間會更新，出發前仍應查看當期資訊。</p></article>
      </div>
    </section>

    <aside className="field-section field-light">
      <span>SOURCES / CHECK AGAIN</span>
      <div className="field-copy"><p>eSIM、方案價格、疫苗、傳染病、餐廳菜單與經營狀況都會變動；插座也可能因 Lodge 與建築年代不同。出發前請再次向相關單位確認。</p><p><a href="https://www.mtc.com.na/esim" target="_blank" rel="noreferrer">MTC eSIM 官方說明 ↗</a>　<a href="https://www.boca.gov.tw/sp-trwa-list-1.html" target="_blank" rel="noreferrer">外交部旅外安全資訊 ↗</a>　<a href="https://www.cdc.gov.tw/InternationalTravel/Print?Type=full&cid=626" target="_blank" rel="noreferrer">台灣 CDC 納米比亞旅遊處方箋 ↗</a>　<a href="https://www.cdc.gov.tw/Category/ListContent/mtLMDNb29h9iyKcJdj7uYA?uaid=ZSgu_4NoQ7NTp0zZ-HC8rg" target="_blank" rel="noreferrer">台灣 CDC 瘧疾預防用藥 ↗</a>　<a href="https://www.mmh.org.tw/depblockpage.php?did=93" target="_blank" rel="noreferrer">馬偕藥劑部旅遊用藥 ↗</a>　<a href="https://www.cdc.gov.tw/Category/QAPage/7EK9XTR8z3bCHl-ovNluEw" target="_blank" rel="noreferrer">台灣 CDC 防蚊選購 ↗</a>　<a href="https://wwwnc.cdc.gov/travel/destinations/traveler/none/namibia" target="_blank" rel="noreferrer">CDC Namibia Traveler View ↗</a>　<a href="https://www.who.int/publications/m/item/lifetime-validity-of-one-dose-of-yellow-fever-vaccine" target="_blank" rel="noreferrer">WHO 黃熱病證明效期 ↗</a>　<a href="https://visitnamibia.com.na/2015/03/uniquely-namibian-food/" target="_blank" rel="noreferrer">Visit Namibia 飲食介紹 ↗</a>　<a href="https://www.the-tug.com/" target="_blank" rel="noreferrer">The Tug 官方菜單 ↗</a>　<a href="https://lhg.na/jetty-1905-menu/" target="_blank" rel="noreferrer">Jetty 1905 官方菜單 ↗</a>　<a href="https://joesbeerhouse.com/" target="_blank" rel="noreferrer">Joe’s Beerhouse ↗</a></p></div>
    </aside>

  <section className="photo-insert"><span>FIELD NOTE / FOOD</span><h2>野味可以試，<br />但先從一小份開始。</h2><p>餐廳的 Platter of the Day 適合多人分食，先淺嚐不同肉類與配菜，再決定自己是否習慣。</p><figure><img src={`${BASE_PATH}/travel/platter-of-the-day.avif`} alt="納米比亞餐廳的 Platter of the Day"/><figcaption>野味多數人不一定習慣，淺嚐即可。</figcaption></figure></section>
  <nav className="guide-related-links" aria-label="相關旅行攻略"><span>READ NEXT</span><a href={`${BASE_PATH}/travel/guide/visa/`}>簽證與入境</a><a href={`${BASE_PATH}/travel/guide/transport/`}>移動與住宿</a><a href={`${BASE_PATH}/travel/guide/money-shopping/`}>換錢、付款與購物</a></nav>
  <a className="guide-next-cta" href={`${BASE_PATH}/travel/guide/photography/`}>下一步：準備荒野攝影器材 →</a>
  <footer className="field-footer"><a href={`${BASE_PATH}/travel/guide/`}>回到準備旅行 ↗</a><span>YOUNG HUNG HDR STUDIO</span></footer>
  </main>;
}
