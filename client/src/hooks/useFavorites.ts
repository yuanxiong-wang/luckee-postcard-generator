import { useCallback, useEffect, useState } from "react";
import {
  getFavorites,
  isSameComposition,
  removeFavorite as removeStoredFavorite,
  saveFavorite,
} from "@/lib/favorites";
import type { FavoritePostcard } from "@/lib/favorites";
import type { PostcardComposition } from "@/lib/postcard-composition";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePostcard[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const addFavorite = useCallback(
    (composition: PostcardComposition): FavoritePostcard => {
      const favorite = saveFavorite(composition);
      setFavorites(getFavorites());
      return favorite;
    },
    []
  );

  const removeFavorite = useCallback((favoriteId: string) => {
    removeStoredFavorite(favoriteId);
    setFavorites(previous =>
      previous.filter(favorite => favorite.id !== favoriteId)
    );
  }, []);

  const getFavorite = useCallback(
    (composition: PostcardComposition) =>
      favorites.find(favorite => isSameComposition(favorite, composition)),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, getFavorite };
}
