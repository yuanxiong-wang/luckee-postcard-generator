import assert from "node:assert/strict";
import {
  getHolidayById,
  getHolidayDateString,
} from "../client/src/lib/holidays.ts";

function dateFor(holidayId: string) {
  const holiday = getHolidayById(holidayId);
  assert(holiday, `Missing ${holidayId}`);
  return getHolidayDateString(holiday, 2026);
}

assert.equal(dateFor("mlk-day"), "01-19");
assert.equal(dateFor("victoria-day"), "05-18");
assert.equal(dateFor("thanksgiving"), "11-26");
