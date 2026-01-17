const CACHE_NAME = 'cardapio-v28-cache';
const assets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// Lógica para enviar notificação em segundo plano
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-alarms') {
    // Aqui o sistema pode disparar notificações mesmo fechado
  }
});
  
