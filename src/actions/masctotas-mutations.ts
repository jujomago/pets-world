"use server";
import prisma from "@/lib/prisma";
import { RegisterFormPet } from "@/interfaces/Forms";
import { PetStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configura Cloudinary (idealmente en un archivo de configuración separado)
// Asegúrate de tener estas variables en tu archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function createPet(data: RegisterFormPet, imageUrls: string[]) {
  try {
    // 1. Los datos ya vienen tipados gracias a la interfaz RegisterFormPet.
    //    No es necesario extraerlos de un FormData.

    // 2. Prepara los datos para la creación de PetImage
    const imagesToCreate = imageUrls.map((url, index) => ({
      url,
      isPrimary: index === 0,
    }));

    // 3. Crea el registro de la mascota y sus imágenes en una sola transacción.
    //    Ahora podemos acceder a `data` con seguridad de tipos.
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        age: Number(data.age),
        color: data.color,
        gender: data.gender,
        description: data.description,
        lostDate: new Date(data.lostDate),
        lostLocationDetails: data.lostLocationDetails,
        rewardAmount: Number(data.rewardAmount) || 0,
        speciesId: data.speciesId,
        breedId: data.breedId,
        status: PetStatus.LOST,
        ownerId: "950e8400-e29b-41d4-a716-446655440005", // TODO: Reemplazar con ID de usuario real
        lostLocationLat: Number(data.lat),
        lostLocationLon: Number(data.lng),
        images: {
          create: imagesToCreate,
        },
      },
    });

    revalidatePath("/"); // Revalida la página de inicio para mostrar la nueva mascota
    return { success: true, petId: pet.id };
  } catch (error) {
    console.error("Error creating pet:", error);
    // Aquí podrías usar tu manejador de errores de Prisma si lo tienes
    return { success: false, error: "No se pudo crear el anuncio." };
  }
}
