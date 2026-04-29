/**
 * Postcard Component
 * 
 * Renders a seasonal postcard with:
 * - Holiday-specific greeting
 * - Consistent "From our team at, Luckee" signature
 * - Warm, nostalgic aesthetic with hand-drawn feel
 * - Beautiful seasonal background images
 */

import { Holiday } from '@/lib/holidays';
import { getBackgroundForHoliday } from '@/lib/holiday-backgrounds';

interface PostcardProps {
  holiday: Holiday;
  greeting: string;
  decorElements: string[];
}

export function Postcard({ holiday, greeting, decorElements }: PostcardProps) {
  const bgImage = getBackgroundForHoliday(holiday.id);

  return (
    <div
      className="relative w-full aspect-[8.5/5.5] rounded-lg shadow-2xl overflow-hidden"
      style={{
        backgroundColor: holiday.colors.background,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          background: `linear-gradient(135deg, ${holiday.colors.background}dd 0%, ${holiday.colors.background}99 100%)`,
        }}
      />

      {/* Main content area with proper z-index */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
        {/* Top section: Greeting */}
        <div className="flex-1 flex items-center justify-start">
          <h1
            className="leading-tight max-w-2xl drop-shadow-lg"
            style={{
              fontSize: '56px',
              color: holiday.colors.text,
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              fontStyle: 'italic',
              textShadow: '3px 3px 6px rgba(0,0,0,0.25)',
              letterSpacing: '-0.02em',
            }}
          >
            {greeting}
          </h1>
        </div>

        {/* Bottom section: Signature - FIXED FORMATTING */}
        <div className="flex items-baseline gap-2">
          <span
            className="italic drop-shadow-md"
            style={{
              fontSize: '18px',
              color: holiday.colors.textLight,
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em',
              fontWeight: '400',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            From our team at,
          </span>
          <span
            className="italic drop-shadow-lg"
            style={{
              fontSize: '40px',
              color: holiday.colors.text,
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              letterSpacing: '-0.01em',
              textShadow: '3px 3px 6px rgba(0,0,0,0.25)',
            }}
          >
            Luckee
          </span>
        </div>
      </div>

      {/* Decorative divider line */}
      <div
        className="absolute bottom-24 left-0 right-0 h-1 z-20"
        style={{
          background: `linear-gradient(to right, ${holiday.colors.accent}00, ${holiday.colors.accent}, ${holiday.colors.accent}00)`,
          boxShadow: `0 0 8px ${holiday.colors.accent}80`,
        }}
      />
    </div>
  );
}
