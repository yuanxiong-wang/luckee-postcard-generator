import {
  getCurrentOrNextHoliday,
  getHolidayById,
  getRandomGreeting,
  isAppRegion,
  isHolidayId,
  type AppRegion,
  type HolidayId,
} from "./holidays.ts";
import type { PostcardComposition } from "./postcard-composition.ts";
import {
  DEFAULT_POSTCARD_BACKGROUND,
  DEFAULT_POSTCARD_FONT,
  isPostcardBackgroundId,
  isPostcardFontId,
  type PostcardBackgroundId,
  type PostcardFontId,
} from "./postcard-styles.ts";
import { detectRegion, readStoredRegion } from "./detect-region.ts";

export interface CompositionQuery {
  region?: AppRegion;
  holidayId?: HolidayId;
  greeting?: string;
  backgroundStyle?: PostcardBackgroundId;
  fontStyle?: PostcardFontId;
}

export function parseCompositionSearch(search: string): CompositionQuery {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  );
  const query: CompositionQuery = {};
  const region = params.get("r");
  if (region && isAppRegion(region)) query.region = region;
  const holidayId = params.get("h");
  if (holidayId && isHolidayId(holidayId)) query.holidayId = holidayId;
  const greeting = params.get("g");
  if (greeting) query.greeting = greeting.slice(0, 100);
  const background = params.get("b");
  if (background && isPostcardBackgroundId(background)) {
    query.backgroundStyle = background;
  }
  const font = params.get("f");
  if (font && isPostcardFontId(font)) query.fontStyle = font;
  return query;
}

export function serializeComposition(composition: PostcardComposition): string {
  const params = new URLSearchParams({
    h: composition.holiday.id,
    r: composition.region,
    g: composition.greeting,
    b: composition.backgroundStyle,
    f: composition.fontStyle,
  });
  return `?${params.toString()}`;
}

export function resolveInitialRegion(query: CompositionQuery): AppRegion {
  return query.region ?? readStoredRegion() ?? detectRegion();
}

export function compositionFromQuery(
  query: CompositionQuery,
  fallbackRegion: AppRegion
): PostcardComposition {
  const region = query.region ?? fallbackRegion;
  const holiday =
    (query.holidayId ? getHolidayById(query.holidayId) : undefined) ??
    getCurrentOrNextHoliday(region);

  return {
    region,
    holiday,
    greeting: query.greeting?.trim() || getRandomGreeting(holiday),
    backgroundStyle: query.backgroundStyle ?? DEFAULT_POSTCARD_BACKGROUND,
    fontStyle: query.fontStyle ?? DEFAULT_POSTCARD_FONT,
  };
}

export function writeCompositionUrl(composition: PostcardComposition) {
  if (typeof window === "undefined") return;
  const next = `${window.location.pathname}${serializeComposition(composition)}`;
  if (`${window.location.pathname}${window.location.search}` === next) return;
  window.history.replaceState(window.history.state, "", next);
}
