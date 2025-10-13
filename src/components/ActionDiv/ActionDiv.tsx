import React from "react";

interface ActionButtonProps {
  icon?: React.ReactNode;
  text?: string;
  classes?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export const ActionDiv = ({
  icon,
  text,
  classes,
  onClick,
  disabled,
  type = "submit",
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`button-mobile border-2 flex items-center justify-center p-4 gap-2 rounded-md font-bold shadow-lg ${classes} ${
        disabled ? "cursor-not-allowed" : ""
      } `}
    >
      {icon}
      {text}
    </button>
  );
};
