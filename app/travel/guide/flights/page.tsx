import type { Metadata } from "next";
import { guideMetadata } from "@/lib/travel-guide-seo";
import "../guide-pages.css";
import "../cta.css";
import "../cta-4k.css";
import "./flights.css";
import "./flight-cover.css";

export const metadata: Metadata = guideMetadata({ title: "納米比亞航班與轉機｜從台灣出發的航線規劃", description: "從台灣前往納米比亞的航班與轉機選擇、行李安排、抵達 Windhoek 後的交通銜接。", path: "/travel/guide/flights/" });

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const routes = [
  {
    no: "A",
    label: "SOUTH AFRICA",
    title: "香港／約翰尼斯堡",
    path: "TPE → HKG → JNB → WDH",
    outbound: "約 22H 30M",
    returning: "約 40H 20M",
    price: "初期約 NT$36,169–37,091",
    note: "2025 規劃初期報價；接近出發時價格已上漲，但沒有留下最後金額。回程在 JNB 等待約 19 小時，需另抓一晚機場旅館：每房約 NT$4,500–5,500，兩人分攤約每人 NT$2,250–2,750。",
    legs: [],
    timeCosts: [],
  },
  {
    no: "B",
    label: "ETHIOPIA",
    title: "曼谷／阿迪斯阿貝巴",
    path: "TPE → BKK → ADD → WDH",
    outbound: "約 22H 35M",
    returning: "約 23H 30M",
    price: "NT$42,562",
    note: "2025 實際採用方案；最快銜接組往返共 46H 05M，其中 9H 35M 花在轉機等待。部分團員因前段班機不同，單程總時間超過 33 小時。",
    legs: [
      "TPE → BKK｜飛行 3H 45M",
      "BKK｜轉機 2H 20M",
      "BKK → ADD｜飛行 8H",
      "ADD｜轉機 2H 45M",
      "ADD → WDH｜飛行 5H 45M",
    ],
    timeCosts: [
      { label: "去程純飛行", value: "17H 30M" },
      { label: "去程等待", value: "5H 05M" },
      { label: "回程純飛行", value: "19H 00M" },
      { label: "回程等待", value: "4H 30M" },
    ],
  },
];

export default function FlightsGuidePage() {
  return <main className="guide-page flights-page">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a><a href={`${BASE_PATH}/travel/`}>JOURNEY ↗</a></header>

    <section className="flight-cover">
      <p>GUIDE / 03 · FLIGHTS</p>
      <h1><span>不是最短的航線，</span><em>而是少一點不確定性。</em></h1>
      <div className="cover-route" aria-hidden="true"><b>TPE</b><i /><strong>WDH</strong></div>
      <div><span>TAIWAN → NAMIBIA</span><span>EXPERIENCE · 2025</span></div>
    </section>

    <section className="flight-opening">
      <span>THE DECISION</span>
      <div>
        <h2>飛往納米比亞，<br />票價只是考量之一。</h2>
        <p>從台灣出發，沒有一條簡單的直線。轉機城市、行李能否直掛、是否必須入境、兩張機票如何銜接，都可能改變一張「便宜機票」真正的成本。</p>
        <p>我們最後選的不是每個人都最快的方案，而是一條比較容易掌握的路。</p>
      </div>
    </section>

    <section className="route-study">
      <header><span>2025 / ROUTE STUDY</span><h2>兩條路，<br />差的不只是五分鐘。</h2><p>以下依當時共同試算表的班次重新計算。總時間包含轉機，並以各段出發地與目的地時區換算。</p></header>
      <div className="route-cards">
        {routes.map(route => <article key={route.no}>
          <div className="route-card-head"><span>{route.no} / {route.label}</span><b>{route.path}</b></div>
          <h3>{route.title}</h3>
          <dl>
            <div><dt>OUTBOUND</dt><dd>{route.outbound}</dd></div>
            <div><dt>RETURN</dt><dd>{route.returning}</dd></div>
            <div><dt>RECORDED FARE</dt><dd>{route.price}</dd></div>
          </dl>
          {route.legs.length > 0 && <div className="route-legs"><span>FULL OUTBOUND / 22H 35M</span>{route.legs.map(leg => <b key={leg}>{leg}</b>)}</div>}
          {route.timeCosts.length > 0 && <div className="route-time-cost">{route.timeCosts.map(item => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>}
          <p>{route.note}</p>
        </article>)}
      </div>
      <aside className="comparison-note"><strong>南非原本看起來較便宜，為什麼仍沒有選？</strong><p>規劃初期，南非線的報價確實較有吸引力，去程若接上較早班次，也只比曼谷線快約五分鐘；但接近出發時票價已經上漲，原本的價格優勢不再明確。回程十九小時的等待還要加上一晚機場旅館，兩人一房約增加每人 NT$2,250–2,750；再把簽證、接送、行李與分段開票風險算進來，最後沒有選擇這條路。</p></aside>
    </section>

    <section className="transfer-risk">
      <header><span>THE DOMINO EFFECT</span><h2>多一次轉機，<br />就多一個可能失去控制的環節。</h2></header>
      <div className="risk-grid">
        <article><b>01 / DELAY</b><h3>延誤與取消，不只是晚一點抵達</h3><p>第一段航班一旦延誤，後面每一段銜接都可能跟著失效。遇到取消或大幅更改班表時，重新安排也可能耗上一整天。</p></article>
        <article><b>02 / SEPARATE TICKETS</b><h3>不是同一張票，風險可能留給自己</h3><p>分段開票時，前一家航空公司的延誤不一定能讓下一家免費改票；錯過後段航班，可能必須現場重買。</p></article>
        <article><b>03 / BAGGAGE</b><h3>人到了，行李不一定同時抵達</h3><p>轉機越多，行李需要被轉運的次數也越多。若無法直掛，還要入境領取、重新托運，再次經過報到與安檢。</p></article>
        <article><b>04 / ITINERARY</b><h3>真正受影響的是後面的整段旅程</h3><p>錯過機場接送、第一晚住宿或旅行團集合時間，會比多等幾個小時更麻煩；偏遠地區的後續安排也未必能隔天補上。</p></article>
      </div>
    </section>

    <section className="south-africa-story">
      <div className="story-title"><span>THE DETOUR</span><h2>既然經過南非，<br />能不能順便<br />去好望角？</h2></div>
      <div className="story-copy">
        <p className="lead">長時間轉機最令人心動的地方，是可以把等待變成另一段旅行。</p>
        <p>回程會經過南非，我們一度認真想過：既然都到了，是否能順道看看好望角，再回台灣？</p>
        <p>後來仔細查了航線才發現，轉機點是約翰尼斯堡，而好望角在一千多公里外的開普敦附近。<strong>走出機場，並不會看見懸崖與海。</strong></p>
        <p>要成行，還需要另外安排約翰尼斯堡與開普敦之間的國內航班、住宿、機場接送，以及開普敦當地的整日交通。原本十九小時的轉機窗口，撐不住這些安排；它必須被正式規劃成至少兩到三晚的南非支線。</p>
      </div>
    </section>

    <section className="time-tradeoff">
      <span>THE TIME WE WOULD LOSE</span>
      <div><h2>多看一個國家，<br />也可能少看<br />一部分納米比亞。</h2><p>利用轉機停留另一個國家，本來是很吸引人的旅行方式。但假期總長沒有增加：南非支線至少需要的兩到三晚，必須直接從納米比亞的行程裡挪出來。</p><p>納米比亞的國土約為台灣二十三倍，景點之間常隔著數百公里。少幾天，通常不是把每天排得更緊一點，而是必須放棄一整段路線。對這種距離遙遠、短時間內未必會再訪的目的地，我們最後選擇把行程留得更完整。</p></div>
    </section>

    <section className="safety-story">
      <header><span>SAFETY / TRANSIT</span><h2><i>治安，</i><i>讓「出去走走」</i><i>不能只是臨時起意。</i></h2></header>
      <div>
        <p>約翰尼斯堡與開普敦都有成熟的觀光條件，並非不能旅行。但兩座城市都不適合在毫無準備的情況下，帶著行李臨時走出機場。</p>
        <p>約翰尼斯堡需要特別留意機場周邊、夜間移動，以及旅客遭跟蹤或搶劫的風險。開普敦的觀光環境相對完整，好望角也適合安排一日遊；但機場道路、偏僻海岸、登山步道與入夜後的移動，仍需要事前規劃。</p>
        <p>南非並不是因為「不能去」而被放棄。如果只是轉機，留在機場最單純；如果想看好望角，就應該把南非當成一段正式旅程來對待。</p>
        <blockquote>這一次，我們決定把時間留給納米比亞。<br />好望角，留給另一趟不需要趕著轉機的旅行。</blockquote>
      </div>
    </section>

    <section className="price-snapshot">
      <header><span>ONLINE SNAPSHOT / 2026.07</span><h2>現在查到的最低價，<br />不能直接和當年<br />畫上等號。</h2></header>
      <div className="snapshot-grid">
        <article><span>CATHAY PACIFIC</span><strong>FROM NT$34,828</strong><p>台北—約翰尼斯堡經濟艙來回參考價，尚未包含約翰尼斯堡—Windhoek 的區域航班。</p><a href="https://flights.cathaypacific.com/destinations/en_TW/flights-from-taipei-to-johannesburg" target="_blank" rel="noreferrer">查看航空公司即時票價 ↗</a></article>
        <article><span>GOOGLE FLIGHTS</span><strong>FROM NT$23,784</strong><p>台北—Windhoek 當期最低單程搜尋結果，需轉機兩次、總時間約 48 小時；不可直接與來回票比較。</p><a href="https://www.google.com/travel/flights/flights-from-taipei-city-to-windhoek.html?gl=TW&hl=zh-TW" target="_blank" rel="noreferrer">重新搜尋目前日期 ↗</a></article>
      </div>
      <p className="price-disclaimer">票價會隨日期、行李、艙等與開票方式即時變動。這裡保留的是比較方法，不是保證價格；查票時應以相同日期、相同行李條件與完整來回總價比較。</p>
    </section>

    <section className="booking-checklist">
      <header><span>BEFORE BOOKING</span><h2><i>選一張機票以前，</i><i>還有四件事</i><i>值得確認。</i></h2></header>
      <ol>
        <li><b>01</b><div><strong>是不是同一張票？</strong><p>分段購票可能無法直掛行李，前段延誤時，後段航空公司也未必負責改票。</p></div></li>
        <li><b>02</b><div><strong>轉機是否必須入境？</strong><p>領行李、重新報到、過夜住宿或離開機場，都可能改變簽證條件。</p></div></li>
        <li><b>03</b><div><strong>真正的總時間是多少？</strong><p>把時區、跨日、機場等待與可能的市區住宿全部算進去。</p></div></li>
        <li><b>04</b><div><strong>便宜多少，值得多一層風險？</strong><p>簽證費、住宿、接送、行李與錯過後續班機的成本，也都是票價的一部分。</p></div></li>
      </ol>
    </section>

    <aside className="flight-source">
      <span>DATA &amp; CONTEXT</span>
      <p>航班、座位與 2025 報價依同行者共同試算表整理；現行轉機及安全資訊可能變動，訂票前請再次向航空公司與官方單位確認。</p>
      <div><a href="https://dirco.gov.za/japan/frequently-asked-questions/" target="_blank" rel="noreferrer">南非轉機簽證說明 ↗</a><a href="https://www.gov.uk/foreign-travel-advice/south-africa/safety-and-security" target="_blank" rel="noreferrer">南非安全建議 ↗</a><a href="https://www.expedia.com/Johannesburg-Hotels-City-Lodge-Hotel-At-OR-Tambo-International-Airport.h8403573.Hotel-Information" target="_blank" rel="noreferrer">機場旅館房價參考 ↗</a></div>
    </aside>

    <nav className="guide-related-links" aria-label="相關旅行攻略"><span>READ NEXT</span><a href={`${BASE_PATH}/travel/guide/visa/`}>簽證與入境</a><a href={`${BASE_PATH}/travel/guide/itinerary/`}>行程天數與路線</a></nav>
    <a className="guide-next-cta" href={`${BASE_PATH}/travel/guide/itinerary/`}>下一步：規劃納米比亞行程天數 →</a>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>查看所有旅行攻略 ↗</a><span>EXPERIENCE · 2025.09 / REVIEWED · 2026.07</span></footer>
  </main>;
}
