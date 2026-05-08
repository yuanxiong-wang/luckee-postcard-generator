# Luckee Seasonal Postcard Generator - Deployment Guide

## Overview

This is a standalone, self-contained version of the Luckee Seasonal Postcard Generator that can be deployed on any web server without requiring Manus or any backend dependencies.

## What's Included

- Complete React-based postcard generator
- All 10 US and UK holidays with unique background images
- Features: favorites, downloads (PNG/PDF), social sharing, email campaigns, holiday calendar
- No external API dependencies - everything runs in the browser

## Deployment Options

### Option 1: Simple HTTP Server (Recommended for Testing)

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using Node.js (express)
npm install -g express-generator
express-generator
npm install
npm start
```

Then open `http://localhost:8000` in your browser.

### Option 2: Deploy to Cloudflare Pages

1. Push the `standalone` folder to your GitHub repository
2. Go to Cloudflare Pages
3. Connect your GitHub repository
4. Set build command to: `echo "No build needed"`
5. Set publish directory to: `standalone`
6. Deploy

### Option 3: Deploy to Netlify

1. Drag and drop the `standalone` folder to Netlify
2. Or connect your GitHub repository and set:
   - Build command: (leave empty)
   - Publish directory: `standalone`

### Option 4: Deploy to Vercel

```bash
vercel --prod
```

### Option 5: Traditional Web Server (Apache, Nginx)

Copy all files from the `standalone` folder to your web server's public directory:

```bash
# For Apache
cp -r standalone/* /var/www/html/

# For Nginx
cp -r standalone/* /usr/share/nginx/html/
```

## File Structure

```
standalone/
├── index.html              # Main HTML file
├── assets/                 # JavaScript and CSS bundles
│   ├── index-*.js         # Main application bundle
│   ├── index-*.css        # Styles
│   └── *.js               # Dependencies (html2canvas, jsPDF, etc.)
└── DEPLOYMENT.md          # This file
```

## Features

- **Generate Postcards**: Create unique seasonal greetings for 10 holidays
- **Customize Messages**: Edit greeting text while keeping "From our team at, Luckee" fixed
- **Download**: Export as PNG or PDF for printing and sharing
- **Social Sharing**: Share directly to LinkedIn and Facebook
- **Favorites**: Save and manage favorite postcard designs locally
- **Holiday Navigation**: Browse through all holidays with Previous/Next buttons
- **Holiday Calendar**: Visual calendar view of all holidays
- **Email Campaigns**: Compose and preview email campaigns (stored locally)

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Storage

The application uses browser local storage to save:
- Favorite postcards (up to 20)
- Email campaign drafts
- User preferences

Data is stored locally in your browser and never sent to any server.

## Customization

### Change Company Name

Edit `index.html` and search for "Luckee" to customize the branding. The signature "From our team at, Luckee" is intentionally locked and cannot be changed through the UI.

### Add New Holidays

To add new holidays, you would need to:
1. Modify the source code in `client/src/lib/holidays.ts`
2. Add new background images
3. Rebuild the project

## Troubleshooting

### Images not loading
- Ensure all files are in the same directory structure
- Check browser console for CORS errors
- Verify image URLs are correct

### Downloads not working
- Check browser console for errors
- Ensure you have sufficient disk space
- Try a different browser

### Favorites not saving
- Check if browser local storage is enabled
- Clear browser cache and try again
- Check browser console for storage quota errors

## Performance

The application is optimized for performance:
- All code is minified and bundled
- Images are optimized
- No external API calls required
- Runs entirely in the browser

## Security

- No data is sent to external servers
- All processing happens in your browser
- No tracking or analytics (unless configured)
- Safe to use with sensitive company information

## Support

For issues or questions, refer to the GitHub repository or contact the development team.

## License

© 2026 Luckee. All rights reserved.
