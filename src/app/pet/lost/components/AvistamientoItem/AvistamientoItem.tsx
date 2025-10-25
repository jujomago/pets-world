import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { LuMapPinned } from "react-icons/lu";
interface AvistamientoProps {
  lugar: string;
  fecha: string;
}

export const AvistamientoItem = ({ lugar, fecha }: AvistamientoProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex  items-center gap-2 justify-center">
        <LuMapPinned className="text-2xl text-[var(--rojizo)]" />
        <div>
          <div className="text-gray-800 text-sm font-bold">{lugar}</div>
          <div className="text-xs text-gray-500">{fecha}</div>
        </div>
      </div>
      <span>
        <FaCircleInfo className="button-mobile text-xl text-blue-200" />
      </span>
    </div>
  );
};
