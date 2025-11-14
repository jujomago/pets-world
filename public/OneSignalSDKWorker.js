// OneSignalSDKWorker.js
// Service Worker principal que incluye el SDK de OneSignal y funcionalidades PWA
//
// --- VERSIÓN MODIFICADA CON ACTUALIZACIÓN AUTOMÁTICA ---
//

// Importar el OneSignalSDK desde el CDN
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Configuración básica del Service Worker para PWA
const CACHE_NAME = "mundo-mascotas-v1";
const urlsToCache = ["/", "/manifest.json"];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando nueva versión..."); // --- ¡CAMBIO 1: Forzar la activación inmediata! --- // Esto se salta el estado de "espera" (waiting) y // activa el nuevo Service Worker en cuanto se instala.

  self.skipWaiting(); // Tu lógica original de caché

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Cache abierto");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activando nueva versión..."); // --- ¡CAMBIO 2: Limpiar caché Y tomar control! --- // Esta es tu lógica original para limpiar el caché antiguo

  const cacheCleanup = caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log("Service Worker: Eliminando cache antiguo", cacheName);
          return caches.delete(cacheName);
        }
      })
    );
  }); // Usamos Promise.all para asegurar que ambas tareas se completen // como parte del proceso de activación.

  event.waitUntil(
    Promise.all([
      cacheCleanup, // 1. Tu limpieza de caché
      self.clients.claim(), // 2. Tomar control de todas las pestañas abiertas
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // --- ¡CAMBIO 3: Excluir rutas específicas del caché! ---
  // Lista de rutas que NUNCA deben ser cacheadas (ej. páginas con datos de usuario)
  const urlsToExclude = ["/profile", "/my-pets"]; // <-- Puedes añadir más rutas aquí

  // Si la URL de la petición es una de las que queremos excluir,
  // o si es una petición a la API de OneSignal, o no es un GET, vamos directamente a la red.
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin || // Ignorar peticiones a otros dominios (como CDNs)
    urlsToExclude.includes(url.pathname)
  ) {
    // No usamos la caché, vamos directamente a la red.
    return; // Dejamos que el navegador maneje la petición de forma normal.
  }

  // Para todas las demás peticiones, usamos la estrategia "Cache-First".
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si la respuesta está en el caché, la devolvemos.
      if (cachedResponse) {
        return cachedResponse;
      }
    })
  );
});
