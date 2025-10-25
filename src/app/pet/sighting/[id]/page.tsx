import { getMascota } from "@/actions/mascotas";
import { PageWithTitle, Topbar } from "@/components";
import { ReportForm } from "@/app/pet/sighting/components/ReportForm";
// import { PageWithTitle, Topbar } from "@/components";

// import { Metadata } from "next";

interface ReportarPageProps {
  params: {
    id: string;
  };
}

/* export async function generateMetadata({
  params,
}: ReportarPageProps): Promise<Metadata> {
  const { id } = await params;

  const mascota = (await getMascota(id)) || null;

  const petName = mascota?.nombre || "Mascota Desconocida";
  const lostLocation = mascota?.lugar_perdida || "Lugar no especificado";
  const petType = mascota?.especies?.nombre || "Animal";

  return {
    title: `${petName} | ${petType} Perdido en ${lostLocation}`, // Título dinámico
    description: `Detalles completos sobre la mascota ${petName}, ${petType} perdido en ${lostLocation}. ¡Ayuda a encontrarlo Reportando!`, // Descripción dinámica
    // ... otros metadatos como Open Graph o Twitter
  };
}
 */
export default async function ReportarPage({ params }: ReportarPageProps) {
  const { id } = await params;

  const thePet = await getMascota(id);

  if (!thePet) {
    return <div>Mascota no encontrada</div>;
  }

  return (
    <>
      {/* <Topbar showFilters={false} title={mascota.nombre} /> */}

      {/* <PageWithTitle title={`Avistamiento de ${thePet.name}`}> */}
      <Topbar title={`Avistamiento de ${thePet.name}`} showBackBtn />
      <div className="bg-white rounded-lg shadow-md p-6 m-6 ">
        <ReportForm petId={id} petName={thePet.name} />
      </div>
      {/* </PageWithTitle> */}
    </>
  );
}
