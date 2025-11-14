// Importar el OneSignalSDK desde el CDN
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Solo para debugging (opcional)
self.addEventListener("install", () => {
  console.log("[OneSignal SW] Instalado");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("[OneSignal SW] Activado");
  self.clients.claim();
});
