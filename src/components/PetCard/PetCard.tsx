import { comicRelief } from "@/fonts/fonts";
import formatFechaToLocaleES from "@/utils/DateUtils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPalette } from "react-icons/fa";
import { IoIosFemale, IoIosMale, IoMdPin } from "react-icons/io";
import { MdCake, MdEmojiEvents } from "react-icons/md";
import { Title } from "../Title/Title";

interface PetCardProps {
  mascota: {
    id: string;
    nombre: string;
    esta_perdida: boolean | null;
    edad: number | null;
    color: string | null;
    genero: string | null;
    lugar_perdida: string;
    fecha_perdida: Date;
    detalle_perdida: string | null;
    recompensa: number | null;
  };
  imageSrc: string;
  vip: boolean;
}

export const PetCard = ({ mascota, imageSrc, vip }: PetCardProps) => {
  return (
    <Link href={`/lostpet/${mascota.id}`} className="card-interactive">
      <div
        key={mascota.id}
        className={`max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden ${
          vip ? "border-amber-500 border-double  border-2" : "border-0"
        }`}
      >
        {/* Imagen */}
        <div className="relative h-36">
          <Image
            src={imageSrc}
            alt={`Foto de ${mascota.nombre}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            //   priority={index < 4}
          />
          {vip && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              <MdEmojiEvents className="text-lg" />
              <span className={`${comicRelief.className} text-sm`}>
                {mascota.recompensa?.toString() || "0"} Bs
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between gap-2 items-center">
            <Title classes={`${vip ? "text-2xl" : "text-xl"}`}>
              {mascota.nombre}
            </Title>
            {mascota.genero === "M" ? (
              <IoIosMale className="text-2xl text-blue-500 stroke-16 -mb-1" />
            ) : (
              <IoIosFemale className="text-2xl -mb-3 text-pink-600 stroke-16" />
            )}

            {/* <span>{mascota.esta_perdida ? "Perdida" : "Encontrada"}</span> */}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-1 gap-y-1 justify-center">
            <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5">
              <MdCake className="text-blue-500 text-sm" />
              <span className="text-xs font-medium">{mascota.edad} años</span>
            </div>
            <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5">
              <FaPalette className="text-orange-500 text-sm" />
              <span className="text-xs font-medium">{mascota.color}</span>
            </div>
            <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5 overflow-ellipsis">
              <IoMdPin className="text-green-500 text-sm" />
              <span className="text-xs font-medium">
                {mascota.lugar_perdida}
              </span>
            </div>
          </div>
          <p className="text-sm my-4 balance line-clamp-2">
            {mascota.detalle_perdida} lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quod.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right italic ">
            Perdido el {formatFechaToLocaleES(mascota.fecha_perdida).toString()}
          </p>
        </div>
      </div>
    </Link>
  );
};
