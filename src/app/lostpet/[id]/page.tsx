import { getMascota } from "@/actions/mascotas";
import { FaRegCalendar } from "react-icons/fa6";
import {
  MdCake,
  MdContactPhone,
  MdFavorite,
  MdFavoriteBorder,
  MdPets,
  MdPlace,
} from "react-icons/md";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import {
  PetDetailSlider,
  Title,
  Topbar,
  ActionDiv,
  PageWithTitle,
} from "@/components";
import { FaMoneyBillWave, FaPalette } from "react-icons/fa";
import { RiMapPinAddFill } from "react-icons/ri";
import AvistamientosSection from "@/components/sections/AvistamientosSection";
import { Suspense } from "react";
import { AvistamientoSkeleton } from "@/components/skeletons/AvistamientosSkeleton";
import Link from "next/link";
// import { Metadata } from "next";
import { Gender } from "@prisma/client";
import { IoScanCircle } from "react-icons/io5";
import { FavoriteButton } from "@/components/Favorite/FavoriteButton";

interface LostPetDetailProps {
  params: {
    id: string;
  };
}

/* export async function generateMetadata({
  params,
}: LostPetDetailProps): Promise<Metadata> {
  const { id } = await params;

  const mascota = (await getMascota(id)) || null;

  const petName = mascota?.name || "Mascota Desconocida";
  const lostLocation = mascota?.lostLocationDetails || "Lugar no especificado";
  //const petType = mascota?.species?.name || "Animal";

  return {
    //title: `${petName} | ${petType} Perdido en ${lostLocation}`, // Título dinámico
    // description: `Detalles completos sobre la mascota ${petName}, ${petType} perdido en ${lostLocation}. ¡Ayuda a encontrarlo Reportando!`, // Descripción dinámica
    // ... otros metadatos como Open Graph o Twitter
  };
} */

export default async function LostPetDetail({ params }: LostPetDetailProps) {
  const { id } = await params;

  const mascota = await getMascota(id);
  if (!mascota) return;
  // console.log(mascota);

  return (
    <PageWithTitle title={mascota.name} className="relative">
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
            <strong className="text-gray-800">
              {mascota.lostDate?.toDateString()}
            </strong>
          </span>
        </div>
        <div className="flex gap-2 items-center mb-6">
          <MdPlace className="text-xl text-[var(--rojizo)]" />
          <span className="-mb-1 text-gray-500 text-sm">
            Perdido en{" "}
            <strong className="text-gray-800">
              {mascota?.lostLocationDetails}
            </strong>{" "}
          </span>
        </div>

        <div className="flex flex-col text-[var(--rojizo)] text-xl justify-center items-center mb-6 p-3 rounded-md bg-amber-100">
          <p className="flex items-center gap-3 justify-center">
            <FaMoneyBillWave className="text-2xl -mb-1" /> Recompensa
            {/* <GiTakeMyMoney className="text-5xl" /> Recompensa */}
          </p>
          <p className="font-bold text-2xl">{mascota.rewardAmount} Bs</p>
        </div>

        <div className="flex mb-6 gap-3 text-sm">
          <div className="p-2 flex-1 bg-gray-50 rounded-xl   text-center shadow-sm">
            <MdPets className="w-full text-3xl text-green-500 mb-2" />
            <div className="text-gray-400 text-xs">Raza</div>
            <strong>{mascota.breedName}</strong>
          </div>
          <div className="p-2 flex-1 bg-gray-50 rounded-xl  text-center shadow-sm">
            <MdCake className="w-full text-3xl text-blue-500 mb-2" />
            <div className="text-gray-400 text-xs">Edad</div>
            <strong>{mascota.age} anios</strong>
          </div>
          <div className="p-2 flex-1 bg-gray-50 rounded-xl text-center shadow-sm">
            <FaPalette className="w-full text-2xl text-orange-500 mb-2" />
            <div className="text-gray-400 text-xs">Color</div>
            <strong>{mascota.color}</strong>
          </div>
        </div>
        <p className="text-gray-600 mb-4 balance">{mascota.description}</p>
      </div>

      {/* Mapa de avistamientos */}
      <Suspense fallback={<AvistamientoSkeleton />}>
        <AvistamientosSection petId={id} />
      </Suspense>

      {/* Botones de accion */}
      <div className="mx-5 mt-6 flex justify-between gap-4 ">
        <ActionDiv
          icon={<MdContactPhone className="text-2xl" />}
          classes="text-white bg-[var(--rojizo)] border-[var(--rojizo)] flex-1"
          text="Contactar"
        />
        <Link href={`/reportar/${id}`} className="flex-1">
          <ActionDiv
            icon={<RiMapPinAddFill className="text-2xl" />}
            classes="bg-white text-[var(--rojizo)] border-[var(--rojizo)]"
            text="Reportar"
          />
        </Link>
      </div>
    </PageWithTitle>
  );
}
