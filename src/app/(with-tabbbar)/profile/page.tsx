import { Topbar } from "@/components";
import { getServerSession, Session } from "next-auth";
import Image from "next/image";
import React from "react";
import { ProfileForm } from "./components/profileForm";
import { getUserPreferences } from "@/actions/users";
import Link from "next/link";

export default async function ProfilePage() {
  const session = (await getServerSession()) as Session;
  const userPrefs = await getUserPreferences(session.user.email as string);

  console.log("server session:", session);

  return (
    <>
      <Topbar title="Perfil" showBackBtn />
      <div className="py-6 px-5 flex flex-col items-center min-h-[calc(100vh-140px)]">
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
        {userPrefs && <ProfileForm {...userPrefs} />}
        <Link
          href="/my-pets"
          className="button-mobile p-2 m-3 bg-amber-500 text-white"
        >
          Administrar mis Mascotas
        </Link>
      </div>
    </>
  );
}
