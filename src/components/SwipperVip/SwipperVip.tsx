"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { PetCard } from "../PetCard/PetCard";

import { Pagination } from "swiper/modules";
import { Pet } from "@/interfaces/Pets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./SwipperVip.module.css";

interface SwipperVipProps {
  mascotas: Pet[];
}

export const SwipperVip = ({ mascotas }: SwipperVipProps) => {
  return (
    <Swiper
      pagination={false}
      modules={[Pagination]}
      className={`mb-8 bg-gradient-to-r from-amber-500 to-pink-500 ${styles.swiper}`}
      spaceBetween={16}
      slidesPerView={"auto"}
      centeredSlides={true}
    >
      {mascotas.map((mascota, index) => {
        const imageSrc =
          index % 2 === 0 ? "/images/husky.webp" : "/images/crillo.jpeg";

        return (
          <SwiperSlide key={mascota.id} className={styles.swiperSlide}>
            <PetCard mascota={mascota} imageSrc={imageSrc} vip={true} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
