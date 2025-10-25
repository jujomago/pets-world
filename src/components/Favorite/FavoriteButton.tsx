"use client";
import { toggleFavorite } from "@/actions/favorites";
import { useParams } from "next/navigation";
import React, { useState, useTransition } from "react";
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
      const result = await toggleFavorite(
        params.id as string,
        "950e8400-e29b-41d4-a716-446655440005" // TODO: cambiar por el user id
      );

      if (result.success) {
        setFavorite(result.isFavorite);
      } else {
        console.error(result.error);
      }
    });
  };

  return (
    <button
      className="button-mobile absolute right-5 text-red-500 text-3xl top-20 z-10"
      onClick={toggleFavoriteHandler}
      disabled={isPending}
    >
      {isPending ? (
        <div className="animate-pulse">
          <MdFavorite className="opacity-50" />
        </div>
      ) : favorite ? (
        <MdFavorite />
      ) : (
        <MdFavoriteBorder />
      )}
    </button>
  );
};
