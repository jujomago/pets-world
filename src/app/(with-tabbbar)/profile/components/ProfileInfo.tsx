"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
//TODO: candidato a borrar
export function ProfileInfo() {
  const { data: session } = useSession();

  return (
    <>
      <Image
        src={session?.user?.image ?? "/images/default-avatar.png"}
        alt={session?.user?.name ?? "Avatar de usuario"}
        width={120}
        height={120}
        className="rounded-full mb-4 border-4 border-white-400 shadow-lg shadow-gray-300"
      />
      <h2 className="text-2xl font-bold text-gray-800">
        {session?.user?.name}
      </h2>
      <p className="text-gray-500 mb-8">{session?.user?.email}</p>
    </>
  );
}
