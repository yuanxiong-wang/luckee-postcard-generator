# Luckee Postcard Favorites

Favorites are stored in browser local storage under `luckee_favorites`. Each
favorite stores the full postcard composition: region, holiday, greeting,
background style, and font style.

## Behavior

- Click **Save to Favorites** to save the current composition.
- Click it again when it reads **Saved** to remove that composition.
- The favorites panel loads or removes individual favorites.
- Favorites are capped at 20, newest first; duplicate compositions are not
  saved twice.
- Older saved favorites are migrated with default styles when read.

## Implementation

`useFavorites` is the only component-facing storage owner. `SaveFavoriteButton`
is a presentational toggle: it receives the current state and calls the hook's
save/remove callbacks.

```ts
const { favorites, addFavorite, getFavorite, removeFavorite } = useFavorites();

const saved = getFavorite(composition);
if (saved) removeFavorite(saved.id);
else addFavorite(composition);
```

## Manual checks

- Save a composition and refresh the page.
- Change the background or typeface, save again, and load each favorite.
- Remove a saved composition and confirm the counter and button update.
