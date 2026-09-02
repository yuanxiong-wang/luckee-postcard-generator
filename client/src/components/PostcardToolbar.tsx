import { Button } from "@/components/ui/button";
import {
  generateFacebookShareURL,
  generateLinkedInShareURL,
  openShareWindow,
} from "@/lib/share";
import { Download, Edit2, Share2 } from "lucide-react";

interface PostcardToolbarProps {
  onDownload: () => void;
  onEditMessage: () => void;
}

export function PostcardToolbar({
  onDownload,
  onEditMessage,
}: PostcardToolbarProps) {
  const sharePage = (network: "linkedin" | "facebook") => {
    const pageUrl = window.location.href;
    if (network === "linkedin") {
      openShareWindow(
        generateLinkedInShareURL(pageUrl),
        "LinkedIn Share",
        550,
        680
      );
      return;
    }
    openShareWindow(
      generateFacebookShareURL(pageUrl),
      "Facebook Share",
      600,
      400
    );
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
        <p className="studio-field-label mb-3">Share</p>
        <div className="flex gap-2">
          <Button
            onClick={() => sharePage("linkedin")}
            size="sm"
            className="flex-1 text-xs"
            style={{ backgroundColor: "#0A66C2", color: "white" }}
          >
            <Share2 className="mr-1 h-4 w-4" />
            LinkedIn
          </Button>
          <Button
            onClick={() => sharePage("facebook")}
            size="sm"
            className="flex-1 text-xs"
            style={{ backgroundColor: "#1877F2", color: "white" }}
          >
            <Share2 className="mr-1 h-4 w-4" />
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
