/**
 * PostcardPreviewModal Component
 * 
 * Shows a preview of the postcard before downloading
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  downloadPostcardAsPNG,
  downloadPostcardAsPDF,
} from '@/lib/postcard-export';
import { Holiday } from '@/lib/holidays';

interface PostcardPreviewModalProps {
  holiday: Holiday;
  greeting: string;
  decorElements: string[];
  onClose: () => void;
}

export function PostcardPreviewModal({
  holiday,
  greeting,
  decorElements,
  onClose,
}: PostcardPreviewModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | null>(null);

  const handleDownloadPNG = async () => {
    setIsExporting(true);
    setExportFormat('png');
    try {
      await downloadPostcardAsPNG(
        'postcard-container',
        `luckee-${holiday.id}-postcard.png`
      );
      toast.success('Postcard downloaded as PNG!');
      onClose();
    } catch (error) {
      toast.error('Failed to download PNG. Please try again.');
      console.error(error);
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportFormat('pdf');
    try {
      await downloadPostcardAsPDF(
        'postcard-container',
        `luckee-${holiday.id}-postcard.pdf`
      );
      toast.success('Postcard downloaded as PDF!');
      onClose();
    } catch (error) {
      toast.error('Failed to download PDF. Please try again.');
      console.error(error);
    } finally {
      setIsExporting(false);
      setExportFormat(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2
            className="text-2xl font-semibold text-slate-800"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Preview Your Postcard
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Holiday</p>
              <p
                className="text-lg font-semibold text-slate-800"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {holiday.name}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Format</p>
              <p className="text-lg font-semibold text-slate-800">
                8.5" × 5.5"
              </p>
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-2">Message</p>
            <p
              className="text-base text-slate-700 italic"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              "{greeting}"
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-3">Decorative Elements</p>
            <div className="flex flex-wrap gap-2">
              {decorElements.map((element, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-xs"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {element.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Download Quality Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>High-Quality Download:</strong> Your postcard will be exported at 2x resolution for crisp, professional printing.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex-1"
            style={{
              backgroundColor: holiday.colors.accent,
              color: '#f5f1e8',
            }}
          >
            {isExporting && exportFormat === 'png' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download PNG
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex-1"
            style={{
              backgroundColor: holiday.colors.accent,
              color: '#f5f1e8',
            }}
          >
            {isExporting && exportFormat === 'pdf' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
