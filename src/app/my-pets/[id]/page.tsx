import { Topbar } from "@/components";
import { ActualizarForm } from "./components/ActualizarForm";
import { getMascota } from "@/actions";

interface UpdatePetPageProps {
  params: {
    id: string;
  };
}

export default async function UpdatePetPage({ params }: UpdatePetPageProps) {
  const { id } = await params;

  const mascota = await getMascota(id);
  if (!mascota) {
    // TODO: Add a proper not-found UI
    return null;
  }

  return (
    <>
      <Topbar title={`Actualizar Mascota`} showBackBtn />
      <div className="bg-white p-8 relative">
        <ActualizarForm pet={mascota} />
      </div>
    </>
  );
}
