/**
 * Normalises project photos into one house style and wires them into the site.
 *
 *   photos-in/<project-id>/*.jpg|jpeg|png|webp   ← put originals here (one folder per project, id from src/data/projects.ts)
 *   photos-in/<project-id>/alt.json              ← optional: { "01-cadru": { "ro": "...", "en": "..." } }
 *   npm run photos
 *
 * Output: public/media/work/<id>/<name>-1080.webp and -640.webp (4:5), plus src/data/photos.json.
 * Style (same as the Radial Cons carousels): warm grade, a little extra contrast, dark gradient at the
 * top and bottom and a soft vignette. Logos, page numbers and captions are NOT added — the website sets
 * its own text in HTML, so it stays readable, translatable and indexable.
 */
import sharp from "sharp";
import { readdir, readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const IN = "photos-in";
const OUT = "public/media/work";
const MANIFEST = "src/data/photos.json";
const W = 1080, H = 1350; // 4:5, like the social posts
const SIZES = [1080, 640];

const shade = (w, h) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121110" stop-opacity=".55"/><stop offset=".26" stop-color="#121110" stop-opacity="0"/></linearGradient>
    <linearGradient id="b" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#121110" stop-opacity=".72"/><stop offset=".44" stop-color="#121110" stop-opacity="0"/></linearGradient>
    <radialGradient id="v" cx=".5" cy=".46" r=".75"><stop offset=".6" stop-color="#121110" stop-opacity="0"/><stop offset="1" stop-color="#121110" stop-opacity=".38"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#t)"/><rect width="100%" height="100%" fill="url(#b)"/><rect width="100%" height="100%" fill="url(#v)"/>
</svg>`);

const manifest = {};
if (!existsSync(IN)) { console.log(`No ${IN}/ folder — nothing to do.`); process.exit(0); }

for (const id of (await readdir(IN, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  const dir = path.join(IN, id);
  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  if (!files.length) continue;
  const alts = existsSync(path.join(dir, "alt.json")) ? JSON.parse(await readFile(path.join(dir, "alt.json"), "utf8")) : {};
  const outDir = path.join(OUT, id);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  manifest[id] = [];
  for (const file of files) {
    const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    const base = await sharp(path.join(dir, file))
      .rotate() // respect phone orientation (EXIF)
      .resize(W, H, { fit: "cover", position: sharp.strategy.attention })
      .recomb([[1.05, 0.02, 0], [0.01, 1.0, 0], [0, 0, 0.92]]) // warm, as in the brandbook photo guide
      .modulate({ saturation: 0.92 })
      .linear(1.08, -8) // slightly more contrast
      .composite([{ input: shade(W, H) }])
      .toBuffer();
    for (const size of SIZES) {
      await sharp(base).resize(size).webp({ quality: 78 }).toFile(path.join(outDir, `${name}-${size}.webp`));
    }
    manifest[id].push({ name, src: `/media/work/${id}/${name}-1080.webp`, srcSm: `/media/work/${id}/${name}-640.webp`, alt: alts[name] ?? null });
    console.log(`✓ ${id}/${file}`);
  }
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${MANIFEST}`);
