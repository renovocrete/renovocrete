/**
 * Deployment configuration for the RENOVO CRETE Professional Portal.
 *
 * This is the only file that has to change when the portal is white-labelled or
 * promoted from a demonstration build to a customer deployment. It is loaded
 * before every other script.
 */
window.RENOVO_CONFIG = {
  /** Product name shown in the browser tab, bookmarks and installed PWA. */
  productName: 'RENOVO CRETE — Professional Portal',

  /**
   * Demonstration mode. When true the sign-in screen advertises the seeded
   * local accounts below. Set to false for any deployment that is reachable by
   * a third party: the seeded accounts are stored in the browser and are not a
   * substitute for server-side authentication.
   */
  demoMode: true,

  demoCredentials: [
    { role: 'Administrator', email: 'admin@renovocrete.local', password: 'Renovo2026!' },
    { role: 'Professional', email: 'demo@renovocrete.local', password: 'Client2026!' },
  ],
};

// Integration endpoints (transactional email, invoice archive, visualiser
// proxy, assistant proxy) are not configured here: they are per-tenant runtime
// settings edited in Governance > Settings inside the portal.
