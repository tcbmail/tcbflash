import { legacyDestinations } from '../scripts/editorial-pages.mjs';

// Compatibility for old one-page bookmarks. All current navigation is ordinary HTML.
function redirectLegacyBookmark() {
  if (!['/', '/index.html'].includes(window.location.pathname)) return;
  let key;
  try { key = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  const destination = legacyDestinations[key];
  if (destination) window.location.replace(destination);
}
redirectLegacyBookmark();
window.addEventListener('hashchange', redirectLegacyBookmark);

const button = document.querySelector('#copy-bio');
const bio = document.querySelector('#press-bio');
const status = document.querySelector('#copy-status');
if (button && bio && status && navigator.clipboard) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bio.textContent.trim());
      status.textContent = 'Short bio copied.';
    } catch {
      status.textContent = 'Clipboard unavailable. The text above is available to select.';
    }
  });
}
