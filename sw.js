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