/* Cathcart Group — site interactions */
(function () {
  "use strict";

  /* Sticky header */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      header.classList.toggle("nav-open", open);
      if (open) header.classList.add("is-solid");
      else onScroll();
    });
    /* Mobile dropdown accordions */
    nav.querySelectorAll(".has-dropdown > a").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.matchMedia("(max-width: 1080px)").matches) {
          var item = link.parentElement;
          if (!item.classList.contains("is-expanded")) {
            e.preventDefault();
            nav.querySelectorAll(".nav-item.is-expanded").forEach(function (o) {
              if (o !== item) o.classList.remove("is-expanded");
            });
            item.classList.add("is-expanded");
          }
        }
      });
    });
  }

  /* Scroll reveal */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Animated counters */
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!reduced && "IntersectionObserver" in window) {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(function (el) {
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        el.textContent = prefix + parseFloat(el.getAttribute("data-count")).toLocaleString("en-US") + suffix;
      });
    }
  }

  /* Gracefully hide images that fail to load (assets are hotlinked until localized) */
  document.addEventListener(
    "error",
    function (e) {
      var el = e.target;
      if (el && el.tagName === "IMG") {
        var fig = el.closest("figure");
        if (fig) fig.style.display = "none";
        else el.style.visibility = "hidden";
      }
    },
    true
  );

  /* Current year in footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Basic client-side form UX (forms need a backend or Formspree — see README) */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (form.getAttribute("action") === "#") {
        e.preventDefault();
        var note = form.querySelector(".form-status");
        if (note) {
          note.textContent =
            "Preview mode: this form is not yet connected to a backend. See the project README to activate it (Formspree or your own endpoint).";
          note.style.color = "#b08d57";
        }
      }
    });
  });
})();
