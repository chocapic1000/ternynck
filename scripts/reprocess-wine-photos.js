const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const os = require("os");

const srcDir = path.join(os.tmpdir(), "wine-bg-batch");
const outDir = path.join(__dirname, "..", "public", "photos", "wines");

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

  const tLow = 200;
  const tHigh = 248;
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

(async () => {
  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".src"));
  console.log(`Reprocessing ${files.length} wine photos (no palette quantization, trimmed)...`);

  for (const file of files) {
    const id = file.replace(/\.src$/, "");
    const outFile = path.join(outDir, `${id}.png`);
    try {
      const buf = fs.readFileSync(path.join(srcDir, file));
      const img = await removeBg(buf);
      const trimmed = img.trim({ threshold: 12 });
      const resized = trimmed.resize({ width: 1400, withoutEnlargement: true });
      const outBuf = await resized
        .png({ palette: false, compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
      const tmpFile = outFile + ".tmp";
      fs.writeFileSync(tmpFile, outBuf);
      fs.unlinkSync(outFile);
      fs.renameSync(tmpFile, outFile);
      console.log("OK", id, `${Math.round(outBuf.length / 1024)}KB`);
    } catch (err) {
      console.error("FAIL", id, err.message);
    }
  }
})();
