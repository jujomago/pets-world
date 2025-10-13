import React from "react";

interface FilterPillProps {
  text: string;
  icon?: React.ReactNode;
  onSelectFilter?: (filterValue: string) => void;
  isActive?: boolean;
}

export const FilterPill = ({
  text,
  icon,
  onSelectFilter,
  isActive,
}: FilterPillProps) => {
  return (
    <div
      className={`${
        isActive ? "bg-orange-600 text-white" : " bg-white"
      } flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-1 shadow-xs shadow-black/20
      transition hover:bg-orange-400 hover:text-white
      `}
      onClick={() => onSelectFilter && onSelectFilter(text)}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};
