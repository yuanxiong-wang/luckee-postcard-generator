/**
 * PostcardToolbar Component
 * 
 * Provides export and sharing options for the postcard
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Edit2 } from 'lucide-react';
import {
  generateLinkedInShareURL,
  generateFacebookShareURL,
  openShareWindow,
  generateShareText,
} from '@/lib/postcard-export';
import { Holiday } from '@/lib/holidays';
import { PostcardPreviewModal } from './PostcardPreviewModal';

interface PostcardToolbarProps {
  holiday: Holiday;
  greeting: string;
  decorElements: string[];
  onEditMessage: () => void;
}

export function PostcardToolbar({
  holiday,
  greeting,
  decorElements,
  onEditMessage,
}: PostcardToolbarProps) {
  const [showPreview, setShowPreview] = useState(false);

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
      {/* Download Preview Button */}
      <Button
        onClick={() => setShowPreview(true)}
        className="w-full justify-center"
        style={{
          backgroundColor: '#1d4f4a',
          color: '#fbfaf6',
        }}
      >
        <Download className="w-4 h-4 mr-2" />
        Download Postcard
      </Button>

      {/* Edit Message Section */}
      <Button
        onClick={onEditMessage}
        className="w-full justify-center"
        variant="outline"
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Edit Message
      </Button>

      {/* Preview Modal */}
      {showPreview && (
        <PostcardPreviewModal
          holiday={holiday}
          greeting={greeting}
          decorElements={decorElements}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Share Section */}
      <div className="studio-panel-tight p-4">
        <h3 className="studio-field-label mb-3">Share</h3>
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
