"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

// Configuración de los iconos por defecto
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

interface MapProps {
  center: [number, number];
  zoom: number;
  markers?: { position: [number, number]; popupText: string }[];
}

const Map = ({ center, zoom = 15, markers }: MapProps) => {
  const [position, setPosition] = useState<[number, number]>(center);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPosition([location.coords.latitude, location.coords.longitude]);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Coordenadas por defecto si hay error
          setPosition([40.416775, -3.70379]);
          setIsLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported");
      setPosition([40.416775, -3.70379]);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <MapContainer center={position} zoom={zoom} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Tu ubicación actual</Popup>
      </Marker>
      {markers &&
        markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
