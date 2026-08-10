/**
 * Holiday Data Structure
 *
 * Each holiday includes:
 * - name: Display name for the greeting
 * - date: MM-DD fallback for fixed-date holidays
 * - greetings: Array of random greeting messages to choose from
 * - colors: Seasonal color palette (background, accent, text)
 */

export interface Holiday {
  id: string;
  name: string;
  date: string;
  dynamicDate?: HolidayDateRule;
  greetings: string[];
  colors: {
    background: string;
    accent: string;
    accentLight: string;
    text: string;
    textLight: string;
  };
  regions: CountryRegion[];
}

export type CountryRegion = "US" | "UK" | "CA";
export type AppRegion = CountryRegion | "all";
export type HolidayDateRule =
  | "easter"
  | "third-monday-january"
  | "third-monday-february"
  | "monday-before-may-25"
  | "last-monday-may"
  | "first-monday-september"
  | "second-monday-october"
  | "fourth-thursday-november";

export const holidays: Holiday[] = [
  // Winter Holidays
  {
    id: "new-year",
    name: "Happy New Year",
    date: "01-01",
    greetings: [
      "Happy New Year",
      "Cheers to New Beginnings",
      "Welcome to a Fresh Start",
      "Here's to New Adventures",
      "A Bright Year Ahead",
      "New Year, Fresh Momentum",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: [],
  },
  {
    id: "valentines",
    name: "Happy Valentine's Day",
    date: "02-14",
    greetings: [
      "Happy Valentine's Day",
      "Spreading Love & Cheer",
      "With Love & Appreciation",
      "Celebrating Connection",
      "Warm Wishes from Our Team",
      "A Note of Appreciation",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: [],
  },
  {
    id: "st-patricks",
    name: "Happy St. Patrick's Day",
    date: "03-17",
    greetings: [
      "Happy St. Patrick's Day",
      "May Your Day Be Lucky",
      "Feeling Lucky",
      "Luck of the Irish",
      "Sending a Little Luck",
      "Good Fortune to You",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#27ae60",
      accentLight: "#d5f4e6",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: [],
  },
  {
    id: "easter",
    name: "Happy Easter",
    date: "03-31",
    dynamicDate: "easter",
    greetings: [
      "Happy Easter",
      "Wishing You a Joyful Easter",
      "Spring Blessings",
      "Easter Joy & Renewal",
      "A Season of Renewal",
      "Warm Spring Wishes",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#f39c12",
      accentLight: "#fce4d6",
      text: "#1a3a52",
      textLight: "#7a9b8e",
    },
    regions: [],
  },
  {
    id: "mlk-day",
    name: "Happy Martin Luther King Jr. Day",
    date: "01-15",
    dynamicDate: "third-monday-january",
    greetings: [
      "Honoring Dr. King",
      "Celebrating Service & Hope",
      "Keeping the Dream Alive",
      "A Day of Purpose",
      "Honoring a Legacy of Hope",
      "Reflecting with Purpose",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#1a3a52",
      accentLight: "#c9d8e3",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "family-day",
    name: "Happy Family Day",
    date: "02-15",
    dynamicDate: "third-monday-february",
    greetings: [
      "Happy Family Day",
      "Celebrating Time Together",
      "Warm Wishes to Your Family",
      "Together Is the Best Place",
      "A Day for What Matters",
      "Sending Family Day Warmth",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#7a9b8e",
      accentLight: "#dbe7df",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: ["CA"],
  },
  {
    id: "presidents-day",
    name: "Happy Presidents Day",
    date: "02-15",
    dynamicDate: "third-monday-february",
    greetings: [
      "Happy Presidents Day",
      "Honoring Leadership",
      "A Day to Reflect & Remember",
      "Celebrating Civic Spirit",
      "With Respect for Service",
      "Reflecting on Leadership",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "victoria-day",
    name: "Happy Victoria Day",
    date: "05-24",
    dynamicDate: "monday-before-may-25",
    greetings: [
      "Happy Victoria Day",
      "Cheers to the Long Weekend",
      "Celebrating Spring in Canada",
      "Warm Victoria Day Wishes",
      "A Bright Start to Summer",
      "Enjoy the Holiday Weekend",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#c0392b",
      accentLight: "#f4d5d1",
      text: "#1a3a52",
      textLight: "#7a9b8e",
    },
    regions: ["CA"],
  },
  {
    id: "memorial-day",
    name: "Happy Memorial Day",
    date: "05-31",
    dynamicDate: "last-monday-may",
    greetings: [
      "Remembering with Gratitude",
      "Honoring Memorial Day",
      "With Respect & Remembrance",
      "Grateful for Their Service",
      "Remembering Their Sacrifice",
      "With Honor and Gratitude",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "summer-solstice",
    name: "Happy Summer Solstice",
    date: "06-21",
    greetings: [
      "Happy Summer Solstice",
      "Celebrating the Longest Day",
      "Bright Days Ahead",
      "Sunshine & Warmth",
      "Here Comes the Light",
      "Golden Hours Ahead",
    ],
    colors: {
      background: "#f9f3e6",
      accent: "#ff6b35",
      accentLight: "#ffe0cc",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: [],
  },
  {
    id: "independence-day",
    name: "Happy Independence Day",
    date: "07-04",
    greetings: [
      "Happy Independence Day",
      "Celebrating Freedom",
      "Land of the Free",
      "Stars & Stripes",
      "Red, White & Bright",
      "Wishing You a Sparkling Fourth",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "juneteenth",
    name: "Happy Juneteenth",
    date: "06-19",
    greetings: [
      "Happy Juneteenth",
      "Celebrating Freedom",
      "Honoring Liberation",
      "Joy, Freedom & Reflection",
      "A Day of Freedom and Hope",
      "Honoring the Journey Forward",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#c0392b",
      accentLight: "#f4d5d1",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "canada-day",
    name: "Happy Canada Day",
    date: "07-01",
    greetings: [
      "Happy Canada Day",
      "Celebrating Canada",
      "True North Cheer",
      "Maple Leaf Wishes",
      "Proudly Wishing You Well",
      "Cheers from Coast to Coast",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#d52b1e",
      accentLight: "#f6d4d0",
      text: "#1a3a52",
      textLight: "#d4a574",
    },
    regions: ["CA"],
  },
  {
    id: "labor-day",
    name: "Happy Labor Day",
    date: "09-01",
    dynamicDate: "first-monday-september",
    greetings: [
      "Happy Labor Day",
      "Cheers to Hard Work",
      "Enjoy the Long Weekend",
      "Celebrating Every Contribution",
      "With Thanks for All You Do",
      "Rest, Recharge & Celebrate",
    ],
    colors: {
      background: "#f9f3e6",
      accent: "#d84315",
      accentLight: "#ffccbc",
      text: "#1a3a52",
      textLight: "#7a9b8e",
    },
    regions: ["US"],
  },
  {
    id: "labour-day",
    name: "Happy Labour Day",
    date: "09-01",
    dynamicDate: "first-monday-september",
    greetings: [
      "Happy Labour Day",
      "Cheers to Hard Work",
      "Enjoy the Long Weekend",
      "Celebrating Every Contribution",
      "With Thanks for All You Do",
      "Rest, Recharge & Celebrate",
    ],
    colors: {
      background: "#f9f3e6",
      accent: "#d84315",
      accentLight: "#ffccbc",
      text: "#1a3a52",
      textLight: "#7a9b8e",
    },
    regions: ["CA"],
  },
  {
    id: "truth-and-reconciliation-day",
    name: "National Day for Truth and Reconciliation",
    date: "09-30",
    greetings: [
      "Truth, Reflection & Reconciliation",
      "Honoring Truth and Reconciliation",
      "A Day for Listening",
      "Remembering Every Child",
      "Reflecting with Care",
      "Truth Before Reconciliation",
    ],
    colors: {
      background: "#f9f3e6",
      accent: "#ff6b35",
      accentLight: "#ffe0cc",
      text: "#1a3a52",
      textLight: "#7a9b8e",
    },
    regions: ["CA"],
  },
  {
    id: "canadian-thanksgiving",
    name: "Happy Thanksgiving",
    date: "10-08",
    dynamicDate: "second-monday-october",
    greetings: [
      "Happy Thanksgiving",
      "Grateful for You",
      "Thankful & Blessed",
      "Harvest Gratitude",
      "Warm Harvest Wishes",
      "With Thanks This Season",
    ],
    colors: {
      background: "#5d4037",
      accent: "#d84315",
      accentLight: "#ffccbc",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["CA"],
  },
  {
    id: "halloween",
    name: "Happy Halloween",
    date: "10-31",
    greetings: [
      "Happy Halloween",
      "Spooky Season",
      "Trick or Treat",
      "Boo!",
      "A Little Seasonal Magic",
      "Frightfully Fun Wishes",
    ],
    colors: {
      background: "#2c1810",
      accent: "#ff6b35",
      accentLight: "#ffe0cc",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: [],
  },
  {
    id: "thanksgiving",
    name: "Happy Thanksgiving",
    date: "11-23",
    dynamicDate: "fourth-thursday-november",
    greetings: [
      "Happy Thanksgiving",
      "Grateful for You",
      "Thankful & Blessed",
      "Gratitude & Joy",
      "Warm Harvest Wishes",
      "With Thanks This Season",
    ],
    colors: {
      background: "#5d4037",
      accent: "#d84315",
      accentLight: "#ffccbc",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "veterans-day",
    name: "Happy Veterans Day",
    date: "11-11",
    greetings: [
      "Honoring Veterans",
      "With Gratitude for Your Service",
      "Happy Veterans Day",
      "Remembering Courage & Service",
      "Honoring All Who Served",
      "With Respect and Thanks",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["US"],
  },
  {
    id: "remembrance-day",
    name: "Remembrance Day",
    date: "11-11",
    greetings: [
      "Remembering with Gratitude",
      "Lest We Forget",
      "Honoring Service & Sacrifice",
      "With Respect & Remembrance",
      "Remembering Those Who Served",
      "In Gratitude and Reflection",
    ],
    colors: {
      background: "#f5f1e8",
      accent: "#c0392b",
      accentLight: "#f4d5d1",
      text: "#1a3a52",
      textLight: "#7a9b8e",
    },
    regions: ["CA"],
  },
  {
    id: "christmas",
    name: "Happy Holidays",
    date: "12-25",
    greetings: [
      "Happy Holidays",
      "Merry Christmas",
      "Festive Cheer",
      "Wishing You Joy",
      "Peace and Warmth to You",
      "Season's Brightest Wishes",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#e74c3c",
      accentLight: "#f8d7da",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: [],
  },
  {
    id: "boxing-day",
    name: "Happy Boxing Day",
    date: "12-26",
    greetings: [
      "Happy Boxing Day",
      "Sharing the Joy",
      "Giving & Gratitude",
      "Boxing Day Cheer",
      "Warm Wishes After Christmas",
      "A Day for Giving Back",
    ],
    colors: {
      background: "#1a3a52",
      accent: "#27ae60",
      accentLight: "#d5f4e6",
      text: "#f5f1e8",
      textLight: "#d4a574",
    },
    regions: ["UK", "CA"],
  },
];
