# Cloudflare setup

- Keep the Pages build output as `dist/public`.
- Keep HTML revalidated, but cache fingerprinted assets and postcard backgrounds for one year with `client/public/_headers`.
- Turn off Bot Fight Mode or JavaScript Detections for `postcard.luckee.us` unless this static page needs bot scoring; Cloudflare injects `/cdn-cgi/challenge-platform/` scripts when those features are on.
