/**
 * PostcardToolbar Component
 * 
 * Provides export and sharing options for the postcard
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Edit2, Loader2 } from 'lucide-react';
import {
  downloadPostcardAsPNG,
  downloadPostcardAsPDF,
  generateLinkedInShareURL,
  generateFacebookShareURL,
  openShareWindow,
  generateShareText,
} from '@/lib/postcard-export';
import { Holiday } from '@/lib/holidays';

interface PostcardToolbarProps {
  holiday: Holiday;
  greeting: string;
  onEditMessage: () => void;
}

export function PostcardToolbar({
  holiday,
  greeting,
  onEditMessage,
}: PostcardToolbarProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState('');

  const handleDownloadPNG = async () => {
    setIsExporting(true);
    setExportError('');
    try {
      await downloadPostcardAsPNG(
        'postcard-container',
        `luckee-${holiday.id}-postcard.png`
      );
    } catch (error) {
      setExportError('Failed to download PNG. Please try again.');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportError('');
    try {
      await downloadPostcardAsPDF(
        'postcard-container',
        `luckee-${holiday.id}-postcard.pdf`
      );
    } catch (error) {
      setExportError('Failed to download PDF. Please try again.');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareLinkedIn = () => {
    const pageUrl = window.location.href;
    const title = `Luckee ${holiday.name} Postcard`;
    const summary = generateShareText(holiday.name, greeting);
    const shareUrl = generateLinkedInShareURL(pageUrl, title, summary);
    openShareWindow(shareUrl, 'LinkedIn Share', 550, 680);
  };

  const handleShareFacebook = () => {
    const pageUrl = window.location.href;
    const quote = generateShareText(holiday.name, greeting);
    const shareUrl = generateFacebookShareURL(pageUrl, quote);
    openShareWindow(shareUrl, 'Facebook Share', 600, 400);
  };

  return (
    <div className="space-y-3">
      {/* Export Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3
          className="text-sm font-semibold text-slate-800 mb-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Download Postcard
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            size="sm"
            className="flex-1 text-xs"
            variant="outline"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-1" />
            )}
            PNG
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            size="sm"
            className="flex-1 text-xs"
            variant="outline"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-1" />
            )}
            PDF
          </Button>
        </div>
        {exportError && (
          <p className="text-xs text-red-500 mt-2">{exportError}</p>
        )}
      </div>

      {/* Edit Message Section */}
      <Button
        onClick={onEditMessage}
        className="w-full justify-center"
        variant="outline"
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Edit Message
      </Button>

      {/* Share Section */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3
          className="text-sm font-semibold text-slate-800 mb-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Share on Social Media
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={handleShareLinkedIn}
            size="sm"
            className="flex-1 text-xs"
            style={{
              backgroundColor: '#0A66C2',
              color: 'white',
            }}
          >
            <Share2 className="w-4 h-4 mr-1" />
            LinkedIn
          </Button>
          <Button
            onClick={handleShareFacebook}
            size="sm"
            className="flex-1 text-xs"
            style={{
              backgroundColor: '#1877F2',
              color: 'white',
            }}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
