"use client";
import React from "react";

import { IoPrint } from "react-icons/io5";
import { Button } from "../Button/Button";

export const PrintButton = () => {
  return (
    <Button
      text="Imprimir"
      className="print:hidden mx-auto bg-amber-300 text-black mb-5 text-xl w-auto"
      type="button"
      icon={<IoPrint className="text-3xl" />}
      onClick={() => window.print()}
    />
  );
};
