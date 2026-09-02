export type CountryRegion = "US" | "UK" | "CA";
export type AppRegion = CountryRegion | "all";

export const ALL_COUNTRY_REGIONS: readonly CountryRegion[] = ["US", "UK", "CA"];

export type DateRule =
  | { kind: "fixed"; month: number; day: number }
  | { kind: "nth-weekday"; month: number; weekday: number; nth: number }
  | { kind: "last-weekday"; month: number; weekday: number }
  | { kind: "monday-on-or-before"; month: number; day: number }
  | { kind: "easter" }
  | { kind: "easter-offset"; days: number };

export interface HolidayPalette {
  background: string;
  accent: string;
  accentLight: string;
  text: string;
  textLight: string;
}

interface HolidayDefinition {
  id: string;
  name: string;
  date: DateRule;
  greetings: readonly string[];
  colors: HolidayPalette;
  regions: readonly CountryRegion[];
  artwork: string;
}

function artwork(file: string): string {
  return `/holiday-backgrounds/${file}.webp`;
}

const navyRed: HolidayPalette = {
  background: "#1a3a52",
  accent: "#e74c3c",
  accentLight: "#f8d7da",
  text: "#f5f1e8",
  textLight: "#d4a574",
};

const creamRed: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#e74c3c",
  accentLight: "#f8d7da",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const creamGreen: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#27ae60",
  accentLight: "#d5f4e6",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const creamGold: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#f39c12",
  accentLight: "#fce4d6",
  text: "#1a3a52",
  textLight: "#7a9b8e",
};

const creamNavy: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#1a3a52",
  accentLight: "#c9d8e3",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const creamSage: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#7a9b8e",
  accentLight: "#dbe7df",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const creamCrimson: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#c0392b",
  accentLight: "#f4d5d1",
  text: "#1a3a52",
  textLight: "#7a9b8e",
};

const creamCrimsonWarm: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#c0392b",
  accentLight: "#f4d5d1",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const creamMaple: HolidayPalette = {
  background: "#f5f1e8",
  accent: "#d52b1e",
  accentLight: "#f6d4d0",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const harvest: HolidayPalette = {
  background: "#f9f3e6",
  accent: "#d84315",
  accentLight: "#ffccbc",
  text: "#1a3a52",
  textLight: "#7a9b8e",
};

const solstice: HolidayPalette = {
  background: "#f9f3e6",
  accent: "#ff6b35",
  accentLight: "#ffe0cc",
  text: "#1a3a52",
  textLight: "#d4a574",
};

const orangeHarvest: HolidayPalette = {
  background: "#f9f3e6",
  accent: "#ff6b35",
  accentLight: "#ffe0cc",
  text: "#1a3a52",
  textLight: "#7a9b8e",
};

const halloween: HolidayPalette = {
  background: "#2c1810",
  accent: "#ff6b35",
  accentLight: "#ffe0cc",
  text: "#f5f1e8",
  textLight: "#d4a574",
};

const thanksgiving: HolidayPalette = {
  background: "#5d4037",
  accent: "#d84315",
  accentLight: "#ffccbc",
  text: "#f5f1e8",
  textLight: "#d4a574",
};

const navyGreen: HolidayPalette = {
  background: "#1a3a52",
  accent: "#27ae60",
  accentLight: "#d5f4e6",
  text: "#f5f1e8",
  textLight: "#d4a574",
};

const navyGold: HolidayPalette = {
  background: "#1a3a52",
  accent: "#f39c12",
  accentLight: "#fce4d6",
  text: "#f5f1e8",
  textLight: "#d4a574",
};

const firstMondaySeptember: DateRule = {
  kind: "nth-weekday",
  month: 9,
  weekday: 1,
  nth: 1,
};

const laborGreetings = [
  "Cheers to Hard Work",
  "Enjoy the Long Weekend",
  "Celebrating Every Contribution",
  "With Thanks for All You Do",
  "Rest, Recharge & Celebrate",
] as const;

export const holidays = [
  {
    id: "new-year",
    name: "Happy New Year",
    date: { kind: "fixed", month: 1, day: 1 },
    greetings: [
      "Happy New Year",
      "Cheers to New Beginnings",
      "Welcome to a Fresh Start",
      "Here's to New Adventures",
      "A Bright Year Ahead",
      "New Year, Fresh Momentum",
    ],
    colors: navyRed,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("new-year"),
  },
  {
    id: "mlk-day",
    name: "Happy Martin Luther King Jr. Day",
    date: { kind: "nth-weekday", month: 1, weekday: 1, nth: 3 },
    greetings: [
      "Honoring Dr. King",
      "Celebrating Service & Hope",
      "Keeping the Dream Alive",
      "A Day of Purpose",
      "Honoring a Legacy of Hope",
      "Reflecting with Purpose",
    ],
    colors: creamNavy,
    regions: ["US"],
    artwork: artwork("mlk-day"),
  },
  {
    id: "valentines",
    name: "Happy Valentine's Day",
    date: { kind: "fixed", month: 2, day: 14 },
    greetings: [
      "Happy Valentine's Day",
      "Spreading Love & Cheer",
      "With Love & Appreciation",
      "Celebrating Connection",
      "Warm Wishes from Our Team",
      "A Note of Appreciation",
    ],
    colors: creamRed,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("valentines"),
  },
  {
    id: "family-day",
    name: "Happy Family Day",
    date: { kind: "nth-weekday", month: 2, weekday: 1, nth: 3 },
    greetings: [
      "Happy Family Day",
      "Celebrating Time Together",
      "Warm Wishes to Your Family",
      "Together Is the Best Place",
      "A Day for What Matters",
      "Sending Family Day Warmth",
    ],
    colors: creamSage,
    regions: ["CA"],
    artwork: artwork("family-day"),
  },
  {
    id: "presidents-day",
    name: "Happy Presidents Day",
    date: { kind: "nth-weekday", month: 2, weekday: 1, nth: 3 },
    greetings: [
      "Happy Presidents Day",
      "Honoring Leadership",
      "A Day to Reflect & Remember",
      "Celebrating Civic Spirit",
      "With Respect for Service",
      "Reflecting on Leadership",
    ],
    colors: navyRed,
    regions: ["US"],
    artwork: artwork("presidents-day"),
  },
  {
    id: "st-patricks",
    name: "Happy St. Patrick's Day",
    date: { kind: "fixed", month: 3, day: 17 },
    greetings: [
      "Happy St. Patrick's Day",
      "May Your Day Be Lucky",
      "Feeling Lucky",
      "Luck of the Irish",
      "Sending a Little Luck",
      "Good Fortune to You",
    ],
    colors: creamGreen,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("st-patricks"),
  },
  {
    id: "easter",
    name: "Happy Easter",
    date: { kind: "easter" },
    greetings: [
      "Happy Easter",
      "Wishing You a Joyful Easter",
      "Spring Blessings",
      "Easter Joy & Renewal",
      "A Season of Renewal",
      "Warm Spring Wishes",
    ],
    colors: creamGold,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("easter"),
  },
  {
    id: "good-friday",
    name: "Good Friday",
    date: { kind: "easter-offset", days: -2 },
    greetings: [
      "Peace This Good Friday",
      "A Quiet Spring Day",
      "Wishing You Rest",
      "Gentle Spring Wishes",
      "A Day of Reflection",
      "Warmth This Season",
    ],
    colors: creamNavy,
    regions: ["UK", "CA"],
    artwork: artwork("good-friday"),
  },
  {
    id: "easter-monday",
    name: "Happy Easter Monday",
    date: { kind: "easter-offset", days: 1 },
    greetings: [
      "Happy Easter Monday",
      "Enjoy the Bank Holiday",
      "Spring Continues",
      "A Bright Bank Holiday",
      "Cheers to the Long Weekend",
      "Easter Monday Wishes",
    ],
    colors: creamGold,
    regions: ["UK"],
    artwork: artwork("easter-monday"),
  },
  {
    id: "early-may-bank-holiday",
    name: "Happy Early May Bank Holiday",
    date: { kind: "nth-weekday", month: 5, weekday: 1, nth: 1 },
    greetings: [
      "Happy Early May Bank Holiday",
      "Enjoy the Long Weekend",
      "May Blossom Wishes",
      "A Bright Bank Holiday",
      "Spring Bank Holiday Cheer",
      "Time to Pause and Enjoy",
    ],
    colors: creamSage,
    regions: ["UK"],
    artwork: artwork("early-may-bank-holiday"),
  },
  {
    id: "victoria-day",
    name: "Happy Victoria Day",
    date: { kind: "monday-on-or-before", month: 5, day: 24 },
    greetings: [
      "Happy Victoria Day",
      "Cheers to the Long Weekend",
      "Celebrating Spring in Canada",
      "Warm Victoria Day Wishes",
      "A Bright Start to Summer",
      "Enjoy the Holiday Weekend",
    ],
    colors: creamCrimson,
    regions: ["CA"],
    artwork: artwork("victoria-day"),
  },
  {
    id: "memorial-day",
    name: "Happy Memorial Day",
    date: { kind: "last-weekday", month: 5, weekday: 1 },
    greetings: [
      "Remembering with Gratitude",
      "Honoring Memorial Day",
      "With Respect & Remembrance",
      "Grateful for Their Service",
      "Remembering Their Sacrifice",
      "With Honor and Gratitude",
    ],
    colors: navyRed,
    regions: ["US"],
    artwork: artwork("memorial-day"),
  },
  {
    id: "spring-bank-holiday",
    name: "Happy Spring Bank Holiday",
    date: { kind: "last-weekday", month: 5, weekday: 1 },
    greetings: [
      "Happy Spring Bank Holiday",
      "Enjoy the Long Weekend",
      "Late Spring Wishes",
      "A Welcome Break",
      "Sunshine and Rest",
      "Bank Holiday Cheer",
    ],
    colors: creamSage,
    regions: ["UK"],
    artwork: artwork("spring-bank-holiday"),
  },
  {
    id: "juneteenth",
    name: "Happy Juneteenth",
    date: { kind: "fixed", month: 6, day: 19 },
    greetings: [
      "Happy Juneteenth",
      "Celebrating Freedom",
      "Honoring Liberation",
      "Joy, Freedom & Reflection",
      "A Day of Freedom and Hope",
      "Honoring the Journey Forward",
    ],
    colors: creamCrimsonWarm,
    regions: ["US"],
    artwork: artwork("juneteenth"),
  },
  {
    id: "summer-solstice",
    name: "Happy Summer Solstice",
    date: { kind: "fixed", month: 6, day: 21 },
    greetings: [
      "Happy Summer Solstice",
      "Celebrating the Longest Day",
      "Bright Days Ahead",
      "Sunshine & Warmth",
      "Here Comes the Light",
      "Golden Hours Ahead",
    ],
    colors: solstice,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("summer-solstice"),
  },
  {
    id: "canada-day",
    name: "Happy Canada Day",
    date: { kind: "fixed", month: 7, day: 1 },
    greetings: [
      "Happy Canada Day",
      "Celebrating Canada",
      "True North Cheer",
      "Maple Leaf Wishes",
      "Proudly Wishing You Well",
      "Cheers from Coast to Coast",
    ],
    colors: creamMaple,
    regions: ["CA"],
    artwork: artwork("canada-day"),
  },
  {
    id: "independence-day",
    name: "Happy Independence Day",
    date: { kind: "fixed", month: 7, day: 4 },
    greetings: [
      "Happy Independence Day",
      "Celebrating Freedom",
      "Land of the Free",
      "Stars & Stripes",
      "Red, White & Bright",
      "Wishing You a Sparkling Fourth",
    ],
    colors: navyRed,
    regions: ["US"],
    artwork: artwork("independence-day"),
  },
  {
    id: "summer-bank-holiday",
    name: "Happy Summer Bank Holiday",
    date: { kind: "last-weekday", month: 8, weekday: 1 },
    greetings: [
      "Happy Summer Bank Holiday",
      "Enjoy the Seaside Weekend",
      "Late Summer Wishes",
      "A Well-Earned Break",
      "Sunshine and Salt Air",
      "Bank Holiday Cheer",
    ],
    colors: solstice,
    regions: ["UK"],
    artwork: artwork("summer-bank-holiday"),
  },
  {
    id: "labor-day",
    name: "Happy Labor Day",
    date: firstMondaySeptember,
    greetings: ["Happy Labor Day", ...laborGreetings],
    colors: harvest,
    regions: ["US"],
    artwork: artwork("labor-day"),
  },
  {
    id: "labour-day",
    name: "Happy Labour Day",
    date: firstMondaySeptember,
    greetings: ["Happy Labour Day", ...laborGreetings],
    colors: harvest,
    regions: ["CA"],
    artwork: artwork("labour-day"),
  },
  {
    id: "truth-and-reconciliation-day",
    name: "National Day for Truth and Reconciliation",
    date: { kind: "fixed", month: 9, day: 30 },
    greetings: [
      "Truth, Reflection & Reconciliation",
      "Honoring Truth and Reconciliation",
      "A Day for Listening",
      "Remembering Every Child",
      "Reflecting with Care",
      "Truth Before Reconciliation",
    ],
    colors: orangeHarvest,
    regions: ["CA"],
    artwork: artwork("truth-and-reconciliation-day"),
  },
  {
    id: "canadian-thanksgiving",
    name: "Happy Thanksgiving",
    date: { kind: "nth-weekday", month: 10, weekday: 1, nth: 2 },
    greetings: [
      "Happy Thanksgiving",
      "Grateful for You",
      "Thankful & Blessed",
      "Harvest Gratitude",
      "Warm Harvest Wishes",
      "With Thanks This Season",
    ],
    colors: thanksgiving,
    regions: ["CA"],
    artwork: artwork("canadian-thanksgiving"),
  },
  {
    id: "halloween",
    name: "Happy Halloween",
    date: { kind: "fixed", month: 10, day: 31 },
    greetings: [
      "Happy Halloween",
      "Spooky Season",
      "Trick or Treat",
      "Boo!",
      "A Little Seasonal Magic",
      "Frightfully Fun Wishes",
    ],
    colors: halloween,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("halloween"),
  },
  {
    id: "guy-fawkes",
    name: "Happy Bonfire Night",
    date: { kind: "fixed", month: 11, day: 5 },
    greetings: [
      "Happy Bonfire Night",
      "Sparks and Warmth",
      "Guy Fawkes Night",
      "A Bright November Evening",
      "Bonfire Night Cheer",
      "Remember, Remember",
    ],
    colors: navyGold,
    regions: ["UK"],
    artwork: artwork("guy-fawkes"),
  },
  {
    id: "remembrance-sunday",
    name: "Remembrance Sunday",
    date: { kind: "nth-weekday", month: 11, weekday: 0, nth: 2 },
    greetings: [
      "Lest We Forget",
      "With Respect This Remembrance Sunday",
      "In Quiet Gratitude",
      "Remembering with Care",
      "Honoring Their Service",
      "We Will Remember Them",
    ],
    colors: creamCrimson,
    regions: ["UK"],
    artwork: artwork("remembrance-sunday"),
  },
  {
    id: "veterans-day",
    name: "Happy Veterans Day",
    date: { kind: "fixed", month: 11, day: 11 },
    greetings: [
      "Honoring Veterans",
      "With Gratitude for Your Service",
      "Happy Veterans Day",
      "Remembering Courage & Service",
      "Honoring All Who Served",
      "With Respect and Thanks",
    ],
    colors: navyRed,
    regions: ["US"],
    artwork: artwork("veterans-day"),
  },
  {
    id: "remembrance-day",
    name: "Remembrance Day",
    date: { kind: "fixed", month: 11, day: 11 },
    greetings: [
      "Remembering with Gratitude",
      "Lest We Forget",
      "Honoring Service & Sacrifice",
      "With Respect & Remembrance",
      "Remembering Those Who Served",
      "In Gratitude and Reflection",
    ],
    colors: creamCrimson,
    regions: ["CA"],
    artwork: artwork("remembrance-day"),
  },
  {
    id: "thanksgiving",
    name: "Happy Thanksgiving",
    date: { kind: "nth-weekday", month: 11, weekday: 4, nth: 4 },
    greetings: [
      "Happy Thanksgiving",
      "Grateful for You",
      "Thankful & Blessed",
      "Gratitude & Joy",
      "Warm Harvest Wishes",
      "With Thanks This Season",
    ],
    colors: thanksgiving,
    regions: ["US"],
    artwork: artwork("thanksgiving"),
  },
  {
    id: "christmas",
    name: "Happy Holidays",
    date: { kind: "fixed", month: 12, day: 25 },
    greetings: [
      "Happy Holidays",
      "Merry Christmas",
      "Festive Cheer",
      "Wishing You Joy",
      "Peace and Warmth to You",
      "Season's Brightest Wishes",
    ],
    colors: navyRed,
    regions: ALL_COUNTRY_REGIONS,
    artwork: artwork("christmas"),
  },
  {
    id: "boxing-day",
    name: "Happy Boxing Day",
    date: { kind: "fixed", month: 12, day: 26 },
    greetings: [
      "Happy Boxing Day",
      "Sharing the Joy",
      "Giving & Gratitude",
      "Boxing Day Cheer",
      "Warm Wishes After Christmas",
      "A Day for Giving Back",
    ],
    colors: navyGreen,
    regions: ["UK", "CA"],
    artwork: artwork("boxing-day"),
  },
] as const satisfies readonly HolidayDefinition[];

export type Holiday = (typeof holidays)[number];
export type HolidayId = Holiday["id"];

export function isAppRegion(value: string): value is AppRegion {
  return value === "all" || value === "US" || value === "UK" || value === "CA";
}

export function isHolidayId(value: string): value is HolidayId {
  return holidays.some(holiday => holiday.id === value);
}
