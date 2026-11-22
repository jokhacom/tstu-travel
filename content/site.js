/*
 * THE LEGACY OF TEMUR — all site text in one place.
 * ---------------------------------------------------------------
 * Every text field is { ru, uz, en }. Edit the words here; the design
 * does not need to change. Keep the three languages in step.
 * Images are referenced by key; see content/photos.js for files and credits.
 * Tour data lives separately in content/tour.js.
 */
window.LEGACY = window.LEGACY || {};
window.LEGACY.site = {
  defaultLang: 'ru',
  languages: ['uz', 'ru', 'en'],

  /* ---------- interface ---------- */
  ui: {
    wordmark: { ru: 'The Legacy of Temur', uz: 'The Legacy of Temur', en: 'The Legacy of Temur' },
    menu: { ru: 'Меню', uz: 'Menyu', en: 'Menu' },
    close: { ru: 'Закрыть', uz: 'Yopish', en: 'Close' },
    skip: { ru: 'Пропустить фильм', uz: 'Filmni o‘tkazib yuborish', en: 'Skip the film' },
    filmSoundOn: { ru: 'Включить звук фильма', uz: 'Film ovozini yoqish', en: 'Turn the film sound on' },
    filmSoundOff: { ru: 'Выключить звук фильма', uz: 'Film ovozini o‘chirish', en: 'Turn the film sound off' },
    toTourShort: { ru: 'К программе', uz: 'Dasturga', en: 'See the programme' },
    pause: { ru: 'Пауза', uz: 'Pauza', en: 'Pause' },
    play: { ru: 'Смотреть', uz: 'Ko‘rish', en: 'Play' },
    replay: { ru: 'Смотреть снова', uz: 'Qayta ko‘rish', en: 'Watch again' },
    watch: { ru: 'Смотреть фильм', uz: 'Filmni ko‘rish', en: 'Watch the film' },
    watchAgain: { ru: 'Смотреть фильм снова', uz: 'Filmni qayta ko‘rish', en: 'Watch the film again' },
    soundOn: { ru: 'Включить звук', uz: 'Ovozni yoqish', en: 'Sound on' },
    soundOff: { ru: 'Выключить звук', uz: 'Ovozni o‘chirish', en: 'Sound off' },
    theme: { ru: 'Светлая / тёмная тема', uz: 'Yorug‘ / qorong‘i mavzu', en: 'Light / dark theme' },
    toTour: { ru: 'Сразу к туру', uz: 'To‘g‘ridan-to‘g‘ri turga', en: 'Go to the journey' },
    credits: { ru: 'Фото и лицензии', uz: 'Suratlar va litsenziyalar', en: 'Photos & licences' },
    creditsIntro: {
      ru: 'Все фотографии реальные и используются по свободным лицензиям. Спасибо авторам.',
      uz: 'Barcha suratlar haqiqiy va erkin litsenziyalar asosida foydalanilgan. Mualliflarga rahmat.',
      en: 'All photographs are real and used under free licences. Thank you to the photographers.'
    },
    placeholder: { ru: 'Плейсхолдер', uz: 'Vaqtinchalik', en: 'Placeholder' },
    draft: { ru: 'Проект', uz: 'Loyiha', en: 'Draft' },
    noscript: {
      ru: 'Для просмотра сайта включите JavaScript.',
      uz: 'Saytni ko‘rish uchun JavaScript’ni yoqing.',
      en: 'Please enable JavaScript to view this site.'
    }
  },

  /* ---------- opening ---------- */
  intro: {
    line1: { ru: '«Сомневаешься в нашем могуществе?', uz: '«Agar bizning qudratimizga shubha qilsang,', en: '“If you doubt our power,' },
    line2: { ru: 'Взгляни на наши творения!»', uz: 'biz qurgan imoratlarga boq»', en: 'look at our buildings.”' },
    motto: {
      ru: '«Сомневаешься в нашем могуществе? Взгляни на наши творения!»',
      uz: '«Agar bizning qudratimizga shubha qilsang, biz qurgan imoratlarga boq»',
      en: '“If you doubt our power, look at our buildings.”'
    },
    mottoNote: {
      ru: 'Девиз, который традиционно приписывают Амиру Темуру',
      uz: 'An’anaviy ravishda Amir Temurga nisbat beriladigan shior',
      en: 'A motto traditionally attributed to Amir Temur'
    },
    title: { ru: 'The Legacy of Temur', uz: 'The Legacy of Temur', en: 'The Legacy of Temur' },
    country: { ru: 'Узбекистан', uz: 'O‘zbekiston', en: 'Uzbekistan' },
    portraitNote: {
      ru: 'Портреты Темура в фильме — художественная интерпретация, а не историческое сходство.',
      uz: 'Filmdagi Temur portretlari badiiy talqin, tarixiy o‘xshashlik emas.',
      en: 'The portraits of Temur in the film are an artistic interpretation, not a historical likeness.'
    }
  },

  /* ---------- the documentary (first visit) ----------
   * HOW TO PUT IN THE REAL FILM: copy the file into video/ and change `src` below.
   * One file is enough: use the same path for landscape and portrait.
   * If the real film has its own narration or burnt-in subtitles, set `cues: []`.
   * Then update the posters (`poster`: a frame near the start; `endFrame`: the last frame),
   * which are also the background of the opened site. If the real film has no black bars,
   * set `letterbox: 0`. Nothing else needs to change.
   * Set `src: null` to switch the film off: the site then opens straight onto the tour.
   *
   * Cue options: pos = bl | br | tl | tr | l | r | c (where in the frame); look = year (big number `n`),
   * place (kicker as a big word), quote (large italic, centred). Leave them out for the plain style.
   *
   * Now: the 90-second film «The Legacy of Temur» (30 fps, bitrate capped at ~1 Mbit/s for 720p and
   * ~0.55 Mbit/s for the phone 480p so it streams without stalls) with its own music and sound effects and Russian
   * subtitles burnt into the picture (so `cues` is empty). It has no black bars. On a phone held upright
   * the whole frame is shown (portraitFit: 'contain'), so the subtitles are never cut off. */
  film: {
    standIn: false,
    src: { landscape: 'video/temur-film-720.mp4?v=6', portrait: 'video/temur-film-480.mp4?v=6' },   // 720p for screens, a lighter 480p for upright phones   // bump ?v= when the file changes (browsers cache video for 7 days)
    poster: { landscape: 'img/film-poster.webp?v=5', portrait: 'img/film-poster.webp?v=5' },
    endFrame: { landscape: 'img/film-end.webp?v=5', portrait: 'img/film-end.webp?v=5' },
    letterbox: 0,
    portraitFit: 'contain',
    ownTitle: true,   // the film ends on its own title card, so the site does not lay its title over it when it opens
    /* SOUND
     * voice: true when the video file has its own sound. The film has music and sound effects in it.
     * music: a separate background MP3 that follows the picture (e.g. 'audio/film-music.mp3'). null = none.
     *   It plays only when the viewer turns the sound on, dips to `duckTo` while the narrator speaks
     *   and rises at `swellAt`. With no voice and no music, the sound button is hidden.
     * On the first visit the film starts muted (browsers block autoplay with sound): a tap or the sound
     * button turns it on. Opened with the «Watch the film» button, it starts with sound. */
    voice: true,
    music: null,
    musicVolume: 0.75,
    duckTo: 0.3,
    swellAt: null,
    duck: [],
    cues: [],
    motto: {
      ru: ['Если ты сомневаешься в нашем могуществе —', 'взгляни на наши творения'],
      uz: ['Agar bizning qudratimizga shubha qilsang,', 'biz qurgan imoratlarga boq'],
      en: ['If you doubt our power,', 'look at our buildings']
    },
    invite: { ru: 'Теперь ваша очередь увидеть это своими глазами.', uz: 'Endi navbat sizda — buni o‘z ko‘zingiz bilan ko‘ring.', en: 'Now it’s your turn to see it with your own eyes.' },
    standInNote: {
      ru: 'Временный ролик из фотографий. Полноценный документальный фильм в работе.',
      uz: 'Suratlardan yig‘ilgan vaqtinchalik rolik. To‘liq hujjatli film tayyorlanmoqda.',
      en: 'A temporary clip made from photographs. The full documentary is in production.'
    },
    unlockLead: { ru: '«Сомневаешься в нашем могуществе? Взгляни на наши творения!»', uz: '«Agar bizning qudratimizga shubha qilsang, biz qurgan imoratlarga boq»', en: '“If you doubt our power, look at our buildings.”' }
  },

  /* ---------- booking form (the «Забронировать тур» buttons) ----------
   * Requests are sent by email through FormSubmit (formsubmit.co, free, no database).
   * The very first request triggers a one-time activation email from FormSubmit to this address:
   * open it and press «Activate Form». After that every request arrives as an email.
   * Tip: after activation FormSubmit gives a random alias (e.g. 'a1b2c3…'): put it in place of the
   * address below so the address is not visible in the page code. */
  booking: {
    to: 'mirkomilovjavohir562@gmail.com',
    // Web3Forms access key (web3forms.com: enter the email, the key arrives by email). When set, it is used instead of FormSubmit.
    web3formsKey: 'd0a9c1d3-a5f9-43b9-aca7-b79b5a7328d5',
    telegram: 'https://t.me/djavokhirmirzo',
    title: { ru: 'Заявка на тур', uz: 'Turga ariza', en: 'Book the tour' },
    lead: {
      ru: 'Выберите пакет и дату, и мы свяжемся с вами, чтобы всё уточнить.',
      uz: 'Paket va sanani tanlang, biz siz bilan bog‘lanib, hammasini aniqlashtiramiz.',
      en: 'Choose a package and a date, and we will get in touch to confirm the details.'
    },
    name: { ru: 'Ваше имя', uz: 'Ismingiz', en: 'Your name' },
    contact: { ru: 'Телефон или Telegram', uz: 'Telefon yoki Telegram', en: 'Phone or Telegram' },
    contactPh: { ru: '+998 … или @username', uz: '+998 … yoki @username', en: '+998 … or @username' },
    date: { ru: 'Желаемая дата поездки', uz: 'Sayohatning istalgan sanasi', en: 'Preferred travel date' },
    pkg: { ru: 'Пакет', uz: 'Paket', en: 'Package' },
    both: { ru: 'Оба пакета', uz: 'Ikkala paket', en: 'Both packages' },
    bothNote: { ru: '6 дней, 4 города', uz: '6 kun, 4 shahar', en: '6 days, 4 cities' },
    message: { ru: 'Ваше сообщение', uz: 'Xabaringiz', en: 'Your message' },
    messagePh: {
      ru: 'Сколько вас человек, вопросы, пожелания…',
      uz: 'Necha kishisiz, savollar, istaklar…',
      en: 'How many of you, questions, wishes…'
    },
    send: { ru: 'Отправить заявку', uz: 'Arizani yuborish', en: 'Send the request' },
    sending: { ru: 'Отправляем…', uz: 'Yuborilmoqda…', en: 'Sending…' },
    okTitle: { ru: 'Спасибо!', uz: 'Rahmat!', en: 'Thank you!' },
    ok: {
      ru: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
      uz: 'Ariza yuborildi. Tez orada siz bilan bog‘lanamiz.',
      en: 'Your request has been sent. We will get in touch soon.'
    },
    err: {
      ru: 'Не получилось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.',
      uz: 'Arizani yuborib bo‘lmadi. Qayta urinib ko‘ring yoki bizga Telegramda yozing.',
      en: 'The request could not be sent. Please try again or write to us on Telegram.'
    },
    joinHint: {
      ru: 'Удерживайте билет и перетащите его на другой, чтобы соединить оба пакета',
      uz: 'Ikkala paketni birlashtirish uchun chiptani bosib turing va boshqasiga suring',
      en: 'Press and hold a ticket, then drag it onto the other to join both packages'
    },
    join: { ru: 'Соединить пакеты', uz: 'Paketlarni birlashtirish', en: 'Join the packages' },
    unjoin: { ru: 'Разъединить', uz: 'Ajratish', en: 'Separate' },
    bookBoth: { ru: 'Забронировать оба', uz: 'Ikkalasini band qilish', en: 'Book both' },
    notActive: {
      ru: 'Форма ещё не активирована: на почту сайта пришло письмо от FormSubmit, нажмите в нём «Activate Form» и отправьте заявку снова.',
      uz: 'Forma hali faollashtirilmagan: sayt pochtasiga FormSubmit xati keldi, undagi «Activate Form» tugmasini bosing va arizani qayta yuboring.',
      en: 'The form is not activated yet: FormSubmit sent an email to the site address; press «Activate Form» in it and send the request again.'
    },
    mail: { ru: 'Отправить письмом', uz: 'Xat orqali yuborish', en: 'Send by email' },
    offline: { ru: 'нет связи с сервисом отправки', uz: 'yuborish xizmati bilan aloqa yo‘q', en: 'no connection to the sending service' },
    tg: { ru: 'Написать в Telegram', uz: 'Telegramda yozish', en: 'Write on Telegram' },
    required: { ru: 'Заполните отмеченные поля', uz: 'Belgilangan maydonlarni to‘ldiring', en: 'Please fill in the marked fields' },
    subject: { ru: 'Новая заявка на тур «По следам Тамерлана»', uz: 'Новая заявка на тур «По следам Тамерлана»', en: 'Новая заявка на тур «По следам Тамерлана»' }
  },

  // the first screen: photos that switch (keys from photos.js). night: true shows the film's night frame in the dark theme
  heroSlides: [
    { image: 'samarqand_0', name: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
    { image: 'shahr_aks', name: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' } },
    { image: 'toshkent_cic', name: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' } },
    { image: 'buxoro_3', name: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' } }
  ],
  hero: {
    kicker: { ru: 'Узбекистан · TSTU Travel', uz: 'O‘zbekiston · TSTU Travel', en: 'Uzbekistan · TSTU Travel' },
    badge: { ru: 'Смотреть фильм', uz: 'Filmni ko‘rish', en: 'Watch the film' },
    group: { ru: 'Группа', uz: 'Guruh', en: 'Group' }
  },

  /* ---------- chapters (menu + progress) ---------- */
  chapters: [
    { id: 'prologue', num: '', title: { ru: 'Фильм о Темуре', uz: 'Temur haqida film', en: 'The film' } },
    { id: 'journey', num: '', title: { ru: 'Тур «По следам Тамерлана»', uz: '«Temur izidan» turi', en: 'In the footsteps of Tamerlane' } }
  ],

  journey: {
    kicker: { ru: 'Путешествие', uz: 'Sayohat', en: 'The journey' },
    title: { ru: 'Увидеть<br>своими глазами.', uz: 'O‘z ko‘zingiz<br>bilan ko‘ring.', en: 'See it<br>for yourself.' },
    lead: {
      ru: 'Всё, что было в фильме, — в одном маршруте.',
      uz: 'Filmda ko‘rganlaringizning barchasi — bitta yo‘nalishda.',
      en: 'Everything in the film, in a single route.'
    },
    labels: {
      details: { ru: 'Подробная программа и условия', uz: 'Batafsil dastur va shartlar', en: 'Full programme and terms' },
      detailsNote: { ru: 'Расписание по часам, отель, транспорт, питание и экскурсии', uz: 'Soatbay jadval, mehmonxona, transport, ovqatlanish va ekskursiyalar', en: 'Hour-by-hour plan, hotel, transport, meals and tours' },
      dayHours: { ru: 'Расписание дня', uz: 'Kun jadvali', en: 'Day schedule' },
      hours: { ru: 'По часам', uz: 'Soatbay', en: 'Hour by hour' },
      excursions: { ru: 'Экскурсионная программа', uz: 'Ekskursiya dasturi', en: 'Tours' },
      modelNote: { ru: 'Машину под размер группы подбирает перевозчик; марка и модель подтверждаются при бронировании.', uz: 'Mashinani guruh hajmiga qarab tashuvchi tanlaydi; markasi va modeli band qilishda tasdiqlanadi.', en: 'The carrier picks a vehicle to fit the group; make and model are confirmed at booking.' },
      audience: { ru: 'Для кого', uz: 'Kim uchun', en: 'Who it is for' },
      tourismType: { ru: 'Вид туризма', uz: 'Turizm turi', en: 'Type of travel' },
      cities: { ru: 'Города', uz: 'Shaharlar', en: 'The cities' },
      packages: { ru: 'Пакеты тура', uz: 'Tur paketlari', en: 'Tour packages' },
      chooseTab: { ru: 'Выберите пакет', uz: 'Paketni tanlang', en: 'Choose a package' },
      pkgShort: { ru: 'Пакет', uz: 'Paket', en: 'Package' },
      whenWhere: { ru: 'Даты и маршрут', uz: 'Sanalar va yo‘nalish', en: 'Dates and route' },
      dates: { ru: 'Даты начала и окончания', uz: 'Boshlanish va tugash sanalari', en: 'Start and end dates' },
      start: { ru: 'Город отправления', uz: 'Jo‘nash shahri', en: 'Departure city' },
      legs: { ru: 'Переезды: расстояние и время в пути', uz: 'Yo‘llar: masofa va yo‘l vaqti', en: 'Journeys: distance and travel time' },
      km: { ru: 'км', uz: 'km', en: 'km' },
      approx: { ru: 'Расстояния и время в пути ориентировочные.', uz: 'Masofa va yo‘l vaqti taxminiy.', en: 'Distances and travel times are approximate.' },
      stay: { ru: 'Размещение', uz: 'Joylashtirish', en: 'Accommodation' },
      hotel: { ru: 'Отель', uz: 'Mehmonxona', en: 'Hotel' },
      stars: { ru: 'Звёзды', uz: 'Yulduzlar', en: 'Stars' },
      address: { ru: 'Адрес', uz: 'Manzil', en: 'Address' },
      location: { ru: 'Где', uz: 'Qayerda', en: 'Where' },
      room: { ru: 'Тип номера', uz: 'Xona turi', en: 'Room type' },
      nights: { ru: 'Ночей', uz: 'Kechalar', en: 'Nights' },
      breakfast: { ru: 'Завтрак', uz: 'Nonushta', en: 'Breakfast' },
      yes: { ru: 'включён', uz: 'kiritilgan', en: 'included' },
      no: { ru: 'не включён', uz: 'kiritilmagan', en: 'not included' },
      vehicle: { ru: 'Тип транспорта', uz: 'Transport turi', en: 'Vehicle type' },
      model: { ru: 'Марка и модель', uz: 'Markasi va modeli', en: 'Make and model' },
      transferIn: { ru: 'Трансфер аэропорт — отель', uz: 'Transfer aeroport — mehmonxona', en: 'Transfer airport to hotel' },
      transferOut: { ru: 'Трансфер отель — аэропорт', uz: 'Transfer mehmonxona — aeroport', en: 'Transfer hotel to airport' },
      driver: { ru: 'Услуги водителя', uz: 'Haydovchi xizmatlari', en: 'Driver' },
      mealsTours: { ru: 'Питание и экскурсии', uz: 'Ovqatlanish va ekskursiyalar', en: 'Meals and tours' },
      meals: { ru: 'Питание', uz: 'Ovqatlanish', en: 'Meals' },
      guides: { ru: 'Гиды', uz: 'Gidlar', en: 'Guides' },
      tickets: { ru: 'Входные билеты', uz: 'Kirish chiptalari', en: 'Entrance tickets' },
      duration: { ru: 'Длительность', uz: 'Davomiyligi', en: 'Duration' },
      travelers: { ru: 'Путешественников', uz: 'Sayohatchilar', en: 'Travellers' },
      price: { ru: 'Стоимость', uz: 'Narxi', en: 'Price' },
      season: { ru: 'Сезон', uz: 'Mavsum', en: 'Season' },
      level: { ru: 'Физическая нагрузка', uz: 'Jismoniy yuklama', en: 'Physical level' },
      transport: { ru: 'Транспорт', uz: 'Transport', en: 'Transport' },
      outcomes: { ru: 'Что получит участник', uz: 'Ishtirokchi nima oladi', en: 'What participants take home' },
      updated: { ru: 'Обновлено', uz: 'Yangilangan', en: 'Updated' },
      destinations: { ru: 'Маршрут', uz: 'Yo‘nalish', en: 'Route' },
      highlights: { ru: 'Главные места', uz: 'Asosiy joylar', en: 'Highlights' },
      included: { ru: 'Что включено', uz: 'Nimalar kiritilgan', en: 'What’s included' },
      excluded: { ru: 'Не включено', uz: 'Kiritilmagan', en: 'Not included' },
      itinerary: { ru: 'Программа по дням', uz: 'Kunlik dastur', en: 'Day by day' },
      day: { ru: 'День', uz: 'Kun', en: 'Day' },
      activities: { ru: 'Что будет', uz: 'Nimalar bo‘ladi', en: 'Activities' },
      practical: { ru: 'Практически', uz: 'Amaliy ma’lumot', en: 'Practical' },
      tbd: { ru: 'Уточняется командой', uz: 'Jamoa tomonidan aniqlanmoqda', en: 'To be announced by the team' },
      dayPlaceholder: {
        ru: 'Программа этого дня появится, когда команда её утвердит.',
        uz: 'Bu kun dasturi jamoa tasdiqlagach paydo bo‘ladi.',
        en: 'This day’s programme will appear once the team confirms it.'
      }
    },
    cta: { ru: 'Забронировать тур', uz: 'Turni band qilish', en: 'Book the tour' },
    ctaNote: {
      ru: 'Заявка придёт команде TSTU Travel, мы свяжемся с вами',
      uz: 'Ariza TSTU Travel jamoasiga boradi, biz siz bilan bog‘lanamiz',
      en: 'Your request goes to the TSTU Travel team and we will get back to you'
    }
  },

  /* ---------- Master's Star: loyalty programme (inside the journey) ---------- */
  star: {
    kicker: { ru: 'Программа лояльности', uz: 'Sodiqlik dasturi', en: 'Loyalty programme' },
    title: { ru: 'Звезда мастера', uz: 'Usta yulduzi', en: 'The Master’s Star' },
    lead: {
      ru: 'Мастера Темура строили узор из одной восьмиконечной звезды. Ваша звезда собирается так же — луч за лучом. Каждый участник получает именную карточку-звезду.',
      uz: 'Temur ustalari naqshni bitta sakkiz qirrali yulduzdan qurgan. Sizning yulduzingiz ham shunday — nurma-nur yig‘iladi. Har bir ishtirokchi nomli yulduz-karta oladi.',
      en: 'Temur’s masters built their patterns from a single eight-pointed star. Yours comes together the same way, ray by ray. Every traveller gets a named star card.'
    },
    groups: [
      { id: 'city', n: 4,
        head: { ru: '4 луча — города маршрута', uz: '4 nur — yo‘nalish shaharlari', en: '4 rays: the cities of the route' },
        text: { ru: 'Самарканд и Шахрисабз в первом пакете, Ташкент и Бухара во втором. Гид отмечает луч в каждом городе.', uz: 'Birinchi paketda Samarqand va Shahrisabz, ikkinchisida Toshkent va Buxoro. Gid har bir shaharda nurni belgilaydi.', en: 'Samarkand and Shahrisabz in package 1, Tashkent and Bukhara in package 2. Your guide marks a ray in each city.' } },
      { id: 'friend', n: 3,
        head: { ru: '3 луча — друзья', uz: '3 nur — do‘stlar', en: '3 rays: friends' },
        text: { ru: 'Каждый друг, который поедет в тур по вашей рекомендации, добавляет луч.', uz: 'Tavsiyangiz bilan turga borgan har bir do‘st bitta nur qo‘shadi.', en: 'Each friend who joins the tour on your recommendation adds a ray.' } },
      { id: 'return', n: 1,
        head: { ru: '1 луч — возвращение', uz: '1 nur — qaytish', en: '1 ray: coming back' },
        text: { ru: 'Следующая поездка с TSTU Travel замыкает звезду.', uz: 'TSTU Travel bilan navbatdagi safar yulduzni yakunlaydi.', en: 'Your next trip with TSTU Travel completes the star.' } }
    ],
    rewards: [
      { at: 4, text: { ru: 'Оба пакета пройдены: именной сертификат «Хранитель узора».', uz: 'Ikkala paket bosib o‘tildi: «Naqsh posboni» nomli sertifikati.', en: 'Both packages done: a named “Keeper of the Pattern” certificate.' } },
      { at: 8, text: { ru: 'Звезда собрана: скидка на следующий тур TSTU Travel.', uz: 'Yulduz to‘liq: TSTU Travel’ning keyingi turiga chegirma.', en: 'Star complete: a discount on your next TSTU Travel tour.' } }
    ],
    note: {
      ru: 'Размер скидки и условия подтверждает команда TSTU Travel.',
      uz: 'Chegirma miqdori va shartlarni TSTU Travel jamoasi tasdiqlaydi.',
      en: 'The discount and terms are confirmed by the TSTU Travel team.'
    }
  },

  footer: {
    event: 'The Legacy of Temur',
    cities: { ru: 'Узбекистан', uz: 'O‘zbekiston', en: 'Uzbekistan' },
    by: { ru: 'Проект TSTU Travel', uz: 'TSTU Travel loyihasi', en: 'A TSTU Travel project' }
  }
};
