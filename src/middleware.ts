import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { nextUrl } = req;

    // 2. Revisamos si tiene la cookie de geolocalización
    const hasPassedGeoCheck =
      req.cookies.get("geoCheckPassed")?.value === "true";
    const isOnGeoCheckPage = nextUrl.pathname.startsWith("/geo-check");

    // CASO A: Está logueado y en la página de /geo-check
    if (isOnGeoCheckPage) {
      if (hasPassedGeoCheck) {
        // Ya pasó el check, no debería estar aquí. Llévalo al inicio.
        return NextResponse.redirect(new URL("/", req.url));
      }
      // No ha pasado el check, déjalo que se quede en esta página.
      return NextResponse.next();
    }

    // CASO B: Está logueado, en una ruta protegida (ej. /favoritos)
    // PERO AÚN NO ha pasado el check.
    if (!hasPassedGeoCheck) {
      // Redirígelo a la página de verificación OBLIGATORIAMENTE.
      return NextResponse.redirect(new URL("/geo-check", req.url));
    }

    // CASO C: Está logueado y ya pasó el check.
    // Déjalo pasar a la ruta que quería (ej. /favoritos).
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/favoritos",
    "/profile",
    "/new-pet-lost",
    "/pet/lost/:path*",
    "/pet/sighting/:path*",
    "/geo-check",
  ],
};