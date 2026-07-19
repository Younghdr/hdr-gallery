const works = [
  ["IMG_1921-1782316892674.avif", "Afterglow", "TAIWAN · 2025"],
  ["AF7I3288-1782653287796.avif", "Still Human", "PORTRAIT · 2025"],
  ["IMG_1530-1782489580885.avif", "Blue Distance", "TRAVEL · 2024"],
  ["DJI_0065-1782499816506.avif", "Above the Quiet", "AERIAL · 2025"],
  ["2Y6A8536-1782056244124.avif", "Night Current", "CITY · 2024"],
  ["DJI_0008-1782237709695.avif", "Earth Lines", "AERIAL · 2025"],
  ["2Y6A7079-1781977032501.avif", "Between Light", "STREET · 2024"],
  ["AF7I6722-1782196199512.avif", "A Soft Witness", "PORTRAIT · 2025"],
  ["IMG_6880.avif", "Open Road", "JOURNEY · 2024"],
];

export default function Home() {
  return <main>
    <header><a className="brand" href="#top">YH<span>／</span>HDR</a><nav><a href="#works">作品</a><a href="#about">關於</a><a href="mailto:hello@example.com">聯絡</a></nav></header>
    <section id="top" className="hero">
      <img src="/photos/IMG_1921-1782316892674.avif" alt="HDR 攝影作品" />
      <div className="heroCopy"><p>YOUNG HUNG · PHOTOGRAPHY</p><h1>光，從不只有<br/><i>一種答案。</i></h1><a href="#works">觀看作品 <span>↓</span></a></div>
      <div className="index">SELECTED WORKS<br/>2024—2026</div>
    </section>
    <section className="intro"><p>一份關於光線、旅途與觀看方式的影像筆記。</p><h2>以 HDR 保存眼睛真正感受到的世界——不是更亮，而是更接近記憶。</h2></section>
    <section id="works" className="works">
      {works.map((w,i)=><article key={w[0]} className={i%3===1?"wide":""}><div className="photo"><img src={`/photos/${w[0]}`} alt={w[1]} loading="lazy"/><span>{String(i+1).padStart(2,"0")}</span></div><div className="caption"><h3>{w[1]}</h3><p>{w[2]}</p></div></article>)}
    </section>
    <section id="about" className="about"><p className="eyebrow">THE PHOTOGRAPHER</p><div><h2>Young Hung</h2><p>專注於 HDR 影像、旅行與城市風景。相信攝影不是複製眼前，而是誠實地留下當下的感受。</p></div><a href="mailto:hello@example.com">一起創作 ↗</a></section>
    <footer><span>© 2026 YOUNG HUNG</span><span>TAIWAN · AVAILABLE WORLDWIDE</span><a href="#top">回到頂端 ↑</a></footer>
  </main>
}
