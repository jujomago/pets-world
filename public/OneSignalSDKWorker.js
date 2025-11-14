// Importar el OneSignalSDK desde el CDN
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

const CACHE_NAME = "mascotas-perdidas-cache-v1";

self.addEventListener("install", (event) => {
  console.log("[OneSignal SW] Instalado");
  // Forzar al nuevo Service Worker a activarse inmediatamente.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cachear el manifiesto para una mejor experiencia PWA.
      // No cacheamos la página de inicio "/" para evitar contenido obsoleto.
      return cache.add("/manifest.json");
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[OneSignal SW] Activado");
  // Limpiar cachés antiguas
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log("[OneSignal SW] Eliminando caché antiguo:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim()) // Tomar control de las pestañas abiertas
  );
});

self.addEventListener("fetch", (event) => {
  // Solo manejamos peticiones GET. Otras (POST, etc.) van directo a la red.
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  // Estrategia "Cache First" para assets estáticos (CSS, imágenes, fuentes).
  // Excluimos explícitamente los archivos .js
  if (
    url.pathname.match(/\.(css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Si está en caché, lo servimos. Si no, lo pedimos a la red y lo guardamos.
        return (
          cachedResponse ||
          fetch(event.request).then((networkResponse) => {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return networkResponse;
          })
        );
      })
    );
    return;
  }

  // Para todo lo demás (páginas HTML, archivos JS, llamadas a API),
  // dejamos que la petición vaya directamente a la red.
  // No usamos event.respondWith() para que el navegador maneje la petición de forma normal.
  return;
});
