import Image from "next/image";
import React from "react";

export const Logo = () => {
  return (
    <div className="bg-amber-700 rounded-full outline-white outline-[3px] mx-1">
      <Image
        src="/images/logoMundoMascotas.png"
        width={40}
        height={40}
        alt="logo mundo mascotas"
        // className="cp-circle-[47%]"
        //   loader={localImageLoader}
      />
    </div>
  );
};
