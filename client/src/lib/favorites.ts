/**
 * Favorites Management Utility
 * 
 * Handles saving, loading, and managing favorite postcards using localStorage
 */

export interface FavoritePostcard {
  id: string;
  holidayId: string;
  holidayName: string;
  greeting: string;
  decorElements: string[];
  timestamp: number;
  region: 'US' | 'UK' | 'both';
}

const STORAGE_KEY = 'luckee_favorites';
const MAX_FAVORITES = 20;

/**
 * Get all saved favorites from localStorage
 */
export function getFavorites(): FavoritePostcard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const favorites = JSON.parse(stored) as FavoritePostcard[];
    // Sort by most recent first
    return favorites.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}

/**
 * Save a new favorite postcard
 */
export function saveFavorite(
  holidayId: string,
  holidayName: string,
  greeting: string,
  decorElements: string[],
  region: 'US' | 'UK' | 'both'
): FavoritePostcard {
  try {
    const favorites = getFavorites();
    
    // Create new favorite with unique ID
    const newFavorite: FavoritePostcard = {
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      holidayId,
      holidayName,
      greeting,
      decorElements,
      timestamp: Date.now(),
      region,
    };

    // Add to favorites and maintain max limit
    const updated = [newFavorite, ...favorites].slice(0, MAX_FAVORITES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    return newFavorite;
  } catch (error) {
    console.error('Error saving favorite:', error);
    throw error;
  }
}

/**
 * Remove a favorite by ID
 */
export function removeFavorite(favoriteId: string): void {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(fav => fav.id !== favoriteId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}

/**
 * Check if a postcard is already favorited
 */
export function isFavorited(
  holidayId: string,
  greeting: string,
  decorElements: string[]
): boolean {
  const favorites = getFavorites();
  return favorites.some(
    fav =>
      fav.holidayId === holidayId &&
      fav.greeting === greeting &&
      JSON.stringify(fav.decorElements) === JSON.stringify(decorElements)
  );
}

/**
 * Get favorite by ID
 */
export function getFavoriteById(favoriteId: string): FavoritePostcard | null {
  const favorites = getFavorites();
  return favorites.find(fav => fav.id === favoriteId) || null;
}

/**
 * Clear all favorites
 */
export function clearAllFavorites(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
    throw error;
  }
}

/**
 * Get count of saved favorites
 */
export function getFavoritesCount(): number {
  return getFavorites().length;
}

/**
 * Export favorites as JSON
 */
export function exportFavoritesAsJSON(): string {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
}

/**
 * Import favorites from JSON
 */
export function importFavoritesFromJSON(jsonString: string): void {
  try {
    const imported = JSON.parse(jsonString) as FavoritePostcard[];
    
    // Validate structure
    if (!Array.isArray(imported)) {
      throw new Error('Invalid favorites format');
    }

    const favorites = getFavorites();
    const merged = [...imported, ...favorites].slice(0, MAX_FAVORITES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (error) {
    console.error('Error importing favorites:', error);
    throw error;
  }
}
