import { holidays } from "./holidays.data.ts";
import type { AppRegion, CountryRegion, Holiday } from "./holidays.data.ts";

export function getCurrentOrNextHoliday(region: AppRegion = "all"): Holiday {
  const today = startOfDay(new Date());
  const year = today.getFullYear();
  const holidaysForRegion = getHolidaysByRegion(region, year);

  return (
    holidaysForRegion.find(
      holiday => getHolidayDateForYear(holiday, year) >= today
    ) ?? holidaysForRegion[0]
  );
}

export function getRandomGreeting(holiday: Holiday): string {
  return holiday.greetings[
    Math.floor(Math.random() * holiday.greetings.length)
  ];
}

export function getNextHoliday(
  currentHoliday: Holiday,
  region: AppRegion = "all"
): Holiday {
  const holidaysForRegion = getHolidaysByRegion(region);
  const currentIndex = holidaysForRegion.findIndex(
    holiday => holiday.id === currentHoliday.id
  );

  return holidaysForRegion[
    ((currentIndex === -1 ? 0 : currentIndex) + 1) % holidaysForRegion.length
  ];
}

export function getPreviousHoliday(
  currentHoliday: Holiday,
  region: AppRegion = "all"
): Holiday {
  const holidaysForRegion = getHolidaysByRegion(region);
  const currentIndex = holidaysForRegion.findIndex(
    holiday => holiday.id === currentHoliday.id
  );

  return holidaysForRegion[
    ((currentIndex === -1 ? 0 : currentIndex) - 1 + holidaysForRegion.length) %
      holidaysForRegion.length
  ];
}

export function getHolidaysByRegion(
  region: AppRegion = "all",
  year = new Date().getFullYear()
): Holiday[] {
  return holidays
    .filter(
      holiday => region === "all" || isObservedIn(holiday, region)
    )
    .slice()
    .sort(
      (left, right) =>
        getHolidayDateForYear(left, year).getTime() -
        getHolidayDateForYear(right, year).getTime()
    );
}

export function getHolidayById(holidayId: string): Holiday | undefined {
  return holidays.find(holiday => holiday.id === holidayId);
}

export function getHolidayDateString(
  holiday: Holiday,
  year = new Date().getFullYear()
): string {
  const date = getHolidayDateForYear(holiday, year);
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getHolidayDateForYear(holiday: Holiday, year: number): Date {
  switch (holiday.date.kind) {
    case "easter":
      return getEasterDate(year);
    case "nth-weekday":
      return getNthWeekdayOfMonth(
        year,
        holiday.date.month - 1,
        holiday.date.weekday,
        holiday.date.nth
      );
    case "last-weekday":
      return getLastWeekdayOfMonth(
        year,
        holiday.date.month - 1,
        holiday.date.weekday
      );
    case "monday-on-or-before":
      return getMondayOnOrBefore(
        year,
        holiday.date.month - 1,
        holiday.date.day
      );
    case "fixed":
      return new Date(year, holiday.date.month - 1, holiday.date.day);
  }
}

function isObservedIn(holiday: Holiday, region: CountryRegion): boolean {
  return (holiday.regions as readonly CountryRegion[]).includes(region);
}

function getNthWeekdayOfMonth(
  year: number,
  monthIndex: number,
  weekday: number,
  nth: number
): Date {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const offset = (weekday - firstOfMonth.getDay() + 7) % 7;
  return new Date(year, monthIndex, 1 + offset + (nth - 1) * 7);
}

function getLastWeekdayOfMonth(
  year: number,
  monthIndex: number,
  weekday: number
): Date {
  const lastOfMonth = new Date(year, monthIndex + 1, 0);
  const offset = (lastOfMonth.getDay() - weekday + 7) % 7;
  return new Date(year, monthIndex, lastOfMonth.getDate() - offset);
}

function getMondayOnOrBefore(
  year: number,
  monthIndex: number,
  day: number
): Date {
  const anchor = new Date(year, monthIndex, day);
  const offset = (anchor.getDay() - 1 + 7) % 7;
  return new Date(year, monthIndex, day - offset);
}

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
