import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-components";
import "./italy.css";
import "./hero-hdr.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "ITALIA — 義大利旅行相片紀錄",
  description: "沿著羅馬、聖吉米尼亞諾、托斯卡尼與威尼斯，以 10-bit AVIF 收藏義大利的光影、街道與慢速日常。",
};

const chapters = [
  { number: "01", place: "ROMA", zh: "羅馬", note: "石牆記得每一道斜陽" },
  { number: "02", place: "TOSCANA", zh: "托斯卡尼", note: "把時間交給蜿蜒的路" },
  { number: "03", place: "VENEZIA", zh: "威尼斯", note: "水面替城市保存黃昏" },
];

export default function ItalyPage() {
  return (
    <SiteFrame>
      <main className="italy-page">
        <section className="italy-hero" aria-labelledby="italy-title">
          <picture className="italy-hero-picture">
            <img
              src={`${BASE_PATH}/travel/italy/dolomites-panorama-wide-web.jpg`}
              alt="雲層之下的冬季 Dolomites 雪山全景"
            />
          </picture>
          <div
            className="italy-hero-wash"
            style={{ background: "linear-gradient(90deg, rgba(17,21,20,.7), rgba(17,21,20,.05) 64%), linear-gradient(0deg, rgba(15,18,17,.62), transparent 46%)" }}
          />
          <div className="italy-hero-copy">
            <p>DOLOMITES · ALTO ADIGE · INVERNO</p>
            <h1 id="italy-title">ITALIA</h1>
            <div className="italy-title-line"><span>46.5405° N</span><b>義大利旅行相片紀錄</b><span>11.6743° E</span></div>
            <div className="italy-hdr-format"><span className="italy-hdr-dot" />HDR PHOTOGRAPHY <i>·</i> DOLOMITES</div>
          </div>
          <a className="italy-scroll" href="#journal"><span>SCROLL TO WANDER</span><i /></a>
        </section>

        <section className="italy-opening" id="journal">
          <div className="italy-stamp" aria-hidden="true"><span>IT</span></div>
          <p className="italy-eyebrow">TRE CITTÀ · UNA LENTA ESTATE</p>
          <h2>有些地方不是抵達，<br /><em>是慢慢顯影。</em></h2>
          <div className="italy-opening-copy">
            <p>十二天，三座城市，一捲還沒拍完的夏天。這不是景點清單，而是光落在石牆上的角度、轉角傳來的咖啡香，和那些來不及命名的片刻。</p>
            <p>從羅馬的赭紅屋瓦一路往北，穿過托斯卡尼起伏的田野，最後在威尼斯的水道邊，等一扇窗亮起。</p>
          </div>
        </section>

        <nav className="italy-chapters" aria-label="義大利旅程章節">
          {chapters.map((chapter) => (
            <a href={`#${chapter.place.toLowerCase()}`} key={chapter.place}>
              <span>{chapter.number}</span><div><b>{chapter.place}</b><small>{chapter.zh} · {chapter.note}</small></div><i>↘</i>
            </a>
          ))}
        </nav>

        <section className="italy-chapter italy-rome" id="roma">
          <header><span>CAPITOLO 01 / ROMA</span><h2>永恆之城，<br />傍晚六點。</h2></header>
          <figure className="italy-wide-photo">
            <img src={`${BASE_PATH}/travel/italy/rome-hero.png`} alt="金色時刻的羅馬城市風景" />
            <figcaption><b>ROMA, LAZIO</b><span>FRAME 01 — 18:42</span></figcaption>
          </figure>
          <blockquote>「城市不急著解釋自己，<br />它只是讓光，一層一層地落下。」</blockquote>
        </section>

        <section className="italy-hdr-archive" aria-labelledby="italy-hdr-title">
          <header className="italy-hdr-intro">
            <div>
              <span className="italy-hdr-kicker">NUOVI FOTOGRAMMI / 10-BIT AVIF</span>
              <h2 id="italy-hdr-title">從城牆之上，<br />回到羅馬街心。</h2>
            </div>
            <p>從聖吉米尼亞諾風雨交界的塔樓開始，穿過羅馬、梵蒂岡與佛羅倫斯，在白色大理石、金色穹頂、街角櫥窗與午後逆光之間，重新走過旅程裡明暗最豐富的一段。</p>
          </header>

          <figure className="italy-hdr-lead">
            <img
              src={`${BASE_PATH}/travel/italy/san-gimignano-aerial-hdr.avif`}
              alt="暴雨雲下俯瞰聖吉米尼亞諾塔樓與托斯卡尼丘陵"
              loading="lazy"
              decoding="async"
            />
            <figcaption><b>SAN GIMIGNANO · TOSCANA</b><span>HDR FRAME 01 / 10-BIT AVIF</span></figcaption>
          </figure>

          <figure className="italy-hdr-group">
            <img
              src={`${BASE_PATH}/travel/italy/rome-pantheon-group-hdr.avif`}
              alt="旅伴在羅馬萬神殿前的團體合照"
              loading="lazy"
              decoding="async"
            />
            <figcaption><b>PANTHEON</b><span>ROMA / 02</span></figcaption>
          </figure>

          <div className="italy-hdr-rome-grid">
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-trevi-fountain-hdr.avif`}
                alt="羅馬特萊維噴泉正面雕像與水池全景"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>FONTANA DI TREVI</b><span>ROMA / 03</span></figcaption>
            </figure>
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-trevi-detail-hdr.avif`}
                alt="羅馬特萊維噴泉旁帶有天使雕像的街角聖龕"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>TREVI</b><span>04</span></figcaption>
            </figure>
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-salumeria-hdr.avif`}
                alt="羅馬熟食店櫥窗裡的火腿、起司與酒瓶"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>SALUMERIA</b><span>05</span></figcaption>
            </figure>
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-street-light-hdr.avif`}
                alt="午後逆光中的羅馬石板街道與同行旅人"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>VIA DI ROMA</b><span>06</span></figcaption>
            </figure>
          </div>

          <div className="italy-hdr-notes">
            <p><span>ROMA · MEZZOGIORNO</span>正午的光落在大理石上，亮部仍保留雕刻的層次；轉進巷裡，櫥窗反射、石板路與行人的影子又把城市拉回日常。</p>
          </div>

          <section className="italy-vatican-story" aria-labelledby="italy-vatican-title">
            <header>
              <span>SEQUENZA 02 / CITTÀ DEL VATICANO</span>
              <div>
                <h3 id="italy-vatican-title">金色穹頂下，<br />光有自己的秩序。</h3>
                <p>走進聖伯多祿大殿，尺度先消失，聲音才慢慢安靜下來。窗光穿過圓頂，落在青銅華蓋、石柱與長廊上；每一次抬頭，都像重新測量一次空間。</p>
              </div>
            </header>

            <figure className="italy-vatican-lead">
              <img
                src={`${BASE_PATH}/travel/italy/vatican-st-peters-baldachin-hdr.avif`}
                alt="聖伯多祿大殿金色圓頂與貝尼尼青銅華蓋"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>BASILICA DI SAN PIETRO</b><span>VATICANO / 07</span></figcaption>
            </figure>

            <div className="italy-vatican-details">
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-basilica-nave-hdr.avif`}
                  alt="聖伯多祿大殿高聳的大理石柱與金色長廊"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>NAVATA</b><span>08</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-basilica-chapel-hdr.avif`}
                  alt="聖伯多祿大殿側殿的壁畫、石柱與金色拱頂"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>CAPPELLA</b><span>09</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-basilica-dome-hdr.avif`}
                  alt="聖伯多祿大殿圓頂、雕像與青銅華蓋的仰視景觀"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>CUPOLA</b><span>10</span></figcaption>
              </figure>
            </div>

            <figure className="italy-vatican-exit">
              <img
                src={`${BASE_PATH}/travel/italy/vatican-via-della-conciliazione-hdr.avif`}
                alt="陰雲下從協和大道望向聖伯多祿大殿圓頂"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>VIA DELLA CONCILIAZIONE</b><span>USCITA / 11</span></figcaption>
            </figure>
          </section>

          <section className="italy-between-cities" aria-labelledby="italy-between-title">
            <header>
              <span>SEQUENZA 03 / LAZIO · FIRENZE · ROMA</span>
              <h3 id="italy-between-title">城與城之間，<br />路把記憶接起來。</h3>
            </header>

            <div className="italy-city-landmarks">
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/civita-di-bagnoregio-hdr.avif`}
                  alt="山谷與惡地地形之上的白露里治奧古城及長橋"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>CIVITA DI BAGNOREGIO · LAZIO</b><span>12</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/florence-duomo-aerial-hdr.avif`}
                  alt="俯瞰佛羅倫斯聖母百花大教堂圓頂與城市屋頂"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>DUOMO DI FIRENZE</b><span>13</span></figcaption>
              </figure>
            </div>

            <div className="italy-central-sequence">
              <figure className="italy-civita-bridge">
                <img
                  src={`${BASE_PATH}/travel/italy/civita-bridge-approach-hdr.avif`}
                  alt="從長橋正面走向山巔上的白露里治奧古城"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>PONTE DI CIVITA</b><span>LAZIO / 14</span></figcaption>
              </figure>

              <div className="italy-civita-moments">
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/civita-street-walk-hdr.avif`}
                    alt="旅伴走在白露里治奧古城的石板街巷"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>VIA DI CIVITA</b><span>15</span></figcaption>
                </figure>
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/civita-couple-viewpoint-hdr.avif`}
                    alt="旅伴在白露里治奧觀景處與山巔古城合照"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>BELVEDERE DI CIVITA</b><span>16</span></figcaption>
                </figure>
              </div>

              <div className="italy-art-cities">
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/siena-cathedral-couple-hdr.avif`}
                    alt="旅伴在錫耶納主教座堂哥德式立面前合照"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>DUOMO DI SIENA</b><span>TOSCANA / 17</span></figcaption>
                </figure>
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/florence-uffizi-tribuna-hdr.avif`}
                    alt="佛羅倫斯烏菲茲美術館八角形展廳內的雕塑與畫作"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>TRIBUNA DEGLI UFFIZI</b><span>FIRENZE / 18</span></figcaption>
                </figure>
              </div>
            </div>

            <div className="italy-rome-coda">
              <div className="italy-rome-coda-copy">
                <span>ULTIMI FOTOGRAMMI / ROMA</span>
                <p>一杯啤酒、一起走路的人、排隊穿過古蹟的午後，最後都成為旅程的尺度。</p>
              </div>
              <figure className="italy-rome-bar">
                <img
                  src={`${BASE_PATH}/travel/italy/rome-porretti-bar-hdr.avif`}
                  alt="羅馬酒吧裡排列整齊的啤酒龍頭與倒掛酒杯"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>BIRRIFICIO ANGELO PORETTI</b><span>19</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-travel-companions-hdr.avif`}
                  alt="同行旅人在羅馬街頭迎著陽光步行"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>COMPAGNI DI VIAGGIO</b><span>20</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-arch-of-constantine-hdr.avif`}
                  alt="從高處俯瞰羅馬君士坦丁凱旋門與廣場人群"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>ARCO DI COSTANTINO</b><span>21</span></figcaption>
              </figure>
              <figure className="italy-colosseum-frame">
                <img
                  src={`${BASE_PATH}/travel/italy/rome-colosseum-interior-hdr.avif`}
                  alt="積雲天空下的羅馬競技場內部全景"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>COLOSSEO</b><span>22 / FINE RULLINO</span></figcaption>
              </figure>
            </div>
          </section>
        </section>

        <section className="italy-chapter italy-tuscany" id="toscana">
          <div className="italy-section-copy"><span>CAPITOLO 02 / TOSCANA</span><h2>走進地圖<br />沒有標記的地方。</h2><p>清晨的道路只有柏樹知道方向。車窗外的山丘像呼吸一樣起伏，時間在這裡不再用分鐘計算，而是用影子的長度。</p></div>
          <figure className="italy-feature-photo">
            <img src={`${BASE_PATH}/travel/italy/tuscany-road.png`} alt="托斯卡尼清晨的柏樹與蜿蜒道路" />
            <figcaption><b>VAL D'ORCIA</b><span>FRAME 18 — 06:17</span></figcaption>
          </figure>
          <aside className="italy-margin-note"><small>NOTE 07</small><p>在 Pienza 之前停下。沒有觀景台，只有風和遠方剛醒來的農舍。</p></aside>
        </section>

        <section className="italy-chapter italy-venice" id="venezia">
          <figure className="italy-portrait-photo">
            <img src={`${BASE_PATH}/travel/italy/venice-canal.png`} alt="藍色時刻的威尼斯小運河" />
            <figcaption><b>VENEZIA</b><span>FRAME 32 — 20:51</span></figcaption>
          </figure>
          <div className="italy-section-copy"><span>CAPITOLO 03 / VENEZIA</span><h2>迷路，是這座城<br />最好的路線。</h2><p>離開人聲之後，水道收起白天的喧鬧。木船輕輕碰著岸，一扇窗亮了，又一扇。威尼斯真正的方向，藏在倒影裡。</p><div className="italy-place-list"><span>CASTELLO</span><span>CANNAREGIO</span><span>DORSODURO</span></div></div>
        </section>

        <section className="italy-contact-sheet">
          <div><small>ROLL 01 / 36 EXPOSURES</small><h2>光走過以後，<br />照片留下來。</h2></div>
          <div className="italy-film-strip" aria-label="義大利旅程照片精選">
            <figure><img src={`${BASE_PATH}/travel/italy/rome-hero.png`} alt="羅馬夕陽" /><span>01A</span></figure>
            <figure><img src={`${BASE_PATH}/travel/italy/tuscany-road.png`} alt="托斯卡尼道路" /><span>18A</span></figure>
            <figure><img src={`${BASE_PATH}/travel/italy/venice-canal.png`} alt="威尼斯運河" /><span>32A</span></figure>
          </div>
          <a href={`${BASE_PATH}/travel/`}>回到所有旅程 <span>→</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
