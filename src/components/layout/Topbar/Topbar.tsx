"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cherryBombOne, geistSans, Delius, comicRelief } from "@/fonts/fonts";
import { IoArrowBack, IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import { useScrollHide } from "@/hooks/useScrollHide";
import { Species } from "@/interfaces/Pets";
import { useTopbarStore } from "@/store/Topbar";
import { getEspecies } from "@/actions/mascotas";
import { MdOutlinePets } from "react-icons/md";
import { FilterPills } from "../Filters/FilterPills";

interface TopbarProps {
  showSearchBtn?: boolean;
}

export const Topbar = ({ showSearchBtn = true }: TopbarProps) => {
  const router = useRouter();
  const { title } = useTopbarStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showFilters = pathname === "/";

  const [showSearch, setShowSearch] = useState(showSearchBtn);
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

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push("/");
    } else {
      router.back();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`sticky top-0 z-[1500]`}>
      <div
        className={`bg-[var(--rojizo)] text-white p-4 flex justify-between items-center gap-4 h-[64px] z-20 relative ${
          hidden ? "shadow-md shadow-black/20" : "box-shadow-none"
        }`}
      >
        {title && (
          <div className="relative flex items-center w-full h-8">
            <IoArrowBack
              onClick={handleBack}
              className="text-2xl cursor-pointer z-10 h-full w-8"
            />
            <h1
              className={`text-lg font-bold ${comicRelief.className}  text-center text-shadow-gray-800/20 text-shadow-md
                absolute w-full
              `}
            >
              {title}
            </h1>
          </div>
        )}

        {!title && showSearch && (
          <>
            <Link href="/">
              <h1
                className={`text-2xl font-bold ${cherryBombOne.className} text-shadow-gray-800/20 text-shadow-md flex items-center justify-center`}
              >
                <span className="text-amber-400">Mundo</span>
                <MdOutlinePets className="text-4xl fill-amber-300 mb-1 drop-shadow-sm drop-shadow-black/30" />
                <span className="text-white">Mascotas</span>
              </h1>
            </Link>
            <button
              className="p-2 bg-[#dd8755] rounded-full hover:bg-gray-600 transition"
              onClick={() => setShowSearch(!showSearch)}
            >
              <IoSearch />
            </button>
          </>
        )}
        {!title && !showSearch && (
          <>
            <div>
              <IoArrowBack
                onClick={() => setShowSearch(!showSearch)}
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
