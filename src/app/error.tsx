"use client";

import { Topbar } from "@/components";
import { GiTerror } from "react-icons/gi";

export default function ErrorPage() {
  return (
    <>
      <Topbar title="Ups!, algo salio mal" />
      <div className="m-10 p-10 grid place-items-center bg-white rounded-xl">
        <GiTerror className="text-5xl mb-5" />
        <h1 className="text-xl">Ups!, algo salio mal</h1>
      </div>
    </>
  );
}
