"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./PetDetailSlider.module.css";
import { PetImage } from "@/components/PetImage/PetImage";
import { IoClose } from "react-icons/io5";
import { Pet } from "@/interfaces";

interface PetSliderProps {
  images: Pet["images"];
}

export const PetDetailSlider = ({ images }: PetSliderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDialogOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden"; // Evita el scroll del fondo
    } else {
      dialog.close();
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Limpieza al desmontar
    };
  }, [isDialogOpen]);

  const openDialog = (index: number) => {
    setInitialSlide(index);
    setIsDialogOpen(true);
  };

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Swiper navigation modules={[Navigation]} className={styles.container}>
        {images.map((image, index) => (
          <SwiperSlide key={image.id} onClick={() => openDialog(index)}>
            <div className="relative h-[270px] w-full bg-gray-700 grid place-items-center cursor-pointer">
              <PetImage
                url={image.url}
                alt={`Imagen de mascota ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        onClose={() => setIsDialogOpen(false)}
        className="p-0 m-0 bg-transparent backdrop:bg-black/80 max-w-full max-h-full w-full h-full"
      >
        <div className="w-full h-full flex items-center justify-center p-4 relative">
          <button
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-4 right-4 z-10 text-white text-4xl hover:text-gray-300 transition-colors"
            aria-label="Cerrar modal"
          >
            <IoClose />
          </button>
          <Swiper
            navigation
            modules={[Navigation]}
            initialSlide={initialSlide}
            className="w-full h-auto max-w-4xl max-h-[90vh] "
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={`modal-${image.id}`}
                className="place-self-center"
              >
                <img
                  src={image.url}
                  alt={`Imagen de mascota ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </dialog>
    </>
  );
};
