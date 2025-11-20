const CACHE_NAME = 'st-vincents-v1.0.0';
const RUNTIME_CACHE = 'st-vincents-runtime';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/programs.html',
    '/gallery.html',
    '/blogs.html',
    '/faq.html',
    '/contact.html',
    '/css/styles.css',
    '/js/main.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    if (url.origin !== location.origin) {
        return;
    }
    
    event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const runtimeCache = await caches.open(RUNTIME_CACHE);
            runtimeCache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        const offlinePage = await cache.match('/index.html');
        if (offlinePage) {
            return offlinePage;
        }
        throw error;
    }
}
