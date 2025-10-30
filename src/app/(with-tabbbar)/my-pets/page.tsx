import { Topbar } from "@/components";
import { getServerSession, Session } from "next-auth";
import Image from "next/image";
import React from "react";

import { getUserPets, getUserPreferences } from "@/actions/users";
import Link from "next/link";

export default async function MyPets() {
  const userPets = await getUserPets();

  console.log("userPets:", userPets);

  return (
    <>
      <Topbar title="My Pets" showBackBtn />
      <div className="p-6">
        <ol>
          {userPets?.map((up) => (
            <li className="bg-white" key={up.id}>
              <div>{up.name}</div> <div>{up.status}</div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
