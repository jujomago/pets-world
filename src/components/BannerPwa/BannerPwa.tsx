"use client";
import { cn } from "@/utils/cn";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface BannerPwaProps {
  handleInstallClick: () => void;
}

export const BannerPwa = ({ handleInstallClick }: BannerPwaProps) => {
  const [showBanner, setShowBanner] = React.useState(true);

  return (
    <div
      className={cn(
        "bg-purple-700 px-5 py-2 flex place-items-center gap-5 text-white font-semibold animate-tada animate-delay-500",
        { hidden: !showBanner }
      )}
    >
      <IoMdClose
        className="text-7xl"
        onClick={() => {
          setShowBanner(false);
        }}
      />
      <p className="text-sm">
        Obten la aplicacion gratis. Acceso sin conexion. No ocupara espacio en
        tu dispositivo
      </p>
      <button
        className="bg-white rounded-full px-4 py-2 text-sm text-purple-700"
        onClick={handleInstallClick}
      >
        Instalar
      </button>
    </div>
  );
};
