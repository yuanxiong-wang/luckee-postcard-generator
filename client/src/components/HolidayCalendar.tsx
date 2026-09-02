import { useMemo, useState } from "react";
import {
  getHolidayDateForYear,
  getHolidaysByRegion,
} from "@/lib/holidays";
import type { AppRegion, Holiday } from "@/lib/holidays";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

interface HolidayCalendarProps {
  onHolidaySelect: (holiday: Holiday) => void;
  currentHolidayId?: string;
  region?: AppRegion;
}

export function HolidayCalendar({
  onHolidaySelect,
  currentHolidayId,
  region = "all",
}: HolidayCalendarProps) {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const year = new Date().getFullYear();
  const holidaysByMonth = useMemo(() => {
    const grouped: Holiday[][] = Array.from({ length: 12 }, () => []);
    for (const holiday of getHolidaysByRegion(region, year)) {
      grouped[getHolidayDateForYear(holiday, year).getMonth()].push(holiday);
    }
    return grouped;
  }, [region, year]);

  return (
    <div className="w-full rounded-lg border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Holiday Calendar
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MONTH_NAMES.map((month, monthIndex) => {
          const monthHolidays = holidaysByMonth[monthIndex];
          const isExpanded = expandedMonth === monthIndex;

          return (
            <div
              key={month}
              className="overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
            >
              <button
                onClick={() =>
                  setExpandedMonth(isExpanded ? null : monthIndex)
                }
                className="flex w-full items-center justify-between bg-secondary p-4 transition-colors hover:bg-secondary/80"
              >
                <span className="font-semibold text-card-foreground">
                  {month}
                </span>
                <span className="text-sm text-muted-foreground">
                  {monthHolidays.length}{" "}
                  {monthHolidays.length === 1 ? "holiday" : "holidays"}
                </span>
              </button>

              {isExpanded && monthHolidays.length > 0 && (
                <div className="space-y-3 bg-card p-4">
                  {monthHolidays.map(holiday => (
                    <button
                      key={holiday.id}
                      onClick={() => onHolidaySelect(holiday)}
                      className={`w-full rounded-md p-3 text-left transition-all ${
                        currentHolidayId === holiday.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-sm"
                      }`}
                    >
                      <div className="font-medium">{holiday.name}</div>
                      <div className="text-sm opacity-75">
                        {getHolidayDateForYear(holiday, year).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {isExpanded && monthHolidays.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No holidays this month
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
