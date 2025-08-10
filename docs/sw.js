const CACHE_NAME = 'hot-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manuel.html',
  '/spectator.html',
  '/test-runner.html',
  '/demo.html',
  '/pwa.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
