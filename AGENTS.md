# Architecture rules
- Public website content is stored as a validated document in `site_content`; shared hooks supply fallbacks and temporary photo URLs so editing does not require changing page code.
- Website content and media writes require an active administrator through server-enforced policies; never derive administrative rights from browser storage.
- Professional entry points navigate to the configured external portal without transferring credentials or sessions; local website administration remains available separately.
- Website copy overrides are keyed by the original French string; preserve multilingual defaults and avoid injecting editable HTML.
