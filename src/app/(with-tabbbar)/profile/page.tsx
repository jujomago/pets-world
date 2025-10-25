import { Topbar } from "@/components";
import { getServerSession, Session } from "next-auth";
import Image from "next/image";
import React from "react";
import { ProfileForm } from "./components/profileForm";

export default async function ProfilePage() {
  const session = (await getServerSession()) as Session;
  /*   console.log(session);
  if (!session?.user?.email) {
    redirect("/login");
  } */

  return (
    <>
      <Topbar title="Perfil" />
      <div className="bg-white py-6 px-5 flex flex-col items-center min-h-[calc(100vh-60px)]">
        <Image
          src={session?.user?.image ?? "/images/default-avatar.png"}
          alt={session?.user?.name ?? "Avatar de usuario"}
          width={96}
          height={96}
          className="rounded-full mb-4 border-4 border-amber-400"
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {session?.user?.name}
        </h2>
        <p className="text-gray-500 mb-8">{session?.user?.email}</p>
        <ProfileForm session={session} />
      </div>
    </>
  );
}
