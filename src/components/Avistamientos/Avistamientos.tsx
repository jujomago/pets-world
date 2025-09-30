import React from "react";
import { AvistamientoItem } from "../AvistamientoItem/AvistamientoItem";
import { Title } from "../Title/Title";
import dynamic from "next/dynamic";
import { avistamientos } from "../../generated/prisma/index";

interface AvistamientosProps {
  // Define any props if needed in the future
  avistamientos?: avistamientos[];
}

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: !!false,
});

export const Avistamientos = ({ avistamientos }: AvistamientosProps) => {
  return (
    <div className="mx-4 mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="place-items-center grid h-50 bg-gray-300 w-full">
        {/* implement mapa de avistamientos */}
        <DynamicMap
          center={[40.416775, -3.70379]}
          zoom={15}
          markers={[
            { position: [40.416775, -3.70379], popupText: "Avistamiento 1" },
            { position: [40.416775, -3.70379], popupText: "Avistamiento 2" },
            { position: [40.416775, -3.70379], popupText: "Avistamiento 3" },
          ]}
        />
      </div>
      <div className="py-6 px-4">
        <Title classes="text-xl mb-4">Ultimos Avistamientos</Title>
        <ul className="space-y-2">
          {/* map avistamientos */}
          {avistamientos && avistamientos.length > 0 ? (
            avistamientos.map((avistamiento) => (
              <li key={avistamiento.id}>
                <AvistamientoItem
                  lugar={avistamiento.ubicacion}
                  fecha={new Date(avistamiento.fecha).toLocaleDateString()}
                />
              </li>
            ))
          ) : (
            <li>No hay avistamientos disponibles</li>
          )}
        </ul>
      </div>
    </div>
  );
};
