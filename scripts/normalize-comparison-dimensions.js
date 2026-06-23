const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "site-data.js"), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const comparisons = sandbox.window.HDR_SITE_DATA.photoComparisons || [];

function dimensions(file) {
  try {
    const out = execFileSync(
      "C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe",
      ["identify", "-format", "%w %h", file],
      { encoding: "utf8" }
    );
    const [w, h] = out.trim().split(" ").map(Number);
    return { w, h };
  } catch (e) {
    return null;
  }
}

function resize(src, dst, w, h) {
  execFileSync(
    "C:/Program Files/ImageMagick-7.1.2-Q16-HDRI/magick.exe",
    [src, "-resize", `${w}x${h}!`, "-quality", "95", dst]
  );
}

for (const item of comparisons) {
  if (!item.sdrSrc || !item.src) continue;
  const sdrRoot = path.join(root, item.sdrSrc);
  const hdrRoot = path.join(root, item.src);
  const sdrPublic = path.join(root, "public", item.sdrSrc);
  const sdrDim = dimensions(sdrRoot);
  const hdrDim = dimensions(hdrRoot);
  if (!sdrDim || !hdrDim) {
    console.log(`SKIP ${item.title}: missing file`);
    continue;
  }
  if (sdrDim.w === hdrDim.w && sdrDim.h === hdrDim.h) {
    console.log(`OK ${item.title}: ${sdrDim.w}x${sdrDim.h}`);
    continue;
  }
  console.log(
    `FIX ${item.title}: SDR ${sdrDim.w}x${sdrDim.h} -> HDR ${hdrDim.w}x${hdrDim.h}`
  );
  resize(sdrRoot, sdrRoot, hdrDim.w, hdrDim.h);
  if (fs.existsSync(sdrPublic)) {
    resize(sdrPublic, sdrPublic, hdrDim.w, hdrDim.h);
  }
}
