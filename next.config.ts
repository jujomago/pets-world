/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dejamos únicamente la configuración de imágenes
  images: {
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com/dkvxndrnd/image/upload/",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dkvxndrnd/image/upload/**",
      },
      // Dejamos los otros por si los necesitas para la prueba
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

// Exportamos la configuración directamente, sin el wrapper de PWA
module.exports = nextConfig;
