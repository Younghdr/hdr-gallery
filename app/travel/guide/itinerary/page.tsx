import type { Metadata } from "next";
import { guideMetadata } from "@/lib/travel-guide-seo";
import "../guide-pages.css";
import "../cta.css";
import "../cta-4k.css";
import "./itinerary.css";

export const metadata: Metadata = guideMetadata({ title: "納米比亞行程規劃｜12 到 17 天路線與天數建議", description: "納米比亞行程怎麼排？比較 12、15、17 天的節奏，串連 Etosha、海岸、Spitzkoppe 與 Sossusvlei。", path: "/travel/guide/itinerary/" });

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ItineraryGuidePage() {
  return <main className="guide-page itinerary-page">
    <header className="guide-nav">
      <a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a>
      <a href={`${BASE_PATH}/travel/`}>JOURNEY →</a>
    </header>

    <section className="itinerary-cover">
      <p>GUIDE / 04 · ITINERARY</p>
      <h1><i>十三天，</i><i>真的足夠走完</i><i>納米比亞嗎？</i></h1>
      <div><span>TAIWAN ↔ NAMIBIA</span><span>16 DAYS TOTAL · 13 DAYS IN NAMIBIA</span></div>
    </section>

    <section className="itinerary-opening">
      <span>THE FIRST ILLUSION</span>
      <div>
        <p className="opening-lead">規劃納米比亞時，最容易產生的錯覺，是把地圖上的每個地名都當成一天。</p>
        <p>Etosha 一天、Spitzkoppe 一天、Swakopmund 一天、Sossusvlei 再一天。紙面上似乎排得進去，真正放到路上才會發現，景點之間隔著的不是一條短短的線，而是數百公里的公路、碎石路，以及沿途隨時可能改變行車速度的路況。</p>
        <p>我們從台灣出發，整趟旅程約十六天；扣除跨洲飛行與轉機，真正留在納米比亞的時間，大約只有十三天。</p>
        <blockquote>十三天足以走完一條環線，卻不足以把整個納米比亞都放進行程。</blockquote>
      </div>
    </section>

    <section className="road-reality">
      <header><span>01 / DISTANCE</span><h2><i>一個地點，</i><i>為什麼不只需要一天？</i></h2></header>
      <div className="road-copy">
        <div>
          <p>在城市旅行裡，一天或許可以走訪幾個街區與景點。到了納米比亞，「抵達」往往只是一天的開始，有時甚至已接近結束。</p>
          <p>地圖上的距離，也不能完全按照柏油公路來想像。</p>
        </div>
        <div>
          <p>納米比亞約有四萬八千多公里的道路，其中真正鋪設柏油的不到兩成。連接主要城市與邊境的幹道多半平整；一旦離開主幹道，通往國家公園、沙漠與偏遠營地的道路，經常就會變成碎石路或土路。</p>
          <p>這不只是道路建設不足。當三百萬人口分布在二十三個台灣大的國土上，許多道路每天經過的車輛並不多。要把每一條路都鋪成柏油，建造與維護成本遠高於實際使用量。碎石路因此不是例外，而是這個國家維持廣大交通網絡的方式。</p>
        </div>
      </div>
      <div className="road-numbers">
        <article><strong>48,500+</strong><span>KM / ROAD NETWORK</span></article>
        <article><strong>&lt; 20%</strong><span>BITUMEN SURFACED</span></article>
        <article><strong>300 KM</strong><span>不一定等於三小時</span></article>
      </div>
      <div className="road-ending">
        <p>碎石、坑洞、揚塵、路面起伏與野生動物，都可能讓行車速度慢下來。途中若遇到爆胎或車輛故障，部分地區又沒有穩定通訊，也未必能立刻遇見其他車輛。</p>
        <p>從一座營地前往下一座，可能就需要五、六個小時。抵達後還要辦理入住、整理器材、參加傍晚活動；隔天清晨，才真正有機會在對的光線裡看見那個地方。</p>
        <p>Etosha 的動物不會按照行程表出現。Sossusvlei 的沙丘與 Deadvlei，也不是住進附近後順路拍一張就能完成。日出時間、園區開門、四輪接駁、步行距離與午後高溫，都在決定一天真正能做多少事。</p>
        <blockquote>每個地方只停一晚，行程當然排得進去。<br />只是大部分時間，可能都花在抵達與離開之間。</blockquote>
      </div>
    </section>

    <section className="route-direction">
      <header><span>02 / DIRECTION</span><h2>順時針，<br />還是逆時針？</h2></header>
      <div className="direction-grid">
        <article><b>CLOCKWISE</b><h3>先走進紅沙漠</h3><p>Windhoek → Sossusvlei → 大西洋海岸 → 西部荒野 → Etosha</p><small>先看沙漠與海岸，最後以 Safari 收尾。</small></article>
        <article className="is-selected"><b>COUNTERCLOCKWISE / OUR ROUTE</b><h3>先向北進入荒野</h3><p>Windhoek → Etosha → Twyfelfontein → Spitzkoppe → 海岸 → Sossusvlei</p><small>從水塘與動物開始，最後走進幾乎沒有聲音的紅色沙漠。</small></article>
      </div>
      <div className="direction-copy">
        <p>兩條路線經過的地方可能相近，旅行的情緒卻完全不同。我們選擇接近逆時針的方向：逐漸進入岩畫、乾涸河床與花崗岩荒原；抵達海岸時，氣候突然變得寒冷而潮濕，最後才走向南方的納米布沙漠。</p>
        <p>實際規劃仍需要配合住宿空房、活動日期與季節條件。方向不只是地圖上的選擇，也決定了這個故事如何展開。</p>
      </div>
    </section>

    <section className="minimum-days">
      <header><span>03 / HOW MANY DAYS</span><h2><i>最少需要幾天，</i><i>才不會只是在趕路？</i></h2></header>
      <div className="days-scale">
        <article><strong>10</strong><h3>非常緊繃</h3><p>若同時包含 Etosha、西部荒野、海岸與 Sossusvlei，幾乎沒有等待與調整空間。</p></article>
        <article><strong>11–12</strong><h3>勉強成環</h3><p>主要地點能連成環線，但道路、活動或身體狀況一有變化，後段就會立刻受到影響。</p></article>
        <article className="is-chosen"><strong>13</strong><h3>我們的平衡</h3><p>保留最想看的幾種地貌，也讓部分重要地點不必只住一晚，但仍然必須取捨。</p></article>
        <article><strong>15–17</strong><h3>真正停留</h3><p>Etosha 能多等幾個水塘，海岸多留一個早晨，沙漠也不必把期待全壓在一次日出。</p></article>
      </div>
      <blockquote>納米比亞不是不能安排短天數。<br />只是天數愈短，看到的愈可能是道路，而不是道路盡頭的風景。</blockquote>
    </section>

    <section className="south-choice">
      <header><span>04 / THE SOUTH</span><h2><i>既然都到了，</i><i>為什麼沒有繼續往南走？</i></h2></header>
      <div>
        <p className="choice-lead">Fish River Canyon 與箭袋樹森林，一直都在最初的名單裡。</p>
        <p>看地圖時，很容易覺得只是把環線再往南延伸一些。實際計算距離後才發現，這不是順路多停一站，而是另一段需要住宿、長途行車與緩衝時間的南部支線。</p>
        <p>Fish River Canyon 是目的地；Keetmanshoop 附近的箭袋樹森林，則是我們原本期待的另一個夜晚。白天看那些形狀奇特的樹木站在岩石荒原上，入夜後，再等待銀河從枝幹之間升起。</p>
        <p>但銀河攝影不能只在行程表上寫下「晚上拍攝」。它需要合適的月相、天候與拍攝位置，也需要把一個夜晚和隔天清晨真正留在南方。</p>
        <p>加入峽谷與箭袋樹，就必須壓縮 Etosha、海岸或 Sossusvlei；或者讓整趟旅程再多出幾天。</p>
        <blockquote>南部不是因為不值得而被刪除。正因為峽谷值得停留，箭袋樹下的銀河也值得等待，才不想匆匆抵達後立刻離開。</blockquote>
      </div>
    </section>

    <section className="balloon-choice">
      <header><span>05 / ONE SUNRISE</span><h2><i>熱氣球也在沙漠裡，</i><i>為什麼最後沒有搭？</i></h2></header>
      <div><p>熱氣球不會讓路線多繞數百公里，卻會占用沙漠裡最珍貴的一個清晨。</p><p>它需要提早預約，也受到天候、價格與起飛條件影響。搭乘熱氣球的同一段時間，也是攀上沙丘、走進 Deadvlei，或等待第一道光線落在紅色沙脊上的時刻。</p><p>兩件事無法同時發生。我們最後把清晨留給地面的沙漠。</p><blockquote>不是因為從空中俯瞰不夠迷人，而是在有限的日出裡，只能選擇一種觀看方式。</blockquote></div>
    </section>

    <section className="itinerary-ending">
      <span>WHAT WE LEFT BEHIND</span>
      <h2><i>這次沒有完成的，</i><i>留給下一趟。</i></h2>
      <p>刪除行程，不是規劃失敗，而是旅程真正開始成形的時刻。</p>
      <p>Fish River Canyon、箭袋樹下的銀河、熱氣球，以及更多來不及深入的地方，最後都沒有被勉強塞進十三天。</p>
      <p>這讓我們保住了 Etosha 的等待、海岸的停留，也保住了走進 Deadvlei 的那個清晨。</p>
      <blockquote>納米比亞大得不適合用景點數量來衡量。<br />有時候，少去一個地方，才有時間真正看見已經抵達的地方。</blockquote>
      <a className="itinerary-cta" href={`${BASE_PATH}/travel/guide/transport/`}>下一步：比較移動方式與住宿 →</a>
    </section>

    <aside className="itinerary-source"><span>ROAD DATA</span><p>道路里程與路面類型參考 Namibia Roads Authority 公開資料。實際車程仍會受到路況、季節、停留與行車安全影響。</p><a href="https://www.ra.org.na/weighbridge" target="_blank" rel="noreferrer">NAMIBIA ROADS AUTHORITY ↗</a></aside>
    <nav className="guide-related-links" aria-label="相關旅行攻略"><span>READ NEXT</span><a href={`${BASE_PATH}/travel/guide/flights/`}>台灣出發航線</a><a href={`${BASE_PATH}/travel/guide/transport/`}>移動與住宿</a></nav>

    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>← 回到準備旅行</a><span>TRAVEL EXPERIENCE</span></footer>
  </main>;
}
