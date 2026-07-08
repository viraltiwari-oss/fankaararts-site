# Fankaar Institute of Performing Arts — Website

Immersive, mobile-first static site for a Jaipur classical-arts institute. Built to the *Fankaar Website Master Spec v1.0*.

**Stack (zero recurring cost — domain only):** Astro (static) · Sveltia/Decap CMS · Cloudflare Pages · Git backups. No subscriptions.

---

## Quick start (local)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
npm run preview  # preview the production build
```

Requires Node 20+ (see `.nvmrc` → 22).

> **Note on native deps:** the build needs `sharp` (image pipeline) and `@astrojs/compiler`. If an install is interrupted you may see a Sharp/libvips or WASM error — fix with:
> ```bash
> npm install --include=optional sharp
> ```

---

## Project structure

```
src/
  content/            # CMS collections (Markdown + frontmatter)
    branches/         # 5 branches (Malviya Nagar, Tonk Road, Jagatpura, Nirman Nagar, Online)
    courses/          # Kathak, Vocal, Guitar, Keyboard
    workshops/        # empty → site shows graceful empty state
    events/           # recitals/showcases (seeded placeholders)
    accomplishments/  # scholars, results, awards
    blog/             # 3 seed articles
    testimonials/     # empty until real quotes added
    faculty/          # Vartika, Rahul, Mriganki
  data/               # settings.json, home.json, about.json (edited via CMS Global Settings)
  components/         # Header, Footer, cards, EnquiryForm, SEO, schema, image pipeline, etc.
  layouts/            # BaseLayout (SEO, consent-gated analytics, reveal-on-scroll)
  lib/                # site.ts (helpers), schema.ts (JSON-LD builders)
  pages/              # routes (see sitemap below)
  styles/global.css   # design tokens: coral #E66F67 / ink #1A1A1A / blush #FBEBE9, Cormorant + Mukta
public/
  admin/              # Sveltia CMS (config.yml mirrors content collections)
  logo.png, favicon.svg, robots.txt, og-default.png
```

## Routes (§3 sitemap)

`/` · `/about` · `/branches` + `/branches/[slug]` ×5 · `/courses` · `/workshops` · `/events` + `/events/[slug]` · `/accomplishments` · `/blog` + `/blog/[slug]` · `/enquiry` · `/contact` · `/privacy` · `/thank-you` · `/404`

Auto-generated: `sitemap-index.xml`, `robots.txt`.

---

## What's implemented against the spec

- **§2 Design** — full-bleed hero, editorial white/blush bands, brand palette + Cormorant/Mukta, motif dividers, sticky condensing header, mobile menu, persistent WhatsApp float, reveal-on-scroll + soft parallax (all `prefers-reduced-motion` safe), 44px tap targets.
- **§4 Pages** — every page built; branch pages have locality H1s + embedded (keyless) Google Maps + `LocalBusiness` schema.
- **§6 Content model** — all collections + one-screen Global Settings, editable at `/admin`.
- **§7 Media** — build-time Sharp pipeline: every upload → WebP/AVIF + responsive `srcset`; branded placeholders where photos are missing; lazy YouTube/Vimeo facade.
- **§8 SEO** — per-page meta/OG/Twitter, canonical, alt fields, `EducationalOrganization` + `LocalBusiness`×5 + `Course` + `Event` + `Article` + `BreadcrumbList` + `FAQPage` JSON-LD, sitemap, robots.
- **§9 Analytics** — GTM→GA4/Ads + Meta Pixel, **consent-gated** with Google Consent Mode; events: `Lead`, `Contact`, `ViewContent`, `WorkshopRegister`. IDs pasted in Global Settings (no code). Meta CAPI parked by design.
- **§10 Enquiry form** — fields per spec, honeypot, inline validation, WhatsApp deep-link + Web3Forms email, `/thank-you` fires `Lead` once.
- **§11 Performance** — static output, **~4 KB total JS**, WebP/AVIF, responsive images, lazy media, subset fonts. Comfortably inside the Lighthouse 90+ / CWV budget.
- **§12 Accessibility** — skip link, semantic landmarks, focus states, alt text, reduced-motion, keyboard nav.

## Deployment

Push to GitHub → connect repo to **Cloudflare Pages** (build `npm run build`, output `dist`) → add custom domain `fankaararts.com`. Every CMS Publish commits to Git and auto-deploys in ~1 min. Rollback = Git history.

Before launch, edit `public/admin/config.yml` → `backend.repo` to your `user/repo`, and (recommended) protect `/admin` with Cloudflare Access.

## Non-technical handover

See **EDITING-GUIDE.md** — written for a non-developer: editing content, adding workshops, changing tracking IDs, enabling form email, and backups.

---

*Single source of truth: `../Fankaar_Website_Master_Spec.md`.*
