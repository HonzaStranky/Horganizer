(function () {
  "use strict";

  /* ---------------- Nav scroll state ---------------- */
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("navMobile");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Hero mini progress animation (runs once on load) ---------------- */
  var heroFill = document.getElementById("heroProgressFill");
  var heroStatus = document.getElementById("heroStatus");
  if (heroFill && heroStatus) {
    setTimeout(function () {
      heroFill.style.width = "78%";
      heroStatus.textContent = "Done: organized 42 item(s), errors: 0.";
    }, 900);
  }

  /* ---------------- App window tab switching ---------------- */
  var tabButtons = document.querySelectorAll(".app-tab");
  var panels = document.querySelectorAll(".app-panel");

  function activateTab(tabName) {
    tabButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });
    panels.forEach(function (panel) {
      panel.classList.toggle("active", panel.getAttribute("data-panel") === tabName);
    });
    if (tabName === "monitoring") {
      runMonitorPillLoop();
    }
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activateTab(btn.getAttribute("data-tab"));
    });
  });

  /* ---------------- Demo "Organize Downloads" button inside showcase ---------------- */
  var demoOrganizeBtn = document.getElementById("demoOrganizeBtn");
  var demoRestoreBtn = document.getElementById("demoRestoreBtn");
  var demoProgressFill = document.getElementById("demoProgressFill");
  var demoStatus = document.getElementById("demoStatus");
  var demoRunning = false;

  function runDemoOrganize() {
    if (demoRunning) return;
    demoRunning = true;
    demoProgressFill.style.width = "0%";
    demoStatus.textContent = "Organizing files...";
    setTimeout(function () {
      demoProgressFill.style.width = "100%";
    }, 60);
    setTimeout(function () {
      demoStatus.textContent = "Done: organized 42 item(s), errors: 0.";
      setTimeout(function () {
        demoProgressFill.style.width = "0%";
        demoRunning = false;
      }, 1400);
    }, 1500);
  }

  function runDemoRestore() {
    if (demoRunning) return;
    demoRunning = true;
    demoProgressFill.style.width = "0%";
    demoStatus.textContent = "Restoring files...";
    setTimeout(function () {
      demoProgressFill.style.width = "100%";
    }, 60);
    setTimeout(function () {
      demoStatus.textContent = "Done: organized 42 item(s), errors: 0.";
      setTimeout(function () {
        demoProgressFill.style.width = "0%";
        demoStatus.textContent = "Ready to organize files.";
        demoRunning = false;
      }, 1400);
    }, 1300);
  }

  if (demoOrganizeBtn) demoOrganizeBtn.addEventListener("click", runDemoOrganize);
  if (demoRestoreBtn) demoRestoreBtn.addEventListener("click", runDemoRestore);

  /* ---------------- Monitoring pill pulse loop (purely visual) ---------------- */
  var monitorPillStarted = false;
  function runMonitorPillLoop() {
    if (monitorPillStarted) return;
    monitorPillStarted = true;
    var pill = document.getElementById("monitorPill");
    if (!pill) return;
    // subtle pulse to feel "live"
    setInterval(function () {
      pill.style.opacity = "0.6";
      setTimeout(function () {
        pill.style.opacity = "1";
      }, 220);
    }, 3200);
  }

  /* ---------------- Feature 3: Auto Monitoring timeline animation on scroll ---------------- */
  var timeline = document.getElementById("monitorTimeline");
  if (timeline) {
    var steps = timeline.querySelectorAll(".tl-step");
    var timelinePlayed = false;

    function playTimeline() {
      if (timelinePlayed) return;
      timelinePlayed = true;
      steps.forEach(function (step, i) {
        setTimeout(function () {
          steps.forEach(function (s) { s.classList.remove("active"); });
          step.classList.add("active");
          if (i > 0) steps[i - 1].classList.add("done");
          if (i === steps.length - 1) {
            setTimeout(function () { step.classList.add("done"); }, 700);
          }
        }, i * 750);
      });
    }

    var timelineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          playTimeline();
          timelineObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });
    timelineObserver.observe(timeline);
  }

  /* ---------------- Reveal-on-scroll for feature rows / cards ---------------- */
  var revealTargets = document.querySelectorAll(
    ".feature-row, .why-card, .pipe-step, .ba-card, .pricing-card"
  );
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
      revealObserver.observe(el);
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    q.addEventListener("click", function () {
      var wasOpen = item.classList.contains("open");
      faqItems.forEach(function (i) { i.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ---------------- Purchase modal ---------------- */
  var modalOverlay = document.getElementById("modalOverlay");
  var openers = [document.getElementById("openPurchaseModal")].concat(
    Array.prototype.slice.call(document.querySelectorAll('a[href="#pricing"].btn-primary'))
  );
  var modalClose = document.getElementById("modalClose");
  var modalCloseBtn = document.getElementById("modalCloseBtn");

  function openModal(e) {
    if (e) e.preventDefault();
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Only the explicit "Get Horganizer PRO" CTA buttons open the modal directly;
  // nav / hero / final CTA links scroll to pricing section instead of jumping straight to modal,
  // except the actual pricing card button.
  var pricingBtn = document.getElementById("openPurchaseModal");
  if (pricingBtn) pricingBtn.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
})();
