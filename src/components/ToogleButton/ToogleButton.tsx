"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const colorClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

const sizeClasses = {
  sm: {
    container: "h-10 w-18",
    circle: "h-6 w-6",
    translateOn: "translate-x-9",
    translateOff: "translate-x-2",
    labelSize: "text-xs",
    labelLeft: "left-4",
    labelRight: "right-3",
  },
  md: {
    container: "h-14 w-28",
    circle: "h-10 w-10",
    translateOn: "translate-x-16",
    translateOff: "translate-x-2",
    labelSize: "text-sm",
    labelLeft: "left-4",
    labelRight: "right-3",
  },
};
interface ToogleButtonProps {
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  color?: keyof typeof colorClasses;
  showLabel?: boolean;
  disabled?: boolean;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export const ToggleButton = ({
  defaultChecked = false,
  onChange,
  color = "blue",
  showLabel = false,
  disabled = false,
  size = "md",
  className,
}: ToogleButtonProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const currentSize = sizeClasses[size];

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors duration-300 ease-in-out",
        currentSize.container,
        className,
        {
          [colorClasses[color]]: isChecked,
          "bg-gray-300": !isChecked,
          "opacity-50 cursor-not-allowed": disabled,
          "cursor-pointer": !disabled,
        }
      )}
      role="switch"
      aria-checked={isChecked}
    >
      {showLabel && (
        <span
          className={cn(
            "absolute font-bold transition-opacity duration-200",
            currentSize.labelSize,
            currentSize.labelLeft,
            { "opacity-100": isChecked, "opacity-0": !isChecked }
          )}
        >
          SI
        </span>
      )}

      <span
        className={cn(
          "inline-block transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out",
          currentSize.circle,
          isChecked ? currentSize.translateOn : currentSize.translateOff
        )}
      />

      {showLabel && (
        <span
          className={cn(
            "absolute font-bold text-gray-400 transition-opacity duration-200",
            currentSize.labelSize,
            currentSize.labelRight,
            { "opacity-0": isChecked, "opacity-100": !isChecked }
          )}
        >
          NO
        </span>
      )}
    </button>
  );
};
