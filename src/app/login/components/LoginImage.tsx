"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { ImSpinner2 } from "react-icons/im";

export const LoginImage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-85 flex [mask-image:radial-gradient(black_50%,transparent_71%)] mb-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50/50">
          <ImSpinner2 className="animate-spin-clockwise animate-iteration-count-infinite text-4xl text-orange-500" />
        </div>
      )}
      <Image
        className={cn(
          "-translate-x-4 w-full h-full object-cover animate-blurred-fade-in"
        )}
        alt="MaxyAmigos"
        src={"/images/collageAnimales.png"}
        fill
        priority
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)} // También oculta el spinner si hay un error
      />
    </div>
  );
};
