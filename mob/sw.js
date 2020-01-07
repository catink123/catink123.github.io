const cacheName = 'MoB v0.1.1';
var filesToCache = [
	'./',
	'./index.html',
	'./css/main.css',
	'./js/main.js'
];

self.addEventListener('install', function (e) {
	console.log('[ServiceWorker] Install');
	caches.keys().then(function(cacheNames) {
		cacheNames.forEach(function(cacheName) {
		  caches.delete(cacheName);
		});
	  });
	e.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request, { ignoreSearch: true }).then(response => {
			return response || fetch(event.request);
		})
	);
});

self.addEventListener('message', e => {
	if (e.data.action === 'skipWaiting') {
		self.skipWaiting();
	}
})