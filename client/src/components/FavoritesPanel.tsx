import { Button } from "@/components/ui/button";
import type { FavoritePostcard } from "@/lib/favorites";
import { getHolidayById } from "@/lib/holidays";
import { FolderOpen, Heart, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove favorite");
      console.error(
        "Error removing favorite:",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const handleSelectFavorite = (favorite: FavoritePostcard) => {
    onSelectFavorite(favorite);
    toast.success(`Loaded: ${favorite.greeting.substring(0, 30)}`);
  };

  if (favorites.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-md">
        <Heart className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <h3 className="mb-2 font-[Georgia,serif] text-lg font-semibold text-slate-700">
          No Favorites Yet
        </h3>
        <p className="font-[Georgia,serif] text-sm text-slate-600">
          Save your favorite postcards to access them quickly later.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4">
        <h3 className="flex items-center gap-2 font-[Georgia,serif] text-lg font-semibold text-slate-800">
          <Heart className="h-5 w-5 fill-current text-orange-500" />
          Saved Favorites ({favorites.length})
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close favorites"
            className="text-slate-500 transition-colors hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {favorites.map((favorite, index) => {
          const holidayName =
            getHolidayById(favorite.holidayId)?.name ?? "Unknown holiday";

          return (
            <div
              key={favorite.id}
              className={`border-b border-slate-100 p-4 transition-colors hover:bg-slate-50 ${
                index === favorites.length - 1 ? "border-b-0" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === favorite.id ? null : favorite.id
                      )
                    }
                    className="w-full text-left"
                  >
                    <p className="truncate text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600">
                      {favorite.greeting}
                    </p>
                    <p className="mt-1 font-[Georgia,serif] text-xs text-slate-500">
                      {holidayName} •{" "}
                      {new Date(favorite.timestamp).toLocaleDateString()}
                    </p>
                  </button>

                  {expandedId === favorite.id && (
                    <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleSelectFavorite(favorite)}
                          size="sm"
                          className="flex-1 text-xs"
                          style={{
                            backgroundColor: "#d84315",
                            color: "#f5f1e8",
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
                          <Trash2 className="mr-1 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleSelectFavorite(favorite)}
                    aria-label={`Load ${favorite.greeting}`}
                    className="rounded p-2 text-slate-500 transition-colors hover:bg-orange-50 hover:text-orange-600"
                    title="Load this postcard"
                  >
                    <FolderOpen className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    aria-label={`Remove ${favorite.greeting} from favorites`}
                    className="rounded p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Remove from favorites"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
