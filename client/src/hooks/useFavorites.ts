/**
 * useFavorites Hook
 * 
 * Custom React hook for managing favorite postcards
 */

import { useState, useCallback, useEffect } from 'react';
import {
  FavoritePostcard,
  getFavorites,
  saveFavorite,
  removeFavorite,
  isFavorited,
  getFavoritesCount,
} from '@/lib/favorites';
import type { AppRegion } from '@/lib/holidays';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePostcard[]>([]);
  const [count, setCount] = useState(0);

  // Load favorites on mount
  useEffect(() => {
    const loadedFavorites = getFavorites();
    setFavorites(loadedFavorites);
    setCount(loadedFavorites.length);
  }, []);

  // Add favorite
  const addFavorite = useCallback(
    (
      holidayId: string,
      holidayName: string,
      greeting: string,
      decorElements: string[],
      region: AppRegion
    ): FavoritePostcard => {
      const newFavorite = saveFavorite(
        holidayId,
        holidayName,
        greeting,
        decorElements,
        region
      );
      
      setFavorites(prev => [newFavorite, ...prev]);
      setCount(prev => prev + 1);
      
      return newFavorite;
    },
    []
  );

  // Remove favorite
  const removeFav = useCallback((favoriteId: string) => {
    removeFavorite(favoriteId);
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
    setCount(prev => Math.max(0, prev - 1));
  }, []);

  // Check if postcard is favorited
  const checkIsFavorited = useCallback(
    (holidayId: string, greeting: string, decorElements: string[]): boolean => {
      return isFavorited(holidayId, greeting, decorElements);
    },
    []
  );

  return {
    favorites,
    count,
    addFavorite,
    removeFavorite: removeFav,
    isFavorited: checkIsFavorited,
  };
}
