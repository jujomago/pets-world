// app/components/OneSignalInit.tsx
"use client"; // 👈 ¡Muy importante!

import { useEffect, useRef } from "react";
import OneSignal from "react-onesignal";

export function OneSignalInit() {
  const initialized = useRef(false);

  console.log("onesignalappid:", process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID);

  useEffect(() => {
    if (initialized.current) {
      console.log(
        "OneSignal ya está en proceso de inicialización (React Strict Mode)."
      );
      return;
    }

    initialized.current = true;

    async function initializeOneSignal() {
      // Verificar que el App ID esté configurado
      const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
      if (!appId) {
        console.warn("OneSignal: NEXT_PUBLIC_ONESIGNAL_APP_ID no está configurado");
        return;
      }

      try {
        await OneSignal.init({
          appId: appId,
          safari_web_id:
            "web.onesignal.auto.16bc3731-50fd-4ae0-bf69-b8ea0dbfb349",

          // notifyButton: {
          //   enable: false,
          // },

          // Importante para probar en localhost
          allowLocalhostAsSecureOrigin: true,

          // No especificar serviceWorkerPath - OneSignal usará su configuración por defecto
          // que buscará OneSignalSDK.sw.js en la raíz (que ahora existe y tiene funcionalidades PWA)
        });

        console.log("OneSignal inicializado correctamente");
      } catch (error) {
        console.error("Error al inicializar OneSignal:", error);
      }

      // (Opcional) Puedes mostrar el diálogo de suscripción aquí si quieres
      // OneSignal.showSlidedownPrompt();
      // OneSignal.Slidedown.promptPush();
    }

    initializeOneSignal();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return null; // Este componente no renderiza nada visualmente
}
