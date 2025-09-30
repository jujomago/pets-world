import { Metadata, Viewport } from "next";

export const appMetadata: Metadata = {
  title: "Mundo Masctotas",
  description:
    "La plataforma definitiva para amantes de los animales. Conecta con tu comunidad para encontrar mascotas perdidas, darles un nuevo hogar a través de la adopción, y descubrir los mejores servicios para el cuidado de tu compañero, desde paseadores y adiestradores hasta veterinarias de confianza.",
  keywords: [
    // Palabras clave principales (las más importantes)
    "adopción de mascotas",
    "mascotas perdidas",
    "servicios para mascotas",
    "cuidado de mascotas",
    "paseadores de perros",

    // Variaciones y sinónimos
    "encontrar mascota",
    "adopta un perro",
    "adopta un gato",
    "refugio de animales",
    "rescate de animales",

    // Servicios y ubicaciones (localización)
    "veterinarias cerca de mi",
    "adiestramiento de perros",
    "entrenamiento de mascotas",
    "guardería de perros",

    // Productos y temas relacionados
    "alimentos para mascotas",
    "accesorios para mascotas",
    "juguetes para mascotas",
    "salud de mascotas",

    // Términos de comunidad y genéricos
    "comunidad de amantes de las mascotas",
    "animales",
    "perros",
    "gatos",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mundo Mascotas",
  },
};

export const appViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#e14624",
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};
