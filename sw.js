self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('hot-static-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/FRONTPAGE/index.html',
        '/BERENICE_BRUHNNICE_GAME.html',
        '/FRONTPAGE/assets/hero-bg.jpg',
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

  // Cache-first for static
  event.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req, { cache: 'no-store' }).then((res) => {
        const copy = res.clone();
        caches.open('hot-static-v1').then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => {
        // Offline fallback to shell
        if (url.pathname === '/' || url.pathname.endsWith('.html')) {
          return caches.match('/FRONTPAGE/index.html');
        }
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== 'hot-static-v1').map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Heroes of Time - Service Worker v1.0
// Minimal passthrough with basic offline support

const CACHE_NAME = 'hot-v1';
const urlsToCache = [
  '/',
  '/FRONTPAGE/index.html',
  '/FRONTPAGE/assets/assets/compressed/ExKAlibur.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Passthrough for most requests, cache-first for critical assets
  if (event.request.url.includes('/FRONTPAGE/') || 
      event.request.url.endsWith('.html')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});