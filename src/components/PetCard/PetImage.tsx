"use client";
import { cloudinaryLoader } from "@/utils/cloudinaryLoader";
import Image from "next/image";
import React from "react";

interface PetImageProps {
  url: string;
  alt?: string;
}

export const PetImage = ({ url, alt = "" }: PetImageProps) => {
  return (
    <Image
      loader={cloudinaryLoader}
      src={url}
      alt={alt}
      fill
      // width={800}
      //height={500}
      sizes="(max-width: 420px) 80vw, 33vw"
      className="object-cover transition-transform duration-500 hover:scale-105"
      //   priority={index < 4}
    />
  );
};
