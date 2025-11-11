"use client";

import React from "react";
// import { localImageLoader } from "@/utils/localImageLoader";
import Image from "next/image";
import collageImage from "../../../../public/images/collageAnimales.png";

export const LoginImage = () => {
  return (
    <div className="relative h-85 flex [mask-image:radial-gradient(black_50%,transparent_71%)] mb-4">
      <Image
        className="-translate-x-4 w-full h-full object-cover"
        alt="MaxyAmigos"
        // loader={localImageLoader}
        src={collageImage}
        fill
        placeholder="blur"
      />
    </div>
  );
};
