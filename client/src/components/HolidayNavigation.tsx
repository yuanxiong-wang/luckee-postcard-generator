/**
 * HolidayNavigation Component
 * 
 * Provides next and previous buttons to navigate through holidays
 */

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Holiday } from '@/lib/holidays';

interface HolidayNavigationProps {
  currentHoliday: Holiday;
  onNext: () => void;
  onPrevious: () => void;
  disabled?: boolean;
}

export function HolidayNavigation({
  currentHoliday,
  onNext,
  onPrevious,
  disabled = false,
}: HolidayNavigationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={onPrevious}
          disabled={disabled}
          size="sm"
          variant="outline"
          className="flex-1"
          title="View previous holiday"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex-1 text-center px-2">
          <p
            className="text-xs font-semibold text-slate-600"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Browse Holidays
          </p>
        </div>

        <Button
          onClick={onNext}
          disabled={disabled}
          size="sm"
          variant="outline"
          className="flex-1"
          title="View next holiday"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <p
        className="text-xs text-slate-500 text-center mt-2"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Currently viewing: <span className="font-semibold">{currentHoliday.name}</span>
      </p>
    </div>
  );
}
