import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface SaveFavoriteButtonProps {
  isFavorite: boolean;
  onSave: () => void;
  onRemove: () => void;
}

export function SaveFavoriteButton({
  isFavorite,
  onSave,
  onRemove,
}: SaveFavoriteButtonProps) {
  const handleToggleFavorite = () => {
    try {
      if (isFavorite) {
        onRemove();
        toast.success("Removed from favorites");
      } else {
        onSave();
        toast.success("Added to favorites!");
      }
    } catch (error) {
      toast.error("Failed to update favorites");
      console.error(
        "Favorites toggle error:",
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  return (
    <Button
      onClick={handleToggleFavorite}
      size="sm"
      className="w-full"
      variant={isFavorite ? "default" : "outline"}
      style={isFavorite ? { backgroundColor: "#b58b43", color: "#142f34" } : {}}
    >
      <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Saved" : "Save to Favorites"}
    </Button>
  );
}
