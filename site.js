// Animaciones de la web: aparición al hacer scroll, brillo de las tarjetas y celulares que siguen al mouse.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  var hero = document.querySelector(".hero");
  var stack = document.querySelector(".hero-visual .stack");
  if (hero && stack && !reduced && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      stack.style.transform = "rotateY(" + x * 14 + "deg) rotateX(" + -y * 10 + "deg)";
    });
    hero.addEventListener("pointerleave", function () { stack.style.transform = ""; });
  }
})();
