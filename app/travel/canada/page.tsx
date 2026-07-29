import type { Metadata } from "next";
import "./canada.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "加拿大極光攝影遊記｜黃刀鎮的第一夜",
  description: "從溫哥華、卡加利到黃刀鎮，在 Aurora Village 第一次看見極光的 HDR 攝影遊記。",
  alternates: { canonical: "/travel/canada/" },
  openGraph: {
    title: "加拿大極光攝影遊記｜黃刀鎮的第一夜",
    description: "第一道淡綠出現在樹梢旁，北方的故事從這一夜開始。",
    url: "/travel/canada/",
    images: [{ url: "/travel/canada/hero.png", alt: "加拿大北境與極光攝影旅程" }],
  },
};

export default function CanadaTravelPage() {
  return (
    <main className="canada-page">
      <header className="canada-nav">
        <a className="canada-mark" href={`${BASE_PATH}/`} aria-label="返回 Young HDR Gallery 首頁"><span>YH</span><b>EXPEDITIONS</b></a>
        <nav aria-label="加拿大旅程導覽"><a href={`${BASE_PATH}/travel/`}>ALL JOURNEYS</a><a href="#first-night">FIRST NIGHT</a><a href={`${BASE_PATH}/travel/namibia/`}>NAMIBIA</a><a href={`${BASE_PATH}/photography/`}>PHOTOGRAPHY</a></nav>
        <a className="canada-nav-cta" href="#first-night">READ STORY</a>
      </header>

      <section className="canada-hero" style={{ backgroundImage: `url('${BASE_PATH}/travel/canada/hero.png')` }}>
        <div className="canada-hero-shade" />
        <div className="canada-hero-copy">
          <p>13 DAYS · FROM 62°27′N TO THE ROCKIES · OCT 2024</p>
          <h1>CANADA</h1>
          <h2>向北，直到天空發光</h2>
          <span>從黃刀鎮的夜色出發，沿著冰河與群山，走完一段加拿大北境旅程。</span>
        </div>
        <div className="canada-scroll"><i />SCROLL TO THE NORTH</div>
      </section>

      <section className="canada-stats" aria-label="加拿大旅程概要">
        <div><small>DURATION</small><b>13 DAYS</b></div>
        <div><small>AURORA NIGHTS</small><b>03</b></div>
        <div><small>ROAD DISTANCE</small><b>850+ KM</b></div>
        <div><small>TRAVELLERS</small><b>06</b></div>
      </section>

      <article className="canada-journal" id="first-night">
        <header className="night-opening">
          <p>CHAPTER 01 · YELLOWKNIFE</p>
          <div><small>THE FIRST SIGHTING / 第一次看見</small><h2>第一夜<span>天空在帳篷外亮了起來</span></h2><p>從溫哥華出發，在卡加利轉機，最後抵達黃刀鎮。這座北方機場比想像中更小；接近傍晚，我們搭上共乘巴士，跟著其他旅客前往市中心。</p></div>
        </header>

        <section className="night-timeline" aria-label="第一夜行程時間軸">
          <div><small>ARRIVAL</small><b>Yellowknife Airport</b></div><div><small>STAY</small><b>The Explorer Hotel</b></div><div><small>DINNER</small><b>夜間超市 · 微波食品</b></div><div><small>21:30</small><b>Aurora Village Pickup</b></div>
        </section>

        <section className="journal-copy"><small>01 / BEFORE THE DARK</small><div><p>辦好入住後，距離極光行程已經沒有多少時間。我們匆匆走進夜間超市，挑了幾份微波食品帶回飯店。幾個人守著同一台微波爐輪流加熱，簡單吃過晚餐，時間很快便來到晚上九點半。</p><p>Aurora Village 的接駁車來到 The Explorer Hotel。我們離開黃刀鎮的燈光，沿著公路駛進城外的森林。</p></div></section>

        <section className="waiting-copy"><small>02 / WAITING FOR THE SKY</small><div><h3>十月的黃刀鎮，白天看起來和任何一座北方小城沒有太大不同。<br />天黑之後，你才明白自己為什麼來到這裡。</h3><p>出發前，我們不停查看極光 App。預報每一次變化，都牽動著期待；但真正抵達北方的夜裡，才知道螢幕上的數字終究只是參考。</p><p>真正決定那個夜晚的，是頭頂的雲層、看不見的磁場，還有你願意在黑暗與寒冷中等待多久。</p><p>有時候，你只能站在夜裡，抬著頭，等天空給出答案。</p><strong>那天晚上，答案先是一道很淡、很淡的綠。</strong></div></section>

        <figure className="canada-photo"><img src={`${BASE_PATH}/travel/canada/first-trace.avif`} alt="黃刀鎮極光村漆黑的場地上，第一道淡綠色極光出現在樹梢旁" /><figcaption><b>THE FIRST TRACE · AURORA VILLAGE</b><span>YELLOWKNIFE · 04 OCT 2024</span></figcaption></figure>

        <section className="first-reaction"><h3>原本漆黑的天空，浮出一道淡淡的綠。</h3><p>抵達極光村後，四周幾乎伸手不見五指，只剩帳篷透出的微弱暖光。有人先發現了它；轉眼間，大家拿起相機，一群人從帳篷裡走到戶外。它只是淡淡地出現在樹梢旁，卻讓所有人同時走進了夜裡。</p></section>

        <section className="journal-copy second-wave-copy"><small>03 / AURORA IN MOTION</small><div><p>極光移動的速度並不固定。有時緩慢地向前延伸，有時突然加快，像在夜空中跳舞。漸漸地，第一道綠光之外又出現了第二道，兩道光帶交錯移動，變得越來越亮。</p><p>但天空亮了，地面依然一片漆黑。十月初的黃刀鎮還沒有下雪，剛走到戶外時並不覺得特別冷；可是在同一個位置站久了，寒意便慢慢累積。最先感受到的不是臉或雙手，而是腳底，冷意從鞋底滲進來，再一點一點向上蔓延。</p><p>黑暗中，一名經過的日本遊客不小心踢到我的腳架。腳架瞬間失去平衡，還好我及時伸手抓住，才沒有讓相機真的摔到地面。重新架好腳架後，第一件事不是檢查剛才拍到了什麼，而是趕快抬頭——極光還在。</p></div></section>

        <figure className="canada-photo second-wave-photo"><img src={`${BASE_PATH}/travel/canada/second-wave.avif`} alt="兩道逐漸增亮的綠色極光越過極光村帳篷與森林" /><figcaption><b>AURORA IN MOTION · SECOND WAVE</b><span>YELLOWKNIFE · OCT 2024</span></figcaption></figure>

        <footer className="canada-continues"><p>TO BE CONTINUED · 未完待續</p><h3>北方的夜還很長，<br />故事也會慢慢補上。</h3><span>下一章 · 極光之後，前往洛磯山脈</span></footer>
      </article>
    </main>
  );
}
