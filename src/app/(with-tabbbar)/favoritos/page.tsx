import { getFavorites } from "@/actions/favorites";
import { EmptySection, PageWithTitle, PetCard } from "@/components";

import React from "react";

interface Props {
  searchParams: { especie?: string; q?: string };
}

async function PetsGrid({ searchParams }: Props) {
  const { especie, q } = await searchParams;

  const filters = {};

  const mascotasFiltradas = await getFavorites(
    "950e8400-e29b-41d4-a716-446655440005"
  );
  // console.log(mascotasFiltradas[0]);

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

export default function FavoritesPage({ searchParams }: Props) {
  return (
    <PageWithTitle title="Favoritos">
      <PetsGrid searchParams={searchParams} />
    </PageWithTitle>
  );
}
