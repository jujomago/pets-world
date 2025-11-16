import { getMascota } from "@/actions/mascotas";
import { FaRegCalendar } from "react-icons/fa6";
import { MdCake, MdPets, MdPlace } from "react-icons/md";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { Title, Button, Topbar } from "@/components";
import { FaMoneyBillWave, FaPalette } from "react-icons/fa";
import { RiMapPinAddFill } from "react-icons/ri";

import { Suspense } from "react";
import { AvistamientoSkeleton } from "@/components/skeletons/AvistamientosSkeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Gender } from "@prisma/client";
import { IoScanCircle } from "react-icons/io5";
import { FavoriteButton } from "@/components/Favorite/FavoriteButton";
import AvistamientosSection from "../components/AvistamientosSection";
import { PetDetailSlider } from "../components/PetDetailSlider/PetDetailSlider";
import { ContactButton } from "../components/ContactButton/ContactButton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface LostPetDetailProps {
  params: {
    id: string;
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateMetadata({
  params,
}: LostPetDetailProps): Promise<Metadata> {
  const { id } = params; // `params` es un objeto, no una promesa.
  const mascota = await getMascota(id);

  if (!mascota) {
    return {
      title: "Mascota no encontrada",
      description: "La mascota que buscas no está disponible.",
    };
  }

  const petName = mascota.name || "Mascota Desconocida";
  const lostLocation = mascota.lostLocationDetails || "Lugar no especificado";
  const breedName = mascota.breedName || "Raza no especificada";
  const primaryImage =
    mascota.images?.find((img) => img.isPrimary)?.url ||
    "/images/collageAnimales.png";

  const title = `¡Se busca a ${petName}! | ${breedName} perdido en ${lostLocation}`;
  const description = `Ayuda a encontrar a ${petName}, un ${breedName} perdido en la zona de ${lostLocation}. Revisa los detalles y reporta si lo has visto.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/pet/lost/${id}`,
      siteName: "Mundo Mascotas",
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 600,
          alt: `Foto de ${petName}, ${breedName}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [primaryImage],
    },
  };
}

export default async function LostPetDetail({ params }: LostPetDetailProps) {
  const { id } = params; // `params` es un objeto, no una promesa.
  const mascota = await getMascota(id);

  if (!mascota) {
    notFound();
  }

  const unidadEdad = mascota.ageUnit === "YEARS" ? "años" : "meses";
  const fechaInicialPerdida = mascota.lostDate;
  const formatoDeseado = "dd 'de' MMMM, yyyy";
  const fechaFormateada = fechaInicialPerdida
    ? format(fechaInicialPerdida, formatoDeseado, {
        locale: es,
      })
    : "Fecha no especificada";

  return (
    <div className="relative">
      <Topbar petId={id} title={mascota.name} showBackBtn showOptionsBtn />

      <FavoriteButton isFavorite={mascota.isFavorite as boolean} />
      <PetDetailSlider images={mascota.images} />
      {/* Detalles de la mascota */}
      <div className="mx-4 mb-5 -mt-6 z-10 relative bg-white p-6 rounded-xl shadow-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <Title classes="text-4xl">{mascota.name}</Title>
          {mascota.gender === Gender.MALE && (
            <IoIosMale className="text-2xl text-blue-500 stroke-16 -mb-1" />
          )}

          {mascota.gender === Gender.FEMALE && (
            <IoIosFemale className="text-2xl -mb-3 text-pink-600 stroke-16" />
          )}

          {mascota.gender === Gender.UNKNOWN && (
            <IoScanCircle className="text-2xl -mb-3 text-pink-600 stroke-16" />
          )}
        </div>
        <div className="flex gap-2 items-center mb-2">
          <FaRegCalendar className="text-xl text-[var(--rojizo)]" />
          <span className="-mb-1 text-gray-500 text-sm">
            Perdido en fecha{" "}
            <span className="text-gray-800 font-medium">{fechaFormateada}</span>
          </span>
        </div>
        <div className="flex gap-2 items-center mb-6">
          <MdPlace className="text-xl text-[var(--rojizo)]" />
          <span className="-mb-1 text-gray-500 text-sm">
            Perdido en{" "}
            <span className="text-gray-800 font-medium">
              {mascota?.lostLocationDetails}
            </span>
          </span>
        </div>
        {mascota.rewardAmount !== 0 && (
          <div className="flex flex-col text-[var(--rojizo)] text-xl justify-center items-center mb-6 p-3 rounded-md bg-amber-100">
            <p className="flex items-center gap-3 justify-center">
              <FaMoneyBillWave className="text-2xl -mb-1" /> Recompensa
              {/* <GiTakeMyMoney className="text-5xl" /> Recompensa */}
            </p>
            <p className="font-bold text-2xl">{mascota.rewardAmount} Bs</p>
          </div>
        )}

        <div className="flex mb-6 gap-3 text-sm ">
          <div className="p-2 flex-1 bg-gray-50 rounded-xl place-content-center  text-center shadow-sm">
            <MdPets className="w-full text-3xl text-green-500 mb-2" />
            <div className="text-gray-400 text-xs">Raza</div>
            {mascota.breedName}
          </div>
          <div className="p-2 flex-1 bg-gray-50 rounded-xl place-content-center  text-center shadow-sm">
            <MdCake className="w-full text-3xl text-blue-500 mb-2" />
            <div className="text-gray-400 text-xs">Edad</div>
            {mascota.age} {unidadEdad}
          </div>
          <div className="p-2 flex-1 bg-gray-50 rounded-xl  place-content-center text-center shadow-sm">
            <FaPalette className="w-full text-2xl text-orange-500 mb-2" />
            <div className="text-gray-400 text-xs">Color</div>
            {mascota.color}
          </div>
        </div>
        <p className="text-gray-600 mb-4 balance">{mascota.description}</p>
      </div>

      {/* Mapa de avistamientos */}
      <Suspense fallback={<AvistamientoSkeleton />}>
        <AvistamientosSection petId={id} />
      </Suspense>

      {/* Botones de accion */}
      <div className="px-6 py-8 flex justify-between gap-4 ">
        <ContactButton
          phone={mascota.owner?.phone ?? ""}
          ownwerName={mascota.owner?.name ?? "el dueño"}
          petName={mascota.name}
        />
        <Link href={`/pet/sighting/${id}`} className="flex-1">
          <Button
            icon={<RiMapPinAddFill className="text-2xl" />}
            className="bg-white text-[var(--rojizo)]"
            text="Reportar"
            type="button"
          />
        </Link>
      </div>
    </div>
  );
}
