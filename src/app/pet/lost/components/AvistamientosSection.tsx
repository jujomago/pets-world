import { getAvistamientosByMascotaId } from "@/actions/mascotas";
import { Avistamientos } from "./Avistamientos/Avistamientos";

interface Props {
  petId: string;
}

export default async function AvistamientosSection({ petId }: Props) {
  //await new Promise((r) => setTimeout(r, 8000));
  const avistamientos = await getAvistamientosByMascotaId(petId);
  // console.log("Avistamiento");
  // console.log(avistamientos);
  return <Avistamientos avistamientos={avistamientos} />;
}
