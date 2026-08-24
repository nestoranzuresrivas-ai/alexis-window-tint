// Scroll reveals, count-up stat numbers, and a noticeable hover spring,
// built with Motion (vendored in js/vendor/motion.js).
// Respects prefers-reduced-motion: if the visitor asked for reduced motion,
// this file does nothing and every element/number stays at its normal,
// final, visible state. (The hero glow pulse and marquee scroll are pure
// CSS and carry their own prefers-reduced-motion guards in styles.css.)
import { animate, stagger } from "./vendor/motion.js";

// NOTE: this uses a native IntersectionObserver instead of Motion's own
// `inView()` helper. `inView()` is documented as a thin wrapper around
// IntersectionObserver, but in this vendored build its callback either
// doesn't fire reliably for every matched element or the animate() call
// made from inside it silently fails to apply — verified by comparing it
// side-by-side against a plain IntersectionObserver calling the exact same
// animate() call, which works correctly every time. Motion's `animate`
// and `stagger` (the parts that actually work) still do all the animating.
function revealOnce(element, callback, { marginPercent = 12 } = {}) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: `0px 0px -${marginPercent}% 0px` }
  );
  io.observe(element);
}

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// The autoplay/loop/muted attributes on the hero background video are
// declarative HTML — CSS and the reduced-motion guard below can't stop
// them from starting. Outside the main guard (runs regardless) so a
// reduced-motion visitor gets the static poster frame, not a moving video.
const heroVideo = document.querySelector(".hero-video-bg");
if (heroVideo && prefersReducedMotion) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

// Count up a [data-countup] element from 0 to its target once, using
// animate()'s documented "single value" form (a bare from/to pair drives
// onUpdate — this is the one animate() shape this vendored build is known
// to run reliably, per the note above, so count-up reuses it rather than
// reaching for an untested helper).
function countUpOnce(el) {
  const target = Number(el.dataset.countup);
  if (!Number.isFinite(target)) return;
  const suffix = el.dataset.countupSuffix || "";
  animate(0, target, {
    duration: 1.6,
    ease: "easeOut",
    onUpdate: (latest) => {
      el.textContent = Math.round(latest) + suffix;
    },
  });
}

if (!prefersReducedMotion) {
  const ease = [0.16, 0.9, 0.3, 1];

  // --- Single-element reveals: section headings, pricing tables, contact cards, tint-shade card ---
  const singleSelector = "main .section h2, .pricing-table-wrap, .contact-grid > .card, .tint-shade-card";
  document.querySelectorAll(singleSelector).forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    revealOnce(el, (element) => {
      animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 0.7, ease });
    });
  });

  // --- Staggered vertical-rise reveals: trust bar, gallery grid ---
  const verticalGroups = [
    { group: ".trust-bar", items: ".trust-item" },
    { group: ".gallery-grid", items: ".gallery-photo, .gallery-placeholder" },
  ];

  verticalGroups.forEach(({ group, items }) => {
    document.querySelectorAll(group).forEach((groupEl) => {
      const children = groupEl.querySelectorAll(items);
      if (!children.length) return;

      children.forEach((child) => {
        child.style.opacity = "0";
        child.style.transform = "translateY(32px)";
      });

      revealOnce(groupEl, () => {
        animate(
          children,
          { opacity: [0, 1], y: [32, 0] },
          { delay: stagger(0.12), duration: 0.6, ease }
        );
        // Stat numbers count up in step with their own card's reveal,
        // rather than all firing at once.
        children.forEach((child, i) => {
          const counter = child.querySelector("[data-countup]");
          if (!counter) return;
          setTimeout(() => countUpOnce(counter), i * 120);
        });
      });
    });
  });

  // --- Card grids: alternating slide-in from left/right, more noticeable than a plain fade ---
  document.querySelectorAll(".card-grid").forEach((groupEl) => {
    const cards = groupEl.querySelectorAll(".card");
    if (!cards.length) return;

    cards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -60 : 60;
      card.style.opacity = "0";
      card.style.transform = `translate(${fromX}px, 24px)`;
      card.dataset.fromX = String(fromX);
    });

    revealOnce(groupEl, () => {
      cards.forEach((card, i) => {
        const fromX = Number(card.dataset.fromX);
        animate(
          card,
          { opacity: [0, 1], x: [fromX, 0], y: [24, 0] },
          { delay: i * 0.12, duration: 0.65, ease }
        );
      });
    });
  });

  // --- Noticeable spring hover on primary buttons ---
  document.querySelectorAll(".btn-accent").forEach((btn) => {
    btn.addEventListener("pointerenter", () => {
      animate(btn, { scale: 1.08 }, { type: "spring", bounce: 0.45, visualDuration: 0.3 });
    });
    btn.addEventListener("pointerleave", () => {
      animate(btn, { scale: 1 }, { type: "spring", bounce: 0.45, visualDuration: 0.3 });
    });
    // Keyboard focus gets the same treatment so the effect isn't mouse-only.
    btn.addEventListener("focusin", () => {
      animate(btn, { scale: 1.08 }, { type: "spring", bounce: 0.45, visualDuration: 0.3 });
    });
    btn.addEventListener("focusout", () => {
      animate(btn, { scale: 1 }, { type: "spring", bounce: 0.45, visualDuration: 0.3 });
    });
  });

  // --- Noticeable hover lift on cards (adds to the existing CSS shadow/lift) ---
  document.querySelectorAll(".card, .trust-item").forEach((card) => {
    card.addEventListener("pointerenter", () => {
      animate(card, { y: [0, -8] }, { type: "spring", bounce: 0.4, visualDuration: 0.3 });
    });
    card.addEventListener("pointerleave", () => {
      animate(card, { y: [-8, 0] }, { type: "spring", bounce: 0.4, visualDuration: 0.3 });
    });
  });
}
