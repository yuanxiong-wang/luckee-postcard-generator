/**
 * Postcard Component
 *
 * Renders a seasonal postcard with:
 * - Holiday-specific greeting
 * - Consistent "From our team at, Luckee" signature
 * - Refined stationery aesthetic with proof-like finishing
 * - Beautiful seasonal background images
 */

import { forwardRef } from "react";
import type { Holiday } from "@/lib/holidays";
import {
  getPostcardBackgroundPresentation,
  getPostcardFont,
} from "@/lib/postcard-styles";
import type {
  PostcardBackgroundId,
  PostcardFontId,
} from "@/lib/postcard-styles";

import type { PostcardLayout } from "@/lib/postcard-composition";

interface PostcardProps {
  layout: PostcardLayout;
  headline: string;
  shortMessage: string;
  holiday: Holiday;
  greeting: string;
  backgroundStyle: PostcardBackgroundId;
  fontStyle: PostcardFontId;
}

export const Postcard = forwardRef<HTMLDivElement, PostcardProps>(
  function Postcard(
    {
      holiday,
      greeting,
      backgroundStyle,
      fontStyle,
      layout,
      headline,
      shortMessage,
    },
    ref
  ) {
    const background = getPostcardBackgroundPresentation(
      backgroundStyle,
      holiday,
      holiday.artwork
    );
    const font = getPostcardFont(fontStyle);

    if (layout === "photo-message") {
      const image = holiday.id.includes("thanksgiving")
        ? "/holiday-photos/thanksgiving.webp"
        : holiday.artwork;
      return (
        <div
          ref={ref}
          data-export-root
          className="studio-postcard postcard-photo-message"
          data-compact={headline.length > 45 || shortMessage.length > 160}
        >
          <div
            className="postcard-photo"
            style={{ backgroundImage: `url('${image}')` }}
            role="img"
            aria-label={`${holiday.name} seasonal scene`}
          />
          <div className="postcard-message-panel">
            <p className="postcard-holiday-label">{holiday.name}</p>
            <h1
              className="postcard-message-headline"
              style={{
                fontFamily: font.family,
                fontWeight: font.weight,
                fontStyle: font.style,
              }}
            >
              {headline}
            </h1>
            <p className="postcard-message-body">{shortMessage}</p>
            <div className="postcard-message-signoff">
              <span>From our team at</span>
              <strong style={{ fontFamily: font.family }}>Luckee</strong>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-export-root
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
);
