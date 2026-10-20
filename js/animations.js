// Count-up stat numbers and a subtle reveal on section headings, built with
// Motion (vendored in js/vendor/motion.js). Motion is deliberately kept
// minimal: the hero load-in is pure CSS, the before/after sliders live in
// before-after.js, and nothing else moves.
// Respects prefers-reduced-motion: if the visitor asked for reduced motion,
// this file does nothing and every element/number stays at its normal,
// final, visible state.
import { animate } from "./vendor/motion.js";

// NOTE: this uses a native IntersectionObserver instead of Motion's own
// `inView()` helper — in this vendored build `inView()` didn't fire reliably
// for every matched element, while a plain IntersectionObserver calling the
// same animate() works every time.
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
// declarative HTML — CSS can't stop them from starting. Outside the main
// guard (runs regardless) so a reduced-motion visitor gets the static
// poster frame, not a moving video.
const heroVideo = document.querySelector(".hero-video-bg");
if (heroVideo && prefersReducedMotion) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

// Count up a [data-countup] element from 0 to its target once, using
// animate()'s "single value" form (a bare from/to pair drives onUpdate).
function countUpOnce(el) {
  const target = Number(el.dataset.countup);
  if (!Number.isFinite(target)) return;
  const suffix = el.dataset.countupSuffix || "";
  el.textContent = "0" + suffix;
  animate(0, target, {
    duration: 1.4,
    ease: "easeOut",
    onUpdate: (latest) => {
      el.textContent = Math.round(latest) + suffix;
    },
  });
}

if (!prefersReducedMotion) {
  const ease = [0.16, 1, 0.3, 1];

  // --- Hero stat bar: already in view on load, so count up right away —
  // or, while the tint-reveal intro is covering the page, as soon as it lifts.
  const heroCounters = document.querySelectorAll(".hero-stats [data-countup]");
  if (heroCounters.length) {
    const runHero = () => setTimeout(() => heroCounters.forEach(countUpOnce), 250);
    if (document.documentElement.classList.contains("intro-active")) {
      document.addEventListener("intro:release", runHero, { once: true });
    } else {
      runHero();
    }
  }

  // --- Other stat numbers (about page): count up when scrolled into view.
  document.querySelectorAll(".trust-bar").forEach((bar) => {
    revealOnce(bar, () => bar.querySelectorAll("[data-countup]").forEach(countUpOnce));
  });

  // --- Section headings: a short 16px rise.
  document.querySelectorAll("main .section h2").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    revealOnce(el, (element) => {
      animate(element, { opacity: [0, 1], y: [16, 0] }, { duration: 0.35, ease });
    });
  });
}
