/**
 * Holiday Background Images
 * 
 * Maps holiday seasons to their corresponding background images
 */

export const holidayBackgrounds: Record<string, string> = {
  // Winter holidays (New Year, Christmas, Boxing Day)
  winter: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/postcard-winter-holiday-DbtdfQiaSfkEikAn3ZDUKG.webp',
  
  // Spring holidays (Valentine's, St. Patrick's, Easter)
  spring: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/postcard-spring-holiday-Fq3BWLWTWesGFc5EsCKD5F.webp',
  
  // Summer holidays (Summer Solstice, Independence Day)
  summer: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/postcard-summer-holiday-dQ9fkKJ4Z3ZtduiDiCApsa.webp',
  
  // Fall holidays (Halloween, Thanksgiving)
  fall: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/postcard-fall-holiday-ZnC73KykjdEr9J2b4Pw37L.webp',
};

/**
 * Get the season for a given holiday ID
 */
export function getSeasonForHoliday(holidayId: string): string {
  switch (holidayId) {
    case 'new-year':
    case 'christmas':
    case 'boxing-day':
      return 'winter';
    case 'valentines':
    case 'st-patricks':
    case 'easter':
      return 'spring';
    case 'summer-solstice':
    case 'independence-day':
      return 'summer';
    case 'halloween':
    case 'thanksgiving':
      return 'fall';
    default:
      return 'spring'; // Default fallback
  }
}

/**
 * Get background image URL for a holiday
 */
export function getBackgroundForHoliday(holidayId: string): string {
  const season = getSeasonForHoliday(holidayId);
  return holidayBackgrounds[season] || holidayBackgrounds.spring;
}
