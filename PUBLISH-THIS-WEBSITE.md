# How to Put Your Website on the Internet

Written super-simply. No coding. Just clicking and dragging. Take your time — you can't break anything.

**A few words first (so nothing sounds scary):**
- **Website files** = the `fankaararts-site` folder on your computer. That's your whole website.
- **A host** = a company whose computers show your website to the world, for free. We'll use **Netlify**.
- **A domain** = your website's name, like `fankaararts.com`. Optional, and you can add it later.

There are **two ways** below. Do **Way 1** first to see your site live in 5 minutes and feel good. Do **Way 2** when you're ready for the real, permanent version you can edit yourself.

---

## ⭐ Way 1 — See your website LIVE in 5 minutes (the quick peek)

This puts your site online at a free address like `fankaar-arts.netlify.app`. Great for showing people right away.

1. On your computer, open the folder:
   **Documents → Claude → Projects → Fankaar Institute of performing arts → fankaararts-site**
   Inside it you'll see a folder named **`dist`**. That folder *is* your finished website.

2. Open your web browser (Chrome) and go to: **https://app.netlify.com/drop**

3. You'll see a big dotted box that says *"Drag and drop your site folder here."*

4. Drag the **`dist`** folder from step 1 and **drop it into that box**. (Click and hold the folder, move it onto the box, let go.)

5. Wait about 20 seconds. Netlify will show a link at the top like `https://something-random.netlify.app`. **Click it — that's your website, live on the internet!** 🎉

6. To keep it (so the link doesn't disappear): it will ask you to **sign up** — use "Sign up with email," it's free. Done.

> That's a real, live preview. The only thing it *can't* do yet is let you edit the site from a dashboard — for that, do Way 2. (If the box says a file is too big or gets stuck, just tell me and I'll help.)

---

## 🏠 Way 2 — The proper home (so you can EDIT it yourself + use your own name)

This is the real setup. It takes about 20–30 minutes, all clicking. After this, whenever a change is made, your live site updates itself in about a minute.

We use two free things: **GitHub** (a safe locker that stores your website files and remembers every version) and **Netlify** (shows it to the world).

### Part A — Make a free GitHub locker for your files

1. Go to **https://github.com** and click **Sign up**. Make a free account (email + password). Write down your username — you'll need it.

2. Once logged in, click the **+** at the top-right → **New repository**.
   - **Repository name:** type `fankaararts-site`
   - Leave everything else as-is, make sure **Public** is selected.
   - Click **Create repository**.

3. On the next page you'll see a link that says **"uploading an existing file"** — click it.

4. Now open your `fankaararts-site` folder on your computer. Select **everything inside it** (click one file, then press **Ctrl + A** to select all), and **drag it all into the GitHub upload box** in the browser. Wait for the files to finish uploading (a minute or two).

5. Scroll down and click the green **Commit changes** button. Your files are now safely in GitHub. ✅

### Part B — Connect Netlify to show it to the world

6. Go to **https://app.netlify.com** and sign up (choose **"Sign up with GitHub"** — easiest, it links the two for you).

7. Click **Add new project** → **Import an existing project** → **Deploy with GitHub**.

8. It may ask permission to see your GitHub — click **Authorize**. Then pick your **`fankaararts-site`** repository from the list.

9. Netlify will show build settings. It should already say:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   If those are filled in, great. If not, type them in exactly as above.

10. Click **Deploy**. Netlify now builds your site (takes 1–2 minutes). When it's done, you'll get your live link like `fankaararts.netlify.app`. **That's your website — live and permanent.** 🎉

> From now on, any change saved in GitHub makes your live site rebuild by itself in about a minute. You never touch this again.

---

## 🌐 Optional — Use your own name (fankaararts.com)

Do this whenever you like; the site works fine without it.

1. Buy the domain `fankaararts.com` from any seller (GoDaddy, Namecheap, or Cloudflare — about ₹800–1,200 per year). This is the **only** thing this website ever costs.
2. In Netlify, open your site → **Domain management** → **Add a custom domain** → type `fankaararts.com`.
3. Netlify shows you 1–2 small settings to paste at the place you bought the domain. Copy-paste them there.
4. Wait a little while (can be a few hours). Your site now lives at your own name, with the padlock (secure) added automatically and free.

*(Tell me when you're here and I'll walk you through the exact copy-paste — it's the one slightly fiddly bit.)*

---

## ✏️ Turning on the "edit it yourself" dashboard (/admin)

Once Way 2 is done, your site can have a private dashboard at `yoursite.com/admin` where you change text and photos with simple forms. Setting up its **login** is the one part that's a little technical — **don't worry about it now.** When you've finished Way 2, just message me and I'll set the login up **with you**, step by step. Until then, everything on the site already shows correctly with the content that's in it.

---

## If something goes wrong

- **The drag-drop box won't take my folder (Way 1):** make sure you're dropping the folder named `dist`, not the whole `fankaararts-site` folder.
- **A Netlify build failed (Way 2):** don't worry — copy the red error text, paste it to me, and I'll tell you the one thing to fix. (Usually it's nothing you did.)
- **I'm stuck on any screen:** tell me which website you're on and what you see, and I'll tell you the exact next click.

You've got this. Way 1 alone will have your website live today. 💐
