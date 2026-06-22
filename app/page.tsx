import { copy } from "@/lib/copy";
import { getFeaturedHeroImage, getFilmItems, getMusicItems, getPhotographyItems } from "@/lib/site-data";
import { FilmGrid, Hero, PhotoMasonry, SectionHeader, SiteFrame, TextPanel } from "@/components/site-components";

export default function HomePage() {
  const heroImage = getFeaturedHeroImage();
  const { homepage } = getPhotographyItems();
  const films = getFilmItems();
  const music = getMusicItems();

  return (
    <SiteFrame music={music}>
      <Hero image={heroImage} />
      <section className="px-5 py-24 lg:px-8">
        <SectionHeader
          eyebrow="Selected Works"
          title={copy.home.selectedTitle}
          titleZh={copy.home.selectedTitleZh}
          subtitle={copy.home.selectedSubtitle}
          subtitleZh={copy.home.selectedSubtitleZh}
        />
        <PhotoMasonry photos={homepage.slice(0, 9)} />
      </section>
      <TextPanel>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{copy.home.rangeTitle}</p>
        <h2 className="mt-3 text-3xl font-semibold text-pearl">{copy.home.rangeTitleZh}</h2>
        <p className="mt-6 text-base leading-8 text-mist">{copy.home.rangeSubtitleZh}</p>
        <p className="mt-3 text-base leading-8 text-mist">{copy.home.rangeSubtitle}</p>
      </TextPanel>
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
