import { copy } from "@/lib/copy";
import { getFilmItems } from "@/lib/site-data";
import { FilmGrid, PageIntro, SectionHeader, SiteFrame } from "@/components/site-components";

export default function FilmsPage() {
  const films = getFilmItems();

  return (
    <SiteFrame>
      <PageIntro
        title={copy.films.title}
        titleZh={copy.films.titleZh}
        subtitle={copy.films.subtitle}
        subtitleZh={copy.films.subtitleZh}
        intro={copy.films.intro}
        introZh={copy.films.introZh}
      />
      <section className="px-5 pb-24 lg:px-8">
        <SectionHeader
          eyebrow="HDR Films"
          title={copy.films.gridTitle}
          titleZh={copy.films.gridTitleZh}
          subtitle={copy.films.gridSubtitle}
          subtitleZh={copy.films.gridSubtitleZh}
        />
        <FilmGrid films={films} />
      </section>
    </SiteFrame>
  );
}
