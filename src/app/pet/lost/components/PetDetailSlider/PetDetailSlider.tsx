"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./PetDetailSlider.module.css";
import { PetImage } from "@/components/PetImage/PetImage";
import { Pet } from "@/interfaces";

interface PetSliderProps {
  images: Pet["images"];
}

export const PetDetailSlider = ({ images }: PetSliderProps) => {
  return (
    <Swiper navigation modules={[Navigation]} className={styles.container}>
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <div className="relative h-[270px] w-full bg-gray-700 grid place-items-center">
            <PetImage url={image.url} alt="Fotitos" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
