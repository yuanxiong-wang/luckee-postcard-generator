# Luckee Seasonal Postcard Generator

A browser-based editor for creating seasonal greetings for clients, partners, and teams. The live site is [postcard.luckee.us](https://postcard.luckee.us/).

## Features

- Browse US, UK, and Canadian holidays, or view all regions together.
- Select holiday artwork, background treatments, and typefaces.
- Refresh or edit the greeting, save favorites, and browse the holiday calendar.
- Download a postcard as PNG or PDF, copy a PNG, or share a link to the composition.

Favorites and the selected region are stored in the browser's local storage. Shareable links include the greeting and design choices in the URL, so avoid including sensitive information in a greeting you share.

## Local Development

Prerequisites: Node.js with TypeScript stripping support for the holiday check, and pnpm 10.4.1 (the version pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Vite. No application API keys are required.

```sh
pnpm check            # TypeScript
pnpm check:holidays   # Holiday data and calendar checks
```

## Project Layout

- `client/src/pages/Home.tsx`: editor layout.
- `client/src/components/`: postcard, controls, calendar, and dialogs.
- `client/src/lib/holidays.data.ts` and `holidays.calendar.ts`: holiday definitions and date rules.
- `client/src/lib/postcard-styles.ts`: background and typeface options.
- `client/public/holiday-backgrounds/`: source artwork.
- `index.html`, `assets/`, and `holiday-backgrounds/`: static files served from the repository root.

## Build And Deployment

Cloudflare serves the static files in the repository root. `pnpm build` builds the app and synchronizes the root bundle. **The synchronization script recursively removes and replaces several output directories**, and Vite clears its build output. Review this behavior before running it, particularly where bulk deletion is prohibited.

For a non-destructive verification build, choose a new temporary output directory:

```sh
pnpm exec vite build --outDir /tmp/luckee-postcard-build --emptyOutDir false
```

This checks the build but does not update the production files. Deployments require the root HTML and referenced generated assets to match. The configured pre-push hook runs the normal build and checks those files, so it also uses the recursive synchronization described above.

To add a holiday, follow the existing entries in `client/src/lib/holidays.data.ts`, provide its artwork in `client/public/holiday-backgrounds/`, and run the holiday checks.

## License

This project is licensed under the [MIT License](LICENSE).
