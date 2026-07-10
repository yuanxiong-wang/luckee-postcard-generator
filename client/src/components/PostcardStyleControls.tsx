import { Check, Palette, RotateCcw, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBackgroundForHoliday } from "@/lib/holiday-backgrounds";
import {
  getPostcardBackgroundPresentation,
  postcardBackgroundOptions,
  postcardFontOptions,
} from "@/lib/postcard-styles";
import type { Holiday } from "@/lib/holidays";
import type {
  PostcardBackgroundId,
  PostcardFontId,
} from "@/lib/postcard-styles";

interface PostcardStyleControlsProps {
  holiday: Holiday;
  background: PostcardBackgroundId;
  font: PostcardFontId;
  onBackgroundChange: (background: PostcardBackgroundId) => void;
  onFontChange: (font: PostcardFontId) => void;
  onReset: () => void;
}

export function PostcardStyleControls({
  holiday,
  background,
  font,
  onBackgroundChange,
  onFontChange,
  onReset,
}: PostcardStyleControlsProps) {
  const artworkUrl = getBackgroundForHoliday(holiday.id);

  return (
    <div className="studio-panel p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="studio-field-label flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Art direction
        </h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onReset}
              aria-label="Reset postcard style"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset style</TooltipContent>
        </Tooltip>
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-bold text-[#526569]">
          Background
        </legend>
        <div
          className="grid grid-cols-5 gap-2"
          role="radiogroup"
          aria-label="Postcard background"
        >
          {postcardBackgroundOptions.map(option => {
            const presentation = getPostcardBackgroundPresentation(
              option.id,
              holiday,
              artworkUrl
            );
            const isSelected = background === option.id;

            return (
              <Tooltip key={option.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={option.label}
                    onClick={() => onBackgroundChange(option.id)}
                    className={`relative aspect-square w-full overflow-hidden rounded-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58b43] ${
                      isSelected
                        ? "border-[#1d4f4a] shadow-[0_0_0_2px_rgba(29,79,74,0.14)]"
                        : "border-white/80 hover:border-[#8ca39d]"
                    }`}
                    style={presentation.surface}
                  >
                    <span
                      className="absolute inset-0"
                      style={presentation.overlay}
                    />
                    {isSelected && (
                      <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1d4f4a] text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{option.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </fieldset>

      <div className="my-5 h-px bg-[rgba(20,47,52,0.1)]" />

      <fieldset>
        <legend className="mb-3 flex items-center gap-2 text-xs font-bold text-[#526569]">
          <Type className="h-4 w-4" />
          Typeface
        </legend>
        <div
          className="grid grid-cols-2 gap-2"
          role="radiogroup"
          aria-label="Postcard typeface"
        >
          {postcardFontOptions.map(option => {
            const isSelected = font === option.id;

            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onFontChange(option.id)}
                className={`h-12 min-w-0 rounded-md border px-2 text-center text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58b43] ${
                  isSelected
                    ? "border-[#1d4f4a] bg-[#e7eee9] text-[#142f34]"
                    : "border-[rgba(20,47,52,0.12)] bg-white/60 text-[#526569] hover:border-[#8ca39d]"
                }`}
                style={{
                  fontFamily: option.family,
                  fontStyle: option.style,
                  fontWeight: option.weight,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
