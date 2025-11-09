import { Metadata, Viewport } from "next";

export const appMetadata: Metadata = {
  title: "Mundo Masctotas",
  description:
    "La plataforma definitiva para amantes de los animales. Conecta con tu comunidad para encontrar mascotas perdidas, darles un nuevo hogar a través de la adopción, y descubrir los mejores servicios para el cuidado de tu compañero, desde paseadores y adiestradores hasta veterinarias de confianza.",
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
