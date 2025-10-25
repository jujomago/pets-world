// ============================================
// MIDDLEWARE PARA PROTEGER RUTAS
// ============================================

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/favoritos",
    "/profile",
    "/post-lost",
    "/lostpet/:path*",
    "/reportar/:path*",
  ],
};
