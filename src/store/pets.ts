import { create } from "zustand";

type PetsState = {
  filterBySpecieId: (specieId: string | null) => void;
};

const usePetsStore = create<PetsState>(() => ({
  filterBySpecieId: (specieId) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (specieId) {
      searchParams.set("especie", specieId);
    } else {
      searchParams.delete("especie");
    }
    window.history.pushState(null, "", `?${searchParams.toString()}`);
  },
}));

export default usePetsStore;
