"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import dynamic from "next/dynamic";
import {
  getEspecies,
  getRazasByEspecie,
  createPet,
  getCloudinarySignature,
} from "@/actions";
import { Breed, Species, RegisterFormPet } from "@/interfaces";
import { AgeUnit, Coin, Gender } from "@prisma/client";

import { FaPaperPlane } from "react-icons/fa";
import { MdCake, MdPinDrop } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
import { VscGroupByRefType, VscTypeHierarchySuper } from "react-icons/vsc";
import { IoMdColorPalette } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { RiLoader5Fill } from "react-icons/ri";

import {
  Input,
  Select,
  Textarea,
  RadioGroup,
  ImageUploader,
  ActionDiv,
} from "@/components";
import { genderOptions, reverseLocation, delay } from "@/utils";
import toast from "react-hot-toast";

//type PetFormValues = z.infer<typeof petSchema>;

const DynamicMap = dynamic(
  () => import("@/components/map/Map").then((mod) => ({ default: mod.Map })),
  {
    loading: () => <p>Loading map...</p>,
    ssr: !!false,
  }
);

export const AnunciarForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [changingLocationName, setChangingLocationName] = useState(false);
  const [species, setSpecies] = useState<Species[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormPet>({
    // Valores por defecto al cargar el formulario
    defaultValues: {
      name: "",
      age: "" as any,
      lostDate: formattedDate,
      color: "",
      speciesId: "",
      breedId: "",
      gender: Gender.UNKNOWN,
      description: "",
      lostLocationDetails: "",
      rewardAmount: 0,
      images: [],
      ageUnit: AgeUnit.MONTHS,
      rewardCoin: Coin.BOLIVIANOS,
    },
  });
  const selectedSpeciesId = watch("speciesId");

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
            "lostLocationDetails",
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

  useEffect(() => {
    const loadSpecies = async () => {
      const data = await getEspecies();
      setSpecies(data);
    };
    loadSpecies();
  }, []);

  useEffect(() => {
    const loadBreeds = async () => {
      if (selectedSpeciesId) {
        const data = await getRazasByEspecie(selectedSpeciesId);
        setBreeds(data);
      } else {
        setBreeds([]);
      }
    };
    loadBreeds();
  }, [selectedSpeciesId]);

  // Esta función se ejecutará SOLO si la validación es exitosa.
  const onFormSubmit = async (data: RegisterFormPet) => {
    if (imageFiles.length === 0) {
      // TODO: Mostrar un error más amigable al usuario
      console.error("Por favor, selecciona al menos una imagen.");
      return;
    }

    startTransition(async () => {
      try {
        // 1. Obtener la firma de Cloudinary desde nuestra Server Action
        const { timestamp, signature, error } = await getCloudinarySignature();

        if (error || !signature || !timestamp) {
          throw new Error(
            error || "No se pudo obtener la firma para subir imágenes."
          );
        }

        // 2. Subir cada imagen directamente a Cloudinary
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

        const uploadedImageUrls = await Promise.all(uploadPromises);

        // 3. Preparar el objeto de datos para la acción `createPet`.
        //    Ya no usamos FormData. `data` ya tiene la mayoría de los campos.
        const petData: RegisterFormPet = {
          ...data,
          lat: mapPosition![0],
          lng: mapPosition![1],
        };

        // 4. Llamar a la acción `createPet` con las URLs de las imágenes
        const result = await createPet(petData, uploadedImageUrls);
        // TODO: Manejar el resultado (redirección o mensaje de error)
        if (result.success) {
          toast.success("Anuncio creado con éxito");
          router.push("/");
        }
      } catch (err) {
        console.error("Error en el proceso de anuncio:", err);
        toast.error("Error al crear el anuncio");
        // TODO: Mostrar un mensaje de error al usuario
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="grid grid-cols-4 gap-3">
        <Controller
          name="name"
          control={control}
          rules={{ required: "El nombre es requerido." }}
          render={({ field }) => (
            <Input
              field={field}
              prefixIcon={<AiFillTag />}
              readonly={isPending}
              label="Nombre de la mascota"
              placeholder="Ej. Braulio"
              containerClasses="col-span-2"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          rules={{
            required: "Edad es requerido",
            min: { value: 1, message: "La edad minima es 1" },
            max: { value: 50, message: "La edad máxima es 50 años" },
            validate: {
              isInteger: (value) =>
                Number.isInteger(Number(value)) || "Debe ser un número entero",
            },
          }}
          render={({ field }) => (
            <Input
              field={field}
              prefixIcon={<MdCake />}
              label="Edad"
              readonly={isPending}
              placeholder="Ej: 3"
              containerClasses="col-span-1"
              error={errors.age?.message}
            />
          )}
        />

        <Controller
          name="ageUnit"
          control={control}
          render={({ field }) => (
            <Select
              field={field}
              label="Unidad"
              data={[
                { id: "YEARS", name: "Años" },
                { id: "MONTHS", name: "Meses" },
              ]}
              containerClasses="col-span-1"
              error={errors.ageUnit?.message}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Controller
          name="speciesId"
          control={control}
          rules={{ required: "Especie es requerido" }}
          render={({ field }) => (
            <Select
              field={field}
              data={species}
              label="Que especie es?"
              prefixIcon={<VscGroupByRefType />}
              error={errors.speciesId?.message}
            />
          )}
        />
        <Controller
          name="breedId"
          control={control}
          rules={{ required: "Raza es requerido" }}
          render={({ field }) => (
            <Select
              field={field}
              data={breeds}
              label="Que raza es?"
              prefixIcon={<VscTypeHierarchySuper />}
              error={errors.breedId?.message}
            />
          )}
        />
      </div>
      <Controller
        name="color"
        control={control}
        rules={{ required: "Color es requerido" }}
        render={({ field }) => (
          <Input
            field={field}
            readonly={isPending}
            prefixIcon={<IoMdColorPalette />}
            label="Color"
            placeholder="Ej: Marrón con manchas"
            error={errors.color?.message}
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        rules={{ required: "Genero es requerido" }}
        render={({ field }) => (
          <RadioGroup
            label="Género"
            options={genderOptions}
            field={field}
            error={errors.gender?.message}
          />
        )}
      />

      <ImageUploader
        id="images"
        name="images"
        label="Imagenes de tu mascota"
        onFileSelect={setImageFiles}
      />
      <hr className="my-6 border-gray-200" />
      <Controller
        name="lostDate"
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
            label="Fecha de pérdida"
            type="date"
            error={errors.lostDate?.message}
          />
        )}
      />
      <Controller
        name="lostLocationDetails"
        control={control}
        rules={{ required: "location es requerido" }}
        render={({ field }) => (
          <Input
            prefixIcon={<MdPinDrop />}
            field={field}
            label="Lugar donde se perdió"
            placeholder="Ej: Cerca del parque Bolivar"
            error={errors.lostLocationDetails?.message}
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

      <hr className="my-6 border-gray-200" />
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
            // required: "Recompensa es requerido",
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
          render={({ field }) => (
            <Select
              field={field}
              label="Moneda"
              data={[
                { id: "BOLIVIANOS", name: "Bs" },
                { id: "DOLLARS", name: "$us" },
              ]}
              error={errors.ageUnit?.message}
            />
          )}
        />
      </div>
      <hr className="my-6 border-gray-200" />
      <ActionDiv
        text={isPending ? "Publicando..." : "Publicar Anuncio"}
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
      {/*    <div className="bg-white z-30 grid place-items-center text-4xl absolute w-full h-2/4 top-1/5 left-0">
        ENVIANDO DATOS
      </div> */}
    </form>
  );
};
