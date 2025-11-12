import PetsGridSection from "@/app/(with-tabbbar)/components/PetsGridSection";
import { HomeTopbar } from "@/components/layout/HomeTopBar/HomeTopbar";
import { Metadata } from "next";

import VipCarouselSection from "./components/VipCarouselSection";

export const metadata: Metadata = {
  title: "Mascotas Perdidas | Encuentra a tu Amigo Peludo",
  description:
    "Explora la lista de mascotas perdidas y encontradas en tu comunidad. Ayuda a reunir a un animal con su familia o reporta un avistamiento. ¡Tu colaboración es clave!",
  openGraph: {
    title: "Mascotas Perdidas | Encuentra a tu Amigo Peludo",
    description:
      "Ayuda a reunir a mascotas perdidas con sus dueños. Explora los reportes en tu área.",
    url: "https://mundo-mascotas-beta.vercel.app", // 🚨 Reemplazar con la URL real del sitio
    siteName: "Mundo Mascotas",
    images: [
      {
        url: "/images/collageAnimales.png",
        width: 1200,
        height: 630,
        alt: "Collage de varias mascotas",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mascotas Perdidas | Encuentra a tu Amigo Peludo",
    description:
      "Explora la lista de mascotas perdidas y encontradas y ayuda a que regresen a casa.",
    images: ["/images/collageAnimales.png"],
  },
};

interface Props {
  searchParams: { especie?: string };
}

export default async function page({ searchParams }: Props) {
  const urlParams = await searchParams;
  const filterKey = urlParams?.especie || "all";

  return (
    <div className="min-h-[calc(100dvh-70px)]">
      <>
        <HomeTopbar />

        <VipCarouselSection key={`vip-${filterKey}`} params={urlParams} />
        <PetsGridSection key={`grid-${filterKey}`} params={urlParams} />
        {/* <TabBar /> */}
      </>
    </div>
  );
}
