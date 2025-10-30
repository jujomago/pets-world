"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Pet, UserFormPreferences } from "@/interfaces";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/utils/priisma-errors";
import { getServerSession } from "next-auth";

export type UserPreferences = {
  id: string;
  name: string;
  phone: string;
  acceptNotifications: boolean;
  image: string;
  email: string;
};

export async function getUserPreferences(
  email: string
): Promise<UserPreferences | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        acceptNotifications: true,
        phone: true,
        email: true,
        id: true,
        name: true,
        image: true,
      },
    });

    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name ?? "", // Añadimos default para que coincida con el tipo
      phone: user.phone ?? "",
      acceptNotifications: user.acceptNotifications ?? false,
      image: user.image ?? "",
      email: user.email, // El email no puede ser null si se usó en el 'where'
    };
  } catch (error) {
    const errorInfo = handlePrismaError(error);
    if (errorInfo) {
      console.error("=== ERROR CONTROLADO EN getUserPreferences ===");
    }
    return null;
  }
}

export async function updateUserPreferences(
  data: UserFormPreferences,
  email: string
) {
  console.log("data:", data);
  console.log("userId:", email);
  try {
    const updated = await prisma.user.update({
      data: {
        acceptNotifications: data.acceptNotifications === "si",
        phone: data.phones,
      },
      where: {
        email: email, // TODO: Revisar por que no llega el id del uusuario en la session, el workaround es con el email
      },
    });

    console.log("updated:", updated);
    if (updated) return { sucess: true };
  } catch (error) {
    const errorInfo = handlePrismaError(error);

    if (errorInfo) {
      console.error("=== ERROR CONTROLADO EN updateUserPreferences ===");
      console.error(
        `Código: ${errorInfo.code} | Mensaje: ${errorInfo.message}`
      );
    } else {
      // Si el error no es de Prisma, lo mostramos para depuración.
      console.error(
        "=== ERROR NO CONTROLADO EN updateUserPreferences ===",
        error
      );
    }
    return { sucess: false };
  }
}

export async function getUserPets(): Promise<Pet[] | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  try {
    const mascotas = await prisma.pet.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        images: true, // Incluye las imágenes relacionadas
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const newMascotas = mascotas.map((mascota) => {
      return {
        id: mascota.id,
        name: mascota.name ?? "",
        age: mascota.age ?? 0,
        color: mascota.color ?? "",
        gender: mascota.gender ?? "",
        description: mascota.description ?? "",
        lostDate: mascota.lostDate,
        lostLocationLat: Number(mascota.lostLocationLat),
        lostLocationLon: Number(mascota.lostLocationLon),
        lostLocationDetails: mascota.lostLocationDetails ?? "",
        rewardAmount: Number(mascota.rewardAmount),
        ownerId: mascota.ownerId ?? "",
        speciesId: mascota.speciesId ?? "",
        breedId: mascota.breedId ?? "",
        images: mascota.images ?? [],
        status: mascota.status ?? "",
      };
    });

    return newMascotas;
  } catch (error) {
    const errorInfo = handlePrismaError(error);
    // Si handlePrismaError devuelve información, la mostramos.
    // Si no, mostramos un error genérico.
    if (errorInfo) {
      console.error("=== ERROR CONTROLADO EN getMascotas ===");
      console.error(
        `Código: ${errorInfo.code} | Mensaje: ${errorInfo.message}`
      );
    } else {
      // Si el error no es de Prisma, lo mostramos para depuración.
      console.error("=== ERROR NO CONTROLADO EN getMascotas ===", error);
    }
    return null; // Devolvemos null para que la UI pueda manejarlo
  }
}
