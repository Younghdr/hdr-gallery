import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./chile.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Chile｜北智利阿塔卡馬旅行地誌",
  description: "以聖佩德羅－德阿塔卡馬為基地，走進沙漠小鎮、星空觀測團與利坎卡武爾火山的北智利攝影旅行。",
  alternates: { canonical: "/travel/chile/" },
};

const route = [
  ["DAY 01", "SAN PEDRO", "阿塔卡馬沙漠小鎮", "土牆、碎石街與低矮屋簷，先讓身體適應 2,400 公尺的高度"],
  ["DAY 02", "LICANCABUR", "利坎卡武爾火山", "從小鎮抬頭就能看見的完美錐形山體，旅人暱稱它為南美富士山"],
  ["DAY 03", "VALLE DE LA LUNA", "月亮谷", "日落前進入鹽岩與沙丘，等待地表由金色轉成紫紅"],
  ["NIGHT", "ASTRO TOUR", "阿塔卡馬星星團", "離開鎮上燈光，以肉眼辨認南十字，再透過望遠鏡觀察深空"],
];

export default function ChilePage() {
  return (
    <SiteFrame>
      <main className="cl-page">
        <section className="cl-hero">
          <img src={`${BASE_PATH}/travel/chile/licancabur-hero.jpg`} alt="利坎卡武爾火山矗立在北智利阿塔卡馬高原" />
          <div className="cl-hero-shade" />
          <div className="cl-axis" aria-hidden="true"><span>2,400 M</span><i /><span>5,920 M</span></div>
          <div className="cl-hero-copy">
            <p>CHILE · 22.8339° S / 68.1349° W</p>
            <h1>ATACAMA</h1>
            <div><b>智利北境</b><span>沙漠小鎮作為基地，利坎卡武爾守在東方；天黑之後，跟著星星團走進沒有光害的夜空。</span></div>
          </div>
          <a href="#latitude">進入阿塔卡馬 <i>↓</i></a>
        </section>

        <section className="cl-opening" id="latitude">
          <div className="cl-index"><span>01</span><i /><b>北方基地</b></div>
          <header><p>THE DESERT TOWN</p><h2>先住進沙漠，<br />再決定今天走多遠。</h2></header>
          <div className="cl-opening-copy"><p>聖佩德羅－德阿塔卡馬不是匆匆經過的景點，而是北智利行程的基地。土牆、碎石街與仙人掌木屋頂構成低矮街廓，旅行社、餐館與小旅店都集中在幾條可步行的街道裡。</p><p>白天從這裡前往鹽湖、月亮谷與高原潟湖；傍晚回到小鎮，等氣溫下降，再換上厚外套參加夜間觀星團。</p></div>
        </section>

        <section className="cl-route" aria-labelledby="cl-route-title">
          <div className="cl-route-label"><span>23°</span><b>ATACAMA</b></div>
          <div className="cl-route-main"><p>DESERT LOG / 路線</p><h2 id="cl-route-title">以小鎮為圓心，<br />安排三個白天與一個夜晚。</h2><ol>{route.map(([day, en, zh, note], index) => <li key={en}><span>{String(index + 1).padStart(2, "0")}</span><b>{day}</b><div><h3>{en}</h3><small>{zh}</small></div><p>{note}</p></li>)}</ol></div>
          <div className="cl-route-label cl-route-south"><span>∞</span><b>NIGHT SKY</b></div>
        </section>

        <section className="cl-atacama">
          <div className="cl-atacama-copy"><span>22.8339° S / SAN PEDRO</span><h2>小鎮很小，<br />卻裝得下整片沙漠。</h2><p>卡拉科萊斯街是鎮上的主軸，但真正迷人的是轉進旁邊巷道後的安靜。土牆吸收午後強光，鐘樓、庭院與遠方火山落在同一條視線裡。第一天不用排滿，散步、補水、預訂星星團，讓身體先跟上海拔。</p><dl><div><dt>ALTITUDE</dt><dd>2,400 M</dd></div><div><dt>BASE</dt><dd>3–4 NIGHTS</dd></div><div><dt>FIELD KIT</dt><dd>水、防曬、保暖層</dd></div></dl></div>
          <figure><img src="https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=2200&q=88" alt="阿塔卡馬高原的乾燥山地與道路" /><figcaption><b>ALTIPLANO / NORTE GRANDE</b><span>高海拔讓距離失去比例</span></figcaption></figure>
        </section>

        <section className="cl-valpo">
          <figure><img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2400&q=90" alt="阿塔卡馬沙漠上空清晰的銀河與繁星" /><figcaption>ASTRO TOUR · MOONLESS NIGHT</figcaption></figure>
          <div><span>AFTER DARK / 星星團</span><h2>關掉最後一盞燈，<br />銀河才真正出現。</h2><p>星星團通常在晚間離開聖佩德羅，前往沒有路燈的觀測場地。前段以肉眼認星與聽南半球星空解說，後段使用望遠鏡觀察星團、行星與深空天體。月光太強或雲量過高都會影響行程，最好把觀星安排在住宿前幾晚，保留改期空間。</p></div>
        </section>

        <section className="cl-patagonia">
          <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2800&q=90" alt="利坎卡武爾火山呈現近乎對稱的錐形山體" />
          <div className="cl-patagonia-shade" />
          <div className="cl-patagonia-copy"><p>5,920 M / VOLCÁN LICANCABUR</p><h2>南美富士山，<br />守在小鎮每一個轉角。</h2><span>利坎卡武爾位於智利與玻利維亞邊界，近乎對稱的火山錐讓旅人聯想到富士山。它不只是遠方背景：清晨泛紅、午後銳利，入夜又成為辨認東方天空的黑色座標。</span></div>
        </section>

        <section className="cl-notes">
          <header><span>FIELD NOTES / 出發前</span><h2>住進沙漠的準備</h2></header>
          <div className="cl-note-grid"><article><b>01</b><h3>抵達</h3><p>飛抵卡拉馬後，搭共乘接駁前往聖佩德羅；車程約一個半小時。</p></article><article><b>02</b><h3>星星團</h3><p>避開滿月前後並安排在前幾晚；夜間溫差大，即使白天炎熱也要帶厚外套。</p></article><article><b>03</b><h3>高度</h3><p>小鎮已在 2,400 公尺，高原行程更高；由低到高安排、持續補水並留意身體反應。</p></article><article><b>04</b><h3>火山視角</h3><p>利坎卡武爾從鎮內多處可見；日出前後輪廓最乾淨，長焦能壓縮土牆與山體。</p></article></div>
          <a href={`${BASE_PATH}/travel/`}>返回旅行索引 <span>↗</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
