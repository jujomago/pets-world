"use client";
import { cn } from "@/utils/cn";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export const SocialButtons = ({ callbackUrl }: { callbackUrl: string }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider: string) => {
    setLoading(true);

    try {
      await signIn(provider, { callbackUrl });
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4 w-full">
      <button
        onClick={() => handleLogin("google")}
        disabled={loading}
        className={cn(
          "w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors font-semibold ",
          {
            "opacity-50 cursor-not-allowed": loading,
            "button-mobile": !loading,
          }
        )}
      >
        <FaGoogle className="text-xl" />
        <span>Ingresa con Google</span>
      </button>
      <button
        onClick={() => handleLogin("facebook")}
        disabled={loading}
        className={cn(
          "w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors font-semibold",
          {
            "opacity-50 cursor-not-allowed": loading,
            "button-mobile": !loading,
          }
        )}
      >
        <FaFacebook className="text-xl" />
        <span>Ingresa con Facebook</span>
      </button>
    </div>
  );
};
