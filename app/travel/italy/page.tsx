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
  { number: "01", id: "roma", place: "ROME", zh: "羅馬", note: "石牆記得每一道斜陽" },
  { number: "02", id: "toscana", place: "TUSCANY", zh: "托斯卡尼", note: "把時間交給蜿蜒的路" },
  { number: "03", id: "venezia", place: "VENICE", zh: "威尼斯", note: "水面替城市保存黃昏" },
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
            <p>DOLOMITES · SOUTH TYROL · ITALY</p>
            <h1 id="italy-title">ITALIA</h1>
            <div className="italy-title-line"><span>46.5405° N</span><b>義大利旅行相片紀錄</b><span>11.6743° E</span></div>
            <div className="italy-hdr-format"><span className="italy-hdr-dot" />HDR PHOTOGRAPHY <i>·</i> DOLOMITES</div>
          </div>
          <a className="italy-scroll" href="#journal"><span>SCROLL TO WANDER</span><i /></a>
        </section>

        <section className="italy-opening" id="journal">
          <header className="italy-prologue-head">
            <p className="italy-eyebrow">PROLOGO / ROMA TERMINI / 07:00</p>
            <h2>Generazione mille euro</h2>
            <p>某種程度上，這就是義大利版的 22K 世代。受過教育、進入職場，每個月卻只能領到一千歐元。一個薪資數字，最後成了一整代人的名字。</p>
          </header>

          <div className="italy-prologue-body">
            <p>我們對義大利的第一個印象，卻不是這些社會問題，而是羅馬車站裡幾雙毫不避諱的眼睛。</p>
            <p>從機場搭車抵達羅馬，時間才早上七點。黃皮膚的一大群人，拖著大大小小的行李，大剌剌地站在車站裡重新整理。有人清點背包，有人翻找車票，有人忙著確認下一段路線。以旁人的眼光看來，我們大概就是一排長了腳、會移動的錢包。</p>
            <p>原本以為時間還早，城市尚未完全醒來，應該不至於有什麼問題。實際上，每個人的身體早已比嘴巴誠實：背包轉到胸前，行李拉到兩腿之間，視線不斷掃過四周。沒有人說破，但我們已經擺出了防衛姿態。</p>
            <p className="italy-prologue-beat">不遠處的幾個人一直看著我們。</p>
            <p>那不是偶然對上眼後便移開的目光。他們沒有假裝看手機，也沒有被發現後的尷尬。視線只是安靜地在我們、背包和行李之間來回，像是在等待其中一個人鬆手。</p>
            <p>我們甚至想起出發前聽過的那些警告，猜測他們會不會就是傳聞裡專門在車站物色旅客的人。至於他們究竟是誰，其實沒有人知道。唯一可以確定的是，他們並不害怕我們發現。</p>
            <p className="italy-prologue-beat">這反而最令人不安。</p>
            <p>整理完行李，我們迅速離開車站。沒有人真的追上來，也沒有東西在那一刻被偷走，但從那幾雙眼睛開始，所有人都學會了在羅馬走路時，留一隻手給自己的背包。</p>
            <p>走出車站，行李箱的輪子隨即撞上羅馬的千年石板路。原本想像的是晨光、古城與悠閒散步，現實卻是輪子不斷卡進縫隙，整個行李箱在身後劇烈顛簸。</p>
            <div className="italy-prologue-ending">
              <p>羅馬沒有先用競技場或教堂迎接我們。</p>
              <p>它先教我們看好自己的行李。</p>
              <p>而拖著行李走在千年石板路上，所謂的浪漫，也就這樣一路被震散了。</p>
            </div>
          </div>
        </section>

        <nav className="italy-chapters" aria-label="義大利旅程章節">
          {chapters.map((chapter) => (
            <a href={`#${chapter.id}`} key={chapter.id}>
              <span>{chapter.number}</span><div><b>{chapter.place}</b><small>{chapter.zh} · {chapter.note}</small></div><i>↘</i>
            </a>
          ))}
        </nav>

        <section className="italy-hdr-archive" id="roma" aria-labelledby="italy-hdr-title">
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
            <figcaption><b>SAN GIMIGNANO · TUSCANY</b><span>HDR FRAME 01 / 10-BIT AVIF</span></figcaption>
          </figure>

          <figure className="italy-hdr-group">
            <img
              src={`${BASE_PATH}/travel/italy/rome-pantheon-group-hdr.avif`}
              alt="旅伴在羅馬萬神殿前的團體合照"
              loading="lazy"
              decoding="async"
            />
            <figcaption><b>PANTHEON</b><span>ROME / 02</span></figcaption>
          </figure>

          <div className="italy-hdr-rome-grid">
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-trevi-fountain-hdr.avif`}
                alt="羅馬特萊維噴泉正面雕像與水池全景"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>TREVI FOUNTAIN</b><span>ROME / 03</span></figcaption>
            </figure>
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-trevi-detail-hdr.avif`}
                alt="羅馬特萊維噴泉旁帶有天使雕像的街角聖龕"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>TREVI DETAIL</b><span>04</span></figcaption>
            </figure>
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-salumeria-hdr.avif`}
                alt="羅馬熟食店櫥窗裡的火腿、起司與酒瓶"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>ROME DELI</b><span>05</span></figcaption>
            </figure>
            <figure>
              <img
                src={`${BASE_PATH}/travel/italy/rome-street-light-hdr.avif`}
                alt="午後逆光中的羅馬石板街道與同行旅人"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>ROME STREET</b><span>06</span></figcaption>
            </figure>
          </div>

          <div className="italy-hdr-notes">
            <p><span>ROME · MIDDAY</span>正午的光落在大理石上，亮部仍保留雕刻的層次；轉進巷裡，櫥窗反射、石板路與行人的影子又把城市拉回日常。</p>
          </div>

          <section className="italy-rome-ruins" aria-labelledby="italy-rome-ruins-title">
            <header>
              <span>SEQUENCE 02 / ANCIENT ROME</span>
              <div>
                <h3 id="italy-rome-ruins-title">穿過古羅馬，<br />一路走向梵蒂岡。</h3>
                <p>競技場外的人潮還沒散去，古羅馬廣場的殘牆已經在雲影下安靜下來。沿著石板路繼續走，聖天使堡與博物館的旋梯，把視線從城市帶進建築內部。</p>
              </div>
            </header>

            <figure className="italy-rome-ruins-lead">
              <img
                src={`${BASE_PATH}/travel/italy/rome-colosseum-exterior-hdr.avif`}
                alt="積雲天空下的羅馬競技場外牆與街道人群"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>COLOSSEUM</b><span>ANCIENT ROME</span></figcaption>
            </figure>

            <figure className="italy-forum-panorama">
              <img
                src={`${BASE_PATH}/travel/italy/rome-forum-panorama-hdr.avif`}
                alt="從高處俯瞰古羅馬廣場遺跡與城市天際線"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>ROMAN FORUM</b><span>PANORAMA</span></figcaption>
            </figure>

            <div className="italy-rome-ruins-pair">
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-palatine-hill-hdr.avif`}
                  alt="帕拉提諾山古蹟、拱門與階梯花園"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>PALATINE HILL</b><span>ROME</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-basilica-maxentius-hdr.avif`}
                  alt="古羅馬廣場與馬克森提烏斯巴西利卡遺跡全景"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>BASILICA OF MAXENTIUS</b><span>ROME</span></figcaption>
              </figure>
            </div>

            <article className="italy-hunger-note">
              <header>
                <span>ROME / VATICAN CITY / ONE DAY</span>
                <h4>午餐消失之後</h4>
              </header>
              <div>
                <p>把羅馬和梵蒂岡排進同一天，行程緊得幾乎抽不出空。原本應該出現的午餐，就在不斷趕路之間消失了。</p>
                <p>走到聖天使堡時，大家已經餓得沒有心情再討論下一站。或許是真的被空著肚子趕行程嚇怕了，一看到路邊有人賣熱狗堡，整團人幾乎沒有猶豫，先買一個填肚子再說。</p>
                <p>那個熱狗堡不是下午茶，也不是旅行中特別安排的美食，比較像是讓所有人安全撐到晚餐的補給品。</p>
                <p>只是到了晚上，肚子依然很餓，餐廳上菜又特別慢。每次有人從廚房方向走過來，全桌都以為終於輪到我們，結果端去的永遠是別桌。</p>
                <p>午餐沒有吃到，晚餐遲遲沒有上桌。回頭看，那個站在聖天使堡旁匆忙吃完的熱狗堡，可能才是當天最重要的一餐。</p>
              </div>
            </article>

            <div className="italy-rome-transition-pair">
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-ponte-sant-angelo-hdr.avif`}
                  alt="旅伴站在聖天使橋上，背後是聖天使堡與橋側雕像"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>SANT&apos;ANGELO BRIDGE</b><span>ROME</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-momo-staircase-hdr.avif`}
                  alt="從高處俯瞰梵蒂岡博物館莫莫雙螺旋階梯與遊客"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>MOMO STAIRCASE</b><span>VATICAN MUSEUMS</span></figcaption>
              </figure>
            </div>
          </section>

          <section className="italy-vatican-story" aria-labelledby="italy-vatican-title">
            <header>
              <span>SEQUENCE 03 / VATICAN CITY</span>
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
              <figcaption><b>ST. PETER&apos;S BASILICA</b><span>VATICAN / 07</span></figcaption>
            </figure>

            <div className="italy-vatican-details">
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-basilica-nave-hdr.avif`}
                  alt="聖伯多祿大殿高聳的大理石柱與金色長廊"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>NAVE</b><span>08</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-basilica-chapel-hdr.avif`}
                  alt="聖伯多祿大殿側殿的壁畫、石柱與金色拱頂"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>CHAPEL</b><span>09</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/vatican-basilica-dome-hdr.avif`}
                  alt="聖伯多祿大殿圓頂、雕像與青銅華蓋的仰視景觀"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>DOME</b><span>10</span></figcaption>
              </figure>
            </div>

            <figure className="italy-vatican-exit">
              <img
                src={`${BASE_PATH}/travel/italy/vatican-via-della-conciliazione-hdr.avif`}
                alt="陰雲下從協和大道望向聖伯多祿大殿圓頂"
                loading="lazy"
                decoding="async"
              />
              <figcaption><b>VIA DELLA CONCILIAZIONE</b><span>EXIT / 11</span></figcaption>
            </figure>
          </section>

          <section className="italy-between-cities" aria-labelledby="italy-between-title">
            <header>
              <span>SEQUENCE 04 / LAZIO · FLORENCE · ROME</span>
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
                <figcaption><b>FLORENCE CATHEDRAL</b><span>13</span></figcaption>
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
                <figcaption><b>CIVITA BRIDGE</b><span>LAZIO / 14</span></figcaption>
              </figure>

              <div className="italy-civita-moments">
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/civita-street-walk-hdr.avif`}
                    alt="旅伴走在白露里治奧古城的石板街巷"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>CIVITA STREET</b><span>15</span></figcaption>
                </figure>
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/civita-couple-viewpoint-hdr.avif`}
                    alt="旅伴在白露里治奧觀景處與山巔古城合照"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>CIVITA VIEWPOINT</b><span>16</span></figcaption>
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
                  <figcaption><b>SIENA CATHEDRAL</b><span>TUSCANY / 17</span></figcaption>
                </figure>
                <figure>
                  <img
                    src={`${BASE_PATH}/travel/italy/florence-uffizi-tribuna-hdr.avif`}
                    alt="佛羅倫斯烏菲茲美術館八角形展廳內的雕塑與畫作"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption><b>UFFIZI TRIBUNA</b><span>FLORENCE / 18</span></figcaption>
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
                <figcaption><b>PORETTI BAR</b><span>19</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-travel-companions-hdr.avif`}
                  alt="同行旅人在羅馬街頭迎著陽光步行"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>TRAVEL COMPANIONS</b><span>20</span></figcaption>
              </figure>
              <figure>
                <img
                  src={`${BASE_PATH}/travel/italy/rome-arch-of-constantine-hdr.avif`}
                  alt="從高處俯瞰羅馬君士坦丁凱旋門與廣場人群"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>ARCH OF CONSTANTINE</b><span>21</span></figcaption>
              </figure>
              <figure className="italy-colosseum-frame">
                <img
                  src={`${BASE_PATH}/travel/italy/rome-colosseum-interior-hdr.avif`}
                  alt="積雲天空下的羅馬競技場內部全景"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption><b>COLOSSEUM</b><span>22 / END OF ROLL</span></figcaption>
              </figure>
            </div>
          </section>
        </section>

        <section className="italy-chapter italy-tuscany" id="toscana">
          <div className="italy-section-copy"><span>CHAPTER 02 / TUSCANY</span><h2>走進地圖<br />沒有標記的地方。</h2><p>清晨的道路只有柏樹知道方向。車窗外的山丘像呼吸一樣起伏，時間在這裡不再用分鐘計算，而是用影子的長度。</p></div>
          <figure className="italy-feature-photo">
            <img src={`${BASE_PATH}/travel/italy/tuscany-road.png`} alt="托斯卡尼清晨的柏樹與蜿蜒道路" />
            <figcaption><b>VAL D'ORCIA</b><span>FRAME 18 — 06:17</span></figcaption>
          </figure>
          <aside className="italy-margin-note"><small>NOTE 07</small><p>在 Pienza 之前停下。沒有觀景台，只有風和遠方剛醒來的農舍。</p></aside>
        </section>

        <section className="italy-chapter italy-venice" id="venezia">
          <figure className="italy-portrait-photo">
            <img src={`${BASE_PATH}/travel/italy/venice-canal.png`} alt="藍色時刻的威尼斯小運河" />
            <figcaption><b>VENICE</b><span>FRAME 32 — 20:51</span></figcaption>
          </figure>
          <div className="italy-section-copy"><span>CHAPTER 03 / VENICE</span><h2>迷路，是這座城<br />最好的路線。</h2><p>離開人聲之後，水道收起白天的喧鬧。木船輕輕碰著岸，一扇窗亮了，又一扇。威尼斯真正的方向，藏在倒影裡。</p><div className="italy-place-list"><span>CASTELLO</span><span>CANNAREGIO</span><span>DORSODURO</span></div></div>
        </section>

        <section className="italy-contact-sheet">
          <div><small>ROLL 01 / 36 EXPOSURES</small><h2>光走過以後，<br />照片留下來。</h2></div>
          <div className="italy-film-strip" aria-label="義大利旅程照片精選">
            <figure><img src={`${BASE_PATH}/travel/italy/tuscany-road.png`} alt="托斯卡尼道路" /><span>18A</span></figure>
            <figure><img src={`${BASE_PATH}/travel/italy/venice-canal.png`} alt="威尼斯運河" /><span>32A</span></figure>
          </div>
          <a href={`${BASE_PATH}/travel/`}>回到所有旅程 <span>→</span></a>
        </section>
      </main>
    </SiteFrame>
  );
}
