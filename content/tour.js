/*
 * TOUR PACKAGE — edited by the TSTU Travel team.
 * ---------------------------------------------------------------
 * DRAFT programme (shortened to the essentials), designed from typical 6–7-day Tashkent–Samarkand–
 * Shahrisabz–Bukhara tours sold by Uzbek operators (Nov 2026: about
 * $850–1,200 per person for small groups, 3* hotels, breakfast).
 * The price is approximate. Confirm hotels, trains and price before selling,
 * then update `note` and `updated`.
 *
 * Text fields are { ru, uz, en }. Any field set to null shows as a
 * labelled placeholder on the site.
 */
window.LEGACY = window.LEGACY || {};
window.LEGACY.tour = {
  title: { ru: 'По следам Темура', uz: 'Temur izidan', en: 'In the footsteps of Temur' },
  note: {
    ru: 'Проект программы. Цена и детали ориентировочные, их подтверждает команда TSTU Travel.',
    uz: 'Dastur loyihasi. Narx va tafsilotlar taxminiy, ularni TSTU Travel jamoasi tasdiqlaydi.',
    en: 'Draft programme. Price and details are approximate and are confirmed by the TSTU Travel team.'
  },
  description: {
    ru: 'Шесть дней по главным местам Амира Темура: родной Шахрисабз, столица Самарканд, где он похоронен, и древняя Бухара.',
    uz: 'Amir Temurning asosiy joylari bo‘ylab olti kun: ona shahri Shahrisabz, u dafn etilgan poytaxt Samarqand va qadimiy Buxoro.',
    en: 'Six days through Amir Temur’s key places: his native Shahrisabz, Samarkand, the capital where he is buried, and ancient Bukhara.'
  },
  duration: { ru: '6 дней / 5 ночей', uz: '6 kun / 5 kecha', en: '6 days / 5 nights' },
  travelers: { ru: 'группа 10–20 человек', uz: '10–20 kishilik guruh', en: 'group of 10–20' },
  price: { ru: 'ориентировочно от 750 $ на человека', uz: 'taxminan 750 $ dan (bir kishi uchun)', en: 'approx. from $750 per person' },
  season: { ru: 'апрель–июнь, сентябрь–октябрь', uz: 'aprel–iyun, sentabr–oktabr', en: 'April–June, September–October' },
  level: { ru: 'лёгкий: 6–10 км пешком в день', uz: 'yengil: kuniga 6–10 km piyoda', en: 'easy: 6–10 km on foot a day' },
  transport: { ru: 'скоростной поезд между городами, автобус в Шахрисабз', uz: 'shaharlar orasida tezyurar poyezd, Shahrisabzga avtobus', en: 'high-speed train between cities, coach to Shahrisabz' },
  destinations: [
    { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
    { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
    { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' },
    { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
    { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }
  ],
  /* The best-known sights on the route (all are in the day-by-day programme). */
  highlights: [
    { image: 'gur_day', name: { ru: 'Гур-Эмир', uz: 'Go‘ri Amir', en: 'Gur-e Amir' }, place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'samarqand_0', name: { ru: 'Регистан', uz: 'Registon', en: 'The Registan' }, place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'shahr_aks', name: { ru: 'Ак-Сарай', uz: 'Oqsaroy', en: 'Ak-Saray' }, place: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' } },
    { image: 'shah_wide', name: { ru: 'Шахи-Зинда', uz: 'Shohi Zinda', en: 'Shah-i-Zinda' }, place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'buxoro_3', name: { ru: 'Минарет Калян', uz: 'Minorai Kalon', en: 'Kalyan Minaret' }, place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' } }
  ],
  included: [
    { ru: '5 ночей в отелях 3* с завтраком', uz: '3* mehmonxonalarda nonushta bilan 5 kecha', en: '5 nights in 3* hotels with breakfast' },
    { ru: 'билеты на поезда Ташкент — Самарканд — Бухара — Ташкент', uz: 'Toshkent — Samarqand — Buxoro — Toshkent poyezd chiptalari', en: 'train tickets Tashkent — Samarkand — Bukhara — Tashkent' },
    { ru: 'трансферы и автобус в Шахрисабз', uz: 'transferlar va Shahrisabzga avtobus', en: 'transfers and the coach to Shahrisabz' },
    { ru: 'русскоязычный гид во всех городах', uz: 'barcha shaharlarda rusiyzabon gid', en: 'Russian-speaking guide in every city' },
    { ru: 'входные билеты по программе', uz: 'dastur bo‘yicha kirish chiptalari', en: 'entrance tickets on the programme' }
  ],
  excluded: [
    { ru: 'перелёт до Ташкента и обратно', uz: 'Toshkentga va qaytish aviachiptasi', en: 'flights to Tashkent and back' },
    { ru: 'обеды и ужины', uz: 'tushlik va kechki ovqatlar', en: 'lunches and dinners' },
    { ru: 'страховка и личные расходы', uz: 'sug‘urta va shaxsiy xarajatlar', en: 'insurance and personal expenses' }
  ],
  outcomes: [
    { ru: 'все места Темура за одну поездку', uz: 'bitta safarda Temurning barcha joylari', en: 'every Temur site in one trip' },
    { ru: 'именной сертификат участника от TSTU Travel', uz: 'TSTU Travel’dan ishtirokchining nomli sertifikati', en: 'a named participant certificate from TSTU Travel' },
    { ru: 'лучи «Звезды мастера» за каждый город', uz: 'har bir shahar uchun «Usta yulduzi» nurlari', en: 'a Master’s Star ray for every city' }
  ],
  days: [
    {
      place: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, image: 'toshkent_1',
      text: { ru: 'Знакомство со столицей.', uz: 'Poytaxt bilan tanishuv.', en: 'Meeting the capital.' },
      activities: [
        { ru: 'встреча в аэропорту, заселение', uz: 'aeroportda kutib olish, joylashish', en: 'airport pick-up, check-in' },
        { ru: 'сквер Амира Темура и Музей истории Тимуридов', uz: 'Amir Temur xiyoboni va Temuriylar tarixi davlat muzeyi', en: 'Amir Temur Square and the Museum of Timurid History' }
      ],
      practical: { ru: 'Ночь в Ташкенте.', uz: 'Tunash Toshkentda.', en: 'Night in Tashkent.' }
    },
    {
      place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_0',
      text: { ru: 'Столица Темура и место, где он покоится.', uz: 'Temur poytaxti va u mangu qo‘nim topgan joy.', en: 'Temur’s capital, and the place where he rests.' },
      activities: [
        { ru: 'утренний скоростной поезд в Самарканд', uz: 'ertalabki tezyurar poyezdda Samarqandga', en: 'morning high-speed train to Samarkand' },
        { ru: 'мавзолей Гур-Эмир', uz: 'Go‘ri Amir maqbarasi', en: 'Gur-e Amir mausoleum' },
        { ru: 'площадь Регистан', uz: 'Registon maydoni', en: 'the Registan' }
      ],
      practical: { ru: 'Поезд около 2 ч. Ночь в Самарканде.', uz: 'Poyezd taxminan 2 soat. Tunash Samarqandda.', en: 'Train about 2 h. Night in Samarkand.' }
    },
    {
      place: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, image: 'shahr_aks',
      text: { ru: 'Родной город Темура и дворец, который должен был поражать мир.', uz: 'Temurning ona shahri va dunyoni hayratga solishi kerak bo‘lgan saroy.', en: 'Temur’s home town, and the palace meant to astonish the world.' },
      activities: [
        { ru: 'руины дворца Ак-Сарай', uz: 'Oqsaroy saroyi xarobalari', en: 'ruins of the Ak-Saray palace' },
        { ru: 'ансамбль Дорус-Саадат и склеп, который Темур готовил для себя', uz: 'Dorus-Saodat majmuasi va Temur o‘zi uchun tayyorlagan sag‘ana', en: 'the Dorus-Saodat ensemble and the crypt Temur prepared for himself' }
      ],
      practical: { ru: 'Около 2 ч в одну сторону. Возвращение в Самарканд.', uz: 'Bir tomonga taxminan 2 soat. Samarqandga qaytish.', en: 'About 2 h each way. Back to Samarkand.' }
    },
    {
      place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_8',
      text: { ru: 'Мечеть-мечта, улица мавзолеев и звёзды Улугбека.', uz: 'Orzu-masjid, maqbaralar ko‘chasi va Ulug‘bek yulduzlari.', en: 'A dream of a mosque, a street of tombs and Ulugh Beg’s stars.' },
      activities: [
        { ru: 'мечеть Биби-Ханым', uz: 'Bibixonim masjidi', en: 'Bibi-Khanym Mosque' },
        { ru: 'некрополь Шахи-Зинда', uz: 'Shohi Zinda nekropoli', en: 'the Shah-i-Zinda necropolis' },
        { ru: 'обсерватория Улугбека', uz: 'Ulug‘bek rasadxonasi', en: 'Ulugh Beg Observatory' }
      ],
      practical: { ru: 'Ночь в Самарканде.', uz: 'Tunash Samarqandda.', en: 'Night in Samarkand.' }
    },
    {
      place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_3',
      text: { ru: 'Город купцов и торговых куполов.', uz: 'Savdogarlar va savdo gumbazlari shahri.', en: 'A city of merchants and trading domes.' },
      activities: [
        { ru: 'утренний поезд в Бухару', uz: 'ertalabki poyezdda Buxoroga', en: 'morning train to Bukhara' },
        { ru: 'ансамбль Ляби-Хауз и торговые купола', uz: 'Labi Hovuz ansambli va savdo gumbazlari', en: 'the Lyab-i Hauz ensemble and the trading domes' },
        { ru: 'минарет Калян и крепость Арк', uz: 'Minorai Kalon va Ark qal’asi', en: 'the Kalyan Minaret and the Ark fortress' }
      ],
      practical: { ru: 'Поезд около 2 ч. Ночь в Бухаре.', uz: 'Poyezd taxminan 2 soat. Tunash Buxoroda.', en: 'Train about 2 h. Night in Bukhara.' }
    },
    {
      place: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, image: 'toshkent_4',
      text: { ru: 'Возвращение в столицу и вылет домой.', uz: 'Poytaxtga qaytish va uyga parvoz.', en: 'Back to the capital and the flight home.' },
      activities: [
        { ru: 'поезд Бухара — Ташкент', uz: 'Buxoro — Toshkent poyezdi', en: 'train Bukhara — Tashkent' },
        { ru: 'трансфер в аэропорт', uz: 'aeroportga transfer', en: 'airport transfer' }
      ],
      practical: { ru: 'Поезд около 4 ч.', uz: 'Poyezd taxminan 4 soat.', en: 'Train about 4 h.' }
    }
  ],
  placeholderDays: 3,
  updated: '2026-11-19',

  /* One booking action. Change to a form or another link when ready. */
  bookingUrl: 'https://t.me/djavokhirmirzo'
};
