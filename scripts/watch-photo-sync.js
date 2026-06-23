const fs = require("fs");
const path = require("path");

const root = process.cwd();
const source = path.join(root, "Photo");
const target = path.join(root, "public", "Photo");

function log(message) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${message}`);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function syncFile(relativePath) {
  const src = path.join(source, relativePath);
  const dst = path.join(target, relativePath);

  if (!fs.existsSync(src)) {
    // Source was deleted; mirror deletion in public/Photo if it exists.
    if (fs.existsSync(dst)) {
      try {
        const stat = fs.statSync(dst);
        if (stat.isDirectory()) {
          fs.rmSync(dst, { recursive: true, force: true });
        } else {
          fs.unlinkSync(dst);
        }
        log(`Removed ${relativePath}`);
      } catch (error) {
        log(`Failed to remove ${relativePath}: ${error.message}`);
      }
    }
    return;
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    return;
  }

  ensureDir(dst);
  fs.copyFile(src, dst, (error) => {
    if (error) {
      log(`Failed to copy ${relativePath}: ${error.message}`);
    } else {
      log(`Synced ${relativePath}`);
    }
  });
}

function initialSync() {
  if (!fs.existsSync(source)) {
    log(`Source folder does not exist: ${source}`);
    return;
  }

  fs.mkdirSync(target, { recursive: true });

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(source, fullPath);
      const dstPath = path.join(target, relativePath);

      if (entry.isDirectory()) {
        fs.mkdirSync(dstPath, { recursive: true });
        walk(fullPath);
      } else {
        fs.copyFileSync(fullPath, dstPath);
      }
    }
  }

  walk(source);
  log("Initial sync complete.");
}

initialSync();

if (!fs.existsSync(source)) {
  log(`Watching folder does not exist: ${source}`);
  process.exit(1);
}

fs.watch(source, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  // Normalize separators to forward slashes for consistent logging.
  const relativePath = filename.replace(/\\/g, "/");
  syncFile(relativePath);
});

log(`Watching ${source} for changes...`);
