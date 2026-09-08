/**
 * Service worker for the RENOVO CRETE Professional Portal.
 *
 * `tools/build.mjs` rewrites CACHE_VERSION and PRECACHE with the hashed asset
 * list of the build. Served straight from `src/` (development) the placeholder
 * values stay in place and only runtime caching applies.
 */
const CACHE_VERSION = 'dev';
const PRECACHE = [];

const SHELL_CACHE = `renovo-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `renovo-runtime-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      if (PRECACHE.length) {
        const cache = await caches.open(SHELL_CACHE);
        await cache.addAll(PRECACHE);
      }
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL_CACHE, RUNTIME_CACHE]);
      const names = await caches.keys();
      await Promise.all(names.filter((n) => !keep.has(n)).map((n) => caches.delete(n)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});

const isSameOrigin = (url) => new URL(url, self.location.href).origin === self.location.origin;

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !isSameOrigin(request.url)) return;

  // Navigations: serve the cached shell when the network is unavailable so the
  // portal keeps working offline, which is one of its advertised capabilities.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(SHELL_CACHE);
          return (await cache.match(PRECACHE[0] ?? 'index.html')) ?? Response.error();
        }
      })(),
    );
    return;
  }

  // Everything else is immutable once built, so cache-first is safe and keeps
  // the 240-odd colour swatches off the network after the first visit.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        return cached ?? Response.error();
      }
    })(),
  );
});
