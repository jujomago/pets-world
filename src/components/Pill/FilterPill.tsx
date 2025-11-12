import { cn } from "@/utils/cn";
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
      className={cn(
        "flex cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-1 shadow-xs shadow-black/20 transition-colors duration-200 ease-in-out ",
        isActive
          ? "bg-orange-600 text-white hover:bg-orange-500"
          : "bg-white text-gray-700 hover:bg-orange-400"
      )}
      onClick={() => onSelectFilter && onSelectFilter(text)}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};
