const CACHE = 'stvincent-v1';
const OFFLINE_URL = '/index.html';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([
        OFFLINE_URL,
        '/styles.css',
        '/manifest.json'
      ]).catch(() => {
        // Files don't exist yet, that's okay
        console.log('Some files not available for caching during install');
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Handle navigation requests
  if(event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Handle other requests (CSS, JS, images)
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
      .catch(() => new Response('Offline - Resource not available'))
  );
});
