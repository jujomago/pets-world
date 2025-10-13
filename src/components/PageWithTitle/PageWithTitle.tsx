"use client";

import { useTopbarStore } from "@/store/Topbar";

import { useEffect, ReactNode } from "react";

interface PageWithTitleProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageWithTitle({
  title,
  children,
  className,
}: PageWithTitleProps) {
  const setTitle = useTopbarStore((state) => state.setTitle);

  useEffect(() => {
    setTitle(title);

    return () => setTitle(null);
  }, [setTitle, title]);

  return (
    <div className={`min-h-[calc(100vh-9.3rem)] ${className}`}>{children}</div>
  );
}
