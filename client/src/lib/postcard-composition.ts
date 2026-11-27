import type { AppRegion, Holiday } from "@/lib/holidays";
import type {
  PostcardBackgroundId,
  PostcardFontId,
} from "@/lib/postcard-styles";

export type PostcardLayout = "classic" | "photo-message";

export function getDefaultMessage(holiday: Holiday) {
  return {
    headline: "Grateful for Your Partnership",
    shortMessage: `Thank you for trusting Luckee to be part of your team. ${holiday.id.includes("thanksgiving") ? "Wishing you and yours a warm and joyful Thanksgiving." : "With warm wishes from all of us at Luckee."}`,
  };
}

export interface PostcardComposition {
  layout: PostcardLayout;
  headline: string;
  shortMessage: string;
  region: AppRegion;
  holiday: Holiday;
  greeting: string;
  backgroundStyle: PostcardBackgroundId;
  fontStyle: PostcardFontId;
}
