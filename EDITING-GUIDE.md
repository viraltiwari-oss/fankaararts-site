# Fankaar Website — Editing & Handover Guide

A plain-English guide for running your website with **no developer** and **no monthly cost**. Keep this file; it answers the questions in the spec's handover checklist (§13, §16).

---

## 1. The big picture (how this works)

Your site is a set of files that live in one place: a **GitHub repository** (a free, versioned folder in the cloud). Two things read from it:

- **The website** — hosted free on **Cloudflare Pages**, rebuilt automatically ~1 minute after any change.
- **The editor** — a friendly dashboard at **yoursite.com/admin** where you edit text, photos, branches, courses, workshops, blogs and events through simple forms, then press **Publish**.

You never touch code. You log into `/admin`, make a change, press Publish, and the live site updates itself.

**The only bill you will ever get is the domain name (~₹900/year).** Hosting, the editor, image optimisation, forms and backups are all free.

---

## 2. First-time setup (one-time, ~30–45 min)

Do these once. If you'd rather, hand this section to any tech-savvy friend — it needs no coding, just clicking.

1. **Create a GitHub account** (free) at github.com.
2. **Create a repository** named `fankaararts-site` and upload the contents of this `fankaararts-site` folder (or ask your developer to `git push` it).
3. **Open** `public/admin/config.yml` and change the line `repo: your-github-username/fankaararts-site` to your real GitHub username.
4. **Connect Cloudflare Pages** (free) at pages.cloudflare.com → "Connect to Git" → pick your repo. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
5. **Connect your domain** `fankaararts.com` in Cloudflare Pages → Custom domains → follow the two DNS records it shows. Free SSL turns on automatically.
6. **Turn on the editor login:** in Cloudflare Pages, enable **Cloudflare Access** on the `/admin` path (or use GitHub login) so only you can edit. (Your developer can do this in 5 minutes — see README.)

That's it. From now on you only use `/admin`.

---

## 3. Editing content (the everyday part)

Go to **fankaararts.com/admin** and log in. You'll see a menu on the left:

| Section | What it controls |
|---|---|
| ⚙️ **Global Settings** | Phone, WhatsApp, email, social links, **all tracking IDs**, the form key, homepage & about-page text |
| 📍 **Branches** | Each branch page — address, timings, courses, photos |
| 🎓 **Courses** | Kathak, Vocal, Guitar, Keyboard details & levels |
| 🗓️ **Workshops** | Add/remove workshops (see below) |
| 🎭 **Events Library** | Past recitals & showcases with photo galleries |
| 🏆 **Accomplishments** | Scholars, awards, results, milestones |
| ✍️ **Blog** | Articles |
| 💬 **Testimonials** | Quotes (appear on the homepage once added) |
| 👤 **Faculty** | Teacher profiles |

**To edit anything:** click the section → click the entry (or "New") → change the fields → **Publish**. The live site updates in about a minute.

### Adding a workshop (example)
1. Click **🗓️ Workshops → New Workshop**.
2. Fill in title, start date/time, mode (In-person/Online), venue, fee.
3. (Optional) add an image and a registration link — leave the link blank to use WhatsApp automatically.
4. **Publish.** It appears under "Upcoming workshops" on the site and on the homepage. After its date passes, it moves to the "Past workshops" archive automatically. When there are no upcoming ones, the site shows a friendly "No workshops scheduled — message us" note by itself.

### Adding photos to an event
1. **🎭 Events Library →** open the event (or New).
2. Use the **Photo gallery** field to upload images — any size, even straight from a phone. They're automatically shrunk, converted to fast WebP/AVIF and made responsive. You do nothing.
3. Untick **Placeholder**. **Publish.**

---

## 4. Changing tracking IDs (GA4, GTM, Meta Pixel, Google Ads)

All tracking IDs live in **one screen**: ⚙️ **Global Settings → Site & Contact → Tracking IDs**. Paste the ID, press Publish. No code, no developer.

- **GTM ID** (`GTM-XXXX`) — recommended hub; put GA4, Ads and the Pixel inside your GTM container.
- **GA4 ID** (`G-XXXX`) — if you don't use GTM, paste this and GA4 loads directly.
- **Meta Pixel ID** — paste to enable the Pixel. *(Conversions API is intentionally parked per your plan — it can be layered on later via server-side GTM without any rebuild.)*
- **Google Ads ID** / **Search Console token** — same screen.

Nothing loads until (a) an ID is filled **and** (b) the visitor accepts cookies — so your site is privacy-safe and fast by default (Google Consent Mode is built in).

**Conversions already wired for you:** enquiry form = `Lead`, WhatsApp click = `Contact`, course/branch views = `ViewContent`, workshop register = `WorkshopRegister`.

---

## 5. Turning on email for the enquiry form

Until you add a form key, every enquiry still works — it opens WhatsApp pre-filled, so nothing is lost. To also receive enquiries by **email**:

1. Get a free key at **web3forms.com** (enter your email `art.fankar@gmail.com`, they email you an access key).
2. ⚙️ **Global Settings → Enquiry form → Web3Forms access key** → paste → Publish.

Now every enquiry emails you **and** the visitor gets a thank-you page. Free tier is plenty for a site like this.

---

## 6. Backups (automatic and free)

**Your backup is built in.** Every edit is saved forever in GitHub's history. To undo any change — even months later — open the repo on GitHub, view history, and restore. Nothing to schedule, nothing to pay. You can also download the whole site as a ZIP from GitHub any time.

---

## 7. What the site still needs from you (to reach its full potential)

The site is live-ready now with sensible placeholders. Replacing these lifts it from good to stunning:

**Photos & video (biggest impact — this is what makes it feel premium):**
- 15–25 high-res photos: classes in action, recitals, the founder teaching, each branch inside/outside, students mid-pose.
- 2–3 short clips: a recital, a class, a founder intro (upload to YouTube/Vimeo unlisted, paste the link into an event).
- Any past-event photos for the Events Library.

**Data still marked ‹ADD›/‹PLACEHOLDER› in the CMS:**
- Jagatpura full address.
- Hindustani vocal exact levels; confirm online-class platform & timings.
- Faculty bios & credentials (Vartika, Rahul, Mriganki).
- Real accomplishments: CCRT scholar names/years, award names, press links, notable exam results.
- Testimonials (2–4 short quotes from parents/students).
- Decide: show fees, or keep "on enquiry" (currently "on enquiry").

**Accounts/links:**
- Facebook page URL, YouTube channel URL → paste into Global Settings → Social.
- Confirm domain `fankaararts.com`.

Everywhere a photo is missing, the site shows a tasteful on-brand placeholder — never a broken image — so you can launch now and add media over time.

---

## 8. Quick reference

- **Edit content:** fankaararts.com/admin
- **See changes live:** ~1 minute after Publish
- **Undo / backup:** GitHub → repo history
- **Only cost:** domain (~₹900/yr)
- **Contact wired everywhere:** WhatsApp 7976014592 · art.fankar@gmail.com

Questions your developer can answer fast are in `README.md` (technical setup, local preview, deployment).
