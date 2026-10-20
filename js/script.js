// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// Tint-reveal intro (home page). The <head> script decides whether it plays
// and the CSS animation runs it; this only handles tap/key-to-skip and
// cleanup. If this file never loads, the CSS animation still lifts the layer
// off on its own.
(() => {
  const root = document.documentElement;
  const layer = document.getElementById('introLayer');
  if (!layer || !root.classList.contains('intro-active')) return;

  // "intro:release" tells animations.js the hero is visible (count-up can run).
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    document.dispatchEvent(new CustomEvent('intro:release'));
  };
  const finish = () => {
    layer.remove();
    root.classList.remove('intro-active', 'intro-skipped');
    release();
  };
  const skip = () => {
    if (layer.classList.contains('is-skipping')) return;
    layer.classList.add('is-skipping');
    // Release the hero load-in now instead of at its intro-length delay.
    root.classList.remove('intro-active');
    root.classList.add('intro-skipped');
    release();
  };

  layer.addEventListener('animationend', (e) => {
    if (e.target === layer) finish();
  });
  layer.addEventListener('pointerdown', skip);
  window.addEventListener('keydown', skip, { once: true });
  // Safety net in case animation events never fire (e.g. background tab).
  setTimeout(finish, 2500);
})();
