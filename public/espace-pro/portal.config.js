/*
 * Runtime configuration for the RENOVO CRETE professional portal.
 * Hand-maintained: scripts/import-portal.mjs never overwrites this file.
 */
window.RENOVO_PORTAL_CONFIG = {
  /** Browser tab / PWA title. */
  title: "RENOVO CRETE — Professional Portal",

  /**
   * Visibility of the "demo accounts" box on the sign-in screen.
   *   "auto"  -> shown on local/preview hosts (see previewHosts) or when the URL contains ?demo=1
   *   true    -> always shown (trade shows, guided demos)
   *   false   -> never shown (public production)
   */
  showDemoAccounts: "auto",

  /** Hosts considered as preview/staging when showDemoAccounts is "auto". */
  previewHosts: ["localhost", "127.0.0.1", ".lovable.app", ".lovableproject.com", ".netlify.app", ".vercel.app"],

  /** Keep the offline cache (service worker) enabled. Set to false to disable and unregister it. */
  serviceWorker: true,

  /** Public website the portal belongs to (used by the "back to site" link on the sign-in screen). */
  siteUrl: "/",
};
