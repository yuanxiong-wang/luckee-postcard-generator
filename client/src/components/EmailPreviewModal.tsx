/**
 * Email Preview Modal Component
 * 
 * Displays a realistic preview of how the email will look to recipients
 * with subject, message, and recipient count
 */

import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailPreviewModalProps {
  subject: string;
  message: string;
  recipientCount: number;
  holidayName: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function EmailPreviewModal({
  subject,
  message,
  recipientCount,
  holidayName,
  onClose,
  onConfirm,
  isLoading = false,
}: EmailPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Email Preview</h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preview Info */}
        <div className="bg-secondary/30 border-b border-border p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Holiday</p>
              <p className="font-semibold text-foreground">{holidayName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Recipients</p>
              <p className="font-semibold text-foreground">{recipientCount}</p>
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div className="p-6">
          {/* Email Client Frame */}
          <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
            {/* Fake Email Client Header */}
            <div className="bg-slate-50 border-b border-border px-6 py-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-sm">
                    L
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Luckee Team</p>
                    <p className="text-xs text-muted-foreground">noreply@luckee.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="p-6 space-y-4">
              {/* Subject */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Subject
                </p>
                <p className="text-lg font-semibold text-foreground">{subject}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Message Body */}
              <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                {message}
              </div>

              {/* Footer */}
              <div className="border-t border-border pt-4 mt-6">
                <p className="text-xs text-muted-foreground">
                  This is a preview of how your email will appear to recipients.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-border p-6 flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
          >
            Back to Edit
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Creating Campaign...
              </span>
            ) : (
              'Create Campaign'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
