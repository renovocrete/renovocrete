# Architecture rules
- Public website content is stored as a validated document in `site_content`; shared hooks supply fallbacks and temporary photo URLs so editing does not require changing page code.
- Website content and media writes require an active administrator through server-enforced policies; never derive administrative rights from browser storage.
- Professional entry points navigate to the configured external portal without transferring credentials or sessions; local website administration remains available separately.
- Website copy overrides are keyed by the original French string; preserve multilingual defaults and avoid injecting editable HTML.

- Public visualization entry points and direct routes share the website visibility setting; default legacy content to enabled, and retain administrator previews while disabled.

- Admin entry and authenticated admin login land on the local website editor; denied admin access stays local with an explicit permissions message rather than redirecting to the external professional portal.
