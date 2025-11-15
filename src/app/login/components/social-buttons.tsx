"use client";
import { cn } from "@/utils/cn";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export const SocialButtons = ({ callbackUrl }: { callbackUrl: string }) => {
  const [loading, setLoading] = useState(false);
  const acceptCheck = useRef<HTMLInputElement>(null);

  const handleLogin = async (provider: string) => {
    if (!acceptCheck.current?.checked) {
      toast.error("Debes aceptar los términos y condiciones.");
      return;
    }
    console.log("callbackUrl:", callbackUrl);

    setLoading(true);

    try {
      await signIn(provider, { callbackUrl });
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
      toast.error("Hubo un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
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
      <label className="flex items-center justify-center gap-2 font-bold text-xs my-3">
        <input type="checkbox" ref={acceptCheck} className="accent-amber-500" />{" "}
        Acepto
      </label>
    </>
  );
};
