'use client';

import { PageWithTitle } from "@/components";
import { GiTerror } from "react-icons/gi";

export default function ErrorPage() {
  return (
    <PageWithTitle title="500">
      <div className="m-10 p-10 grid place-items-center bg-white rounded-xl">
        <GiTerror className="text-5xl mb-5" />
        <h1 className="text-xl">Paso un error</h1>
      </div>
    </PageWithTitle>
  );
}
