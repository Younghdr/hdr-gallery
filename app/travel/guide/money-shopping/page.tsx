import type { Metadata } from "next";
import { guideMetadata } from "@/lib/travel-guide-seo";
import "../guide-pages.css";
import "../field-notes.css";
import "../field-notes-footer.css";
import "../cta.css";
import "../cta-4k.css";
import "./money-shopping.css";

export const metadata: Metadata = guideMetadata({ title: "納米比亞換錢與購物｜現金、刷卡、市集與伴手禮", description: "納米比亞旅遊的換匯、刷卡、現金、市集議價與伴手禮建議，涵蓋 Windhoek 與 Swakopmund。", path: "/travel/guide/money-shopping/" });
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function MoneyShoppingPage(){return <main className="field-page money-shopping-page">
  <nav className="field-nav"><a href={`${BASE_PATH}/travel/guide/`}>← RETURN TO GUIDE</a><span>08 / MONEY &amp; SHOPPING</span></nav>
  <section className="field-hero"><p>FIELD NOTES / 08</p><h1><i>怎麼付錢，</i><i>也決定帶什麼回家。</i></h1><div><span>CASH · CARD · LOCAL FINDS</span><span>NAMIBIA</span></div></section>
  <section className="field-intro"><span>THE PRACTICAL SIDE</span><p>納米比亞並不是想像中的低價非洲。真正拉高預算的，往往是長距離、四輪傳動車、燃油、偏遠旅宿與活動；購物反而是旅程裡較容易控制的一小部分。</p></section>
  <section className="field-section"><span>01 / CURRENCY</span><header><div></div><h2><i>兩種紙鈔，</i><i>在境內一起流通。</i></h2></header><div className="field-grid"><article><b>NAD + ZAR</b><h3>納米比亞元與南非蘭特</h3><p>官方貨幣為納米比亞元（NAD），並與南非蘭特（ZAR）維持一比一。兩者可在納米比亞使用，但納米比亞元不宜留到南非才處理，離境前應優先花完。</p></article><article><b>CASH + CARD</b><h3>刷卡之外，仍要留少量現金</h3><p>城市、超市與較大型商店多能刷卡；偏遠地區、小費與部分市集仍適合使用現金。信用卡、備用卡與現金應分開保管，也不要把全團現金集中在同一個人身上。</p></article></div></section>
  <section className="field-section field-light"><span>02 / WHERE TO BUY</span><header><div></div><h2><i>市集可以慢慢談，</i><i>店家與機場也值得逛。</i></h2></header><div className="field-copy"><p>Swakopmund 的公園與路邊市集，是旅途中很有意思的一站。可以一邊看手藝、一邊和攤主聊天，也可以禮貌議價；如果一次挑了幾件，比起直接把價格砍半，我們更習慣問一句：「一起買，可以算多少？」</p><figure className="city-wildlife-note"><img src={`${BASE_PATH}/travel/lion-window.avif`} alt="城市櫥窗裡的沙漠獅雕像"/><figcaption>城市的櫥窗裡，也會突然遇見納米比亞的荒野。</figcaption></figure><p>但不喜歡殺價，也完全不必勉強自己。以我們這次的經驗來說，Windhoek 與 Swakopmund 有店面的商家，以及機場，其實都沒有特別貴。店內商品陳列清楚，品質與價格更容易比較；機場也能找到價格合理的寶石原礦與伴手禮，不需要為了害怕買貴，沿途急著把東西買齊。</p><p>市集適合享受挑選與交流，店家和機場則買得輕鬆。沒有哪一種方式一定比較好，選擇自己自在的購物方式就可以。購買寶石或動物來源工藝品時，仍應確認來源、攜帶限制並保留收據。</p></div></section>
  <section className="field-picks"><span>03 / WHAT I BROUGHT HOME</span><h2>回台灣以後，<br/>還會真正拿來用的東西。</h2><div className="pick-layout"><figure><img src={`${BASE_PATH}/travel/namib-chilli-editorial.png`} alt="納米比亞超市貨架上的 Namib Chilli 辣椒醬"/><figcaption>超市貨架上的 Namib Chilli，也是這趟旅行最想再買的味道。</figcaption></figure><div className="pick-story"><p>最想再買的是納米比亞當地品牌 <b>Namib Chilli</b>。不是因為它最像典型伴手禮，而是回到台灣後真的會拿來吃。</p><p>幾款之中，我最推薦 <b>Kapana</b>：帶著納米比亞街頭烤肉的香料感，配紅肉與烤羊特別合適。五種口味不必逐瓶解說；記得自己真正喜歡哪一瓶，就已經足夠。</p><p>旅途中也帶回寶石原礦，以及帶有非洲圖紋的鴕鳥蛋與蛋殼工藝。原礦與動物來源工藝品應保留收據、確認合法來源，並先查航空公司與出入境規定；辣醬則應放入托運行李並做好防漏。</p></div></div></section>
  <nav className="guide-related-links" aria-label="相關旅行攻略"><span>READ NEXT</span><a href={`${BASE_PATH}/travel/guide/practical/`}>氣候、網路與途中日常</a><a href={`${BASE_PATH}/travel/guide/photography/`}>荒野攝影準備</a></nav>
  <a className="guide-next-cta" href={`${BASE_PATH}/travel/`}>回到旅程：查看完整納米比亞路線 →</a>
  <footer className="field-footer"><a href={`${BASE_PATH}/travel/guide/`}>回到準備旅行 ↗</a><span>YOUNG HUNG HDR STUDIO</span></footer>
</main>}
