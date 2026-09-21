// Facebook-forrásképek optimalizálása a public/img alá.
// Futtatás: node scripts/prep-images.mjs
import sharp from "sharp";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";

const SRC = "source-assets/fb";
const files = readdirSync(SRC);
const byIndex = (i, j = 0) => {
  const f = files.find((n) => n.startsWith(`${String(i).padStart(3, "0")}_${j}_`));
  if (!f) throw new Error(`nincs kép #${i}`);
  return `${SRC}/${f}`;
};

mkdirSync("public/img/site", { recursive: true });
mkdirSync("public/img/gallery", { recursive: true });
mkdirSync("public/img/posters", { recursive: true });

async function out(src, dest, { width = 1600, height, quality = 82, extract, fit = "inside" } = {}) {
  let img = sharp(src).rotate();
  if (extract) img = img.extract(extract);
  img = img.resize({ width, height, fit, withoutEnlargement: true });
  const info = await img.webp({ quality }).toFile(dest);
  return { w: info.width, h: info.height };
}

// ---- Logó: fehér háttér → alfa ------------------------------------------
// A logó fehér alapon van; a fehértől mért színtávolságból lesz az alfa, majd
// a színt "unpremultiply"-oljuk, hogy az élek ne legyenek fehéren szegettek.
async function keyLogo(src, dest, size) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8Array(data);
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const d = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
    const a = Math.min(1, d / 110);
    if (a <= 0) { px[i + 3] = 0; continue; }
    px[i] = Math.max(0, Math.min(255, (r - 255 * (1 - a)) / a));
    px[i + 1] = Math.max(0, Math.min(255, (g - 255 * (1 - a)) / a));
    px[i + 2] = Math.max(0, Math.min(255, (b - 255 * (1 - a)) / a));
    px[i + 3] = Math.round(a * 255);
  }
  // 1 px-es alfa-erózió: a JPEG-artefaktumos világos szegély eltűnik
  const W = info.width, H = info.height;
  const alpha = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) alpha[i] = px[i * 4 + 3];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let m = 255;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const yy = y + dy, xx = x + dx;
      const v = yy < 0 || yy >= H || xx < 0 || xx >= W ? 0 : alpha[yy * W + xx];
      if (v < m) m = v;
    }
    px[(y * W + x) * 4 + 3] = m;
  }
  await sharp(Buffer.from(px), { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 5 })
    .resize({ width: size, height: size, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(dest);
}
await keyLogo(byIndex(24), "public/img/logo.png", 800);
await keyLogo(byIndex(24), "public/img/logo-256.png", 256);

// ---- Oldal-képek ----------------------------------------------------------
const site = {
  "gym-treadmill": [35, { width: 1800 }],   // tornaterem tükörrel, futópad
  "gym-balls": [31, { width: 1800 }],       // bordásfal, labdák
  "gym-wall": [25, { width: 1600 }],        // bordásfal + ágy
  "treatment": [33, { width: 1800 }],       // kezelőszék, triggerpont-térkép
  "waiting": [32, { width: 1800 }],         // váró fotelekkel
  "device": [30, { width: 1600 }],          // BTL készülékek
  "reception": [34, { width: 1200 }],       // recepció oklevelekkel
  "shock-photo": [0, { extract: { left: 560, top: 0, width: 520, height: 900 }, width: 1200 }], // lökéshullám-plakát fotórésze
  "tr-photo": [2, { extract: { left: 668, top: 0, width: 412, height: 700 }, width: 1200 }],    // TR therapy plakát fotórésze
  "andrea": [29, { extract: { left: 66, top: 372, width: 200, height: 292 }, width: 400 }],
};
const siteMeta = {};
for (const [name, [idx, opt]] of Object.entries(site)) {
  siteMeta[name] = await out(byIndex(idx), `public/img/site/${name}.webp`, opt);
}

// ---- Galéria ----------------------------------------------------------------
const gallery = [
  [35, "Tornaterem futópaddal és tükörfallal"],
  [31, "Bordásfal, fitneszlabdák és eszközök"],
  [33, "Kezelőhelyiség triggerpont-térképpel"],
  [32, "Váró és öltözőfülkék"],
  [30, "BTL fizikoterápiás készülékek"],
  [34, "Recepció és oklevelek"],
  [25, "Kezelőágy a tornateremben"],
  [40, "Tornaterem bordásfallal"],
];
const galleryMeta = [];
for (const [idx, alt] of gallery) {
  const src = byIndex(idx);
  const name = `g-${String(idx).padStart(3, "0")}`;
  const full = await out(src, `public/img/gallery/${name}.webp`, { width: 1800, quality: 82 });
  await out(src, `public/img/gallery/${name}-thumb.webp`, { width: 800, quality: 78 });
  galleryMeta.push({ name, alt, ...full });
}

// ---- Plakátok (csoportos órák + kezelések) ---------------------------------
const posters = [
  [3, "senior", "Senior torna"],
  [4, "gyerek", "Tartásjavító gerinctorna gyerekeknek"],
  [5, "core", "Balance Gerinc/Core"],
  [6, "osteo", "Osteoporosis mozgásprogram"],
  [7, "mobilitas", "Balance Mobilitás"],
  [8, "45plus", "Erőben a 45+"],
  [0, "lokeshullam", "Lökéshullám-terápia"],
  [2, "tr", "TR Therapy"],
  [1, "mozgasban", "Mozgásban maradni minden életkorban"],
];
const posterMeta = {};
for (const [idx, name, alt] of posters) {
  posterMeta[name] = { alt, ...(await out(byIndex(idx), `public/img/posters/${name}.webp`, { width: 1080, quality: 80 })) };
}

// ---- OG kép ----------------------------------------------------------------
await sharp(byIndex(35))
  .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og.jpg");

writeFileSync(
  "lib/images.ts",
  `// GENERÁLT FÁJL – scripts/prep-images.mjs
export const siteImages = ${JSON.stringify(siteMeta, null, 2)} as const;
export const galleryImages = ${JSON.stringify(galleryMeta, null, 2)} as const;
export const posterImages = ${JSON.stringify(posterMeta, null, 2)} as const;
`
);
console.log("kész:", Object.keys(siteMeta).length, "oldal-kép,", galleryMeta.length, "galéria,", Object.keys(posterMeta).length, "plakát");
