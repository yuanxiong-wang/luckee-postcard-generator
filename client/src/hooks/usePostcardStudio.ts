import { useCallback, useState } from "react";
import { useFavorites } from "./useFavorites";
import {
  getCurrentOrNextHoliday,
  getHolidayById,
  getRandomGreeting,
  isAppRegion,
  type AppRegion,
  type Holiday,
} from "@/lib/holidays";
import type { FavoritePostcard } from "@/lib/favorites";
import type { PostcardComposition } from "@/lib/postcard-composition";
import {
  DEFAULT_POSTCARD_BACKGROUND,
  DEFAULT_POSTCARD_FONT,
  type PostcardBackgroundId,
  type PostcardFontId,
} from "@/lib/postcard-styles";

export type StudioPanel =
  | "none"
  | "calendar"
  | "favorites"
  | "message"
  | "download";

function createComposition(
  holiday: Holiday,
  region: AppRegion,
  styles?: Pick<PostcardComposition, "backgroundStyle" | "fontStyle">
): PostcardComposition {
  return {
    region,
    holiday,
    greeting: getRandomGreeting(holiday),
    backgroundStyle: styles?.backgroundStyle ?? DEFAULT_POSTCARD_BACKGROUND,
    fontStyle: styles?.fontStyle ?? DEFAULT_POSTCARD_FONT,
  };
}

export function usePostcardStudio() {
  const [composition, setComposition] = useState<PostcardComposition>(() => {
    const region: AppRegion = "all";
    return createComposition(getCurrentOrNextHoliday(region), region);
  });
  const [panel, setPanel] = useState<StudioPanel>("none");
  const { favorites, addFavorite, getFavorite, removeFavorite } =
    useFavorites();
  const activeFavorite = getFavorite(composition);

  const closePanel = useCallback(() => setPanel("none"), []);

  const togglePanel = useCallback((next: Exclude<StudioPanel, "none">) => {
    setPanel(current => (current === next ? "none" : next));
  }, []);

  const selectHoliday = useCallback((holiday: Holiday) => {
    setComposition(current =>
      createComposition(holiday, current.region, current)
    );
  }, []);

  const setRegion = useCallback((region: AppRegion) => {
    setComposition(current =>
      createComposition(getCurrentOrNextHoliday(region), region, current)
    );
  }, []);

  const handleRegionChange = useCallback(
    (value: string) => {
      if (isAppRegion(value)) setRegion(value);
    },
    [setRegion]
  );

  const saveGreeting = useCallback((greeting: string) => {
    setComposition(current => ({ ...current, greeting }));
    setPanel("none");
  }, []);

  const setBackgroundStyle = useCallback(
    (backgroundStyle: PostcardBackgroundId) => {
      setComposition(current => ({ ...current, backgroundStyle }));
    },
    []
  );

  const setFontStyle = useCallback((fontStyle: PostcardFontId) => {
    setComposition(current => ({ ...current, fontStyle }));
  }, []);

  const resetStyles = useCallback(() => {
    setComposition(current => ({
      ...current,
      backgroundStyle: DEFAULT_POSTCARD_BACKGROUND,
      fontStyle: DEFAULT_POSTCARD_FONT,
    }));
  }, []);

  const refreshGreeting = useCallback(() => {
    setComposition(current => ({
      ...current,
      greeting: getRandomGreeting(current.holiday),
    }));
  }, []);

  const loadFavorite = useCallback((favorite: FavoritePostcard) => {
    const holiday = getHolidayById(favorite.holidayId);
    if (!holiday) return;

    setComposition({
      region: favorite.region,
      holiday,
      greeting: favorite.greeting,
      backgroundStyle: favorite.backgroundStyle,
      fontStyle: favorite.fontStyle,
    });
    setPanel("none");
  }, []);

  return {
    composition,
    panel,
    closePanel,
    togglePanel,
    selectHoliday,
    handleRegionChange,
    saveGreeting,
    setBackgroundStyle,
    setFontStyle,
    resetStyles,
    refreshGreeting,
    loadFavorite,
    favorites,
    addFavorite,
    removeFavorite,
    activeFavorite,
  };
}
