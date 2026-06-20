const data = window.HDR_SITE_DATA || {};
const categories = data.categories || [];
const featuredVideo = data.featuredVideo || data.videos?.[0]?.youtube || "";

let activeView = "videos";
let activeCategory = "all";

function extractYouTubeId(input) {
  const value = String(input || "").trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/").filter(Boolean)[1] || "";
    }

    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/").filter(Boolean)[1] || "";
    }

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

  if (!videoId || !frame) {
    return;
  }

  placeholder?.remove();
  frame.appendChild(createYouTubeEmbed(featuredVideo, "Featured YouTube HDR video"));

  if (watchLink) {
    watchLink.href = `https://www.youtube.com/watch?v=${videoId}&vq=highres`;
  }
}

function renderCategoryTabs() {
  const categoryTabs = document.querySelector("#categoryTabs");
  if (!categoryTabs) {
    return;
  }

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
      renderGrid();
    });
    categoryTabs.appendChild(button);
  }
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || id;
}

function filteredItems() {
  const source = activeView === "videos" ? data.videos || [] : data.photos || [];
  if (activeCategory === "all") {
    return source;
  }

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
  link.textContent = "開啟 YouTube HDR";

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
  link.href = item.fullSrc || item.src;
  link.target = "_blank";
  link.rel = "noopener";
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

function renderGrid() {
  const grid = document.querySelector("#contentGrid");
  if (!grid) {
    return;
  }

  const items = filteredItems();
  grid.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "這個主題目前還沒有作品。";
    grid.appendChild(empty);
    return;
  }

  for (const item of items) {
    grid.appendChild(activeView === "videos" ? createVideoCard(item) : createPhotoCard(item));
  }
}

function bindViewTabs() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      document.querySelectorAll("[data-view]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
      });
      renderGrid();
    });
  });
}

renderFeaturedVideo();
renderCategoryTabs();
bindViewTabs();
renderGrid();
