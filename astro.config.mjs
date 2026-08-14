// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';

/**
 * Build step: rewrite every internal <a href="/path"> in the output HTML to a
 * trailing slash ("/path/"). The host serves directory-style URLs, so a link
 * without the slash 308-redirects — which is what filled Search Console's
 * "Page with redirect" bucket. Doing it on the built HTML covers ALL links
 * (nav, footer, cards, buttons, data-driven) from one place, and stays correct
 * for any link added later. Skips external URLs, files with extensions,
 * already-slashed paths, anchors keep their #fragment, and /admin is left alone.
 */
function trailingSlashLinks() {
  return {
    name: 'trailing-slash-internal-links',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const fs = await import('node:fs/promises');
        const path = await import('node:path');
        const rx = /href="(\/[a-z0-9][a-z0-9/_-]*)(#[^"]*)?"/gi;
        let changed = 0;
        async function walk(d) {
          for (const entry of await fs.readdir(d, { withFileTypes: true })) {
            if (entry.name === 'admin') continue;
            const p = path.join(d, entry.name);
            if (entry.isDirectory()) { await walk(p); continue; }
            if (!entry.name.endsWith('.html')) continue;
            const html = await fs.readFile(p, 'utf8');
            const out = html.replace(rx, (m, pth, hash) => {
              if (pth.endsWith('/')) return m;
              if (/\.[a-z0-9]+$/i.test(pth)) return m;
              return `href="${pth}/${hash || ''}"`;
            });
            if (out !== html) { await fs.writeFile(p, out); changed++; }
          }
        }
        await walk(fileURLToPath(dir));
        logger.info(`trailing-slash-internal-links: normalized ${changed} HTML file(s)`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://fankaararts.com',
  // The built site is directory-style (/about/index.html) and the host serves
  // /about/ — so declare 'always' to keep links, canonicals and the sitemap
  // consistent with the URLs that are actually served (and already indexed).
  trailingSlash: 'always',
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.includes('/404') &&
        // placeholder content should never be offered to Google
        !page.includes('-placeholder'),
      // Every URL this site serves ends in a slash. Emit exactly that, so the
      // sitemap never hands Google a URL that redirects.
      serialize: (item) => {
        if (!item.url.endsWith('/')) item.url += '/';
        // lastmod on every URL — a fresh recrawl signal to Google each build.
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    trailingSlashLinks(),
  ],
  image: {
    // Sharp is the default service: every image imported through the
    // pipeline is auto-resized + converted to WebP/AVIF at build time (§7).
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
