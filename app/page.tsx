import { copy } from "@/lib/copy";
import { getFeaturedHeroImage, getFilmItems, getMusicItems, getPhotographyItems, getPhotoComparisons, photoSrc } from "@/lib/site-data";
import { FilmGrid, Hero, PhotoMasonry, SectionHeader, SiteFrame, TextPanel } from "@/components/site-components";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { JsonLd } from "@/components/json-ld";
import { absUrl } from "@/lib/url";

export default function HomePage() {
  const heroImage = getFeaturedHeroImage();
  const { homepage } = getPhotographyItems();
  const films = getFilmItems();
  const music = getMusicItems();
  const comparisons = getPhotoComparisons().filter((p) => p.sdrSrc);

  return (
    <SiteFrame music={music}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Young HDR Gallery",
              url: absUrl("/"),
              description:
                "探索 HDR 旅行、重機與科技影片，以及免費 HDR 顯示器測試工具。",
              inLanguage: "zh-Hant",
            },
            {
              "@type": "Person",
              name: "Young Hung",
              url: absUrl("/about/"),
              jobTitle: "HDR Photographer & Imaging Workflow Explorer",
              description:
                "專注於 HDR Photography、HDR Imaging Workflow、旅行與風景攝影。",
            },
          ],
        }}
      />
      <Hero image={heroImage} alt="Young Hung HDR Studio 首頁主視覺" />

      <TextPanel>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{copy.home.rangeTitle}</p>
        <h2 className="mt-3 text-3xl font-semibold text-pearl">{copy.home.rangeTitleZh}</h2>
        <p className="mt-6 text-base leading-8 text-mist">{copy.home.rangeSubtitleZh}</p>
        <p className="mt-2 text-sm leading-7 text-mist/70">{copy.home.rangeSubtitle}</p>
      </TextPanel>

      {comparisons.length > 0 ? (
        <section className="px-5 pb-8 pt-8 lg:px-8">
          <div className="mx-auto w-full max-w-5xl space-y-10 lg:w-2/3 lg:max-w-none">
            {comparisons.map((photo) => (
              <div key={photo.src}>
                <BeforeAfterSlider
                  beforeSrc={photoSrc({ ...photo, src: photo.sdrSrc!, fullSrc: photo.sdrSrc! })}
                  afterSrc={photoSrc(photo)}
                  afterFallbackSrc={photoSrc({ ...photo, src: photo.sdrSrc!, fullSrc: photo.sdrSrc! })}
                  alt={photo.title || "HDR comparison"}
                />
                {photo.title ? (
                  <h3 className="mt-3 text-center text-lg font-semibold text-pearl">{photo.title}</h3>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-5 py-24 lg:px-8">
        <SectionHeader
          eyebrow="Selected Works"
          title={copy.home.selectedTitle}
          titleZh={copy.home.selectedTitleZh}
          subtitle={copy.home.selectedSubtitle}
          subtitleZh={copy.home.selectedSubtitleZh}
        />
        <PhotoMasonry photos={homepage.slice(0, 9)} mode="link" linkHref="/photography" />
      </section>
      {films.length ? (
        <section className="px-5 py-24 lg:px-8">
          <SectionHeader
            eyebrow="HDR Films"
            title={copy.films.gridTitle}
            titleZh={copy.films.gridTitleZh}
            subtitle={copy.films.gridSubtitle}
            subtitleZh={copy.films.gridSubtitleZh}
          />
          <FilmGrid films={films.slice(0, 2)} />
        </section>
      ) : null}
    </SiteFrame>
  );
}
