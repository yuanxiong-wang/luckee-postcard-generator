/**
 * MessageEditor Component
 * 
 * Allows users to customize the postcard greeting message
 * while keeping the "From our team at, Luckee" signature fixed
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Check } from 'lucide-react';

interface MessageEditorProps {
  currentMessage: string;
  onSave: (message: string) => void;
  onCancel: () => void;
  maxLength?: number;
}

export function MessageEditor({
  currentMessage,
  onSave,
  onCancel,
  maxLength = 100,
}: MessageEditorProps) {
  const [message, setMessage] = useState(currentMessage);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    if (message.length > maxLength) {
      setError(`Message must be ${maxLength} characters or less`);
      return;
    }

    setError('');
    onSave(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            color: '#1a3a52',
            fontFamily: 'Playfair Display, serif',
          }}
        >
          Customize Your Message
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-slate-700 mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Edit Greeting Message
          </label>
          <Textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter your custom greeting..."
            className="w-full min-h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            maxLength={maxLength}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500">
              {message.length}/{maxLength} characters
            </span>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg mb-4">
          <p
            className="text-xs text-slate-600 mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your postcard will display:
          </p>
          <div className="text-sm italic text-slate-800" style={{ fontFamily: 'Playfair Display, serif' }}>
            {message || '(Your message here)'}
          </div>
          <div className="text-xs text-slate-600 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
            From our team at, <span className="italic font-semibold">Luckee</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1"
            style={{
              backgroundColor: '#d84315',
              color: '#f5f1e8',
            }}
          >
            <Check className="w-4 h-4 mr-2" />
            Save Message
          </Button>
        </div>
      </div>
    </div>
  );
}
