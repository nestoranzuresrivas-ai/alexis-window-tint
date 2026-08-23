# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Local Corsicana, TX-area customers evaluating a window-tinting shop for
their vehicle, home, or business, deciding whether to call for a quote.
Segments evidenced by site content and the real job photos on hand:
private vehicle owners (sedans/trucks), homeowners, business/storefront
owners, and equipment owners (the gallery's tractor photo).

## Product Purpose

A brochure/marketing site whose job is to build enough trust that a
visitor calls (903) 503-0115 for a quote. There is no online booking,
payment, or lead form; every primary CTA is a `tel:` link. Success is a
phone call, not an on-site conversion.

## Positioning

13+ years of local hands-on experience, a 5-star Google/Facebook
rating, and lifetime-warranty film (standard and ceramic tiers) across
automotive, residential, and commercial work — a combination a newer or
narrower (auto-only) competitor can't truthfully claim.

## Operating Context

Single-location shop at 1002 Valley Dr, Corsicana, TX 75110.
Mon–Fri 9am–5pm, Sat 9am–2pm, closed Sun. No e-commerce, scheduling
system, or CMS — content changes are made by hand-editing six static
HTML files (no templating engine).

## Capabilities and Constraints

- Static HTML/CSS/JS, no build step, no framework, no backend.
- Motion (motion.dev) is vendored locally at `js/vendor/motion.js`
  rather than CDN-loaded — no runtime network dependency.
- Must stay fast-loading: no video or 3D assets (explicit constraint
  from the current redesign request).
- `prefers-reduced-motion` must be honored — established pattern
  already in `js/animations.js`, must extend, not bypass.
- Real client-provided assets now in use: logo badge
  (`images/logo-mark.png`) and 3 real job photos (pool enclosure, GMC
  truck, orange tractor) in the gallery.
- Facebook review link is still a placeholder
  (`data-placeholder="facebook-url"` in about.html) — real URL not yet
  provided.

## Brand Commitments

- Name: "Alexis Window Tint." Real logo badge in use — a circular
  emblem (orange arc, gold stars, sunburst, red car, on black),
  cropped down and treated as a small fixed-size badge next to the
  text wordmark so its louder colors don't dominate the page.
- Prior visual identity (as of this request): clean, minimal navy
  (#1e3a5f) / white / blue-accent (#2563eb) brochure site. The user is
  now commissioning a bolder, more premium/colorful evolution — explicit
  brief: "trustworthy local business, not a nightclub site."

## Evidence on Hand

- Real photos: pool enclosure tint job, GMC truck, orange Kubota
  tractor (`images/gallery-*.jpg`), cropped from a client-provided
  promo flyer.
- Real logo (`images/logo-mark.png`), cropped from a client-provided
  logo file.
- Site copy states: 13+ years experience, 23+ happy customers, 100%
  recommend rate, 5-star Google & Facebook rating, 746 Facebook likes
  — client-provided claims, not independently verified. Do not invent
  additional stats, testimonial quotes, case studies, or press.

## Product Principles

1. Every page must still convert to a phone call — bolder visuals
   amplify trust signals (years, rating, warranty); they never bury
   the phone CTA.
2. Read as an established, trustworthy local trade business, not a
   flashy/nightlife aesthetic — "premium," not "loud."
3. Six static pages, hand-edited, share one header/nav/footer pattern
   — no page may drift from that shared structure.
4. Motion and color are progressive enhancement: real content and CTAs
   must work and stay legible with `prefers-reduced-motion` on, and
   before any animation library loads.

## Accessibility & Inclusion

Established pattern (`js/animations.js`) already checks
`prefers-reduced-motion` and shows all content fully visible without
animation when set. New motion work (scroll reveals, count-up,
marquee, hover effects) must extend this pattern, not bypass it.
