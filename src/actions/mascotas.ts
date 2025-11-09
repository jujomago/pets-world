"use server";

import { Pet } from "@/interfaces/Pets";

import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/utils/priisma-errors";
import { PetStatus } from "@prisma/client";

import { revalidatePath } from "next/cache";

//import type { Pet, Sighting } from "@prisma/client";

// Define la interfaz de los filtros para la función unificada
interface PetFilters {
  speciesName?: string; // Ahora filtramos por nombre de especie
  rewardType: "all" | "withReward" | "noReward"; // Define el tipo de recompensa
  q?: string;
}

/**
 * Obtiene mascotas con filtrado opcional por especie y tipo de recompensa.
 * El filtrado se realiza directamente en la consulta de Prisma (la base de datos).
 */
export async function getMascotas(filters: PetFilters): Promise<Pet[] | null> {
  // 1. Construye el objeto 'where' dinámicamente
  const whereConditions: { [key: string]: any } = { status: PetStatus.LOST };

  // Filtro por nombre de especie (si existe)
  // Esto utiliza una consulta relacional.
  if (filters.speciesName) {
    whereConditions.species = {
      name: {
        equals: filters.speciesName,
        mode: "insensitive",
      },
    };
  }

  // Filtro por recompensa
  if (filters.rewardType === "withReward") {
    whereConditions.rewardAmount = { gt: 0 }; // Recompensa mayor a 0
  } else if (filters.rewardType === "noReward") {
    whereConditions.rewardAmount = 0; // Recompensa igual a 0
  }

  if (filters.q) {
    whereConditions.OR = [
      {
        name: {
          contains: filters.q,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: filters.q,
          mode: "insensitive",
        },
      },
    ];
  }

  try {
    // 2. Ejecuta la consulta a Prisma con las condiciones
    const mascotas = await prisma.pet.findMany({
      where: whereConditions,
      include: {
        images: true, // Incluye las imágenes relacionadas
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(filters.rewardType === "withReward" && { take: 3 }),
    });

    // 3. Mapeo para normalizar los datos al formato de tu interfaz Pet[]
    const newMascotas = mascotas.map((mascota) => {
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
        ownerId: mascota.ownerId ?? "",
        speciesId: mascota.speciesId ?? "",
        breedId: mascota.breedId ?? "",
        images: mascota.images ?? [],
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

export async function getMascota(id: string): Promise<Pet | null> {
  const mascota = await prisma.pet.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      age: true,
      color: true,
      gender: true,
      description: true,
      status: true,
      lostDate: true,
      lostLocationLat: true,
      lostLocationLon: true,
      lostLocationDetails: true,
      rewardAmount: true,
      rewardCoin: true,
      ageUnit: true,
      owner: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
      breed: {
        select: {
          id: true,
          name: true,
        },
      },
      //sightings: true,
      images: {
        select: {
          id: true,
          url: true,
          isPrimary: true,
        },
      },
      favoritedBy: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!mascota) return null;
  return {
    id: mascota.id,
    name: mascota.name ?? "",
    age: mascota.age ?? 0,
    color: mascota.color ?? "",
    gender: mascota.gender ?? "",
    rewardCoin: mascota.rewardCoin ?? "",
    ageUnit: mascota.ageUnit ?? "",
    description: mascota.description ?? "",
    lostDate: mascota.lostDate,
    lostLocationLat: Number(mascota.lostLocationLat),
    lostLocationLon: Number(mascota.lostLocationLon),
    lostLocationDetails: mascota.lostLocationDetails ?? "",
    rewardAmount: Number(mascota.rewardAmount),
    owner: {
      id: mascota.owner?.id,
      name: mascota.owner?.name ?? "",
      phone: mascota.owner?.phone ?? "",
    },
    breedName: mascota.breed?.name,
    images: mascota.images ?? [],
    isFavorite: mascota.favoritedBy.length > 0,
  };
}

export async function getEspecies() {
  try {
    const especies = await prisma.species.findMany();
    return especies;
  } catch (error) {
    const errorInfo = handlePrismaError(error);

    if (errorInfo) {
      console.error("=== ERROR CONTROLADO EN getEspecies ===");
      console.error(
        `Código: ${errorInfo.code} | Mensaje: ${errorInfo.message}`
      );
    } else {
      // Si el error no es de Prisma, lo mostramos para depuración.
      console.error("=== ERROR NO CONTROLADO EN getEspecies ===", error);
    }
    return [];
  }
}

export async function getRazasByEspecie(especieId: string) {
  const razas = await prisma.breed.findMany({
    where: { speciesId: especieId },
    orderBy: { name: "asc" },
  });
  return razas;
}

export async function getAvistamientosByMascotaId(mascotaId: string) {
  const avistamientos = await prisma.sighting.findMany({
    where: { petId: mascotaId },
    orderBy: { date: "desc" },
  });
  return avistamientos;
}

export async function revalidateHomePage() {
  revalidatePath("/");
}
