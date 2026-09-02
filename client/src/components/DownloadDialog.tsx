import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  downloadPostcardAsPDF,
  downloadPostcardAsPNG,
} from "@/lib/postcard-export";
import type { Holiday } from "@/lib/holidays";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadDialogProps {
  open: boolean;
  holiday: Holiday;
  getExportElement: () => HTMLElement | null;
  onClose: () => void;
}

export function DownloadDialog({
  open,
  holiday,
  getExportElement,
  onClose,
}: DownloadDialogProps) {
  const [exportFormat, setExportFormat] = useState<"png" | "pdf" | null>(null);

  const download = async (format: "png" | "pdf") => {
    setExportFormat(format);
    try {
      const exportElement = getExportElement();
      if (!exportElement) throw new Error("Postcard is not ready to export");

      if (format === "png") {
        await downloadPostcardAsPNG(
          exportElement,
          `luckee-${holiday.id}-postcard.png`
        );
        toast.success("Postcard downloaded as PNG!");
      } else {
        await downloadPostcardAsPDF(
          exportElement,
          `luckee-${holiday.id}-postcard.pdf`
        );
        toast.success("Postcard downloaded as PDF!");
      }
      onClose();
    } catch (error) {
      toast.error(`Failed to download ${format.toUpperCase()}. Please try again.`);
      console.error(
        `${format.toUpperCase()} export error:`,
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setExportFormat(null);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-[Georgia,serif] text-[#1a3a52]">
            Download Postcard
          </DialogTitle>
          <DialogDescription>
            Export the postcard on screen as a high-resolution PNG or a
            printable 8.5" × 5.5" PDF.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-stretch">
          <Button type="button" onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => download("png")}
            disabled={Boolean(exportFormat)}
            className="flex-1"
            style={{ backgroundColor: holiday.colors.accent, color: "#f5f1e8" }}
          >
            {exportFormat === "png" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            PNG
          </Button>
          <Button
            type="button"
            onClick={() => download("pdf")}
            disabled={Boolean(exportFormat)}
            className="flex-1"
            style={{ backgroundColor: holiday.colors.accent, color: "#f5f1e8" }}
          >
            {exportFormat === "pdf" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
