/**
 * Postcard Component
 *
 * Renders a seasonal postcard with:
 * - Holiday-specific greeting
 * - Consistent "From our team at, Luckee" signature
 * - Refined stationery aesthetic with proof-like finishing
 * - Beautiful seasonal background images
 */

import { Holiday } from "@/lib/holidays";
import { getBackgroundForHoliday } from "@/lib/holiday-backgrounds";
import {
  getPostcardBackgroundPresentation,
  getPostcardFont,
} from "@/lib/postcard-styles";
import type {
  PostcardBackgroundId,
  PostcardFontId,
} from "@/lib/postcard-styles";

interface PostcardProps {
  holiday: Holiday;
  greeting: string;
  decorElements: string[];
  backgroundStyle: PostcardBackgroundId;
  fontStyle: PostcardFontId;
}

export function Postcard({
  holiday,
  greeting,
  decorElements,
  backgroundStyle,
  fontStyle,
}: PostcardProps) {
  const bgImage = getBackgroundForHoliday(holiday.id);
  const background = getPostcardBackgroundPresentation(
    backgroundStyle,
    holiday,
    bgImage
  );
  const font = getPostcardFont(fontStyle);

  return (
    <div
      className="studio-postcard relative w-full aspect-[8.5/5.5] overflow-hidden"
      style={background.surface}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0" style={background.overlay} />

      {/* Main content area with proper z-index */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12">
        {/* Top section: Greeting */}
        <div className="flex-1 flex items-center justify-start">
          <h1
            className="postcard-greeting max-w-2xl drop-shadow-lg"
            style={{
              color: background.textColor,
              fontFamily: font.family,
              fontStyle: font.style,
              fontWeight: font.weight,
              textShadow: "3px 3px 6px rgba(0,0,0,0.25)",
            }}
          >
            {greeting}
          </h1>
        </div>

        {/* Bottom section: Signature */}
        <div className="flex items-baseline gap-2">
          <span
            className="postcard-note drop-shadow-md"
            style={{
              color: background.secondaryTextColor,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            From our team at,
          </span>
          <span
            className="postcard-signature drop-shadow-lg"
            style={{
              color: background.textColor,
              fontFamily: font.family,
              textShadow: "3px 3px 6px rgba(0,0,0,0.25)",
            }}
          >
            Luckee
          </span>
        </div>
      </div>

      {/* Decorative divider line */}
      <div
        className="absolute bottom-20 md:bottom-24 left-0 right-0 h-px z-20"
        style={{
          background: `linear-gradient(to right, ${background.dividerColor}00, ${background.dividerColor}, ${background.dividerColor}00)`,
          boxShadow: `0 0 10px ${background.dividerColor}70`,
        }}
      />
    </div>
  );
}
