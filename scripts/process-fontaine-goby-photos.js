const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(process.env.TEMP || "/tmp", "fontaine-goby");
const outDir = path.join(__dirname, "..", "public", "photos", "wines");

const FILES = {
  "fontaine-goby-petit-chablis": "Petit Chablis.jpg",
  "fontaine-goby-chablis": "Chablis.jpg",
  "fontaine-goby-chablis-vv": "Vieilles Vignes.jpg",
  "fontaine-goby-1er-cote-jouan": "Cote de jouan.jpg",
  "fontaine-goby-1er-montmains": "SMG_4311 copie.jpg",
  "fontaine-goby-bourgogne-blanc": "Bourgogne Chardonnay.jpg",
  "fontaine-goby-bourgogne-rouge": "Pinot noir.jpg",
  "fontaine-goby-grande-reserve": "Bourgogne Grande Réserve.jpg",
  "fontaine-goby-irancy": "Irancy.jpg",
  "fontaine-goby-irancy-palotte": "Irancy Palotte.jpg",
  "fontaine-goby-irancy-mazelots": "Mazelots.jpg",
  "fontaine-goby-rose": "rosé.jpg",
};

// Seule rosé.jpg a un fin liseré coloré en bordure qui bloque le flood-fill
// depuis les bords ; les autres sources ont déjà un fond blanc propre.
const NEEDS_MARGIN_CROP = new Set(["fontaine-goby-rose"]);

async function removeBg(inputBuffer) {
  const { data, info } = await sharp(inputBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const idx = (x, y) => (y * w + x) * channels;
  const isWhiteish = (r, g, b) => Math.min(r, g, b) > 200;

  const visited = new Uint8Array(w * h);
  const stack = [];
  function tryPush(x, y) {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (visited[i]) return;
    const p = idx(x, y);
    if (!isWhiteish(data[p], data[p + 1], data[p + 2])) return;
    visited[i] = 1;
    stack.push(x, y);
  }
  for (let x = 0; x < w; x++) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }

  const tLow = 235;
  const tHigh = 250;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!visited[i]) continue;
      const p = idx(x, y);
      const r = data[p], g = data[p + 1], b = data[p + 2];
      const whiteness = Math.min(r, g, b);
      let a;
      if (whiteness >= tHigh) a = 0;
      else if (whiteness <= tLow) a = 255;
      else a = Math.round((255 * (tHigh - whiteness)) / (tHigh - tLow));

      if (a > 0 && a < 255) {
        const af = a / 255;
        data[p] = Math.max(0, Math.min(255, Math.round((r - (1 - af) * 255) / af)));
        data[p + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - af) * 255) / af)));
        data[p + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - af) * 255) / af)));
      }
      data[p + 3] = a;
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels } });
}

async function processOne(id, srcName) {
  const srcPath = path.join(srcDir, srcName);
  const outFile = path.join(outDir, `${id}.png`);
  try {
    const rawBuf = fs.readFileSync(srcPath);
    const pipeline = sharp(rawBuf);
    const meta = await pipeline.metadata();

    let buf = rawBuf;
    if (NEEDS_MARGIN_CROP.has(id)) {
      const margin = Math.round(Math.min(meta.width, meta.height) * 0.02);
      buf = await pipeline
        .extract({
          left: margin,
          top: margin,
          width: meta.width - margin * 2,
          height: meta.height - margin * 2,
        })
        .toBuffer();
    }

    const img = await removeBg(buf);
    const trimmed = img.trim({ threshold: 12 });
    const resized = trimmed.resize({ width: 1400, withoutEnlargement: true });
    const outBuf = await resized
      .png({ palette: false, compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();
    fs.writeFileSync(outFile, outBuf);
    console.log("OK", id, `${Math.round(outBuf.length / 1024)}KB`);
  } catch (err) {
    console.error("FAIL", id, srcName, err.message);
  }
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  await Promise.all(Object.entries(FILES).map(([id, srcName]) => processOne(id, srcName)));
})();
