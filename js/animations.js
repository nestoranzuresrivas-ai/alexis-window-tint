// Scroll reveals + a subtle hover spring, built with Motion (vendored in js/vendor/motion.js).
// Respects prefers-reduced-motion: if the visitor asked for reduced motion,
// this file does nothing and every element stays at its normal, visible state.
import { animate, inView, stagger } from "./vendor/motion.js";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const ease = [0.16, 0.9, 0.3, 1];
  const revealMargin = { margin: "0px 0px -12% 0px" };

  // --- Single-element reveals: section headings, pricing tables, contact cards ---
  const singleSelector = "main .section h2, .pricing-table-wrap, .contact-grid > .card";
  const singleEls = document.querySelectorAll(singleSelector);

  singleEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
  });

  if (singleEls.length) {
    inView(
      singleSelector,
      (element) => {
        animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 0.7, ease });
      },
      revealMargin
    );
  }

  // --- Staggered vertical-rise reveals: trust bar, gallery grid ---
  const verticalGroups = [
    { group: ".trust-bar", items: ".trust-item" },
    { group: ".gallery-grid", items: ".gallery-placeholder" },
  ];

  verticalGroups.forEach(({ group, items }) => {
    document.querySelectorAll(group).forEach((groupEl) => {
      const children = groupEl.querySelectorAll(items);
      if (!children.length) return;

      children.forEach((child) => {
        child.style.opacity = "0";
        child.style.transform = "translateY(32px)";
      });

      inView(
        groupEl,
        () => {
          animate(
            children,
            { opacity: [0, 1], y: [32, 0] },
            { delay: stagger(0.12), duration: 0.6, ease }
          );
        },
        revealMargin
      );
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

    inView(
      groupEl,
      () => {
        cards.forEach((card, i) => {
          const fromX = Number(card.dataset.fromX);
          animate(
            card,
            { opacity: [0, 1], x: [fromX, 0], y: [24, 0] },
            { delay: i * 0.12, duration: 0.65, ease }
          );
        });
      },
      revealMargin
    );
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
