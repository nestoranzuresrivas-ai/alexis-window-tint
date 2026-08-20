# Alexis Window Tint — Website

A static, no-build-tools website for Alexis Window Tint, a window
tinting business in Corsicana, TX (automotive, residential, and
commercial tinting).

## Viewing the site

No build step needed. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative links and the mobile nav behave
  exactly as they will in production: `npx serve .` (or any static
  file server) from this folder, then visit the printed URL.

## Structure

```
index.html       Home
services.html    Services & film types
pricing.html     Full pricing tables
gallery.html     Photo gallery (placeholder for now)
about.html       Experience + reviews
contact.html     Address, phone, email, hours, map
css/styles.css   All styles + design tokens (colors, fonts, spacing)
js/script.js     Mobile nav toggle (+ any future scroll/hover polish)
images/          Photo assets go here
```

There's no templating system — each `.html` file repeats the same
header/nav and footer markup. When you change something shared (a
phone number, hours, nav links), update it in **all six files**.

## Editing business info

Every page's header and footer contain the phone number
(`tel:19035030115`), email (`mailto:alexiswindowtint@gmail.com`),
address, and hours. Search-and-replace across all `.html` files when
any of these change.

## Adding real photos to the gallery

`gallery.html` currently has six `.gallery-placeholder` `<div>`s with
the text "Photos coming soon". To add a real photo:

1. Drop the image file into `images/` (e.g. `images/sedan-front.jpg`).
2. Replace one of the `.gallery-placeholder` divs with:
   ```html
   <img src="images/sedan-front.jpg" alt="Describe the photo here" class="gallery-placeholder" style="object-fit: cover;">
   ```
   (or restyle as you like — the `.gallery-grid` class handles the
   grid layout regardless of what's inside each cell).

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

## Adding a real logo

Every page's header has this text-based logo markup:

```html
<a class="logo" href="index.html">Alexis <span class="logo-accent">Window Tint</span></a>
```

To use an image logo instead, replace it (in all six files) with
something like:

```html
<a class="logo" href="index.html"><img src="images/logo.png" alt="Alexis Window Tint" style="height: 40px;"></a>
```
