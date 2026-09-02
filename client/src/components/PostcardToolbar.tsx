import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  copyCompositionLink,
  copyPostcardAsPNG,
} from "@/lib/postcard-export";
import { Copy, Download, Edit2, Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PostcardToolbarProps {
  onDownload: () => void;
  onEditMessage: () => void;
  getExportElement: () => HTMLElement | null;
}

export function PostcardToolbar({
  onDownload,
  onEditMessage,
  getExportElement,
}: PostcardToolbarProps) {
  const [copying, setCopying] = useState<"image" | "link" | null>(null);

  const copyImage = async () => {
    setCopying("image");
    try {
      const element = getExportElement();
      if (!element) throw new Error("Postcard is not ready to copy");
      await copyPostcardAsPNG(element);
      toast.success("Postcard image copied");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not copy the postcard image"
      );
    } finally {
      setCopying(null);
    }
  };

  const copyLink = async () => {
    setCopying("link");
    try {
      await copyCompositionLink();
      toast.success("Shareable postcard link copied");
    } catch {
      toast.error("Could not copy the link");
    } finally {
      setCopying(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={onDownload}
        className="w-full justify-center"
        style={{ backgroundColor: "#1d4f4a", color: "#fbfaf6" }}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Postcard
      </Button>

      <Button
        onClick={onEditMessage}
        className="w-full justify-center"
        variant="outline"
      >
        <Edit2 className="mr-2 h-4 w-4" />
        Edit Message
      </Button>

      <div className="studio-panel-tight p-4">
        <p className="studio-field-label mb-3">Share this card</p>
        <div className="flex gap-2">
          <Button
            onClick={copyImage}
            disabled={Boolean(copying)}
            size="sm"
            className="flex-1 text-xs"
            variant="outline"
          >
            {copying === "image" ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Copy className="mr-1 h-4 w-4" />
            )}
            Copy PNG
          </Button>
          <Button
            onClick={copyLink}
            disabled={Boolean(copying)}
            size="sm"
            className="flex-1 text-xs"
            variant="outline"
          >
            {copying === "link" ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Link2 className="mr-1 h-4 w-4" />
            )}
            Copy link
          </Button>
        </div>
      </div>
    </div>
  );
}
