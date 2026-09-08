/*
 * Production layer for the RENOVO CRETE professional portal.
 * Loaded after every generated layer (see scripts/import-portal.mjs).
 * Hand-maintained: the importer never overwrites this file.
 */
(function () {
  "use strict";
  var cfg = window.RENOVO_PORTAL_CONFIG || {};
  var doc = document;

  /* ---------- Diagnostics: keep the last runtime errors for support ---------- */
  function remember(kind, message) {
    try {
      var key = "renovo.portal.errors";
      var list = JSON.parse(sessionStorage.getItem(key) || "[]");
      list.push({ at: new Date().toISOString(), kind: kind, message: String(message).slice(0, 500) });
      sessionStorage.setItem(key, JSON.stringify(list.slice(-20)));
    } catch (e) {
      /* storage unavailable */
    }
  }
  window.addEventListener("error", function (e) {
    remember("error", (e && e.message) || e);
  });
  window.addEventListener("unhandledrejection", function (e) {
    remember("unhandledrejection", (e && e.reason && (e.reason.message || e.reason)) || e);
  });

  /* ---------- Stable document title (layers set development titles at load) ---------- */
  var title = cfg.title || "RENOVO CRETE — Professional Portal";
  function applyTitle() {
    if (doc.title !== title) doc.title = title;
  }
  applyTitle();
  try {
    var titleEl = doc.querySelector("title");
    if (titleEl && "MutationObserver" in window) {
      new MutationObserver(applyTitle).observe(titleEl, { childList: true, characterData: true, subtree: true });
    }
  } catch (e) {
    /* observer unsupported */
  }

  /* ---------- Demo accounts visibility ---------- */
  function isPreviewHost() {
    var host = location.hostname;
    return (cfg.previewHosts || []).some(function (h) {
      return h.charAt(0) === "." ? host.slice(-h.length) === h || host === h.slice(1) : host === h;
    });
  }
  function demoAccountsVisible() {
    if (cfg.showDemoAccounts === true) return true;
    if (cfg.showDemoAccounts === false) return false;
    if (/[?&]demo=1(&|$)/.test(location.search)) return true;
    return isPreviewHost();
  }
  var style = doc.createElement("style");
  style.id = "portal-launch-style";
  style.textContent =
    'html[data-demo-accounts="hidden"] .demo-box{display:none!important}' +
    ".portal-back-link{margin:14px 0 0;font-size:12px;text-align:center}" +
    ".portal-back-link a{color:#294b94;font-weight:800;text-decoration:none}" +
    ".portal-back-link a:hover{text-decoration:underline}";
  doc.head.appendChild(style);
  doc.documentElement.setAttribute("data-demo-accounts", demoAccountsVisible() ? "visible" : "hidden");

  /* ---------- Link back to the public website from the sign-in screen ---------- */
  var BACK_LABEL = { fr: "← Retour au site RENOVO CRETE", es: "← Volver al sitio RENOVO CRETE", en: "← Back to the RENOVO CRETE website" };
  function hydrateBackLink() {
    var card = doc.querySelector("#authScreen .login-card");
    if (!card || !cfg.siteUrl) return;
    var lang = (doc.documentElement.lang || "en").slice(0, 2).toLowerCase();
    var label = BACK_LABEL[lang] || BACK_LABEL.en;
    // A <div> appended last: layers re-label the card's first <p>/<h2> by position, so it must not sit there.
    var box = card.querySelector(".portal-back-link");
    if (!box) {
      box = doc.createElement("div");
      box.className = "portal-back-link";
      card.appendChild(box);
    }
    var link = box.querySelector("a");
    if (!link) {
      box.textContent = "";
      link = doc.createElement("a");
      link.target = "_top";
      link.rel = "noopener";
      box.appendChild(link);
    }
    if (link.getAttribute("href") !== cfg.siteUrl) link.href = cfg.siteUrl;
    if (link.textContent !== label) link.textContent = label;
  }
  hydrateBackLink();
  try {
    var auth = doc.getElementById("authScreen");
    if (auth && "MutationObserver" in window) {
      var scheduled = false;
      new MutationObserver(function () {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(function () {
          scheduled = false;
          hydrateBackLink();
        });
      }).observe(auth, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    }
  } catch (e) {
    /* observer unsupported */
  }

  /* ---------- Service worker opt-out ---------- */
  if (cfg.serviceWorker === false && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then(function (regs) {
        regs.forEach(function (r) {
          r.unregister();
        });
      })
      .catch(function () {});
  }
})();
