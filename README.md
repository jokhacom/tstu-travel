# The Legacy of Temur — Uzbekistan

Cinematic site for Studturizm 2026 (Kaliningrad × Uzbekistan) by TSTU Travel.
Static files only: no build step, no database. Vercel serves the folder as is.

## Where to edit

| What | File |
|---|---|
| All text in RU / UZ / EN (chapters, monuments, facts, menu) | `content/site.js` |
| Tour package: title, duration, price, days, included, booking link | `content/tour.js` |
| Photos and their credits | `content/photos.js` + `img/<key>-<width>.webp` |
| Design | `assets/css/legacy.css` |
| Animations and rendering | `assets/js/legacy.js` |

Every text field is `{ ru, uz, en }`. Change words in all three languages.

### Tour
Fields set to `null` (or empty lists) appear on the site as labelled placeholders
("To be announced by the team"). Nothing about the tour is invented. Fill the real
values when the package is ready; an example of a day is at the top of `content/tour.js`.

### Adding a photo
1. Export two WebP files: `img/<key>-1080.webp` and `img/<key>-1920.webp`.
2. Add an entry to `content/photos.js` with `w`, `alt` (ru/uz/en), `by`, `lic`, `src`, `url`.
3. Use the key in `content/site.js` or `content/tour.js`.

Monuments without a photo yet (Gur-e Amir, Bibi-Khanym, Shah-i-Zinda) show a labelled
placeholder. Add a photo with the keys `gur_eve`, `bibi_wide`, `shah_wide` and it appears automatically.

## Notes
- Portraits of Amir Temur are an artistic interpretation, not a historical likeness.
- The motto is shown as traditionally attributed to Amir Temur, not as a verified quotation.
- Animations respect `prefers-reduced-motion`; without animation the page becomes a calm stacked layout.
- Local preview: `python3 -m http.server` in this folder.
