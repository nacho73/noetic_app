const CACHE_NAME = 'noetic-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400&display=swap'
];

// Instalación: Guarda los archivos en la memoria del móvil
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache abierto');
      return cache.addAll(assets);
    })
  );
});

// Activación: Limpia versiones antiguas si las hubiera
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
});

// Estrategia de carga: Intenta cargar de la memoria, si no, busca en internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});