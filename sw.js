const CACHE_NAME = 'moovio-cache-v1';
const urlsToCache = [
  'index.html',
  'player.html',
  'splash.html',
  'manifest.json',
  'sw.js',
  'icons/icon-192.jpg',
  'icons/icon-512.jpg',
  // Tambahkan asset lain jika perlu:
  // 'css/style.css',
  // 'js/app.js',
  // 'assets/banner.jpg',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});