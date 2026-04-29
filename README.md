# Luckee Seasonal Postcard Generator

A beautiful, dynamic postcard generator that creates seasonal greetings for Luckee based on US and UK holidays. Each postcard features a unique design with hand-drawn typography, warm nostalgic aesthetics, and holiday-specific artwork.

## Features

### Automatic Holiday Detection
- Detects the current or next upcoming holiday based on the user's selected region
- Supports both US and UK holidays
- Seamless switching between region preferences

### Supported Holidays

**Winter Holidays:**
- New Year (January 1)
- Christmas (December 25)
- Boxing Day (December 26) - UK only

**Spring Holidays:**
- Valentine's Day (February 14)
- St. Patrick's Day (March 17)
- Easter (moveable)

**Summer Holidays:**
- Summer Solstice (June 21)
- Independence Day (July 4) - US only

**Fall Holidays:**
- Halloween (October 31)
- Thanksgiving (November 23) - US only

### Design Features

**Warm Nostalgia Aesthetic:**
- Hand-drawn botanical elements and decorative motifs
- Seasonal color palettes that shift with the holidays
- Vintage postcard-inspired layouts with asymmetric compositions
- Elegant typography using Playfair Display for greetings and Georgia for supporting text

**Consistent Branding:**
- Fixed "From our team at, Luckee" signature on every postcard
- Maintains brand identity across all seasonal variations
- Professional, polished presentation

**Dynamic Content:**
- Random greeting messages for each holiday
- Multiple decorative elements that vary by season
- Beautiful background images that enhance the visual appeal

**Enhanced User Capabilities:**
- **Custom Message Editing:** Personalize greetings while keeping the Luckee signature fixed
- **Download/Export:** Save postcards as PNG (digital) or PDF (printable)
- **Social Sharing:** Share directly to LinkedIn and Facebook with pre-filled messages

### User Interface

**Region Selection:**
- Choose between "Both US & UK", "US Only", or "UK Only"
- Automatically loads the appropriate holiday for the selected region

**Holiday Information:**
- Displays the current holiday name
- Shows relevant decorative elements for the season
- Provides context for the generated postcard

**Generate Button:**
- Creates new random variations of the current holiday postcard
- Smooth animations and transitions
- Responsive feedback on user interaction

## Design Philosophy

The postcard generator follows a **Warm Nostalgia with Hand-Drawn Character** design approach:

- **Asymmetric Layouts:** Breaking rigid grids with organic, flowing compositions
- **Seasonal Color Shifts:** Each holiday season has its own carefully chosen palette
- **Botanical Elements:** Hand-drawn flowers, leaves, and decorative flourishes
- **Textured Backgrounds:** Paper-like textures and watercolor effects
- **Elegant Typography:** Mixing script and serif fonts for visual hierarchy
- **Natural Animations:** Smooth transitions that enhance the tactile, handcrafted feeling

## Technical Stack

- **Frontend:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4 with custom design tokens
- **Components:** shadcn/ui for consistent UI elements
- **Routing:** Wouter for client-side navigation
- **Fonts:** Playfair Display, Georgia, Poppins from Google Fonts

## Project Structure

```
client/
  src/
    components/
      Postcard.tsx              # Main postcard rendering component
      PostcardDecorations.tsx   # SVG decorative elements
    pages/
      Home.tsx                  # Main application page
    lib/
      holidays.ts              # Holiday data and logic
      holiday-backgrounds.ts   # Background image mappings
    App.tsx                     # Application router and layout
    index.css                   # Global styles and design tokens
  index.html                    # HTML template
```

## How to Use

1. **Select Your Region:** Choose between US & UK holidays, US only, or UK only
2. **View Current Holiday:** The postcard automatically displays the current or next upcoming holiday
3. **Generate Variations:** Click "Generate New Postcard" to create different greeting variations
4. **Save Your Postcard:** Take a screenshot to save your favorite postcard

## Customization

### Adding New Holidays

Edit `client/src/lib/holidays.ts` to add new holidays:

```typescript
{
  id: 'holiday-id',
  name: 'Holiday Name',
  date: 'MM-DD',
  greetings: ['Greeting 1', 'Greeting 2'],
  colors: {
    background: '#color',
    accent: '#color',
    accentLight: '#color',
    text: '#color',
    textLight: '#color',
  },
  decorElements: ['element1', 'element2'],
  region: 'US' | 'UK' | 'both',
}
```

### Modifying Color Schemes

Update the `colors` object in each holiday to change the seasonal palette. The system uses:
- `background`: Main postcard background color
- `accent`: Primary accent color for decorative elements
- `accentLight`: Lighter accent for secondary elements
- `text`: Primary text color
- `textLight`: Secondary text color

### Adding New Decorative Elements

Create new SVG elements in `PostcardDecorations.tsx` and add them to the `decorElements` array for any holiday.

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight React components with minimal re-renders
- Optimized SVG decorations for fast rendering
- Compressed background images for quick loading
- Responsive design that works on all screen sizes

## Accessibility

- Semantic HTML structure
- Clear color contrast for text readability
- Keyboard-navigable interface
- ARIA labels for interactive elements

## Future Enhancements

- Download postcards as PNG/PDF
- Share postcards via social media
- Custom message editing
- Additional holiday support
- Animated postcard transitions
- Dark mode support

## License

All rights reserved. Created for Luckee.

## Support

For questions or issues, please contact the development team.
