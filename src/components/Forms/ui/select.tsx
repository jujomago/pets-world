import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { comicRelief } from "@/fonts/fonts";
import { RegisterFormPet } from "@/interfaces/Forms";
import { IoIosArrowDown } from "react-icons/io";

interface SelectProps {
  prefixIcon?: React.ReactNode;
  label?: string;
  error?: string;
  containerClasses?: string;
  data: Array<{ id: string; name: string }>;
  field?: ControllerRenderProps<RegisterFormPet, keyof RegisterFormPet>;
}

const labelClass = `block text-gray-800 font-bold mb-1 ${comicRelief.className}`;

export const Select = ({
  prefixIcon,
  label = "",
  data,
  containerClasses = "",
  error,
  field,
}: SelectProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      {prefixIcon && (
        <div className="absolute top-9 left-3 text-2xl text-gray-400 pointer-events-none z-10">
          {prefixIcon}
        </div>
      )}

      <label htmlFor={field?.name} className={labelClass}>
        {label}
      </label>

      {/* Custom Arrow Icon */}
      <div className="absolute top-10 right-3 text-xl text-gray-400 pointer-events-none z-10">
        <IoIosArrowDown />
      </div>

      <select
        id={field?.name}
        className={`w-full px-3 appearance-none py-2 border border-gray-300 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
          prefixIcon ? "pl-10" : ""
        } pr-8 ${comicRelief.className}`}
        {...field}
      >
        <option value="">-------</option>
        {data.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
