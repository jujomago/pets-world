import React from "react";
import { PiSmileySad } from "react-icons/pi";

interface EmptySectionProps {
  classes?: string;
  text?: string;
}

export const EmptySection = ({ classes, text }: EmptySectionProps) => {
  return (
    <div
      className={`bg-white p-4 flex gap-3 font-bold rounded-md m-10 justify-center items-center ${classes}`}
    >
      {text || "Todavia no hay mascotas disponibles"}
      <PiSmileySad className="text-3xl stroke-2" />
    </div>
  );
};
