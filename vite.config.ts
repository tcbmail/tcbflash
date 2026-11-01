import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { pages } from './scripts/editorial-pages.mjs';

export default defineConfig({
  base: './',
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(page => [page.key, fileURLToPath(new URL(page.output, import.meta.url))])),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    host: '127.0.0.1',
    port: 49817,
    strictPort: true,
  },
});
