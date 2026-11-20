/*
 * TOUR — edited by the TSTU Travel team.
 * «По следам Тамерлана»: two short student packages, two cities each
 *   Package 1: Samarkand + Shahrisabz, 3 days / 2 nights
 *   Package 2: Tashkent + Bukhara, 3 days / 2 nights
 * Text fields are { ru, uz, en }. Any value set to null shows on the site as a labelled
 * placeholder ("Уточняется командой").
 * TO CONFIRM before selling: dates, hotel names and addresses; the vehicle model is a typical option
 * (confirm with the carrier). Hourly schedules follow Jokha's 6-day PDF programme, shortened.
 * Distances and travel times are approximate (≈). No price is shown on the site (Jokha, 2026-11-20).
 */
window.LEGACY = window.LEGACY || {};
window.LEGACY.tour = {
  title: { ru: 'По следам Тамерлана', uz: 'Temur izidan', en: 'In the footsteps of Tamerlane' },
  note: {
    ru: 'Часы в программе ориентировочные: точное время зависит от расписания поездов.',
    uz: 'Dasturdagi vaqtlar taxminiy: aniq vaqt poyezdlar jadvaliga bog‘liq.',
    en: 'Times are approximate and depend on the train timetable.'
  },
  description: {
    ru: 'Маршрут по городам Амира Темура разделён на два коротких пакета, чтобы поездка была доступнее для студентов. Первый ведёт в Самарканд, его столицу, и в Шахрисабз, где он родился. Второй — в современный Ташкент и древнюю Бухару. Выберите один пакет или соедините оба.',
    uz: 'Amir Temur shaharlari bo‘ylab yo‘nalish talabalar uchun qulayroq bo‘lishi uchun ikkita qisqa paketga bo‘lingan. Birinchisi uning poytaxti Samarqand va u tug‘ilgan Shahrisabzga olib boradi. Ikkinchisi — zamonaviy Toshkent va qadimiy Buxoroga. Bitta paketni tanlang yoki ikkalasini birlashtiring.',
    en: 'The route through Amir Temur’s cities is split into two short packages to keep the trip affordable for students. The first takes you to Samarkand, his capital, and to Shahrisabz, where he was born. The second goes to modern Tashkent and ancient Bukhara. Choose one package or combine both.'
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
      start: { ru: 'Ташкент, утренний поезд в Самарканд', uz: 'Toshkent, Samarqandga ertalabki poyezd', en: 'Tashkent, morning train to Samarkand' },
      route: [{ ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }],
      brief: {
        hotel: { ru: 'отель 3*, 2 ночи', uz: '3* mehmonxona, 2 kecha', en: '3* hotel, 2 nights' },
        transport: { ru: 'поезд «Афросиёб» и микроавтобус', uz: '«Afrosiyob» poyezdi va mikroavtobus', en: 'Afrosiyob train and minibus' },
        meals: { ru: 'завтраки, обеды, ужины', uz: 'nonushta, tushlik, kechki ovqat', en: 'breakfast, lunch, dinner' }
      },
      legs: [
        { from: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, to: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, km: '≈ 300',
          time: { ru: '≈ 2 ч 10 мин, скоростной поезд «Афросиёб»', uz: '≈ 2 soat 10 daqiqa, «Afrosiyob» tezyurar poyezdi', en: '≈ 2 h 10 min, Afrosiyob high-speed train' } },
        { from: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, to: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, km: '≈ 90',
          time: { ru: '≈ 2–2,5 ч, микроавтобус через перевал Тахтакарача', uz: '≈ 2–2,5 soat, Taxtaqoracha dovoni orqali mikroavtobus', en: '≈ 2–2.5 h, minibus over the Takhtakaracha pass' } },
        { from: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, to: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, km: '≈ 90',
          time: { ru: '≈ 2–2,5 ч, микроавтобус', uz: '≈ 2–2,5 soat, mikroavtobus', en: '≈ 2–2.5 h, minibus' } },
        { from: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, to: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, km: '≈ 300',
          time: { ru: '≈ 2 ч 10 мин, скоростной поезд «Афросиёб»', uz: '≈ 2 soat 10 daqiqa, «Afrosiyob» tezyurar poyezdi', en: '≈ 2 h 10 min, Afrosiyob high-speed train' } }
      ],
      hotel: {
        name: null, address: null,   // TO CONFIRM
        stars: '3*',
        city: { ru: 'Самарканд, в пешей доступности от Регистана', uz: 'Samarqand, Registondan piyoda yetib boriladigan joyda', en: 'Samarkand, within walking distance of the Registan' },
        room: { ru: '2–3-местные номера (twin / triple)', uz: '2–3 kishilik xonalar (twin / triple)', en: 'twin and triple rooms' },
        nights: 2,
        breakfast: true
      },
      transport: {
        type: { ru: 'скоростной поезд «Афросиёб» Ташкент — Самарканд — Ташкент; туристический микроавтобус в Самарканде и до Шахрисабза', uz: 'Toshkent — Samarqand — Toshkent «Afrosiyob» tezyurar poyezdi; Samarqandda va Shahrisabzgacha turistik mikroavtobus', en: 'Afrosiyob high-speed train Tashkent — Samarkand — Tashkent; tourist minibus in Samarkand and to Shahrisabz' },
        model: { ru: 'Mercedes-Benz Sprinter (до 18 мест); для группы 19–20 человек — Isuzu (СамАвто) до 30 мест', uz: 'Mercedes-Benz Sprinter (18 o‘ringacha); 19–20 kishilik guruh uchun — Isuzu (SamAvto) 30 o‘ringacha', en: 'Mercedes-Benz Sprinter (up to 18 seats); for 19–20 people an Isuzu (SamAuto) up to 30 seats' },   // TO CONFIRM with the carrier
        transferIn: { ru: 'включён: вокзал Самарканда — отель', uz: 'kiritilgan: Samarqand vokzali — mehmonxona', en: 'included: Samarkand station to hotel' },
        transferOut: { ru: 'включён: отель — вокзал Самарканда', uz: 'kiritilgan: mehmonxona — Samarqand vokzali', en: 'included: hotel to Samarkand station' },
        driver: { ru: 'водитель с машиной на все переезды и экскурсии по программе', uz: 'dastur bo‘yicha barcha yo‘l va ekskursiyalarda mashinali haydovchi', en: 'a driver and vehicle for every transfer and tour in the programme' }
      },
      meals: { ru: 'завтрак в отеле; обед и ужин в кафе национальной кухни (плов, самса, шашлык)', uz: 'nonushta mehmonxonada; tushlik va kechki ovqat milliy taomlar kafesida (palov, somsa, shashlik)', en: 'breakfast at the hotel; lunch and dinner in Uzbek cafés (plov, samsa, shashlik)' },
      guides: { ru: 'гид-экскурсовод на русском языке на всех экскурсиях', uz: 'barcha ekskursiyalarda rus tilida gid', en: 'Russian-speaking guide on every tour' },
      tickets: { ru: 'входные билеты во все объекты программы включены', uz: 'dasturdagi barcha obyektlarga kirish chiptalari kiritilgan', en: 'entrance tickets to every site on the programme are included' },
      excursions: [
        { ru: 'площадь Регистан: медресе Улугбека, Шердор и Тилля-Кари', uz: 'Registon maydoni: Ulug‘bek, Sherdor va Tillakori madrasalari', en: 'the Registan: Ulugh Beg, Sher-Dor and Tilya-Kori madrasas' },
        { ru: 'мавзолей Гур-Эмир', uz: 'Go‘ri Amir maqbarasi', en: 'Gur-e Amir mausoleum' },
        { ru: 'дворец Ак-Сарай, Дорут-Тиловат и Дорус-Саодат в Шахрисабзе', uz: 'Shahrisabzda Oqsaroy, Dorut-Tilovat va Dorus-Saodat', en: 'Ak-Saray, Dorut-Tilovat and Dorus-Saodat in Shahrisabz' },
        { ru: 'некрополь Шахи-Зинда', uz: 'Shohi Zinda nekropoli', en: 'the Shah-i-Zinda necropolis' },
        { ru: 'мечеть Биби-Ханым и базар Сиаб', uz: 'Bibixonim masjidi va Siyob bozori', en: 'Bibi-Khanym Mosque and Siab Bazaar' }
      ],
      included: [
        { ru: 'проживание в отеле 3*, 2 ночи', uz: '3* mehmonxonada yashash, 2 kecha', en: '3* hotel, 2 nights' },
        { ru: 'завтраки', uz: 'nonushtalar', en: 'breakfasts' },
        { ru: 'обеды и ужины по программе', uz: 'dastur bo‘yicha tushlik va kechki ovqatlar', en: 'lunches and dinners on the programme' },
        { ru: 'билеты на поезд Ташкент — Самарканд — Ташкент', uz: 'Toshkent — Samarqand — Toshkent poyezd chiptalari', en: 'train tickets Tashkent — Samarkand — Tashkent' },
        { ru: 'транспортное обслуживание и поездка в Шахрисабз', uz: 'transport xizmati va Shahrisabzga safar', en: 'transport, including the trip to Shahrisabz' },
        { ru: 'трансферы вокзал — отель — вокзал', uz: 'transferlar vokzal — mehmonxona — vokzal', en: 'transfers station — hotel — station' },
        { ru: 'услуги гида', uz: 'gid xizmatlari', en: 'guide' },
        { ru: 'входные билеты', uz: 'kirish chiptalari', en: 'entrance tickets' }
      ],
      excluded: [
        { ru: 'дорога до Ташкента и обратно', uz: 'Toshkentga kelish va qaytish', en: 'getting to Tashkent and back' },
        { ru: 'страховка и личные расходы', uz: 'sug‘urta va shaxsiy xarajatlar', en: 'insurance and personal expenses' },
        { ru: 'мастер-классы и фотосъёмка внутри объектов, где она платная', uz: 'mahorat darslari va pullik joylarda suratga olish', en: 'workshops, and photo fees where a site charges them' }
      ],
      days: [
        {
          place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_0',
          text: { ru: 'Столица Темура и место, где он покоится.', uz: 'Temur poytaxti va u mangu qo‘nim topgan joy.', en: 'Temur’s capital, and the place where he rests.' },
          activities: [
            { ru: 'поезд «Афросиёб» из Ташкента', uz: 'Toshkentdan «Afrosiyob» poyezdi', en: 'Afrosiyob train from Tashkent' },
            { ru: 'площадь Регистан', uz: 'Registon maydoni', en: 'the Registan' },
            { ru: 'мавзолей Гур-Эмир', uz: 'Go‘ri Amir maqbarasi', en: 'Gur-e Amir mausoleum' }
          ],
          practical: { ru: 'Ночь в Самарканде.', uz: 'Tunash Samarqandda.', en: 'Night in Samarkand.' },
          schedule: [
            ['07:30', { ru: 'Сбор группы на Ташкентском вокзале', uz: 'Guruh Toshkent vokzalida yig‘iladi', en: 'The group meets at Tashkent station' }],
            ['08:00–10:30', { ru: 'Поезд «Афросиёб» в Самарканд', uz: '«Afrosiyob» poyezdida Samarqandga', en: 'Afrosiyob train to Samarkand' }],
            ['10:30–12:00', { ru: 'Трансфер, багаж в отель, знакомство с гидом', uz: 'Transfer, yuklar mehmonxonaga, gid bilan tanishuv', en: 'Transfer, bags to the hotel, meet the guide' }],
            ['12:00–13:00', { ru: 'Обед в кафе национальной кухни', uz: 'Milliy taomlar kafesida tushlik', en: 'Lunch in an Uzbek café' }],
            ['13:30–15:30', { ru: 'Площадь Регистан: три медресе и время для фото', uz: 'Registon: uch madrasa va suratga tushish vaqti', en: 'The Registan: three madrasas and time for photos' }],
            ['16:00–17:30', { ru: 'Мавзолей Гур-Эмир', uz: 'Go‘ri Amir maqbarasi', en: 'Gur-e Amir mausoleum' }],
            ['18:30–20:00', { ru: 'Ужин, заселение в отель', uz: 'Kechki ovqat, mehmonxonaga joylashish', en: 'Dinner, hotel check-in' }]
          ]
        },
        {
          place: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' }, image: 'shahr_aks',
          text: { ru: 'Родной город Темура и дворец, который должен был поражать мир.', uz: 'Temurning ona shahri va dunyoni hayratga solishi kerak bo‘lgan saroy.', en: 'Temur’s home town, and the palace meant to astonish the world.' },
          activities: [
            { ru: 'руины дворца Ак-Сарай', uz: 'Oqsaroy saroyi xarobalari', en: 'ruins of the Ak-Saray palace' },
            { ru: 'ансамбли Дорут-Тиловат и Дорус-Саодат', uz: 'Dorut-Tilovat va Dorus-Saodat majmualari', en: 'the Dorut-Tilovat and Dorus-Saodat ensembles' }
          ],
          practical: { ru: '≈ 90 км, 2–2,5 ч в одну сторону. Ночь в Самарканде.', uz: '≈ 90 km, bir tomonga 2–2,5 soat. Tunash Samarqandda.', en: '≈ 90 km, 2–2.5 h each way. Night in Samarkand.' },
          schedule: [
            ['07:00–08:00', { ru: 'Завтрак в отеле', uz: 'Mehmonxonada nonushta', en: 'Breakfast at the hotel' }],
            ['08:00–10:30', { ru: 'Микроавтобус в Шахрисабз через перевал', uz: 'Dovon orqali mikroavtobusda Shahrisabzga', en: 'Minibus to Shahrisabz over the pass' }],
            ['10:30–12:00', { ru: 'Дворец Ак-Сарай', uz: 'Oqsaroy saroyi', en: 'The Ak-Saray palace' }],
            ['12:00–13:00', { ru: 'Обед в историческом центре', uz: 'Tarixiy markazda tushlik', en: 'Lunch in the historic centre' }],
            ['13:00–14:30', { ru: 'Дорут-Тиловат и Дорус-Саодат', uz: 'Dorut-Tilovat va Dorus-Saodat', en: 'Dorut-Tilovat and Dorus-Saodat' }],
            ['14:30–17:30', { ru: 'Возвращение в Самарканд', uz: 'Samarqandga qaytish', en: 'Back to Samarkand' }],
            ['18:30–20:00', { ru: 'Ужин, свободное время', uz: 'Kechki ovqat, bo‘sh vaqt', en: 'Dinner, free time' }]
          ]
        },
        {
          place: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_8',
          text: { ru: 'Улица мавзолеев, мечеть-мечта и дорога домой.', uz: 'Maqbaralar ko‘chasi, orzu-masjid va uyga yo‘l.', en: 'A street of tombs, a dream of a mosque and the way home.' },
          activities: [
            { ru: 'некрополь Шахи-Зинда', uz: 'Shohi Zinda nekropoli', en: 'the Shah-i-Zinda necropolis' },
            { ru: 'мечеть Биби-Ханым и базар Сиаб', uz: 'Bibixonim masjidi va Siyob bozori', en: 'Bibi-Khanym Mosque and Siab Bazaar' },
            { ru: 'поезд в Ташкент', uz: 'Toshkentga poyezd', en: 'train to Tashkent' }
          ],
          practical: { ru: 'Конец пакета в Ташкенте.', uz: 'Paket Toshkentda yakunlanadi.', en: 'The package ends in Tashkent.' },
          schedule: [
            ['08:00–09:00', { ru: 'Завтрак, выезд из отеля', uz: 'Nonushta, mehmonxonadan chiqish', en: 'Breakfast, check-out' }],
            ['09:00–10:30', { ru: 'Некрополь Шахи-Зинда', uz: 'Shohi Zinda nekropoli', en: 'The Shah-i-Zinda necropolis' }],
            ['10:45–12:00', { ru: 'Мечеть Биби-Ханым и базар Сиаб', uz: 'Bibixonim masjidi va Siyob bozori', en: 'Bibi-Khanym Mosque and Siab Bazaar' }],
            ['12:00–13:00', { ru: 'Обед', uz: 'Tushlik', en: 'Lunch' }],
            ['13:00–16:30', { ru: 'Свободное время, сувениры, трансфер на вокзал', uz: 'Bo‘sh vaqt, esdaliklar, vokzalga transfer', en: 'Free time, souvenirs, transfer to the station' }],
            ['17:00–19:15', { ru: 'Поезд «Афросиёб» в Ташкент', uz: '«Afrosiyob» poyezdida Toshkentga', en: 'Afrosiyob train to Tashkent' }],
            ['19:30', { ru: 'Ужин в поезде или в Ташкенте, окончание программы', uz: 'Poyezdda yoki Toshkentda kechki ovqat, dastur yakuni', en: 'Dinner on the train or in Tashkent, end of the programme' }]
          ]
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
      start: { ru: 'Ташкент, встреча в аэропорту', uz: 'Toshkent, aeroportda kutib olish', en: 'Tashkent, airport pick-up' },
      route: [{ ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }],
      brief: {
        hotel: { ru: 'отели 3*, 2 ночи', uz: '3* mehmonxonalar, 2 kecha', en: '3* hotels, 2 nights' },
        transport: { ru: 'поезд «Афросиёб» и микроавтобус', uz: '«Afrosiyob» poyezdi va mikroavtobus', en: 'Afrosiyob train and minibus' },
        meals: { ru: 'завтраки, обеды, ужины', uz: 'nonushta, tushlik, kechki ovqat', en: 'breakfast, lunch, dinner' }
      },
      legs: [
        { from: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, to: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, km: '≈ 600',
          time: { ru: '≈ 4 ч, скоростной поезд «Афросиёб»', uz: '≈ 4 soat, «Afrosiyob» tezyurar poyezdi', en: '≈ 4 h, Afrosiyob high-speed train' } },
        { from: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, to: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, km: '≈ 600',
          time: { ru: '≈ 4 ч, скоростной поезд «Афросиёб»', uz: '≈ 4 soat, «Afrosiyob» tezyurar poyezdi', en: '≈ 4 h, Afrosiyob high-speed train' } }
      ],
      hotel: {
        name: null, address: null,   // TO CONFIRM (one hotel in Tashkent, one in Bukhara)
        stars: '3*',
        city: { ru: '1 ночь в центре Ташкента, 1 ночь в старом городе Бухары', uz: '1 kecha Toshkent markazida, 1 kecha Buxoro eski shahrida', en: '1 night in central Tashkent, 1 night in Bukhara’s old town' },
        room: { ru: '2–3-местные номера (twin / triple)', uz: '2–3 kishilik xonalar (twin / triple)', en: 'twin and triple rooms' },
        nights: 2,
        breakfast: true
      },
      transport: {
        type: { ru: 'скоростной поезд «Афросиёб» Ташкент — Бухара — Ташкент; туристический микроавтобус на трансферах и экскурсиях в Ташкенте', uz: 'Toshkent — Buxoro — Toshkent «Afrosiyob» tezyurar poyezdi; Toshkentda transfer va ekskursiyalar uchun turistik mikroavtobus', en: 'Afrosiyob high-speed train Tashkent — Bukhara — Tashkent; tourist minibus for transfers and tours in Tashkent' },
        model: { ru: 'Mercedes-Benz Sprinter (до 18 мест); для группы 19–20 человек — Isuzu (СамАвто) до 30 мест', uz: 'Mercedes-Benz Sprinter (18 o‘ringacha); 19–20 kishilik guruh uchun — Isuzu (SamAvto) 30 o‘ringacha', en: 'Mercedes-Benz Sprinter (up to 18 seats); for 19–20 people an Isuzu (SamAuto) up to 30 seats' },   // TO CONFIRM with the carrier
        transferIn: { ru: 'включён: аэропорт Ташкента — отель', uz: 'kiritilgan: Toshkent aeroporti — mehmonxona', en: 'included: Tashkent airport to hotel' },
        transferOut: { ru: 'включён: вокзал Ташкента — аэропорт', uz: 'kiritilgan: Toshkent vokzali — aeroport', en: 'included: Tashkent station to airport' },
        driver: { ru: 'водитель с машиной на все трансферы и экскурсии по программе', uz: 'dastur bo‘yicha barcha transfer va ekskursiyalarda mashinali haydovchi', en: 'a driver and vehicle for every transfer and tour in the programme' }
      },
      meals: { ru: 'завтрак в отеле; обед и ужин в кафе национальной кухни (плов, самса, бухарская кухня)', uz: 'nonushta mehmonxonada; tushlik va kechki ovqat milliy taomlar kafesida (palov, somsa, buxoro taomlari)', en: 'breakfast at the hotel; lunch and dinner in Uzbek cafés (plov, samsa, Bukhara dishes)' },
      guides: { ru: 'гид-экскурсовод на русском языке в Ташкенте и Бухаре', uz: 'Toshkent va Buxoroda rus tilida gid', en: 'Russian-speaking guide in Tashkent and Bukhara' },
      tickets: { ru: 'входные билеты во все объекты программы и билеты на поезд включены', uz: 'dasturdagi barcha obyektlarga kirish chiptalari va poyezd chiptalari kiritilgan', en: 'entrance tickets to every site on the programme and train tickets are included' },
      excursions: [
        { ru: 'сквер Амира Темура и Музей истории Темуридов', uz: 'Amir Temur xiyoboni va Temuriylar tarixi davlat muzeyi', en: 'Amir Temur Square and the Museum of Timurid History' },
        { ru: 'комплекс Хаст-Имам', uz: 'Hazrati Imom majmuasi', en: 'the Hast-Imam complex' },
        { ru: 'ансамбль Ляби-Хауз и торговые купола', uz: 'Labi Hovuz ansambli va savdo gumbazlari', en: 'the Lyab-i Hauz ensemble and the trading domes' },
        { ru: 'крепость Арк', uz: 'Ark qal’asi', en: 'the Ark fortress' },
        { ru: 'ансамбль Пои-Калян с минаретом Калян', uz: 'Minorai Kalon bilan Poi Kalon ansambli', en: 'the Po-i-Kalyan ensemble and the Kalyan Minaret' }
      ],
      included: [
        { ru: 'проживание в отелях 3*, 2 ночи', uz: '3* mehmonxonalarda yashash, 2 kecha', en: '3* hotels, 2 nights' },
        { ru: 'завтраки', uz: 'nonushtalar', en: 'breakfasts' },
        { ru: 'обеды и ужины по программе', uz: 'dastur bo‘yicha tushlik va kechki ovqatlar', en: 'lunches and dinners on the programme' },
        { ru: 'билеты на поезд Ташкент — Бухара — Ташкент', uz: 'Toshkent — Buxoro — Toshkent poyezd chiptalari', en: 'train tickets Tashkent — Bukhara — Tashkent' },
        { ru: 'транспортное обслуживание', uz: 'transport xizmati', en: 'transport' },
        { ru: 'трансферы аэропорт — отель и вокзал — аэропорт', uz: 'transferlar aeroport — mehmonxona va vokzal — aeroport', en: 'transfers airport — hotel and station — airport' },
        { ru: 'услуги гида', uz: 'gid xizmatlari', en: 'guide' },
        { ru: 'входные билеты', uz: 'kirish chiptalari', en: 'entrance tickets' }
      ],
      excluded: [
        { ru: 'перелёт до Ташкента и обратно', uz: 'Toshkentga va qaytish aviachiptasi', en: 'flights to Tashkent and back' },
        { ru: 'страховка и личные расходы', uz: 'sug‘urta va shaxsiy xarajatlar', en: 'insurance and personal expenses' },
        { ru: 'мастер-классы и фотосъёмка внутри объектов, где она платная', uz: 'mahorat darslari va pullik joylarda suratga olish', en: 'workshops, and photo fees where a site charges them' }
      ],
      days: [
        {
          place: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' }, image: 'toshkent_cic',
          text: { ru: 'Знакомство со столицей.', uz: 'Poytaxt bilan tanishuv.', en: 'Meeting the capital.' },
          activities: [
            { ru: 'встреча в аэропорту, трансфер в отель', uz: 'aeroportda kutib olish, mehmonxonaga transfer', en: 'airport pick-up, transfer to the hotel' },
            { ru: 'сквер Амира Темура и Музей истории Темуридов', uz: 'Amir Temur xiyoboni va Temuriylar tarixi davlat muzeyi', en: 'Amir Temur Square and the Museum of Timurid History' },
            { ru: 'комплекс Хаст-Имам', uz: 'Hazrati Imom majmuasi', en: 'the Hast-Imam complex' }
          ],
          practical: { ru: 'Ночь в Ташкенте.', uz: 'Tunash Toshkentda.', en: 'Night in Tashkent.' },
          schedule: [
            ['09:00–11:00', { ru: 'Прилёт, встреча группы, трансфер в отель', uz: 'Uchib kelish, guruhni kutib olish, mehmonxonaga transfer', en: 'Arrival, group pick-up, transfer to the hotel' }],
            ['11:00–12:00', { ru: 'Прогулка по центру и инструктаж', uz: 'Markaz bo‘ylab sayr va yo‘l-yo‘riq', en: 'Walk in the centre and briefing' }],
            ['12:00–13:00', { ru: 'Обед в кафе национальной кухни', uz: 'Milliy taomlar kafesida tushlik', en: 'Lunch in an Uzbek café' }],
            ['13:30–14:30', { ru: 'Сквер Амира Темура', uz: 'Amir Temur xiyoboni', en: 'Amir Temur Square' }],
            ['14:45–16:00', { ru: 'Музей истории Темуридов', uz: 'Temuriylar tarixi davlat muzeyi', en: 'Museum of Timurid History' }],
            ['16:30–18:00', { ru: 'Комплекс Хаст-Имам', uz: 'Hazrati Imom majmuasi', en: 'The Hast-Imam complex' }],
            ['18:30–20:00', { ru: 'Ужин, свободное время', uz: 'Kechki ovqat, bo‘sh vaqt', en: 'Dinner, free time' }]
          ]
        },
        {
          place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_3',
          text: { ru: 'Город купцов и торговых куполов.', uz: 'Savdogarlar va savdo gumbazlari shahri.', en: 'A city of merchants and trading domes.' },
          activities: [
            { ru: 'поезд «Афросиёб» в Бухару', uz: '«Afrosiyob» poyezdida Buxoroga', en: 'Afrosiyob train to Bukhara' },
            { ru: 'ансамбль Ляби-Хауз и торговые купола', uz: 'Labi Hovuz ansambli va savdo gumbazlari', en: 'the Lyab-i Hauz ensemble and the trading domes' }
          ],
          practical: { ru: '≈ 600 км, поезд ≈ 4 ч. Ночь в Бухаре.', uz: '≈ 600 km, poyezd ≈ 4 soat. Tunash Buxoroda.', en: '≈ 600 km, train ≈ 4 h. Night in Bukhara.' },
          schedule: [
            ['06:30–07:30', { ru: 'Завтрак, трансфер на вокзал', uz: 'Nonushta, vokzalga transfer', en: 'Breakfast, transfer to the station' }],
            ['08:00–12:00', { ru: 'Поезд «Афросиёб» в Бухару', uz: '«Afrosiyob» poyezdida Buxoroga', en: 'Afrosiyob train to Bukhara' }],
            ['12:00–13:00', { ru: 'Трансфер, заселение в отель', uz: 'Transfer, mehmonxonaga joylashish', en: 'Transfer, hotel check-in' }],
            ['13:00–14:00', { ru: 'Обед с блюдами бухарской кухни', uz: 'Buxoro taomlari bilan tushlik', en: 'Lunch of Bukhara dishes' }],
            ['14:30–16:30', { ru: 'Ансамбль Ляби-Хауз и торговые купола', uz: 'Labi Hovuz ansambli va savdo gumbazlari', en: 'Lyab-i Hauz and the trading domes' }],
            ['16:30–18:00', { ru: 'Прогулка по старому городу', uz: 'Eski shahar bo‘ylab sayr', en: 'Walk in the old town' }],
            ['19:00–20:30', { ru: 'Ужин', uz: 'Kechki ovqat', en: 'Dinner' }]
          ]
        },
        {
          place: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' }, image: 'buxoro_1',
          text: { ru: 'Минарет Калян, крепость Арк и дорога домой.', uz: 'Minorai Kalon, Ark qal’asi va uyga yo‘l.', en: 'The Kalyan Minaret, the Ark fortress and the way home.' },
          activities: [
            { ru: 'крепость Арк', uz: 'Ark qal’asi', en: 'the Ark fortress' },
            { ru: 'ансамбль Пои-Калян', uz: 'Poi Kalon ansambli', en: 'the Po-i-Kalyan ensemble' },
            { ru: 'поезд в Ташкент, трансфер в аэропорт', uz: 'Toshkentga poyezd, aeroportga transfer', en: 'train to Tashkent, airport transfer' }
          ],
          practical: { ru: 'Конец пакета в аэропорту Ташкента.', uz: 'Paket Toshkent aeroportida yakunlanadi.', en: 'The package ends at Tashkent airport.' },
          schedule: [
            ['08:00–09:00', { ru: 'Завтрак, выезд из отеля', uz: 'Nonushta, mehmonxonadan chiqish', en: 'Breakfast, check-out' }],
            ['09:00–10:30', { ru: 'Крепость Арк', uz: 'Ark qal’asi', en: 'The Ark fortress' }],
            ['10:45–12:15', { ru: 'Ансамбль Пои-Калян: минарет, мечеть, медресе', uz: 'Poi Kalon: minora, masjid, madrasa', en: 'Po-i-Kalyan: minaret, mosque, madrasa' }],
            ['12:15–13:15', { ru: 'Обед', uz: 'Tushlik', en: 'Lunch' }],
            ['13:30–15:00', { ru: 'Свободное время, ремесленные лавки', uz: 'Bo‘sh vaqt, hunarmandlar do‘konlari', en: 'Free time, craft shops' }],
            ['15:30–19:30', { ru: 'Поезд «Афросиёб» в Ташкент', uz: '«Afrosiyob» poyezdida Toshkentga', en: 'Afrosiyob train to Tashkent' }],
            ['19:30–20:30', { ru: 'Ужин, трансфер в аэропорт', uz: 'Kechki ovqat, aeroportga transfer', en: 'Dinner, transfer to the airport' }]
          ]
        }
      ]
    }
  ],
  updated: '2026-11-20',

  /* One booking action. Change to a form or another link when ready. */
  bookingUrl: 'https://t.me/djavokhirmirzo'
};
