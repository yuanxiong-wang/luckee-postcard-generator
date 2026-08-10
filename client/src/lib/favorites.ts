import type { PostcardComposition } from "./postcard-composition";
import { getHolidayById } from "./holidays";
import {
  DEFAULT_POSTCARD_BACKGROUND,
  DEFAULT_POSTCARD_FONT,
} from "./postcard-styles";

export interface FavoritePostcard extends PostcardComposition {
  id: string;
  timestamp: number;
}

const STORAGE_KEY = "luckee_favorites";
const MAX_FAVORITES = 20;

export function getFavorites(): FavoritePostcard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    return (JSON.parse(stored) as unknown[])
      .map(normalizeFavorite)
      .filter((favorite): favorite is FavoritePostcard => Boolean(favorite))
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
}

function normalizeFavorite(value: unknown): FavoritePostcard | null {
  if (!value || typeof value !== "object") return null;

  const favorite = value as Omit<Partial<FavoritePostcard>, "region"> & {
    holidayId?: string;
    region?: string;
  };
  const region = favorite.region === "both" ? "all" : favorite.region;
  if (
    region !== "all" &&
    region !== "US" &&
    region !== "UK" &&
    region !== "CA"
  ) {
    return null;
  }
  if (
    favorite.id &&
    favorite.holiday &&
    favorite.greeting &&
    favorite.backgroundStyle &&
    favorite.fontStyle &&
    favorite.timestamp
  ) {
    return { ...favorite, region } as FavoritePostcard;
  }

  const holiday = favorite.holidayId
    ? getHolidayById(favorite.holidayId)
    : undefined;
  if (!favorite.id || !holiday || !favorite.greeting || !favorite.timestamp) {
    return null;
  }

  return {
    id: favorite.id,
    timestamp: favorite.timestamp,
    region,
    holiday,
    greeting: favorite.greeting,
    backgroundStyle: DEFAULT_POSTCARD_BACKGROUND,
    fontStyle: DEFAULT_POSTCARD_FONT,
  };
}

export function isSameComposition(
  favorite: Pick<FavoritePostcard, keyof PostcardComposition>,
  composition: PostcardComposition
): boolean {
  return (
    favorite.holiday.id === composition.holiday.id &&
    favorite.greeting === composition.greeting &&
    favorite.region === composition.region &&
    favorite.backgroundStyle === composition.backgroundStyle &&
    favorite.fontStyle === composition.fontStyle
  );
}

export function saveFavorite(
  composition: PostcardComposition
): FavoritePostcard {
  try {
    const favorites = getFavorites();
    const existing = favorites.find(favorite =>
      isSameComposition(favorite, composition)
    );
    if (existing) return existing;

    const newFavorite: FavoritePostcard = {
      id: `fav_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      ...composition,
      timestamp: Date.now(),
    };
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newFavorite, ...favorites].slice(0, MAX_FAVORITES))
    );

    return newFavorite;
  } catch (error) {
    console.error("Error saving favorite:", error);
    throw error;
  }
}

export function removeFavorite(favoriteId: string): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        getFavorites().filter(favorite => favorite.id !== favoriteId)
      )
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
}
