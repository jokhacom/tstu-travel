# The Legacy of Temur — Uzbekistan

Cinematic site for Studturizm 2026 (Kaliningrad × Uzbekistan) by TSTU Travel.
The page is: a ~52 s film about Amir Temur (first screen) → the tour package → booking.
Static files only: no build step, no database. Vercel serves the folder as is.

## Where to edit

| What | File |
|---|---|
| All text in RU / UZ / EN (film captions, tour labels, menu) | `content/site.js` |
| The film | `video/temur-film-1080.mp4` (landscape), `video/temur-film-720v.mp4` (portrait phones); captions are timed in `site.js` → `film.cues` |
| Tour package: title, duration, price, days, included, booking link | `content/tour.js` |
| Photos and their credits | `content/photos.js` + `img/<key>-<width>.webp` |
| Design | `assets/css/legacy.css` |
| Rendering and film player | `assets/js/legacy.js` |

Every text field is `{ ru, uz, en }`. Change words in all three languages.

### Tour
Fields set to `null` (or empty lists) appear on the site as labelled placeholders
("To be announced by the team"). Nothing about the tour is invented. Fill the real
values when the package is ready; an example of a day is at the top of `content/tour.js`.

### Adding a photo
1. Export two WebP files: `img/<key>-1080.webp` and `img/<key>-1920.webp`.
2. Add an entry to `content/photos.js` with `w`, `alt` (ru/uz/en), `by`, `lic`, `src`, `url`.
3. Use the key in `content/site.js` or `content/tour.js`.

### The film
The film has no burnt-in text, so captions follow the chosen language. It was rendered
from the site's own photos and portraits (slow push-ins and crossfades, no audio). If you
re-cut it, update the cue times in `film.cues` and `film.endAt`, and the posters
`img/film-poster*.webp` (frame at 3 s) and `img/film-end*.webp` (last frame).

## Notes
- Portraits of Amir Temur are an artistic interpretation, not a historical likeness.
- The motto is shown as traditionally attributed to Amir Temur, not as a verified quotation.
- With `prefers-reduced-motion` the film does not autoplay: the end card shows, with a play button.
- Local preview needs a server with HTTP Range support for the video to seek (e.g. `npx serve`).
