const data = window.HDR_SITE_DATA || {};
const categories = data.categories || [];
const featuredVideo = data.featuredVideo || data.videos?.[0]?.youtube || "";

let activeView = "videos";
let activeCategory = "all";

function extractYouTubeId(input) {
  const value = String(input || "").trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) return url.pathname.split("/").filter(Boolean)[0] || "";
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/").filter(Boolean)[1] || "";
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/").filter(Boolean)[1] || "";
    return url.searchParams.get("v") || "";
  } catch {
    return "";
  }
}

function createYouTubeEmbed(videoUrl, title) {
  const videoId = extractYouTubeId(videoUrl);
  const frame = document.createElement("iframe");
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    vq: "highres",
  });

  frame.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  frame.title = title || "YouTube HDR video player";
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  return frame;
}

function renderFeaturedVideo() {
  const videoId = extractYouTubeId(featuredVideo);
  const frame = document.querySelector("#featuredVideoFrame");
  const placeholder = document.querySelector("#featuredVideoPlaceholder");
  const watchLink = document.querySelector("#hdrWatchLink");

  if (!videoId || !frame) return;

  placeholder?.remove();
  frame.appendChild(createYouTubeEmbed(featuredVideo, "Featured YouTube HDR video"));

  if (watchLink) watchLink.href = `https://www.youtube.com/watch?v=${videoId}&vq=highres`;
}

function renderCategoryTabs() {
  const categoryTabs = document.querySelector("#categoryTabs");
  if (!categoryTabs) return;

  categoryTabs.replaceChildren();

  for (const category of categories) {
    const button = document.createElement("button");
    button.className = `pill${category.id === activeCategory ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = category.label;
    button.dataset.category = category.id;
    button.addEventListener("click", () => {
      activeCategory = category.id;
      renderCategoryTabs();
      renderPortfolio();
    });
    categoryTabs.appendChild(button);
  }
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || id;
}

function filteredItems(source) {
  if (activeCategory === "all") return source;
  return source.filter((item) => item.category === activeCategory);
}

function createVideoCard(item) {
  const card = document.createElement("article");
  const media = document.createElement("div");
  const body = document.createElement("div");
  const heading = document.createElement("h3");
  const meta = document.createElement("span");
  const text = document.createElement("p");
  const link = document.createElement("a");
  const videoId = extractYouTubeId(item.youtube);

  card.className = "media-card";
  media.className = "card-video";
  media.appendChild(createYouTubeEmbed(item.youtube, item.title));
  body.className = "card-body";
  heading.textContent = item.title;
  meta.textContent = categoryLabel(item.category);
  text.textContent = item.description || "";
  link.href = `https://www.youtube.com/watch?v=${videoId}&vq=highres`;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "觀看 YouTube HDR";

  body.append(meta, heading, text, link);
  card.append(media, body);
  return card;
}

function createPhotoCard(item) {
  const card = document.createElement("article");
  const link = document.createElement("a");
  const image = document.createElement("img");
  const body = document.createElement("div");
  const heading = document.createElement("h3");
  const meta = document.createElement("span");
  const text = document.createElement("p");

  card.className = "media-card";
  link.className = "photo-link";
  link.href = photoViewerHref(item);
  image.src = item.src;
  image.alt = item.title;
  image.loading = "lazy";
  link.appendChild(image);

  body.className = "card-body";
  meta.textContent = `${categoryLabel(item.category)} / ${item.meta || "HDR Photo"}`;
  heading.textContent = item.title;
  text.textContent = item.description || "";

  body.append(meta, heading, text);
  card.append(link, body);
  return card;
}

function createNoteCard(item) {
  const card = document.createElement("article");
  const imageLink = document.createElement("a");
  const image = document.createElement("img");
  const body = document.createElement("div");
  const heading = document.createElement("h3");
  const meta = document.createElement("span");
  const text = document.createElement("p");
  const action = document.createElement("a");
  const noteHref = item.url || item.cover || "#";

  card.className = "media-card";
  imageLink.className = "photo-link";
  imageLink.href = noteHref;
  if (/^https?:\/\//.test(noteHref)) {
    imageLink.target = "_blank";
    imageLink.rel = "noopener";
  }
  image.src = item.cover || "Photo/2Y6A8536.avif";
  image.alt = item.title;
  image.loading = "lazy";
  imageLink.appendChild(image);

  body.className = "card-body";
  meta.textContent = `${categoryLabel(item.category)} / ${item.date || "Travel Note"}`;
  heading.textContent = item.title;
  text.textContent = item.description || "";
  action.href = noteHref;
  action.textContent = item.url ? "閱讀遊記" : "查看相片";
  if (/^https?:\/\//.test(noteHref)) {
    action.target = "_blank";
    action.rel = "noopener";
  }

  body.append(meta, heading, text, action);
  card.append(imageLink, body);
  return card;
}

function renderPhotoMosaic() {
  const mosaic = document.querySelector("#photoMosaic");
  if (!mosaic) return;

  mosaic.replaceChildren();

  const photos = filteredItems(data.photos || []).slice(0, 12);
  if (!photos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "這個主題目前還沒有 HDR 相片。";
    mosaic.appendChild(empty);
    return;
  }

  photos.forEach((photo, index) => {
    const link = document.createElement("a");
    const image = document.createElement("img");
    link.href = photoViewerHref(photo);
    link.setAttribute("aria-label", `在 HDR Photo Viewer 檢視 ${photo.title}`);
    link.className = index === 0 ? "mosaic-tile is-large" : "mosaic-tile";
    image.src = photo.src;
    image.alt = photo.title;
    image.loading = "lazy";
    link.appendChild(image);
    mosaic.appendChild(link);
  });
}

function photoViewerHref(item) {
  const photoPath = item.fullSrc || item.src || "";
  return `photos.html?photo=${encodeURIComponent(photoPath)}`;
}

function renderGrid(gridId, items, createCard, emptyText) {
  const grid = document.querySelector(gridId);
  if (!grid) return;

  const filtered = filteredItems(items);
  grid.replaceChildren();

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = emptyText;
    grid.appendChild(empty);
    return;
  }

  for (const item of filtered) {
    grid.appendChild(createCard(item));
  }
}

function renderPortfolio() {
  renderGrid("#videoGrid", data.videos || [], createVideoCard, "這個主題目前還沒有 HDR 影片。");
  renderPhotoMosaic();
  renderGrid("#noteGrid", data.travelNotes || [], createNoteCard, "這個主題目前還沒有旅遊紀錄。");
}

renderFeaturedVideo();
renderCategoryTabs();
renderPortfolio();
