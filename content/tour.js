/*
 * TOUR — edited by the TSTU Travel team.
 * «По следам Тамерлана»: two short student packages, two cities each
 *   Package 1: Samarkand + Shahrisabz, 3 days / 2 nights
 *   Package 2: Tashkent + Bukhara, 3 days / 2 nights
 * Text fields are { ru, uz, en }. Any value set to null shows on the site as a labelled
 * placeholder ("Уточняется командой").
 * TO CONFIRM before selling: dates, hotel names and addresses, bus make and model.
 * Distances and travel times are approximate (≈). No price is shown on the site (Jokha, 2026-11-20).
 */
window.LEGACY = window.LEGACY || {};
window.LEGACY.tour = {
  title: { ru: 'По следам Тамерлана', uz: 'Temur izidan', en: 'In the footsteps of Tamerlane' },
  note: {
    ru: 'Проект программы для студентов. Детали ориентировочные, их подтверждает команда TSTU Travel.',
    uz: 'Talabalar uchun dastur loyihasi. Tafsilotlar taxminiy, ularni TSTU Travel jamoasi tasdiqlaydi.',
    en: 'Draft student programme. Details are approximate and are confirmed by the TSTU Travel team.'
  },
  description: {
    ru: 'Два коротких студенческих пакета по местам Амира Темура: можно выбрать один или пройти оба. В первом — Самарканд, его столица, и родной Шахрисабз. Во втором — Ташкент и древняя Бухара.',
    uz: 'Amir Temur joylari bo‘ylab ikkita qisqa talabalar paketi: birini tanlash yoki ikkalasini ham o‘tish mumkin. Birinchisida — uning poytaxti Samarqand va ona shahri Shahrisabz. Ikkinchisida — Toshkent va qadimiy Buxoro.',
    en: 'Two short student packages through Amir Temur’s places: pick one or do both. The first is Samarkand, his capital, and his native Shahrisabz. The second is Tashkent and ancient Bukhara.'
  },
  // shown at the top of the site
  duration: { ru: '2 пакета по 3 дня / 2 ночи', uz: '2 paket, har biri 3 kun / 2 kecha', en: '2 packages, 3 days / 2 nights each' },
  audience: { ru: 'студенты', uz: 'talabalar', en: 'students' },
  tourismType: { ru: 'культурно-познавательный (историко-архитектурный) студенческий туризм', uz: 'madaniy-ma’rifiy (tarixiy-me’moriy) talabalar turizmi', en: 'cultural and educational (history and architecture) student travel' },
  travelers: { ru: 'группа 10–20 человек', uz: '10–20 kishilik guruh', en: 'group of 10–20' },
  season: { ru: 'апрель–июнь, сентябрь–октябрь', uz: 'aprel–iyun, sentabr–oktabr', en: 'April–June, September–October' },
  level: { ru: 'лёгкий: 6–10 км пешком в день', uz: 'yengil: kuniga 6–10 km piyoda', en: 'easy: 6–10 km on foot a day' },
  price: null,   // not shown on the site (Jokha, 2026-11-20). Put a { ru, uz, en } value to show it again.
  destinations: [
    { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
    { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' },
    { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
    { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }
  ],
  highlights: [
    { image: 'gur_day', name: { ru: 'Гур-Эмир', uz: 'Go‘ri Amir', en: 'Gur-e Amir' }, place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'samarqand_0', name: { ru: 'Регистан', uz: 'Registon', en: 'The Registan' }, place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'shahr_aks', name: { ru: 'Ак-Сарай', uz: 'Oqsaroy', en: 'Ak-Saray' }, place: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' } },
    { image: 'shah_wide', name: { ru: 'Шахи-Зинда', uz: 'Shohi Zinda', en: 'Shah-i-Zinda' }, place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'buxoro_3', name: { ru: 'Минарет Калян', uz: 'Minorai Kalon', en: 'Kalyan Minaret' }, place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' } }
  ],
  outcomes: [
    { ru: 'места Темура в двух коротких поездках', uz: 'ikki qisqa safarda Temur joylari', en: 'Temur’s places in two short trips' },
    { ru: 'именной сертификат участника от TSTU Travel', uz: 'TSTU Travel’dan ishtirokchining nomli sertifikati', en: 'a named participant certificate from TSTU Travel' },
    { ru: 'лучи «Звезды мастера» за каждый город', uz: 'har bir shahar uchun «Usta yulduzi» nurlari', en: 'a Master’s Star ray for every city' }
  ],

  packages: [
    {
      id: 'samarkand',
      name: { ru: 'Пакет 1 · Самарканд и Шахрисабз', uz: '1-paket · Samarqand va Shahrisabz', en: 'Package 1 · Samarkand and Shahrisabz' },
      tab: { ru: 'Самарканд + Шахрисабз', uz: 'Samarqand + Shahrisabz', en: 'Samarkand + Shahrisabz' },
      lead: { ru: 'Столица Темура, его мавзолей и родной город.', uz: 'Temur poytaxti, uning maqbarasi va ona shahri.', en: 'Temur’s capital, his mausoleum and his home town.' },
      duration: { ru: '3 дня / 2 ночи', uz: '3 kun / 2 kecha', en: '3 days / 2 nights' },
      dates: null,   // start and end dates: TO CONFIRM
      start: { ru: 'Самарканд (сбор группы на вокзале или в аэропорту)', uz: 'Samarqand (guruh vokzal yoki aeroportda yig‘iladi)', en: 'Samarkand (the group meets at the station or airport)' },
      route: [{ ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }],
      legs: [
        { from: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, to: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, km: '≈ 300',
          time: { ru: '≈ 2 ч 10 мин, скоростной поезд', uz: '≈ 2 soat 10 daqiqa, tezyurar poyezd', en: '≈ 2 h 10 min, high-speed train' },
          note: { ru: 'дорога до места сбора, в пакет не входит', uz: 'yig‘ilish joyigacha yo‘l, paketga kirmaydi', en: 'getting to the meeting point, not in the package' } },
        { from: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, to: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, km: '≈ 90',
          time: { ru: '≈ 1,5–2 ч, автобус через перевал Тахтакарача', uz: '≈ 1,5–2 soat, Taxtaqoracha dovoni orqali avtobus', en: '≈ 1.5–2 h, coach over the Takhtakaracha pass' } },
        { from: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, to: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, km: '≈ 90',
          time: { ru: '≈ 1,5–2 ч, автобус', uz: '≈ 1,5–2 soat, avtobus', en: '≈ 1.5–2 h, coach' } }
      ],
      hotel: {
        name: null, address: null,   // TO CONFIRM
        stars: '3*',
        city: { ru: 'Самарканд, рядом с историческим центром', uz: 'Samarqand, tarixiy markaz yaqinida', en: 'Samarkand, near the historic centre' },
        room: { ru: '2–3-местные номера (twin / triple)', uz: '2–3 kishilik xonalar (twin / triple)', en: 'twin and triple rooms' },
        nights: 2,
        breakfast: true
      },
      transport: {
        type: { ru: 'туристический микроавтобус или автобус под размер группы', uz: 'guruh hajmiga mos turistik mikroavtobus yoki avtobus', en: 'tourist minibus or coach sized to the group' },
        model: null,   // make and model: TO CONFIRM with the carrier
        transferIn: { ru: 'включён: вокзал или аэропорт Самарканда — отель', uz: 'kiritilgan: Samarqand vokzali yoki aeroporti — mehmonxona', en: 'included: Samarkand station or airport to hotel' },
        transferOut: { ru: 'включён: отель — вокзал или аэропорт Самарканда', uz: 'kiritilgan: mehmonxona — Samarqand vokzali yoki aeroporti', en: 'included: hotel to Samarkand station or airport' },
        driver: { ru: 'включены на все переезды по программе', uz: 'dastur bo‘yicha barcha yo‘llarda kiritilgan', en: 'included for every transfer in the programme' }
      },
      meals: { ru: 'завтраки в отеле включены; обеды и ужины — самостоятельно', uz: 'mehmonxonada nonushta kiritilgan; tushlik va kechki ovqat — mustaqil', en: 'hotel breakfasts included; lunches and dinners on your own' },
      guides: { ru: 'русскоязычный гид на всех экскурсиях', uz: 'barcha ekskursiyalarda rusiyzabon gid', en: 'Russian-speaking guide on every tour' },
      tickets: { ru: 'входные билеты по программе включены в пакет', uz: 'dastur bo‘yicha kirish chiptalari paketga kiritilgan', en: 'entrance tickets on the programme are in the package' },
      included: [
        { ru: 'проживание в отеле 3*, 2 ночи', uz: '3* mehmonxonada yashash, 2 kecha', en: '3* hotel, 2 nights' },
        { ru: 'завтраки', uz: 'nonushtalar', en: 'breakfasts' },
        { ru: 'транспортное обслуживание и поездка в Шахрисабз', uz: 'transport xizmati va Shahrisabzga safar', en: 'transport, including the trip to Shahrisabz' },
        { ru: 'трансферы вокзал / аэропорт — отель — вокзал / аэропорт', uz: 'transferlar vokzal / aeroport — mehmonxona — vokzal / aeroport', en: 'transfers station / airport — hotel — station / airport' },
        { ru: 'услуги водителя', uz: 'haydovchi xizmatlari', en: 'driver' },
        { ru: 'услуги гида', uz: 'gid xizmatlari', en: 'guide' },
        { ru: 'входные билеты по программе', uz: 'dastur bo‘yicha kirish chiptalari', en: 'entrance tickets on the programme' }
      ],
      excluded: [
        { ru: 'дорога до Самарканда и обратно (перелёт или поезд)', uz: 'Samarqandga borish va qaytish (samolyot yoki poyezd)', en: 'getting to Samarkand and back (flight or train)' },
        { ru: 'обеды и ужины', uz: 'tushlik va kechki ovqatlar', en: 'lunches and dinners' },
        { ru: 'страховка и личные расходы', uz: 'sug‘urta va shaxsiy xarajatlar', en: 'insurance and personal expenses' }
      ],
      days: [
        {
          place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_0',
          text: { ru: 'Столица Темура и место, где он покоится.', uz: 'Temur poytaxti va u mangu qo‘nim topgan joy.', en: 'Temur’s capital, and the place where he rests.' },
          activities: [
            { ru: 'встреча группы, трансфер в отель', uz: 'guruhni kutib olish, mehmonxonaga transfer', en: 'group pick-up, transfer to the hotel' },
            { ru: 'мавзолей Гур-Эмир', uz: 'Go‘ri Amir maqbarasi', en: 'Gur-e Amir mausoleum' },
            { ru: 'площадь Регистан', uz: 'Registon maydoni', en: 'the Registan' }
          ],
          practical: { ru: 'Ночь в Самарканде.', uz: 'Tunash Samarqandda.', en: 'Night in Samarkand.' }
        },
        {
          place: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, image: 'shahr_aks',
          text: { ru: 'Родной город Темура и дворец, который должен был поражать мир.', uz: 'Temurning ona shahri va dunyoni hayratga solishi kerak bo‘lgan saroy.', en: 'Temur’s home town, and the palace meant to astonish the world.' },
          activities: [
            { ru: 'руины дворца Ак-Сарай', uz: 'Oqsaroy saroyi xarobalari', en: 'ruins of the Ak-Saray palace' },
            { ru: 'ансамбль Дорус-Саадат и склеп, который Темур готовил для себя', uz: 'Dorus-Saodat majmuasi va Temur o‘zi uchun tayyorlagan sag‘ana', en: 'the Dorus-Saadat ensemble and the crypt Temur prepared for himself' }
          ],
          practical: { ru: '≈ 90 км, 1,5–2 ч в одну сторону. Возвращение в Самарканд.', uz: '≈ 90 km, bir tomonga 1,5–2 soat. Samarqandga qaytish.', en: '≈ 90 km, 1.5–2 h each way. Back to Samarkand.' }
        },
        {
          place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_8',
          text: { ru: 'Мечеть-мечта, улица мавзолеев и звёзды Улугбека.', uz: 'Orzu-masjid, maqbaralar ko‘chasi va Ulug‘bek yulduzlari.', en: 'A dream of a mosque, a street of tombs and Ulugh Beg’s stars.' },
          activities: [
            { ru: 'мечеть Биби-Ханым', uz: 'Bibixonim masjidi', en: 'Bibi-Khanym Mosque' },
            { ru: 'некрополь Шахи-Зинда', uz: 'Shohi Zinda nekropoli', en: 'the Shah-i-Zinda necropolis' },
            { ru: 'обсерватория Улугбека', uz: 'Ulug‘bek rasadxonasi', en: 'Ulugh Beg Observatory' },
            { ru: 'трансфер на вокзал или в аэропорт', uz: 'vokzal yoki aeroportga transfer', en: 'transfer to the station or airport' }
          ],
          practical: { ru: 'Конец пакета.', uz: 'Paket yakuni.', en: 'End of the package.' }
        }
      ]
    },
    {
      id: 'bukhara',
      name: { ru: 'Пакет 2 · Ташкент и Бухара', uz: '2-paket · Toshkent va Buxoro', en: 'Package 2 · Tashkent and Bukhara' },
      tab: { ru: 'Ташкент + Бухара', uz: 'Toshkent + Buxoro', en: 'Tashkent + Bukhara' },
      lead: { ru: 'Современная столица и город купцов.', uz: 'Zamonaviy poytaxt va savdogarlar shahri.', en: 'The modern capital and the city of merchants.' },
      duration: { ru: '3 дня / 2 ночи', uz: '3 kun / 2 kecha', en: '3 days / 2 nights' },
      dates: null,   // start and end dates: TO CONFIRM
      start: { ru: 'Ташкент (встреча в аэропорту)', uz: 'Toshkent (aeroportda kutib olish)', en: 'Tashkent (airport pick-up)' },
      route: [{ ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }],
      legs: [
        { from: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, to: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, km: '≈ 600',
          time: { ru: '≈ 4 ч, скоростной поезд', uz: '≈ 4 soat, tezyurar poyezd', en: '≈ 4 h, high-speed train' } },
        { from: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, to: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, km: '≈ 600',
          time: { ru: '≈ 4 ч, скоростной поезд', uz: '≈ 4 soat, tezyurar poyezd', en: '≈ 4 h, high-speed train' } }
      ],
      hotel: {
        name: null, address: null,   // TO CONFIRM (one hotel in Tashkent, one in Bukhara)
        stars: '3*',
        city: { ru: '1 ночь в Ташкенте, 1 ночь в Бухаре (в старом городе)', uz: '1 kecha Toshkentda, 1 kecha Buxoroda (eski shaharda)', en: '1 night in Tashkent, 1 night in Bukhara (old town)' },
        room: { ru: '2–3-местные номера (twin / triple)', uz: '2–3 kishilik xonalar (twin / triple)', en: 'twin and triple rooms' },
        nights: 2,
        breakfast: true
      },
      transport: {
        type: { ru: 'скоростной поезд между городами; микроавтобус или автобус на трансферах', uz: 'shaharlar orasida tezyurar poyezd; transferlarda mikroavtobus yoki avtobus', en: 'high-speed train between the cities; minibus or coach for transfers' },
        model: null,   // make and model: TO CONFIRM with the carrier
        transferIn: { ru: 'включён: аэропорт Ташкента — отель', uz: 'kiritilgan: Toshkent aeroporti — mehmonxona', en: 'included: Tashkent airport to hotel' },
        transferOut: { ru: 'включён: вокзал Ташкента — аэропорт', uz: 'kiritilgan: Toshkent vokzali — aeroport', en: 'included: Tashkent station to airport' },
        driver: { ru: 'включены на все трансферы по программе', uz: 'dastur bo‘yicha barcha transferlarda kiritilgan', en: 'included for every transfer in the programme' }
      },
      meals: { ru: 'завтраки в отеле включены; обеды и ужины — самостоятельно', uz: 'mehmonxonada nonushta kiritilgan; tushlik va kechki ovqat — mustaqil', en: 'hotel breakfasts included; lunches and dinners on your own' },
      guides: { ru: 'русскоязычный гид в Ташкенте и Бухаре', uz: 'Toshkent va Buxoroda rusiyzabon gid', en: 'Russian-speaking guide in Tashkent and Bukhara' },
      tickets: { ru: 'входные билеты по программе и билеты на поезд включены в пакет', uz: 'dastur bo‘yicha kirish chiptalari va poyezd chiptalari paketga kiritilgan', en: 'entrance tickets on the programme and train tickets are in the package' },
      included: [
        { ru: 'проживание в отелях 3*, 2 ночи', uz: '3* mehmonxonalarda yashash, 2 kecha', en: '3* hotels, 2 nights' },
        { ru: 'завтраки', uz: 'nonushtalar', en: 'breakfasts' },
        { ru: 'билеты на поезд Ташкент — Бухара — Ташкент', uz: 'Toshkent — Buxoro — Toshkent poyezd chiptalari', en: 'train tickets Tashkent — Bukhara — Tashkent' },
        { ru: 'трансферы аэропорт — отель и вокзал — аэропорт', uz: 'transferlar aeroport — mehmonxona va vokzal — aeroport', en: 'transfers airport — hotel and station — airport' },
        { ru: 'услуги водителя', uz: 'haydovchi xizmatlari', en: 'driver' },
        { ru: 'услуги гида', uz: 'gid xizmatlari', en: 'guide' },
        { ru: 'входные билеты по программе', uz: 'dastur bo‘yicha kirish chiptalari', en: 'entrance tickets on the programme' }
      ],
      excluded: [
        { ru: 'перелёт до Ташкента и обратно', uz: 'Toshkentga va qaytish aviachiptasi', en: 'flights to Tashkent and back' },
        { ru: 'обеды и ужины', uz: 'tushlik va kechki ovqatlar', en: 'lunches and dinners' },
        { ru: 'страховка и личные расходы', uz: 'sug‘urta va shaxsiy xarajatlar', en: 'insurance and personal expenses' }
      ],
      days: [
        {
          place: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, image: 'toshkent_cic',
          text: { ru: 'Знакомство со столицей.', uz: 'Poytaxt bilan tanishuv.', en: 'Meeting the capital.' },
          activities: [
            { ru: 'встреча в аэропорту, заселение', uz: 'aeroportda kutib olish, joylashish', en: 'airport pick-up, check-in' },
            { ru: 'сквер Амира Темура и Музей истории Тимуридов', uz: 'Amir Temur xiyoboni va Temuriylar tarixi davlat muzeyi', en: 'Amir Temur Square and the Museum of Timurid History' }
          ],
          practical: { ru: 'Ночь в Ташкенте.', uz: 'Tunash Toshkentda.', en: 'Night in Tashkent.' }
        },
        {
          place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_3',
          text: { ru: 'Город купцов и торговых куполов.', uz: 'Savdogarlar va savdo gumbazlari shahri.', en: 'A city of merchants and trading domes.' },
          activities: [
            { ru: 'утренний скоростной поезд в Бухару', uz: 'ertalabki tezyurar poyezdda Buxoroga', en: 'morning high-speed train to Bukhara' },
            { ru: 'ансамбль Ляби-Хауз и торговые купола', uz: 'Labi Hovuz ansambli va savdo gumbazlari', en: 'the Lyab-i Hauz ensemble and the trading domes' }
          ],
          practical: { ru: '≈ 600 км, поезд ≈ 4 ч. Ночь в Бухаре.', uz: '≈ 600 km, poyezd ≈ 4 soat. Tunash Buxoroda.', en: '≈ 600 km, train ≈ 4 h. Night in Bukhara.' }
        },
        {
          place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_1',
          text: { ru: 'Минарет Калян, крепость Арк и дорога домой.', uz: 'Minorai Kalon, Ark qal’asi va uyga yo‘l.', en: 'The Kalyan Minaret, the Ark fortress and the way home.' },
          activities: [
            { ru: 'минарет Калян и крепость Арк', uz: 'Minorai Kalon va Ark qal’asi', en: 'the Kalyan Minaret and the Ark fortress' },
            { ru: 'вечерний поезд в Ташкент', uz: 'kechki poyezdda Toshkentga', en: 'evening train to Tashkent' },
            { ru: 'трансфер в аэропорт', uz: 'aeroportga transfer', en: 'airport transfer' }
          ],
          practical: { ru: 'Поезд ≈ 4 ч. Конец пакета.', uz: 'Poyezd ≈ 4 soat. Paket yakuni.', en: 'Train ≈ 4 h. End of the package.' }
        }
      ]
    }
  ],
  updated: '2026-11-20',

  /* One booking action. Change to a form or another link when ready. */
  bookingUrl: 'https://t.me/djavokhirmirzo'
};
