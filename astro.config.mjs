// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
        return item;
      },
    }),
  ],
  image: {
    // Sharp is the default service: every image imported through the
    // pipeline is auto-resized + converted to WebP/AVIF at build time (§7).
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
