/**
 * FavoritesPanel Component
 * 
 * Displays saved favorite postcards with quick access and management options
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, X, Trash2, Download } from 'lucide-react';
import { FavoritePostcard } from '@/lib/favorites';
import { toast } from 'sonner';
import {
  downloadPostcardAsPNG,
  downloadPostcardAsPDF,
} from '@/lib/postcard-export';

interface FavoritesPanelProps {
  favorites: FavoritePostcard[];
  onSelectFavorite: (favorite: FavoritePostcard) => void;
  onRemoveFavorite: (favoriteId: string) => void;
  onClose?: () => void;
}

export function FavoritesPanel({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
  onClose,
}: FavoritesPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleRemoveFavorite = (favoriteId: string) => {
    try {
      onRemoveFavorite(favoriteId);
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove favorite');
      console.error(error);
    }
  };

  const handleSelectFavorite = (favorite: FavoritePostcard) => {
    onSelectFavorite(favorite);
    toast.success(`Loaded: ${favorite.greeting.substring(0, 30)}...`);
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3
          className="text-lg font-semibold text-slate-700 mb-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          No Favorites Yet
        </h3>
        <p className="text-sm text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
          Save your favorite postcards to access them quickly later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
        <h3
          className="text-lg font-semibold text-slate-800 flex items-center gap-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <Heart className="w-5 h-5 text-orange-500 fill-current" />
          Saved Favorites ({favorites.length})
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {favorites.map((favorite, index) => (
          <div
            key={favorite.id}
            className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
              index === favorites.length - 1 ? 'border-b-0' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setExpandedId(expandedId === favorite.id ? null : favorite.id)}
                  className="text-left w-full"
                >
                  <p
                    className="font-semibold text-slate-700 text-sm hover:text-orange-600 transition-colors truncate"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {favorite.greeting}
                  </p>
                  <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'Georgia, serif' }}>
                    {favorite.holidayName} • {new Date(favorite.timestamp).toLocaleDateString()}
                  </p>
                </button>

                {/* Expanded view */}
                {expandedId === favorite.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {favorite.decorElements.map((element, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                        >
                          {element.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleSelectFavorite(favorite)}
                        size="sm"
                        className="flex-1 text-xs"
                        style={{
                          backgroundColor: '#d84315',
                          color: '#f5f1e8',
                        }}
                      >
                        Load
                      </Button>
                      <Button
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="flex gap-1">
                <button
                  onClick={() => handleSelectFavorite(favorite)}
                  className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                  title="Load this postcard"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove from favorites"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-600 text-center" style={{ fontFamily: 'Georgia, serif' }}>
          Click on a favorite to expand options
        </div>
      )}
    </div>
  );
}
