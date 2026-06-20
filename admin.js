let siteData = null;
let activeAdminTab = "videos";

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
  const items = siteData[activeAdminTab] || [];
  list.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "目前沒有內容。";
    list.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const meta = document.createElement("span");
    const text = document.createElement("p");
    const remove = document.createElement("button");

    card.className = "admin-item";
    heading.textContent = item.title;
    meta.textContent = `${categoryLabel(item.category)} / ${
      activeAdminTab === "videos" ? item.youtube : activeAdminTab === "photos" ? item.src : item.date || "遊記"
    }`;
    text.textContent = item.description || "";
    remove.type = "button";
    remove.className = "danger-button";
    remove.textContent = "刪除";
    remove.addEventListener("click", () => {
      if (!confirm(`刪除「${item.title}」？`)) return;
      siteData[activeAdminTab].splice(index, 1);
      renderAdminList();
    });

    card.append(meta, heading, text, remove);
    list.appendChild(card);
  });
}

async function saveData() {
  await api("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(siteData),
  });
  log("已儲存 site-data.js。");
}

async function uploadFiles(formData) {
  return api("/api/upload", {
    method: "POST",
    body: formData,
  });
}

async function makePreview(file, maxSize) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, Number(maxSize) / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  canvas.width = width;
  canvas.height = height;
  context.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.82);
  });
}

function itemTitleFromFile(file, prefix = "") {
  const name = file.name.replace(/\.[^.]+$/, "");
  return [prefix.trim(), name].filter(Boolean).join(" - ");
}

async function uploadPhotoFile(file, maxSize) {
  const upload = new FormData();
  upload.append("original", file, file.name);

  try {
    const preview = await makePreview(file, maxSize);
    if (preview) {
      upload.append("preview", preview, file.name.replace(/\.[^.]+$/, ".webp"));
    }
  } catch {
    log(`${file.name} 無法產生預覽圖，會直接使用原始檔。`);
  }

  const result = await uploadFiles(upload);
  const original = result.files.find((item) => item.field === "original")?.path;
  const preview = result.files.find((item) => item.field === "preview")?.path;
  return { original, preview };
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
      "HDR 影片展示。嵌入頁可預覽，正式 HDR 觀看建議開啟 YouTube 官方播放器。",
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
  const file = form.get("photo");
  const { original, preview } = await uploadPhotoFile(file, form.get("maxSize"));

  siteData.photos.unshift({
    title: form.get("title").trim(),
    category: form.get("category"),
    src: preview || original,
    fullSrc: original,
    description: form.get("description").trim() || "HDR 相片作品。",
    meta: preview ? "WebP 預覽 / 原始 HDR" : "原始 HDR",
  });

  formElement.reset();
  fillCategorySelects();
  activeAdminTab = "photos";
  renderAdminList();
  await saveData();
});

document.querySelector("#folderPhotoForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const files = Array.from(formElement.elements.photos.files || []).filter((file) =>
    file.type.startsWith("image/"),
  );

  if (!files.length) {
    log("請先選擇相片資料夾。");
    return;
  }

  const prefix = form.get("prefix") || "";
  const description = form.get("description") || "HDR 相片作品。";

  log(`正在處理 ${files.length} 張相片...`);

  for (const [index, file] of files.entries()) {
    log(`正在處理 ${index + 1}/${files.length}: ${file.name}`);
    const { original, preview } = await uploadPhotoFile(file, form.get("maxSize"));
    siteData.photos.unshift({
      title: itemTitleFromFile(file, prefix),
      category: form.get("category"),
      src: preview || original,
      fullSrc: original,
      description,
      meta: preview ? "WebP 預覽 / 原始 HDR" : "原始 HDR",
    });
  }

  formElement.reset();
  fillCategorySelects();
  activeAdminTab = "photos";
  renderAdminList();
  await saveData();
  log(`已加入 ${files.length} 張相片。`);
});

document.querySelector("#noteForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  const cover = form.get("cover");
  let coverPath = siteData.photos?.[0]?.src || "Photo/2Y6A8536.avif";

  if (cover && cover.size) {
    const { original, preview } = await uploadPhotoFile(cover, 2048);
    coverPath = preview || original;
  }

  siteData.travelNotes = siteData.travelNotes || [];
  siteData.travelNotes.unshift({
    title: form.get("title").trim(),
    category: form.get("category"),
    cover: coverPath,
    description: form.get("description").trim() || "旅行與拍攝紀錄。",
    date: form.get("date") || new Date().toISOString().slice(0, 10),
  });

  formElement.reset();
  fillCategorySelects();
  activeAdminTab = "travelNotes";
  renderAdminList();
  await saveData();
});

document.querySelectorAll("[data-admin-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activeAdminTab = button.dataset.adminTab;
    document.querySelectorAll("[data-admin-tab]").forEach((tab) => {
      tab.classList.toggle("is-active", tab === button);
    });
    renderAdminList();
  });
});

document.querySelector("#saveData").addEventListener("click", saveData);

document.querySelector("#publishSite").addEventListener("click", async () => {
  await saveData();
  log("正在發布到 GitHub Pages...");
  const result = await api("/api/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Update HDR gallery from admin" }),
  });
  log(`發布完成。\n\n${result.logs}`);
});

async function init() {
  siteData = await api("/api/data");
  fillCategorySelects();
  renderAdminList();
}

init().catch((error) => log(error.message));
