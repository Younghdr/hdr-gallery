import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./koh-samui.css";
import "./granite-feature.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const hero = `${BASE_PATH}/travel/koh-samui-original.avif`;
const retouched = `${BASE_PATH}/travel/koh-samui-retouched.png`;

export const metadata: Metadata = {
  title: "蘇美島與龜島｜花崗岩島嶼手札",
  description: "從蘇美島的椰林晨光，到龜島裸露的花崗岩海岸，以四天讀懂泰國灣的潮汐與島嶼肌理。",
  alternates: { canonical: "/travel/koh-samui/" },
};

const route = [
  { time: "05:52", place: "LIPA NOI", zh: "利帕諾伊", note: "西岸第一道光，海面像一張還沒寫字的紙。" },
  { time: "09:20", place: "TALING NGAM", zh: "塔靈岩", note: "沿著椰林慢慢往南，把午後留給沒有名字的小路。" },
  { time: "16:40", place: "FISHERMAN’S VILLAGE", zh: "漁人村", note: "木屋、香料與炭火，傍晚是島上最有聲音的時刻。" },
  { time: "07:10", place: "KOH TAO · NANG YUAN", zh: "龜島 · 南園島", note: "花崗岩海岸從清澈海水裡升起；南園島的白色沙洲與著名觀景點，讓海面有了另一種尺度。" },
];

export default function KohSamuiPage() {
  return <SiteFrame><main className="ks-page">
    <section className="ks-hero" style={{ backgroundImage: `url('${hero}')` }}>
      <div className="ks-hero-shade" />
      <header className="ks-masthead"><a href={`${BASE_PATH}/travel/`}>YH / TRAVEL</a><span>09.5120° N — 100.0136° E</span><b>THAILAND · 2026</b></header>
      <div className="ks-title">
        <p>ISLAND FIELD JOURNAL · NO. 10</p>
        <h1>蘇美島與龜島，<br />潮汐讓時間慢下來</h1>
        <div><span>KOH SAMUI · KOH TAO</span><i /> <b>4 DAYS / GRANITE COAST</b></div>
      </div>
      <a className="ks-scroll" href="#journal">READ THE JOURNAL <span>↓</span></a>
    </section>

    <section className="ks-opening" id="journal">
      <div className="ks-index">10<span>/ 10</span></div>
      <div className="ks-opening-copy"><p>THE GULF OF THAILAND</p><h2>不是逃離日常，<br />只是把速度還給海。</h2></div>
      <div className="ks-prose"><p>泰國蘇美島是泰國第三大島，位於南部海域，是一座帶著熱帶風情的度假島嶼。它和曾經去過的普吉島不同：蘇美島的節奏更鬆，椰林、海灣與低矮聚落之間，還留著一點不急著被觀光填滿的空白。</p><p>往東南航向龜島與南園島，景色從椰林轉成裸露的花崗岩。岩壁、珊瑚、三角沙洲和潮線讓這段旅程有了不同尺度，也讓路線不只是在海邊停留，而是在讀一座島如何長出自己的形狀。</p><p>島上也走過幾處經典地標：<a href="https://www.tw.kayak.com/in?a=kan_151340&lc=zh&url=%2Fhotels-dateless%2Fc118255&p=spot_kohsamui" target="_blank" rel="noreferrer">查汶海灘</a>、南邊第二熱門的 <a href="https://www.tw.kayak.com/in?a=kan_151340&lc=zh&url=%2Fhotels-dateless%2Fh655834&p=pkg_japanguide" target="_blank" rel="noreferrer">拉邁沙灘</a>，以及查汶大街、阿公阿嬤石、大佛寺、納蒙瀑布；若行程接上帕安島，還有著名的滿月派對。</p></div>
    </section>

    <section className="ks-tide" aria-label="蘇美島一天的潮汐節奏">
      <div className="ks-tide-photo" style={{ backgroundImage: `url('${hero}')` }}><span>WEST COAST / 06:07</span></div>
      <div className="ks-tide-note"><p>TIDE NOTE / 01</p><h2>跟著光，<br />而不是行程表。</h2><blockquote>「島嶼不催促你。它只用潮水，提醒每件事都有自己的時刻。」</blockquote><dl><div><dt>SUNRISE</dt><dd>05:52</dd></div><div><dt>SEA</dt><dd>28°C</dd></div><div><dt>PACE</dt><dd>SLOW</dd></div></dl></div>
    </section>

    <section className="ks-comparison" aria-labelledby="comparison-title">
      <header><p>IMAGE CHECK / SAME FRAME</p><h2 id="comparison-title">同一張海岸，兩種光線。</h2><span>兩種版本，你喜歡哪一種呢？</span></header>
      <div className="ks-comparison-grid">
        <figure><div className="ks-comparison-frame"><img src={`${BASE_PATH}/travel/koh-samui-original.avif`} alt="5DM32119 HDR 海岸照片" /></div><figcaption><b>HDR</b></figcaption></figure>
        <figure><div className="ks-comparison-frame"><img src={retouched} alt="5DM32119 SDR 海岸照片" /></div><figcaption><b>SDR</b></figcaption></figure>
      </div>
    </section>

    <section className="ks-chaweng" aria-label="查汶海灘藍色時刻">
      <img src={`${BASE_PATH}/travel/koh-samui-chaweng.avif`} alt="查汶海灘傍晚海面與山景" /><div><p>CHAWENG BEACH / BLUE HOUR</p><h2>海水變深之後，<br />島上的燈才開始說話。</h2><span>查汶海灘 · 傍晚</span></div>
    </section>

    <section className="ks-nang-yuan" aria-label="南園島全景">
      <img src={`${BASE_PATH}/travel/koh-tao-nang-yuan-panorama.avif`} alt="南園島三角沙洲與花崗岩島嶼全景" />
      <div><p>KOH TAO · NANG YUAN / GRANITE ISLANDS</p><h2>一條沙洲，<br />把兩座花崗岩島連在一起。</h2></div>
    </section>

    <section className="ks-pier-notes" aria-labelledby="pier-notes-title">
      <header><p>NANG YUAN PIER / FIELD NOTES</p><h2 id="pier-notes-title">在碼頭，先看島怎麼吃。</h2><span>南園島的味道不只在餐廳裡，也在船靠岸之後的烤網與水果攤。</span></header>
      <div className="ks-pier-grid">
        <figure><img src={`${BASE_PATH}/travel/nang-yuan-sour-sausage.avif`} alt="南園島碼頭烤酸腸" /><figcaption><b>酸腸 / SAI KROK</b><span>台灣香腸常有明顯甜味；泰式酸腸則以米飯與乳酸發酵帶出酸味，常伴隨蒜香與鹹味。</span></figcaption></figure>
        <figure><img src={`${BASE_PATH}/travel/nang-yuan-live-squid.avif`} alt="南園島碼頭透明活魷魚" /><figcaption><b>透明活魷魚</b><span>還活著、近乎透明的魷魚，多數人第一次在碼頭近距離看見。</span></figcaption></figure>
        <figure><img src={`${BASE_PATH}/travel/nang-yuan-mangosteen.avif`} alt="南園島碼頭山竹" /><figcaption><b>山竹 / MANGOSTEEN</b><span>果肉柔軟多汁，酸甜感比外皮看起來更輕盈。</span></figcaption></figure>
      </div>
      <figure className="ks-granite-feature"><img src={`${BASE_PATH}/travel/nang-yuan-granite-coast.avif`} alt="龜島巨石海岸與人物比例" /><figcaption><b>龜島巨石</b><span>人物站在巨石旁，才看得出花崗岩海岸真正的尺度。</span></figcaption></figure>
    </section>

    <section className="ks-route">
      <header><p>ONE ISLAND / FOUR MOMENTS</p><h2>沿岸，不繞遠路</h2><span>路線依光線與潮汐排列。島不大，真正需要預留的是停下來的時間。</span></header>
      <ol>{route.map((stop, index) => <li key={stop.place}><em>{String(index + 1).padStart(2, "0")}</em><time>{stop.time}</time><div><b>{stop.place}</b><span>{stop.zh}</span></div><p>{stop.note}</p></li>)}</ol>
    </section>

    <section className="ks-fieldnotes">
      <article><span>01 / STAY</span><h3>住在西岸</h3><p>看得到落日，也離主要海灘的喧鬧遠一些。選一間步行就能到海邊的小旅店。</p></article>
      <article><span>02 / TAKE CARE</span><h3>龜島路況</h3><p>龜島地形起伏大，部分路段狀況不佳，當時所見車禍事故並不少見。泰國機車輪胎通常很細，有些是俗稱的「巧克力胎」；租車務必放慢、戴好安全帽，取車前也要確認車況，店家通常會檢查車輛底盤。</p></article>
      <article><span>03 / TASTE</span><h3>從市場吃起</h3><p>椰奶咖哩、烤魚與酸辣海鮮。先看當日漁獲，再決定今晚的菜單。</p></article>
    </section>

    <footer className="ks-footer" style={{ backgroundImage: `url('${hero}')` }}><div><p>NEXT TIDE / NEXT JOURNEY</p><h2>把一點海風<br />帶回日常。</h2><a href={`${BASE_PATH}/travel/`}>返回旅行檔案 <span>↗</span></a></div><small>YOUNG HUNG HDR STUDIO · KOH SAMUI</small></footer>
  </main></SiteFrame>;
}
