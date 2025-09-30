"use client";

import { useTopbarStore } from "@/store/Topbar";
import { useEffect } from "react";

export const TitleUpdater = ({ title }: { title: string }) => {
  const setTitle = useTopbarStore((state) => state.setTitle);

  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [setTitle, title]);

  return null;
};
