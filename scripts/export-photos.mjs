import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/export-photos.mjs <approved handoff images directory>');
await mkdir('public/assets/photos', { recursive: true });
for (const name of ['fireplace.webp', 'river.webp', 'salvage.webp', 'waverly.webp']) {
  await copyFile(path.join(source, name), path.join('public/assets/photos', name));
}
await copyFile('node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2', 'public/assets/fonts/newsreader-latin-wght-italic.woff2');
// The selected image is copied unchanged for layout. Only this sharing card is composed.
const portrait = await sharp(path.join(source, 'fireplace.webp')).resize({ width: 520, withoutEnlargement: true }).toBuffer();
const meta = await sharp(portrait).metadata();
const title = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f7f2"/><g fill="#25332e" font-family="sans-serif"><text x="55" y="85" font-size="23">TCBFlash.</text><text x="55" y="260" font-size="76">Ben</text><text x="55" y="345" font-size="76">Hornung</text><text x="55" y="420" font-size="25">Founder &amp; CEO of FlashForce</text><text x="55" y="550" font-size="22">Work, ideas, and what comes next.</text></g></svg>');
await sharp(title).composite([{ input: portrait, left: 640, top: Math.round((630 - meta.height) / 2) }])
  .jpeg({ quality: 88, mozjpeg: true }).toFile('public/social-card.jpg');
console.log('Copied the four approved web images unchanged; composed social card from the supplied web-size portrait.');
