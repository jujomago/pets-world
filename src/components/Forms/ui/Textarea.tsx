import { comicRelief } from "@/fonts/fonts";

import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface TextAreaProps<
  T extends FieldValues,
  TName extends Path<T> = Path<T>
> {
  prefixIcon?: React.ReactNode;
  label: string;
  placeholder?: string;
  error?: string;
  readonly?: boolean;
  // value?: string;
  // field?: ControllerRenderProps<RegisterFormPet, keyof RegisterFormPet>;
  field?: ControllerRenderProps<T, TName>;
}

const labelClass = `block text-gray-800 font-bold mb-1 ${comicRelief.className}`;

export const Textarea = <T extends FieldValues, TName extends Path<T>>({
  prefixIcon,
  label,
  placeholder,
  error,
  field,
  readonly = false,
}: TextAreaProps<T, TName>) => {
  const inputClass = `w-full px-3 py-2 [field-sizing:content]   ${
    prefixIcon ? "pl-10" : ""
  } border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${
    comicRelief.className
  } 
  ${readonly ? "cursor-not-allowed bg-gray-200/70" : "bg-gray-50"}
  `;

  return (
    <div className="relative">
      {prefixIcon && (
        <div className="absolute top-9 left-3 text-2xl text-gray-400 pointer-events-none">
          {prefixIcon}
        </div>
      )}
      <label htmlFor={field?.name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={field?.name}
        className={inputClass}
        placeholder={placeholder}
        rows={4}
        {...field}
      ></textarea>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
