import { comicRelief } from "@/fonts/fonts";

import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { RiLoader5Fill } from "react-icons/ri";
type InputType = "text" | "number" | "date";
interface InputProps<T extends FieldValues, TName extends Path<T> = Path<T>> {
  label: string;
  error?: string;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  type?: InputType;
  containerClasses?: string;
  loading?: boolean;
  readonly?: boolean;
  // value?: string;
  // field?:
  //   | ControllerRenderProps<RegisterFormPet, keyof RegisterFormPet>
  //   | ControllerRenderProps<ReportFormPet, keyof ReportFormPet>;
  field?: ControllerRenderProps<T, TName>;
}

const labelClass = `block text-gray-800 font-bold mb-1 ${comicRelief.className}`;

export const Input = <T extends FieldValues, TName extends Path<T>>({
  prefixIcon,
  label,
  placeholder = "",
  type = "text",
  containerClasses = "",
  error,
  field,
  loading = false,
  readonly = false,
}: InputProps<T, TName>) => {
  const inputClass = `w-full px-3 py-2 border border-gray-300  rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
    comicRelief.className
  }  ${prefixIcon ? "pl-9" : ""}  ${
    field?.disabled ? "cursor-not-allowed bg-gray-200/70" : "bg-gray-50"
  }`;

  return (
    <div className={`relative ${containerClasses}`}>
      {prefixIcon && !loading && (
        <div className="absolute top-9 left-2 text-2xl text-gray-400 pointer-events-none">
          {prefixIcon}
        </div>
      )}
      <label htmlFor={field?.name} className={labelClass}>
        {label}
      </label>
      {loading && (
        <div className="bg-amber-100 text-sm rounded-2xl px-3 py-2 animate-pulse flex gap-3 items-center">
          <RiLoader5Fill className="animate-spin-clockwise animate-duration-800 animate-iteration-count-infinite text-3xl" />
          Obteniendo el lugar
        </div>
      )}
      {!loading && (
        <input
          id={field?.name}
          className={inputClass}
          placeholder={placeholder}
          type={type}
          readOnly={readonly}
          step={type === "number" ? "1" : undefined}
          {...field}
          //value={inputValue}
          //onChange={(e) => setValue(e.target.value)}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
