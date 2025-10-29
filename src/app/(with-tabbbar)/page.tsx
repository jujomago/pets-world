export const revalidate = 3600; // revalidad cada hora

import VipCarouselSection from "@/app/(with-tabbbar)/components/VipCarouselSection";
import PetsGridSection from "@/app/(with-tabbbar)/components/PetsGridSection";
import { HomeTopbar } from "@/components/layout/HomeTopBar/HomeTopbar";

interface Props {
  searchParams: { especie?: string };
}

export default async function page({ searchParams }: Props) {
  // 1. Usa la clave para forzar la re-suspensión
  const filterKey = (await searchParams)?.especie || "all";

  return (
    <div className="min-h-[calc(100dvh-70px)]">
      <>
        {/* <Topbar /> */}
        <HomeTopbar />
        <VipCarouselSection
          key={`vip-${filterKey}`}
          searchParams={searchParams}
        />
        <PetsGridSection
          key={`grid-${filterKey}`}
          searchParams={searchParams}
        />
        {/* <TabBar /> */}
      </>
    </div>
  );
}
