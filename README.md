# Cathcart Group — Website Revamp

A complete, modern rebuild of [cathcartgroup.com](https://www.cathcartgroup.com/) as a fast, dependency-free static site. Pure HTML/CSS/JS — no build step, no framework, nothing to install.

## What's inside

- **28 pages** — Home, About/History, Leadership, Culture & Values, In the Community, Life at Cathcart, Development, Construction, Property Management, Investment Partners, Communities (+ 8 individual community pages), Upcoming Developments, Press Room, Awards, Careers, Contact, Privacy Policy, Equal Housing, Cathcart Club, and a 404 page.
- **Brand-faithful design** — deep navy (`#062439`), white, and a refined bronze accent, with the Marcellus display serif used by the current brand and the original logo, photography, and hero video.
- **Fully responsive** — mobile-first layout, slide-in navigation, fluid type; works on phones, tablets, and desktops.
- **SEO** — unique titles/descriptions per page, canonical URLs, Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, semantic HTML5, descriptive alt text, lazy-loaded images.
- **AEO** (answer engines) — FAQ sections with `FAQPage` JSON-LD, `Organization`, `WebSite`, `BreadcrumbList`, `ApartmentComplex`, `ItemList`, and `ContactPage` structured data.
- **GEO** — `llms.txt` for AI/generative engines, plus geographic meta tags (`geo.region`, `geo.position`, ICBM) and full NAP (name/address/phone) consistency for local search.
- **Accessible** — skip links, ARIA labels, keyboard-friendly menus, visible focus states, `prefers-reduced-motion` support.

## Deploy a preview on GitHub Pages (2 minutes)

1. Create a new repository on GitHub (e.g. `cathcart-website`).
2. Upload **every file** in this folder to the repository root: *Add file → Upload files*, then select ALL files and drop them in. Every file is flat (no subfolders), so nothing can get lost in upload. `index.html` must end up at the repo root.
3. In the repo: **Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / root → Save**.
4. Your preview goes live at `https://<your-username>.github.io/<repo-name>/` within a minute or two. After it deploys, hard-refresh (Ctrl/Cmd+Shift+R) to bypass any cached unstyled version.

All internal links are relative, so the site works at any URL — GitHub Pages, Netlify, Vercel, or the production domain.

## Important: images & videos are currently hotlinked

Every image and the homepage hero video load **directly from the live cathcartgroup.com server**, so the preview looks right immediately with zero extra steps.

Before going to production (or to make the repo self-contained), run once from the repo root on your machine:

```bash
bash localize-assets.sh
```

This downloads all 124 assets into `assets/` and rewrites the HTML to use the local copies. (This couldn't be done automatically in the sandbox this site was built in — outbound downloads from cathcartgroup.com were blocked.)

## Activating the contact form

The contact form is display-only until you connect a backend (static sites can't send email by themselves). Easiest option — [Formspree](https://formspree.io) (free tier available):

1. Create a form at formspree.io → copy your endpoint (`https://formspree.io/f/XXXXXXXX`).
2. In `contact.html`, replace `action="#"` with your endpoint and remove the `data-demo-form` attribute.

Netlify Forms or any custom endpoint work the same way.

## Going to production on cathcartgroup.com

- Canonical URLs, `sitemap.xml`, and JSON-LD already point at `https://www.cathcartgroup.com/` with the current WordPress permalink paths, so search equity is preserved. If final URLs differ, set up 301 redirects.
- Press Room article links intentionally point to the existing articles on the live site (those 44 posts weren't rebuilt as pages). Keep them, or migrate the posts and update `press-room.html`.
- The current site's Google Tag Manager container is `GTM-5SJFM87` — re-add its snippet if you want analytics continuity.

## Structure

```
├── index.html …………… homepage (+ 27 more pages)
├── styles.css ………… entire design system
├── main.js ……………… nav, scroll reveals, counters, form UX
├── sitemap.xml / robots.txt / llms.txt
├── 404.html / .nojekyll
├── assets-manifest.txt …… every remote asset URL
└── localize-assets.sh …… download assets + rewrite HTML (run once, locally)
```
All files intentionally live at the root — no subfolders — so uploads via the GitHub web interface can never drop them.

To change brand colors, edit the CSS variables at the top of `styles.css`.
