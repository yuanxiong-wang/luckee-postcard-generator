import type { CSSProperties } from "react";
import type { Holiday } from "@/lib/holidays";

export const postcardBackgroundOptions = [
  { id: "artwork", label: "Artwork" },
  { id: "color-wash", label: "Color wash" },
  { id: "linen", label: "Linen" },
  { id: "confetti", label: "Confetti" },
  { id: "midnight", label: "Midnight" },
] as const;

export const postcardFontOptions = [
  {
    id: "editorial",
    label: "Editorial",
    family: '"Cormorant Garamond", Georgia, serif',
    weight: 600,
    style: "normal",
  },
  {
    id: "classic",
    label: "Classic",
    family: '"Libre Baskerville", Georgia, serif',
    weight: 700,
    style: "normal",
  },
  {
    id: "modern",
    label: "Modern",
    family: '"Manrope", ui-sans-serif, system-ui, sans-serif',
    weight: 700,
    style: "normal",
  },
  {
    id: "handwritten",
    label: "Handwritten",
    family: '"Caveat", cursive',
    weight: 600,
    style: "normal",
  },
] as const;

export type PostcardBackgroundId =
  (typeof postcardBackgroundOptions)[number]["id"];
export type PostcardFontId = (typeof postcardFontOptions)[number]["id"];

export const DEFAULT_POSTCARD_BACKGROUND: PostcardBackgroundId = "artwork";
export const DEFAULT_POSTCARD_FONT: PostcardFontId = "editorial";

export interface PostcardBackgroundPresentation {
  surface: CSSProperties;
  overlay: CSSProperties;
  textColor: string;
  secondaryTextColor: string;
  dividerColor: string;
}

export function getPostcardFont(fontId: PostcardFontId) {
  return (
    postcardFontOptions.find(font => font.id === fontId) ??
    postcardFontOptions[0]
  );
}

export function getPostcardBackgroundPresentation(
  backgroundId: PostcardBackgroundId,
  holiday: Holiday,
  artworkUrl: string
): PostcardBackgroundPresentation {
  const { background, accent, accentLight, text, textLight } = holiday.colors;

  switch (backgroundId) {
    case "color-wash":
      return {
        surface: {
          backgroundColor: background,
          backgroundImage: `radial-gradient(circle at 78% 20%, ${accentLight}d9 0%, transparent 32%), radial-gradient(circle at 18% 86%, ${accent}80 0%, transparent 28%), linear-gradient(135deg, ${background} 0%, ${accentLight} 100%)`,
          backgroundSize: "cover",
        },
        overlay: {
          background: `linear-gradient(105deg, ${background}d9 0%, ${background}8c 55%, transparent 100%)`,
        },
        textColor: text,
        secondaryTextColor: textLight,
        dividerColor: accent,
      };
    case "linen":
      return {
        surface: {
          backgroundColor: "#f4efe4",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(20, 47, 52, 0.028) 0px, rgba(20, 47, 52, 0.028) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(181, 139, 67, 0.025) 0px, rgba(181, 139, 67, 0.025) 1px, transparent 1px, transparent 5px)",
          backgroundSize: "auto",
        },
        overlay: {
          background: `radial-gradient(circle at 82% 18%, ${accentLight}8c 0%, transparent 34%)`,
        },
        textColor: "#17363a",
        secondaryTextColor: "#7b6a44",
        dividerColor: accent,
      };
    case "confetti":
      return {
        surface: {
          backgroundColor: "#fbfaf6",
          backgroundImage: `radial-gradient(circle, ${accent} 0 3px, transparent 3.5px), radial-gradient(circle, ${accentLight} 0 5px, transparent 5.5px), radial-gradient(circle, #b58b43 0 2px, transparent 2.5px)`,
          backgroundPosition: "18px 22px, 66px 58px, 42px 86px",
          backgroundSize: "92px 92px, 118px 118px, 74px 74px",
        },
        overlay: {
          background:
            "linear-gradient(90deg, rgba(251, 250, 246, 0.96) 0%, rgba(251, 250, 246, 0.76) 64%, rgba(251, 250, 246, 0.2) 100%)",
        },
        textColor: "#17363a",
        secondaryTextColor: "#7b6a44",
        dividerColor: accent,
      };
    case "midnight":
      return {
        surface: {
          backgroundColor: "#102d31",
          backgroundImage: `radial-gradient(circle at 78% 24%, ${accent}70 0%, transparent 28%), radial-gradient(circle at 22% 84%, ${accentLight}26 0%, transparent 32%), linear-gradient(145deg, #0b2428 0%, #173f42 100%)`,
          backgroundSize: "cover",
        },
        overlay: {
          background:
            "linear-gradient(100deg, rgba(5, 24, 27, 0.5) 0%, rgba(5, 24, 27, 0.08) 100%)",
        },
        textColor: "#fffaf0",
        secondaryTextColor: "#d9c18f",
        dividerColor: accentLight,
      };
    case "artwork":
    default:
      return {
        surface: {
          backgroundColor: background,
          backgroundImage: `url('${artworkUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
        overlay: {
          background: `linear-gradient(135deg, ${background}f2 0%, ${background}b8 52%, ${background}86 100%)`,
        },
        textColor: text,
        secondaryTextColor: textLight,
        dividerColor: accent,
      };
  }
}
