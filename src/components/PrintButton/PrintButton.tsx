"use client";
import React from "react";
import { ActionDiv } from "../ActionDiv/ActionDiv";
import { IoPrint } from "react-icons/io5";

export const PrintButton = () => {
  return (
    <ActionDiv
      text="Imprimir"
      classes="print:hidden mx-auto bg-amber-300 text-black mb-5 text-xl"
      type="button"
      icon={<IoPrint className="text-3xl" />}
      onClick={() => window.print()}
    />
  );
};
