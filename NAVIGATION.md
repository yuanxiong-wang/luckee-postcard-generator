# Luckee Postcard Generator - Holiday Navigation

## Overview

The holiday navigation feature allows users to browse through all available holidays in chronological order, making it easy to explore different seasonal greetings without needing to generate random postcards.

---

## Features

### Browse Holidays
- **Next Button:** Navigate to the next holiday in sequence
- **Previous Button:** Navigate to the previous holiday in sequence
- **Wrap-Around:** Automatically cycles from the last holiday back to the first, and vice versa
- **Current Display:** Shows which holiday is currently being viewed
- **Region-Aware:** Navigation respects the selected region (US, UK, or Both)

### Navigation Behavior

**Forward Navigation:**
- Clicking "Next" moves to the next holiday in the filtered list
- When at the last holiday, clicking "Next" wraps to the first holiday
- Smooth transition with new greeting and decorative elements

**Backward Navigation:**
- Clicking "Previous" moves to the previous holiday in the filtered list
- When at the first holiday, clicking "Previous" wraps to the last holiday
- Maintains consistent user experience with forward navigation

**Region Filtering:**
- Navigation respects the currently selected region
- Changing regions updates the available holidays to navigate through
- US-only holidays are excluded when "UK Only" is selected
- UK-only holidays are excluded when "US Only" is selected

---

## How to Use

### Navigate Between Holidays

1. **View Next Holiday:**
   - Click the **"Next"** button in the "Browse Holidays" section
   - Postcard updates with the next holiday's greeting and decorations
   - Holiday name updates in the display

2. **View Previous Holiday:**
   - Click the **"Previous"** button in the "Browse Holidays" section
   - Postcard updates with the previous holiday's greeting and decorations
   - Holiday name updates in the display

3. **Change Region and Navigate:**
   - Select a different region from the "Select Region" dropdown
   - Navigation buttons now cycle through holidays for that region
   - Example: Selecting "US Only" excludes Boxing Day (UK-only)

### Combining with Other Features

**With Favorites:**
- Navigate to a holiday you like
- Click "Save to Favorites" to save it
- Continue navigating to find more favorites

**With Message Editing:**
- Navigate to a holiday
- Click "Edit Message" to customize the greeting
- Save your custom greeting
- Continue navigating to other holidays

**With Export/Sharing:**
- Navigate to a holiday
- Download as PNG or PDF
- Share on LinkedIn or Facebook
- Continue navigating to other holidays

---

## Available Holidays

### Both US & UK
- New Year (January 1)
- Valentine's Day (February 14)
- St. Patrick's Day (March 17)
- Easter (moveable)
- Summer Solstice (June 21)
- Halloween (October 31)
- Christmas (December 25)

### US Only
- Independence Day (July 4)
- Thanksgiving (November 23)

### UK Only
- Boxing Day (December 26)

**Total:** 10 holidays across both regions

---

## Technical Implementation

### Navigation Functions

**getNextHoliday()**
```typescript
export function getNextHoliday(
  currentHoliday: Holiday, 
  userRegion: 'US' | 'UK' | 'both' = 'both'
): Holiday
```
- Returns the next holiday in the filtered list
- Wraps around to the first holiday if at the end
- Filters by region before determining next

**getPreviousHoliday()**
```typescript
export function getPreviousHoliday(
  currentHoliday: Holiday, 
  userRegion: 'US' | 'UK' | 'both' = 'both'
): Holiday
```
- Returns the previous holiday in the filtered list
- Wraps around to the last holiday if at the beginning
- Filters by region before determining previous

**getHolidaysByRegion()**
```typescript
export function getHolidaysByRegion(
  userRegion: 'US' | 'UK' | 'both' = 'both'
): Holiday[]
```
- Returns all holidays filtered by the specified region
- Used internally for navigation calculations

### HolidayNavigation Component

**Props:**
```typescript
interface HolidayNavigationProps {
  currentHoliday: Holiday;      // Currently displayed holiday
  onNext: () => void;            // Callback for next button
  onPrevious: () => void;        // Callback for previous button
  disabled?: boolean;            // Disable buttons during transitions
}
```

**Features:**
- Previous and Next buttons with chevron icons
- Current holiday display
- Disabled state during postcard generation
- Responsive design for mobile and desktop

---

## User Experience

### Navigation Flow

```
User clicks "Next" or "Previous"
         ↓
Handler calls getNextHoliday() or getPreviousHoliday()
         ↓
New holiday is retrieved (respecting region filter)
         ↓
Postcard state updates with:
  - New holiday object
  - Random greeting from new holiday
  - Random decorative elements
         ↓
UI re-renders with new postcard
         ↓
Navigation display shows new holiday name
```

### Smooth Transitions

- Brief opacity and scale animation during postcard generation
- Buttons are disabled during transition to prevent rapid clicking
- New greeting and decorations load smoothly

### Accessibility

- Buttons have descriptive titles ("View next holiday", "View previous holiday")
- Clear visual feedback on current holiday
- Keyboard accessible (buttons can be focused and activated)
- Screen reader friendly labels

---

## Edge Cases

**Single Holiday Region:**
- If a region has only one holiday, Next and Previous both show the same holiday
- Navigation is still functional but doesn't change the display

**Region Change During Navigation:**
- Changing regions immediately updates the available holidays
- If current holiday is not available in new region, closest alternative is shown
- Navigation continues smoothly with new region's holidays

**Rapid Clicking:**
- Buttons are disabled during postcard generation
- Prevents rapid navigation that could cause visual glitches
- Provides clear feedback that action is processing

---

## Performance Considerations

**Optimization:**
- Navigation functions are pure and have no side effects
- Holiday filtering is cached when region is unchanged
- Minimal re-renders with React hooks
- No API calls or external data fetches

**Efficiency:**
- Holiday list is pre-defined (10 holidays total)
- Navigation is O(n) where n = number of holidays (10)
- Instant response to user interactions

---

## Future Enhancements

- **Holiday Calendar:** Visual calendar showing all holidays in the year
- **Jump to Holiday:** Dropdown to select any holiday directly
- **Holiday Info:** Display holiday date, history, and traditions
- **Custom Holiday Order:** Allow users to reorder holidays
- **Keyboard Shortcuts:** Arrow keys for navigation
- **Holiday Countdown:** Show days until next holiday
- **Holiday Search:** Search by holiday name or date

---

## Testing Checklist

- [ ] Next button navigates to next holiday
- [ ] Previous button navigates to previous holiday
- [ ] Navigation wraps around at start and end
- [ ] Region filter affects available holidays
- [ ] Changing region updates navigation
- [ ] Current holiday display updates correctly
- [ ] Buttons disabled during postcard generation
- [ ] Smooth transitions between holidays
- [ ] Works on mobile devices
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes

---

## Troubleshooting

**Navigation Not Working:**
- Refresh the page
- Check browser console for errors
- Verify JavaScript is enabled

**Wrong Holiday Displayed:**
- Check selected region matches expected holidays
- Verify holiday data in `lib/holidays.ts`

**Buttons Appear Disabled:**
- Wait for postcard generation to complete
- Check if browser is processing heavy animation

---

## Support

For issues or questions about holiday navigation, please contact the development team.
