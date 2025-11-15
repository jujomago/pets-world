"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { comicRelief } from "@/fonts/fonts";
import { IoArrowBack, IoPrint } from "react-icons/io5";

import { useScrollHide } from "@/hooks/useScrollHide";
import { SlOptionsVertical } from "react-icons/sl";

interface TopbarProps {
  petId?: string;
  title?: string;
  children?: React.ReactNode;
  showBackBtn?: boolean;
  showOptionsBtn?: boolean;
}

export const Topbar = ({
  title = "No Title",
  showBackBtn = false,
  showOptionsBtn = false,
  petId,
}: // children,
TopbarProps) => {
  const router = useRouter();
  const hidden = useScrollHide({ offset: 64, threshold: 6 });
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    {
      label: "Imprimir",
      icon: <IoPrint className="text-2xl" />,

      onclick: () => {
        window.alert("Funcionalidad en desarrollo");
        router.push(`/pet/poster/${petId}`);
      },
    },
    {
      label: "Compartir",
      onclick: () => {
        window.alert("Pronto estara disponible esta funcionalidad");
      },
    },
  ];

  const handleBack = () => {
    // 1. Comprobar si 'document' existe (importante en Next.js)
    if (typeof document === "undefined") {
      router.push("/");
      return;
    }

    try {
      // 2. Obtener la URL de la que vino el usuario
      const referrer = document.referrer;

      // 3. Si no hay referrer (enlace directo, bookmark, nueva pestaña)
      if (!referrer) {
        router.push("/");
        return;
      }

      // 4. Comprobar si el hostname del referrer es DIFERENTE al nuestro
      // (p.ej., si vino de "google.com" y nosotros somos "mi-app.com")
      const referrerUrl = new URL(referrer);
      const currentHostname = window.location.hostname;

      if (referrerUrl.hostname !== currentHostname) {
        // 5. Es un enlace externo. Enviar al inicio.
        router.push("/");
      } else {
        // 6. Es un enlace interno. Ir atrás de forma segura.
        router.back();
      }
    } catch (error) {
      // Fallback de seguridad si algo falla
      console.error("Error al procesar referrer:", error);
      router.push("/");
    }
  };

  return (
    <div className={`sticky top-0 z-[1500]`}>
      <div
        className={`bg-[var(--rojizo)] text-white p-4 flex justify-between items-center gap-4 h-[64px] z-20 relative ${
          hidden ? "shadow-md shadow-black/20" : "box-shadow-none"
        }`}
      >
        <div className="relative flex items-center w-full h-8">
          {showBackBtn && (
            <IoArrowBack
              onClick={handleBack}
              className="text-2xl cursor-pointer z-10 h-full w-8"
            />
          )}
          <h1
            className={`text-xl font-bold ${comicRelief.className}  text-center text-shadow-gray-800/20 text-shadow-md
                absolute w-full
              `}
          >
            {title}
          </h1>
        </div>
        {/* {children} */}
        {showOptionsBtn && (
          <div className="absolute right-4 top-4">
            <SlOptionsVertical
              className="text-2xl absolute right-0 top-1 mobile-tap  cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            />
            <ul
              className={`bg-white ${
                showOptions ? "block" : "hidden"
              } rounded-md text-black [&_li]:px-3 [&_li]:py-2 animate-slide-in-top
              animate-duration-300 animate-ease-out
                mt-10
                overflow-hidden
              `}
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  className="hover:bg-amber-200 cursor-pointer mobile-tap select-none flex place-items-center gap-1"
                  onClick={option.onclick}
                >
                  {option.icon}
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
