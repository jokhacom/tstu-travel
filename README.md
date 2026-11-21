# The Legacy of Temur — Uzbekistan

Cinematic tourism site about Uzbekistan by TSTU Travel.
First visit: a fullscreen film about Amir Temur → its last frame opens into the site
(THE LEGACY OF TEMUR · «По следам Тамерлана») → the tour, step by step → booking.
Repeat visits open straight onto the site, with «Смотреть фильм снова». Add `?film` to the URL to see the first visit again.
Static files only: no build step, no database. Vercel serves the folder as is.

## Where to edit

| What | File |
|---|---|
| All text in RU / UZ / EN (film captions, tour labels, menu) | `content/site.js` |
| The film | `site.js` → `film` (`src`, `poster`, `endFrame`, `letterbox`, `cues`) |
| Tour: title, the two packages (dates, legs, hotel, transport, meals, guides, days, included), booking link | `content/tour.js` |
| Photos and their credits | `content/photos.js` + `img/<key>-<width>.webp` |
| Design | `assets/css/legacy.css` |
| Rendering and film player | `assets/js/legacy.js` |

Every text field is `{ ru, uz, en }`. Change words in all three languages.

### Tour
Fields set to `null` (or empty lists) appear on the site as labelled placeholders
("To be announced by the team"). Nothing about the tour is invented. Fill the real
values when the package is ready.

The tour is split into `packages` (now: 1 Samarkand + Shahrisabz, 2 Tashkent + Bukhara). The site
shows a tab per package; each package has its own `dates`, `start`, `legs` (distance and time),
`hotel` (name, address, stars, room, nights, breakfast), `transport` (type, model, transfers,
driver), `meals`, `guides`, `tickets`, `excursions`, `included`, `excluded`, a short `brief` for the
page and `days` (each with an hourly `schedule`). The page shows only the brief and the days; the
rest opens in the «Подробная программа и условия» panel. Still to confirm: `dates`, `hotel.name`,
`hotel.address`; `transport.model` is a typical option to check with the carrier. `price: null` keeps the price hidden.

### Adding a photo
1. Export two WebP files: `img/<key>-1080.webp` and `img/<key>-1920.webp`.
2. Add an entry to `content/photos.js` with `w`, `alt` (ru/uz/en), `by`, `lic`, `src`, `url`.
3. Use the key in `content/site.js` or `content/tour.js`.

### The film
The current clip is TEMPORARY: made from the site's own photos (slow push-ins, crossfades,
grain, letterbox, synthesized ambient sound). To put in the real documentary:
1. Copy the file to `video/` and set `film.src` in `content/site.js` (one path string, or `{ landscape, portrait }`).
2. If the film has its own narration or subtitles, set `film.cues: []`; otherwise re-time the cues
   (each cue can set `pos` and `look`, see the comment in `site.js`).
   Bump the `?v=` in the paths when a file changes: browsers cache video and posters for 7 days.
3. Replace the posters: `poster` (an early frame) and `endFrame` (the last frame, also the background of the opened site).
4. If the film has no black bars, set `film.letterbox: 0`.
Nothing else changes. `film.src: null` switches the film off and the site opens on the tour.

### Film
The film is `video/temur-film-720.mp4` (90 s, 720p, its own music and sound effects, Russian subtitles burnt in).
To replace it, copy the new file over it, refresh `img/film-poster.webp` (first frame) and `img/film-end.webp`
(last frame), and bump `?v=` in `film.src`, `film.poster` and `film.endFrame` (`content/site.js`).
It plays when the viewer turns the sound on, follows pause and replay, dips under the narrator
(set `film.voice: true` once the video has its own narration; times can also be listed in `film.duck`)
and rises to full at the motto (`film.swellAt`), then fades as the site opens.

## Notes
- Portraits of Amir Temur are an artistic interpretation, not a historical likeness.
- The motto is shown as traditionally attributed to Amir Temur, not as a verified quotation.
- With `prefers-reduced-motion` the film does not autoplay: the end card shows, with a play button.
- Local preview needs a server with HTTP Range support for the video to seek (e.g. `npx serve`).
