# Alexis Window Tint — Website Design

Date: 2026-08-20
Status: Approved

## Purpose

A static, multi-page brochure website for Alexis Window Tint, a
window tinting business in Corsicana, TX (automotive, residential,
and commercial tinting, 13+ years experience). Goal: give the
business a professional web presence that drives phone/email
contact and shows services + pricing clearly.

## Business Facts (source of truth for content)

- Name: Alexis Window Tint
- Phone: (903) 503-0115
- Email: alexiswindowtint@gmail.com
- Address: 1002 Valley Dr, Corsicana, TX 75110
- Hours: Mon–Fri 9am–5pm, Sat 9am–2pm, Closed Sunday
- Experience: 13+ years — automotive, commercial, residential tinting
- Reputation: 5 stars, 23+ reviews, 100% recommend on Facebook (746 likes)
- No logo yet — text-based business name styling
- No professional photos yet — real work photos to be pulled from
  Facebook later; gallery ships with a clearly-labeled placeholder
- Facebook page URL not provided — link placeholder (`#`) until given

### Pricing — Standard Lifetime Warranty Film

| Item | Price |
|---|---|
| Windshield | $120 |
| Tint Removal (per door) | $15 |
| Tint Removal (rear window) | $60 |
| 4 Door Sedans/Hatchbacks/Trucks | $220 |
| Crossovers | $220 |
| Coupes | $180 |
| Ext Cab | $180 |
| Single Cab | $140 |
| SUV XL | $270 |
| Full Size SUV | $260 |
| Rear Window | $60 |
| Visor Strip/Eyebrow | $20 |
| Single Door Window | $40 |
| 2 Front Windows | $80 |

### Pricing — Ceramic Lifetime Warranty Film

| Item | Price |
|---|---|
| Windshield | $170 |
| 4 Door Sedans/Hatchbacks/Trucks | $350 |
| Tint Removal (per door) | $15 |
| Visor Strip/Eyebrow | $30 |
| 2 Front Windows | $130 |
| SUV XL | $480 |
| Full Size SUV | $440 |
| Tint Removal (rear window) | $60 |
| Coupes | $280 |
| Single Cab | $220 |
| Ext Cab | $280 |
| Crossovers | $350 |
| Single Door Window | $65 |
| Rear Window | $90 |

Also offered: 2-year warranty film tier (mentioned but no separate
price list given — treat as a lower-cost alternative to the
standard-lifetime tier, described in text on services.html, not
tabled on pricing.html).

## Structure

Static HTML/CSS/JS, no build tooling. Header/nav and footer markup
repeated per page (simplest for hand-editing 6 pages).

```
alexis-window-tint/
├── index.html       Home
├── services.html    Services & film types
├── pricing.html      Full pricing table
├── gallery.html      Placeholder photo grid
├── about.html         Experience + reviews
├── contact.html        Address, phone, email, hours, map
├── css/styles.css      Shared styles + design tokens
├── js/script.js         Mobile nav toggle, scroll animations, hover effects
├── images/               Photo assets (placeholder until real photos added)
└── README.md              How to edit content, swap photos, add real pricing/logo
```

## Page Content

- **index.html** — Hero (name, tagline, call-now CTA), trust bar
  (13+ yrs / 5★ 23+ reviews / 100% recommend), services overview
  cards linking to services.html, pricing teaser ("Starting at $40")
  linking to pricing.html, footer.
- **services.html** — Automotive / Residential / Commercial sections;
  film types explained (2-year warranty, lifetime warranty, ceramic
  lifetime warranty) with plain-language benefits of each.
- **pricing.html** — Full tables above, standard vs. ceramic columns,
  short note on warranty terms.
- **gallery.html** — Placeholder photo grid, clearly labeled "Photos
  coming soon," with instructions (in README) for dropping real
  Facebook photos into `images/` and updating the grid.
- **about.html** — Experience, reviews summary, Facebook link
  (placeholder `#`).
- **contact.html** — Address, phone (tel: link), email (mailto:
  link), hours, embedded Google Map (static iframe embed, no API key
  needed). No backend contact form (flagged as a future addition,
  e.g. via Formspree).

## Visual Design

Clean & bright: white/near-white background, navy primary
(`#1e3a5f`-ish), brighter blue accent (`#2563eb`-ish) for CTAs and
links. Exact tokens finalized in `css/styles.css` during build.
Text-based logo treatment for the business name in the header.

## Post-Build Polish (user-requested, done after initial build)

1. Run `/impeccable` audit on the finished site and address findings.
2. Add subtle scroll animations and hover effects using Motion
   (motion-dev), vanilla JS build (`import { animate } from "motion"`)
   — restrained, not flashy: fade/slide-in on scroll for sections,
   gentle hover states on cards/buttons/nav links. Search motion-dev
   docs before writing animation code per its usage instructions.

## Testing / Verification

No automated test suite (static brochure site). Verification is
manual: open in a browser and check layout at mobile/tablet/desktop
widths, confirm all internal links work, confirm tel:/mailto: links
are correctly formatted, confirm pricing table matches source data
above.

## Out of Scope (for this build)

- CMS or backend of any kind
- Real contact form / form backend
- Real logo design
- Real photography (placeholder only, to be swapped in later)
- Blog / SEO content beyond basic page titles & meta descriptions
