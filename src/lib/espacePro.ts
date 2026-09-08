/**
 * The professional portal is a standalone static app generated into
 * `public/espace-pro/` by `scripts/import-portal.mjs`. Hosts with SPA fallback
 * (Vite dev server, Lovable, Netlify…) only serve it reliably through its explicit
 * file URL, so the React routes embed that URL instead of redirecting.
 */
export const ESPACE_PRO_URL = "/espace-pro/index.html";

/** Query string appended to force the demo-accounts box (see public/espace-pro/portal.config.js). */
export const ESPACE_PRO_DEMO_URL = `${ESPACE_PRO_URL}?demo=1`;
