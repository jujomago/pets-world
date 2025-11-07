"use server";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Pet, RegisterFormPet, UserFormPreferences } from "@/interfaces";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/utils/priisma-errors";
import { PetStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export type UserPreferences = {
  id: string;
  name: string;
  phone: string;
  acceptNotifications: boolean;
  image: string;
  email: string;
};

export async function getUserPreferences(): Promise<UserPreferences | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
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
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

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

    // console.log("updated:", updated);
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

type userPetsReponse = Pick<Pet, "id" | "name" | "status">;

export async function getUserPets(): Promise<userPetsReponse[] | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  try {
    const mascotas = await prisma.pet.findMany({
      where: {
        ownerId: userId,
        // status: "LOST",
      },
      select: {
        id: true,
        name: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (mascotas.length === 0) return null;

    const newMascotas = mascotas.map((mascota) => {
      return {
        id: mascota.id,
        name: mascota.name ?? "",
        status: mascota.status,
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

export async function getUsersPetsCount(): Promise<number> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return 0;
  }

  const userId = session.user.id;

  try {
    const petsCount = await prisma.pet.count({
      where: {
        ownerId: userId,
        // status: {
        //   not: "FOUND",
        // },
      },
    });

    return petsCount;
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
    return 0; // Devolvemos null para que la UI pueda manejarlo
  }
}
export async function updatePetStatus(petId: string, status: PetStatus) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: {
        status,
      },
    });
    revalidatePath("/my-pets");
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { success: false, error: "Failed to update pet status" };
  }
}

export async function updatePet(
  petId: string,
  data: Partial<RegisterFormPet>,
  newImageUrls: string[],
  imagesToDelete: string[]
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      message: "No se ha podido verificar la sesión del usuario.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Actualizar la información de la mascota
      await tx.pet.update({
        where: { id: petId },
        data: {
          description: data.description,
          rewardAmount: data.rewardAmount,
          rewardCoin: data.rewardCoin,
        },
      });

      // 2. Eliminar imágenes marcadas para borrado
      if (imagesToDelete.length > 0) {
        await tx.petImage.deleteMany({
          where: {
            id: {
              in: imagesToDelete,
            },
            petId: petId, // Asegurarse de que solo se borren imágenes de la mascota correcta
          },
        });
      }

      // 3. Añadir nuevas imágenes
      if (newImageUrls.length > 0) {
        await tx.petImage.createMany({
          data: newImageUrls.map((url) => ({
            url,
            petId: petId,
          })),
        });
      }
    });

    // Revalidar paths para refrescar la data en el cliente
    revalidatePath(`/my-pets/${petId}`);
    // revalidatePath(`/pet/lost/${petId}`);

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar la mascota:", error);
    const errorInfo = handlePrismaError(error);
    return {
      success: false,
      message:
        errorInfo?.message || "Ocurrió un error al actualizar la mascota.",
    };
  }
}
