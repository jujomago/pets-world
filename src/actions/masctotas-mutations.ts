"use server";
import prisma from "@/lib/prisma";
import { RegisterFormPet } from "@/interfaces/Forms";
import { PetStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { ReportFormPet } from "../interfaces/Forms";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendNotificationToAll } from "@/lib/notifications";
import { authOptions } from "@/lib/auth";

// Configura Cloudinary (idealmente en un archivo de configuración separado)
// Asegúrate de tener estas variables en tu archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function createPet(data: RegisterFormPet, imageUrls: string[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, error: "No autorizado" };
  }

  const userId = session.user.id;

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
        status: PetStatus.LOST, // TODO: crear el workflow para que el primer state sea PENDING
        ownerId: userId,
        lostLocationLat: Number(data.lat),
        lostLocationLon: Number(data.lng),
        ageUnit: data.ageUnit,
        rewardCoin: data.rewardCoin,
        images: {
          create: imagesToCreate,
        },
      },
    });
    await sendNotificationToAll(
      "¡Nueva mascota perdida!",
      `Se ha reportado a ${pet.name} como perdido en la zona ${pet.lostLocationDetails}.`,
      `/pet/lost/${pet.id}` // Esta es la URL a la que irá el usuario al hacer clic
    );

    revalidatePath("/");

    return { success: true, petId: pet.id };
  } catch (error) {
    console.error("Error creating pet:", error);
    // Aquí podrías usar tu manejador de errores de Prisma si lo tienes
    return { success: false, error: "No se pudo crear el anuncio." };
  }
}

export async function createAvistamiento(data: ReportFormPet) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, error: "No autorizado" };
  }

  const userId = session.user.id;

  try {
    const sighting = await prisma.sighting.create({
      data: {
        petId: data.petId,
        date: new Date(data.sightingDate),
        sightingLat: data.lat,
        sightingLon: data.lng,
        locationDescription: data.locationDetails,
        description: data.details,
        photoUrl: data.image, // TODO: Puede ser undefined si no se subió imagen
        reporterId: userId,
      },
    });

    revalidatePath(`/lostpet/${data.petId}`);
    return { success: true, sighting };
  } catch (error) {
    console.error("Error creating avistamiento:", error);
    return {
      success: false,
      error: "No se pudo registrar el avistamiento.",
    };
  }
}
