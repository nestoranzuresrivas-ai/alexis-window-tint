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
js/script.js        Mobile nav toggle, tint-reveal intro skip/cleanup
js/scroll-motion.js Scroll reveals (IntersectionObserver, no library)
js/animations.js    Count-up, hero-video reduced-motion guard (built on Motion)
js/before-after.js  Before/after drag-compare sliders (home page)
js/vendor/motion.js Vendored copy of the Motion animation library (motion.dev)
images/             Photo assets go here
videos/             Hero background video (all six pages)
```

### Animations

Motion is deliberately minimal ("premium means restrained"). What moves:

- **Hero load-in** — pure CSS (`fade-up-in` in `css/styles.css`).
- **Count-up numbers** — the hero's "tinted glass" stat bar counts up on
  load (it's already in view); the About page's stats count up when
  scrolled into view.
- **Before/after sliders** — `js/before-after.js`.
- **Scroll reveals** — `js/scroll-motion.js`: section content, cards, and
  images fade in and rise 24px (650ms, ease-out) once as they enter the
  viewport; grid items stagger by 80ms. IntersectionObserver only, no
  scroll listeners or libraries, opacity/transform only (no layout
  shift). The script hides only elements that start below the viewport,
  so content is always visible if JS is off or fails.
- **Hero parallax** — the home hero video drifts up to 20px as you scroll,
  via CSS scroll-driven animation (`animation-timeline: scroll()`).
  Browsers without support just get a static hero; there is no JS
  fallback.

No hover lifts or button springs. `js/animations.js` uses the [Motion](https://motion.dev) library, vendored
locally at `js/vendor/motion.js` (no CDN, no build step). To upgrade it,
replace that file with a fresh build from
`https://cdn.jsdelivr.net/npm/motion@<version>/+esm`.

Everything in `animations.js` and `scroll-motion.js` (and the parallax
CSS) checks `prefers-reduced-motion` first and does nothing if the visitor has that preference set — content is always
fully visible without it.

### Tint-reveal intro (home page)

On the first home-page load per browser session, an ink-navy layer with
the logo and a thin orange line covers the page for ~1.2s, then slides up
(~600ms) to reveal the hero. It is:

- decided by a tiny inline script in `index.html`'s `<head>` (adds
  `intro-active` to `<html>` before first paint, so the site never flashes
  first) using `sessionStorage` key `awt-intro-seen`;
- run entirely by CSS (`.intro-layer` in `css/styles.css`) — the page
  loads and renders underneath as normal;
- skippable by tapping or pressing any key (`js/script.js`);
- skipped entirely with `prefers-reduced-motion` or once seen this session.

To replay it while testing, run `sessionStorage.clear()` in the console and
reload.

### Mobile call/text bar

At 700px and below every page shows a fixed bottom bar (`.mobile-cta-bar`)
with "Call now" (`tel:19035030115`) and "Text us" (`sms:+19035030115`).
`body` gets matching bottom padding so it never covers the footer.

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

## Facebook reviews link

`about.html`'s "See our reviews on Facebook" button links to the real
Facebook page (opens in a new tab). The same URL is used in every page's
header/footer social icons and in the `AutomotiveBusiness` JSON-LD in
`index.html`'s `<head>` — update all of them if it changes. That JSON-LD
block also carries the phone, address, and hours, so keep it in sync with
the footer.

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
wordmark instead of dominating the header. `alt=""` because
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
1280×720, H.264, no audio, ~3MB. The raw footage (first re-encoded at
CRF 28, ~2.4MB) read dark and flat — phone footage shot under dim
garage lighting, averaging ~30% luma with a slight green cast and
visible compression noise in the shadows once compressed. It's graded
before encoding, not just recompressed:

```
ffmpeg -i videos/hero-tint.mp4 -vf \
  "hqdn3d=2:1.5:6:6,eq=gamma=1.15:contrast=1.12:saturation=1.18:brightness=0.02,colorbalance=rs=0.05:gs=-0.08:rm=0.03:gm=-0.05,unsharp=5:5:0.6:5:5:0.0,scale=1280:-2" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -an \
  videos/hero-tint.mp4
```

In order: `hqdn3d` denoises before grading so brightening doesn't
amplify compression noise into visible blocking; `eq` lifts shadows via
gamma (opens up the dark areas without blowing out highlights) and
adds contrast/saturation back to what was a flat-looking clip;
`colorbalance` pulls the green cast toward neutral; `unsharp` restores
some perceived detail lost to denoising. CRF 26 (rather than the
original 28) spends the extra ~600KB where the grade needs it — dark,
denoised footage compresses more efficiently than noisy footage, so
even at a lower CRF the result lands close to the original file size.
`images/hero-poster.jpg` is a frame grabbed straight from that same
graded, encoded file (`ffmpeg -ss 5 -i videos/hero-tint.mp4 -frames:v 1
-q:v 3 images/hero-poster.jpg`), so it matches exactly what plays.

`.hero-video-overlay` (in `css/styles.css`) lays a left-to-right ink-navy
gradient over the video — dark behind the left-aligned headline, clearing
to the right so the footage shows through. `js/animations.js` pauses the
video and drops its `autoplay` attribute for `prefers-reduced-motion`
visitors on whichever page it's on (a declarative HTML attribute like
`autoplay` can't be stopped by CSS alone) — see the "Viewing the site"
section above for why that guard needs `http://`, not `file://`, to
actually run.

To swap in a different clip: re-encode it with the `ffmpeg` command
above (drop or retune the grading filters if the new footage isn't
dark/flat to begin with; adjust `-crf` if it looks too soft/heavy —
lower is higher quality, larger file), replace `videos/hero-tint.mp4`
(same filename, or update every `<source>` path), and regenerate the
poster from a representative frame the same way.
