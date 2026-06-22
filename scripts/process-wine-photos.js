const fs = require("fs");
const path = require("path");
const https = require("https");
const { execFileSync } = require("child_process");

const winesSrc = fs.readFileSync(path.join(__dirname, "..", "src", "data", "wines.ts"), "utf8");
const blocks = winesSrc.match(/\{[^}]*\}/gs) || [];

const entries = [];
for (const block of blocks) {
  const idMatch = block.match(/id:\s*"([^"]+)"/);
  const photoMatch = block.match(/photo:\s*"(https:[^"]+)"/);
  if (idMatch && photoMatch) {
    entries.push({ id: idMatch[1], url: photoMatch[1] });
  }
}

console.log(`Found ${entries.length} wines with remote photos.`);

const outDir = path.join(__dirname, "..", "public", "photos", "wines");
fs.mkdirSync(outDir, { recursive: true });
const tmpDir = path.join(require("os").tmpdir(), "wine-bg-batch");
fs.mkdirSync(tmpDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

(async () => {
  const mapping = {};
  for (const { id, url } of entries) {
    const tmpFile = path.join(tmpDir, `${id}.src`);
    const outFile = path.join(outDir, `${id}.png`);
    try {
      await download(url, tmpFile);
      execFileSync("node", [path.join(__dirname, "bg-remove.js"), tmpFile, outFile]);
      mapping[id] = `/photos/wines/${id}.png`;
      console.log("OK", id);
    } catch (err) {
      console.error("FAIL", id, err.message);
    }
  }
  fs.writeFileSync(path.join(tmpDir, "mapping.json"), JSON.stringify(mapping, null, 2));
  console.log("Mapping written to", path.join(tmpDir, "mapping.json"));
})();
