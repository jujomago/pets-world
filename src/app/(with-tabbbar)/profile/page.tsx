import { Topbar } from "@/components";
import Link from "next/link";
import { getUserPreferences, getUsersPetsCount } from "@/actions/users";
import { ProfileInfo } from "./components/ProfileInfo";
import { ProfileForm } from "./components/profileForm";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const revalidate = 0;

export default async function ProfilePage() {
  const userPrefs = await getUserPreferences();
  const userPetsCount = await getUsersPetsCount();

  console.log("===== userPrefs:");
  console.log(userPrefs);
  console.log("===== userPetsCount:");
  console.log(userPetsCount);

  return (
    <>
      <Topbar title="Perfil" showBackBtn />
      <div className="py-6 px-8 flex flex-col items-center min-h-[calc(100vh-140px)]">
        <ProfileInfo />
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
