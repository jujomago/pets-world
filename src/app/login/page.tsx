import { HomeTopbar } from "@/components/layout/HomeTopBar/HomeTopbar";
import Link from "next/link";
import React, { Suspense } from "react";

import { SocialButtons } from "./components/social-buttons";
import { LoginImage } from "./components/LoginImage";

const HomeTopbarSkeleton = () => (
  <div className="h-[64px] bg-gray-300 animate-pulse"></div>
);

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string | string[] };
}) {
  const params = await searchParams;

  const callbackUrl =
    (Array.isArray(params.callbackUrl)
      ? params.callbackUrl[0]
      : params.callbackUrl) || "/";
  return (
    <>
      <Suspense fallback={<HomeTopbarSkeleton />}>
        <HomeTopbar showSearchBtn={false} />
      </Suspense>
      <div className="flex flex-col bg-gradient-to-r from-amber-50 to-amber-200 px-8 py-0 h-[calc(100vh-64px)] justify-around">
        <div>
          <LoginImage />
          <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Bienvenido de nuevo! Por favor, inicia sesión para continuar.
          </p>
        </div>
        <div>
          <SocialButtons callbackUrl={callbackUrl} />

          <p className="text-xs text-gray-500 text-center mb-6">
            Al continuar, tu estas deacuerdo con nuestros{" "}
            <Link
              href="/terms-service"
              className="underline hover:text-gray-700"
            >
              Términos y Condiciones de Servicio
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
