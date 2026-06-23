let siteData = null;
let activeAdminTab = "videos";
let editingIndex = null;

const logBox = document.querySelector("#adminLog");

function log(message) {
  logBox.textContent = message;
}

async function api(path, options = {}) {
  const response = await fetch(path, options);
  const payload = await response.json();
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || "Request failed");
  }
  return payload;
}

function categoriesForSelect() {
  return (siteData.categories || []).filter((category) => category.id !== "all");
}

function fillCategorySelects() {
  document.querySelectorAll("[data-category-select]").forEach((select) => {
    select.replaceChildren(
      ...categoriesForSelect().map((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.label;
        return option;
      }),
    );
  });
}

function categoryLabel(id) {
  return siteData.categories.find((category) => category.id === id)?.label || id;
}

function renderAdminList() {
  const list = document.querySelector("#adminList");
  ensurePhotoCollections();
  siteData.music = siteData.music || [];
  const items = siteData[activeAdminTab] || [];
  syncAdminTabs();
  list.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = activeAdminTab === "music" ? "No music tracks yet." : "No content yet.";
    list.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("article");
    const meta = document.createElement("span");

    card.className = "admin-item";

    if (activeAdminTab === "music") {
      meta.textContent = item.src;
    } else {
      meta.textContent = `${categoryLabel(item.category)} / ${
        activeAdminTab === "videos"
          ? item.youtube
          : ["photos", "photoDetails", "photoComparisons"].includes(activeAdminTab)
            ? activeAdminTab === "photoComparisons"
              ? `SDR: ${item.sdrSrc || "-"} / HDR: ${item.src}`
              : item.src
            : item.date || "journal"
      }`;
    }

    if (editingIndex === index) {
      const titleInput = document.createElement("input");
      titleInput.value = item.title || "";

      const descInput = document.createElement("textarea");
      descInput.rows = 4;
      descInput.value = item.description || "";

      const save = document.createElement("button");
      save.type = "button";
      save.className = "primary-button";
      save.textContent = "Save";
      save.addEventListener("click", async () => {
        item.title = titleInput.value.trim();
        item.description = descInput.value.trim();
        editingIndex = null;
        renderAdminList();
        await saveData();
      });

      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "secondary-button";
      cancel.textContent = "Cancel";
      cancel.addEventListener("click", () => {
        editingIndex = null;
        renderAdminList();
      });

      const actions = document.createElement("div");
      actions.append(save, cancel);
      card.append(meta, titleInput, descInput, actions);
    } else {
      const heading = document.createElement("h3");
      heading.textContent = item.title;

      const text = document.createElement("p");
      text.textContent = activeAdminTab === "music" ? "" : item.description || "";

      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "secondary-button";
      edit.textContent = "Edit";
      edit.addEventListener("click", () => {
        editingIndex = index;
        renderAdminList();
      });

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "danger-button";
      remove.textContent = "Delete";
      remove.addEventListener("click", () => {
        if (!confirm(`Delete "${item.title}"?`)) return;
        siteData[activeAdminTab].splice(index, 1);
        renderAdminList();
      });

      const actions = document.createElement("div");
      actions.append(edit, remove);
      card.append(meta, heading, text, actions);
    }

    list.appendChild(card);
  });
}

function syncAdminTabs() {
  document.querySelectorAll("[data-admin-tab]").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.adminTab === activeAdminTab);
  });
}

async function saveData() {
  await api("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(siteData),
  });
  log("Saved site-data.js.");
}

async function uploadFiles(formData) {
  return api("/api/upload", {
    method: "POST",
    body: formData,
  });
}

function itemTitleFromFile(file, prefix = "") {
  const name = file.name.replace(/\.[^.]+$/, "");
  return [prefix.trim(), name].filter(Boolean).join(" - ");
}

async function uploadPhotoFile(file) {
  const upload = new FormData();
  upload.append("original", file, file.name);

  const result = await uploadFiles(upload);
  const original = result.files.find((item) => item.field === "original")?.path;
  return { original };
}

async function uploadComparisonFiles(sdrFile, hdrFile) {
  const upload = new FormData();
  upload.append("sdr", sdrFile, sdrFile.name);
  upload.append("hdr", hdrFile, hdrFile.name);

  const result = await uploadFiles(upload);
  const sdr = result.files.find((item) => item.field === "sdr")?.path;
  const hdr = result.files.find((item) => item.field === "hdr")?.path;
  return { sdr, hdr };
}

function createComparisonItem({ title, sdr, hdr, description }) {
  return {
    title,
    category: "photo",
    src: hdr,
    fullSrc: hdr,
    sdrSrc: sdr,
    description: description || "SDR / HDR comparison.",
    meta: "AVIF / Ultra HDR JPEG / HEIC original",
  };
}

function ensurePhotoCollections() {
  siteData.photos = siteData.photos || [];
  if (!Array.isArray(siteData.photoDetails)) {
    siteData.photoDetails = siteData.photos.map((photo) => ({ ...photo }));
  }
  siteData.photoComparisons = siteData.photoComparisons || [];
}

function createPhotoItem({ title, category, src, description }) {
  return {
    title,
    category,
    src,
    fullSrc: src,
    description: description || "HDR photo work.",
    meta: "AVIF / Ultra HDR JPEG / HEIC original",
  };
}

document.querySelector("#videoForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const item = {
    title: form.get("title").trim(),
    category: form.get("category"),
    youtube: form.get("youtube").trim(),
    description:
      form.get("description").trim() ||
      "HDR video work. Open in the official YouTube player for the best HDR playback.",
  };

  siteData.videos.unshift(item);
  if (form.get("featured")) {
    siteData.featuredVideo = item.youtube;
  }

  event.currentTarget.reset();
  fillCategorySelects();
  activeAdminTab = "videos";
  renderAdminList();
  await saveData();
});

document.querySelector("#photoForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const photoFiles = Array.from(formElement.elements.photos.files || []);
  const folderFiles = Array.from(formElement.elements.folderPhotos.files || []);
  const files = [...photoFiles, ...folderFiles].filter((file) => {
    const name = file.name.toLowerCase();
    return file.type.startsWith("image/") || /\.(avif|jpe?g|heic|heif)$/.test(name);
  });

  if (!files.length) {
    log("Choose at least one photo or a photo folder first.");
    return;
  }

  const titleOrPrefix = (form.get("title") || "").trim();
  const description = form.get("description").trim() || "HDR photo work.";
  const target = form.get("target") || "home";

  log(`Processing ${files.length} photo(s)...`);
  ensurePhotoCollections();

  for (const [index, file] of files.entries()) {
    log(`Processing ${index + 1}/${files.length}: ${file.name}`);
    const { original } = await uploadPhotoFile(file);
    const title = files.length === 1 && titleOrPrefix ? titleOrPrefix : itemTitleFromFile(file, titleOrPrefix);
    const item = createPhotoItem({
      title,
      category: form.get("category"),
      src: original,
      description,
    });

    if (target === "home" || target === "both") {
      siteData.photos.unshift(item);
    }
    if (target === "detail" || target === "both") {
      siteData.photoDetails.unshift({ ...item });
    }
  }

  formElement.reset();
  fillCategorySelects();
  activeAdminTab = target === "detail" ? "photoDetails" : "photos";
  renderAdminList();
  await saveData();
  log(`Added ${files.length} photo(s).`);
});

document.querySelector("#comparisonForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const sdrFiles = Array.from(formElement.elements.sdr.files || []);
  const hdrFiles = Array.from(formElement.elements.hdr.files || []);
  const titleOrPrefix = (form.get("title") || "").trim();
  const description = (form.get("description") || "").trim() || "SDR / HDR comparison.";

  if (!sdrFiles.length || !hdrFiles.length) {
    log("Please select at least one SDR photo and one HDR photo.");
    return;
  }

  if (sdrFiles.length !== hdrFiles.length) {
    log(`SDR count (${sdrFiles.length}) and HDR count (${hdrFiles.length}) must match.`);
    return;
  }

  log(`Uploading ${sdrFiles.length} SDR/HDR comparison(s)...`);
  ensurePhotoCollections();

  let added = 0;
  for (let i = 0; i < sdrFiles.length; i++) {
    const sdrFile = sdrFiles[i];
    const hdrFile = hdrFiles[i];
    try {
      const { sdr, hdr } = await uploadComparisonFiles(sdrFile, hdrFile);
      const title = sdrFiles.length === 1 && titleOrPrefix
        ? titleOrPrefix
        : itemTitleFromFile(hdrFile, titleOrPrefix);
      const item = createComparisonItem({ title, sdr, hdr, description });
      siteData.photoComparisons.unshift(item);
      added++;
      log(`Processed ${i + 1}/${sdrFiles.length}: ${title}`);
    } catch (error) {
      log(`Failed pair ${i + 1}: ${error.message}`);
    }
  }

  formElement.reset();
  activeAdminTab = "photoComparisons";
  renderAdminList();
  await saveData();
  log(`Added ${added} SDR/HDR comparison(s).`);
});

document.querySelector("#noteForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const cover = form.get("cover");
  let coverPath = siteData.photos?.[0]?.src || "Photo/2Y6A8536.avif";

  if (cover && cover.size) {
    const { original } = await uploadPhotoFile(cover);
    coverPath = original;
  }

  siteData.travelNotes = siteData.travelNotes || [];
  siteData.travelNotes.unshift({
    title: form.get("title").trim(),
    category: form.get("category"),
    cover: coverPath,
    description: form.get("description").trim() || "Travel and photography notes.",
    date: form.get("date") || new Date().toISOString().slice(0, 10),
  });

  formElement.reset();
  fillCategorySelects();
  activeAdminTab = "travelNotes";
  renderAdminList();
  await saveData();
});

document.querySelector("#scanPhotos").addEventListener("click", async () => {
  log("Scanning Photo folder for detail photos...");
  const result = await api("/api/scan-photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: "photo" }),
  });
  siteData = await api("/api/data");
  activeAdminTab = "photoDetails";
  renderAdminList();
  log(`Scan complete. Added ${result.added.length} missing detail photo(s).`);
});

async function uploadMusicFile(file) {
  const upload = new FormData();
  upload.append("track", file, file.name);

  const result = await api("/api/upload-music", {
    method: "POST",
    body: upload,
  });
  const saved = result.files.find((item) => item.field === "track");
  if (!saved) return null;
  return {
    path: saved.path,
    originalName: saved.originalName || file.name,
  };
}

function cleanMusicTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\+/g, " ")
    .trim();
}

document.querySelector("#musicForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const files = Array.from(formElement.elements.tracks.files || []).filter((file) => {
    const name = file.name.toLowerCase();
    return file.type.startsWith("audio/") || /\.(mp3|wav|ogg|flac|m4a|aac)$/.test(name);
  });

  if (!files.length) {
    log("Choose at least one music file first.");
    return;
  }

  log(`Uploading ${files.length} music track(s)...`);
  siteData.music = siteData.music || [];

  for (const [index, file] of files.entries()) {
    log(`Uploading ${index + 1}/${files.length}: ${file.name}`);
    const result = await uploadMusicFile(file);
    if (!result) continue;
    const title = cleanMusicTitle(result.originalName || file.name);
    siteData.music.push({
      title: title || "Music track",
      src: result.path,
    });
  }

  formElement.reset();
  activeAdminTab = "music";
  renderAdminList();
  await saveData();
  log(`Added ${files.length} music track(s). Remember to publish to GitHub Pages.`);
});

function renderStats(data) {
  const panel = document.querySelector("#statsPanel");
  panel.replaceChildren();

  if (!data.configured) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = data.message || "Stats not configured.";
    panel.appendChild(message);
    return;
  }

  if (!data.ok) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = `Error: ${data.error || "Unknown error"}`;
    panel.appendChild(message);
    return;
  }

  const sections = [];

  if (data.summary) {
    const section = document.createElement("div");
    section.className = "stats-section";
    section.innerHTML = `
      <h3>Summary</h3>
      <p>Total events: <strong>${data.summary.events || 0}</strong></p>
      <p>Unique visitors: <strong>${data.summary.visitors || 0}</strong></p>
    `;
    sections.push(section);
  }

  if (data.pages?.length) {
    const section = document.createElement("div");
    section.className = "stats-section";
    section.innerHTML = `<h3>Page views</h3>`;
    const list = document.createElement("ul");
    data.pages.forEach((page) => {
      const li = document.createElement("li");
      li.textContent = `${page.path}: ${page.views} views, ${page.visitors} visitors`;
      list.appendChild(li);
    });
    section.appendChild(list);
    sections.push(section);
  }

  if (data.topPhotos?.length) {
    const section = document.createElement("div");
    section.className = "stats-section";
    section.innerHTML = `<h3>Top photos</h3>`;
    const list = document.createElement("ul");
    data.topPhotos.forEach((photo) => {
      const li = document.createElement("li");
      li.textContent = `${photo.title || photo.src || "Untitled"}: ${photo.views} views`;
      list.appendChild(li);
    });
    section.appendChild(list);
    sections.push(section);
  }

  if (data.music?.length) {
    const section = document.createElement("div");
    section.className = "stats-section";
    section.innerHTML = `<h3>Music events</h3>`;
    const list = document.createElement("ul");
    data.music.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.event}: ${item.count}`;
      list.appendChild(li);
    });
    section.appendChild(list);
    sections.push(section);
  }

  if (!sections.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No stats data yet.";
    panel.appendChild(empty);
    return;
  }

  panel.append(...sections);
}

document.querySelector("#loadStats").addEventListener("click", async () => {
  log("Loading visitor stats...");
  try {
    const data = await api("/api/stats");
    renderStats(data);
    log("Stats loaded.");
  } catch (error) {
    log(`Failed to load stats: ${error.message}`);
  }
});

document.querySelectorAll("[data-admin-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activeAdminTab = button.dataset.adminTab;
    editingIndex = null;
    renderAdminList();
  });
});

document.querySelector("#saveData").addEventListener("click", saveData);

document.querySelector("#publishSite").addEventListener("click", async () => {
  await saveData();
  log("Publishing to GitHub Pages...");
  const result = await api("/api/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Update HDR gallery from admin" }),
  });
  log(`Publish complete.\n\n${result.logs}`);
});

async function init() {
  siteData = await api("/api/data");
  ensurePhotoCollections();
  fillCategorySelects();
  renderAdminList();
}

init().catch((error) => log(error.message));

