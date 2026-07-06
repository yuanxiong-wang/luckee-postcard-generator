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
    <div className="studio-panel-tight p-4">
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
          <p className="studio-field-label text-center">Browse</p>
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

      <p className="mt-2 text-center text-xs text-[#526569]">
        Viewing <span className="font-semibold text-[#142f34]">{currentHoliday.name}</span>
      </p>
    </div>
  );
}
