const staticCacheName = 'site-static-v1'
const assets = [
    '.',
    'index.html',
    'image/logo.png',
    'calculator/style.css',
    'images/icons/icon-128x128.png',
    'images/icons/icon-192x192.png'
]

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((caches) => {
            console.log('Кэширование ресурсов')
            caches.addAll(assets)
        })
    )
})

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key!== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    )
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cachesRes => {
            return cachesRes || fetch(evt.request)
        })
    )
})