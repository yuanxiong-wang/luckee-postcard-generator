import { useRef, useState } from "react";
import { CalendarDays, Heart, RefreshCw } from "lucide-react";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { HolidayCalendar } from "@/components/HolidayCalendar";
import { HolidayNavigation } from "@/components/HolidayNavigation";
import { MessageEditor } from "@/components/MessageEditor";
import { Postcard } from "@/components/Postcard";
import { PostcardStyleControls } from "@/components/PostcardStyleControls";
import { PostcardToolbar } from "@/components/PostcardToolbar";
import { SaveFavoriteButton } from "@/components/SaveFavoriteButton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFavorites } from "@/hooks/useFavorites";
import {
  getCurrentOrNextHoliday,
  getNextHoliday,
  getPreviousHoliday,
  getRandomGreeting,
} from "@/lib/holidays";
import type { AppRegion, Holiday } from "@/lib/holidays";
import type { FavoritePostcard } from "@/lib/favorites";
import type { PostcardComposition } from "@/lib/postcard-composition";
import {
  DEFAULT_POSTCARD_BACKGROUND,
  DEFAULT_POSTCARD_FONT,
} from "@/lib/postcard-styles";

function composeFromHoliday(
  holiday: Holiday,
  region: AppRegion,
  partial: Partial<PostcardComposition> = {}
): PostcardComposition {
  return {
    region,
    holiday,
    greeting: getRandomGreeting(holiday),
    backgroundStyle: DEFAULT_POSTCARD_BACKGROUND,
    fontStyle: DEFAULT_POSTCARD_FONT,
    ...partial,
  };
}

export default function Home() {
  const [composition, setComposition] = useState<PostcardComposition>(() => {
    const region: AppRegion = "all";
    return composeFromHoliday(getCurrentOrNextHoliday(region), region);
  });
  const [showMessageEditor, setShowMessageEditor] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const postcardRef = useRef<HTMLDivElement>(null);
  const { favorites, addFavorite, getFavorite, removeFavorite } =
    useFavorites();
  const activeFavorite = getFavorite(composition);

  const handleGenerate = () => {
    setComposition(current => ({
      ...current,
      greeting: getRandomGreeting(current.holiday),
    }));
  };

  const handleRegionChange = (region: string) => {
    const nextRegion = region as AppRegion;
    setComposition(
      composeFromHoliday(getCurrentOrNextHoliday(nextRegion), nextRegion)
    );
  };

  const handleLoadFavorite = (favorite: FavoritePostcard) => {
    const { id: _id, timestamp: _timestamp, ...savedComposition } = favorite;
    setComposition(savedComposition);
    setShowFavorites(false);
  };

  const selectHoliday = (holiday: Holiday) => {
    setComposition(composeFromHoliday(holiday, composition.region));
  };

  return (
    <div className="studio-shell py-8 md:py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10 grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="studio-kicker mb-3">Seasonal correspondence desk</p>
            <h1 className="studio-title">Luckee Seasonal Greetings</h1>
          </div>
          <p className="studio-copy max-w-xl md:justify-self-end md:text-right">
            Compose a polished holiday postcard for clients, partners, and teams
            across US, UK, and Canadian calendars.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="studio-stage">
              <Postcard
                ref={postcardRef}
                holiday={composition.holiday}
                greeting={composition.greeting}
                backgroundStyle={composition.backgroundStyle}
                fontStyle={composition.fontStyle}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="studio-panel p-5">
              <label className="studio-field-label mb-3 block">Region</label>
              <Select
                value={composition.region}
                onValueChange={handleRegionChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">US, UK & Canada</SelectItem>
                  <SelectItem value="US">US Only</SelectItem>
                  <SelectItem value="UK">UK Only</SelectItem>
                  <SelectItem value="CA">Canada Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <HolidayNavigation
              currentHoliday={composition.holiday}
              onNext={() =>
                selectHoliday(
                  getNextHoliday(composition.holiday, composition.region)
                )
              }
              onPrevious={() =>
                selectHoliday(
                  getPreviousHoliday(composition.holiday, composition.region)
                )
              }
            />

            <div className="studio-panel p-5">
              <h3 className="studio-field-label mb-2">Current holiday</h3>
              <p className="font-semibold text-[#142f34]">
                {composition.holiday.name}
              </p>
            </div>

            <PostcardStyleControls
              holiday={composition.holiday}
              background={composition.backgroundStyle}
              font={composition.fontStyle}
              onBackgroundChange={backgroundStyle =>
                setComposition(current => ({ ...current, backgroundStyle }))
              }
              onFontChange={fontStyle =>
                setComposition(current => ({ ...current, fontStyle }))
              }
              onReset={() =>
                setComposition(current => ({
                  ...current,
                  backgroundStyle: DEFAULT_POSTCARD_BACKGROUND,
                  fontStyle: DEFAULT_POSTCARD_FONT,
                }))
              }
            />

            <Button
              onClick={handleGenerate}
              className="w-full py-6 text-base font-bold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: "#1d4f4a", color: "#fbfaf6" }}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Refresh postcard
            </Button>

            <SaveFavoriteButton
              isFavorite={Boolean(activeFavorite)}
              onSave={() => addFavorite(composition)}
              onRemove={() => {
                if (activeFavorite) removeFavorite(activeFavorite.id);
              }}
            />

            <PostcardToolbar
              holiday={composition.holiday}
              greeting={composition.greeting}
              getExportElement={() => postcardRef.current}
              onEditMessage={() => setShowMessageEditor(true)}
            />

            <Button
              onClick={() => setShowCalendar(open => !open)}
              variant={showCalendar ? "default" : "outline"}
              className="w-full"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="mt-6 lg:col-span-2">
            <Button
              onClick={() => setShowFavorites(open => !open)}
              variant="outline"
              className="mb-6 w-full"
            >
              <Heart className="mr-2 h-4 w-4 fill-orange-500 text-orange-500" />
              {showFavorites
                ? "Hide Favorites"
                : `View Favorites (${favorites.length})`}
            </Button>
            {showFavorites && (
              <FavoritesPanel
                favorites={favorites}
                onSelectFavorite={handleLoadFavorite}
                onRemoveFavorite={removeFavorite}
                onClose={() => setShowFavorites(false)}
              />
            )}
          </div>
        )}

        {showCalendar && (
          <div className="mt-12">
            <HolidayCalendar
              onHolidaySelect={holiday => {
                selectHoliday(holiday);
                setShowCalendar(false);
              }}
              currentHolidayId={composition.holiday.id}
              region={composition.region}
            />
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="studio-copy mx-auto max-w-2xl text-sm">
            Seasonal greetings shaped for the moments your clients and teams
            actually observe.
          </p>
        </div>
      </div>

      {showMessageEditor && (
        <MessageEditor
          currentMessage={composition.greeting}
          onSave={greeting => {
            setComposition(current => ({ ...current, greeting }));
            setShowMessageEditor(false);
          }}
          onCancel={() => setShowMessageEditor(false)}
          maxLength={100}
        />
      )}
    </div>
  );
}
