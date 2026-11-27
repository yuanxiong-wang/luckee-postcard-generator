import {
  getCurrentOrNextHoliday,
  getHolidayById,
  getRandomGreeting,
  isAppRegion,
  isHolidayId,
  type AppRegion,
  type HolidayId,
} from "./holidays.ts";
import {
  getDefaultMessage,
  type PostcardLayout,
  type PostcardComposition,
} from "./postcard-composition.ts";
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
  layout?: PostcardLayout;
  headline?: string;
  shortMessage?: string;
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
  if (params.get("l") === "photo-message") query.layout = "photo-message";
  if (params.get("title")?.trim())
    query.headline = params.get("title")!.slice(0, 70);
  if (params.get("message")?.trim())
    query.shortMessage = params.get("message")!.slice(0, 220);
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
    l: composition.layout,
    title: composition.headline,
    message: composition.shortMessage,
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
    layout: query.layout ?? "classic",
    headline: query.headline ?? getDefaultMessage(holiday).headline,
    shortMessage: query.shortMessage ?? getDefaultMessage(holiday).shortMessage,
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
