"use client";

import {
  updateUserPreferences,
  updateUserNotificationStatus,
  UserPreferences,
} from "@/actions/users";
import { Button, Input, ToggleButton } from "@/components";
import { LoaderIcon } from "@/components/LoaderIcon/LoaderIcon";
import { UserFormPreferences } from "@/interfaces";
import { signOut } from "next-auth/react";

import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSave, FaWhatsapp } from "react-icons/fa";

import { IoLogOut } from "react-icons/io5";
import OneSignal from "react-onesignal";

export const ProfileForm = ({
  phone,
  acceptNotifications: an,
}: UserPreferences) => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [notificationChecked, setNotificationChecked] = useState(an);
  const [notificiationLoading, setNotificationLoading] = useState(false);

  const form = useForm<UserFormPreferences>({
    defaultValues: {
      phones: phone,
    },
  });

  async function saveNotificationPersmission(permissionFlag: boolean) {
    setNotificationChecked(permissionFlag);
    setNotificationLoading(true);
    try {
      const isPushEnabled = OneSignal.User.PushSubscription.optedIn;

      // Caso 1: El usuario quiere "Si" y NO está suscrito
      if (permissionFlag && !isPushEnabled) {
        console.log("Intentando suscribir...");

        const subscriptionPromise = OneSignal.User.PushSubscription.optIn();

        await Promise.race([
          subscriptionPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("⏰ Timeout exceeded")), 10000)
          ),
        ]);

        // ¡Importante! Verificamos el estado de nuevo
        const finalState = OneSignal.User.PushSubscription.optedIn;
        if (!finalState) {
          // El usuario hizo clic en "Bloquear"
          console.log("El usuario bloqueó las notificaciones.");
          // data.acceptNotifications = "no";
          setNotificationChecked(false); // Revertir el estado visual

          toast.error("Has bloqueado las notificaciones en tu navegador.");
        } else {
          console.log("¡Usuario suscrito con éxito!");
          // 1. Primero, intentamos guardar el estado en la base de datos.
          const dbResult = await updateUserNotificationStatus(true);

          if (dbResult.success) {
            // 2. Solo si la BD se actualizó, añadimos el tag en OneSignal.
            OneSignal.User.addTag("accepts_notifications", "true");
            toast.success("¡Te has suscrito a las notificaciones!", {
              duration: 5000,
            });
          } else {
            // Si la BD falla, revertimos el estado y mostramos un error.
            toast.error(
              "No se pudo guardar tu subscripcion. Inténtalo de nuevo."
            );
            setNotificationChecked(false); // Revertir estado visual
          }
        }
      }
      // Caso 2: El usuario quiere "No" y SÍ está suscrito
      else if (!permissionFlag && isPushEnabled) {
        // 1. Primero, intentamos guardar el estado en la base de datos.
        const dbResult = await updateUserNotificationStatus(false);

        if (dbResult.success) {
          // 2. Solo si la BD se actualizó, nos desuscribimos de OneSignal.
          await OneSignal.User.PushSubscription.optOut();
          OneSignal.User.addTag("accepts_notifications", "false"); // Aseguramos el tag
          toast.success("Te has desuscrito de las notificaciones.", {
            duration: 5000,
          });
        } else {
          toast.error("No se pudo guardar tu preferencia. Inténtalo de nuevo.");
          setNotificationChecked(true); // Revertir estado visual
        }
      }
    } catch (e) {
      console.error("Error durante el proceso de onesignal notification:", e);
      toast.error("Error al procesar la solicitud de notificación.");
      setNotificationChecked(!permissionFlag);
    } finally {
      setNotificationLoading(false);
    }
  }

  async function onSubmit(data: UserFormPreferences) {
    console.log("Formulario enviado. Datos:", data);

    startTransition(async () => {
      try {
        const res = await updateUserPreferences(data);
        if (res?.sucess) {
          toast.success("Preferencias guardadas", {
            duration: 5000,
          });
        } else {
          toast.error("Error al guardar las preferencias");
        }
      } catch (e) {
        console.error("Error durante el proceso de guardado:", e);
      }
    });
  }

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <div className="bg-white  shadow-md shadow-gray-200 p-7 rounded-lg w-full mb-10">
        <h3 className="text-lg font-semibold border-b pb-2 w-full border-gray-300 mb-6 flex gap-2 items-center">
          <span>Preferencias</span>
          {notificiationLoading && <LoaderIcon />}
        </h3>

        <div className="space-y-5">
          <div className="flex gap-2 items-center">
            <span className="text-balance">
              Notificaciones &quot;Push&quot; de nuevas mascotas perdidas{" "}
            </span>
            <div className="w-20">
              <ToggleButton
                size="sm"
                showLabel
                color="orange"
                defaultChecked={notificationChecked}
                onChange={(val) => saveNotificationPersmission(val)}
                disabled={notificiationLoading}
              />
            </div>
          </div>
          <div>
            <form
              id="userForm"
              className="w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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
                    label="Telefono de contacto"
                    prefixIcon={<FaWhatsapp />}
                    type="number"
                    error={form.formState.errors.phones?.message}
                    readonly={isPending}
                  />
                )}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 ">
        <Button
          text="Guardar"
          icon={<FaSave className="text-2xl" />}
          loading={isPending}
          disabled={notificiationLoading}
          type="submit"
          form="userForm"
        />
        <Button
          onClick={handleSignOut}
          text="Cerrar Sessión"
          icon={<IoLogOut className="text-3xl" />}
          className="bg-gray-600"
          type="button"
          disabled={loading || isPending || notificiationLoading}
        />
      </div>
    </div>
  );
};
