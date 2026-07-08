// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fankaararts.com',
  trailingSlash: 'never',
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you') && !page.includes('/404'),
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
