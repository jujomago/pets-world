// lib/prisma-errors.ts

import { Prisma } from "@prisma/client";

interface ErrorInfo {
  code: string;
  message: string;
  status: number;
}

export function handlePrismaError(error: unknown): ErrorInfo | undefined {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      code: error.errorCode || "P1001_INIT_FAIL",
      message:
        "No se puede conectar a la base de datos. Revisa que esté encendida.",
      status: 503,
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1001":
        return {
          code: error.code,
          message: "No se puede conectar a la base de datos.",
          status: 503,
        };
      case "P1002":
        return {
          code: error.code,
          message: "Tiempo de espera agotado al conectar.",
          status: 504,
        };
      case "P1008":
        return {
          code: error.code,
          message: "La operación tardó demasiado.",
          status: 504,
        };
      case "P1017":
        return {
          code: error.code,
          message: "El servidor cerró la conexión.",
          status: 503,
        };
      case "P2002":
        // Puedes hacer esto más específico si quieres
        const fields = (error.meta as { target?: string[] })?.target?.join(
          ", "
        );
        return {
          code: error.code,
          message: `Ya existe un registro con estos datos únicos: ${fields}.`,
          status: 409,
        };
      case "P2025":
        return {
          code: error.code,
          message:
            "El registro que intentas modificar o eliminar no fue encontrado.",
          status: 404,
        };
      default:
        return {
          code: error.code,
          message: "Ocurrió un error conocido en la base de datos.",
          status: 500,
        };
    }
  }

  // Handle other unknown errors
  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message || "Ocurrió un error inesperado.",
      status: 500,
    };
  }
}
