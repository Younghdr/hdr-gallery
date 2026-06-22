const fs = require("fs");
const path = require("path");

const root = process.cwd();
const source = path.join(root, "Photo");
const target = path.join(root, "public", "Photo");

function copyDirectory(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });

  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const sourcePath = path.join(from, entry.name);
    const targetPath = path.join(to, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

copyDirectory(source, target);
console.log("Prepared public/Photo assets.");
