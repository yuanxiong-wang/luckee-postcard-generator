/**
 * Holiday Background Images
 * 
 * Maps each holiday to its unique background image
 */

export const holidayBackgrounds: Record<string, string> = {
  // Winter holidays
  'new-year': '/holiday-backgrounds/new-year.webp',
  'christmas': '/holiday-backgrounds/christmas.webp',
  'boxing-day': '/holiday-backgrounds/boxing-day.webp',
  'mlk-day': '/holiday-backgrounds/new-year.webp',
  
  // Spring holidays
  'valentines': '/holiday-backgrounds/valentines.webp',
  'st-patricks': '/holiday-backgrounds/st-patricks.webp',
  'easter': '/holiday-backgrounds/easter.webp',
  'family-day': '/holiday-backgrounds/valentines.webp',
  'presidents-day': '/holiday-backgrounds/independence-day.webp',
  'victoria-day': '/holiday-backgrounds/summer-solstice.webp',
  'memorial-day': '/holiday-backgrounds/independence-day.webp',
  
  // Summer holidays
  'summer-solstice': '/holiday-backgrounds/summer-solstice.webp',
  'independence-day': '/holiday-backgrounds/independence-day.webp',
  'juneteenth': '/holiday-backgrounds/summer-solstice.webp',
  'canada-day': '/holiday-backgrounds/independence-day.webp',
  
  // Fall holidays
  'halloween': '/holiday-backgrounds/halloween.webp',
  'thanksgiving': '/holiday-backgrounds/thanksgiving.webp',
  'labor-day': '/holiday-backgrounds/thanksgiving.webp',
  'labour-day': '/holiday-backgrounds/thanksgiving.webp',
  'truth-and-reconciliation-day': '/holiday-backgrounds/summer-solstice.webp',
  'canadian-thanksgiving': '/holiday-backgrounds/thanksgiving.webp',
  'veterans-day': '/holiday-backgrounds/independence-day.webp',
  'remembrance-day': '/holiday-backgrounds/thanksgiving.webp',
};

/**
 * Get background image URL for a specific holiday
 */
export function getBackgroundForHoliday(holidayId: string): string {
  return holidayBackgrounds[holidayId] || holidayBackgrounds['easter']; // Default fallback
}
