"use client";

import { updateUserPreferences, UserPreferences } from "@/actions/users";
import { Button, Input, RadioGroup } from "@/components";
import { UserFormPreferences } from "@/interfaces";
import { signOut } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSave, FaWhatsapp } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import OneSignal from "react-onesignal";

export const ProfileForm = ({
  email,
  phone,
  acceptNotifications: an,
}: UserPreferences) => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const form = useForm<UserFormPreferences>({
    defaultValues: {
      acceptNotifications: an ? "si" : "no",
      phones: phone,
    },
  });

  console.log("issubmitting:", form.formState.isSubmitting);
  async function onSubmit(data: UserFormPreferences) {
    console.log("Formulario enviado. Datos:", data);
    startTransition(async () => {
      try {
        const isPushEnabled = OneSignal.User.PushSubscription.optedIn;

        // Caso 1: El usuario quiere "Si" y NO está suscrito
        if (data.acceptNotifications === "si" && !isPushEnabled) {
          console.log("Intentando suscribir...");

          const subscriptionPromise = OneSignal.User.PushSubscription.optIn();

          await Promise.race([
            subscriptionPromise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("⏰ Timeout exceeded")), 4000)
            ),
          ]);

          // ¡Importante! Verificamos el estado de nuevo
          const finalState = OneSignal.User.PushSubscription.optedIn;
          if (!finalState) {
            // El usuario hizo clic en "Bloquear"
            console.log("El usuario bloqueó las notificaciones.");
            data.acceptNotifications = "no";
            form.setValue("acceptNotifications", "no");
            toast.error("Has bloqueado las notificaciones en tu navegador.");
          } else {
            console.log("¡Usuario suscrito con éxito!");
          }
        }
        // Caso 2: El usuario quiere "No" y SÍ está suscrito
        else if (data.acceptNotifications === "no" && isPushEnabled) {
          console.log("Intentando desuscribir...");
          await OneSignal.User.PushSubscription.optOut();
          console.log("Usuario desuscrito.");
        }

        const res = await updateUserPreferences(data, email);

        if (res?.sucess) {
          toast.success("Preferencias guardadas", {
            position: "top-center",
            duration: 3000,
          });
        } else {
          toast.error("Error al guardar las preferencias");
        }
      } catch (e) {
        console.error("Error durante el proceso de guardado:", e);
        toast.error("Error al procesar la solicitud de notificación.");
      }
    });
  }

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-white  shadow-md shadow-gray-200 p-7 rounded-lg w-full mb-10">
          <h3 className="text-xl font-bold border-b pb-2 w-full border-gray-300 mb-6 ">
            Preferencias
          </h3>
          <div className="space-y-5">
            <div>
              <Controller
                name="acceptNotifications"
                control={form.control}
                rules={{ required: "Notificaciones es requerido" }}
                render={({ field }) => (
                  <RadioGroup
                    label="Notificarme si hay mascotas perdidas?"
                    options={[
                      { label: "Si, siempre", value: "si" },
                      { label: "No, nunca ", value: "no" },
                    ]}
                    field={field}
                    optionClassName="text-md"
                    readonly={isPending}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="phones"
                control={form.control}
                rules={{
                  required: "El numero de contacto es requerido",
                  pattern: {
                    value: /^[67]\d{7}$/,
                    message:
                      "Debe ser un número de celular válido de Bolivia (8 dígitos, empieza con 6 o 7).",
                  },
                }}
                render={({ field }) => (
                  <Input
                    field={field}
                    label="Celular (via WhatsApp)"
                    prefixIcon={<FaWhatsapp />}
                    type="number"
                    error={form.formState.errors.phones?.message}
                    readonly={isPending}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <Button
            text="Guardar"
            icon={<FaSave className="text-2xl" />}
            loading={isPending}
          />
          <Button
            onClick={handleSignOut}
            text="Cerrar Sessión"
            icon={<IoLogOut className="text-2xl" />}
            className="bg-gray-600"
            type="button"
            disabled={loading || isPending}
          />
        </div>
      </form>
    </>
  );
};
