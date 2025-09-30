import { TabBar, Topbar } from "@/components";
import { PageWithTitle } from "@/components/PageWithTitle/PageWithTitle";
import React from "react";

export default function ProfilePage() {
  return (
    <PageWithTitle title="Perfil">
      <div className="bg-white rounded-lg shadow-md p-6 m-6">
        perfil del usuario
      </div>
    </PageWithTitle>
  );
}
