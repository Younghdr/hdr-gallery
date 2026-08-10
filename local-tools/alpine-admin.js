const daySelect = document.querySelector("#daySelect");
const dayForm = document.querySelector("#dayForm");
const uploadForm = document.querySelector("#uploadForm");
const photoList = document.querySelector("#photoList");
const daySummary = document.querySelector("#daySummary");
const saveState = document.querySelector("#saveState");
const log = document.querySelector("#log");
let tripData;

const statusNames = { planned: "規劃中", editing: "整理中", published: "已發佈" };
const fieldNames = ["status", "date", "theme", "country", "countryCode", "city", "title", "summary", "note", "videoUrl", "publishedAt"];

function selectedDay() {
  return tripData.days.find((item) => item.day === daySelect.value);
}

function displayDateTime(value) {
  return value ? value.slice(0, 16) : "";
}

function toIsoDateTime(value) {
  return value ? new Date(value).toISOString() : "";
}

function renderDay() {
  const day = selectedDay();
  if (!day) return;
  fieldNames.forEach((name) => {
    const input = dayForm.elements[name];
    if (input) input.value = name === "publishedAt" ? displayDateTime(day[name]) : (day[name] || "");
  });
  dayForm.elements.route.value = (day.route || []).join("\n");
  ["camera", "lens", "format", "shotAt"].forEach((name) => {
    dayForm.elements[name].value = day.gear?.[name] || "";
  });
  daySummary.replaceChildren();
  const title = document.createElement("b");
  title.textContent = `DAY ${day.day} · ${day.title}`;
  const meta = document.createElement("span");
  meta.textContent = `${statusNames[day.status]} · ${day.city} · ${(day.photos || []).length} 張照片`;
  daySummary.append(title, meta);
  renderPhotos();
  saveState.textContent = "";
}

function updatePhoto(index, key, value) {
  selectedDay().photos[index][key] = value;
}

function movePhoto(index, direction) {
  const photos = selectedDay().photos;
  const target = index + direction;
  if (target < 0 || target >= photos.length) return;
  [photos[index], photos[target]] = [photos[target], photos[index]];
  renderPhotos();
}

function renderPhotos() {
  photoList.replaceChildren();
  const photos = selectedDay().photos || [];
  if (!photos.length) {
    const empty = document.createElement("p");
    empty.className = "file-rule";
    empty.textContent = "尚未加入照片；公開頁會顯示「今日影像整理中」，不會留下空白區塊。";
    photoList.append(empty);
    return;
  }
  photos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photo-card";
    const image = document.createElement("img");
    image.src = photo.src.startsWith("http") ? photo.src : `/public${photo.src}`;
    image.alt = photo.alt || "照片預覽";
    const fields = document.createElement("div");
    fields.className = "photo-fields";
    const inputs = [
      ["替代文字", "alt", "input"],
      ["圖說", "caption", "input"],
      ["方向", "orientation", "select"],
      ["HDR", "hdr", "checkbox"],
    ];
    inputs.forEach(([labelText, key, type]) => {
      const label = document.createElement("label");
      label.append(document.createTextNode(labelText));
      let input;
      if (type === "select") {
        input = document.createElement("select");
        [["landscape", "橫幅"], ["portrait", "直幅"], ["square", "方形"]].forEach(([value, text]) => input.add(new Option(text, value)));
        input.value = photo[key] || "landscape";
      } else {
        input = document.createElement("input");
        input.type = type;
        if (type === "checkbox") input.checked = Boolean(photo[key]);
        else input.value = photo[key] || "";
      }
      input.addEventListener("change", () => updatePhoto(index, key, type === "checkbox" ? input.checked : input.value));
      label.append(input);
      fields.append(label);
    });
    const actions = document.createElement("div");
    actions.className = "photo-actions";
    [["↑", () => movePhoto(index, -1)], ["↓", () => movePhoto(index, 1)], ["移除", () => { photos.splice(index, 1); renderPhotos(); }]].forEach(([text, action]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = text;
      button.addEventListener("click", action);
      actions.append(button);
    });
    card.append(image, fields, actions);
    photoList.append(card);
  });
}

function collectDay() {
  const day = selectedDay();
  fieldNames.forEach((name) => {
    const value = dayForm.elements[name].value.trim();
    day[name] = name === "publishedAt" ? toIsoDateTime(value) : value;
  });
  day.route = dayForm.elements.route.value.split(/[\n,，]+/).map((item) => item.trim()).filter(Boolean);
  day.gear = Object.fromEntries(["camera", "lens", "format", "shotAt"].map((name) => [name, dayForm.elements[name].value.trim()]));
  if (!day.hero && day.photos.length) day.hero = day.photos[0].src;
  if (day.status === "published" && !day.publishedAt) day.publishedAt = new Date().toISOString();
}

async function request(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "操作失敗");
  return payload;
}

async function save() {
  collectDay();
  await request("/api/alpine", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(tripData) });
  renderDay();
  saveState.textContent = `已於 ${new Date().toLocaleTimeString("zh-TW")} 儲存`;
}

dayForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try { await save(); log.textContent = `DAY ${daySelect.value} 已儲存，請開啟預覽確認。`; } catch (error) { log.textContent = error.message; }
});

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const files = document.querySelector("#photoFiles").files;
  if (!files.length) return;
  const body = new FormData();
  [...files].forEach((file) => body.append("photos", file));
  log.textContent = "照片上傳中…";
  try {
    const result = await request(`/api/alpine-upload?day=${daySelect.value}`, { method: "POST", body });
    selectedDay().photos.push(...result.files.map((item) => item.photo));
    await save();
    log.textContent = ["照片已加入並儲存。", ...result.files.map((item) => item.warning).filter(Boolean)].join("\n");
    uploadForm.reset();
  } catch (error) { log.textContent = error.message; }
});

daySelect.addEventListener("change", renderDay);
document.querySelector("#previewButton").addEventListener("click", async () => {
  try { await save(); window.open(`http://127.0.0.1:3000/travel/germany-switzerland-france/day/${daySelect.value}/`, "_blank", "noopener"); } catch (error) { log.textContent = error.message; }
});
document.querySelector("#publishButton").addEventListener("click", async () => {
  if (!window.confirm(`確定要把 DAY ${daySelect.value} 的德瑞法資料與媒體發佈到 GitHub Pages？`)) return;
  try {
    await save();
    log.textContent = "正在建立 Git commit 並推送…";
    const result = await request("/api/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scope: "alpine", message: `Publish Alpine Dispatch Day ${daySelect.value}` }) });
    log.textContent = result.logs || "發佈完成。";
  } catch (error) { log.textContent = error.message; }
});

request("/api/alpine").then((data) => {
  tripData = data;
  data.days.forEach((day) => daySelect.add(new Option(`DAY ${day.day} · ${day.city}`, day.day)));
  renderDay();
}).catch((error) => { log.textContent = error.message; });
