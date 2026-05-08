/**
 * Home Page - Luckee Postcard Generator
 * 
 * Design Philosophy: Warm Nostalgia with Hand-Drawn Character
 * - Asymmetric layout with postcard as focal point
 * - Warm seasonal colors and organic botanical elements
 * - Hand-drawn typography for greetings, elegant serif for Luckee signature
 * - Smooth, natural animations enhancing tactile, handcrafted feeling
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
  Holiday,
} from '@/lib/holidays';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoritePostcard } from '@/lib/favorites';
import { RefreshCw, Heart } from 'lucide-react';

type Region = 'US' | 'UK' | 'both';

export default function Home() {
  const [region, setRegion] = useState<Region>('both');
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
    setRegion(newRegion as Region);
    const newHoliday = getCurrentOrNextHoliday(newRegion as Region);
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
    const favoriteHoliday = getCurrentOrNextHoliday(favorite.region);
    
    // Find the holiday that matches the favorite
    if (favoriteHoliday.id === favorite.holidayId) {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <RefreshCw className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600">Loading postcard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 py-8 md:py-16">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className="mb-3"
            style={{
              fontSize: '48px',
              color: '#1a3a52',
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            Luckee Seasonal Greetings
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate beautiful seasonal postcards for every holiday throughout the year.
            Each postcard is uniquely crafted with warmth and care.
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
            <div id="postcard-container">
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <label
                className="block text-sm font-semibold text-slate-700 mb-3"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Select Region
              </label>
              <Select value={region} onValueChange={handleRegionChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">Both US & UK</SelectItem>
                  <SelectItem value="US">US Only</SelectItem>
                  <SelectItem value="UK">UK Only</SelectItem>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3
                className="text-lg font-semibold text-slate-800 mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Current Holiday
              </h3>
              <p
                className="text-sm text-slate-600 mb-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {holiday.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {holiday.decorElements.slice(0, 3).map((element, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                    style={{ fontFamily: 'Georgia, serif' }}>
                    {element.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Generate button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-6 text-lg font-semibold transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: holiday.colors.accent,
                color: '#f5f1e8',
              }}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Generate New Postcard
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
                📅 Calendar
              </Button>
              <Button
                onClick={() => setShowEmailTool(!showEmailTool)}
                variant={showEmailTool ? 'default' : 'outline'}
                className="flex-1"
              >
                ✉️ Email
              </Button>
            </div>

            {/* Tip */}
            <p className="text-xs text-slate-500 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              💡 Save favorites, customize messages, download, or share!
            </p>
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
          <p className="text-sm text-slate-600 max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
            Celebrate every season with Luckee. Our postcard generator creates unique,
            heartfelt greetings for US and UK holidays throughout the year.
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
