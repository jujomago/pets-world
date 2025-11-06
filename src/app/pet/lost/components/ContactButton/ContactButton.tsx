"use client";
import { Button } from "@/components";
import React from "react";
import { MdContactPhone } from "react-icons/md";
interface ContactButtonProps {
  ownwerName: string;
  petName: string;
  phone: string;
}

export const ContactButton = ({
  ownwerName,
  petName,
  phone,
}: ContactButtonProps) => {
  const callWhatsapp = () => {
    const cleanPhone = phone.replace(/\D/g, "");

    const message = `Hola ${ownwerName}, me gustaría contactarte por que encontre a tu Mascota "${petName}"   `;
    const encodedMessage = encodeURIComponent(message);

    // Crear la URL de WhatsApp
    const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(url, "_blank");
  };

  return (
    <Button
      icon={<MdContactPhone className="text-2xl" />}
      className="flex-1"
      text="Contactar"
      type="button"
      onClick={callWhatsapp}
    />
  );
};
