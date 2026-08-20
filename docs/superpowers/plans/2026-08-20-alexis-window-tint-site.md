# Alexis Window Tint Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static multi-page Alexis Window Tint brochure website (6 pages + shared stylesheet + shared script) exactly as approved in the design spec.

**Architecture:** Plain HTML/CSS/JS, no build tooling. Every page repeats the same header/nav/footer markup block (defined once below, reused verbatim). One shared stylesheet holds design tokens and all component/layout styles. One shared script handles the mobile nav toggle.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid), vanilla JS. No frameworks, no package manager, no server required to view (static files).

**Spec:** `docs/superpowers/specs/2026-08-20-alexis-window-tint-design.md`

## Global Constraints

- Business name: **Alexis Window Tint**. Phone: **(903) 503-0115** → `tel:19035030115`. Email: **alexiswindowtint@gmail.com** → `mailto:alexiswindowtint@gmail.com`. Address: **1002 Valley Dr, Corsicana, TX 75110**. Hours: **Mon–Fri 9am–5pm, Sat 9am–2pm, Closed Sunday**.
- Reputation line used across pages: **13+ years experience · 5★ · 23+ reviews · 100% recommend on Facebook (746 likes)**.
- No logo file — header uses styled text: "Alexis" + accent-colored "Window Tint".
- No real photos yet — gallery.html uses a clearly labeled placeholder grid.
- No Facebook URL yet — any Facebook link uses `href="#"` with a `data-placeholder="facebook-url"` attribute so it's greppable later.
- No backend contact form — contact page uses `tel:`/`mailto:` links and an embedded Google Maps iframe only.
- Design tokens (final, do not change): background `#ffffff` / alt section `#f8fafc`, body text `#1f2933`, muted text `#52606d`, primary navy `#1e3a5f` (dark `#142a45`), accent blue `#2563eb` (dark `#1d4ed8`), border `#e2e8f0`, star/rating color `#f59e0b`.
- Fonts: headings `'Poppins', 'Segoe UI', Arial, sans-serif`; body `'Inter', 'Segoe UI', Arial, sans-serif` (loaded via Google Fonts `<link>` in every page `<head>`).
- Nav order (identical on every page): Home, Services, Pricing, Gallery, About, Contact. Current page's nav link gets `class="active" aria-current="page"`.
- No automated test framework exists or should be added — this is a static brochure site. "Tests" below are grep-based content checks, a Node syntax check for the JS file, and a final Playwright pass (see Task 10).

---

### Task 1: Design tokens, base styles, header/nav/footer shared markup, mobile nav script

**Files:**
- Create: `css/styles.css`
- Create: `js/script.js`
- Create: `images/.gitkeep`

**Interfaces:**
- Produces: CSS custom properties (`--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-accent-dark`, `--color-border`, `--color-star`, `--font-heading`, `--font-body`, `--space-1`..`--space-7`, `--radius`, `--container-width`, `--shadow-sm`, `--shadow-md`) that every later page task relies on.
- Produces: CSS classes every page uses: `.container`, `.site-header`, `.header-inner`, `.logo`, `.logo-accent`, `.nav-toggle`, `.site-nav` (with `.active` link state), `.header-cta`, `.btn`, `.btn-accent`, `.btn-outline`, `.section`, `.section-alt`, `.trust-bar`, `.card`, `.card-grid`, `.site-footer`, `.footer-inner`, `.footer-col`, `.footer-bottom`.
- Produces: `js/script.js` behavior — toggling `.is-open` on `#siteNav` and `aria-expanded` on `#navToggle` when `#navToggle` is clicked. Later tasks' header markup must use exactly these three ids/classes.

- [ ] **Step 1: Write `css/styles.css`**

```css
/* ---- Design tokens ---- */
:root {
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;
  --color-text: #1f2933;
  --color-text-muted: #52606d;
  --color-primary: #1e3a5f;
  --color-primary-dark: #142a45;
  --color-accent: #2563eb;
  --color-accent-dark: #1d4ed8;
  --color-border: #e2e8f0;
  --color-star: #f59e0b;

  --font-heading: 'Poppins', 'Segoe UI', Arial, sans-serif;
  --font-body: 'Inter', 'Segoe UI', Arial, sans-serif;

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4rem;
  --space-7: 6rem;

  --radius: 8px;
  --container-width: 1120px;
  --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.08);
  --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.10);
}

/* ---- Reset ---- */
*, *::before, *::after { box-sizing: border-box; }
body, h1, h2, h3, h4, p, figure { margin: 0; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

h1, h2, h3, h4 { font-family: var(--font-heading); font-weight: 600; color: var(--color-primary); line-height: 1.2; }
h1 { font-size: clamp(2rem, 4vw, 3rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); margin-bottom: var(--space-3); }
h3 { font-size: 1.25rem; margin-bottom: var(--space-1); }

.container { max-width: var(--container-width); margin-inline: auto; padding-inline: var(--space-3); }

.section { padding-block: var(--space-6); }
.section-alt { background: var(--color-bg-alt); }

/* ---- Buttons ---- */
.btn {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}
.btn-accent { background: var(--color-accent); color: #fff; }
.btn-accent:hover { background: var(--color-accent-dark); transform: translateY(-1px); }
.btn-outline { border: 2px solid var(--color-primary); color: var(--color-primary); }
.btn-outline:hover { background: var(--color-primary); color: #fff; }

/* ---- Header ---- */
.site-header { border-bottom: 1px solid var(--color-border); position: sticky; top: 0; background: var(--color-bg); z-index: 50; }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); padding-block: var(--space-2); }
.logo { font-family: var(--font-heading); font-weight: 600; font-size: 1.25rem; color: var(--color-primary); }
.logo-accent { color: var(--color-accent); }

.nav-toggle { display: none; flex-direction: column; gap: 4px; background: none; border: none; padding: var(--space-1); }
.nav-toggle span { width: 22px; height: 2px; background: var(--color-primary); display: block; }

.site-nav { display: flex; gap: var(--space-3); }
.site-nav a { color: var(--color-text); font-weight: 500; padding-block: var(--space-1); border-bottom: 2px solid transparent; }
.site-nav a:hover, .site-nav a.active { color: var(--color-accent); border-bottom-color: var(--color-accent); }

.header-cta { white-space: nowrap; }

@media (max-width: 860px) {
  .nav-toggle { display: flex; }
  .header-cta { display: none; }
  .site-nav {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-2) var(--space-3);
    gap: var(--space-1);
    display: none;
  }
  .site-nav.is-open { display: flex; }
}

/* ---- Trust bar ---- */
.trust-bar { display: flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center; text-align: center; padding-block: var(--space-4); }
.trust-item strong { display: block; color: var(--color-primary); font-family: var(--font-heading); font-size: 1.4rem; }
.trust-item .stars { color: var(--color-star); }

/* ---- Cards ---- */
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-3); }
.card { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius); padding: var(--space-4); box-shadow: var(--shadow-sm); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

/* ---- Pricing table ---- */
.pricing-table { width: 100%; border-collapse: collapse; background: var(--color-bg); box-shadow: var(--shadow-sm); border-radius: var(--radius); overflow: hidden; }
.pricing-table caption { text-align: left; font-family: var(--font-heading); font-weight: 600; color: var(--color-primary); padding: var(--space-2) 0; }
.pricing-table th, .pricing-table td { padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--color-border); text-align: left; }
.pricing-table th { background: var(--color-primary); color: #fff; }
.pricing-table td:last-child, .pricing-table th:last-child { text-align: right; font-weight: 600; }
.pricing-table-wrap { overflow-x: auto; margin-bottom: var(--space-5); }

/* ---- Gallery ---- */
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-3); }
.gallery-placeholder { aspect-ratio: 4 / 3; background: var(--color-bg-alt); border: 1px dashed var(--color-border); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); font-size: 0.9rem; text-align: center; padding: var(--space-2); }

/* ---- Footer ---- */
.site-footer { background: var(--color-primary); color: #dbe4f0; margin-top: var(--space-7); }
.footer-inner { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); padding-block: var(--space-6); }
.footer-col h3 { color: #fff; font-size: 1rem; margin-bottom: var(--space-2); }
.footer-col a:hover { color: var(--color-star); }
.footer-logo { color: #fff; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.15); padding-block: var(--space-2); font-size: 0.85rem; text-align: center; color: #b9c6dc; }

/* ---- Hero ---- */
.hero { padding-block: var(--space-7); background: linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%); text-align: center; }
.hero p.lede { color: var(--color-text-muted); max-width: 640px; margin-inline: auto; margin-top: var(--space-2); font-size: 1.1rem; }
.hero .btn { margin-top: var(--space-4); margin-inline: var(--space-1); }
```

- [ ] **Step 2: Write `js/script.js`**

```javascript
// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
```

- [ ] **Step 3: Create empty placeholder folder marker**

```bash
touch images/.gitkeep
```

- [ ] **Step 4: Verify — Node syntax check on the JS and grep check on the CSS**

Run: `node --check js/script.js`
Expected: no output, exit code 0.

Run: `grep -c "^  --color-" css/styles.css`
Expected: a number ≥ 9 (confirms the token block is present).

- [ ] **Step 5: Commit**

```bash
git add css/styles.css js/script.js images/.gitkeep
git commit -m "Add design tokens, base styles, and mobile nav script"
```

---

### Task 2: Home page (`index.html`)

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: CSS classes/tokens from Task 1 (`css/styles.css`), `js/script.js`, ids `navToggle`/`siteNav`.
- Produces: the header/footer markup pattern (below) that Tasks 3–7 copy verbatim, changing only the `<title>`, meta description, `active` nav link, and `<main>` content.

- [ ] **Step 1: Write `index.html`**

Use this exact `<head>`, header, and footer shell (Tasks 3–7 reuse this shell verbatim, changing `<title>`/meta description and which nav `<a>` carries `class="active" aria-current="page"`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Alexis Window Tint | Corsicana, TX Window Tinting</title>
<meta name="description" content="Automotive, residential, and commercial window tinting in Corsicana, TX. 13+ years experience, 5-star rated. Call (903) 503-0115.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="index.html">Alexis <span class="logo-accent">Window Tint</span></a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="siteNav" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="siteNav">
      <a href="index.html" class="active" aria-current="page">Home</a>
      <a href="services.html">Services</a>
      <a href="pricing.html">Pricing</a>
      <a href="gallery.html">Gallery</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
    <a class="btn btn-accent header-cta" href="tel:19035030115">Call (903) 503-0115</a>
  </div>
</header>

<main>
<!-- PAGE CONTENT GOES HERE -->
</main>

<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-col">
      <p class="logo footer-logo">Alexis <span class="logo-accent">Window Tint</span></p>
      <p>Automotive, residential &amp; commercial window tinting in Corsicana, TX.</p>
    </div>
    <div class="footer-col">
      <h3>Contact</h3>
      <p><a href="tel:19035030115">(903) 503-0115</a></p>
      <p><a href="mailto:alexiswindowtint@gmail.com">alexiswindowtint@gmail.com</a></p>
      <p>1002 Valley Dr, Corsicana, TX 75110</p>
    </div>
    <div class="footer-col">
      <h3>Hours</h3>
      <p>Mon&ndash;Fri: 9am&ndash;5pm</p>
      <p>Sat: 9am&ndash;2pm</p>
      <p>Sun: Closed</p>
    </div>
    <div class="footer-col">
      <h3>Quick Links</h3>
      <p><a href="services.html">Services</a></p>
      <p><a href="pricing.html">Pricing</a></p>
      <p><a href="gallery.html">Gallery</a></p>
      <p><a href="about.html">About</a></p>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container"><p>&copy; 2026 Alexis Window Tint. All rights reserved.</p></div>
  </div>
</footer>
<script src="js/script.js"></script>
</body>
</html>
```

For `index.html`'s `<main>`, build these sections in order, using the real facts from Global Constraints (exact copy is the implementer's judgment call, content requirements are not):
1. `.hero` section: `<h1>` headline naming Corsicana and window tinting, a `.lede` paragraph mentioning 13+ years experience, two CTA buttons — `.btn.btn-accent` to `tel:19035030115` ("Call Now") and `.btn.btn-outline` to `pricing.html` ("See Pricing").
2. `.trust-bar` section (`.section`): four `.trust-item` blocks — "13+ Years" / "Experience", "5★" / "Google & Facebook Rating" (star glyphs in `.stars` span), "23+" / "Happy Customers", "100%" / "Recommend Us".
3. `.section.section-alt` "Our Services": `.card-grid` with three `.card`s — Automotive, Residential, Commercial — each with an `<h3>`, one sentence, and a "Learn More →" link to `services.html`.
4. `.section` "Pricing" teaser: short paragraph stating tinting starts at $40 (single door window, standard lifetime film), with a `.btn.btn-accent` link to `pricing.html` ("View Full Pricing").
5. `.section.section-alt` final CTA band: heading + `.btn.btn-accent` to `tel:19035030115`.

- [ ] **Step 2: Verify — grep checks**

Run: `grep -c 'href="tel:19035030115"' index.html` → expected ≥ 2
Run: `grep -c 'href=".*\.html"' index.html` → expected ≥ 5 (nav + internal links)
Run: `grep -o 'class="active"' index.html` → expected exactly one match, on the Home link

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add home page"
```

---

### Task 3: Services page (`services.html`)

**Files:**
- Create: `services.html`

**Interfaces:**
- Consumes: header/footer shell from Task 2 (copy verbatim; set `<title>Services | Alexis Window Tint</title>`, a services-specific meta description, and move `class="active" aria-current="page"` onto the Services nav link instead of Home).

- [ ] **Step 1: Write `services.html`** using the Task 2 shell, `<main>` containing:
  - Page header (`h1` "Our Services", one-sentence intro).
  - Three `.section` blocks (Automotive, Residential, Commercial), each with an `<h2>`, 2–3 sentences describing the work.
  - A "Film Types" `.section.section-alt` with a `.card-grid` of three `.card`s: **2-Year Warranty Film** (budget option), **Lifetime Warranty Film** (standard, most popular), **Ceramic Lifetime Warranty Film** (premium — better heat rejection, clarity, no signal interference), each card ending with a link to `pricing.html`.

- [ ] **Step 2: Verify — grep checks**

Run: `grep -c "Automotive\|Residential\|Commercial" services.html` → expected ≥ 3
Run: `grep -c "Ceramic" services.html` → expected ≥ 1
Run: `grep -o 'class="active"' services.html` → expected exactly one match

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "Add services page"
```

---

### Task 4: Pricing page (`pricing.html`)

**Files:**
- Create: `pricing.html`

**Interfaces:**
- Consumes: header/footer shell (Services nav link reverts to plain, Pricing link gets `active`), `.pricing-table`/`.pricing-table-wrap` classes from Task 1.

- [ ] **Step 1: Write `pricing.html`** using the shell, `<main>` containing an `<h1>` "Pricing", a short paragraph noting all standard-tier work carries a lifetime warranty (2-year warranty film available on request at a lower cost — call for a quote), then two `.pricing-table-wrap` tables:

Standard Lifetime Warranty Film table (`<caption>Standard Lifetime Warranty Film</caption>`, columns Item / Price):

| Item | Price |
|---|---|
| Windshield | $120 |
| 2 Front Windows | $80 |
| Single Door Window | $40 |
| Rear Window | $60 |
| 4 Door Sedans/Hatchbacks/Trucks | $220 |
| Crossovers | $220 |
| Coupes | $180 |
| Ext Cab | $180 |
| Single Cab | $140 |
| SUV XL | $270 |
| Full Size SUV | $260 |
| Visor Strip/Eyebrow | $20 |
| Tint Removal (per door) | $15 |
| Tint Removal (rear window) | $60 |

Ceramic Lifetime Warranty Film table (`<caption>Ceramic Lifetime Warranty Film</caption>`, same row order/labels):

| Item | Price |
|---|---|
| Windshield | $170 |
| 2 Front Windows | $130 |
| Single Door Window | $65 |
| Rear Window | $90 |
| 4 Door Sedans/Hatchbacks/Trucks | $350 |
| Crossovers | $350 |
| Coupes | $280 |
| Ext Cab | $280 |
| Single Cab | $220 |
| SUV XL | $480 |
| Full Size SUV | $440 |
| Visor Strip/Eyebrow | $30 |
| Tint Removal (per door) | $15 |
| Tint Removal (rear window) | $60 |

Each `<tr>` as `<tr><td>Item</td><td>$Price</td></tr>`. After the tables, a closing `.section-alt` CTA: "Not sure which option is right for you? Call (903) 503-0115 for a free quote." with a `.btn.btn-accent` `tel:` link.

- [ ] **Step 2: Verify — grep checks against the source data**

Run: `grep -c '<tr>' pricing.html` → expected 28 (14 rows × 2 tables)
Run: `for p in '\$120' '\$80' '\$40' '\$270' '\$170' '\$350' '\$480' '\$65'; do grep -c "$p" pricing.html; done` → each expected ≥ 1

- [ ] **Step 3: Commit**

```bash
git add pricing.html
git commit -m "Add pricing page with full standard and ceramic tables"
```

---

### Task 5: Gallery page (`gallery.html`)

**Files:**
- Create: `gallery.html`

**Interfaces:**
- Consumes: header/footer shell (Gallery link gets `active`), `.gallery-grid`/`.gallery-placeholder` classes from Task 1.

- [ ] **Step 1: Write `gallery.html`** using the shell, `<main>` containing an `<h1>` "Our Work", a sentence noting real project photos are on the way, and a `.gallery-grid` of 6 `.gallery-placeholder` divs, each containing the text "Photos coming soon".

- [ ] **Step 2: Verify — grep checks**

Run: `grep -c "gallery-placeholder" gallery.html` → expected ≥ 6
Run: `grep -c "coming soon" gallery.html` → expected ≥ 1

- [ ] **Step 3: Commit**

```bash
git add gallery.html
git commit -m "Add gallery page with placeholder grid"
```

---

### Task 6: About page (`about.html`)

**Files:**
- Create: `about.html`

**Interfaces:**
- Consumes: header/footer shell (About link gets `active`).

- [ ] **Step 1: Write `about.html`** using the shell, `<main>` containing an `<h1>` "About Alexis Window Tint", a paragraph on 13+ years of automotive/residential/commercial tinting experience in Corsicana, a `.trust-bar` reusing the same four stats as the home page, and a reviews callout paragraph citing "5-star rating, 23+ reviews, 100% recommend on Facebook (746 likes)" with a link:

```html
<a href="#" data-placeholder="facebook-url">See our reviews on Facebook</a>
```

- [ ] **Step 2: Verify — grep checks**

Run: `grep -c "13+ years\|13+ Years" about.html` → expected ≥ 1
Run: `grep -c 'data-placeholder="facebook-url"' about.html` → expected 1

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "Add about page"
```

---

### Task 7: Contact page (`contact.html`)

**Files:**
- Create: `contact.html`

**Interfaces:**
- Consumes: header/footer shell (Contact link gets `active`).

- [ ] **Step 1: Write `contact.html`** using the shell, `<main>` containing an `<h1>` "Contact Us", a two-column layout (plain flex/grid using existing `.container`/`.card` classes — no new CSS needed) with:
  - Left: address (`1002 Valley Dr, Corsicana, TX 75110`), phone (`tel:19035030115` link showing `(903) 503-0115`), email (`mailto:alexiswindowtint@gmail.com` link), and hours list (Mon–Fri 9am–5pm, Sat 9am–2pm, Sun Closed).
  - Right: an embedded Google Map iframe:

```html
<iframe
  title="Alexis Window Tint location"
  src="https://www.google.com/maps?q=1002+Valley+Dr,+Corsicana,+TX+75110&output=embed"
  width="100%" height="360" style="border:0; border-radius: var(--radius);"
  loading="lazy" referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

- [ ] **Step 2: Verify — grep checks**

Run: `grep -c '<iframe' contact.html` → expected 1
Run: `grep -c "1002 Valley Dr" contact.html` → expected ≥ 1
Run: `grep -c 'href="tel:19035030115"\|href="mailto:alexiswindowtint@gmail.com"' contact.html` → expected ≥ 2

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "Add contact page with map embed"
```

---

### Task 8: README

**Files:**
- Create: `README.md`

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Write `README.md`** covering: what this project is; how to view it (open `index.html` directly, or `npx serve .`); where to edit business info (each page's header/footer block, repeated per file — no templating); how to swap in real photos (replace `.gallery-placeholder` divs in `gallery.html` with `<img>` tags pointing at files added to `images/`); how to update pricing (`pricing.html` tables); how to set the real Facebook URL (find `data-placeholder="facebook-url"` in `about.html` and replace the `href`); how to add a real logo (replace the `.logo` text markup in every page's header with an `<img>`).

- [ ] **Step 2: Verify**

Run: `grep -c "facebook-url\|gallery-placeholder\|pricing.html" README.md` → expected ≥ 3

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Add README with content editing instructions"
```

---

### Task 9: Cross-page consistency check

**Files:**
- Modify: none expected (verification-only task; fix any page it flags)

**Interfaces:** None.

- [ ] **Step 1: Verify every page has all six nav links and exactly one `active`**

Run:
```bash
for f in index.html services.html pricing.html gallery.html about.html contact.html; do
  echo "== $f =="
  grep -o 'href="[a-z]*\.html"' "$f" | sort -u | wc -l
  grep -o 'class="active"' "$f" | wc -l
done
```
Expected: every file reports `6` nav hrefs and `1` active class.

- [ ] **Step 2: Verify every page links the stylesheet and script**

Run: `grep -L 'css/styles.css' index.html services.html pricing.html gallery.html about.html contact.html`
Expected: no output (empty = all files matched).

Run: `grep -L 'js/script.js' index.html services.html pricing.html gallery.html about.html contact.html`
Expected: no output.

- [ ] **Step 3: Fix any page the checks above flagged, re-run until clean**

- [ ] **Step 4: Commit (only if fixes were needed)**

```bash
git add -A
git commit -m "Fix cross-page nav/asset consistency issues"
```

---

### Task 10: End-to-end browser verification

**Files:** none created/modified (verification only).

**Interfaces:** Uses the `playwright-skill` skill.

- [ ] **Step 1: Serve the site locally**

```bash
npx --yes serve@latest -l 5500 .
```

- [ ] **Step 2: Using the playwright-skill skill, drive a browser through the site**

For each of the 6 pages: navigate to it, confirm the page loads with no console errors, confirm the header nav and footer render, click through to each of the other 5 pages via nav links and confirm the URL changes correctly, and capture a screenshot at 375px, 768px, and 1440px viewport widths.

- [ ] **Step 3: Review screenshots for layout breakage**

Confirm: mobile nav toggle shows/hides the nav menu correctly at 375px; pricing tables don't overflow the viewport (scroll inside `.pricing-table-wrap` is acceptable); footer columns stack sensibly on mobile; no horizontal page scroll at any width.

- [ ] **Step 4: Fix any issues found, re-run Steps 1–3 until clean**

- [ ] **Step 5: Stop the local server and commit any fixes**

```bash
git add -A
git commit -m "Fix responsive/layout issues found in browser verification"
```
