export const copyPages = [
  { key: 'home', file: '01-home.md', path: '/', output: 'index.html', title: 'Ben Hornung | Founder of FlashForce', description: 'From testing software at Citrix to rebuilding apartments and selling used car parts: Ben Hornung on his work, FlashForce, and what AI could change.' },
  { key: 'story', file: '02-story.md', path: '/story/', output: 'story/index.html', title: 'How I got here | Ben Hornung', description: 'An Iowa computer kid, a Gulf Coast apartment rebuild, and the used parts that brought software into a salvage shop.' },
  { key: 'carmen', file: '03-carmen.md', path: '/carmen/', output: 'carmen/index.html', title: 'The eleven o’clock test | Ben Hornung', description: 'What a weekday brief can tell you about the difference between giving AI a task and giving it a job.' },
  { key: 'vision', file: '04-vision.md', path: '/vision/', output: 'vision/index.html', title: 'Talentless Doesn’t Mean Visionless | Ben Hornung', description: 'What changes when the person who can hear a song finally has a way to let someone else hear it?' },
  { key: 'hour', file: '05-hour.md', path: '/hour/', output: 'hour/index.html', title: 'Who Gets the Hour? | Ben Hornung', description: 'An AI founder on the difference between getting an hour back and losing an hour’s pay.' },
  { key: 'press', file: '06-press.md', path: '/press/', output: 'press/index.html', title: 'Contact & short bio | Ben Hornung', description: 'Contact Ben Hornung, founder and CEO of FlashForce, for interviews, company questions and correspondence.' },
];

export const pages = [...copyPages, {
  key: 'writing', path: '/writing/', output: 'writing/index.html', title: 'Writing | Ben Hornung',
  description: 'Essays by Ben Hornung: The eleven o’clock test, Talentless Doesn’t Mean Visionless, and Who Gets the Hour?',
}];

// Keep direct bookmarks to earlier section headings useful as the supplied copy evolves.
export const headingAliases = {
  home: {
    'the-business-i-have-in-mind': ['the-kind-of-work-i-like', 'why-im-building-flashforce'],
    'what-im-thinking-about': ['what-i-think-ai-changes'],
    'away-from-work': ['away-from-the-keyboard'],
  },
  story: {
    'liking-computers-and-liking-the-computer-business': ['the-computer-years'],
    'what-lasted-on-the-gulf-coast': ['the-severance-check-and-the-kitchen-sink'],
    'cars-mostly-in-pieces': ['the-cars-were-worth-more-to-me-in-pieces'],
    'why-i-came-back': ['coming-back'],
  },
  press: { 'about-ben': ['short-bio'], 'about-flashforce': ['company-in-one-sentence'] },
};

export const destinations = Object.fromEntries(pages.map(page => [page.key, page.path]));
export const legacyDestinations = {
  ...destinations,
  top: '/', about: '/#the-kind-of-work-i-like', work: '/#why-im-building-flashforce',
  beliefs: '/#what-i-think-ai-changes', history: '/story/#a-few-dates',
  contact: '/press/', chronology: '/story/#a-few-dates',
  'hero-title': '/', 'about-title': '/#the-kind-of-work-i-like',
  'now-title': '/#why-im-building-flashforce', 'beliefs-title': '/#what-i-think-ai-changes',
  'through-line-title': '/story/', 'early-title': '/story/#the-computer-years',
  'physical-title': '/story/#the-severance-check-and-the-kitchen-sink',
  waverly: '/story/#the-severance-check-and-the-kitchen-sink',
  junkyarder: '/story/#the-cars-were-worth-more-to-me-in-pieces',
  'parts-title': '/story/#the-cars-were-worth-more-to-me-in-pieces',
  'return-title': '/story/#coming-back', 'history-title': '/story/#a-few-dates',
  'selected-title': '/story/', 'off-clock-title': '/#away-from-the-keyboard',
  'contact-title': '/press/', 'writing-title': '/writing/',
};

export const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const blocksFor = markdown => markdown.trim().split(/\r?\n\s*\r?\n/).map(block => block.replace(/\r?\n/g, ' '));
export const slug = text => text.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function inline(text) {
  return escapeHtml(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
    const href = target.startsWith('#') ? destinations[target.slice(1)] : target;
    if (!href || !/^(\/|https:\/\/flashforce\.ai\/|mailto:info@tcbflash\.com$)/.test(href)) throw new Error('Unexpected editorial link: ' + target);
    return '<a href="' + href + '">' + label + '</a>';
  }).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
export function renderBlock(block, index, className = '') {
  const heading = block.match(/^(#{1,2}) (.+)$/);
  const attrs = ' data-copy-block="' + index + '"' + (className ? ' class="' + className + '"' : '');
  if (heading) return '<h' + heading[1].length + attrs + ' id="' + slug(heading[2]) + '">' + inline(heading[2]) + '</h' + heading[1].length + '>';
  return '<p' + attrs + '>' + inline(block) + '</p>';
}
export const plainBlock = block => block.replace(/^#{1,2} /, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
