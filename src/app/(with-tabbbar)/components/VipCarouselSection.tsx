import { getMascotas } from "@/actions/mascotas";
import { EmptySection } from "@/components";
import { VipCarouselSkeleton } from "@/components/skeletons";

import { Suspense } from "react";
import { SwipperVip } from "./SwipperVip/SwipperVip";

interface Props {
  params: { especie?: string; q?: string };
}

export async function VipCarousel({ params }: Props) {
  const { especie, q } = params;
  console.log("especie viprCarousel:", especie);
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

export default function VipCarouselSection({ params }: Props) {
  return (
    <Suspense fallback={<VipCarouselSkeleton />}>
      <VipCarousel params={params} />
    </Suspense>
  );
}
