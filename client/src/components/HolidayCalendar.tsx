/**
 * Holiday Calendar Component
 * 
 * Displays all holidays in a visual calendar format with dates,
 * allowing users to jump directly to any holiday
 */

import { useState } from 'react';
import { getHolidayDateString, getHolidaysByRegion } from '@/lib/holidays';
import type { AppRegion, Holiday } from '@/lib/holidays';

interface HolidayCalendarProps {
  onHolidaySelect: (holiday: Holiday) => void;
  currentHolidayId?: string;
  region?: AppRegion;
}

export function HolidayCalendar({ onHolidaySelect, currentHolidayId, region = 'both' }: HolidayCalendarProps) {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const filteredHolidays = getHolidaysByRegion(region);

  // Group holidays by month
  const holidaysByMonth: Record<number, Holiday[]> = {};
  filteredHolidays.forEach((holiday) => {
    const [month] = holiday.date.split('-').map(Number);
    const monthIndex = month - 1; // Convert to 0-indexed
    if (!holidaysByMonth[monthIndex]) {
      holidaysByMonth[monthIndex] = [];
    }
    holidaysByMonth[monthIndex].push(holiday);
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="w-full bg-white rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Holiday Calendar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monthNames.map((month, monthIndex) => {
          const monthHolidays = holidaysByMonth[monthIndex] || [];
          const isExpanded = expandedMonth === monthIndex;

          return (
            <div
              key={month}
              className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setExpandedMonth(isExpanded ? null : monthIndex)}
                className="w-full p-4 bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-card-foreground">{month}</span>
                <span className="text-sm text-muted-foreground">
                  {monthHolidays.length} {monthHolidays.length === 1 ? 'holiday' : 'holidays'}
                </span>
              </button>

              {isExpanded && monthHolidays.length > 0 && (
                <div className="p-4 space-y-3 bg-card">
                  {monthHolidays.map((holiday) => (
                    <button
                      key={holiday.id}
                      onClick={() => onHolidaySelect(holiday)}
                      className={`w-full text-left p-3 rounded-md transition-all ${
                        currentHolidayId === holiday.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted hover:bg-muted/80 text-foreground hover:shadow-sm'
                      }`}
                    >
                      <div className="font-medium">{holiday.name}</div>
                      <div className="text-sm opacity-75">
                        {(() => {
                          const [month, day] = getHolidayDateString(holiday).split('-').map(Number);
                          const date = new Date(2024, month - 1, day);
                          return date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          });
                        })()}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {isExpanded && monthHolidays.length === 0 && (
                <div className="p-4 text-center text-muted-foreground text-sm">
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
