import { cn } from "@/utils/cn";
import React from "react";
import { ImSpinner2 } from "react-icons/im";

interface LoaderIconProps {
  className?: string;
}

export const LoaderIcon = ({ className }: LoaderIconProps) => {
  return (
    <ImSpinner2
      className={cn(
        "animate-spin-clockwise animate-iteration-count-infinite text-2xl text-orange-500",
        className
      )}
    />
  );
};
