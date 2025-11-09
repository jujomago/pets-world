// next.config.ts

import type { NextConfig } from "next";

// Configuración de Next.js
// Nota: OneSignal usa su propio service worker (OneSignalSDKWorker.js) que está en public/
// Este service worker también incluye funcionalidades PWA básicas para hacer la app instalable
const nextConfig: NextConfig = {
  images: {
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com/dkvxndrnd/image/upload/",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkvxndrnd/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
    ],
  },
};

export default nextConfig;
