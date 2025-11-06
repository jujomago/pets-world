import { getFavorites } from "@/actions/favorites";
import { EmptySection, PetCard, Topbar } from "@/components";

import React from "react";

async function PetsGrid() {
  const mascotasFiltradas = await getFavorites();

  if (mascotasFiltradas?.length === 0) {
    return <EmptySection />;
  }

  return (
    <div className="flex flex-col px-8 py-6 gap-10">
      {mascotasFiltradas?.map((mascota) => {
        return (
          <PetCard
            key={mascota.id}
            mascota={mascota}
            vip={(mascota.rewardAmount as number) > 0}
          />
        );
      })}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <>
      <Topbar title="Mis favoritos" showBackBtn />
      <PetsGrid />
    </>
  );
}
