"use client";

import { getCloudinarySignature } from "@/actions/cloudinary-actions";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import dynamic from "next/dynamic";

import { Breed, Species, ReportFormPet } from "@/interfaces";

import { FaPaperPlane } from "react-icons/fa";

import {
  Input,
  Select,
  Textarea,
  RadioGroup,
  ImageUploader,
  ActionDiv,
} from "@/components";

import { createAvistamiento } from "@/actions/masctotas-mutations";

import { RiLoader5Fill } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { MdPinDrop } from "react-icons/md";
import { reverseLocation } from "@/utils/reverseLocation";

//type PetFormValues = z.infer<typeof petSchema>;

const DynamicMap = dynamic(
  () => import("@/components/map/Map").then((mod) => ({ default: mod.Map })),
  {
    loading: () => <p>Loading map...</p>,
    ssr: !!false,
  }
);

interface ReportFormProps {
  petId: string;
  petName: string;
}

export const ReportForm = ({ petId, petName }: ReportFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [changingLocationName, setChangingLocationName] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormPet>({
    defaultValues: {
      sightingDate: formattedDate,
      locationDetails: "",
      details: "",
      image: "",
    },
  });

  const debouncedPosition = useDebounce(mapPosition, 1500); // 1 segundo de debounce

  const handleMapPositionChange = useCallback(
    (newPosition: [number, number]) => {
      setMapPosition(newPosition);
      setChangingLocationName(true);
      // No es necesario agregar setMapPosition a las dependencias porque
      // la función setter del estado garantizada por React es estable.
    },
    []
  );

  useEffect(() => {
    console.log("debouncedPosition:", debouncedPosition);
    if (debouncedPosition) {
      const fetchLocationName = async () => {
        const locationName = await reverseLocation(debouncedPosition);
        if (locationName) {
          setChangingLocationName(false);
          setValue(
            "locationDetails",
            locationName.split(",").slice(0, 2).join(","),
            {
              shouldValidate: true,
            }
          );
        }
      };
      fetchLocationName();
    }
  }, [debouncedPosition, setValue]);

  // Para depurar errores del formulario de forma controlada
  useEffect(() => {
    // Este log solo se ejecutará cuando el objeto 'errors' cambie.
    if (Object.keys(errors).length > 0)
      console.log("Errores del formulario:", errors);
  }, [errors]);

  // Esta función se ejecutará SOLO si la validación es exitosa.
  const onFormSubmit = async (data: ReportFormPet) => {
    console.log("image:", imageFiles);
    console.log(data);
    startTransition(async () => {
      try {
        const { timestamp, signature, error } = await getCloudinarySignature();

        if (error || !signature || !timestamp) {
          throw new Error(
            error || "No se pudo obtener la firma para subir imágenes."
          );
        }

        let uploadedImageUrl: string | undefined = undefined;

        // 2. Subir la imagen si existe
        if (imageFiles.length > 0) {
          const file = imageFiles[0];
          const uploadFormData = new FormData();
          uploadFormData.append("file", file);
          uploadFormData.append(
            "api_key",
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
          );
          uploadFormData.append("signature", signature);
          uploadFormData.append("timestamp", String(timestamp));
          uploadFormData.append("folder", "mascotas-perdidas");
          uploadFormData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
          );
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env
              .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
            { method: "POST", body: uploadFormData }
          );

          const result = await response.json();
          if (result.error) {
            throw new Error(
              `Error al subir la imagen: ${result.error.message}`
            );
          }
          uploadedImageUrl = result.secure_url;
        }

        // 3. Preparar el objeto de datos para la acción `createPet`.
        //    Ya no usamos FormData. `data` ya tiene la mayoría de los campos.
        const sightingData: ReportFormPet = {
          ...data,
          lat: mapPosition![0],
          lng: mapPosition![1],
          image: uploadedImageUrl,
          petId: petId,
        };

        // 4. Llamar a la acción `createPet` con las URLs de las imágenes
        const result = await createAvistamiento(sightingData);
        // TODO: Manejar el resultado (redirección o mensaje de error)
        if (result.success) {
          router.push(`/lostpet/${petId}`);
        }
      } catch (err) {
        console.error("Error en el proceso de anuncio:", err);
        // TODO: Mostrar un mensaje de error al usuario
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
      <Controller
        name="sightingDate"
        control={control}
        rules={{
          required: "Fecha de perdida es requerido",
          validate: {
            isNotFuture: (value) => {
              const today = new Date().toISOString().split("T")[0];
              return value <= today || "La fecha no puede ser futura";
            },
          },
        }}
        render={({ field }) => (
          <Input
            field={field}
            readonly={isPending}
            prefixIcon={<BiCalendar />}
            label={`Cuando vio a ${petName} ?`}
            type="date"
            error={errors.sightingDate?.message}
          />
        )}
      />

      <Controller
        name="locationDetails"
        control={control}
        rules={{ required: "location es requerido" }}
        render={({ field }) => (
          <Input
            prefixIcon={<MdPinDrop />}
            field={field}
            label="Donde lo vio? (seleccione en el mapa)"
            placeholder="Ej: Cerca del parque Bolivar"
            error={errors.locationDetails?.message}
            loading={changingLocationName}
            readonly={isPending}
          />
        )}
      />

      <div className="h-50">
        <DynamicMap
          zoom={13}
          dragablePin={true}
          onPositionChange={handleMapPositionChange}
        />
      </div>
      <ImageUploader
        id="images"
        name="image"
        label="Tomo alguna foto?"
        maxFiles={1}
        onFileSelect={setImageFiles}
        compact
      />
      <Controller
        name="details"
        control={control}
        rules={{ required: "Descripcion es requerido" }}
        render={({ field }) => (
          <Textarea
            field={field}
            label="Describa como paso"
            placeholder="Estaba caminando por la plaza.."
            error={errors.details?.message}
            readonly={isPending}
          />
        )}
      />
      <hr className="my-6 border-gray-200" />
      <ActionDiv
        text={isPending ? "Creando avistamiento..." : "Reportar avistamiento"}
        icon={
          isPending ? (
            <RiLoader5Fill className="animate-spin text-3xl" />
          ) : (
            <FaPaperPlane />
          )
        }
        classes={`w-full text-white ${
          isPending
            ? "bg-gray-400 border-transparent"
            : "bg-rojillo border-rojillo"
        }`}
        type="submit"
        disabled={isPending}
      />
    </form>
  );
};
