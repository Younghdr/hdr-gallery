import type { Metadata } from "next";
import "./destinations.css";
import "./destination-mobile.css";
import "./unified-cards.css";
import "./sweden-card.css";
import "./intro-layout.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Travel Expeditions｜攝影旅程",
  description: "Young HDR Gallery 的旅行攝影專題，從納米比亞沙漠、加拿大北境到玻利維亞高原，以 HDR 影像與文字記錄每段旅程。",
  alternates: { canonical: "/travel/" },
};

export default function TravelPage() {
  return (
    <main className="destinations-page">
      <header className="destinations-nav">
        <a href={`${BASE_PATH}/`} className="destinations-mark"><span>YH</span><b>EXPEDITIONS</b></a>
        <nav className="destinations-country-nav" aria-label="國家旅程快速連結">
          <span>COUNTRIES</span>
          <a href={`${BASE_PATH}/travel/namibia/`}>NA</a>
          <a href={`${BASE_PATH}/travel/canada/`}>CA</a>
          <a href={`${BASE_PATH}/travel/italy/`}>IT</a>
          <a href={`${BASE_PATH}/travel/iceland/`}>IS</a>
          <a href={`${BASE_PATH}/travel/Bolivia/`}>BO</a>
          <a href={`${BASE_PATH}/travel/turkiye/`}>TR</a>
          <a href={`${BASE_PATH}/travel/peru/`}>PE</a>
          <a href={`${BASE_PATH}/travel/montenegro/`}>ME</a>
          <a href={`${BASE_PATH}/travel/slovenia/`}>SI</a>
          <a href={`${BASE_PATH}/travel/koh-samui/`}>TH</a>
          <a href={`${BASE_PATH}/travel/australia/`}>AU</a>
          <a href={`${BASE_PATH}/travel/croatia/`}>HR</a>
          <a href={`${BASE_PATH}/travel/finland/`}>FI</a>
          <a href={`${BASE_PATH}/travel/tokyo/`}>JP</a>
          <a href={`${BASE_PATH}/travel/norway/`}>NO</a>
          <a href={`${BASE_PATH}/travel/denmark/`}>DK</a>
          <a href={`${BASE_PATH}/travel/sweden/`}>SE</a>
          <a href={`${BASE_PATH}/travel/bali/`}>ID</a>
          <a href={`${BASE_PATH}/travel/cebu/`}>PH</a>
          <a href={`${BASE_PATH}/travel/chile/`}>CL</a>
          <a href={`${BASE_PATH}/travel/chiang-mai/`}>CNX</a>
          <a href={`${BASE_PATH}/travel/hong-kong-macau/`}>HKM</a>
          <a href={`${BASE_PATH}/travel/germany-switzerland-france/`}>ALP</a>
        </nav>
        <a href={`${BASE_PATH}/photography/`}>PHOTOGRAPHY ↗</a>
      </header>

      <section className="destinations-intro">
        <div className="destinations-intro-meta">
          <p>TRAVEL ARCHIVE</p>
          <span>22 JOURNEYS</span>
        </div>
        <h1>每一個國家，都有自己的<em>光。</em></h1>
        <p className="destinations-intro-copy">從乾燥的南方沙漠，到北緯 62 度的夜空。選擇一段旅程，繼續往下走。</p>
      </section>

      <section className="destination-grid" aria-label="國家旅程">
        <a className="destination-card namibia" href={`${BASE_PATH}/travel/namibia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/namibia-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 01</small><h2>NAMIBIA</h2><p>INTO THE WILD</p><b>循著沙丘座標出發</b></div>
          <i>AFRICA / NAMIB</i>
        </a>
        <a className="destination-card canada" href={`${BASE_PATH}/travel/canada/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/canada/hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 02</small><h2>CANADA</h2><p>CHASING THE NORTHERN LIGHTS</p><b>等待下一道極光</b></div>
          <i>NORTH AMERICA / AURORA</i>
        </a>
        <a className="destination-card iceland" href={`${BASE_PATH}/travel/iceland/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/iceland/iceland-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 03</small><h2>ICELAND</h2><p>THE LIVING EARTH</p><b>踏上火與冰的裂縫</b></div>
          <i>NORDIC / SOUTH COAST</i>
        </a>
        <a className="destination-card montenegro" href={`${BASE_PATH}/travel/montenegro/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/montenegro/20170073-hero.avif')`, backgroundPosition: "center 47%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 04</small><h2>MONTENEGRO</h2><p>BETWEEN SEA AND STONE</p><b>打開蒙特內哥羅公路圖誌</b></div>
          <i>EUROPE / ADRIATIC</i>
        </a>
        <a className="destination-card australia" href={`${BASE_PATH}/travel/australia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/australia/natural-bridge-glowworms.png')`, backgroundPosition: "center 44%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 05</small><h2>AUSTRALIA</h2><p>SPRINGBROOK AFTER DARK</p><b>瀑布落進螢火星河</b></div>
          <i>SYDNEY / GOLD COAST</i>
        </a>
        <a className="destination-card koh-samui" href={`${BASE_PATH}/travel/koh-samui/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/koh-samui-original.avif')`, backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 06</small><h2>KOH SAMUI</h2><p>BETWEEN THE TIDES</p><b>潮汐讓時間慢下來</b></div>
          <i>THAILAND / GULF COAST</i>
        </a>
        <a className="destination-card finland" href={`${BASE_PATH}/travel/finland/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/finland/helsinki-cathedral.avif')`, backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 07</small><h2>FINLAND</h2><p>A STUDY OF WINTER LIGHT</p><b>在白色之間，讀一座城市</b></div>
          <i>NORDIC / HELSINKI</i>
        </a>
        <a className="destination-card italy" href={`${BASE_PATH}/travel/italy/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/italy/dolomites-panorama-wide-web.jpg')`, backgroundPosition: "center 42%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 08</small><h2>ITALIA</h2><p>LIGHT ACROSS ITALY</p><b>OPEN THE ITALY JOURNAL</b></div>
          <i>EUROPE / ITALY</i>
        </a>
        <a className="destination-card bolivia" href={`${BASE_PATH}/travel/Bolivia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/bolivia/salar-hero.png')` }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 09</small><h2>BOLIVIA</h2><p>THE ALTIPLANO</p><b>升上海拔 3,656 米</b></div>
          <i>SOUTH AMERICA / UYUNI</i>
        </a>
        <a className="destination-card turkiye" href={`${BASE_PATH}/travel/turkiye/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/turkiye/cappadocia-sunrise.png')`, backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 10</small><h2>TÜRKIYE</h2><p>BETWEEN TWO CONTINENTS</p><b>穿過兩洲之門</b></div>
          <i>EURASIA / CAPPADOCIA</i>
        </a>
        <a className="destination-card peru" href={`${BASE_PATH}/travel/peru/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/peru/machu-picchu-authored-card-wide.webp')`, backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 11</small><h2>PERU</h2><p>ABOVE THE CLOUDS</p><b>沿著安地斯山脈向上</b></div>
          <i>SOUTH AMERICA / ANDES</i>
        </a>
        <a className="destination-card slovenia" href={`${BASE_PATH}/travel/slovenia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/slovenia/lake-bled-hero.png')`, backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 12</small><h2>SLOVENIA</h2><p>BETWEEN ALPS AND ADRIATIC</p><b>走進湖光與群峰之間</b></div>
          <i>EUROPE / JULIAN ALPS</i>
        </a>
        <a className="destination-card croatia" href={`${BASE_PATH}/travel/croatia/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/croatia/dubrovnik-hero.png')`, backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 13</small><h2>CROATIA</h2><p>THE ADRIATIC LOGBOOK</p><b>沿著海風，駛入石城與群島</b></div>
          <i>EUROPE / DALMATIA</i>
        </a>
        <a className="destination-card tokyo" href={`${BASE_PATH}/travel/tokyo/`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2400&q=88')", backgroundPosition: "center 58%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 14</small><h2>TOKYO</h2><p>BETWEEN NEON AND STILLNESS</p><b>東京｜霓虹與靜謐之間</b></div>
          <i>JAPAN / KANTŌ</i>
        </a>
        <a className="destination-card norway" href={`${BASE_PATH}/travel/norway/`} style={{ backgroundImage: "url('https://res.cloudinary.com/fjordtours/image/upload/w_auto/dpr_auto/c_fill/f_auto/q_auto/c_limit,w_2400/v1/norway/places-to-visit/western-norway/gudvangen/plan-your-trip/naeroyfjord')", backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 15</small><h2>NORWAY</h2><p>NORWAY IN A NUTSHELL</p><b>一張票穿越峽灣與山谷</b></div>
          <i>FJORD NORWAY / FLÅM</i>
        </a>
        <a className="destination-card denmark" href={`${BASE_PATH}/travel/denmark/`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=2400&q=90')", backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 16</small><h2>DENMARK</h2><p>DESIGNED FOR LIVING</p><b>把日常過成設計</b></div>
          <i>NORDIC / COPENHAGEN</i>
        </a>
        <a className="destination-card bali" href={`${BASE_PATH}/travel/bali/`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=2400&q=90')", backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 17</small><h2>BALI</h2><p>BETWEEN VOLCANO &amp; TIDE</p><b>在火山與潮汐之間</b></div>
          <i>INDONESIA / ISLAND OF GODS</i>
        </a>
        <a className="destination-card cebu" href={`${BASE_PATH}/travel/cebu/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/cebu/bohol-chocolate-hills-hero.png')`, backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 18</small><h2>CEBU</h2><p>CITY, HIGHLANDS &amp; SEA</p><b>從老城走向薄荷色海峽</b></div>
          <i>PHILIPPINES / VISAYAS</i>
        </a>
        <a className="destination-card chiang-mai" href={`${BASE_PATH}/travel/chiang-mai/`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2400&q=90')", backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 19</small><h2>CHIANG MAI</h2><p>MORNINGS IN THE NORTH</p><b>沿著晨霧，慢行北方山城</b></div>
          <i>THAILAND / LANNA</i>
        </a>
        <a className="destination-card chile" href={`${BASE_PATH}/travel/chile/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/chile/licancabur-hero.jpg')`, backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 20</small><h2>CHILE</h2><p>ATACAMA AFTER DARK</p><b>沙漠小鎮、星星團與南美富士山</b></div>
          <i>NORTE GRANDE / ATACAMA</i>
        </a>
        <a className="destination-card sweden" href={`${BASE_PATH}/travel/sweden/`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=2400&q=90')", backgroundPosition: "center 52%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 21</small><h2>SWEDEN</h2><p>THE CITY FLOWS OUT TO SEA</p><b>沿著水面，讀一座城市。</b></div>
          <i>NORDIC / STOCKHOLM</i>
        </a>
        <a className="destination-card alpine-dispatch-card" href={`${BASE_PATH}/travel/germany-switzerland-france/`} style={{ backgroundImage: `url('${BASE_PATH}/travel/germany-switzerland-france/alpine-hero-sunlit.png')`, backgroundPosition: "center 48%" }}>
          <span className="card-shade" />
          <div><small>EXPEDITION 22</small><h2>ALPINE ROUTE</h2><p>ACROSS THE ALPS BY RAIL</p><b>鐵道帶你穿越阿爾卑斯山</b></div>
          <i>GERMANY / FRANCE / SWITZERLAND</i>
        </a>
        <a className="harbour-passage" href={`${BASE_PATH}/travel/hong-kong-macau/`} aria-label="閱讀香港與澳門雙城旅誌">
          <div className="passage-photo passage-hk" style={{ backgroundImage: `url('${BASE_PATH}/travel/hong-kong-macau/hong-kong-harbour.png')` }}><span>HONG KONG · 22:14</span></div>
          <div className="passage-ticket"><small>NEW JOURNEY / 021</small><p>55 KM ACROSS THE PEARL RIVER ESTUARY</p><h2><span>香港</span><i>⇄</i><span>澳門</span></h2><b>一張船票，兩種城市速度 <em>↗</em></b></div>
          <div className="passage-photo passage-mo" style={{ backgroundImage: `url('${BASE_PATH}/travel/hong-kong-macau/macau-old-town.png')` }}><span>MACAU · 06:42</span></div>
        </a>
      </section>

      <footer className="destinations-footer"><p>YOUNG HUNG HDR STUDIO</p><span>TRAVEL · LIGHT · MEMORY</span></footer>
    </main>
  );
}
