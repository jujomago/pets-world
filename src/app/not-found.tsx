import { Topbar } from "@/components";
import { GiTerror } from "react-icons/gi";

export default function NotFoundPage() {
  return (
    <>
      <Topbar title="404 - La pagina no existe" />
      <div className="m-10 p-10 grid place-items-center bg-white rounded-xl">
        <GiTerror className="text-5xl mb-5" />
        <h1 className="text-xl">La pagina no existe</h1>
      </div>
    </>
  );
}
