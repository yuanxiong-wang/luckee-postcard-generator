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
  greetings: string[];
  colors: {
    background: string;
    accent: string;
    accentLight: string;
    text: string;
    textLight: string;
  };
  decorElements: string[];
  region: 'US' | 'UK' | 'both';
}

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
    date: 'moveable', // Easter calculation needed
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
    date: '11-23', // 4th Thursday of November (approximate)
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
    region: 'UK',
  },
];

/**
 * Get the current or next holiday based on today's date
 * Returns the holiday closest to today (past or future within the year)
 */
export function getCurrentOrNextHoliday(userRegion: 'US' | 'UK' | 'both' = 'both'): Holiday {
  const today = new Date();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');
  const currentDateStr = `${currentMonth}-${currentDay}`;

  // Filter holidays by region
  const relevantHolidays = holidays.filter(
    (h) => h.region === userRegion || h.region === 'both'
  );

  // Find the next holiday
  let nextHoliday = relevantHolidays.find((h) => h.date >= currentDateStr);

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
