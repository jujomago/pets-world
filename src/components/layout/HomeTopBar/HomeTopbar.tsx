"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cherryBombOne } from "@/fonts/fonts";
import { IoArrowBack, IoSearch } from "react-icons/io5";
import { useDebounce, useScrollHide } from "@/hooks";
// import { useScrollHide } from "@/hooks/useScrollHide";
// import { Species } from "@/interfaces/Pets";
// import { getEspecies } from "@/actions/mascotas";

import { FilterPills } from "../Filters/FilterPills";
import Image from "next/image";
import { localImageLoader } from "@/utils/localImageLoader";
import { usePWAInstall } from "@/hooks/usePWAIntall";
import { BannerPwa } from "@/components";

interface HomeTopbarProps {
  showSearchBtn?: boolean;
}

export const HomeTopbar = ({ showSearchBtn = true }: HomeTopbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showInstallButton, handleInstallClick } = usePWAInstall();

  const showFilters = pathname === "/";

  const [showSearchBar, setShowSearchBar] = useState(false);
  // console.log("showSearch:", showSearchBar);
  // const [especies, setEspecies] = useState<Species[]>([]);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 500);
  const hidden = useScrollHide({ offset: 64, threshold: 6 });
  /* 
  useEffect(() => {
    const loadEspecies = async () => {
      const data = await getEspecies();
      console.log(data);
      setEspecies(data);
    };

    loadEspecies();
  }, []);
 */
  useEffect(() => {
    if (pathname === "/") {
      const params = new URLSearchParams(searchParams);
      if (debouncedQuery) {
        params.set("q", debouncedQuery);
      } else {
        params.delete("q");
      }
      // router.push se encarga de actualizar la URL y re-renderizar los componentes de servidor necesarios.
      router.push(`/?${params.toString()}`);
    }
  }, [debouncedQuery, pathname, router, searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`sticky top-0 z-[1500]`}>
      {showInstallButton && (
        <BannerPwa handleInstallClick={handleInstallClick} />
      )}

      <div
        className={`bg-[var(--rojizo)] text-white p-4 flex ${
          showSearchBtn ? "justify-between" : "justify-center"
        } items-center gap-4 h-[64px] z-20 relative ${
          hidden ? "shadow-md shadow-black/20" : "box-shadow-none"
        }`}
      >
        {!showSearchBar && (
          <>
            <Link href="/">
              <h1
                className={`text-3xl font-bold ${cherryBombOne.className} text-shadow-gray-800/20 -md flex items-center gap-1 justify-center`}
              >
                <span className="text-amber-400  text-stroke-red ">Mundo</span>
                <Image
                  src="./images/logoMundoMascotas.png"
                  width={44}
                  height={44}
                  alt="logo mundo mascotas"
                  className="bg-amber-700 p-0.5 rounded-full"
                  loader={localImageLoader}
                />
                <span className="text-white text-stroke-red">Mascotas</span>
              </h1>
            </Link>
            {showSearchBtn && (
              <button
                className="p-2 bg-[#dd8755] rounded-full hover:bg-gray-600 transition absolute right-3"
                onClick={() => setShowSearchBar(!showSearchBar)}
              >
                <IoSearch />
              </button>
            )}
          </>
        )}
        {showSearchBar && (
          <>
            <div>
              <IoArrowBack
                onClick={() => setShowSearchBar(!showSearchBar)}
                className="text-2xl"
              />
            </div>
            <input
              type="search"
              autoFocus
              placeholder="Puedes buscar el nombre o algun atributo"
              className="p-2 bg-white rounded-xl flex-1 text-black border-0 outline-0 px-6 text-sm"
              onChange={handleSearch}
              value={query}
            />
          </>
        )}
      </div>
      {/* {showFilters && especies.length > 0 && (
        <FilterPills especies={especies} hidden={hidden} />
      )} */}
      {showFilters && <FilterPills hidden={hidden} />}
    </div>
  );
};
