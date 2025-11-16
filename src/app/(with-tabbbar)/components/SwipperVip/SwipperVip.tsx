"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
// import { Pet } from "@/interfaces/Pets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import styles from "./SwipperVip.module.css";
import { Pet } from "@/interfaces/Pets";
import { PetCard } from "@/components";
// import { Pet } from "@prisma/client";

interface SwipperVipProps {
  mascotas: Pet[];
}

export const SwipperVip = ({ mascotas }: SwipperVipProps) => {
  return (
    <Swiper
      pagination={false}
      modules={[Pagination, Autoplay]}
      className={`mb-8 bg-gradient-to-r from-amber-500 to-pink-500 ${styles.swiper}`}
      // spaceBetween={16}
      slidesPerView={"auto"}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {mascotas.map((mascota) => (
        <SwiperSlide key={mascota.id} className={styles.swiperSlide}>
          <div className="px-2 py-2">
            <PetCard mascota={mascota} vip={true} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
