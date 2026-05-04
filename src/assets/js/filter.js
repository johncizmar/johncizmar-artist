// Category filter for the work grid.
// Toggles a `data-active-category` attribute on the grid; an injected
// stylesheet rule (one at a time) shows only matching pieces.
(function () {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  const buttons = document.querySelectorAll(".filter");
  if (!buttons.length) return;

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);

  function applyFilter(slug) {
    grid.dataset.activeCategory = slug;
    if (slug === "all") {
      styleEl.textContent = "";
    } else {
      // Show pieces whose data-categories token list contains the slug.
      styleEl.textContent =
        '#work-grid[data-active-category="' + slug + '"] .piece[data-categories~="' + slug + '"] { display: block; }';
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(btn.dataset.filter);
    });
  });
})();
