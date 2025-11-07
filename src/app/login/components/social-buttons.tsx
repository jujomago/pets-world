"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
