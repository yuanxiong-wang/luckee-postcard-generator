# Luckee Postcard Generator - Favorites System

## Overview

The favorites system allows users to save and manage their preferred postcard designs using browser local storage. Users can quickly access saved postcards, manage their collection, and organize their favorite greetings.

---

## Features

### Save to Favorites
- **One-Click Saving:** Click the "Save to Favorites" button to save the current postcard
- **Smart Detection:** Button shows "Saved" when the postcard is already favorited
- **Instant Feedback:** Toast notifications confirm save/remove actions
- **Maximum Limit:** Up to 20 favorites can be stored (oldest are replaced when limit is reached)

### Favorites Panel
- **View All Favorites:** Click "View Favorites (n)" to see all saved postcards
- **Quick Preview:** See greeting text, holiday name, and save date for each favorite
- **Expandable Details:** Click a favorite to expand and see decorative elements
- **Quick Actions:** Load, delete, or remove favorites directly from the panel
- **Empty State:** Helpful message when no favorites are saved yet

### Load Favorites
- **One-Click Loading:** Click "Load" to instantly load a saved postcard
- **Automatic Updates:** Region and holiday automatically switch to match the favorite
- **Seamless Integration:** Loaded postcards can be edited, shared, and downloaded

### Manage Favorites
- **Delete Favorites:** Remove individual favorites from the panel
- **Quick Remove:** Use the X button for quick removal
- **Batch Management:** View all favorites in one organized panel
- **Persistent Storage:** Favorites persist across browser sessions

---

## How to Use

### Saving a Postcard

1. Generate or customize a postcard you like
2. Click the **"Save to Favorites"** button in the sidebar
3. Button changes to show **"Saved"** with a filled heart icon
4. Toast notification confirms the save

### Viewing Saved Favorites

1. After saving at least one postcard, a **"View Favorites (n)"** button appears
2. Click it to open the Favorites Panel
3. All saved postcards are displayed with:
   - Greeting text (truncated)
   - Holiday name
   - Save date
   - Quick action buttons

### Loading a Favorite

**Method 1: From the Favorites Panel**
1. Click "View Favorites" button
2. Click the **"Load"** button on any favorite
3. Postcard loads with all original settings
4. Panel automatically closes

**Method 2: Quick Load**
1. Click the download icon on any favorite in the panel
2. Postcard instantly loads

### Removing a Favorite

**Method 1: From Favorites Panel**
1. Click "View Favorites"
2. Click the **"Delete"** or **X** button on any favorite
3. Confirm removal

**Method 2: From Current Postcard**
1. Click "Save to Favorites" button when viewing a saved postcard
2. Button shows "Saved" - click it again to unsave
3. Confirmation toast appears

### Expanding Favorite Details

1. Click on a favorite in the panel to expand it
2. View all decorative elements as tags
3. See "Load" and "Delete" action buttons
4. Click again to collapse

---

## Data Structure

### FavoritePostcard Interface

```typescript
interface FavoritePostcard {
  id: string;                    // Unique identifier (timestamp + random)
  holidayId: string;             // Holiday ID (e.g., 'easter')
  holidayName: string;           // Holiday display name (e.g., 'Happy Easter')
  greeting: string;              // Custom greeting message
  decorElements: string[];       // Array of decorative element IDs
  timestamp: number;             // Save time (milliseconds)
  region: 'US' | 'UK' | 'both'; // Selected region
}
```

### Local Storage

- **Storage Key:** `luckee_favorites`
- **Format:** JSON array of FavoritePostcard objects
- **Size:** Typically 2-5 KB per favorite
- **Limit:** 20 favorites maximum

---

## Technical Implementation

### Utilities Module: `lib/favorites.ts`

**Core Functions:**
- `getFavorites()` - Retrieve all saved favorites
- `saveFavorite()` - Save a new favorite
- `removeFavorite()` - Delete a favorite by ID
- `isFavorited()` - Check if a postcard is favorited
- `getFavoritesCount()` - Get total number of favorites
- `clearAllFavorites()` - Clear all saved favorites
- `exportFavoritesAsJSON()` - Export as JSON
- `importFavoritesFromJSON()` - Import from JSON

### Custom Hook: `hooks/useFavorites.ts`

**State Management:**
- Manages favorites state and count
- Provides callbacks for add/remove operations
- Automatically updates UI when favorites change
- Handles error cases gracefully

**Hook API:**
```typescript
const {
  favorites,           // Array of FavoritePostcard objects
  count,              // Number of saved favorites
  addFavorite,        // Function to save a new favorite
  removeFavorite,     // Function to delete a favorite
  isFavorited,        // Function to check if favorited
} = useFavorites();
```

### Components

**SaveFavoriteButton.tsx**
- Toggle button to save/unsave current postcard
- Visual feedback with filled/outline heart icon
- Toast notifications for user feedback
- Handles duplicate detection

**FavoritesPanel.tsx**
- Displays all saved favorites in a scrollable list
- Expandable details for each favorite
- Quick action buttons (Load, Delete)
- Empty state message
- Responsive design

---

## Browser Compatibility

- **Chrome/Chromium:** Full support
- **Firefox:** Full support
- **Safari:** Full support
- **Edge:** Full support
- **Mobile Browsers:** Full support with responsive UI

### LocalStorage Requirements

- Minimum 5 MB storage (typically available)
- No special permissions required
- Data persists across sessions
- Cleared when browser cache is cleared

---

## User Experience Flow

```
User generates postcard
         ↓
    [Save to Favorites] button appears
         ↓
    User clicks button
         ↓
    Postcard saved to localStorage
    Button changes to "Saved"
    Toast notification shown
         ↓
    [View Favorites (n)] button appears
         ↓
    User can:
    ├─ Load saved postcards
    ├─ View favorite details
    ├─ Delete favorites
    └─ Continue editing/sharing
```

---

## Error Handling

**Storage Errors:**
- If localStorage is unavailable, graceful fallback occurs
- Error messages logged to console
- User receives toast notification

**Data Validation:**
- Invalid data is skipped during import
- Corrupted entries are ignored
- Maximum 20 favorites enforced

**Duplicate Prevention:**
- Checks for exact matches (holiday + greeting + elements)
- Prevents duplicate saves
- Allows same greeting for different holidays

---

## Performance Considerations

**Optimization:**
- Lazy loading of favorites panel
- Efficient localStorage queries
- Minimal re-renders with React hooks
- Sorted by most recent first

**Storage Efficiency:**
- Compact JSON format
- Typical size: 200-500 bytes per favorite
- 20 favorites ≈ 4-10 KB total

---

## Future Enhancements

- **Cloud Sync:** Sync favorites across devices
- **Export/Import:** Download and upload favorites as files
- **Sharing:** Share favorite collections with others
- **Tags:** Organize favorites with custom tags
- **Search:** Filter favorites by holiday or text
- **Analytics:** Track most-saved postcards
- **Backup:** Automatic backup to cloud storage
- **Collections:** Group related favorites together

---

## API Reference

### useFavorites Hook

```typescript
// Get all favorites
const { favorites } = useFavorites();

// Add a favorite
const { addFavorite } = useFavorites();
const newFav = addFavorite(
  'easter',
  'Happy Easter',
  'Spring Blessings',
  ['easter-eggs', 'bunnies'],
  'both'
);

// Remove a favorite
const { removeFavorite } = useFavorites();
removeFavorite('fav_1234567890_abc123');

// Check if favorited
const { isFavorited } = useFavorites();
const isSaved = isFavorited('easter', 'Spring Blessings', ['easter-eggs', 'bunnies']);
```

### Direct Utilities

```typescript
import { saveFavorite, removeFavorite, getFavorites } from '@/lib/favorites';

// Save directly
const favorite = saveFavorite('easter', 'Happy Easter', 'Spring Blessings', [...], 'both');

// Get all
const all = getFavorites();

// Remove
removeFavorite('fav_1234567890_abc123');
```

---

## Testing Checklist

- [ ] Save a postcard to favorites
- [ ] Button changes to "Saved" state
- [ ] Toast notification appears
- [ ] View Favorites button appears
- [ ] Open Favorites Panel
- [ ] Expand favorite details
- [ ] Load a favorite postcard
- [ ] Delete a favorite
- [ ] Verify data persists after page refresh
- [ ] Test with multiple favorites
- [ ] Test on mobile devices
- [ ] Test with localStorage disabled (graceful fallback)

---

## Troubleshooting

**Favorites Not Saving:**
- Check browser localStorage is enabled
- Verify browser storage quota not exceeded
- Clear browser cache and try again

**Favorites Not Loading:**
- Refresh the page
- Clear browser cache
- Check browser console for errors

**Favorites Disappeared:**
- Check if browser cache was cleared
- Verify localStorage is enabled
- Check browser storage settings

---

## Support

For issues or questions about the favorites system, please contact the development team.
