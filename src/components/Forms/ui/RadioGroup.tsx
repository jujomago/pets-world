import { comicRelief } from "@/fonts/fonts";
import { cn } from "@/utils/cn";

import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

// Definición de tipos
export interface RadioOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

interface RadioGroupProps<
  T extends FieldValues,
  TName extends Path<T> = Path<T>
> {
  label?: string;
  options: RadioOption[];
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
  optionClassName?: string;
  // field?: ControllerRenderProps<RegisterFormPet, keyof RegisterFormPet>;
  field?: ControllerRenderProps<T, TName>;
  readonly?: boolean;
}

export const RadioGroup = <T extends FieldValues, TName extends Path<T>>({
  label,
  options,
  error,
  labelClassName = `block font-bold text-gray-700 mb-2  ${comicRelief.className}`,
  containerClassName = `flex justify-around  ${comicRelief.className}`,
  optionClassName,
  field,
  readonly = false,
}: RadioGroupProps<T, TName>) => {
  const labelOptioClassNames = `flex button-mobile items-center gap-2 cursor-pointer  px-3 py-2 rounded-xl text-sm transition-colors`;
  return (
    <>
      {label && <label className={labelClassName}>{label}</label>}

      <div className={containerClassName}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(labelOptioClassNames, optionClassName, {
              "bg-orange-600 text-white font-bold":
                field?.value === option.value,
              "bg-gray-100": field?.value !== option.value,
            })}
          >
            <input
              type="radio"
              name={field?.name}
              value={option.value}
              checked={field?.value === option.value}
              onChange={(e) => field?.onChange(e.target.value)}
              onBlur={field?.onBlur}
              className="hidden"
              disabled={readonly}
            />
            {option.icon && (
              <span
                className={
                  readonly
                    ? "text-gray-500"
                    : field?.value === option.value
                    ? option.iconColor
                    : "text-gray-400"
                }
              >
                {option.icon}
              </span>
            )}
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};
