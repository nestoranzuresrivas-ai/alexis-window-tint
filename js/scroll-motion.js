// Scroll reveals: sections, cards, and images fade in and rise 24px as they
// enter the viewport, once each. IntersectionObserver only — no scroll
// listeners, no libraries. Styles live in css/styles.css (.reveal).
//
// Only elements that start *below* the viewport get hidden, and only by
// this script, so content stays visible if JS is off or this file fails,
// and nothing already on screen flashes out and back in.
(() => {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const STAGGER_MS = 80;
  // Grids whose items reveal individually, staggered.
  const GRID = '.card-grid, .ba-grid, .gallery-grid, .trust-bar, .contact-grid, .pricing-grid';

  // Direct children of each section's container; grids are swapped for their items.
  const targets = [];
  document.querySelectorAll('main .section > .container').forEach((container) => {
    const items = container.matches(GRID) ? [container] : [...container.children];
    items.forEach((el) => {
      if (el.matches(GRID)) targets.push(...el.children);
      else targets.push(el);
    });
  });

  const viewportBottom = window.innerHeight;
  const pending = targets.filter((el) => el.getBoundingClientRect().top > viewportBottom);
  if (!pending.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      // Items entering together from the same grid stagger by 80ms each.
      const perParent = new Map();
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const parent = el.parentElement;
        const n = perParent.get(parent) || 0;
        perParent.set(parent, n + 1);
        el.style.setProperty('--reveal-delay', `${n * STAGGER_MS}ms`);
        el.classList.add('is-visible');
        io.unobserve(el);
        // Drop the delay once done so it never affects later interactions.
        el.addEventListener('transitionend', () => el.style.removeProperty('--reveal-delay'), { once: true });
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );

  pending.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
