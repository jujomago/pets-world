import { getMascota } from "@/actions/mascotas";
import { PetImage } from "@/components";
import { PrintButton } from "@/components/PrintButton/PrintButton";
import React from "react";
import QRCode from "react-qr-code";

interface LostPoster {
  params: {
    id: string;
  };
  phoneNumber1: string;
  phoneNumber2?: string;
}

export default async function LostPosterPage({
  params,
  phoneNumber1 = "223 232",
  phoneNumber2 = "2332 6456 543",
}: LostPoster) {
  const { id } = await params;

  const mascota = await getMascota(id);
  if (!mascota) return;
  const { name, description, rewardAmount, rewardCoin } = mascota;
  const petImage = mascota.images.find((img) => img.isPrimary);

  return (
    <div className="flex flex-col text-center min-h-screen relative overflow-hidden bg-amber-50 print:[print-color-adjust:exact] ">
      <div className="bg-rojillo h-[35%] w-[1500px] absolute -rotate-18  -translate-x-50 -translate-y-45 print:[print-color-adjust:exact] "></div>

      <div className="z-10 pt-2">
        <div className="flex items-center p-7 gap-6  justify-center mb-18">
          <h1 className="text-center text-7xl print:text-9xl font-extrabold text-white print:[print-color-adjust:exact] flex-4 [-webkit-text-stroke:_3px_black] ">
            SE BUSCA
          </h1>

          <QRCode
            value={`https://mundo-mascota-beta.vercel.app/pet/lost/${id}`}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            className="flex-1 border-6 border-white"
            // size={80}
            title="https://mundo-mascota-beta.vercel.app"
          />
        </div>
        <div className="mb-3 relative h-3/6">
          <h2 className="px-6 py-2 text-4xl font-bold bg-amber-300 w-fit print:[print-color-adjust:exact] text-red-700 rounded-xl absolute left-0 right-0 -top-10 mx-auto z-10">
            {name.toUpperCase()}
          </h2>

          <div className="mx-auto w-7/12 border-[10px] border-amber-300 print:[print-color-adjust:exact] shadow-md h-90 relative">
            <PetImage url={petImage?.url as string} alt={`Foto de ${name}`} />
            {/*             <Image
              src={petImage?.url as string}
              alt={`Foto de ${name}`}
              className="h-full w-full object-cover"
              loader={cloudinaryLoader}
              //   fill
              width={300}
              height={300}
              priority={true}
            /> */}
          </div>
        </div>

        {/* --- 3. Texto de Descripción --- */}
        <div className="p-8 mb-3">
          <p className="text-center text-xl print:text-2xl font-bold leading-tight text-gray-700 text-balance">
            {description}
          </p>
        </div>

        {/* --- 4. Banner "AYUDANOS COMPARTIENDO" --- */}

        {!!rewardAmount && (
          <div className="w-4/5 mx-auto bg-amber-300 p-4 print:[print-color-adjust:exact] border-6 border-dashed border-red-500 mb-8 rounded-xl">
            <p className="text-center text-3xl print:text-4xl font-bold text-black">
              RECOMPENSA : {rewardAmount} {rewardCoin}
            </p>
          </div>
        )}

        {/* --- 5. Información de Contacto --- */}
        <div className="py-8">
          <p className="text-center text-xl font-semibold text-red-500">
            SI LO ENCUENTRAS LLAMA AL:
          </p>
          <p className="text-center text-4xl print:text-6xl font-extrabold text-black tracking-tight">
            {phoneNumber1} {phoneNumber2 && ` - ${phoneNumber2}`}
          </p>
        </div>

        <PrintButton />
      </div>
    </div>
  );
}
