const CACHE_NAME = 'cardapio-v28-gold';

// Instalação: pula a espera para ativar logo
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Ativação: limpa caches antigos para não dar erro de versão
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Busca: Tenta buscar na internet primeiro; se estiver sem rede, usa o cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});

// Suporte para notificações em segundo plano (se o sistema permitir)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'Hora de olhar o cardápio!';
  event.waitUntil(
    self.registration.showNotification('Cardápio Inteligente', {
      body: data,
      icon: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png'
    })
  );
});
