"use server";

import { v2 as cloudinary } from "cloudinary";

// La configuración ya debería estar en `mascotas-mutations.ts`, pero es bueno
// asegurarse de que esté disponible aquí también. Idealmente, esto se centraliza.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getCloudinarySignature() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "mascotas-perdidas" },
      process.env.CLOUDINARY_API_SECRET!
    );

    return { success: true, timestamp, signature };
  } catch (error) {
    console.error("Error al obtener la firma de Cloudinary:", error);
    return { success: false, error: "No se pudo obtener la firma." };
  }
}
