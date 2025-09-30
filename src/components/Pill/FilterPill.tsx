import React from "react";

interface FilterPillProps {
  filterId: string;
  text: string;
  icon?: React.ReactNode;
  onHandleClick?: (filterId: string) => void;
  isActive?: boolean;
}

export const FilterPill = ({
  filterId,
  text,
  icon,
  onHandleClick,
  isActive,
}: FilterPillProps) => {
  return (
    <div
      className={`${
        isActive ? "bg-orange-600 text-white" : " bg-white"
      } cursor-pointer
        rounded-full flex items-center justify-center px-3 py-1 gap-2 shadow-xs shadow-black/20
        hover:bg-orange-400 hover:text-white transition
      `}
      onClick={() => onHandleClick && onHandleClick(filterId)}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};
