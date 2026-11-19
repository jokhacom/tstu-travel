/*
 * TOUR PACKAGE — edited by the TSTU Travel team.
 * ---------------------------------------------------------------
 * DRAFT programme, designed from typical 6–7-day Tashkent–Samarkand–
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
    ru: 'Семь дней по местам жизни Амира Темура: от его родного Шахрисабза до столицы Самарканда, где он похоронен, и дальше в Бухару и Ташкент. Днём — памятники, вечером — плов, мастерские и разговоры с местными студентами.',
    uz: 'Amir Temur hayoti bilan bog‘liq joylar bo‘ylab yetti kun: uning ona shahri Shahrisabzdan u dafn etilgan poytaxt Samarqandgacha, so‘ng Buxoro va Toshkent. Kunduzi — obidalar, kechqurun — osh, ustaxonalar va mahalliy talabalar bilan suhbatlar.',
    en: 'Seven days through the places of Amir Temur’s life: from his native Shahrisabz to Samarkand, the capital where he is buried, then on to Bukhara and Tashkent. Monuments by day; plov, workshops and local students by evening.'
  },
  duration: { ru: '7 дней / 6 ночей', uz: '7 kun / 6 kecha', en: '7 days / 6 nights' },
  travelers: { ru: 'группа 10–20 человек', uz: '10–20 kishilik guruh', en: 'group of 10–20' },
  price: { ru: 'ориентировочно от 850 $ на человека', uz: 'taxminan 850 $ dan (bir kishi uchun)', en: 'approx. from $850 per person' },
  season: { ru: 'апрель–июнь, сентябрь–октябрь', uz: 'aprel–iyun, sentabr–oktabr', en: 'April–June, September–October' },
  level: { ru: 'лёгкий: 6–10 км пешком в день, без горных походов', uz: 'yengil: kuniga 6–10 km piyoda, tog‘ yurishlarisiz', en: 'easy: 6–10 km on foot a day, no mountain hikes' },
  transport: { ru: 'скоростной поезд между городами, автобус в Шахрисабз', uz: 'shaharlar orasida tezyurar poyezd, Shahrisabzga avtobus', en: 'high-speed train between cities, coach to Shahrisabz' },
  destinations: [
    { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
    { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
    { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' },
    { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
    { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }
  ],
  included: [
    { ru: '6 ночей в отелях 3* с завтраком', uz: '3* mehmonxonalarda nonushta bilan 6 kecha', en: '6 nights in 3* hotels with breakfast' },
    { ru: 'билеты на поезда Ташкент — Самарканд — Бухара — Ташкент', uz: 'Toshkent — Samarqand — Buxoro — Toshkent poyezd chiptalari', en: 'train tickets Tashkent — Samarkand — Bukhara — Tashkent' },
    { ru: 'трансферы и автобус в Шахрисабз', uz: 'transferlar va Shahrisabzga avtobus', en: 'transfers and the coach to Shahrisabz' },
    { ru: 'русскоязычный гид во всех городах', uz: 'barcha shaharlarda rusiyzabon gid', en: 'Russian-speaking guide in every city' },
    { ru: 'входные билеты по программе', uz: 'dastur bo‘yicha kirish chiptalari', en: 'entrance tickets on the programme' },
    { ru: 'ужин-плов в Ташкенте и мастер-класс в Бухаре', uz: 'Toshkentda osh-kechki ovqat va Buxoroda mahorat darsi', en: 'a plov dinner in Tashkent and a workshop in Bukhara' }
  ],
  excluded: [
    { ru: 'перелёт до Ташкента и обратно', uz: 'Toshkentga va qaytish aviachiptasi', en: 'flights to Tashkent and back' },
    { ru: 'обеды и остальные ужины', uz: 'tushliklar va boshqa kechki ovqatlar', en: 'lunches and other dinners' },
    { ru: 'страховка и личные расходы', uz: 'sug‘urta va shaxsiy xarajatlar', en: 'insurance and personal expenses' },
    { ru: 'плата за фото- и видеосъёмку в музеях', uz: 'muzeylarda foto va video suratga olish to‘lovi', en: 'photo and video fees in museums' }
  ],
  outcomes: [
    { ru: 'полный «Паспорт наследия»: все города маршрута', uz: 'to‘liq «Meros pasporti»: yo‘nalishdagi barcha shaharlar', en: 'a complete Heritage passport: every city on the route' },
    { ru: 'именной сертификат участника от TSTU Travel', uz: 'TSTU Travel’dan ishtirokchining nomli sertifikati', en: 'a named participant certificate from TSTU Travel' },
    { ru: 'своя работа с мастер-класса и фото с маршрута', uz: 'mahorat darsidan o‘z ishingiz va yo‘nalish suratlari', en: 'your own piece from the workshop and photos from the route' },
    { ru: 'друзья среди студентов Узбекистана', uz: 'O‘zbekiston talabalari orasida do‘stlar', en: 'friends among Uzbek students' }
  ],
  days: [
    {
      place: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, image: 'toshkent_1',
      text: { ru: 'Знакомство со столицей и первый плов.', uz: 'Poytaxt bilan tanishuv va birinchi osh.', en: 'Meeting the capital, and the first plov.' },
      activities: [
        { ru: 'встреча в аэропорту, заселение', uz: 'aeroportda kutib olish, joylashish', en: 'airport pick-up, check-in' },
        { ru: 'сквер Амира Темура и Музей истории Тимуридов', uz: 'Amir Temur xiyoboni va Temuriylar tarixi davlat muzeyi', en: 'Amir Temur Square and the Museum of Timurid History' },
        { ru: 'комплекс Хазрати Имам, базар Чорсу, станции метро', uz: 'Hazrati Imom majmuasi, Chorsu bozori, metro bekatlari', en: 'Hazrati Imam complex, Chorsu Bazaar, metro stations' },
        { ru: 'приветственный ужин-плов', uz: 'xush kelibsiz osh-kechki ovqati', en: 'welcome plov dinner' }
      ],
      practical: { ru: 'Ночь в Ташкенте.', uz: 'Tunash Toshkentda.', en: 'Night in Tashkent.' }
    },
    {
      place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_0',
      text: { ru: 'Столица Темура и место, где он покоится.', uz: 'Temur poytaxti va u mangu qo‘nim topgan joy.', en: 'Temur’s capital, and the place where he rests.' },
      activities: [
        { ru: 'утренний скоростной поезд в Самарканд', uz: 'ertalabki tezyurar poyezdda Samarqandga', en: 'morning high-speed train to Samarkand' },
        { ru: 'мавзолей Гур-Эмир', uz: 'Go‘ri Amir maqbarasi', en: 'Gur-e Amir mausoleum' },
        { ru: 'площадь Регистан и три медресе', uz: 'Registon maydoni va uch madrasa', en: 'the Registan and its three madrasas' }
      ],
      practical: { ru: 'Поезд около 2 ч. Ночь в Самарканде.', uz: 'Poyezd taxminan 2 soat. Tunash Samarqandda.', en: 'Train about 2 h. Night in Samarkand.' }
    },
    {
      place: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, image: null,
      text: { ru: 'Родной город Темура и дворец, который должен был поражать мир.', uz: 'Temurning ona shahri va dunyoni hayratga solishi kerak bo‘lgan saroy.', en: 'Temur’s home town, and the palace meant to astonish the world.' },
      activities: [
        { ru: 'дорога через перевал Тахтакарача', uz: 'Taxtaqoracha dovoni orqali yo‘l', en: 'the road over the Takhtakaracha pass' },
        { ru: 'руины дворца Ак-Сарай', uz: 'Oqsaroy saroyi xarobalari', en: 'ruins of the Ak-Saray palace' },
        { ru: 'ансамбль Дорус-Саадат и склеп, который Темур готовил для себя', uz: 'Dorus-Saodat majmuasi va Temur o‘zi uchun tayyorlagan sag‘ana', en: 'the Dorus-Saodat ensemble and the crypt Temur prepared for himself' },
        { ru: 'ансамбль Дорут-Тилават', uz: 'Dorut-Tilovat majmuasi', en: 'the Dorut-Tilovat ensemble' }
      ],
      practical: { ru: 'Около 2 ч в одну сторону. Возвращение в Самарканд.', uz: 'Bir tomonga taxminan 2 soat. Samarqandga qaytish.', en: 'About 2 h each way. Back to Samarkand.' }
    },
    {
      place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_8',
      text: { ru: 'Мечеть-мечта, улица мавзолеев и звёзды Улугбека.', uz: 'Orzu-masjid, maqbaralar ko‘chasi va Ulug‘bek yulduzlari.', en: 'A dream of a mosque, a street of tombs and Ulugh Beg’s stars.' },
      activities: [
        { ru: 'мечеть Биби-Ханым и базар Сиаб', uz: 'Bibixonim masjidi va Siyob bozori', en: 'Bibi-Khanym Mosque and Siab Bazaar' },
        { ru: 'некрополь Шахи-Зинда', uz: 'Shohi Zinda nekropoli', en: 'the Shah-i-Zinda necropolis' },
        { ru: 'обсерватория Улугбека', uz: 'Ulug‘bek rasadxonasi', en: 'Ulugh Beg Observatory' },
        { ru: 'мастерская самаркандской бумаги в Конигиле', uz: 'Konigildagi Samarqand qog‘ozi ustaxonasi', en: 'the Samarkand paper workshop in Konigil' }
      ],
      practical: { ru: 'Ночь в Самарканде.', uz: 'Tunash Samarqandda.', en: 'Night in Samarkand.' }
    },
    {
      place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_2',
      text: { ru: 'Город купцов и торговых куполов.', uz: 'Savdogarlar va savdo gumbazlari shahri.', en: 'A city of merchants and trading domes.' },
      activities: [
        { ru: 'поезд в Бухару', uz: 'Buxoroga poyezd', en: 'train to Bukhara' },
        { ru: 'ансамбль Ляби-Хауз', uz: 'Labi Hovuz ansambli', en: 'the Lyab-i Hauz ensemble' },
        { ru: 'торговые купола и минарет Калян', uz: 'savdo gumbazlari va Minorai Kalon', en: 'trading domes and the Kalyan Minaret' }
      ],
      practical: { ru: 'Поезд около 2 ч. Ночь в Бухаре.', uz: 'Poyezd taxminan 2 soat. Tunash Buxoroda.', en: 'Train about 2 h. Night in Bukhara.' }
    },
    {
      place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_7',
      text: { ru: 'Ремесло своими руками.', uz: 'Hunar o‘z qo‘ling bilan.', en: 'Craft with your own hands.' },
      activities: [
        { ru: 'крепость Арк и мавзолей Саманидов', uz: 'Ark qal’asi va Somoniylar maqbarasi', en: 'the Ark fortress and the Samanid Mausoleum' },
        { ru: 'мастер-класс: сюзане, керамика или чеканка', uz: 'mahorat darsi: so‘zana, sopol yoki misgarlik', en: 'workshop: suzani, ceramics or metal chasing' },
        { ru: 'вечер со студентами Бухары', uz: 'Buxoro talabalari bilan kecha', en: 'an evening with Bukhara students' }
      ],
      practical: { ru: 'Ночь в Бухаре.', uz: 'Tunash Buxoroda.', en: 'Night in Bukhara.' }
    },
    {
      place: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, image: 'toshkent_4',
      text: { ru: 'Возвращение в столицу и вылет домой.', uz: 'Poytaxtga qaytish va uyga parvoz.', en: 'Back to the capital and the flight home.' },
      activities: [
        { ru: 'поезд Бухара — Ташкент', uz: 'Buxoro — Toshkent poyezdi', en: 'train Bukhara — Tashkent' },
        { ru: 'свободное время, сувениры', uz: 'bo‘sh vaqt, esdaliklar', en: 'free time, souvenirs' },
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
