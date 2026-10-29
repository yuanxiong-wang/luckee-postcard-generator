import { useRef } from "react";
import { CalendarDays, Heart, RefreshCw } from "lucide-react";
import { DownloadDialog } from "@/components/DownloadDialog";
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
import { usePostcardStudio } from "@/hooks/usePostcardStudio";
import { getHolidayDateForYear, getNextHoliday, getPreviousHoliday } from "@/lib/holidays";

export default function Home() {
  const postcardRef = useRef<HTMLDivElement>(null);
  const studio = usePostcardStudio();
  const { composition, panel } = studio;

  return (
    <div className="studio-shell py-8 md:py-14">
      <main className="container mx-auto max-w-6xl px-4">
        <div className="studio-masthead mb-8 flex flex-wrap items-end justify-between gap-4 pb-6">
          <div>
            <p className="studio-kicker mb-3">Luckee / The greeting collection</p>
            <h1 className="studio-title">Luckee Seasonal Greetings</h1>
          </div>
          <p className="studio-edition">US &nbsp; / &nbsp; UK &nbsp; / &nbsp; Canada</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="catalog-heading">
              <div>
                <p className="studio-kicker mb-2">From the collection</p>
                <h2>{composition.holiday.name}</h2>
              </div>
              <div className="catalog-meta">
                <span>{getHolidayDateForYear(composition.holiday, new Date().getFullYear()).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</span>
                <span>{composition.holiday.regions.join(" / ")}</span>
              </div>
            </div>
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
                onValueChange={studio.handleRegionChange}
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
                studio.selectHoliday(
                  getNextHoliday(composition.holiday, composition.region)
                )
              }
              onPrevious={() =>
                studio.selectHoliday(
                  getPreviousHoliday(composition.holiday, composition.region)
                )
              }
            />

            <PostcardStyleControls
              holiday={composition.holiday}
              background={composition.backgroundStyle}
              font={composition.fontStyle}
              onBackgroundChange={studio.setBackgroundStyle}
              onFontChange={studio.setFontStyle}
              onReset={studio.resetStyles}
            />

            <Button
              onClick={studio.refreshGreeting}
              className="w-full py-6 text-base font-bold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{ backgroundColor: "#783e49", color: "#ffffff" }}
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Refresh postcard
            </Button>

            <SaveFavoriteButton
              isFavorite={Boolean(studio.activeFavorite)}
              onSave={() => studio.addFavorite(composition)}
              onRemove={() => {
                if (studio.activeFavorite) {
                  studio.removeFavorite(studio.activeFavorite.id);
                }
              }}
            />

            <PostcardToolbar
              onDownload={() => studio.togglePanel("download")}
              onEditMessage={() => studio.togglePanel("message")}
              getExportElement={() => postcardRef.current}
            />

            <Button
              onClick={() => studio.togglePanel("calendar")}
              variant={panel === "calendar" ? "default" : "outline"}
              className="w-full"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        {studio.favorites.length > 0 && (
          <div className="mt-6 lg:col-span-2">
            <Button
              onClick={() => studio.togglePanel("favorites")}
              variant="outline"
              className="mb-6 w-full"
            >
              <Heart className="mr-2 h-4 w-4 fill-orange-500 text-orange-500" />
              {panel === "favorites"
                ? "Hide Favorites"
                : `View Favorites (${studio.favorites.length})`}
            </Button>
            {panel === "favorites" && (
              <FavoritesPanel
                favorites={studio.favorites}
                onSelectFavorite={studio.loadFavorite}
                onRemoveFavorite={studio.removeFavorite}
                onClose={studio.closePanel}
              />
            )}
          </div>
        )}

        {panel === "calendar" && (
          <div className="mt-12">
            <HolidayCalendar
              onHolidaySelect={holiday => {
                studio.selectHoliday(holiday);
                studio.closePanel();
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
      </main>

      <MessageEditor
        open={panel === "message"}
        currentMessage={composition.greeting}
        onSave={studio.saveGreeting}
        onCancel={studio.closePanel}
      />

      <DownloadDialog
        open={panel === "download"}
        holiday={composition.holiday}
        getExportElement={() => postcardRef.current}
        onClose={studio.closePanel}
      />
    </div>
  );
}
