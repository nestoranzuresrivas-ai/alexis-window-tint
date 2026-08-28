# Alexis Window Tint — Website

A static, no-build-tools website for Alexis Window Tint, a window
tinting business in Corsicana, TX (automotive, residential, and
commercial tinting).

## Viewing the site

No build step needed, but how you open it matters:

- **Serve it locally** (recommended): `npx serve .` (or any static
  file server) from this folder, then visit the printed URL. Relative
  links, the mobile nav, and — importantly — `js/animations.js` only
  behave exactly as they will in production when served over `http://`.
- Opening `index.html` directly in a browser (`file://`) mostly works,
  but Chromium-family browsers block `<script type="module">` from
  loading over `file://`, so `js/animations.js` silently never runs:
  scroll reveals/count-up just show their final static values (fine,
  by design), but the reduced-motion guard on the hero background video
  also won't run, so that one visitor group would see it autoplay
  regardless of their OS setting. Serve over `http://` to test that
  path for real.

## Structure

```
index.html          Home
services.html       Services & film types
pricing.html        Full pricing tables
gallery.html        Photo gallery (3 real jobs + placeholders)
about.html          Experience + reviews
contact.html        Address, phone, email, hours, map
css/styles.css      All styles + design tokens (colors, fonts, spacing)
js/script.js        Mobile nav toggle
js/animations.js    Scroll reveals, count-up, hero-video reduced-motion guard (built on Motion)
js/vendor/motion.js Vendored copy of the Motion animation library (motion.dev)
images/             Photo assets go here
videos/             Hero background video (all six pages)
```

### Animations

`js/animations.js` adds subtle scroll-triggered fade/rise reveals and a
small spring "pop" on the primary call-to-action buttons, using the
[Motion](https://motion.dev) library. Motion is vendored locally as a
single file at `js/vendor/motion.js` rather than fetched from a CDN, so
the site has no runtime network dependency and no build step. To
upgrade it, replace that file with a fresh build from
`https://cdn.jsdelivr.net/npm/motion@<version>/+esm`.

Everything in `animations.js` checks `prefers-reduced-motion` first and
does nothing if the visitor has that preference set — content is always
fully visible without it.

There's no templating system — each `.html` file repeats the same
header/nav and footer markup. When you change something shared (a
phone number, hours, nav links), update it in **all six files**.

## Editing business info

Every page's header and footer contain the phone number
(`tel:19035030115`), email (`mailto:alexiswindowtint@gmail.com`),
address, and hours. Search-and-replace across all `.html` files when
any of these change.

## Adding real photos to the gallery

`gallery.html` has a `.gallery-grid` of six cells: three real photos
(pool enclosure, GMC truck, orange tractor — cropped from the client's
promo flyer) and three `.gallery-placeholder` `<div>`s still reading
"Photos coming soon". To add another real photo, replace one of the
remaining placeholders with a `.gallery-photo` figure:

```html
<figure class="gallery-photo">
  <img src="images/sedan-front.jpg" alt="Describe the photo here" loading="lazy" width="270" height="195">
  <figcaption>Category &mdash; Short Label</figcaption>
</figure>
```

`.gallery-photo` crops the image to the same 4:3 footprint as the
placeholder tiles (`object-fit: cover`) and shows the figcaption as a
dark gradient overlay along the bottom edge — no extra styling needed.

## Updating pricing

Edit the two tables in `pricing.html` directly — one for Standard
Lifetime Warranty Film, one for Ceramic Lifetime Warranty Film. Each
row is a plain `<tr><td>Item</td><td>$Price</td></tr>`.

## Adding the real Facebook link

`about.html` has one placeholder link:

```html
<a href="#" data-placeholder="facebook-url">See our reviews on Facebook</a>
```

Replace `href="#"` with the real Facebook page URL (you can leave the
`data-placeholder` attribute or remove it — it's just there so this
spot is easy to find with a search).

## The real logo

Every page's header and footer show the real logo badge
(`images/logo-mark.png`, cropped from the client's circular emblem —
arc, stars, sunburst, and car, with the "ALEXIS WINDOW TINT" wordmark
and knife graphic cropped off) next to the text wordmark:

```html
<a class="logo" href="index.html"><img class="logo-mark" src="images/logo-mark.png" alt="" width="61" height="34">Alexis <span class="logo-accent">Window Tint</span></a>
```

`.logo-mark` (in `css/styles.css`) fixes its height at 34px with a
small rounded corner and hairline ring, so the badge's busier
black/orange/gold artwork stays contained next to the site's own
navy/blue wordmark instead of dominating the header. `alt=""` because
the adjacent text already names the business — update it if the badge
is ever used somewhere without that text nearby.

## The tint-shade reference

`services.html` has a "How Dark Should You Go?" section showing a
5/20/35/50/70% shade reference as plain CSS swatches (`.tint-shade-card`
/ `.tint-swatches` in `css/styles.css`) — no image file involved. Each
swatch's color comes from the `--tint-5` … `--tint-70` custom
properties in the `:root` token block, running dark navy (5%, darkest)
to near-white (70%, lightest) so it stays on-brand instead of plain
gray. To change a shade, edit its token; to add the same section to
`pricing.html`, copy the `.tint-shade-card` block from `services.html`.

## The hero background video

All six pages play the same clip, `videos/hero-tint.mp4`, full-bleed
behind their hero heading — the big home hero (`.hero.hero-video`) and
the five compact page banners (`.page-hero.hero-video`) alike:

```html
<section class="hero hero-video">      <!-- or class="page-hero hero-video" on the other five pages -->
  <video class="hero-video-bg" autoplay muted loop playsinline poster="images/hero-poster.jpg" aria-hidden="true">
    <source src="videos/hero-tint.mp4" type="video/mp4">
  </video>
  <div class="hero-video-overlay" aria-hidden="true"></div>
  <div class="container hero-content">…</div>
</section>
```

The current clip is real shop footage from the client's cousin: 15s,
1280×720, H.264, no audio, ~2.4MB (re-encoded with `ffmpeg -vf
scale=1280:-2 -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p
-movflags +faststart -an` from the original ~20MB 1920×1080 source —
CRF 28 was indistinguishable from CRF 24 once played behind the
overlay, at roughly half the size). `images/hero-poster.jpg` is a
frame grabbed straight from that same encoded file (`ffmpeg -ss 5
-i videos/hero-tint.mp4 -frames:v 1 -q:v 3 images/hero-poster.jpg`),
so it matches exactly what plays.

`.hero-video` (in `css/styles.css`) swaps out the old gradient/stripe
/glow/grain treatment — plus the placeholder car-silhouette backdrop
on the five page banners — for the video plus a semi-transparent navy
gradient overlay for text contrast; the text/CTA layout and existing
fade-up-in animation are unchanged. `js/animations.js` pauses the
video and drops its `autoplay` attribute for `prefers-reduced-motion`
visitors on whichever page it's on (a declarative HTML attribute like
`autoplay` can't be stopped by CSS alone) — see the "Viewing the site"
section above for why that guard needs `http://`, not `file://`, to
actually run.

To swap in a different clip: re-encode it with the `ffmpeg` command
above (adjust `-crf` if it looks too soft/heavy — lower is higher
quality, larger file), replace `videos/hero-tint.mp4` (same filename,
or update every `<source>` path), and regenerate the poster from a
representative frame the same way.
