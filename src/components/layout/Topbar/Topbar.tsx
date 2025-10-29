"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cherryBombOne, geistSans, Delius, comicRelief } from "@/fonts/fonts";
import { IoArrowBack, IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import { useScrollHide } from "@/hooks/useScrollHide";
import { SlOptionsVertical } from "react-icons/sl";

interface TopbarProps {
  petId?: string;
  title?: string;
  children?: React.ReactNode;
  showBackBtn?: boolean;
  showOptionsBtn?: boolean;
}

export const Topbar = ({
  title = "No Title",
  showBackBtn = false,
  showOptionsBtn = false,
  petId,
}: // children,
TopbarProps) => {
  const router = useRouter();
  const hidden = useScrollHide({ offset: 64, threshold: 6 });
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    {
      label: "Imprimir",
      onclick: () => {
        router.push(`/pet/poster/${petId}`);
      },
    },
    { label: "Compartir" },
  ];

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push("/");
    } else {
      router.back();
    }
  };

  return (
    <div className={`sticky top-0 z-[1500]`}>
      <div
        className={`bg-[var(--rojizo)] text-white p-4 flex justify-between items-center gap-4 h-[64px] z-20 relative ${
          hidden ? "shadow-md shadow-black/20" : "box-shadow-none"
        }`}
      >
        <div className="relative flex items-center w-full h-8">
          {showBackBtn && (
            <IoArrowBack
              onClick={handleBack}
              className="text-2xl cursor-pointer z-10 h-full w-8"
            />
          )}
          <h1
            className={`text-xl font-bold ${comicRelief.className}  text-center text-shadow-gray-800/20 text-shadow-md
                absolute w-full
              `}
          >
            {title}
          </h1>
        </div>
        {/* {children} */}
        {showOptionsBtn && (
          <div className="absolute right-4 top-4">
            <SlOptionsVertical
              className="text-2xl absolute right-0 top-1 mobile-tap  cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            />
            <ul
              className={`bg-white ${
                showOptions ? "block" : "hidden"
              } rounded-md text-black [&_li]:px-3 [&_li]:py-2 animate-slide-in-top
              animate-duration-300 animate-ease-out
                mt-10
                overflow-hidden
              `}
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  className="hover:bg-amber-200 cursor-pointer mobile-tap select-none"
                  onClick={option.onclick}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
