const STATIC_VERSION = 'hot-static-v4';
const HEAVY_IMAGE_PREFIX = '/FRONTPAGE/assets/assets/'; // leave cache-first for these only

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_VERSION).then((cache) => {
      return cache.addAll([
        '/',
        '/FRONTPAGE/index.html',
        '/FRONTPAGE/berenice.html',
        '/icons/icon-192.png',
        '/icons/icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Runtime cache for GET requests only
  if (req.method !== 'GET') return;

  // Network-first for API; fallback to cache
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/engine')) {
    event.respondWith(
      fetch(req).then((res) => {
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Strategy: network-first for HTML/JS/CSS to auto-refresh; cache-first only for heavy images
  const isHeavyImage = url.pathname.startsWith(HEAVY_IMAGE_PREFIX) || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.webp');
  if (isHeavyImage) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(STATIC_VERSION).then(cache => cache.put(req, copy));
        return res;
      }))
    );
    return;
  }
  // For app shell and scripts: network-first to get updates, fallback cache offline
  event.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(STATIC_VERSION).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(cached => cached || caches.match('/FRONTPAGE/index.html')))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== STATIC_VERSION).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});