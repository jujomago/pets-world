"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./PetDetailSlider.module.css";

export const PetDetailSlider = () => {
  const imageSrc = "/images/husky.webp";
  return (
    <Swiper navigation modules={[Navigation]} className={styles.container}>
      <SwiperSlide>
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
      </SwiperSlide>
    </Swiper>
  );
};
