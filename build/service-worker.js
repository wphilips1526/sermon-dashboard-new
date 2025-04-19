const CACHE_NAME = 'sermon-dashboard-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/main.js', // Adjust based on your build output
    '/static/css/main.css', // Adjust based on your build output
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'
];

// Install the service worker and cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event: Serve cached content when offline, cache API responses
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // Cache API responses for /style-examples and /convert-sermon
    if (requestUrl.origin === '${process.env.REACT_APP_API_URL}' && 
        (requestUrl.pathname === '/style-examples' || requestUrl.pathname === '/convert-sermon')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request)
                    .then(response => {
                        // Cache the response
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        // Serve from cache if offline
                        return caches.match(event.request);
                    });
            })
        );
    } else {
        // For other requests, try the network first, then fall back to cache
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
});