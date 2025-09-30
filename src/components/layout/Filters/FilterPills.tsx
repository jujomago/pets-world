import { FilterPill } from "@/components/Pill/FilterPill";
import { comicRelief } from "@/fonts/fonts";
import { Especies } from "@/utils/contants";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { PiBird, PiCat, PiDog, PiRabbit } from "react-icons/pi";

interface FilterPillsProps {
  especies: { id: string; nombre: string }[];
  filterActive: string;
  hidden?: boolean;
  setFilterActive: (filterId: string) => void;
}

export const FilterPills = ({
  especies,
  filterActive,
  hidden,
  setFilterActive,
}: FilterPillsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterClick = (filterId: string) => {
    const params = new URLSearchParams(searchParams);
    setFilterActive(filterId);
    if (filterId === filterActive) {
      params.delete("especie");
      setFilterActive("");
      router.push(`/?${params.toString()}`);
      return;
    }
    params.set("especie", filterId);
    router.push(`/?${params.toString()}`);
  };

  return (
    <section
      className={`
            flex gap-2 bg-white/50 backdrop-blur-xs  scrollbar-hide overflow-x-auto text-sm p-2 w-full font-bold leading-3  ${
              comicRelief.className
            }
            transform transition-transform duration-300 ease-out  z-10 relative
            ${hidden ? "-translate-y-full" : "translate-y-0"}
            `}
    >
      {especies.map((especie) => (
        <FilterPill
          key={especie.id}
          filterId={especie.id}
          text={` ${especie.nombre}s`}
          onHandleClick={handleFilterClick}
          isActive={filterActive === especie.id}
          icon={
            especie.nombre.toLowerCase() === Especies.PERRO ? (
              <PiDog
                className={`text-xl  ${
                  filterActive === especie.id ? "fill-white" : "fill-amber-700"
                }`}
              />
            ) : especie.nombre.toLowerCase() === Especies.GATO ? (
              <PiCat
                className={`text-xl  ${
                  filterActive === especie.id ? "fill-white" : "fill-violet-700"
                }`}
              />
            ) : especie.nombre.toLowerCase() === Especies.AVE ? (
              <PiBird
                className={`text-xl fill-blue-600 ${
                  filterActive === especie.id ? "fill-white" : "fill-blue-600"
                }`}
              />
            ) : especie.nombre.toLowerCase() === Especies.CONEJO ? (
              <PiRabbit
                className={`text-xl fill-teal-600 ${
                  filterActive === especie.id ? "fill-white" : "fill-teal-600"
                }`}
              />
            ) : null
          }
        />
      ))}
    </section>
  );
};
