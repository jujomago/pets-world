import { Topbar } from "@/components";
import { getServerSession, Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { ProfileForm } from "./components/profileForm";
import { getUserPreferences, getUsersPetsCount } from "@/actions/users";
import { authOptions } from "@/lib/auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = (await getServerSession(authOptions)) as Session;
  const userPrefs = await getUserPreferences();
  const userPetsCount = await getUsersPetsCount();

  return (
    <>
      <Topbar title="Perfil" showBackBtn />
      <div className="py-6 px-8 flex flex-col items-center min-h-[calc(100vh-140px)]">
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
        {userPrefs && <ProfileForm {...userPrefs} />}

        {!!userPetsCount && (
          <Link
            href="/my-pets"
            className=" p-2 m-3 text-xl text-rojillo font-bold mt-8 hover:underline hover:text-blue-400"
          >
            Administrar mis Mascotas
          </Link>
        )}
      </div>
    </>
  );
}
