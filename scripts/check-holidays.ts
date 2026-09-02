import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  getHolidayById,
  getHolidayDateString,
  getHolidaysByRegion,
  holidays,
  type DateRule,
  type HolidayId,
} from "../client/src/lib/holidays.ts";
import {
  compositionFromQuery,
  parseCompositionSearch,
  serializeComposition,
} from "../client/src/lib/composition-url.ts";
import { detectRegion } from "../client/src/lib/detect-region.ts";

function dateFor(holidayId: HolidayId, year: number) {
  const holiday = getHolidayById(holidayId);
  assert(holiday, `Missing ${holidayId}`);
  return getHolidayDateString(holiday, year);
}

const expected2026: Record<HolidayId, string> = {
  "new-year": "01-01",
  "mlk-day": "01-19",
  valentines: "02-14",
  "family-day": "02-16",
  "presidents-day": "02-16",
  "st-patricks": "03-17",
  "good-friday": "04-03",
  easter: "04-05",
  "easter-monday": "04-06",
  "early-may-bank-holiday": "05-04",
  "victoria-day": "05-18",
  "memorial-day": "05-25",
  "spring-bank-holiday": "05-25",
  juneteenth: "06-19",
  "summer-solstice": "06-21",
  "canada-day": "07-01",
  "independence-day": "07-04",
  "summer-bank-holiday": "08-31",
  "labor-day": "09-07",
  "labour-day": "09-07",
  "truth-and-reconciliation-day": "09-30",
  "canadian-thanksgiving": "10-12",
  halloween: "10-31",
  "guy-fawkes": "11-05",
  "remembrance-sunday": "11-08",
  "veterans-day": "11-11",
  "remembrance-day": "11-11",
  thanksgiving: "11-26",
  christmas: "12-25",
  "boxing-day": "12-26",
};

assert.equal(holidays.length, Object.keys(expected2026).length);

const seen = new Set<string>();
const artworks = new Set<string>();
for (const holiday of holidays) {
  assert.equal(seen.has(holiday.id), false, `Duplicate holiday id ${holiday.id}`);
  seen.add(holiday.id);
  assert.ok(holiday.artwork.startsWith("/holiday-backgrounds/"));
  assert.equal(
    artworks.has(holiday.artwork),
    false,
    `Shared artwork ${holiday.artwork}`
  );
  artworks.add(holiday.artwork);
  assert.ok(
    existsSync(`client/public${holiday.artwork}`),
    `Missing artwork file ${holiday.artwork}`
  );
  assert.ok(holiday.regions.length > 0, `${holiday.id} has no regions`);
  assert.ok(holiday.greetings.length > 0, `${holiday.id} has no greetings`);
  assert.equal(dateFor(holiday.id, 2026), expected2026[holiday.id]);
}

assert.equal(dateFor("easter", 2024), "03-31");
assert.equal(dateFor("easter", 2025), "04-20");
assert.equal(dateFor("easter", 2027), "03-28");
assert.equal(dateFor("good-friday", 2025), "04-18");
assert.equal(dateFor("easter-monday", 2025), "04-21");
assert.equal(dateFor("mlk-day", 2025), "01-20");
assert.equal(dateFor("victoria-day", 2025), "05-19");
assert.equal(dateFor("memorial-day", 2025), "05-26");
assert.equal(dateFor("early-may-bank-holiday", 2025), "05-05");
assert.equal(dateFor("spring-bank-holiday", 2025), "05-26");
assert.equal(dateFor("summer-bank-holiday", 2025), "08-25");
assert.equal(dateFor("remembrance-sunday", 2025), "11-09");
assert.equal(dateFor("labor-day", 2025), "09-01");
assert.equal(dateFor("labour-day", 2025), "09-01");
assert.equal(dateFor("canadian-thanksgiving", 2025), "10-13");
assert.equal(dateFor("thanksgiving", 2025), "11-27");

const kinds = new Set(holidays.map(holiday => holiday.date.kind));
const expectedKinds: DateRule["kind"][] = [
  "fixed",
  "nth-weekday",
  "last-weekday",
  "monday-on-or-before",
  "easter",
  "easter-offset",
];
for (const kind of expectedKinds) {
  assert.equal(kinds.has(kind), true, `No holiday uses DateRule ${kind}`);
}

assert.equal(
  getHolidaysByRegion("US").every(holiday =>
    (holiday.regions as readonly string[]).includes("US")
  ),
  true
);
assert.equal(
  getHolidaysByRegion("UK").some(holiday => holiday.id === "boxing-day"),
  true
);
assert.equal(
  getHolidaysByRegion("UK").some(
    holiday => holiday.id === "early-may-bank-holiday"
  ),
  true
);
assert.equal(
  getHolidaysByRegion("UK").some(holiday => holiday.id === "remembrance-sunday"),
  true
);
assert.equal(
  getHolidaysByRegion("US").some(holiday => holiday.id === "boxing-day"),
  false
);
assert.equal(
  getHolidaysByRegion("UK").some(holiday => holiday.id === "independence-day"),
  false
);

assert.equal(detectRegion("en-GB", "UTC"), "UK");
assert.equal(detectRegion("en-CA", "UTC"), "CA");
assert.equal(detectRegion("en-US", "UTC"), "US");
assert.equal(detectRegion("fr-FR", "Europe/London"), "UK");
assert.equal(detectRegion("fr-FR", "America/Toronto"), "CA");
assert.equal(detectRegion("fr-FR", "America/New_York"), "US");
assert.equal(detectRegion("fr-FR", "Europe/Paris"), "all");

const holiday = getHolidayById("christmas");
assert(holiday);
const encoded = serializeComposition({
  region: "UK",
  holiday,
  greeting: "Season's Brightest Wishes",
  backgroundStyle: "linen",
  fontStyle: "handwritten",
});
const parsed = parseCompositionSearch(encoded);
assert.equal(parsed.region, "UK");
assert.equal(parsed.holidayId, "christmas");
assert.equal(parsed.greeting, "Season's Brightest Wishes");
assert.equal(parsed.backgroundStyle, "linen");
assert.equal(parsed.fontStyle, "handwritten");

const restored = compositionFromQuery(parsed, "all");
assert.equal(restored.holiday.id, "christmas");
assert.equal(restored.region, "UK");
assert.equal(restored.greeting, "Season's Brightest Wishes");

console.log(`Checked ${holidays.length} holidays across every DateRule.`);
