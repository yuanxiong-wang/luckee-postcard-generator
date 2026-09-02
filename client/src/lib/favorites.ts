import type { PostcardComposition } from "./postcard-composition";
import {
  getHolidayById,
  isAppRegion,
  type AppRegion,
  type HolidayId,
} from "./holidays";
import {
  DEFAULT_POSTCARD_BACKGROUND,
  DEFAULT_POSTCARD_FONT,
  isPostcardBackgroundId,
  isPostcardFontId,
  type PostcardBackgroundId,
  type PostcardFontId,
} from "./postcard-styles";

export interface FavoritePostcard {
  id: string;
  timestamp: number;
  region: AppRegion;
  holidayId: HolidayId;
  greeting: string;
  backgroundStyle: PostcardBackgroundId;
  fontStyle: PostcardFontId;
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

function readHolidayId(value: unknown): HolidayId | undefined {
  if (typeof value === "string") {
    return getHolidayById(value)?.id;
  }

  if (value && typeof value === "object" && "id" in value) {
    const holidayId = (value as { id: unknown }).id;
    return typeof holidayId === "string" ? getHolidayById(holidayId)?.id : undefined;
  }

  return undefined;
}

function normalizeFavorite(value: unknown): FavoritePostcard | null {
  if (!value || typeof value !== "object") return null;

  const favorite = value as Record<string, unknown>;
  const regionValue = favorite.region === "both" ? "all" : favorite.region;
  if (typeof regionValue !== "string" || !isAppRegion(regionValue)) {
    return null;
  }

  const holidayId = readHolidayId(favorite.holidayId ?? favorite.holiday);
  if (
    typeof favorite.id !== "string" ||
    !holidayId ||
    typeof favorite.greeting !== "string" ||
    typeof favorite.timestamp !== "number"
  ) {
    return null;
  }

  const backgroundStyle =
    typeof favorite.backgroundStyle === "string" &&
    isPostcardBackgroundId(favorite.backgroundStyle)
      ? favorite.backgroundStyle
      : DEFAULT_POSTCARD_BACKGROUND;
  const fontStyle =
    typeof favorite.fontStyle === "string" && isPostcardFontId(favorite.fontStyle)
      ? favorite.fontStyle
      : DEFAULT_POSTCARD_FONT;

  return {
    id: favorite.id,
    timestamp: favorite.timestamp,
    region: regionValue,
    holidayId,
    greeting: favorite.greeting,
    backgroundStyle,
    fontStyle,
  };
}

export function isSameComposition(
  favorite: FavoritePostcard,
  composition: PostcardComposition
): boolean {
  return (
    favorite.holidayId === composition.holiday.id &&
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
      timestamp: Date.now(),
      region: composition.region,
      holidayId: composition.holiday.id,
      greeting: composition.greeting,
      backgroundStyle: composition.backgroundStyle,
      fontStyle: composition.fontStyle,
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
