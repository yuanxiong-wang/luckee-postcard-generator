import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";

import type { PostcardLayout } from "@/lib/postcard-composition";

interface MessageEditorProps {
  layout: PostcardLayout;
  headline: string;
  shortMessage: string;
  onSaveMessage: (headline: string, shortMessage: string) => void;
  open: boolean;
  currentMessage: string;
  onSave: (message: string) => void;
  onCancel: () => void;
  maxLength?: number;
}

export function MessageEditor({
  open,
  layout,
  headline,
  shortMessage,
  onSaveMessage,
  currentMessage,
  onSave,
  onCancel,
  maxLength = 100,
}: MessageEditorProps) {
  const [message, setMessage] = useState(currentMessage);
  const [title, setTitle] = useState(headline);
  const [body, setBody] = useState(shortMessage);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setMessage(currentMessage);
      setTitle(headline);
      setBody(shortMessage);
      setError("");
    }
  }, [open, currentMessage, headline, shortMessage]);

  const handleSave = () => {
    if (layout === "photo-message") {
      if (
        !title.trim() ||
        !body.trim() ||
        title.length > 70 ||
        body.length > 220
      ) {
        setError(
          "Add a headline (up to 70 characters) and a short message (up to 220)."
        );
        return;
      }
      onSaveMessage(title.trim(), body.trim());
      return;
    }
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    if (message.length > maxLength) {
      setError(`Message must be ${maxLength} characters or less`);
      return;
    }

    onSave(message);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-[Georgia,serif] text-[#1a3a52]">
            Customize Your Message
          </DialogTitle>
          <DialogDescription>
            The Luckee signature stays fixed on every postcard.
          </DialogDescription>
        </DialogHeader>

        {layout === "photo-message" ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="postcard-headline"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Headline
              </label>
              <Textarea
                id="postcard-headline"
                value={title}
                onChange={event => {
                  setTitle(event.target.value);
                  setError("");
                }}
                maxLength={70}
                className="w-full"
              />
              <p className="mt-1 text-xs text-slate-500">
                {title.length}/70 characters
              </p>
            </div>
            <div>
              <label
                htmlFor="postcard-short-message"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Short message
              </label>
              <Textarea
                id="postcard-short-message"
                value={body}
                onChange={event => {
                  setBody(event.target.value);
                  setError("");
                }}
                maxLength={220}
                className="min-h-28 w-full"
              />
              <p className="mt-1 text-xs text-slate-500">
                {body.length}/220 characters
              </p>
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="postcard-message"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Edit Greeting Message
            </label>
            <Textarea
              id="postcard-message"
              value={message}
              onChange={event => {
                setMessage(event.target.value);
                setError("");
              }}
              onKeyDown={event => {
                if (event.key === "Enter" && event.ctrlKey) handleSave();
              }}
              placeholder="Enter your custom greeting..."
              className="min-h-24 w-full"
              maxLength={maxLength}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {message.length}/{maxLength} characters
              </span>
              {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
          </div>
        )}

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="mb-2 text-xs text-slate-600">
            Your postcard will display:
          </p>
          <div className="text-sm italic text-slate-800">
            {layout === "photo-message"
              ? title
              : message || "(Your message here)"}
          </div>
          {layout === "photo-message" && (
            <p className="mt-2 text-sm text-slate-700">{body}</p>
          )}
          <div className="mt-2 text-xs text-slate-600">
            From our team at,{" "}
            <span className="font-semibold italic">Luckee</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="flex-1"
            style={{ backgroundColor: "#d84315", color: "#f5f1e8" }}
          >
            <Check className="mr-2 h-4 w-4" />
            Save Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
