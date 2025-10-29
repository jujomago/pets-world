"use server";

import { UserFormPreferences } from "@/interfaces";
import prisma from "@/lib/prisma";
import { handlePrismaError } from "@/utils/priisma-errors";

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
