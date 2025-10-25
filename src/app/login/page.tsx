import { HomeTopbar } from "@/components/layout/HomeTopBar/HomeTopbar";
import Link from "next/link";
import React from "react";

/* import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; */
import { SocialButtons } from "./components/social-buttons";
import { LoginImage } from "./components/LoginImage";

export default async function LoginPage() {
  /*   let session = null;
  try {
    session = await getServerSession();
  } catch (error) {
    // Si hay error JWT (durante el callback), ignóralo
    // La sesión se establecerá en el siguiente render
    console.log("Sesión aún procesándose...");
  } */

  /* if (session?.user?.email) {
    redirect("/");
  } */
  return (
    <>
      <HomeTopbar showSearchBtn={false} />
      <div className="flex flex-col bg-gradient-to-r from-amber-50 to-amber-200 px-8 py-0 h-[calc(100vh-64px)]">
        <LoginImage />
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Iniciar Sesión
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Bienvenido de nuevo! Por favor, inicia sesión para continuar.
        </p>
        <SocialButtons />
        <p className="text-xs text-gray-500 text-center mt-8">
          Al continuar, tu estas deacuerdo con nuestros{" "}
          <Link href="/terms" className="underline hover:text-gray-700">
            Términos de Servicio
          </Link>{" "}
          y Politica de Privacidad .
        </p>
      </div>
    </>
  );
}
