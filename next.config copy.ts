import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Configure next-pwa to generate sw.js into public/ on production builds.
// It will be disabled in development to avoid caching issues during dev.
const withPWAWrapped = withPWA({
  dest: "public",
  // We register the SW ourselves in a client component; avoid double registration
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* keep your existing config here */
  images: {
    loader: "cloudinary",
    path: "https://res.cloudinary.com/dkvxndrnd/image/upload/",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        // 'pathname' es opcional aquí, asume todas las rutas
      },
      // 👇 ¡NUEVO PATRÓN AGREGADO PARA next/image!
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        // La ruta de la imagen es /breeds/clumber/n02101556_5694.jpg
        // Si quieres permitir cualquier ruta bajo este host, puedes omitir 'pathname' o usar 'pathname: "/**"'
      },
      // 👇 ¡NUEVO PATRÓN AGREGADO PARA TUS IMÁGENES DE CLOUDINARY!
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Opcional, pero bueno para ser específico
        pathname: "/dkvxndrnd/image/upload/**",
      },
    ],
  },
};

export default withPWAWrapped(nextConfig);
