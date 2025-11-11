"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { getCloudinarySignature } from "@/actions";
import { Pet, RegisterFormPet } from "@/interfaces";
import { Coin } from "@prisma/client";

import { FaPaperPlane } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

import { Input, Select, Textarea, ImageUploader, Button } from "@/components";
import toast from "react-hot-toast";
import { ExistingImage } from "@/components/Forms/ui/ImageUploader";
import { updatePet } from "@/actions/users";

interface ActualizarFormProps {
  pet: Pet;
}

export const ActualizarForm = ({ pet }: ActualizarFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>(
    pet.images || []
  );
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormPet>({
    defaultValues: {
      description: pet.description || "",
      rewardAmount: pet.rewardAmount || 0,
      rewardCoin: (pet.rewardCoin as Coin) || "BOLIVIANOS",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Errores del formulario:", errors);
    }
  }, [errors]);

  const handleRemoveExistingImage = (imageId: string) => {
    console.log("deleting image:", imageId);
    toast.success("Imagen eliminada con éxito");
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    setImagesToDelete((prev) => [...prev, imageId]);
  };

  const onFormSubmit = async (data: RegisterFormPet) => {
    if (imageFiles.length === 0 && existingImages.length === 0) {
      toast.error("Por favor, selecciona al menos una imagen.");
      return;
    }

    startTransition(async () => {
      try {
        let uploadedImageUrls: string[] = [];
        if (imageFiles.length > 0) {
          const { timestamp, signature, error } =
            await getCloudinarySignature();
          if (error || !signature || !timestamp) {
            throw new Error(
              error || "No se pudo obtener la firma para subir imágenes."
            );
          }

          const uploadPromises = imageFiles.map(async (file) => {
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
            return result.secure_url;
          });
          uploadedImageUrls = await Promise.all(uploadPromises);
        }

        const result = await updatePet(
          pet.id,
          data,
          uploadedImageUrls,
          imagesToDelete
        );

        if (result.success) {
          toast.success("Anuncio actualizado con éxito");
          router.push("/my-pets");
        } else {
          toast.error(result.message || "Error al actualizar el anuncio");
        }
      } catch (err) {
        console.error("Error en el proceso de actualización:", err);
        toast.error("Error al actualizar el anuncio");
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
      <ImageUploader
        id="images"
        name="images"
        label="Imagenes de tu mascota"
        onFileSelect={setImageFiles}
        images={existingImages}
        onRemoveExistingImage={handleRemoveExistingImage}
        isSubmitting={isPending}
        maxFileSizeMB={10}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "Descripcion es requerido" }}
        render={({ field }) => (
          <Textarea
            field={field}
            label="Descripción y señas particulares"
            placeholder="Llevaba un collar rojo, es muy amigable..."
            error={errors.description?.message}
            readonly={isPending}
          />
        )}
      />

      <div className="grid grid-cols-3 gap-3">
        <Controller
          name="rewardAmount"
          control={control}
          rules={{
            min: { value: 0, message: "La recompensa mínima es 0 Bs" },
            max: { value: 2000, message: "La recompensa máxima es 2000 Bs" },
            validate: {
              isInteger: (value) =>
                Number.isInteger(Number(value)) || "Debe ser un número entero",
            },
          }}
          render={({ field }) => (
            <Input
              field={field}
              prefixIcon={<GiMoneyStack />}
              label="Recompensa (Opcional)"
              placeholder="500"
              error={errors.rewardAmount?.message}
              readonly={isPending}
              type="number"
              containerClasses="col-span-2"
            />
          )}
        />
        <Controller
          name="rewardCoin"
          control={control}
          disabled={isPending}
          render={({ field }) => (
            <Select
              field={field}
              label="Moneda"
              data={[
                { id: "BOLIVIANOS", name: "Bs" },
                { id: "DOLLARS", name: "$us" },
              ]}
              error={errors.rewardCoin?.message}
            />
          )}
        />
      </div>
      <hr className="my-6 border-gray-200" />
      <Button
        text={"Actualizar Anuncio"}
        disabled={isPending}
        loading={isPending}
        icon={<FaPaperPlane />}
      />
    </form>
  );
};
