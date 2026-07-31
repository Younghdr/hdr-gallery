import type { Metadata } from "next";
import "./hong-kong-macau.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "香港 ⇄ 澳門｜雙城渡輪旅誌",
  description: "從香港維多利亞港到澳門舊城，以一段渡輪航程串起兩座城市的夜色、晨光與街道節奏。",
  alternates: { canonical: "/travel/hong-kong-macau/" },
};

export default function HongKongMacauPage() {
  return <main className="hm-page">
    <header className="hm-nav"><a href={`${BASE_PATH}/travel/`}><b>YH</b><span>雙城航線誌</span></a><p>HKG 22:14 — MFM 06:42</p><a href="#passage">航程 ↓</a></header>
    <section className="hm-hero"><img src={`${BASE_PATH}/travel/hong-kong-macau/hong-kong-harbour.png`} alt="藍調時刻的香港維多利亞港、天際線與紅色計程車" /><div className="hm-hero-copy"><small>FIELD JOURNAL / 021</small><h1>一片海，<br /><em>兩種城市速度。</em></h1><p>HONG KONG ⇄ MACAU</p></div><aside><span>22°18′N</span><i>55 KM</i><span>22°12′N</span></aside></section>
    <section className="hm-passage" id="passage"><header><small>THE PASSAGE / 約 60 分鐘</small><h2>夜裡離港，<br />清晨抵達另一種時間。</h2></header><div className="hm-route"><article><span>01</span><b>香港島</b><p>讓高樓的燈光先在海面上拉長，再沿著碼頭往西走。</p></article><i>→</i><article><span>02</span><b>珠江口</b><p>城市退到船尾，只剩航道、浪聲與遠方逐漸變亮的天際。</p></article><i>→</i><article><span>03</span><b>澳門半島</b><p>從碼頭進入舊城，石板路把腳步自然調慢。</p></article></div></section>
    <section className="hm-macau"><figure><img src={`${BASE_PATH}/travel/hong-kong-macau/macau-old-town.png`} alt="晨光中的澳門舊城街道與大三巴牌坊" /></figure><div className="hm-notes"><small>MORNING NOTES</small><h2>把澳門留給早晨。</h2><p>不先追著地標走。從議事亭前地的波浪石紋開始，穿過尚未擁擠的窄巷，再慢慢走到大三巴。葡式立面、廣東街坊與早餐蒸氣，會在幾個街口內反覆交疊。</p><dl><div><dt>第一班船</dt><dd>07:00 前後</dd></div><div><dt>步行節奏</dt><dd>慢，保留巷弄支線</dd></div><div><dt>最佳光線</dt><dd>日出後 90 分鐘</dd></div></dl></div></section>
    <footer className="hm-footer"><p>HONG KONG ⇄ MACAU / ACROSS THE ESTUARY</p><a href={`${BASE_PATH}/travel/`}>回到所有旅程 ↗</a></footer>
  </main>;
}
