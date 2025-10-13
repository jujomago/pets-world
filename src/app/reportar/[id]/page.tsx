import { getMascota } from "@/actions/mascotas";
import { PageWithTitle } from "@/components";
// import { PageWithTitle, Topbar } from "@/components";
// import { ReportForm } from "@/components/ReportForm/ReportForm";
import { Metadata } from "next";

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

  const mascota = (await getMascota(id)) || {
    nombre: "",
    genero: "",
    fecha_perdida: new Date(),
    lugar_perdida: "",
    detalle_perdida: "",
    edad: 0,
    color: "",
    recompensa: 0,
    imageSrc: "",
    razas: { nombre: "" },
    especies: { nombre: "" },
  };

  if (!mascota) {
    return <div>Mascota no encontrada</div>;
  }

  return (
    <>
      {/* <Topbar showFilters={false} title={mascota.nombre} /> */}

      <PageWithTitle title={`Avistamiento de asd`}>
        <div className="bg-white rounded-lg shadow-md p-6 m-6">
          {/* <ReportForm mascotaId={id} petName={mascota.nombre} /> */}
        </div>
      </PageWithTitle>
    </>
  );
}
