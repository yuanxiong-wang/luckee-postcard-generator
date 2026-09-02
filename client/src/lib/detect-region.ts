import type { AppRegion } from "./holidays.data.ts";


const REGION_STORAGE_KEY = "luckee_region";

const CANADIAN_TIMEZONES = new Set([
  "America/Toronto",
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Halifax",
  "America/St_Johns",
  "America/Whitehorse",
  "America/Yellowknife",
  "America/Iqaluit",
  "America/Regina",
  "America/Moncton",
  "America/Glace_Bay",
  "America/Goose_Bay",
  "America/Blanc-Sablon",
  "America/Atikokan",
  "America/Nipigon",
  "America/Thunder_Bay",
  "America/Rainy_River",
  "America/Cambridge_Bay",
  "America/Dawson",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Inuvik",
  "America/Creston",
  "America/Swift_Current",
  "America/Pangnirtung",
  "America/Rankin_Inlet",
  "America/Resolute",
  "America/Coral_Harbour",
]);

export function detectRegion(
  locale = typeof navigator === "undefined" ? "" : navigator.language,
  timeZone = typeof Intl === "undefined"
    ? ""
    : Intl.DateTimeFormat().resolvedOptions().timeZone
): AppRegion {
  const language = locale.toLowerCase();
  if (language.startsWith("en-gb") || language === "en-uk") return "UK";
  if (language.startsWith("en-ca")) return "CA";
  if (language.startsWith("en-us")) return "US";

  if (timeZone === "Europe/London" || timeZone === "Europe/Belfast") return "UK";
  if (CANADIAN_TIMEZONES.has(timeZone)) return "CA";
  if (
    timeZone.startsWith("America/") ||
    timeZone === "Pacific/Honolulu" ||
    timeZone.startsWith("US/")
  ) {
    return "US";
  }

  return "all";
}

export function readStoredRegion(): AppRegion | undefined {
  if (typeof localStorage === "undefined") return undefined;
  try {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    if (stored === "all" || stored === "US" || stored === "UK" || stored === "CA") {
      return stored;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export function writeStoredRegion(region: AppRegion) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(REGION_STORAGE_KEY, region);
  } catch {
    // Ignore quota / private-mode failures.
  }
}
