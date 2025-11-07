"use server";

import { cookies, headers } from "next/headers";

async function esUbicacionValida(): Promise<boolean> {
  const headersList = await headers();

  const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

  // IP de prueba de Tarija para testear en localhost:
  //const testIp = "190.186.74.130"; // Santa Cruz
  const testIp = "181.115.215.2"; // Tarija

  console.log(ip);

  try {
    // 2. Llamar a la API de GeoIP (pide solo los campos necesarios)
    const response = await fetch(
      `http://ip-api.com/json/${testIp}?fields=status,city,region`
    );

    const data = await response.json();

    console.log("Datos de GeoIP (ip-api.com):", data);

    // 3. Verificar si el API tuvo éxito y si la ubicación es correcta
    if (data.status !== "success") {
      return false;
    }
    //TODO: hacer una consulta a la bd para tener las ciudades habilitadas para el servicio
    const ciudadValida = data.city === "Tarija";
    const regionValida = data.region === "TJA"; // Código de Región de Tarija

    return ciudadValida || regionValida;
  } catch (error) {
    console.error("Error al contactar ip-api.com:", error);
    return false; // Si el API falla, no dejes pasar al usuario
  }
}
// --------------------------------------------------

// Esta es la función que llama la página (sin argumentos)
export async function verifyIpLocation() {
  const isAllowed = await esUbicacionValida();
  const cookieStore = await cookies();

  if (isAllowed) {
    cookieStore.set("geoCheckPassed", "true", {
      path: "/",
      httpOnly: true, // Importante: No accesible por JS del cliente
      maxAge: 60 * 60 * 24, // 1 día de validez
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
    });
    return { success: true };
  } else {
    return {
      success: false,
      error:
        "Lo sentimos, todavia no funcionamos en tu Zona, estamos trabajando en ello.",
    };
  }
}
