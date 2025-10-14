"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { PetCard } from "../../PetCard/PetCard";

import { Pagination } from "swiper/modules";
// import { Pet } from "@/interfaces/Pets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./SwipperVip.module.css";
import { Pet } from "@/interfaces/Pets";
// import { Pet } from "@prisma/client";

interface SwipperVipProps {
  mascotas: Pet[];
}

export const SwipperVip = ({ mascotas }: SwipperVipProps) => {
  return (
    <Swiper
      pagination={false}
      modules={[Pagination]}
      className={`mb-8 bg-gradient-to-r from-amber-500 to-pink-500 ${styles.swiper}`}
      // spaceBetween={16}
      slidesPerView={"auto"}
      centeredSlides={true}
    >
      {mascotas.map((mascota) => (
        <SwiperSlide key={mascota.id} className={styles.swiperSlide}>
          <div className="px-3 py-7">
            <PetCard mascota={mascota} vip={true} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
