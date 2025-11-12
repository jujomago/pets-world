"use client";

import { comicRelief } from "@/fonts/fonts";
import React, { useEffect, useRef } from "react";
import { FaSearchLocation, FaUser } from "react-icons/fa";

import Link from "next/link";
import { MdFavorite } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const menuItems: {
  icon: React.ComponentType<any>;
  name: string;
  to: string;
  prefetch?: boolean;
}[] = [
  { icon: FaSearchLocation, name: "Perdidos", to: "/" },
  // { icon: MdPets, name: "Reportar", to: "/reportar_lost" },
  { icon: FaCirclePlus, name: "Anunciar", to: "/new-pet-lost" },
  { icon: MdFavorite, name: "Favoritos", to: "/favoritos" },
  { icon: FaUser, name: "Perfil", to: "/profile", prefetch: false },
];

export const TabBar = () => {
  const pathname = usePathname();
  const activeIndex = menuItems.findIndex((item) => item.to === pathname);
  const { data: session, status } = useSession();

  // Tipado explícito de la referencia
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  /* const handleItemClick = useCallback((index: number) => {
    // La navegación la maneja el componente Link.
    // Este callback podría usarse para lógica adicional si fuera necesario.
  }, []);
   */
  useEffect(() => {
    // Get the active menu item element
    const activeItem = document.querySelector(
      `li:nth-of-type(${activeIndex + 1})`
    );

    if (activeItem && indicatorRef.current) {
      if (activeIndex === -1) return;

      // Get the active item's position relative to the container
      const itemRect = activeItem.getBoundingClientRect();
      const containerRect = activeItem.parentElement?.getBoundingClientRect();

      if (containerRect) {
        // Calculate the left position relative to the container
        const left =
          itemRect.left - containerRect.left + itemRect.width / 2 - 42;
        indicatorRef.current.style.left = `${left}px`;
      }
    }
  }, [activeIndex]);

  return (
    <div className="sticky bottom-2 w-[96%]  mx-auto rounded-3xl animate-slide-up-fade bg-rojillo-tabbar  filter-[url('#goo')] z-10 ">
      <ul className="flex justify-evenly pt-3 pb-2">
        <span
          ref={indicatorRef}
          className="w-[80px] h-[80px]  rounded-full  bg-rojillo-tabbar absolute -top-[24px] left-[40px] -z-10  transition-[left] duration-500  ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        ></span>
        {menuItems.map((item, index) => (
          <li
            key={item.name + index}
            // onClick={() => handleItemClick(index)}
            className="items-center flex"
          >
            <Link
              href={item.to}
              className={`flex flex-col items-center justify-center gap-1 ${
                comicRelief.className
              } ${index === activeIndex ? "text-white" : "text-red-800"}`}
              prefetch={item.prefetch ?? true}
            >
              {item.name === "Perfil" && status === "authenticated" ? (
                <Image
                  src={session.user?.image as string}
                  width={20}
                  height={20}
                  className={`rounded-full ring-2 ring-amber-400 transition-all ${
                    index === activeIndex ? "-translate-y-5 scale-150" : ""
                  }`}
                  alt={session.user?.name as string}
                />
              ) : (
                React.createElement(item.icon, {
                  className: `text-xl  transition-all ${
                    index === activeIndex
                      ? "-translate-y-5 scale-160 fill-amber-500"
                      : "fill-red-800 scale-130"
                  }`,
                })
              )}

              {/* {index === activeIndex && ( */}
              <span
                className={`text-sm font-bold ${
                  index === activeIndex
                    ? "-translate-y-1 scale-120 transition-all"
                    : ""
                }`}
              >
                {item.name}
              </span>
              {/* )} */}
            </Link>
          </li>
        ))}
      </ul>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
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
  );
};
