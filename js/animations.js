// Scroll reveals + a subtle hover spring, built with Motion (vendored in js/vendor/motion.js).
// Respects prefers-reduced-motion: if the visitor asked for reduced motion,
// this file does nothing and every element stays at its normal, visible state.
import { animate, inView, stagger } from "./vendor/motion.js";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
  const ease = [0.17, 0.55, 0.55, 1];
  const revealMargin = { margin: "0px 0px -10% 0px" };

  // --- Single-element reveals: section headings, pricing tables, contact cards ---
  const singleSelector = "main .section h2, .pricing-table-wrap, .contact-grid > .card";
  const singleEls = document.querySelectorAll(singleSelector);

  singleEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });

  if (singleEls.length) {
    inView(
      singleSelector,
      (element) => {
        animate(element, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, ease });
      },
      revealMargin
    );
  }

  // --- Staggered group reveals: card grids, trust bar, gallery grid ---
  const groups = [
    { group: ".card-grid", items: ".card" },
    { group: ".trust-bar", items: ".trust-item" },
    { group: ".gallery-grid", items: ".gallery-placeholder" },
  ];

  groups.forEach(({ group, items }) => {
    document.querySelectorAll(group).forEach((groupEl) => {
      const children = groupEl.querySelectorAll(items);
      if (!children.length) return;

      children.forEach((child) => {
        child.style.opacity = "0";
        child.style.transform = "translateY(16px)";
      });

      inView(
        groupEl,
        () => {
          animate(
            children,
            { opacity: [0, 1], y: [16, 0] },
            { delay: stagger(0.08), duration: 0.5, ease }
          );
        },
        revealMargin
      );
    });
  });

  // --- Subtle spring hover on primary buttons ---
  document.querySelectorAll(".btn-accent").forEach((btn) => {
    btn.addEventListener("pointerenter", () => {
      animate(btn, { scale: 1.035 }, { type: "spring", bounce: 0.35, visualDuration: 0.25 });
    });
    btn.addEventListener("pointerleave", () => {
      animate(btn, { scale: 1 }, { type: "spring", bounce: 0.35, visualDuration: 0.25 });
    });
    // Keyboard focus gets the same treatment so the effect isn't mouse-only.
    btn.addEventListener("focusin", () => {
      animate(btn, { scale: 1.035 }, { type: "spring", bounce: 0.35, visualDuration: 0.25 });
    });
    btn.addEventListener("focusout", () => {
      animate(btn, { scale: 1 }, { type: "spring", bounce: 0.35, visualDuration: 0.25 });
    });
  });
}
