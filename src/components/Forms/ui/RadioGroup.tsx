import { comicRelief } from "@/fonts/fonts";
import { RegisterFormPet } from "@/interfaces/Forms";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

// Definición de tipos
export interface RadioOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
  optionClassName?: string;
  field?: ControllerRenderProps<RegisterFormPet, keyof RegisterFormPet>;
}

export const RadioGroup = ({
  label,
  options,
  error,
  labelClassName = `block font-bold text-gray-700 mb-2  ${comicRelief.className}`,
  containerClassName = `flex justify-around  ${comicRelief.className}`,
  optionClassName = `flex button-mobile items-center gap-2 cursor-pointer  px-3 py-2 rounded-xl text-sm transition-colors`,
  field,
}: RadioGroupProps) => {
  return (
    <div>
      {label && <label className={labelClassName}>{label}</label>}

      <div className={containerClassName}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${optionClassName} ${
              field?.value === option.value
                ? " bg-gray-500 text-white"
                : " bg-gray-100"
            } `}
          >
            <input
              type="radio"
              name={field?.name}
              value={option.value}
              checked={field?.value === option.value}
              onChange={(e) => field?.onChange(e.target.value)}
              onBlur={field?.onBlur}
              className="hidden"
            />
            {option.icon && (
              <span
                className={
                  field?.value === option.value
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
    </div>
  );
};
