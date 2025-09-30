"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cherryBombOne } from "@/fonts/fonts";
import { IoArrowBack, IoSearch } from "react-icons/io5";
import { useScrollHide } from "@/hooks/useScrollHide";
import { MdOutlinePets } from "react-icons/md";
import { getEspecies } from "@/actions/mascotas";
import { FilterPills } from "../Filters/FilterPills";
import { useTopbarStore } from "@/store/Topbar";

interface TopbarProps {
  // showFilters?: boolean;
  showSearchBtn?: boolean;
  //title?: string;
}

interface Especie {
  id: string;
  nombre: string;
}

export const Topbar = ({
  // showFilters = true,
  showSearchBtn = true,
}: // title,
TopbarProps) => {
  const router = useRouter();
  const { title } = useTopbarStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showFilters = pathname === "/";

  const [showSearch, setShowSearch] = useState(showSearchBtn);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const hidden = useScrollHide({ offset: 64, threshold: 6 });
  const [filterActive, setFilterActive] = useState("");

  console.log("showFilters:", showFilters);
  useEffect(() => {
    const especieParam = searchParams.get("especie");
    if (especieParam) {
      setFilterActive(especieParam);
    } else {
      setFilterActive("");
    }
  }, [searchParams]);

  useEffect(() => {
    const loadEspecies = async () => {
      const data = await getEspecies();
      setEspecies(data);
    };

    loadEspecies();
  }, []);

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push("/");
    } else {
      window.history.back();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);
  };

  return (
    <div className={`sticky top-0 z-50`}>
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
              className={`text-2xl font-bold ${cherryBombOne.className}  text-center text-shadow-gray-800/20 text-shadow-md
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
            />
          </>
        )}
      </div>
      {showFilters && especies.length > 0 && (
        <FilterPills
          especies={especies}
          filterActive={filterActive}
          hidden={hidden}
          setFilterActive={setFilterActive}
        />
      )}
    </div>
  );
};
