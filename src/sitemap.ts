import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Rutas Estáticas
  // Define las páginas principales de tu aplicación que no cambian a menudo.
  // Solo incluimos las rutas que son 100% públicas.
  const staticRoutes = ["/", "/login"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    // La página principal tiene la máxima prioridad, la de login menos.
    priority: route === "/" ? 1.0 : 0.5,
  }));

  // 2. Rutas Dinámicas para Mascotas
  // Obtenemos todas las mascotas para generar una URL para cada una.
  // Seleccionamos solo los campos necesarios (id y createdAt/updatedAt) para que la consulta sea ligera.
  const pets = await prisma.pet.findMany({
    where: {
      status: "LOST", // Solo incluir mascotas perdidas en el sitemap
    },
    select: {
      id: true,
      createdAt: true, // O `updatedAt` si lo tienes, es aún mejor.
    },
  });

  const petRoutes = pets.map((pet) => ({
    url: `${BASE_URL}/pet/lost/${pet.id}`,
    lastModified: pet.createdAt.toISOString(), // Usar la fecha de creación/actualización de la mascota
    changeFrequency: "daily" as const, // El estado de una mascota puede cambiar diariamente
    priority: 0.9, // Alta prioridad, son el contenido principal
  }));

  // 3. Combinar todas las rutas
  return [...staticRoutes, ...petRoutes];
}
