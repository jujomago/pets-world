import React from "react";
import { AvistamientoItem } from "../AvistamientoItem/AvistamientoItem";
import { Title } from "../Title/Title";
import dynamic from "next/dynamic";
import { Sighting } from "@prisma/client";

interface AvistamientosProps {
  // Define any props if needed in the future
  avistamientos?: Sighting[];
}

const DynamicMap = dynamic(
  () => import("@/components/map/Map").then((mod) => ({ default: mod.Map })),
  {
    loading: () => <p>Loading map...</p>,
    ssr: !!false,
  }
);

export const Avistamientos = ({ avistamientos }: AvistamientosProps) => {
  if (!avistamientos || avistamientos.length === 0)
    return <p>No hay avistamientos disponibles</p>;

  console.log(avistamientos);

  return (
    <div className="mx-4 mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="place-items-center grid h-50 bg-gray-300 w-full">
        {/* implement mapa de avistamientos */}
        <DynamicMap
          center={[40.416775, -3.70379]}
          zoom={13}
          markers={avistamientos.map((avistamiento) => ({
            position: [
              Number(avistamiento.sightingLat),
              Number(avistamiento.sightingLon),
            ],
            popupText: avistamiento.locationDescription as string,
          }))}
        />
      </div>
      <div className="py-6 px-4">
        <Title classes="text-xl mb-4">Ultimos Avistamientos</Title>
        <ul className="space-y-2">
          {/* map avistamientos */}

          {avistamientos.map((avistamiento) => (
            <li key={avistamiento.id}>
              <AvistamientoItem
                lugar={avistamiento.locationDescription || ""}
                fecha={new Date(avistamiento.date).toLocaleDateString()}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
