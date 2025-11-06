"use client";
import { updatePetStatus } from "@/actions/users";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";

interface DeletePetProps {
  petId: string;
}

export const DeletePet = ({ petId }: DeletePetProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleConfirm = async () => {
    await updatePetStatus(petId, "FOUND");
    dialogRef.current?.close();
    toast.success("Mascota marcada como encontrada");
  };

  return (
    <>
      <FaCheck
        className="button-mobile fill-green-600"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      />
      <dialog
        ref={dialogRef}
        className="p-4 rounded-lg shadow-lg backdrop:bg-black/50 m-auto"
      >
        <h2 className="text-xl font-bold mb-4">Confirmar Acción</h2>
        <p className="text-sm">
          ¿Estás seguro de que quieres marcar esta mascota como
          &quot;&quot;ENCONTRADA&quot;
        </p>
        <div className="flex justify-end gap-4 mt-4 text-sm">
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </dialog>
    </>
  );
};
