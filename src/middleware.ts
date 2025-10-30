// ============================================
// MIDDLEWARE PARA PROTEGER RUTAS
// ============================================

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/favoritos",
    "/profile",
    "/new-pet-lost",
    "/pet/lost/:path*",
    "/pet/sighting/:path*",
  ],
};
