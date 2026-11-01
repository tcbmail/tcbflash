import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pages, copyPages, blocksFor, renderBlock, escapeHtml, slug, headingAliases } from './editorial-pages.mjs';

const root = process.cwd();
const essayKeys = ['carmen', 'vision', 'hour'];
const titles = {};
for (const page of copyPages) titles[page.key] = blocksFor(await readFile(path.join(root, 'content', page.file), 'utf8'))[0].slice(2);
const chronologyFile = 'story-chronology.md';
const chronology = blocksFor(await readFile(path.join(root, 'content', chronologyFile), 'utf8'));
function renderCopyBlock(key, block, index, className = '') {
  const aliases = headingAliases[key]?.[slug(block.replace(/^#{1,2} /, ''))] ?? [];
  const html = renderBlock(block, index, className);
  const anchors = aliases.map(id => '<span id="' + id + '" aria-hidden="true"></span>').join('');
  return anchors ? html.replace(/^(<h[12][^>]*>)/, '$1' + anchors) : html;
}
function essayLinks(current = '') {
  return '<nav class="essay-links" id="essays" aria-label="Essays"><p class="label">Essays</p><ul>' + pages.filter(page => essayKeys.includes(page.key) && page.key !== current).map(page => '<li><a href="' + page.path + '">' + escapeHtml(titles[page.key]) + '</a></li>').join('') + '</ul></nav>';
}
function shell(page, body) {
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + escapeHtml(page.title) + '</title>\n<meta name="description" content="' + escapeHtml(page.description) + '">\n<meta name="robots" content="noindex, follow">\n<meta name="theme-color" content="#f7f7f2">\n<link rel="canonical" href="https://tcbflash.com' + page.path + '">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="stylesheet" href="/src/site.css">\n<link rel="preload" href="/assets/fonts/newsreader-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>\n<meta property="og:type" content="website">\n<meta property="og:title" content="' + escapeHtml(page.title) + '">\n<meta property="og:description" content="' + escapeHtml(page.description) + '">\n<meta property="og:url" content="https://tcbflash.com' + page.path + '">\n<meta property="og:image" content="https://tcbflash.com/social-card.jpg">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="Ben Hornung beside a fireplace">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + escapeHtml(page.title) + '">\n<meta name="twitter:description" content="' + escapeHtml(page.description) + '">\n<meta name="twitter:image" content="https://tcbflash.com/social-card.jpg">\n<script type="module" src="/src/site.js"></script>\n</head>\n<body id="page-top" class="' + page.key + '-page">\n<a class="skip-link" href="#main-content">Skip to main content</a>\n<header class="site-header wrap"><a class="wordmark" href="/" aria-label="Ben Hornung, home">Ben Hornung<span>.</span></a><nav class="primary-nav" aria-label="Primary navigation"><a href="/story/"' + (page.key === 'story' ? ' aria-current="page"' : '') + '>My story</a><a href="/writing/"' + (page.key === 'writing' ? ' aria-current="page"' : '') + '>Writing</a><a href="/press/"' + (page.key === 'press' ? ' aria-current="page"' : '') + '>Contact</a></nav></header>\n<main id="main-content">' + body + '</main>\n<footer class="site-footer wrap"><a href="/">Ben Hornung · TCBFlash</a><a href="#page-top">Back to top ↑</a></footer>\n</body>\n</html>\n';
}
function homeBody(blocks) {
  let actions = renderBlock(blocks[3], 3, 'hero-actions').replace('<a href="/story/">', '<a class="primary-link" href="/story/">');
  let html = '<div data-editorial-copy="home"><section class="home-hero wrap"><div class="hero-copy"><p class="role">Founder &amp; CEO of <a href="https://flashforce.ai/">FlashForce</a></p>' + renderBlock(blocks[0], 0) + renderBlock(blocks[1], 1, 'lead') + renderBlock(blocks[2], 2, 'hero-aside') + actions + '</div><figure class="hero-portrait"><img src="/assets/photos/fireplace.webp" width="820" height="886" alt="Ben Hornung in a green shirt beside a fireplace" fetchpriority="high" decoding="async"></figure></section>';
  for (let index = 4; index < blocks.length;) {
    const heading = blocks[index];
    if (!heading.startsWith('## ')) throw new Error('Expected homepage section heading');
    const isOffDuty = heading === '## Away from work';
    html += '<section class="home-section wrap' + (isOffDuty ? ' off-duty' : '') + '">' + renderCopyBlock('home', heading, index++) + '<div class="section-copy">';
    while (index < blocks.length && !blocks[index].startsWith('## ')) html += renderBlock(blocks[index], index++);
    if (isOffDuty) html += '<figure class="river-photo"><img src="/assets/photos/river.webp" width="710" height="776" alt="Ben wearing sunglasses beside a tree-lined river" loading="lazy" decoding="async"><figcaption>Location unspecified.</figcaption></figure>';
    html += '</div></section>';
  }
  return html + '</div><div class="wrap home-essays">' + essayLinks() + '</div>';
}
function articleBody(page, blocks) {
  let html = '<article class="reading-page" data-editorial-copy="' + page.key + '"><p class="label">' + (page.key === 'story' ? 'My story' : page.key === 'press' ? 'Contact' : 'An essay · Ben Hornung') + '</p>';
  for (let index = 0; index < blocks.length; index++) {
    let block = renderCopyBlock(page.key, blocks[index], index, index === 1 ? 'lead' : '');
    if (page.key === 'press' && blocks[index - 1] === '## About Ben') block = block.replace('<p ', '<p id="press-bio" ');
    html += block;
    if (page.key === 'story' && (blocks[index + 1]?.startsWith('## ') || index === blocks.length - 1)) {
      const currentHeading = blocks.slice(0, index + 1).filter(b => b.startsWith('## ')).at(-1);
      if (currentHeading === '## What lasted on the Gulf Coast') html += '<figure class="archive-photo"><img src="/assets/photos/waverly.webp" width="780" height="466" alt="The Waverly name on a tiled property sign" loading="lazy" decoding="async"><figcaption>The Waverly, Bay St. Louis, Mississippi · 2009.</figcaption></figure>';
      if (currentHeading === '## Cars, mostly in pieces') html += '<figure class="archive-photo salvage-photo"><img src="/assets/photos/salvage.webp" width="660" height="880" alt="Ben beside weathered salvage equipment" loading="lazy" decoding="async"><figcaption>In the salvage yard · 2019.</figcaption></figure>';
    }
  }
  if (page.key === 'story') html += '<section class="chronology" data-retained-copy="' + chronologyFile + '">' + chronology.map((block, index) => renderBlock(block, index).replace('data-copy-block=', 'data-retained-block=')).join('') + '</section>';
  if (page.key === 'press') html += '<div class="bio-tools"><button id="copy-bio" type="button" hidden>Copy short bio</button><p id="copy-status" role="status" aria-live="polite"></p></div>';
  return html + '</article><div class="reading-footer"><a href="/">← Back to home</a>' + essayLinks(page.key) + '</div>';
}
function writingBody() {
  return '<article class="reading-page"><p class="label">Ben Hornung</p><h1 id="writing">Writing</h1>' + essayLinks() + '</article><div class="reading-footer"><a href="/">← Back to home</a></div>';
}
for (const page of pages) {
  const blocks = page.file ? blocksFor(await readFile(path.join(root, 'content', page.file), 'utf8')) : [];
  const html = shell(page, page.key === 'home' ? homeBody(blocks) : page.key === 'writing' ? writingBody() : articleBody(page, blocks));
  await mkdir(path.dirname(path.join(root, page.output)), { recursive: true });
  await writeFile(path.join(root, page.output), html);
}
await writeFile(path.join(root, 'public/robots.txt'), 'User-agent: *\nDisallow: /\n');
await writeFile(path.join(root, 'public/sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + pages.map(p => '<url><loc>https://tcbflash.com' + p.path + '</loc></url>').join('') + '</urlset>\n');
console.log('Generated seven static pages: six supplied editorial drafts, a writing index, and the retained Story chronology.');
