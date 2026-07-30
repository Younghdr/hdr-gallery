import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/faq-json-ld";
import "../guide-pages.css";
import "../cta.css";
import "../cta-4k.css";

export const metadata: Metadata = {
  title: "納米比亞簽證申請｜台灣護照線上觀光簽證流程",
  description: "納米比亞線上觀光簽證的準備文件、六步申請流程與送件前檢查清單。",
  alternates: { canonical: "/travel/guide/visa/" },
  openGraph: {
    title: "納米比亞簽證申請｜六步線上流程",
    description: "申請文件、操作步驟與送件前清單。",
    url: "/travel/guide/visa/",
    images: [{ url: "/travel/visa/step-1.png", alt: "納米比亞線上觀光簽證申請" }],
  },
};
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const steps = [
  { number: "01", title: "進入官方網站", text: "開啟納米比亞移民暨內政部的 E-Services，從 Register 建立申請帳號。", image: "step-1.png" },
  { number: "02", title: "註冊並確認帳號", text: "填寫姓名、電子郵件與密碼後，前往信箱點選確認連結，再回到系統登入。", image: "step-2.png" },
  { number: "03", title: "建立觀光簽證申請", text: "選擇 New Holiday Visa Application，依序填寫個人、護照與行程資料並上傳證明文件。", image: "step-3.png" },
  { number: "04", title: "送出並等待審核", text: "保留每個人的申請編號並定期查看狀態。審核時間不固定，即使同行、相近時間送件，進度也可能不同。", image: "step-4.png" },
  { number: "05", title: "核准後線上付款", text: "收到核准通知後登入系統完成付款。畫面可能另列線上交易處理費，請以當下顯示金額為準。", image: "step-5.png" },
  { number: "06", title: "下載電子簽證", text: "付款成功、狀態更新為 Visa Issued 後下載簽證檔案，建議同時保存電子檔與紙本。", image: "step-6.png" },
];

export default function VisaGuidePage() {
  return <main className="guide-page visa-article">
    <FaqJsonLd path="/travel/guide/visa/" faqs={[
      { question: "台灣旅客前往納米比亞需要簽證嗎？", answer: "本頁整理的是線上觀光簽證的實際申請經驗。資格、費用與文件要求可能變動，送件前請以納米比亞官方網站的最新公告為準。" },
      { question: "申請納米比亞觀光簽證要準備什麼？", answer: "一般需準備護照照片、護照個人資料頁、英文財力證明、申請動機信、來回機票、住宿預訂與完整行程；旅行社代辦時可能另需授權文件。" },
      { question: "納米比亞簽證何時開始準備？", answer: "建議儘早整理並送件，為審核時間與可能的補件留下餘裕；本頁提供送件前的文件檢查清單與六步流程。" },
    ]} />
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a><a href={`${BASE_PATH}/travel/`}>JOURNEY ↗</a></header>
    <section className="visa-cover"><p>GUIDE / 02 · VISA & ENTRY</p><h1>納米比亞<br />線上觀光簽證</h1><div><span>6 STEPS</span><span>TRAVEL REFERENCE</span></div></section>
    <section className="visa-lead"><h2>先把簽證，<br />留在出發前完成。</h2><div><p>和日本、泰國等常見的免簽旅行不同，納米比亞觀光簽證需要事前送件，並準備財力、機票、住宿與行程等英文證明。文件並非難以取得，但項目多，審核進度也不一定同步；若在短時間內才開始準備，很容易手忙腳亂。</p><p>我們同團成員在相近時間送件，處理速度仍不相同。等待期間也曾請旅行社協助寄信詢問，擔心無法在出發前取得簽證。最重要的經驗只有一件事：儘早整理、儘早送件，為審核與可能的補件留下時間。</p><a href="https://eservices.mhaiss.gov.na/holidayvisa-services" target="_blank" rel="noreferrer">OPEN OFFICIAL APPLICATION ↗</a><small>實際資格、費用與文件要求可能變動；送件前請以納米比亞官方網站最新公告為準。</small></div></section>
    <section className="visa-docs">
      <div><p>ONE-PAGE CHECKLIST / 01</p><h2>先準備好，<br />就不會在送件時慌張。</h2><p className="checklist-intro">把每位旅客的文件分開建立資料夾，檔名加上英文姓名。送件前照著這一頁逐項確認即可。</p></div>
      <div className="checklist-groups">
        <section><h3>基本文件 <span>REQUIRED</span></h3><ul><li>護照規格照片</li><li>護照個人資料頁</li><li>近六個月英文銀行對帳單或財力證明</li><li>英文申請動機信</li><li>已確認的來回機票</li><li>住宿預訂與完整旅行行程</li></ul></section>
        <section><h3>旅行社或代理申請 <span>IF APPLICABLE</span></h3><ul><li>旅行社行程確認或支持文件</li><li>每位申請人簽署的 Power of Attorney</li><li>Agent／旅行社聯絡資料</li></ul></section>
        <section><h3>送件之後 <span>DON'T FORGET</span></h3><ul><li>保存每個人的申請編號</li><li>定期登入查看申請狀態</li><li>長時間沒有更新時主動詢問</li><li>核准後完成付款並下載電子簽證</li></ul></section>
      </div>
    </section>
    <section className="visa-process"><div className="process-title"><p>APPLICATION / 02</p><h2>六個步驟，完成線上申請。</h2></div>{steps.map(step=><article key={step.number}><div><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div><figure><img src={`${BASE_PATH}/travel/visa/${step.image}`} alt={`納米比亞簽證申請步驟 ${step.number}：${step.title}`} loading="lazy" /></figure></article>)}</section>
    <aside className="visa-credit"><span>SOURCE &amp; THANKS</span><h2>同行旅伴的申請經驗</h2><p>本章依據旅伴 Elena 申請納米比亞簽證的實際經驗整理。若想查看完整的申請步驟與操作畫面，請參考她的原始教學文章。</p><div><a href="https://blog.elena.tw/apply-online-for-a-namibia-holiday-visa/" target="_blank" rel="noreferrer">閱讀原始簽證教學 ↗</a><a href="https://blog.elena.tw/" target="_blank" rel="noreferrer">VISIT ELENA'S BLOG ↗</a></div></aside>
    <nav className="guide-related-links" aria-label="相關旅行攻略"><span>READ NEXT</span><a href={`${BASE_PATH}/travel/guide/flights/`}>台灣出發航線</a><a href={`${BASE_PATH}/travel/guide/itinerary/`}>行程天數與路線</a></nav>
    <a className="guide-next-cta" href={`${BASE_PATH}/travel/guide/flights/`}>下一步：比較台灣出發的航線 →</a>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>查看所有旅行攻略 ↗</a><span>TRAVEL EXPERIENCE / REVIEWED</span></footer>
  </main>;
}
