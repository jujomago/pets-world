"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  const searchParams = useSearchParams();

  // Obtén el callbackUrl de la URL o usa /dashboard por defecto
  let callbackUrl = searchParams.get("callbackUrl") || "/";

  // Asegúrate de que el callbackUrl sea una ruta relativa.
  // Si es una URL completa, extrae solo la ruta.
  try {
    const url = new URL(callbackUrl);
    callbackUrl = url.pathname + url.search + url.hash;
  } catch (error) {
    // Si no es una URL válida (es decir, ya es una ruta relativa), no hagas nada.
  }

  return (
    <div className="space-y-4 w-full">
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors font-semibold  button-mobile"
      >
        <FaGoogle className="text-xl" />
        <span>Ingresa con Google</span>
      </button>
      <button
        onClick={() => signIn("facebook", { callbackUrl })}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors font-semibold button-mobile"
      >
        <FaFacebook className="text-xl" />
        <span>Ingresa con Facebook</span>
      </button>
    </div>
  );
};
