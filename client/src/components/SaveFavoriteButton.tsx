/**
 * SaveFavoriteButton Component
 * 
 * Button to save/unsave a postcard as favorite
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { saveFavorite, removeFavorite, isFavorited } from '@/lib/favorites';
import { toast } from 'sonner';

interface SaveFavoriteButtonProps {
  holidayId: string;
  holidayName: string;
  greeting: string;
  decorElements: string[];
  region: 'US' | 'UK' | 'both';
  onSave?: () => void;
  onRemove?: () => void;
}

export function SaveFavoriteButton({
  holidayId,
  holidayName,
  greeting,
  decorElements,
  region,
  onSave,
  onRemove,
}: SaveFavoriteButtonProps) {
  const [isFav, setIsFav] = useState(
    isFavorited(holidayId, greeting, decorElements)
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async () => {
    setIsLoading(true);

    try {
      if (isFav) {
        // Remove from favorites
        // Find and remove the matching favorite
        const favorites = JSON.parse(
          localStorage.getItem('luckee_favorites') || '[]'
        );
        const filtered = favorites.filter(
          (fav: any) =>
            !(
              fav.holidayId === holidayId &&
              fav.greeting === greeting &&
              JSON.stringify(fav.decorElements) === JSON.stringify(decorElements)
            )
        );
        localStorage.setItem('luckee_favorites', JSON.stringify(filtered));
        
        setIsFav(false);
        toast.success('Removed from favorites');
        onRemove?.();
      } else {
        // Add to favorites
        saveFavorite(holidayId, holidayName, greeting, decorElements, region);
        setIsFav(true);
        toast.success('Added to favorites');
        onSave?.();
      }
    } catch (error) {
      toast.error('Failed to update favorites');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      size="sm"
      className="w-full"
      variant={isFav ? 'default' : 'outline'}
      style={
        isFav
          ? {
              backgroundColor: '#d84315',
              color: '#f5f1e8',
            }
          : {}
      }
    >
      <Heart
        className={`w-4 h-4 mr-2 ${isFav ? 'fill-current' : ''}`}
      />
      {isFav ? 'Saved' : 'Save to Favorites'}
    </Button>
  );
}
