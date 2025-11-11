import React from "react";
import { AvistamientoItem } from "../AvistamientoItem/AvistamientoItem";

import dynamic from "next/dynamic";
import { Sighting } from "@prisma/client";
import { Title } from "@/components";
import { PiSmileySadThin } from "react-icons/pi";

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
    return (
      <div className="flex justify-center items-center m-6 p-6 gap-2 bg-gray-200/80 rounded-md font-semibold ">
        <PiSmileySadThin className="text-3xl stroke-3 text-amber-700 font-bold" />{" "}
        No se reporto ningun avistamiento
      </div>
    );

  // console.log(avistamientos);

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
