"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyIpLocation } from "./actions";

import { ImSpinner2 } from "react-icons/im";

export default function GeoCheckPage() {
  const [status, setStatus] = useState("Verificando tu zona de servicio...");
  const [loading, isLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLocation = async () => {
      isLoading(true);
      try {
        const result = await verifyIpLocation();

        if (result.success) {
          setStatus("Verificación exitosa. Redirigiendo...");
          // 2. Aprobado: Redirige al inicio y refresca la sesión
          router.push("/");
          router.refresh();
        } else {
          // 3. Rechazado: Muestra el error
          setError(
            result.error || "No cumples con los requisitos de ubicación."
          );
        }
      } catch (err) {
        console.error(err);
        setError("Ocurrió un error inesperado al verificar la zona.");
      } finally {
        isLoading(false);
      }
    };
    checkLocation();
  }, [router]);

  return (
    <div className="grid place-items-center h-screen p-7 text-center text-2xl">
      <div>
        {/* Aquí puedes poner un componente <Spinner /> */}
        {loading && (
          <ImSpinner2 className="animate-spin-clockwise animate-iteration-count-infinite animate-duration-700 inline-block text-5xl" />
        )}

        {error ? <p className="text-red-600">{error}</p> : <p>{status}</p>}
      </div>
    </div>
  );
}
