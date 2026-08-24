// Before/After drag-compare sliders ("See the Difference" homepage section).
// Pointer Events unify mouse, touch, and pen in one set of listeners, so
// there's no separate touchstart/touchmove path to keep in sync. Arrow/Home/
// End keys on the focused card cover keyboard users.
function initBeforeAfterSlider(card) {
  const setPos = (pct) => {
    pct = Math.min(100, Math.max(0, pct));
    card.style.setProperty("--pos", pct + "%");
    card.setAttribute("aria-valuenow", String(Math.round(pct)));
  };

  const pctFromClientX = (clientX) => {
    const rect = card.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  };

  let dragging = false;

  card.addEventListener("pointerdown", (e) => {
    dragging = true;
    card.classList.add("ba-touched");
    card.focus();
    try {
      card.setPointerCapture(e.pointerId);
    } catch (err) {
      /* pointer capture is best-effort; dragging still works without it */
    }
    setPos(pctFromClientX(e.clientX));
    e.preventDefault();
  });

  card.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    setPos(pctFromClientX(e.clientX));
  });

  const stopDragging = () => {
    dragging = false;
  };
  card.addEventListener("pointerup", stopDragging);
  card.addEventListener("pointercancel", stopDragging);

  card.addEventListener("keydown", (e) => {
    const current = parseFloat(getComputedStyle(card).getPropertyValue("--pos")) || 50;
    if (e.key === "ArrowLeft") {
      setPos(current - 5);
      card.classList.add("ba-touched");
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPos(current + 5);
      card.classList.add("ba-touched");
      e.preventDefault();
    } else if (e.key === "Home") {
      setPos(0);
      card.classList.add("ba-touched");
      e.preventDefault();
    } else if (e.key === "End") {
      setPos(100);
      card.classList.add("ba-touched");
      e.preventDefault();
    }
  });
}

document.querySelectorAll(".ba-card").forEach(initBeforeAfterSlider);
