import { AnunciarForm } from "@/app/new-pet-lost/components/AnunciarForm";
import { Topbar } from "@/components";

export default async function AnunciarPage() {
  return (
    <>
      <Topbar title={`Reportar Mascota Perdida`} showBackBtn />
      <div className="bg-white p-8 relative">
        <AnunciarForm />
      </div>
    </>
  );
}
