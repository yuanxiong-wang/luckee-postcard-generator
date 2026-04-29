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
  Holiday,
} from '@/lib/holidays';
import { RefreshCw } from 'lucide-react';

type Region = 'US' | 'UK' | 'both';

export default function Home() {
  const [region, setRegion] = useState<Region>('both');
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [greeting, setGreeting] = useState<string>('');
  const [decorElements, setDecorElements] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize with current/next holiday
  useEffect(() => {
    const initialHoliday = getCurrentOrNextHoliday(region);
    setHoliday(initialHoliday);
    setGreeting(getRandomGreeting(initialHoliday));
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
            <Postcard
              holiday={holiday}
              greeting={greeting}
              decorElements={decorElements}
            />
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
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
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

            {/* Download hint */}
            <p className="text-xs text-slate-500 text-center" style={{ fontFamily: 'Georgia, serif' }}>
              💡 Tip: Take a screenshot to save your postcard!
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-600 max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
            Celebrate every season with Luckee. Our postcard generator creates unique,
            heartfelt greetings for US and UK holidays throughout the year.
          </p>
        </div>
      </div>
    </div>
  );
}
