import type { Metadata } from "next";
import "../guide-pages.css";
import "./transport.css";
import "./transport-title.css";

export const metadata: Metadata = { title: "移動與住宿｜Namibia Travel Guide", description: "旅行社、車輛、嚮導與國家公園內外住宿的實際比較。" };
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const operators = [
  { name: "Simba Travel", price: "—", load: "$$", setup: "未進入正式安排", custom: "—", copy: "可中文溝通，但回覆較慢；確認為 2025 年後表示房況已滿，建議至少提前一年。" },
  { name: "Chameleon Safaris", price: "$$", load: "$$$", setup: "一台散客團大型 4WD Safari 車", custom: "$$$", copy: "使用平常承載散客拼團的大型車；首次回覆最快、報價清楚，但九人共乘的拍攝空間仍和兩車方案不同。" },
  { name: "Nature Travel Namibia", price: "$$$", load: "$$", setup: "兩台 Toyota Land Cruiser · 可開式車頂", custom: "$$$$", copy: "車輛等級較高，專業嚮導也擅長尋找動物；能依攝影、攀爬健行與安全需求臨場調整。", chosen: true },
  { name: "台灣旅行社", price: "$$$$", load: "$", setup: "機票 · 住宿 · 中文領隊", custom: "$$", copy: "最輕鬆也最貴；把簽證、付款、領隊與台灣端責任窗口整合在同一份契約。" },
];

export default function TransportGuidePage() {
  return <main className="guide-page transport-page">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a><a href={`${BASE_PATH}/travel/`}>JOURNEY →</a></header>
      <section className="transport-cover"><p>GUIDE / 05 · HOW TO TRAVEL</p><h1><i>自由行自駕、</i><i>參加當地團，</i><i>還是從台灣跟團？</i></h1><div><span>SELF-DRIVE · LOCAL TOUR · TAIWAN GROUP</span><span>NAMIBIA · 2025</span></div></section>

      <section className="transport-opening"><span>ONE DECISION</span><div><p className="lead">住在哪裡，也決定了怎麼走。</p><p>在納米比亞，車輛、嚮導、住宿位置與每天能看見什麼，幾乎是同一個決定。住宿離國家公園入口多遠，決定隔天幾點能開始 Safari；一輛車坐幾個人，影響行李、攝影器材與每個人的視野；有沒有熟悉動物與道路的嚮導，更直接決定一整天是在荒野裡尋找，還是真的能看見什麼。</p><blockquote>我們最後不是先選車，再選住宿。<br />而是把每天想留下的時間，一起放進同一張行程表。</blockquote></div></section>

    <section className="park-stay"><header><span>01 / TOO LATE</span><h2><i>園內住宿很少，</i><i>晚一點決定，選擇就不再完全屬於自己。</i></h2></header><div className="park-grid"><article><b>BOOKING</b><h3>至少提前一年？</h3><p>我們在出發前幾個月才正式確認。Simba 得知旅行年份為 2025 年後，表示當年度幾乎已滿。Etosha 園內房間本來就少，熱門季節還要同時面對自駕旅客與海外團體。</p></article><article><b>EVERY MORNING</b><h3>園外住宿的時間成本</h3><p>最後我們住在 Etosha 外圍。每天除了前往入口的車程，還要排隊、登記與檢查。依實際經驗，完成進出流程最少多抓一個小時；這一小時往往正好落在動物最活躍的清晨。</p></article></div><blockquote>便宜一些的房間，如果每天少掉一至兩個小時的 Safari，真正的價格就不只寫在帳單上。</blockquote><aside className="lodge-wild"><span>LODGE / INSIDE THE WILD</span><h3>住進高級 Lodge，<br />也沒有離開荒野。</h3><div><p>靠近國家公園入口、位於園內或私人保護區內的 Lodge，通常位置更稀缺，服務、餐食與活動也較完整，因此價格與住宿等級往往更高。旅客付的不只是房間，而是清晨進入荒野的時間，以及動物可能直接出現在 Lodge 周圍的距離。</p><p>更好的設施仍不代表把自然完全隔絕在門外。昆蟲、壁虎與其他小型生物可能進入房間；餐廳、步道或房門附近，也可能近距離巧遇野生動物。夜間不要獨自行動，應遵守 Lodge 規定的步行範圍；若天黑後必須由工作人員接送，就不要因為看起來只有一小段路而自行走回房間。</p></div></aside></section>

    <section className="guide-value"><header><span>02 / FINDING WILDLIFE</span><h2><i>自己開車，</i><i>也能找到動物嗎？</i></h2></header><div><p>可以，只是不一定容易。Etosha 面積廣大，熟悉園區的嚮導會觀察足跡、水塘、其他車輛停留的位置與嚮導之間的回報，再判斷下一段路該往哪裡走。</p><p>駕駛者同時要注意碎石、坑洞與突然穿越道路的動物，很難長時間掃視遠方。如果只有一個人負責開車，他往往也是全車最難專心找動物的人。</p><blockquote>選擇嚮導，不是因為自己完全不能開。<br />而是不想把最珍貴的 Safari，變成一場邊開車、邊猜方向的練習。</blockquote></div></section>

    <section className="operator-study"><header><span>03 / FOUR OPTIONS</span><h2><i>三間當地業者，</i><i>加上一個台灣窗口。</i></h2><p>四種選擇提供的不是完全相同的商品。價格、回覆速度、住宿形式、車輛、嚮導專業與客製程度，都必須放在一起看。</p></header><div className="operator-cards">{operators.map(item => <article key={item.name} className={item.chosen ? "chosen" : ""}><span>{item.name}</span><strong>{item.price}</strong><p>{item.copy}</p><dl><div><dt>規劃負擔</dt><dd>{item.load}</dd></div><div><dt>住宿與交通</dt><dd>{item.setup}</dd></div><div><dt>嚮導與客製</dt><dd>{item.custom}</dd></div></dl></article>)}</div><p className="scale-note">價格的 `$` 愈多代表整體成本愈高；規劃負擔的 `$` 愈多，代表旅客自己需要投入的時間愈多。不同年份、天數與包含項目不一，因此不直接列出精確價差。</p><aside className="payment-note"><span>PAYMENT / 海外匯款</span><h3>行程還沒開始，<br />款項卻要先付清。</h3><div><p>選擇當地業者後，我們還遇到另一個心理門檻：必須在出發前透過海外匯款付清團費。金額不小，款項匯出後也不像信用卡付款能立即提出爭議，第一次操作難免會擔心。</p><p>付款前，我們反覆核對正式報價、公司名稱、銀行戶名與帳號，也透過原本往來的信件再次確認收款資料；付款後保留匯款水單、發票與完整郵件。訂金比例、尾款期限、取消與退款條款，也應在匯款以前寫清楚。</p></div></aside></section>

    <section className="operator-stories"><article><span>SIMBA TRAVEL</span><h3>中文很方便，<br />但行程沒有真正開始。</h3><p>Simba 可以中文溝通，卻是三間當地業者中回覆較慢的一間。確認出發年份後，對方表示已沒有足夠空間安排，因此未進入車輛、住宿與攝影需求的正式報價。</p></article><article><span>CHAMELEON SAFARIS</span><h3>台灣旅客熟悉，<br />方案也容易看懂。</h3><p>Chameleon 是台灣旅客規劃納米比亞時常見的當地團選擇。方案使用一台平常承載散客拼團的大型 4WD Safari 車，車身很大，足以容納整團乘客與行李，並包含英文嚮導、燃油、門票與活動。不過九人仍是共乘同一台車，攝影器材、窗邊位置與臨時停車的彈性，和分坐兩台 Land Cruiser 不完全相同；前三晚採露營，也不能只用總價和 Nature 的全程 Lodge 方案相比。</p></article><article><span>NATURE TRAVEL NAMIBIA</span><h3>不只熟悉道路，<br />也知道動物在哪裡。</h3><p>專業嚮導會從足跡、水塘、動物習性、其他車輛的停留與嚮導間的回報判斷下一段方向，不必只靠運氣在園區裡繞行。Nature 安排兩台 Toyota Land Cruiser，車輛等級較高並採可開式車頂，進入國家公園後方便站立觀察與拍攝；分散乘坐也保留器材、窗邊視野與活動空間。行程能依攝影、攀爬與健行需求客製，遇到地形、天候或動物狀況改變時，則由嚮導臨場調整路線並判斷安全。</p></article><article><span>TAIWAN TRAVEL AGENCY</span><h3>最輕鬆，<br />也最貴。</h3><p>台灣旅行社的團體行程，通常會把國際機票、簽證、住宿、餐食、門票、領隊、導遊與司機小費整合在同一份契約。旅客不必重做我們做過的工作，但中文服務與台灣責任窗口也會反映在價格上。</p><a href="https://www.sundaytour.com.tw/zh-tw/tours/itinerary.php?tfid=1157&tpid=20861" target="_blank" rel="noreferrer">查看行程範例 ↗</a></article></section>

    <section className="vehicle-choice"><header><span>04 / TWO VEHICLES</span><h2><i>一輛車坐滿最省，</i><i>為什麼我們仍選擇兩輛？</i></h2></header><div className="vehicle-copy"><p>私人小團的車輛、嚮導與燃油多半是固定成本。人數愈接近滿載，每個人分攤的費用愈低；但乘客、行李與器材愈多，窗邊視野與拍攝空間也愈少。</p><p>我們共有八位成人與一位兒童，還有大型行李、相機與長鏡頭。最後使用兩輛車、兩位嚮導，兩位英文較流利的團員分坐兩車，再以對講機保持聯絡。</p></div><div className="vehicle-checks">{["每排座位能否看見窗外？","每車能放下多少大型行李？","器材能否留在座位附近？","是否有 USB 或車充電源？","安全帶形式是否適合兒童？","兩車如何即時保持聯絡？"].map((text,index)=><article key={text}><b>0{index+1}</b><p>{text}</p></article>)}</div><blockquote>四輪驅動決定車能不能通過某些路段；<br />空間、視野與通訊，才決定車上的人如何完成十三天。</blockquote></section>

    <section className="transport-ending"><span>THE REAL COMPARISON</span><h2><i>最便宜的方式，</i><i>需要旅客投入最多時間。</i></h2><p>Chameleon 較省，但包含露營，也需要自己處理機票、簽證、付款與英文溝通。Nature 稍高，換來全程 Lodge、兩輛車、兩位嚮導與高度客製。台灣旅行社價格最高，卻把航班、簽證、領隊與責任窗口全部整合起來。</p><blockquote>最適合的方案，不一定是第一封信回得最快，也不一定是報價最低。<br />而是哪一種安排，能保住這趟旅行最想看見的東西。</blockquote></section>
    <aside className="transport-source"><span>SOURCE &amp; CONTEXT</span><p>業者差異依 2025 年實際詢價郵件整理；團體產品則參考台灣旅行社公開的納米比亞行程。不同年份、天數、房況與包含項目均可能改變價格與安排。</p></aside>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>← 回到準備旅行</a><span>EXPERIENCE · 2025</span></footer>
  </main>;
}
