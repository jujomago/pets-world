import React from "react";
interface ActionButtonProps {
  icon?: React.ReactNode;
  text?: string;
  classes?: string;
}

export const ActionDiv = ({ icon, text, classes }: ActionButtonProps) => {
  return (
    <div
      className={`button-mobile border-2 flex items-center justify-center p-4 gap-2 rounded-md font-bold shadow-lg ${classes}`}
    >
      {icon}
      {text}
    </div>
  );
};
