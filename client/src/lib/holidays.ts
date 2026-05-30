/**
 * Holiday Data Structure
 * 
 * Each holiday includes:
 * - name: Display name for the greeting
 * - date: MM-DD format for annual holidays (or special calculation for moveable holidays)
 * - greetings: Array of random greeting messages to choose from
 * - colors: Seasonal color palette (background, accent, text)
 * - decorElements: Description of botanical/decorative elements to render
 */

export interface Holiday {
  id: string;
  name: string;
  date: string; // MM-DD format
  dynamicDate?: HolidayDateRule;
  greetings: string[];
  colors: {
    background: string;
    accent: string;
    accentLight: string;
    text: string;
    textLight: string;
  };
  decorElements: string[];
  region: HolidayRegion;
}

export type CountryRegion = 'US' | 'UK' | 'CA';
export type AppRegion = CountryRegion | 'both';
export type HolidayRegion = AppRegion | CountryRegion[];
type HolidayDateRule =
  | 'easter'
  | 'third-monday-january'
  | 'third-monday-february'
  | 'monday-before-may-25'
  | 'last-monday-may'
  | 'first-monday-september'
  | 'second-monday-october'
  | 'fourth-thursday-november';

export const holidays: Holiday[] = [
  // Winter Holidays
  {
    id: 'new-year',
    name: 'Happy New Year',
    date: '01-01',
    greetings: [
      'Happy New Year',
      'Cheers to New Beginnings',
      'Welcome to a Fresh Start',
      'Here\'s to New Adventures',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'champagne-bottles',
      'confetti',
      'gold-ribbons',
      'clock-motif',
      'fireworks',
    ],
    region: 'both',
  },
  {
    id: 'valentines',
    name: 'Happy Valentine\'s Day',
    date: '02-14',
    greetings: [
      'Happy Valentine\'s Day',
      'Spreading Love & Cheer',
      'With Love & Appreciation',
      'Celebrating Connection',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'hearts',
      'roses',
      'love-birds',
      'cupid-arrows',
      'floral-vines',
    ],
    region: 'both',
  },
  {
    id: 'st-patricks',
    name: 'Happy St. Patrick\'s Day',
    date: '03-17',
    greetings: [
      'Happy St. Patrick\'s Day',
      'May Your Day Be Lucky',
      'Feeling Lucky',
      'Luck of the Irish',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#27ae60',
      accentLight: '#d5f4e6',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'shamrocks',
      'leprechaun-hat',
      'gold-coins',
      'rainbows',
      'clover-leaves',
    ],
    region: 'both',
  },
  {
    id: 'easter',
    name: 'Happy Easter',
    date: '03-31',
    dynamicDate: 'easter',
    greetings: [
      'Happy Easter',
      'Wishing You a Joyful Easter',
      'Spring Blessings',
      'Easter Joy & Renewal',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#f39c12',
      accentLight: '#fce4d6',
      text: '#1a3a52',
      textLight: '#7a9b8e',
    },
    decorElements: [
      'easter-eggs',
      'bunnies',
      'spring-flowers',
      'tulips',
      'chicks',
    ],
    region: 'both',
  },
  {
    id: 'mlk-day',
    name: 'Happy Martin Luther King Jr. Day',
    date: '01-15',
    dynamicDate: 'third-monday-january',
    greetings: [
      'Honoring Dr. King',
      'Celebrating Service & Hope',
      'Keeping the Dream Alive',
      'A Day of Purpose',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#1a3a52',
      accentLight: '#c9d8e3',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'stars',
      'floral-vines',
      'gold-ribbons',
      'light-rays',
      'confetti',
    ],
    region: 'US',
  },
  {
    id: 'family-day',
    name: 'Happy Family Day',
    date: '02-15',
    dynamicDate: 'third-monday-february',
    greetings: [
      'Happy Family Day',
      'Celebrating Time Together',
      'Warm Wishes to Your Family',
      'Together Is the Best Place',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#7a9b8e',
      accentLight: '#dbe7df',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'hearts',
      'floral-vines',
      'love-birds',
      'gold-ribbons',
      'spring-flowers',
    ],
    region: 'CA',
  },
  {
    id: 'presidents-day',
    name: 'Happy Presidents Day',
    date: '02-15',
    dynamicDate: 'third-monday-february',
    greetings: [
      'Happy Presidents Day',
      'Honoring Leadership',
      'A Day to Reflect & Remember',
      'Celebrating Civic Spirit',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'stars',
      'american-flag',
      'bunting',
      'gold-ribbons',
      'fireworks',
    ],
    region: 'US',
  },
  {
    id: 'victoria-day',
    name: 'Happy Victoria Day',
    date: '05-24',
    dynamicDate: 'monday-before-may-25',
    greetings: [
      'Happy Victoria Day',
      'Cheers to the Long Weekend',
      'Celebrating Spring in Canada',
      'Warm Victoria Day Wishes',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#c0392b',
      accentLight: '#f4d5d1',
      text: '#1a3a52',
      textLight: '#7a9b8e',
    },
    decorElements: [
      'fireworks',
      'maple-leaves',
      'spring-flowers',
      'gold-ribbons',
      'bunting',
    ],
    region: 'CA',
  },
  {
    id: 'memorial-day',
    name: 'Happy Memorial Day',
    date: '05-31',
    dynamicDate: 'last-monday-may',
    greetings: [
      'Remembering with Gratitude',
      'Honoring Memorial Day',
      'With Respect & Remembrance',
      'Grateful for Their Service',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'american-flag',
      'stars',
      'bunting',
      'gold-ribbons',
      'floral-vines',
    ],
    region: 'US',
  },
  {
    id: 'summer-solstice',
    name: 'Happy Summer Solstice',
    date: '06-21',
    greetings: [
      'Happy Summer Solstice',
      'Celebrating the Longest Day',
      'Bright Days Ahead',
      'Sunshine & Warmth',
    ],
    colors: {
      background: '#f9f3e6',
      accent: '#ff6b35',
      accentLight: '#ffe0cc',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'sun-rays',
      'sunflowers',
      'beach-elements',
      'summer-fruits',
      'light-rays',
    ],
    region: 'both',
  },
  {
    id: 'independence-day',
    name: 'Happy Independence Day',
    date: '07-04',
    greetings: [
      'Happy Independence Day',
      'Celebrating Freedom',
      'Land of the Free',
      'Stars & Stripes',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'fireworks',
      'american-flag',
      'stars',
      'bunting',
      'liberty-bell',
    ],
    region: 'US',
  },
  {
    id: 'juneteenth',
    name: 'Happy Juneteenth',
    date: '06-19',
    greetings: [
      'Happy Juneteenth',
      'Celebrating Freedom',
      'Honoring Liberation',
      'Joy, Freedom & Reflection',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#c0392b',
      accentLight: '#f4d5d1',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'stars',
      'sun-rays',
      'gold-ribbons',
      'confetti',
      'floral-vines',
    ],
    region: 'US',
  },
  {
    id: 'canada-day',
    name: 'Happy Canada Day',
    date: '07-01',
    greetings: [
      'Happy Canada Day',
      'Celebrating Canada',
      'True North Cheer',
      'Maple Leaf Wishes',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#d52b1e',
      accentLight: '#f6d4d0',
      text: '#1a3a52',
      textLight: '#d4a574',
    },
    decorElements: [
      'maple-leaves',
      'fireworks',
      'bunting',
      'stars',
      'confetti',
    ],
    region: 'CA',
  },
  {
    id: 'labor-day',
    name: 'Happy Labor Day',
    date: '09-01',
    dynamicDate: 'first-monday-september',
    greetings: [
      'Happy Labor Day',
      'Cheers to Hard Work',
      'Enjoy the Long Weekend',
      'Celebrating Every Contribution',
    ],
    colors: {
      background: '#f9f3e6',
      accent: '#d84315',
      accentLight: '#ffccbc',
      text: '#1a3a52',
      textLight: '#7a9b8e',
    },
    decorElements: [
      'sunflowers',
      'wheat',
      'gold-ribbons',
      'autumn-leaves',
      'confetti',
    ],
    region: 'US',
  },
  {
    id: 'labour-day',
    name: 'Happy Labour Day',
    date: '09-01',
    dynamicDate: 'first-monday-september',
    greetings: [
      'Happy Labour Day',
      'Cheers to Hard Work',
      'Enjoy the Long Weekend',
      'Celebrating Every Contribution',
    ],
    colors: {
      background: '#f9f3e6',
      accent: '#d84315',
      accentLight: '#ffccbc',
      text: '#1a3a52',
      textLight: '#7a9b8e',
    },
    decorElements: [
      'sunflowers',
      'wheat',
      'gold-ribbons',
      'autumn-leaves',
      'confetti',
    ],
    region: 'CA',
  },
  {
    id: 'truth-and-reconciliation-day',
    name: 'National Day for Truth and Reconciliation',
    date: '09-30',
    greetings: [
      'Truth, Reflection & Reconciliation',
      'Honoring Truth and Reconciliation',
      'A Day for Listening',
      'Remembering Every Child',
    ],
    colors: {
      background: '#f9f3e6',
      accent: '#ff6b35',
      accentLight: '#ffe0cc',
      text: '#1a3a52',
      textLight: '#7a9b8e',
    },
    decorElements: [
      'floral-vines',
      'sun-rays',
      'autumn-leaves',
      'gold-ribbons',
      'light-rays',
    ],
    region: 'CA',
  },
  {
    id: 'canadian-thanksgiving',
    name: 'Happy Thanksgiving',
    date: '10-08',
    dynamicDate: 'second-monday-october',
    greetings: [
      'Happy Thanksgiving',
      'Grateful for You',
      'Thankful & Blessed',
      'Harvest Gratitude',
    ],
    colors: {
      background: '#5d4037',
      accent: '#d84315',
      accentLight: '#ffccbc',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'cornucopia',
      'autumn-leaves',
      'pumpkins',
      'wheat',
      'maple-leaves',
    ],
    region: 'CA',
  },
  {
    id: 'halloween',
    name: 'Happy Halloween',
    date: '10-31',
    greetings: [
      'Happy Halloween',
      'Spooky Season',
      'Trick or Treat',
      'Boo!',
    ],
    colors: {
      background: '#2c1810',
      accent: '#ff6b35',
      accentLight: '#ffe0cc',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'pumpkins',
      'ghosts',
      'bats',
      'spiderwebs',
      'witches-hat',
    ],
    region: 'both',
  },
  {
    id: 'thanksgiving',
    name: 'Happy Thanksgiving',
    date: '11-23',
    dynamicDate: 'fourth-thursday-november',
    greetings: [
      'Happy Thanksgiving',
      'Grateful for You',
      'Thankful & Blessed',
      'Gratitude & Joy',
    ],
    colors: {
      background: '#5d4037',
      accent: '#d84315',
      accentLight: '#ffccbc',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'turkey',
      'cornucopia',
      'autumn-leaves',
      'pumpkins',
      'wheat',
    ],
    region: 'US',
  },
  {
    id: 'veterans-day',
    name: 'Happy Veterans Day',
    date: '11-11',
    greetings: [
      'Honoring Veterans',
      'With Gratitude for Your Service',
      'Happy Veterans Day',
      'Remembering Courage & Service',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'american-flag',
      'stars',
      'gold-ribbons',
      'floral-vines',
      'bunting',
    ],
    region: 'US',
  },
  {
    id: 'remembrance-day',
    name: 'Remembrance Day',
    date: '11-11',
    greetings: [
      'Remembering with Gratitude',
      'Lest We Forget',
      'Honoring Service & Sacrifice',
      'With Respect & Remembrance',
    ],
    colors: {
      background: '#f5f1e8',
      accent: '#c0392b',
      accentLight: '#f4d5d1',
      text: '#1a3a52',
      textLight: '#7a9b8e',
    },
    decorElements: [
      'floral-vines',
      'gold-ribbons',
      'maple-leaves',
      'autumn-leaves',
      'stars',
    ],
    region: 'CA',
  },
  {
    id: 'christmas',
    name: 'Happy Holidays',
    date: '12-25',
    greetings: [
      'Happy Holidays',
      'Merry Christmas',
      'Festive Cheer',
      'Wishing You Joy',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#e74c3c',
      accentLight: '#f8d7da',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'pine-branches',
      'holly-berries',
      'ornaments',
      'snowflakes',
      'candy-canes',
    ],
    region: 'both',
  },
  {
    id: 'boxing-day',
    name: 'Happy Boxing Day',
    date: '12-26',
    greetings: [
      'Happy Boxing Day',
      'Sharing the Joy',
      'Giving & Gratitude',
      'Boxing Day Cheer',
    ],
    colors: {
      background: '#1a3a52',
      accent: '#27ae60',
      accentLight: '#d5f4e6',
      text: '#f5f1e8',
      textLight: '#d4a574',
    },
    decorElements: [
      'gift-boxes',
      'ribbons',
      'holly',
      'winter-berries',
      'festive-patterns',
    ],
    region: ['UK', 'CA'],
  },
];

/**
 * Get the current or next holiday based on today's date
 * Returns the holiday closest to today (past or future within the year)
 */
export function getCurrentOrNextHoliday(userRegion: AppRegion = 'both'): Holiday {
  const today = new Date();
  const relevantHolidays = getHolidaysByRegion(userRegion);

  // Find the next holiday
  let nextHoliday = relevantHolidays.find(
    (h) => getHolidayDateForYear(h, today.getFullYear()) >= startOfDay(today)
  );

  // If no holiday found this year, get the first one from next year
  if (!nextHoliday) {
    nextHoliday = relevantHolidays[0];
  }

  return nextHoliday;
}

/**
 * Get a random greeting from a holiday
 */
export function getRandomGreeting(holiday: Holiday): string {
  return holiday.greetings[Math.floor(Math.random() * holiday.greetings.length)];
}

/**
 * Get random decor elements for a holiday
 */
export function getRandomDecorElements(holiday: Holiday, count: number = 3): string[] {
  const shuffled = [...holiday.decorElements].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get the next holiday in sequence based on current holiday and region
 */
export function getNextHoliday(currentHoliday: Holiday, userRegion: AppRegion = 'both'): Holiday {
  const relevantHolidays = getHolidaysByRegion(userRegion);

  const currentIndex = relevantHolidays.findIndex((h) => h.id === currentHoliday.id);
  
  if (currentIndex === -1) {
    return relevantHolidays[0];
  }

  // Get next holiday, wrap around to first if at the end
  const nextIndex = (currentIndex + 1) % relevantHolidays.length;
  return relevantHolidays[nextIndex];
}

/**
 * Get the previous holiday in sequence based on current holiday and region
 */
export function getPreviousHoliday(currentHoliday: Holiday, userRegion: AppRegion = 'both'): Holiday {
  const relevantHolidays = getHolidaysByRegion(userRegion);

  const currentIndex = relevantHolidays.findIndex((h) => h.id === currentHoliday.id);
  
  if (currentIndex === -1) {
    return relevantHolidays[relevantHolidays.length - 1];
  }

  // Get previous holiday, wrap around to last if at the beginning
  const previousIndex = (currentIndex - 1 + relevantHolidays.length) % relevantHolidays.length;
  return relevantHolidays[previousIndex];
}

/**
 * Get all holidays filtered by region
 */
export function getHolidaysByRegion(userRegion: AppRegion = 'both'): Holiday[] {
  const year = new Date().getFullYear();

  return holidays
    .filter((holiday) => holidayMatchesRegion(holiday, userRegion))
    .sort(
      (a, b) =>
        getHolidayDateForYear(a, year).getTime() -
        getHolidayDateForYear(b, year).getTime()
    );
}

export function getHolidayById(holidayId: string): Holiday | undefined {
  return holidays.find((holiday) => holiday.id === holidayId);
}

export function getHolidayDateString(holiday: Holiday, year = new Date().getFullYear()): string {
  const date = getHolidayDateForYear(holiday, year);
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function holidayMatchesRegion(holiday: Holiday, userRegion: AppRegion): boolean {
  if (userRegion === 'both' || holiday.region === 'both') {
    return true;
  }

  return Array.isArray(holiday.region)
    ? holiday.region.includes(userRegion)
    : holiday.region === userRegion;
}

function getHolidayDateForYear(holiday: Holiday, year: number): Date {
  switch (holiday.dynamicDate) {
    case 'easter':
      return getEasterDate(year);
    case 'third-monday-january':
      return getNthWeekdayOfMonth(year, 0, 1, 3);
    case 'third-monday-february':
      return getNthWeekdayOfMonth(year, 1, 1, 3);
    case 'monday-before-may-25':
      return getMondayBeforeMay25(year);
    case 'last-monday-may':
      return getLastWeekdayOfMonth(year, 4, 1);
    case 'first-monday-september':
      return getNthWeekdayOfMonth(year, 8, 1, 1);
    case 'second-monday-october':
      return getNthWeekdayOfMonth(year, 9, 1, 2);
    case 'fourth-thursday-november':
      return getNthWeekdayOfMonth(year, 10, 4, 4);
    default: {
      const [month, day] = holiday.date.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
  }
}

function getNthWeekdayOfMonth(year: number, monthIndex: number, weekday: number, nth: number): Date {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const offset = (weekday - firstOfMonth.getDay() + 7) % 7;
  return new Date(year, monthIndex, 1 + offset + (nth - 1) * 7);
}

function getLastWeekdayOfMonth(year: number, monthIndex: number, weekday: number): Date {
  const lastOfMonth = new Date(year, monthIndex + 1, 0);
  const offset = (lastOfMonth.getDay() - weekday + 7) % 7;
  return new Date(year, monthIndex, lastOfMonth.getDate() - offset);
}

function getMondayBeforeMay25(year: number): Date {
  const may24 = new Date(year, 4, 24);
  const offset = (may24.getDay() - 1 + 7) % 7;
  return new Date(year, 4, may24.getDate() - offset);
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
