/*
 * TOUR PACKAGE — edited by the TSTU Travel team.
 * ---------------------------------------------------------------
 * Nothing here is invented. Every field set to null shows on the site
 * as a clearly labelled placeholder ("To be announced by the team").
 * Fill in real values when the package is confirmed.
 *
 * Text fields are { ru, uz, en }. Example of a filled day:
 *   {
 *     place:  { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
 *     image:  'samarqand_0',                      // key from content/photos.js
 *     text:   { ru: '...', uz: '...', en: '...' }, // one emotional line
 *     activities: [ { ru: '...', uz: '...', en: '...' } ],
 *     practical:  { ru: '...', uz: '...', en: '...' }
 *   }
 */
window.LEGACY = window.LEGACY || {};
window.LEGACY.tour = {
  title: {
    ru: 'По следам Темура',
    uz: 'Temur izidan',
    en: 'In the footsteps of Temur'
  },
  description: null,      // { ru, uz, en } — short description of the tour
  duration: null,         // { ru: '7 дней', uz: '7 kun', en: '7 days' }
  travelers: null,        // { ru: 'до 15 человек', uz: '15 kishigacha', en: 'up to 15 people' }
  price: null,            // { ru: 'от ... ₽', uz: '... so‘mdan', en: 'from ...' }
  season: null,           // { ru: 'май–октябрь', uz: 'may–oktabr', en: 'May–October' }
  level: null,            // { ru: 'лёгкий: до 5 км пешком в день', uz: '...', en: '...' }
  transport: null,        // { ru: 'скоростной поезд и автобус', uz: '...', en: '...' }
  outcomes: [],           // [ { ru: 'сертификат', uz: 'sertifikat', en: 'certificate' }, ... ]
  updated: null,          // 'YYYY-MM-DD' — date the team last checked these details
  destinations: [],       // [ { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, ... ]
  included: [],           // [ { ru, uz, en }, ... ]
  excluded: [],           // [ { ru, uz, en }, ... ]
  days: [],               // see the example above
  placeholderDays: 3,     // how many empty day slots to show while days is empty

  /* One booking action. Change to a form or another link when ready. */
  bookingUrl: 'https://t.me/djavokhirmirzo'
};
