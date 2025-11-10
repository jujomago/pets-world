import React from "react";
import { cn } from "@/utils/cn";
import { RiLoader5Fill } from "react-icons/ri";

interface ActionButtonProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export const Button = ({
  icon,
  text,
  className,
  onClick,
  disabled,
  loading,
  type = "submit",
}: ActionButtonProps) => {
  const buttonClasses = `w-full cursor-pointer button-mobile flex items-center justify-center p-4 gap-3 rounded-xl font-bold shadow-md bg-rojillo text-white text-lg`;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={cn(buttonClasses, className, {
        "cursor-not-allowed bg-gray-400": loading,
        "cursor-not-allowed bg-gray-200": disabled && !loading, // <-- Solo aplica si está disabled Y NO loading
      })}
    >
      {loading ? (
        <RiLoader5Fill className="animate-spin-clockwise animate-duration-800 animate-iteration-count-infinite text-3xl" />
      ) : (
        icon
      )}
      {loading ? "Procesando.." : text}
    </button>
  );
};
