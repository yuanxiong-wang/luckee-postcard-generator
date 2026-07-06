/**
 * Postcard Component
 * 
 * Renders a seasonal postcard with:
 * - Holiday-specific greeting
 * - Consistent "From our team at, Luckee" signature
 * - Refined stationery aesthetic with proof-like finishing
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
      className="studio-postcard relative w-full aspect-[8.5/5.5] overflow-hidden"
      style={{
        backgroundColor: holiday.colors.background,
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${holiday.colors.background}f2 0%, ${holiday.colors.background}b8 52%, ${holiday.colors.background}86 100%)`,
        }}
      />

      {/* Main content area with proper z-index */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12">
        {/* Top section: Greeting */}
        <div className="flex-1 flex items-center justify-start">
          <h1
            className="postcard-greeting max-w-2xl drop-shadow-lg"
            style={{
              color: holiday.colors.text,
              textShadow: '3px 3px 6px rgba(0,0,0,0.25)',
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
              color: holiday.colors.textLight,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            From our team at,
          </span>
          <span
            className="postcard-signature drop-shadow-lg"
            style={{
              color: holiday.colors.text,
              textShadow: '3px 3px 6px rgba(0,0,0,0.25)',
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
          background: `linear-gradient(to right, ${holiday.colors.accent}00, ${holiday.colors.accent}, ${holiday.colors.accent}00)`,
          boxShadow: `0 0 10px ${holiday.colors.accent}70`,
        }}
      />
    </div>
  );
}
