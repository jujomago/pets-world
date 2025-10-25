import { ImageLoaderProps } from "next/image";

// Este loader simplemente devuelve la ruta de la imagen sin modificarla.
// Es perfecto para imágenes locales en la carpeta /public.
export const localImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
