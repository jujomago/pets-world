import { comicRelief } from "@/fonts/fonts";

import Link from "next/link";
import React from "react";
import { FaPalette } from "react-icons/fa";
import { IoIosFemale, IoIosMale, IoMdPin } from "react-icons/io";
import { MdCake, MdEmojiEvents } from "react-icons/md";
import { Title } from "../Title/Title";
import { Pet, PetImage as PetImageI } from "@/interfaces/Pets";
import { Gender } from "@prisma/client";
import { PetImage } from "../PetImage/PetImage";
import { format } from "date-fns";
import { CiCalendarDate } from "react-icons/ci";

interface PetCardProps {
  mascota: Pet;
  vip: boolean;
}

const DEFAULT_IMAGE_URL = "/images/crillo.jpeg";

const getImageToShow = (images: PetImageI[]): string => {
  if (!images || images.length === 0) {
    return DEFAULT_IMAGE_URL;
  }
  const imageToShow = images.find((item) => item.isPrimary);

  return imageToShow?.url ?? DEFAULT_IMAGE_URL;
};

const GenderIcon = ({ gender }: { gender: Gender }) => {
  const isMale = gender === Gender.MALE;
  const icon = isMale ? <IoIosMale /> : <IoIosFemale />;
  const className = isMale ? "text-blue-500 -mb-1" : "text-pink-600 -mb-3";
  return React.cloneElement(icon, {
    className: `text-2xl stroke-16 ${className}`,
  });
};

export const PetCard = ({ mascota, vip }: PetCardProps) => {
  return (
    <Link href={`/pet/lost/${mascota.id}`} className="card-interactive">
      <div
        key={mascota.id}
        className={`max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden ${
          vip ? "border-amber-500 border-double  border-2" : "border-0"
        }`}
      >
        {/* Imagen */}
        <div className="relative h-36">
          <PetImage
            url={getImageToShow(mascota.images) ?? DEFAULT_IMAGE_URL}
            alt={`Foto de ${mascota.name}`}
          />
          {vip && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              <MdEmojiEvents className="text-lg" />
              <span className={`${comicRelief.className} text-sm`}>
                {mascota.rewardAmount ?? 0} Bs
              </span>
            </div>
          )}
        </div>
        <div className="pt-3 px-4 pb-2">
          <div className="flex justify-between gap-2 items-center">
            <Title classes={`${vip ? "text-2xl" : "text-xl"}`}>
              {mascota.name}
            </Title>
            <GenderIcon gender={mascota.gender as Gender} />
            {/* <span>{mascota.status === "LOST" ? "Perdida" : "Encontrada"}</span> */}
          </div>
          {vip && (
            <div className="mt-4 flex flex-wrap gap-x-1 gap-y-1 justify-center">
              <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5 animate-blurred-fade-in">
                <MdCake className="text-blue-500 text-sm" />
                <span className="text-xs font-medium flex-1">
                  {mascota.age} años
                </span>
              </div>
              <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5">
                <FaPalette className="text-orange-500 text-sm" />
                <span className="text-xs font-medium flex-1">
                  {mascota.color}
                </span>
              </div>
              <div className="flex items-center text-gray-600 border border-gray-200 rounded-full px-3 py-2 gap-1.5 overflow-ellipsis">
                <IoMdPin className="text-green-500 text-sm " />
                <span className="text-xs font-medium flex-1">
                  {mascota.lostLocationDetails?.replace(
                    ", Municipio Tarija",
                    ""
                  )}
                </span>
              </div>
            </div>
          )}
          <p className="text-xs my-4 balance line-clamp-2">
            {mascota.description} Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Explicabo, aspernatur temporibus? Molestiae,
            accusamus facilis cupiditate, debitis veritatis, velit accusantium
            ratione hic maiores corrupti culpa illum alias dicta aliquam
            assumenda quidem.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-end gap-2 ">
            <CiCalendarDate className="text-lg" />
            <span>
              Perdido el {format(mascota.lostDate ?? new Date(), "dd/MM/yy")}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
