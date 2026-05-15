# ilovepdf.fun

Free PDF tools running entirely in the browser. No server, no uploads, no sign-up.

---

## Stack

- **Next.js 14** (App Router)
- **pdf-lib** — client-side PDF processing
- **Google AdSense** — pre-wired, activate with one line change

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Folder Structure

```
app/
  page.js                    ← Homepage
  layout.js                  ← Global layout + AdSense slot
  globals.css                ← Design system (CSS variables)
  sitemap.js                 ← Auto-generated sitemap for Google
  tools/
    merge/page.js            ← Merge PDFs
    split/page.js            ← Split / extract pages
    compress/page.js         ← Compress PDF
    rotate/page.js           ← Rotate pages
    delete-pages/page.js     ← Delete specific pages
    remove-password/page.js  ← Remove PDF password
  imprint/page.js            ← Legal (required in Germany)
  privacy/page.js            ← Privacy policy

components/
  Providers.js               ← Language context (EN/DE)
  Header.js                  ← Logo + nav + language switcher
  Footer.js                  ← Footer with legal links
  AdBanner.js                ← AdSense wrapper (activate with 1 flag)
  ToolShell.js               ← Shared layout for tool pages

lib/
  i18n.js                    ← All translations (EN + DE)
  pdfHelpers.js              ← All PDF logic (merge, split, compress…)

middleware.js                ← Subdomain routing
```

---

## Activate Google AdSense

1. Apply at adsense.google.com (need imprint + privacy page to be live)
2. Once approved, open `components/AdBanner.js`
3. Set `ADSENSE_ACTIVE = true`
4. Set `PUBLISHER_ID = "ca-pub-XXXXXXXXXXXXXXXX"` (your ID)
5. Replace slot numbers in each tool page
6. Uncomment the `<script>` tag in `app/layout.js`

---

## Add a Language

1. Open `lib/i18n.js`
2. Copy the `en` block, change the key (e.g. `fr`)
3. Translate all values
4. Add to `supportedLangs` array and `langNames` object

---

## Subdomain Setup (optional, after getting traffic)

Each tool can run on its own subdomain: `merge.ilovepdf.fun`, `split.ilovepdf.fun`, etc.

### DNS (at your registrar)

Add these CNAME records:

| Type  | Name         | Value                  |
|-------|--------------|------------------------|
| CNAME | merge        | cname.vercel-dns.com   |
| CNAME | split        | cname.vercel-dns.com   |
| CNAME | compress     | cname.vercel-dns.com   |
| CNAME | rotate       | cname.vercel-dns.com   |
| CNAME | delete-pages | cname.vercel-dns.com   |
| CNAME | unlock       | cname.vercel-dns.com   |

### Vercel

Go to Project → Settings → Domains and add each subdomain.
The routing logic is already in `middleware.js`.

---

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOURNAME/ilovepdf-fun.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import repo → Deploy

# 3. Add your domain: Settings → Domains → ilovepdf.fun
```

---

## Imprint (required for Germany!)

Open `app/imprint/page.js` and fill in your real name and address.
Without this, AdSense may reject your application.

---

## Add More Tools Later

1. Create `app/tools/YOUR-TOOL/page.js`
2. Add the PDF logic to `lib/pdfHelpers.js`
3. Add translations to `lib/i18n.js` (both `en` and `de` blocks)
4. Add to the `TOOLS` array in `app/page.js`
5. Add to `sitemap.js`
6. Optional: add subdomain mapping in `middleware.js`
