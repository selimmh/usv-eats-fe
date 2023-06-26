import React from "react";
import { useFavorites } from "@/features/products/store";

export const Favorites = () => {
  const { favorites } = useFavorites();
  return (
    <div>
      {favorites.map((favorite) => (
        <div key={favorite}>{favorite}</div>
      ))}
    </div>
  );
};
