import { comicRelief } from "@/fonts/fonts";
import formatFechaToLocaleES from "@/utils/DateUtils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPalette } from "react-icons/fa";
import { IoIosFemale, IoIosMale, IoMdPin } from "react-icons/io";
import { MdCake, MdEmojiEvents } from "react-icons/md";
import { Title } from "../Title/Title";
import { Pet, PetImage as PetImageI } from "@/interfaces/Pets";
import { Gender } from "@prisma/client";
import { PetImage } from "./PetImage";

interface PetCardProps {
  mascota: Pet;
  vip: boolean;
}

const getImageToShow = (images: PetImageI[]): string => {
  if (!images || images.length === 0) {
    return "/images/crillo.jpeg";
  }
  const imageToShow = images.find((item) => item.isPrimary);

  return imageToShow ? imageToShow.url : "/images/crillo.jpeg";
};

export const PetCard = ({ mascota, vip }: PetCardProps) => {
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
          <PetImage
            url={getImageToShow(mascota.images)}
            alt={`Foto de ${mascota.name}`}
          />
          {vip && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              <MdEmojiEvents className="text-lg" />
              <span className={`${comicRelief.className} text-sm`}>
                {mascota.rewardAmount?.toString() || "0"} Bs
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between gap-2 items-center">
            <Title classes={`${vip ? "text-2xl" : "text-xl"}`}>
              {mascota.name}
            </Title>
            {mascota.gender === Gender.MALE ? (
              <IoIosMale className="text-2xl text-blue-500 stroke-16 -mb-1" />
            ) : (
              <IoIosFemale className="text-2xl -mb-3 text-pink-600 stroke-16" />
            )}

            {/* <span>{mascota.esta_perdida ? "Perdida" : "Encontrada"}</span> */}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-1 gap-y-1 justify-center">
            <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5">
              <MdCake className="text-blue-500 text-sm" />
              <span className="text-xs font-medium">{mascota.age} años</span>
            </div>
            <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5">
              <FaPalette className="text-orange-500 text-sm" />
              <span className="text-xs font-medium">{mascota.color}</span>
            </div>
            <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5 overflow-ellipsis">
              <IoMdPin className="text-green-500 text-sm" />
              <span className="text-xs font-medium">
                {mascota.lostLocationDetails}
              </span>
            </div>
          </div>
          <p className="text-sm my-4 balance line-clamp-2">
            {mascota.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right italic ">
            Perdido el{" "}
            {formatFechaToLocaleES(mascota.lostDate ?? new Date()).toString()}
          </p>
        </div>
      </div>
    </Link>
  );
};
