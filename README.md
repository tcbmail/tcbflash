# TCBFlash.com

Benjamin Hornung’s static personal site and career archive.

## Local development

Requires Node.js 20.19 or newer.

```sh
npm ci
npm run dev
```

Production checks:

```sh
npm run lint
npm run build
```

The site ships as semantic HTML and CSS with no client-side application runtime. Documentary photo metadata is centralized in `public/assets/photos/manifest.json`; source images can be added there later without changing the site’s information architecture.
