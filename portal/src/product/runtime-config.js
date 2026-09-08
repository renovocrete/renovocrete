/*
 * Applies window.RENOVO_CONFIG once every legacy layer has run.
 *
 * The layered patches used to each overwrite document.title with their own
 * changelog string, so the tab ended up reading "V29 Launch Readiness". The
 * product name now comes from a single place, and the seeded demonstration
 * accounts are only advertised when the deployment opts into demo mode.
 */
(function () {
  'use strict';

  var config = window.RENOVO_CONFIG || {};

  if (config.productName) {
    document.title = config.productName;
  }

  var box = document.getElementById('demoCredentials');
  if (!box) return;

  var credentials = config.demoMode ? config.demoCredentials || [] : [];
  if (!credentials.length) {
    box.hidden = true;
    return;
  }

  var heading = document.createElement('b');
  heading.textContent = 'Demonstration accounts (local data only)';
  box.appendChild(heading);

  var list = document.createElement('ul');
  list.className = 'demo-box-list';
  credentials.forEach(function (credential) {
    var item = document.createElement('li');
    item.textContent = credential.role + ' — ' + credential.email + ' / ' + credential.password;
    list.appendChild(item);
  });
  box.appendChild(list);
  box.hidden = false;
})();
