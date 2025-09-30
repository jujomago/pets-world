"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface ReportFormProps {
  mascotaId: string;
  petName: string;
}

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: !!false,
});

export const ReportForm = ({ mascotaId, petName }: ReportFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
    lugar: "",
    detalles: "",
    contacto: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement avistamiento creation action
      // await createAvistamiento({ ...formData, mascotaId });
      router.push(`/lostpet/${mascotaId}`);
    } catch (error) {
      console.error("Error al reportar avistamiento:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        Reportar avistamiento de {petName}
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Fecha del avistamiento
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) =>
              setFormData({ ...formData, fecha: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Lugar
          <input
            type="text"
            value={formData.lugar}
            onChange={(e) =>
              setFormData({ ...formData, lugar: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            placeholder="¿Dónde viste a la mascota?"
            required
          />
        </label>
      </div>
      <div className="h-50">
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

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Detalles
          <textarea
            value={formData.detalles}
            onChange={(e) =>
              setFormData({ ...formData, detalles: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            rows={4}
            placeholder="Describe las circunstancias del avistamiento..."
            required
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Información de contacto
          <input
            type="text"
            value={formData.contacto}
            onChange={(e) =>
              setFormData({ ...formData, contacto: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            placeholder="Teléfono o email de contacto"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Enviar Reporte
      </button>
    </form>
  );
};
