import { Suspense } from "react";
import VipCarouselSection from "@/components/sections/VipCarouselSection";
import PetsGridSection from "@/components/sections/PetsGridSection";
import { VipCarouselSkeleton } from "@/components/skeletons";
import { CardsGridSkeleton } from "@/components/skeletons";
// import { TabBar } from "@/components/layout/Tabbar/TabBar";
// import { Topbar } from "@/components/layout/Topbar/Topbar";

interface Props {
  searchParams: { especie?: string };
}

export default function page({ searchParams }: Props) {
  return (
    // <div className="container mx-auto pb-10 max-w-md min-h-dvh">
    <>
      {/* <Topbar /> */}
      <Suspense fallback={<VipCarouselSkeleton />}>
        <VipCarouselSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<CardsGridSkeleton />}>
        <PetsGridSection searchParams={searchParams} />
      </Suspense>
      {/* <TabBar /> */}
    </>
    // </div>
  );
}
