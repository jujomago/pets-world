// hooks/usePWAInstall.ts
import { useState, useEffect } from "react";

// --- PASO 1: Definir la interfaz para el evento ---
// TypeScript no conoce 'beforeinstallprompt', así que lo definimos.
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// --- PASO 2: Definir el tipo de retorno del hook ---
interface UsePWAInstallReturn {
  showInstallButton: boolean;
  handleInstallClick: () => Promise<void>; // La función de clic es asíncrona
}

export const usePWAInstall = (): UsePWAInstallReturn => {
  // --- PASO 3: Tipar los estados ---
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);

  useEffect(() => {
    // --- PASO 4: Tipar el manejador del evento ---
    const handler = (e: Event) => {
      console.log("handler fired:", e);
      // Prevenir el comportamiento por defecto
      e.preventDefault();

      // Guardar el evento (haciendo un "type assertion")
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Mostrar nuestro botón
      setShowInstallButton(true);
    };

    // 'beforeinstallprompt' es un evento global
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // --- PASO 5: Tipar la función de clic ---
  const handleInstallClick = async (): Promise<void> => {
    // Si no hay evento, no hacer nada
    if (!deferredPrompt) {
      return;
    }

    // Ocultar el botón
    setShowInstallButton(false);

    // Mostrar el diálogo de instalación
    await deferredPrompt.prompt();

    // Esperar la elección del usuario
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("El usuario aceptó la instalación");
    } else {
      console.log("El usuario canceló la instalación");
    }

    // El evento solo se usa una vez
    setDeferredPrompt(null);
  };

  // Devolvemos el estado y la función con sus tipos correctos
  return { showInstallButton, handleInstallClick };
};
