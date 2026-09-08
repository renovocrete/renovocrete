/*
 * Registered before any view renders.
 *
 * Catalogue tiles, uploaded partner logos and project photos come from data the
 * customer controls, so a missing file must degrade to the branded placeholder
 * rather than a broken-image icon. `error` does not bubble, hence the capture
 * phase listener on the document.
 */
(function () {
  'use strict';

  var PLACEHOLDER = 'assets/img/system-placeholder.jpg';

  document.addEventListener(
    'error',
    function (event) {
      var target = event.target;
      if (!target || target.tagName !== 'IMG') return;
      if (target.dataset.fallbackApplied) return;
      if (target.getAttribute('src') === PLACEHOLDER) return;
      target.dataset.fallbackApplied = '1';
      target.src = PLACEHOLDER;
    },
    true,
  );
})();
