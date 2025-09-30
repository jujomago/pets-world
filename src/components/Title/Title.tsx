import { cherryBombOne } from "@/fonts/fonts";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  classes?: string; // Propiedad opcional
}

export const Title = ({ children, classes }: TitleProps) => {
  return (
    <h2
      className={`text-3xl text-gray-900 tracking-wide ${cherryBombOne.className} ${classes}`}
    >
      {children}
    </h2>
  );
};
