import { getMascotasSinRecompensa } from "@/actions/mascotas";
import { EmptySection, PetCard } from "@/components";

interface Props {
  searchParams: { especie?: string };
}

// Server Component that streams the pets grid
export default async function PetsGridSection({ searchParams }: Props) {
  const mascotasSinRecompensa = await getMascotasSinRecompensa();
  const { especie } = await searchParams;
  const mascotasFiltradas = especie
    ? mascotasSinRecompensa.filter((mascota) => mascota.especie_id === especie)
    : mascotasSinRecompensa;

  if (mascotasFiltradas.length === 0) {
    return <EmptySection />;
  }

  const mascotasFormateadas = mascotasFiltradas.map((mascota) => ({
    ...mascota,
    recompensa: (mascota as any).recompensa?.toNumber
      ? (mascota as any).recompensa.toNumber()
      : (mascota as any).recompensa ?? null,
  }));

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 mb-16 p-3">
      {mascotasFormateadas.map((mascota, index) => {
        const imageSrc =
          index % 2 === 0 ? "/images/husky.webp" : "/images/crillo.jpeg";
        return (
          <PetCard
            key={mascota.id}
            mascota={mascota}
            imageSrc={imageSrc}
            vip={false}
          />
        );
      })}
    </div>
  );
}
