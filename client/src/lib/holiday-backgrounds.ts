/**
 * Holiday Background Images
 * 
 * Maps each holiday to its unique background image
 */

export const holidayBackgrounds: Record<string, string> = {
  // Winter holidays
  'new-year': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-new-year-TiorbwW2cyKbeUJ4ud9NtD.webp',
  'christmas': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-christmas-n8mwEtcsBpB4SMmxz2yBtE.webp',
  'boxing-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-boxing-day-akAKtd6xfRRvkE75rM7Xw3.webp',
  'mlk-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-new-year-TiorbwW2cyKbeUJ4ud9NtD.webp',
  
  // Spring holidays
  'valentines': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-valentines-GpKKaaK3DwhHdJrgXXbnA6.webp',
  'st-patricks': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-st-patricks-nTcMLkC4xt6bwKqyakwvH8.webp',
  'easter': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-easter-UWEk6C7bEh8Tw4sfukaAev.webp',
  'family-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-valentines-GpKKaaK3DwhHdJrgXXbnA6.webp',
  'presidents-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-independence-day-BgMMBHFVGyXpiQcW63y5rg.webp',
  'victoria-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-summer-solstice-guUuNm6VpcsNHaAAAZDESD.webp',
  'memorial-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-independence-day-BgMMBHFVGyXpiQcW63y5rg.webp',
  
  // Summer holidays
  'summer-solstice': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-summer-solstice-guUuNm6VpcsNHaAAAZDESD.webp',
  'independence-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-independence-day-BgMMBHFVGyXpiQcW63y5rg.webp',
  'juneteenth': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-summer-solstice-guUuNm6VpcsNHaAAAZDESD.webp',
  'canada-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-independence-day-BgMMBHFVGyXpiQcW63y5rg.webp',
  
  // Fall holidays
  'halloween': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-halloween-Fnm4JebyhPjGfm6CkK5XKX.webp',
  'thanksgiving': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-thanksgiving-S22JbTMRXVifR7somdwmof.webp',
  'labor-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-thanksgiving-S22JbTMRXVifR7somdwmof.webp',
  'labour-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-thanksgiving-S22JbTMRXVifR7somdwmof.webp',
  'truth-and-reconciliation-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-summer-solstice-guUuNm6VpcsNHaAAAZDESD.webp',
  'canadian-thanksgiving': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-thanksgiving-S22JbTMRXVifR7somdwmof.webp',
  'veterans-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-independence-day-BgMMBHFVGyXpiQcW63y5rg.webp',
  'remembrance-day': 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030129359/JuoqfumrvRLnfobo4t377m/holiday-thanksgiving-S22JbTMRXVifR7somdwmof.webp',
};

/**
 * Get background image URL for a specific holiday
 */
export function getBackgroundForHoliday(holidayId: string): string {
  return holidayBackgrounds[holidayId] || holidayBackgrounds['easter']; // Default fallback
}
