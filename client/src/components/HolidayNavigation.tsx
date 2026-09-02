import { Button } from "@/components/ui/button";
import type { Holiday } from "@/lib/holidays";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HolidayNavigationProps {
  currentHoliday: Holiday;
  onNext: () => void;
  onPrevious: () => void;
}

export function HolidayNavigation({
  currentHoliday,
  onNext,
  onPrevious,
}: HolidayNavigationProps) {
  return (
    <div className="studio-panel-tight p-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={onPrevious}
          size="sm"
          variant="outline"
          className="flex-1"
          title="View previous holiday"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <div className="flex-1 px-2 text-center">
          <p className="studio-field-label text-center">Browse</p>
        </div>

        <Button
          onClick={onNext}
          size="sm"
          variant="outline"
          className="flex-1"
          title="View next holiday"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <p className="mt-2 text-center text-xs text-[#526569]">
        Viewing{" "}
        <span className="font-semibold text-[#142f34]">
          {currentHoliday.name}
        </span>
      </p>
    </div>
  );
}
