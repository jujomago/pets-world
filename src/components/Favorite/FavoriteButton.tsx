"use client";
import { toggleFavorite } from "@/actions/favorites";
import { cn } from "@/utils/cn";
import { useParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
interface favoriteButttonProps {
  isFavorite: boolean;
  userId?: string; // ID del usuario autenticado
}

export const FavoriteButton = ({ isFavorite }: favoriteButttonProps) => {
  //   const isFavorite = false;
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [favorite, setFavorite] = useState(isFavorite);

  const toggleFavoriteHandler = () => {
    startTransition(async () => {
      const result = await toggleFavorite(params.id as string);

      if (result.success) {
        setFavorite(result.isFavorite);
        toast.success("Se ha agregado a favoritos");
      } else {
        toast.error("Ocurrio un error al agregar a Favoritos");
        console.error(result.error);
      }
    });
  };

  return (
    <button
      className={cn(
        "button-mobile absolute right-5 text-red-500 text-3xl top-20 z-10",
        {
          "opacity-50": isPending,
        }
      )}
      onClick={toggleFavoriteHandler}
      disabled={isPending}
    >
      {isPending ? (
        <div className="animate-pulse">
          <MdFavorite />
        </div>
      ) : favorite ? (
        <MdFavorite />
      ) : (
        <MdFavoriteBorder />
      )}
    </button>
  );
};
