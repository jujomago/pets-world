// OneSignalSDKWorker.js
// Este archivo es requerido por OneSignal para funcionar correctamente
// Service Worker principal que incluye el SDK de OneSignal y funcionalidades PWA

// Importar el OneSignalSDK desde el CDN
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Configuración básica del Service Worker para PWA
const CACHE_NAME = "mundo-mascotas-v1";
const urlsToCache = ["/", "/manifest.json"];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Cache abierto");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Service Worker: Eliminando cache antiguo", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones para cache
self.addEventListener("fetch", (event) => {
  // OneSignal maneja sus propias peticiones, así que solo cacheamos otras
  if (!event.request.url.includes("onesignal.com")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Cache hit - devolver respuesta
        if (response) {
          return response;
        }
        // Clonar la petición
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response) => {
          // Verificar si la respuesta es válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          // Clonar la respuesta
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  }
});
