"use client";

import { comicRelief } from "@/fonts/fonts";
import React, { useEffect, useRef, useState } from "react";
import { FaSearchLocation, FaUser } from "react-icons/fa";
import styles from "./Tabbar.module.css";
import Link from "next/link";
import { MdFavorite, MdPets } from "react-icons/md";

const menuItems = [
  { icon: FaSearchLocation, name: "Perdidos", to: "/" },
  { icon: MdPets, name: "Reportar", to: "/reportar_lost" },
  { icon: FaUser, name: "Profile", to: "/profile" },
  { icon: MdFavorite, name: "Favoritos", to: "/favoritos" },
];

export const TabBar = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to the center 'Add' icon

  // Tipado explícito de la referencia
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const newLeft = activeIndex * 90 + 60 - 45;
    // Comprueba que `current` no sea nulo antes de usarlo
    if (indicatorRef.current) {
      indicatorRef.current.style.left = `calc(${newLeft}px)`;
    }
  }, [activeIndex]);

  return (
    <>
      <div
        className={`sticky bottom-0 inline-flex w-full right-0 justify-center items-center ${comicRelief.className}`}
      >
        <ul className={`${styles.nav} `}>
          <span ref={indicatorRef} className={`${styles.navIndicator}`}></span>
          {menuItems.map((item, index) => (
            <li key={item.name} onClick={() => setActiveIndex(index)}>
              <Link
                href={item.to}
                className={
                  index === activeIndex ? styles["nav-item-active"] : ""
                }
              >
                <item.icon />
                <span className={`${styles.title}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className={`${styles["filter-svg"]}`}
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};
