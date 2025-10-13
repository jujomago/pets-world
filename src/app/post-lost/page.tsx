import { AnunciarForm } from "@/components/Forms/AnunciarForm";
import { PageWithTitle } from "@/components";

export default async function AnunciarPage() {
  return (
    <>
      <PageWithTitle title={`Reportar Mascota Perdida`}>
        <div className="bg-white p-8 relative">
          <AnunciarForm />
        </div>
      </PageWithTitle>
    </>
  );
}
