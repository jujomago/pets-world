export const revalidate = 3600; // revalidad cada hora

import VipCarouselSection from "@/components/sections/VipCarouselSection";
import PetsGridSection from "@/components/sections/PetsGridSection";

interface Props {
  searchParams: { especie?: string };
}

export default async function page({ searchParams }: Props) {
  // 1. Usa la clave para forzar la re-suspensión
  const filterKey = (await searchParams)?.especie || "all";

  return (
    // <div className="container mx-auto pb-10 max-w-md min-h-dvh">
    <>
      {/* <Topbar /> */}
      <VipCarouselSection
        key={`vip-${filterKey}`}
        searchParams={searchParams}
      />
      <PetsGridSection key={`grid-${filterKey}`} searchParams={searchParams} />
      {/* <TabBar /> */}
    </>
    // </div>
  );
}
