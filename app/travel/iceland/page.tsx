import type { Metadata } from "next";
import "./iceland.css";
import "./golden-circle.css";
import "./iceland-4k.css";
import "./gullfoss-hdr.css";
import "./gullfoss-travel.css";
import "./layout-preferences.css";
import "./weather-and-heat.css";
import "./golden-photo.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "冰島｜在會呼吸的土地上旅行",
  description: "沿著冰島金環前進，在瀑布、彩虹、苔原與火山地貌之間，閱讀這座仍在生長的島。",
  alternates: { canonical: "/travel/iceland/" },
  openGraph: {
    title: "冰島｜The Living Earth",
    description: "沿著金環旅行，在瀑布、彩虹、苔原與火山地貌之間閱讀冰島。",
    url: "/travel/iceland/",
    images: [{ url: "/travel/iceland/iceland-hero.png", alt: "冰島黑沙海岸上的玄武岩峭壁與瀑布" }],
  },
};

export default function IcelandPage() {
  return <main className="ice-page">
    <header className="ice-nav">
      <a href={`${BASE_PATH}/`} className="ice-brand"><span>YH</span><b>FIELD NOTES</b></a>
      <nav><a href={`${BASE_PATH}/travel/`}>所有旅程</a><a href="#terrain">地貌</a><a href="#golden-circle">金環之旅</a></nav>
      <p>64.9631° N<br/>19.0208° W</p>
    </header>

    <section className="ice-hero" style={{backgroundImage:`url('${BASE_PATH}/travel/iceland/iceland-hero.png')`}}>
      <div className="ice-veil"/><div className="ice-issue"><span>ISSUE</span><b>03</b><i/></div>
      <div className="ice-title"><p>NORTH ATLANTIC / FIELD JOURNAL</p><h1>ICE<span>LAND</span></h1><div><b>會呼吸的土地</b><p>沿著瀑布、彩虹與苔原前進，<br/>閱讀仍在變動的火山島嶼。</p></div></div>
      <p className="ice-scroll">SCROLL TO EXPLORE <i>↓</i></p>
    </section>

    <section className="ice-manifesto" id="terrain">
      <p className="ice-kicker">01 / TERRAIN</p>
      <h2>被洋流留住，<br/><em>被烈火反覆重寫。</em></h2>
      <div className="ice-manifesto-copy"><p>相同的緯度，別的地方早已沉入荒涼。冰島卻被北大西洋暖流輕輕托住，勉強留住了適合生活的溫度，也留住了人。</p><p>但島嶼深處從未真正冷卻。火山仍在呼吸，熔岩仍記得奔流的方向；礦物染出的地表，像一張從火星寄來的明信片。彩虹竟長在火山口與瀑布的水霧旁——在冰島，美從來不按常理出現。</p></div>
    </section>

    <section className="ice-index" aria-label="冰島地貌索引">
      <article><small>ELEMENT 01</small><b>瀑布</b><span>WATERFALL / RAW POWER</span></article>
      <article><small>ELEMENT 02</small><b>彩虹</b><span>RAINBOW / WATER &amp; LIGHT</span></article>
      <article><small>ELEMENT 03</small><b>苔原</b><span>MOSS / VOLCANIC TERRAIN</span></article>
    </section>

    <section className="weather-chapter" id="weather">
      <header className="weather-heading"><small>02 / WEATHER</small><h2>一天之內，四季輪流經過。</h2><p>冰島的天氣不是旅程背景，而是每天都在改寫路線的主角。剛才還有陽光，下一個彎道可能已經落進橫雨、濃霧，甚至突如其來的冰雪。</p></header>
      <div className="weather-gallery">
        <figure className="weather-wide"><img src={`${BASE_PATH}/travel/iceland/thingvellir-weather.avif`} alt="雨霧中的辛格韋德利裂谷與遠方湖泊"/><figcaption><b>ÞINGVELLIR</b><span>雨水沿著板塊裂谷留下來，遠方景色很快消失在霧裡。</span></figcaption></figure>
        <figure className="weather-tall"><img src={`${BASE_PATH}/travel/iceland/hallgrimskirkja-storm.avif`} alt="暴風雨中的哈爾格林姆教堂"/><figcaption><b>REYKJAVÍK</b><span>城市也躲不過橫著吹來的雨。</span></figcaption></figure>
      </div>
      <blockquote className="weather-quote"><p>「如果你不喜歡現在的天氣，那就等十五分鐘。」</p><cite>— 冰島常聽見的一句話</cite></blockquote>
      <div className="wind-note"><span>WIND IS NOT A DETAIL</span><h3>冰島的風，是真的能把車門吹壞。</h3><p>開門前先確認風向，停車時盡量讓車頭迎風，並用雙手控制車門。這不是誇張的旅行警語，而是租車公司會認真提醒的日常。</p></div>
    </section>

    <section className="golden-circle" id="golden-circle">
      <header className="golden-heading"><p>ROUTE 01 / GOLDEN CIRCLE</p><h2>金環之旅，<br/><em>一天看見冰島的三種力量。</em></h2><span>從板塊裂谷到地熱噴泉，再抵達水霧與彩虹交會的黃金瀑布。這裡先保留旅程架構，日期、交通與現場筆記之後再補上。</span></header>
      <section className="gullfoss-hdr" aria-labelledby="gullfoss-hdr-title">
        <header className="gullfoss-hdr-head"><div className="gullfoss-hdr-index">01</div><div className="gullfoss-hdr-title"><small>WATER / LIGHT / HDR</small><h3 id="gullfoss-hdr-title">Gullfoss</h3><b>黃金瀑布 · 水霧裡的彩虹</b></div></header>
        <figure className="gullfoss-hdr-frame">
          <picture><source srcSet={`${BASE_PATH}/Photo/IMG_1921-1782316892674.avif`} type="image/avif"/><img src={`${BASE_PATH}/Photo/IMG_1921-1782316892660.jpg`} alt="Gullfoss 黃金瀑布水霧間出現一道彩虹"/></picture>
          <span className="gullfoss-hdr-badge">HDR TRAVEL PHOTOGRAPHY</span>
          <figcaption><b>GULLFOSS / GOLDEN CIRCLE</b><span>水霧升起的幾秒鐘裡，彩虹正好落進瀑布。</span></figcaption>
        </figure>
        <div className="gullfoss-hdr-notes"><div><small>THE MOMENT</small><p>風把大量水霧推向峽谷，陽光短暫穿過雲層，彩虹就在眼前成形。</p></div><div><small>THE FRAME</small><p>讓彩虹斜穿畫面，連接前景積雪與遠處瀑布，保留現場巨大的落差感。</p></div><div><small>THE MEMORY</small><p>寒冷、風聲與瀑布的震動同時存在；照片留下的是那個轉瞬即逝的光線。</p></div></div>
      </section>
      <div className="golden-stops">
        <article className="golden-card geysir"><div className="golden-number">02</div><div><small>HEAT / STEAM</small><h3>Geysir</h3><b>蓋歇爾地熱區</b><p>熱水、蒸氣與硫磺色礦物把地表變成另一種尺度。等待噴發，也是金環旅程裡最有節奏的一段。</p><span className="data-pending">TRAVEL NOTES — TO BE ADDED</span></div><figure className="golden-card-photo"><img src={`${BASE_PATH}/travel/iceland/strokkur-eruption.avif`} alt="冰島 Strokkur 間歇泉噴發"/><figcaption>STROKKUR / THE MOMENT OF ERUPTION</figcaption></figure></article>
        <article className="golden-card thingvellir"><div className="golden-number">03</div><div><small>EARTH / TIME</small><h3>Þingvellir</h3><b>辛格韋德利國家公園</b><p>北美與歐亞板塊在這裡緩慢分離。裂谷、低矮植被與遠方水面，讓地質變成可以直接走進去的風景。</p><span className="data-pending">TRAVEL NOTES — TO BE ADDED</span></div></article>
      </div>
    </section>

    <section className="geothermal-chapter" id="blue-lagoon">
      <div className="geothermal-photo"><img src={`${BASE_PATH}/travel/iceland/blue-lagoon-water.avif`} alt="風雨中的冰島藍湖溫泉"/><span>BLUE LAGOON / GEOTHERMAL WATER</span></div>
      <div className="geothermal-story"><small>03 / HEAT BELOW</small><h2>地面風雨不停，地下仍供應著溫度。</h2><p>走進藍湖，外套上的雨水還沒乾，身體已經沉進乳藍色的熱水裡。冰島最強烈的對比就在這一刻：地表冷得讓人縮起肩膀，地底的熱卻從未停止。</p><p>這股能量也不只留在溫泉。冰島多數住宅的暖氣與熱水由地熱系統供應，地下熱源經過管線進入城市與家庭，成為島上最平常的一部分。</p><dl><div><dt>體感 / OUTSIDE</dt><dd>風、雨與低溫</dd></div><div><dt>水溫 / INSIDE</dt><dd>溫熱地熱水</dd></div><div><dt>城市 / EVERYDAY</dt><dd>供暖與熱水</dd></div></dl></div>
      <figure className="geothermal-detail"><img src={`${BASE_PATH}/travel/iceland/blue-lagoon-arrival.avif`} alt="冰島藍湖入口櫃檯"/><figcaption>抵達藍湖：從暴風雨走進地熱世界。</figcaption></figure>
    </section>

    <section className="ice-route" id="route">
      <div className="ice-route-label"><span>FIELD NOTE</span><p>MOSS / LAVA / WATER<br/>64° N — ICELAND</p></div>
      <div className="ice-route-copy"><small>SPECIAL TERRAIN</small><h2>看似安靜的苔原，<br/>其實覆蓋著火山留下的時間。</h2><p>冰島苔蘚生長得極慢，柔軟外表下是粗獷的熔岩地形。這些脆弱地表不只是風景，也是旅途中需要保持距離、留在步道上的理由。</p><dl><div><dt>主題 / THEME</dt><dd>苔原與火山地貌</dd></div><div><dt>路線 / ROUTE</dt><dd>GOLDEN CIRCLE</dd></div><div><dt>資料 / NOTES</dt><dd>後續補充</dd></div></dl></div>
    </section>

    <footer className="ice-footer"><a href={`${BASE_PATH}/travel/`}>← 返回所有旅程</a><p>YOUNG HUNG / EXPEDITIONS</p><span>下一篇 FIELD NOTE — SOON</span></footer>
  </main>;
}
