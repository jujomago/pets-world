"use server";

import prisma from "@/lib/prisma";

export async function getMascotasConRecompensa() {
  const mascotas = await prisma.mascotas.findMany({
    where: { recompensa: { gt: 0 } },
  });
  return mascotas;
}

export async function getMascotasSinRecompensa() {
  const mascotas = await prisma.mascotas.findMany({
    where: { recompensa: 0 },
  });
  return mascotas;
}

export async function getMascota(id: string) {
  const mascota = await prisma.mascotas.findUnique({
    where: { id },
    include: {
      especies: true,
      razas: true,
      avistamientos: true,
    },
  });
  return mascota;
}

export async function getEspecies() {
  const especies = await prisma.especies.findMany();
  return especies;
}

export async function getRazasByEspecie(especieId: string) {
  const razas = await prisma.razas.findMany({
    where: { especie_id: especieId },
  });
  return razas;
}

export async function searchMascotasByName(name: string) {
  const mascotas = await prisma.mascotas.findMany({
    where: {
      nombre: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return mascotas;
}

export async function getAvistamientosByMascotaId(mascotaId: string) {
  const avistamientos = await prisma.avistamientos.findMany({
    where: { mascota_id: mascotaId },
    orderBy: { fecha: "desc" },
  });
  return avistamientos;
}

interface AvistamientoData {
  mascotaId: string;
  fecha: string;
  lugar: string;
  detalles: string;
  contacto: string;
}

export async function createAvistamiento(data: AvistamientoData) {
  try {
    const avistamiento = await prisma.avistamientos.create({
      data: {
        mascota_id: data.mascotaId,
        fecha: new Date(data.fecha),
        ubicacion: data.lugar,
        descripcion: data.detalles,
      },
    });
    return avistamiento;
  } catch (error) {
    console.error("Error creating avistamiento:", error);
    throw new Error("Failed to create avistamiento");
  }
}
