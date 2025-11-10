// lib/notifications.ts

export async function sendNotificationToAll(
  title: string,
  message: string,
  url: string
) {
  console.log(
    "[Servidor] Usando App ID para enviar:",
    process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
  );
  // 1. Prepara el cuerpo de la notificación
  const notificationBody = {
    // Tu App ID
    app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,

    // El mensaje que quieres enviar (con tus datos dinámicos)
    headings: { en: title },
    contents: { en: message },

    included_segments: ["All"],

    // (Opcional pero recomendado) La URL que se abre al hacer clic
    // Usa la URL completa de tu sitio
    web_url: `https://mundo-mascotas-beta.vercel.app/{url}`,

    // (Opcional) Datos extras que puedes recibir en la app
    data: {
      path: url,
    },
  };

  // 2. Prepara la solicitud a la API de OneSignal
  try {
    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ¡La autenticación! Usa tu Clave REST API
        Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify(notificationBody),
    });

    if (!response.ok) {
      console.error(
        "Error al enviar notificación (Respuesta no OK):",
        await response.json()
      );
      return;
    }

    const data = await response.json();
    console.log("Notificación enviada con éxito:", data);
    return data;
  } catch (error) {
    console.error("Error al enviar notificación (Fetch):", error);
  }
}
