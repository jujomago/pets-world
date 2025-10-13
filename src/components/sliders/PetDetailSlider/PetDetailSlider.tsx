"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./PetDetailSlider.module.css";
import { Pet } from "../../../interfaces/Pets";
import { cloudinaryLoader } from "@/utils/cloudinaryLoader";
import { PetImage } from "@/components/PetCard/PetImage";

interface PetSliderProps {
  images: Pet["images"];
}

export const PetDetailSlider = ({ images }: PetSliderProps) => {
  return (
    <Swiper navigation modules={[Navigation]} className={styles.container}>
      {images.map((image, index) => (
        <SwiperSlide key={image.id}>
          <div className="relative h-[270px] w-full bg-gray-700 grid place-items-center">
            <PetImage url={image.url} alt="Fotitos" />
            {/*          <Image
              loader={cloudinaryLoader}
              src={image.url}
              alt={""}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-contain" // o object-cover según prefieras
            /> */}
          </div>
        </SwiperSlide>
      ))}

      {/* <SwiperSlide>
        <Image
          src={imageSrc}
          alt=""
          className="object-cover relative z-0"
          width={500}
          height={500}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={imageSrc}
          alt=""
          className="object-cover relative z-0"
          width={500}
          height={500}
        />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <Image
          src={imageSrc}
          alt=""
          className="object-cover relative z-0"
          width={500}
          height={500}
        />
      </SwiperSlide> */}
    </Swiper>
  );
};
