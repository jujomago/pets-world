import { revalidateHomePage } from "@/actions/mascotas";
import { FilterPill } from "@/components/Pill/FilterPill";
import { comicRelief } from "@/fonts/fonts";
import { Species } from "@/interfaces/Pets";
import { Especies } from "@/utils/contants";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { PiBird, PiCat, PiDog, PiRabbit } from "react-icons/pi";

interface FilterPillsProps {
  especies: Species[];
  // filterActive: string;
  hidden?: boolean;
  // setFilterActive: (filterId: string) => void;
}

export const FilterPills = ({
  especies,
  // filterActive,
  hidden,
}: // setFilterActive,
FilterPillsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 💡 OBTÉN LA ESPECIE ACTIVA DIRECTAMENTE DE LA URL
  const filterSpecie = searchParams.get("especie");
  const handleFilterClick = (specieName: string) => {
    const params = new URLSearchParams(searchParams);

    if (specieName === filterSpecie) {
      // Compara con la URL
      params.delete("especie");
    } else {
      params.set("especie", specieName);
    }

    router.push(`/?${params.toString()}`);
    router.refresh(); // Mantener esta línea
  };

  /* 
  const handleFilterClick = (filterId: string) => {
    const params = new URLSearchParams(searchParams);
    setFilterActive(filterId);
    if (filterId === filterActive) {
      params.delete("especie");
      setFilterActive("");
      router.push(`/?${params.toString()}`);
      router.refresh();
      return;
    }
    params.set("especie", filterId);
    router.push(`/?${params.toString()}`);
    router.refresh();
  }; */

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
          // filterId={especie.id}
          text={especie.name}
          onSelectFilter={handleFilterClick}
          // isActive={filterActive === especie.id}
          isActive={filterSpecie === especie.name}
          icon={
            especie.name.toLowerCase() === Especies.PERRO ? (
              <PiDog
                className={`text-xl  ${
                  filterSpecie === especie.name
                    ? "fill-white"
                    : "fill-amber-700"
                }`}
              />
            ) : especie.name.toLowerCase() === Especies.GATO ? (
              <PiCat
                className={`text-xl  ${
                  filterSpecie === especie.name
                    ? "fill-white"
                    : "fill-violet-700"
                }`}
              />
            ) : especie.name.toLowerCase() === Especies.AVE ? (
              <PiBird
                className={`text-xl fill-blue-600 ${
                  filterSpecie === especie.name ? "fill-white" : "fill-blue-600"
                }`}
              />
            ) : especie.name.toLowerCase() === Especies.CONEJO ? (
              <PiRabbit
                className={`text-xl fill-teal-600 ${
                  filterSpecie === especie.name ? "fill-white" : "fill-teal-600"
                }`}
              />
            ) : null
          }
        />
      ))}
    </section>
  );
};
