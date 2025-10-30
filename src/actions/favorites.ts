"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Pet } from "@/interfaces/Pets";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function toggleFavorite(petId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, error: "No autorizado", isFavorite: false };
  }

  const userId = session.user.id;

  try {
    const favorite = await prisma.favorite.findUnique({
      where: { userId_petId: { userId, petId } },
    });

    if (favorite) {
      await prisma.favorite.delete({
        where: { userId_petId: { userId, petId } },
      });
      return { success: true, isFavorite: false };
    } else {
      await prisma.favorite.create({ data: { userId, petId } });
      return { success: true, isFavorite: true };
    }
  } catch (e) {
    console.log("error updating favorite:", e);
    return {
      success: false,
      error: "Error al actualizar favorito",
      isFavorite: false,
    };
  }
}

export async function getFavorites(userId: string): Promise<Pet[] | null> {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        pet: {
          include: {
            images: true,
          },
        },
      },
    });

    const newMascotas = favorites.map(({ pet: mascota }) => {
      // Nota: El ownerId fijo (950e8400-...) parece ser un placeholder;
      // asegúrate de reemplazarlo si tienes un owner real en tu esquema.
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
        ownerId: "950e8400-e29b-41d4-a716-446655440005",
        speciesId: mascota.speciesId ?? "",
        breedId: mascota.breedId ?? "",
        images: mascota.images ?? [],
      };
    });

    return newMascotas;
  } catch (e) {
    console.log("error geting favorites:", e);
    return null;
  }
}
