/**
 * Home Page - Luckee Postcard Generator
 * 
 * Design Philosophy: elegant stationery studio
 * - Postcard as a finished print proof on a subtle registration grid
 * - Cool porcelain surface, ink typography, and restrained brass accents
 * - Controls stay quiet so the generated postcard remains the focal point
 */

import { useState, useEffect } from 'react';
import { Postcard } from '@/components/Postcard';
import { MessageEditor } from '@/components/MessageEditor';
import { PostcardToolbar } from '@/components/PostcardToolbar';
import { SaveFavoriteButton } from '@/components/SaveFavoriteButton';
import { FavoritesPanel } from '@/components/FavoritesPanel';
import { HolidayNavigation } from '@/components/HolidayNavigation';
import { HolidayCalendar } from '@/components/HolidayCalendar';
import { EmailCampaignTool } from '@/components/EmailCampaignTool';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getCurrentOrNextHoliday,
  getRandomGreeting,
  getRandomDecorElements,
  getNextHoliday,
  getPreviousHoliday,
  getHolidayById,
} from '@/lib/holidays';
import type { AppRegion, Holiday } from '@/lib/holidays';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoritePostcard } from '@/lib/favorites';
import { CalendarDays, Heart, Mail, RefreshCw } from 'lucide-react';

export default function Home() {
  const [region, setRegion] = useState<AppRegion>('both');
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [greeting, setGreeting] = useState<string>('');
  const [decorElements, setDecorElements] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMessageEditor, setShowMessageEditor] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEmailTool, setShowEmailTool] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Initialize with current/next holiday
  useEffect(() => {
    const initialHoliday = getCurrentOrNextHoliday(region);
    setHoliday(initialHoliday);
    const randomGreeting = getRandomGreeting(initialHoliday);
    setGreeting(randomGreeting);
    setDecorElements(getRandomDecorElements(initialHoliday, 3));
  }, []);

  // Generate new postcard
  const handleGenerate = () => {
    if (!holiday) return;

    setIsGenerating(true);

    // Simulate brief animation delay for smooth transition
    setTimeout(() => {
      setGreeting(getRandomGreeting(holiday));
      setDecorElements(getRandomDecorElements(holiday, 3));
      setIsGenerating(false);
    }, 300);
  };

  // Change region
  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion as AppRegion);
    const newHoliday = getCurrentOrNextHoliday(newRegion as AppRegion);
    setHoliday(newHoliday);
    setGreeting(getRandomGreeting(newHoliday));
    setDecorElements(getRandomDecorElements(newHoliday, 3));
  };

  // Handle custom message save
  const handleSaveMessage = (newMessage: string) => {
    setGreeting(newMessage);
    setShowMessageEditor(false);
  };

  // Handle loading a favorite
  const handleLoadFavorite = (favorite: FavoritePostcard) => {
    setRegion(favorite.region);
    const favoriteHoliday = getHolidayById(favorite.holidayId);
    
    // Find the holiday that matches the favorite
    if (favoriteHoliday) {
      setHoliday(favoriteHoliday);
    }
    
    setGreeting(favorite.greeting);
    setDecorElements(favorite.decorElements);
    setShowFavorites(false);
  };

  // Handle next holiday
  const handleNextHoliday = () => {
    if (!holiday) return;
    
    const nextHol = getNextHoliday(holiday, region);
    setHoliday(nextHol);
    setGreeting(getRandomGreeting(nextHol));
    setDecorElements(getRandomDecorElements(nextHol, 3));
  };

  // Handle previous holiday
  const handlePreviousHoliday = () => {
    if (!holiday) return;
    
    const prevHol = getPreviousHoliday(holiday, region);
    setHoliday(prevHol);
    setGreeting(getRandomGreeting(prevHol));
    setDecorElements(getRandomDecorElements(prevHol, 3));
  };

  if (!holiday) {
    return (
      <div className="studio-shell flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <RefreshCw className="w-8 h-8 text-[#7b6a44]" />
          </div>
          <p className="studio-copy">Loading postcard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="studio-shell py-8 md:py-14">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="studio-kicker mb-3">Seasonal correspondence desk</p>
            <h1 className="studio-title">Luckee Seasonal Greetings</h1>
          </div>
          <p className="studio-copy max-w-xl md:justify-self-end md:text-right">
            Compose a polished holiday postcard for clients, partners, and teams across US, UK, and Canadian calendars.
          </p>
        </div>

        {/* Main content: Postcard + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Postcard - takes up 2 columns on large screens */}
          <div
            className="lg:col-span-2 transition-all duration-300 ease-out"
            style={{
              opacity: isGenerating ? 0.7 : 1,
              transform: isGenerating ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            <div id="postcard-container" className="studio-stage">
              <Postcard
                holiday={holiday}
                greeting={greeting}
                decorElements={decorElements}
              />
            </div>
          </div>

          {/* Controls sidebar */}
          <div className="space-y-6">
            {/* Region selector */}
            <div className="studio-panel p-5">
              <label className="studio-field-label mb-3 block">
                Region
              </label>
              <Select value={region} onValueChange={handleRegionChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">US, UK & Canada</SelectItem>
                  <SelectItem value="US">US Only</SelectItem>
                  <SelectItem value="UK">UK Only</SelectItem>
                  <SelectItem value="CA">Canada Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Holiday Navigation */}
            <HolidayNavigation
              currentHoliday={holiday}
              onNext={handleNextHoliday}
              onPrevious={handlePreviousHoliday}
              disabled={isGenerating}
            />

            {/* Holiday info */}
            <div className="studio-panel p-5">
              <h3 className="studio-field-label mb-2">
                Current holiday
              </h3>
              <p className="mb-4 font-semibold text-[#142f34]">
                {holiday.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {holiday.decorElements.slice(0, 3).map((element, idx) => (
                  <span key={idx} className="studio-chip">
                    {element.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-6 text-base font-bold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: '#1d4f4a',
                color: '#fbfaf6',
              }}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Refreshing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Refresh postcard
                </span>
              )}
            </Button>

            {/* Save to favorites button */}
            <SaveFavoriteButton
              holidayId={holiday.id}
              holidayName={holiday.name}
              greeting={greeting}
              decorElements={decorElements}
              region={region}
              onSave={() => addFavorite(holiday.id, holiday.name, greeting, decorElements, region)}
            />

            {/* Export and sharing toolbar */}
            <PostcardToolbar
              holiday={holiday}
              greeting={greeting}
              decorElements={decorElements}
              onEditMessage={() => setShowMessageEditor(true)}
            />

            {/* Calendar and Email Tools */}
            <div className="flex gap-2">
              <Button
                onClick={() => setShowCalendar(!showCalendar)}
                variant={showCalendar ? 'default' : 'outline'}
                className="flex-1"
              >
                <CalendarDays className="h-4 w-4" />
                Calendar
              </Button>
              <Button
                onClick={() => setShowEmailTool(!showEmailTool)}
                variant={showEmailTool ? 'default' : 'outline'}
                className="flex-1"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>

        {/* View Favorites button and Panel - below postcard */}
        {favorites.length > 0 && (
          <div className="mt-6 lg:col-span-2">
            <Button
              onClick={() => setShowFavorites(!showFavorites)}
              variant="outline"
              className="w-full mb-6"
            >
              <Heart className="w-4 h-4 mr-2 fill-orange-500 text-orange-500" />
              {showFavorites ? 'Hide Favorites' : `View Favorites (${favorites.length})`}
            </Button>
            
            {/* Favorites Panel - displayed below button */}
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

        {/* Holiday Calendar */}
        {showCalendar && (
          <div className="mt-12">
            <HolidayCalendar
              onHolidaySelect={(selectedHoliday) => {
                setHoliday(selectedHoliday);
                setGreeting(getRandomGreeting(selectedHoliday));
                setDecorElements(getRandomDecorElements(selectedHoliday, 3));
                setShowCalendar(false);
              }}
              currentHolidayId={holiday?.id}
              region={region}
            />
          </div>
        )}

        {/* Email Campaign Tool */}
        {showEmailTool && (
          <div className="mt-12">
            <EmailCampaignTool
              holiday={holiday}
              greeting={greeting}
            />
          </div>
        )}

        {/* Footer info */}
        <div className="mt-16 text-center">
          <p className="studio-copy max-w-2xl mx-auto text-sm">
            Seasonal greetings shaped for the moments your clients and teams actually observe.
          </p>
        </div>
      </div>

      {/* Message Editor Modal */}
      {showMessageEditor && (
        <MessageEditor
          currentMessage={greeting}
          onSave={handleSaveMessage}
          onCancel={() => setShowMessageEditor(false)}
          maxLength={100}
        />
      )}
    </div>
  );
}
