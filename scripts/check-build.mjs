import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
import { pages, blocksFor, plainBlock, legacyDestinations, escapeHtml, headingAliases } from './editorial-pages.mjs';

const root = path.resolve('dist');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const integrity = JSON.parse(await readFile('content/editorial-integrity.json', 'utf8'));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const decode = text => text.replace(/<[^>]*>/g, '').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"');
const pageHtml = new Map();
const titles = new Set();
let checkedBlocks = 0;
let checkedPaths = 0;

for (const page of pages) {
  const markdownBytes = page.file ? await readFile(path.join('content', page.file)) : null;
  if (markdownBytes) assert.equal(hash(markdownBytes), integrity.copy[page.file], 'Supplied copy changed: ' + page.file);
  const expected = markdownBytes ? blocksFor(markdownBytes.toString('utf8')).map(plainBlock) : [];
  const html = await readFile(path.join(root, page.output), 'utf8');
  pageHtml.set(page.path, html);
  const actual = [...html.matchAll(/<(h1|h2|p)\b[^>]*data-copy-block="(\d+)"[^>]*>([\s\S]*?)<\/\1>/g)];
  assert.equal(actual.length, expected.length, 'Missing copy block: ' + page.key);
  for (let index = 0; index < expected.length; index++) {
    assert.equal(Number(actual[index][2]), index);
    assert.equal(normalize(decode(actual[index][3])), normalize(expected[index]), 'Copy mismatch: ' + page.key + '/' + index);
    checkedBlocks++;
  }
  const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
  assert.equal(title, page.title);
  assert(!titles.has(title), 'Duplicate title');
  titles.add(title);
  assert.equal(html.match(/name="description" content="([^"]+)"/)[1], escapeHtml(page.description), 'Incorrect page description');
  assert(html.includes('<link rel="canonical" href="https://tcbflash.com' + page.path + '">'), 'Incorrect canonical URL');
  assert(/name="robots" content="noindex, follow"/.test(html), 'Draft indexing guard missing');
  assert(!/Download portrait|cleared for use|beautifulbullshit\.com|datePublished|private-review|ben-hornung-portrait-2019/i.test(html));
  for (const aliases of Object.values(headingAliases[page.key] ?? {})) {
    for (const alias of aliases) assert(html.includes('id="' + alias + '"'), 'Old section anchor missing: ' + alias);
  }
}

for (const [file, expectedHash] of Object.entries(integrity.retainedCopy)) {
  const bytes = await readFile(path.join('content', file));
  assert.equal(hash(bytes), expectedHash, 'Retained chronology changed');
  const expected = blocksFor(bytes.toString('utf8')).map(plainBlock);
  const actual = [...pageHtml.get('/story/').matchAll(/<(h2|p)\b[^>]*data-retained-block="(\d+)"[^>]*>([\s\S]*?)<\/\1>/g)];
  assert.deepEqual(actual.map(block => normalize(decode(block[3]))), expected.map(normalize));
  assert(pageHtml.get('/story/').indexOf('data-retained-copy=') > pageHtml.get('/story/').lastIndexOf('data-copy-block='));
}
for (const route of ['/carmen/', '/vision/', '/hour/']) assert(pageHtml.get('/writing/').includes('href="' + route + '"'), 'Writing index missing essay');

for (const page of pages) {
  const html = pageHtml.get(page.path);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith('mailto:')) { assert.equal(value, 'mailto:info@tcbflash.com'); continue; }
    if (value.startsWith('https://')) { assert(['https://flashforce.ai/', 'https://tcbflash.com' + page.path].includes(value), 'Unexpected external destination'); continue; }
    const url = new URL(value, 'https://tcbflash.com' + page.path);
    let target = path.join(root, url.pathname);
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert((await stat(target)).isFile(), 'Missing destination: ' + page.path + ' -> ' + value);
    if (url.hash) {
      const destination = await readFile(target, 'utf8');
      assert(destination.includes('id="' + url.hash.slice(1) + '"'), 'Missing anchor: ' + value);
    }
    checkedPaths++;
  }
  for (const imageTag of html.matchAll(/<img\b[^>]+>/g)) {
    const src = imageTag[0].match(/src="([^"]+)"/)[1];
    const imagePath = path.join(root, new URL(src, 'https://tcbflash.com' + page.path).pathname);
    const meta = await sharp(imagePath).metadata();
    assert.equal(Number(imageTag[0].match(/width="(\d+)"/)[1]), meta.width);
    assert.equal(Number(imageTag[0].match(/height="(\d+)"/)[1]), meta.height);
  }
}
for (const [oldHash, target] of Object.entries(legacyDestinations)) {
  const url = new URL(target, 'https://tcbflash.com');
  const html = pageHtml.get(url.pathname);
  assert(html, 'Legacy destination missing: ' + oldHash);
  if (url.hash) assert(html.includes('id="' + url.hash.slice(1) + '"'), 'Legacy anchor missing: ' + oldHash);
}
const images = (await readdir(path.join(root, 'assets/photos'))).sort();
assert.deepEqual(images, Object.keys(integrity.images).sort(), 'Unexpected layout media in deployable tree');
for (const [name, expectedHash] of Object.entries(integrity.images)) {
  const file = path.join(root, 'assets/photos', name);
  assert.equal(hash(await readFile(file)), expectedHash, 'Supplied image changed: ' + name);
  const metadata = await sharp(file).metadata();
  assert(!metadata.exif && !metadata.xmp && !metadata.iptc, 'Private image metadata');
}
const allFiles = await readdir(root, { recursive: true });
for (const file of allFiles) {
  const absolute = path.join(root, file);
  if (!(await stat(absolute)).isFile()) continue;
  assert(!/\.(zip|md|map|env|log|png)$/i.test(file), 'Private/source artifact in build: ' + file);
  assert(!/START-HERE|NOTES|Reading-Edition|private-review|fireplace-review|river-review|IMG_\d/i.test(file));
  if (/\.(jpe?g|webp)$/i.test(file)) assert(file.replaceAll('\\', '/') === 'social-card.jpg' || file.replaceAll('\\', '/').startsWith('assets/photos/'));
  if (file.endsWith('.css')) {
    const css = await readFile(absolute, 'utf8');
    for (const font of css.matchAll(/url\(([^)]+)\)/g)) assert((await stat(path.resolve(path.dirname(absolute), font[1].replace(/["']/g, '')))).isFile());
  }
}
const social = await sharp(path.join(root, 'social-card.jpg')).metadata();
assert.equal(social.width, 1200); assert.equal(social.height, 630);
assert(pageHtml.get('/press/').includes('id="press-bio"'), 'Selectable short bio missing');
assert(!(await readdir(path.join(root, 'press'))).some(file => file !== 'index.html'), 'Standalone press asset in build');
console.log(JSON.stringify({ result: 'PASS', pages: pages.length, verbatimCopyBlocks: checkedBlocks, ordinaryLinkAndAssetPaths: checkedPaths, legacyBookmarks: Object.keys(legacyDestinations).length, unchangedSuppliedImages: images.length, unapprovedEditorialDrafts: true }));
