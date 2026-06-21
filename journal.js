const journalData = window.HDR_JOURNAL_DATA || {};
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id") || Object.keys(journalData)[0];
const article = journalData[articleId];
const root = document.querySelector("#journalArticle");

function appendText(parent, tag, text, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = text;
  parent.appendChild(node);
  return node;
}

function createExternalLink(url, text, className) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = text;
  if (className) link.className = className;
  return link;
}

function normalizePhoto(photo, fallbackAlt) {
  if (typeof photo === "string") {
    return { src: photo, alt: fallbackAlt, caption: "" };
  }

  return {
    src: photo.src,
    alt: photo.alt || photo.caption || fallbackAlt,
    caption: photo.caption || "",
  };
}

function createPhotoFigure(photo, fallbackAlt) {
  const item = normalizePhoto(photo, fallbackAlt);
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  figure.className = "journal-photo";
  img.src = item.src;
  img.alt = item.alt;
  img.loading = "lazy";
  img.decoding = "async";
  figure.appendChild(img);

  if (item.caption) {
    appendText(figure, "figcaption", item.caption);
  }

  return figure;
}

function createPhotoGrid(photos, className, fallbackAlt) {
  const grid = document.createElement("div");
  grid.className = className;

  for (const photo of photos || []) {
    grid.appendChild(createPhotoFigure(photo, fallbackAlt));
  }

  return grid;
}

function renderJournal() {
  if (!root || !article) return;

  root.replaceChildren();

  const hero = document.createElement("section");
  hero.className = "journal-hero";

  const copy = document.createElement("div");
  copy.className = "journal-hero-copy";
  appendText(copy, "p", "Travel Journal", "eyebrow");
  appendText(copy, "h1", article.title);
  appendText(copy, "p", article.subtitle, "journal-subtitle");

  const actions = document.createElement("div");
  actions.className = "hero-actions";
  actions.appendChild(createExternalLink(article.sourceUrl, article.sourceTitle || "原文連結", "secondary-link"));
  copy.appendChild(actions);

  const image = document.createElement("img");
  image.src = article.hero;
  image.alt = article.title;
  image.loading = "eager";
  image.decoding = "async";

  hero.append(copy, image);
  root.appendChild(hero);

  const intro = document.createElement("section");
  intro.className = "journal-section journal-intro";
  appendText(intro, "p", article.intro);

  const stats = document.createElement("ul");
  stats.className = "journal-stats";
  for (const item of article.stats || []) appendText(stats, "li", item);
  intro.appendChild(stats);
  root.appendChild(intro);

  if (article.video) {
    const video = document.createElement("section");
    video.className = "journal-section";
    const frame = document.createElement("iframe");
    frame.src = article.video;
    frame.title = `${article.title} video`;
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    video.appendChild(frame);
    root.appendChild(video);
  }

  const usedPhotoSources = new Set();

  for (const section of article.sections || []) {
    const block = document.createElement("section");
    block.className = "journal-section journal-copy-block";
    appendText(block, "h2", section.heading);
    appendText(block, "p", section.body);

    if (section.photos?.length) {
      for (const photo of section.photos) {
        usedPhotoSources.add(normalizePhoto(photo, article.title).src);
      }
      block.appendChild(createPhotoGrid(section.photos, "journal-inline-gallery", article.title));
    }

    root.appendChild(block);
  }

  const remainingPhotos = (article.gallery || []).filter((photo) => {
    return !usedPhotoSources.has(normalizePhoto(photo, article.title).src);
  });

  if (!remainingPhotos.length) return;

  const gallery = document.createElement("section");
  gallery.className = "journal-section";
  appendText(gallery, "p", "Selected Frames", "eyebrow");
  appendText(gallery, "h2", "精選照片");
  const grid = createPhotoGrid(remainingPhotos, "journal-gallery", article.title);
  gallery.appendChild(grid);
  root.appendChild(gallery);
}

renderJournal();
