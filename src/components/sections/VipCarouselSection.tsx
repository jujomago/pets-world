// En VipCarouselSection.tsx

import { getMascotas } from "@/actions/mascotas";
import { EmptySection, SwipperVip } from "@/components";
import { VipCarouselSkeleton } from "@/components/skeletons";
import delay from "@/utils/delay";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";

interface Props {
  searchParams: { especie?: string; q?: string };
}

async function VipCarousel({ searchParams }: Props) {
  // await delay(2000);
  const { especie, q } = await searchParams;

  const filters = {
    speciesName: especie,
    rewardType: "withReward" as const,
    q: q,
  };

  const mascotasConRecompensa = await getMascotas(filters);

  if (mascotasConRecompensa === null || mascotasConRecompensa.length === 0) {
    return <EmptySection classes="bg-amber-50" />;
  }

  return <SwipperVip mascotas={mascotasConRecompensa} />;
}

export default function VipCarouselSection({ searchParams }: Props) {
  return (
    <Suspense fallback={<VipCarouselSkeleton />}>
      <VipCarousel searchParams={searchParams} />
    </Suspense>
  );
}
