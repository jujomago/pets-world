import { ImageLoaderProps } from "next/image";

export const cloudinaryLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps): string => {
  // src es la URL completa que viene de tu base de datos
  const publicId = src.split("/upload/")[1];
  //   console.log("width:", width);
  // La lógica 'quality || 'auto'' ya maneja el caso de que quality sea undefined
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];

  console.log(params);

  return `https://res.cloudinary.com/dkvxndrnd/image/upload/${params.join(
    ","
  )}/${publicId}`;
};
