import type { Metadata } from "next";
import "../guide-pages.css";

export const metadata: Metadata = { title: "納米比亞簽證申請", description: "納米比亞線上觀光簽證準備文件與六步申請流程。" };
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const steps = [
  { number: "01", title: "進入官方網站", text: "開啟納米比亞移民暨內政部的 E-Services，從 Register 建立申請帳號。", image: "step-1.png" },
  { number: "02", title: "註冊並確認帳號", text: "填寫姓名、電子郵件與密碼後，前往信箱點選確認連結，再回到系統登入。", image: "step-2.png" },
  { number: "03", title: "建立觀光簽證申請", text: "選擇 New Holiday Visa Application，依序填寫個人、護照與行程資料並上傳證明文件。", image: "step-3.png" },
  { number: "04", title: "送出並等待審核", text: "系統顯示申請成功後，保留參考編號；後續狀態會透過電子郵件與申請平台更新。", image: "step-4.png" },
  { number: "05", title: "核准後線上付款", text: "收到核准通知後登入系統完成付款。畫面可能另列線上交易處理費，請以當下顯示金額為準。", image: "step-5.png" },
  { number: "06", title: "下載電子簽證", text: "付款成功、狀態更新為 Visa Issued 後下載簽證檔案，建議同時保存電子檔與紙本。", image: "step-6.png" },
];

export default function VisaGuidePage() {
  return <main className="guide-page visa-article">
    <header className="guide-nav"><a href={`${BASE_PATH}/travel/guide/`}>← ALL GUIDES</a><a href={`${BASE_PATH}/travel/`}>JOURNEY ↗</a></header>
    <section className="visa-cover"><p>GUIDE / 02 · VISA & ENTRY</p><h1>納米比亞<br />線上觀光簽證</h1><div><span>6 STEPS</span><span>REFERENCE · 2025.09</span></div></section>
    <section className="visa-lead"><h2>先把簽證，<br />留在出發前完成。</h2><div><p>我們這次使用納米比亞線上觀光簽證系統。流程本身不複雜，真正需要時間的是事前備妥英文文件、確認行程資料，以及等待審核結果。</p><a href="https://eservices.mhaiss.gov.na/holidayvisa-services" target="_blank" rel="noreferrer">OPEN OFFICIAL APPLICATION ↗</a><small>實際資格、費用與文件要求可能變動；送件前請以納米比亞官方網站最新公告為準。</small></div></section>
    <section className="visa-docs"><div><p>PREPARE / 01</p><h2>送件前，先整理成一個資料夾。</h2></div><ol><li>近三個月護照照片</li><li>護照個人資料頁</li><li>近六個月英文銀行對帳單或財力證明</li><li>英文申請動機信</li><li>來回機票或訂位證明</li><li>住宿與旅行行程證明</li><li>英文旅遊保險證明</li><li>旅行社邀請函或支持文件</li></ol></section>
    <section className="visa-process"><div className="process-title"><p>APPLICATION / 02</p><h2>六個步驟，完成線上申請。</h2></div>{steps.map(step=><article key={step.number}><div><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div><figure><img src={`${BASE_PATH}/travel/visa/${step.image}`} alt={`納米比亞簽證申請步驟 ${step.number}：${step.title}`} loading="lazy" /></figure></article>)}</section>
    <aside className="visa-credit"><span>SOURCE & GRATITUDE</span><h2>同行者的實際申請紀錄</h2><p>本章流程與申請畫面，依同行旅伴 Elena 的 2025 年實際申請紀錄重新整理。完整逐頁畫面請前往原始教學文章。</p><div><a href="https://blog.elena.tw/apply-online-for-a-namibia-holiday-visa/" target="_blank" rel="noreferrer">閱讀原始簽證教學 ↗</a><a href="https://blog.elena.tw/" target="_blank" rel="noreferrer">VISIT ELENA'S BLOG ↗</a></div></aside>
    <footer className="guide-footer"><a href={`${BASE_PATH}/travel/guide/`}>查看所有旅行攻略 ↗</a><span>LAST REVIEWED · 2025.09</span></footer>
  </main>;
}
