import { getMascotasConRecompensa } from "@/actions/mascotas";
import { EmptySection, SwipperVip } from "@/components";

interface Props {
  searchParams: { especie?: string };
}

// Server Component that streams the VIP carousel
export default async function VipCarouselSection({ searchParams }: Props) {
  // Simulate delay to visualize Suspense fallback
  //await new Promise((r) => setTimeout(r, 8000));

  const mascotasConRecompensa = await getMascotasConRecompensa();
  const { especie } = await searchParams;
  console.log("Especie in VipCarouselSection:", especie);

  const filteredMascotas = especie
    ? mascotasConRecompensa.filter((mascota) => mascota.especie_id === especie)
    : mascotasConRecompensa;

  if (filteredMascotas.length === 0) {
    return <EmptySection classes="bg-amber-50" />;
  }

  const mascotasConRecompensaFormateadas = filteredMascotas.map((mascota) => ({
    ...mascota,
    recompensa: mascota.recompensa?.toNumber() || null,
  }));

  return <SwipperVip mascotas={mascotasConRecompensaFormateadas} />;
}
