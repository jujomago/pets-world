import { Topbar } from "@/components";

import React from "react";

import { getUserPets } from "@/actions/users";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { DeletePet } from "./[id]/components/DeletePet";
import { PetStatus } from "@prisma/client";

export default async function MyPets() {
  const userPets = await getUserPets();

  return (
    <>
      <Topbar title="My Pets" showBackBtn />
      <div className="mb-10 p-4 ">
        <table className="w-full shadow-md rounded-md overflow-hidden">
          <thead className="bg-amber-100 ">
            <tr>
              <th className="text-left p-3">Nombre</th>
              <th className="text-left">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userPets?.map((up) => (
              <tr className="bg-white" key={up.id}>
                <td className="py-4 px-3">{up.name}</td>
                <td
                  className={`py-4 px-3 font-semibold ${
                    PetStatus.LOST === up.status
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {up.status === PetStatus.LOST ? "Perdido" : "Encontrado"}
                </td>
                <td className="py-4 px-3 flex justify-center gap-3 items-center text-2xl h-14">
                  <Link href={`/my-pets/${up.id}`}>
                    <BiEdit className="button-mobile fill-blue-300" />
                  </Link>
                  <DeletePet petId={up.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
