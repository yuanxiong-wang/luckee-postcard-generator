import type { AppRegion, Holiday } from "@/lib/holidays";
import type {
  PostcardBackgroundId,
  PostcardFontId,
} from "@/lib/postcard-styles";

export interface PostcardComposition {
  region: AppRegion;
  holiday: Holiday;
  greeting: string;
  backgroundStyle: PostcardBackgroundId;
  fontStyle: PostcardFontId;
}
