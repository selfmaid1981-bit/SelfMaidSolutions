# Self-Maid LLC — Full-Stack Website v2.0
**Replit-Ready · Mobile-First · Performance Optimised**

---

## 🚀 Deploy on Replit in 5 Minutes

### Step 1 — Upload files
In Replit, create a new **Node.js** Repl, then upload all files maintaining this structure:
```
selfmaid/
├── server.js
├── package.json
├── .replit
├── .env.example
└── public/
    ├── index.html
    ├── styles.css
    └── script.js
```

### Step 2 — Install dependencies
In the Replit Shell tab, run:
```bash
npm install
```

### Step 3 — Configure email (Secrets tab 🔒)
Click the **padlock icon** in Replit's sidebar and add these secrets:
```
SMTP_HOST      = smtp.gmail.com
SMTP_PORT      = 587
SMTP_USER      = your-gmail@gmail.com
SMTP_PASS      = your-16-char-app-password
OWNER_EMAIL    = selfmaidclean@outlook.com
PORT           = 3000
```
> **Gmail App Password:** Go to myaccount.google.com → Security → 2-Step Verification → App passwords → Generate one for "Mail"

### Step 4 — Start the server
```bash
npm start
```
Or click the green **Run** button. Your site is live at your Replit URL.

---

## ✅ All Fixes Applied

### 🔴 CRITICAL
| Fix | What Changed |
|-----|-------------|
| Viewport meta tag | Added `<meta name="viewport">` — mobile layout was completely broken without it |
| JS-dependent layout | All layout/content now renders in pure HTML+CSS — no JavaScript required to see the page |

### 🟠 HIGH
| Fix | What Changed |
|-----|-------------|
| Schema.org structured data | Added LocalBusiness + Service + FAQ schemas for Google rich results |
| Open Graph / Twitter Cards | Added all social sharing meta tags |
| Contact/Quote form | Full working form with validation, estimate calculator, and email API |
| Security headers | Added Helmet.js: CSP, HSTS, X-Frame-Options, referrer policy |
| Rate limiting | Contact form protected against spam (5 requests/15 min) |
| Gzip compression | All responses now compressed — typically 60–80% smaller payloads |
| Static asset caching | Images cached 1 year, CSS/JS 1 week — repeat visitors load instantly |

### 🟡 MEDIUM
| Fix | What Changed |
|-----|-------------|
| Mobile navigation | Hamburger menu with full keyboard/screen-reader support |
| Touch targets | All buttons/links ≥44×44px (Apple/Google guidelines) |
| Skip-to-content link | Keyboard accessibility for screen readers |
| Footer copyright year | Auto-updates via JavaScript |
| Smooth scroll | Anchor links scroll with header offset compensation |
| Mobile CTA bar | Persistent Call/Text/Quote bar at bottom of screen on mobile |
| Fluid typography | `clamp()` scales all font sizes — no more tiny text on mobile |
| Focus styles | All interactive elements have visible focus rings |
| Print styles | Navigation hidden when printing |

### 🟢 LOW
| Fix | What Changed |
|-----|-------------|
| Sitemap.xml | Auto-generated at `/sitemap.xml` |
| Canonical URL | Prevents duplicate content penalties |
| Preconnect fonts | Faster Google Fonts loading |
| Lazy image loading | `loading="lazy"` + IntersectionObserver fallback |
| CSS-only animations | `prefers-reduced-motion` respected |
| Semantic HTML | `<main>`, `<article>`, `<section>`, ARIA labels throughout |
| FAQ accordion | Native `<details>/<summary>` — no JS needed |
| HTTPS/HSTS | Enforced via Helmet headers |

---

## 📁 File Reference

| File | Purpose |
|------|---------|
| `server.js` | Express server — security, compression, API, static serving |
| `public/index.html` | Full page HTML — SEO, schema, accessibility, structure |
| `public/styles.css` | Mobile-first CSS — responsive grid, components, animations |
| `public/script.js` | Interactions — nav, form, calculator, lazy load |
| `.replit` | Replit run config |
| `.env.example` | Environment variable template |

---

## 📱 Mobile Breakpoints
```
< 480px   — single column, stacked form fields
480–599px — 2-col form rows
600–767px — 2-col service grid
768px+    — desktop nav visible, 2-col layouts
1024px+   — 3-col service grid, full container width
```

---

## 🔧 Customisation

### Change phone number
Search and replace `3348779513` and `(334) 877-9513` in all files.

### Change brand colours
Edit CSS variables at top of `styles.css`:
```css
--green:      #1a6b4a;  /* Main brand green */
--accent:     #f0a500;  /* Gold accent */
```

### Add Google Analytics
Paste your GA4 snippet just before `</head>` in `index.html`. The form submission already fires a `quote_request` event if `gtag` is present.

### Add a new service
1. Copy a `<article class="service-card">` block in `index.html`
2. Add the pricing to the `prices` object in `script.js`
3. Add an `<option>` to the `#f-service` select

---

## 📊 Expected Performance Improvements
| Metric | Before | After (estimated) |
|--------|--------|------------------|
| Mobile usability | ❌ Broken | ✅ Pass |
| Page load (3G) | ~8–12s | ~2–3s |
| Google PageSpeed mobile | ~35–50 | ~75–90 |
| Lighthouse accessibility | ~45 | ~90+ |
| Lighthouse SEO | ~60 | ~95+ |
| Core Web Vitals | ❌ Fail | ✅ Pass |
