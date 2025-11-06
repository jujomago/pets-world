// app/components/OneSignalInit.tsx
"use client"; // 👈 ¡Muy importante!

import { useEffect, useRef } from "react";
import OneSignal from "react-onesignal";

export function OneSignalInit() {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) {
      console.log(
        "OneSignal ya está en proceso de inicialización (React Strict Mode)."
      );
      return;
    }

    initialized.current = true;

    async function initializeOneSignal() {
      await OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID as string, // 👈 ¡¡Reemplaza esto!!
        safari_web_id:
          "web.onesignal.auto.16bc3731-50fd-4ae0-bf69-b8ea0dbfb349",

        // notifyButton: {
        //   enable: false,
        // },

        // Importante para probar en localhost
        allowLocalhostAsSecureOrigin: true,
      });

      // (Opcional) Puedes mostrar el diálogo de suscripción aquí si quieres
      // OneSignal.showSlidedownPrompt();
      // OneSignal.Slidedown.promptPush();
    }

    initializeOneSignal();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return null; // Este componente no renderiza nada visualmente
}
