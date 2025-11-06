// En PetsGridSection.tsx

import { getMascotas } from "@/actions/mascotas";
import { EmptySection, PetCard } from "@/components";
import { CardsGridSkeleton } from "@/components/skeletons";

import { Suspense } from "react";

// export const dynamic = "force-dynamic";

interface Props {
  searchParams: { especie?: string; q?: string };
}

async function PetsGrid({ searchParams }: Props) {
  const { especie, q } = await searchParams;

  const filters = {
    speciesName: especie,
    rewardType: "noReward" as const,
    q: q,
  };

  const mascotasFiltradas = await getMascotas(filters);

  if (mascotasFiltradas === null || mascotasFiltradas.length === 0) {
    return <EmptySection />;
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 mb-16 p-3">
      {mascotasFiltradas.map((mascota) => {
        return <PetCard key={mascota.id} mascota={mascota} vip={false} />;
      })}
    </div>
  );
}

export default function PetsGridSection({ searchParams }: Props) {
  return (
    <Suspense fallback={<CardsGridSkeleton />}>
      <PetsGrid searchParams={searchParams} />
    </Suspense>
  );
}
