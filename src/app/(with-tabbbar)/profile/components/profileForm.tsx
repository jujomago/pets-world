"use client";

import { updateUserPreferences, UserPreferences } from "@/actions/users";
import { Input, RadioGroup } from "@/components";
import { UserFormPreferences } from "@/interfaces";

import { signOut } from "next-auth/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

export const ProfileForm = ({
  id,
  name,
  email,
  phone,
  acceptNotifications: an,
}: UserPreferences) => {
  console.log("rerendering");
  const form = useForm<UserFormPreferences>({
    defaultValues: {
      acceptNotifications: an ? "si" : "no",
      phones: phone,
    },
  });

  // console.log("llega session:", session);

  // const { status } = useSession();
  // console.log("status:", status);

  /*   const handleSave = () => {
    // Aquí iría la lógica para guardar los datos en tu API/base de datos
    console.log("Guardando datos:", { name, phone, location });
    alert("Datos guardados (simulación)");
  }; */

  async function onSubmit(data: UserFormPreferences) {
    const res = await updateUserPreferences(data, email);
    console.log("res:", res);
    if (res?.sucess) {
      toast.success("Preferencias guardadas", {
        position: "top-center",
      });
    } else {
      toast.error("Error al guardar las preferencias");
    }
  }

  return (
    <>
      <h3 className="text-md font-semibold border-b pb-2 w-full text-gray-600 border-gray-300 mb-6 ">
        Preferencias
      </h3>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5 mb-8">
          <div>
            <Controller
              name="acceptNotifications"
              control={form.control}
              rules={{ required: "Genero es requerido" }}
              render={({ field }) => (
                <RadioGroup
                  label="Notificarme si hay mascotas perdidas?"
                  options={[
                    { label: "Si, siempre", value: "si" },
                    { label: "No, nunca ", value: "no" },
                  ]}
                  field={field}
                  //   error={errors.gender?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="phones"
              control={form.control}
              rules={{ required: "Genero es requerido" }}
              render={({ field }) => (
                <Input
                  field={field}
                  label="Celular ( comunicacion via whatsap)"
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-6 justify-around">
          <button
            type="submit"
            // onClick={handleSave}
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
