"use client";

import { RadioGroup } from "@/components";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

interface ProfileFormProps {
  session: Session;
}

export const ProfileForm = ({ session }: ProfileFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores por defecto al cargar el formulario
  });

  console.log("llega session:", session);

  // const { status } = useSession();
  // console.log("status:", status);

  const handleSave = () => {
    // Aquí iría la lógica para guardar los datos en tu API/base de datos
    console.log("Guardando datos:", { name, phone, location });
    alert("Datos guardados (simulación)");
  };

  return (
    <>
      <h3 className="text-md font-semibold border-b pb-2 w-full text-gray-600 border-gray-300 mb-6 ">
        Preferencias
      </h3>

      {/* Aquí puedes agregar los campos editables */}

      <form className="w-full" onSubmit={handleSubmit(handleSave)}>
        <div className="mb-15">
          <Controller
            name="notificaciones"
            control={control}
            rules={{ required: "Genero es requerido" }}
            render={({ field }) => (
              <RadioGroup
                label="Notificarme si hay mascotas perdidas?"
                options={[
                  { label: "Si, siempre", value: "male" },
                  { label: "No, nunca ", value: "female" },
                ]}
                field={field}
                //   error={errors.gender?.message}
              />
            )}
          />
        </div>
        <div className="flex gap-6 justify-around">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-3 p-2 bg-rojillo text-white rounded-2xl shadow-md button-mobile font-semibold"
          >
            <FaSave /> <span>Guardar</span>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-gray-600 text-white rounded-2xl shadow-md font-semibold button-mobile"
          >
            <IoLogOut /> <span>Cerrar Sesión</span>
          </button>
        </div>
      </form>
    </>
  );
};
