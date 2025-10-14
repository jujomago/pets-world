"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect, useMemo, useRef, useCallback, memo } from "react";
import L from "leaflet";

// Configuración de los iconos por defecto
delete (L.Icon.Default.prototype as any)._getIconUrl;

// TODO: cambiar las imagenes de los markers por algo personalizado
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

const DEFAULT_CENTER = [-21.506045, -64.785089];

interface MapProps {
  center?: [number, number];
  zoom: number;
  dragablePin?: boolean;
  markers?: { position: [number, number]; popupText: string }[];
  onPositionChange?: (position: [number, number]) => void;
}

const MapComponent = ({
  center = [DEFAULT_CENTER[0], DEFAULT_CENTER[1]],
  zoom = 15,
  markers,
  dragablePin = false,
  onPositionChange,
}: MapProps) => {
  console.log("rerendering");
  const [position, setPosition] = useState<[number, number]>(center);
  const [isLoading, setIsLoading] = useState(true);

  const markerRef = useRef<L.Marker | null>(null);

  const updatePosition = useCallback(
    (newPosition: [number, number]) => {
      setPosition(newPosition);
      if (onPositionChange) onPositionChange(newPosition);
      // setInputValue(`${newPosition.lat}, ${newPosition.lng}`);
    },
    [onPositionChange]
  );

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        updatePosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  useEffect(() => {
    let isMounted = true;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          if (isMounted) {
            updatePosition([
              location.coords.latitude,
              location.coords.longitude,
            ]);
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          if (isMounted) {
            updatePosition([DEFAULT_CENTER[0], DEFAULT_CENTER[1]]);
            setIsLoading(false);
          }
        }
      );
    } else {
      console.log("Geolocation is not supported");
      updatePosition([DEFAULT_CENTER[0], DEFAULT_CENTER[1]]);
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [updatePosition]); // Se mantiene updatePosition para que el efecto se ejecute si la función cambia, pero ahora la función es estable.

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          updatePosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        }
      },
    }),
    [updatePosition]
  );

  if (isLoading) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <>
      <MapContainer center={position} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!markers && (
          <Marker
            position={position}
            draggable={dragablePin}
            eventHandlers={eventHandlers}
            ref={markerRef}
          >
            <Popup>Tu ubicación actual</Popup>
          </Marker>
        )}
        {markers &&
          markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>{marker.popupText}</Popup>
            </Marker>
          ))}
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export const Map = memo(MapComponent);
