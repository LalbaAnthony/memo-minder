// public/sw.js

self.addEventListener('install', event => {
    // Vous pouvez pré-cacher ici vos fichiers statiques si besoin
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    // On prend contrôle immédiat des pages
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Si c'est une route API, on ne touche pas à la requête
    if (url.pathname.startsWith('/api/')) {
        return;
    }

    // Sinon, on essaye le cache puis le réseau
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
