const input = document.querySelector("#photoInput");
const maxSize = document.querySelector("#maxSize");
const quality = document.querySelector("#quality");
const format = document.querySelector("#format");
const results = document.querySelector("#resizeResults");

function outputExtension(type) {
  return type === "image/jpeg" ? "jpg" : "webp";
}

function downloadName(file, type, size) {
  const base = file.name.replace(/\.[^.]+$/, "");
  return `${base}-${size}w.${outputExtension(type)}`;
}

async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const target = Number(maxSize.value);
  const scale = Math.min(1, target / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  canvas.width = width;
  canvas.height = height;
  context.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, format.value, Number(quality.value));
  });

  return { blob, width, height };
}

function renderResult(file, result) {
  const url = URL.createObjectURL(result.blob);
  const link = document.createElement("a");
  const item = document.createElement("article");
  const image = document.createElement("img");
  const info = document.createElement("div");
  const name = downloadName(file, format.value, result.width);

  item.className = "resize-card";
  image.src = url;
  image.alt = file.name;
  link.href = url;
  link.download = name;
  link.textContent = `下載 ${name}`;
  info.innerHTML = `<strong>${file.name}</strong><span>${result.width} x ${result.height} / ${(result.blob.size / 1024 / 1024).toFixed(2)} MB</span>`;

  item.append(image, info, link);
  results.appendChild(item);
}

input?.addEventListener("change", async () => {
  results.replaceChildren();
  const files = Array.from(input.files || []);

  for (const file of files) {
    try {
      const result = await resizeImage(file);
      renderResult(file, result);
    } catch (error) {
      const item = document.createElement("article");
      item.className = "resize-card";
      item.textContent = `${file.name} 無法處理，請改用 AVIF/JPEG/WebP 或用專業工具轉檔。`;
      results.appendChild(item);
    }
  }
});
