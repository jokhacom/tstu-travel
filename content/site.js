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
    skip: { ru: 'К туру', uz: 'Turga o‘tish', en: 'To the tour' },
    pause: { ru: 'Пауза', uz: 'Pauza', en: 'Pause' },
    play: { ru: 'Смотреть', uz: 'Ko‘rish', en: 'Play' },
    replay: { ru: 'Смотреть снова', uz: 'Qayta ko‘rish', en: 'Watch again' },
    watch: { ru: 'Смотреть фильм', uz: 'Filmni ko‘rish', en: 'Watch the film' },
    soundOn: { ru: 'Включить звук', uz: 'Ovozni yoqish', en: 'Sound on' },
    soundOff: { ru: 'Выключить звук', uz: 'Ovozni o‘chirish', en: 'Sound off' },
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

  /* ---------- the film (first screen) ----------
   * video/temur-film-1080.mp4 (landscape) and video/temur-film-720v.mp4 (portrait phones).
   * The film has no burnt-in text: these captions are timed to it (seconds) and follow the language.
   * Scene starts: 0, 5.7, 11.1, 16.5, 21.9, 27.3, 32.7, 38.1, 44.3; length 51.8 s. */
  film: {
    cues: [
      { from: 0.9, to: 5.3, k: { ru: '1336 · Кеш', uz: '1336 · Kesh', en: '1336 · Kesh' },
        text: { ru: 'Близ Кеша, нынешнего Шахрисабза, рождается Темур.', uz: 'Kesh, hozirgi Shahrisabz yaqinida Temur dunyoga keladi.', en: 'Near Kesh, today’s Shahrisabz, Temur is born.' } },
      { from: 6.3, to: 10.7, k: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' },
        text: { ru: 'Сын рода барлас — воин и стратег, которому суждено изменить карту Азии.', uz: 'Barlos urug‘ining o‘g‘li — Osiyo xaritasini o‘zgartirishi taqdir etilgan jangchi va sarkarda.', en: 'A son of the Barlas clan: a warrior and strategist destined to redraw the map of Asia.' } },
      { from: 11.7, to: 16.1, k: { ru: '1370 · Балх', uz: '1370 · Balx', en: '1370 · Balkh' },
        text: { ru: 'Его провозглашают правителем. Столицей он выбирает Самарканд.', uz: 'U hukmdor deb e’lon qilinadi. Poytaxt qilib Samarqandni tanlaydi.', en: 'He is proclaimed ruler, and he makes Samarkand his capital.' } },
      { from: 17.1, to: 21.5, k: { ru: '35 лет походов', uz: '35 yillik yurishlar', en: '35 years of campaigns' },
        text: { ru: 'Его держава протянется от Кавказа и Малой Азии до границ Индии.', uz: 'Uning davlati Kavkaz va Kichik Osiyodan Hindiston chegaralarigacha yoyiladi.', en: 'His realm will stretch from the Caucasus and Anatolia to the borders of India.' } },
      { from: 22.5, to: 26.9, k: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
        text: { ru: 'Из каждого похода он везёт в столицу лучших зодчих и мастеров.', uz: 'Har bir yurishdan poytaxtga eng yaxshi me’mor va ustalarni olib keladi.', en: 'From every campaign he brings the finest architects and craftsmen to his capital.' } },
      { from: 27.9, to: 32.3, k: { ru: 'Шахи-Зинда', uz: 'Shohi Zinda', en: 'Shah-i-Zinda' },
        text: { ru: 'Улица бирюзовых мавзолеев. Многие построены для его родных.', uz: 'Moviy maqbaralar ko‘chasi. Ularning ko‘pi uning yaqinlari uchun qurilgan.', en: 'A street of turquoise mausoleums, many built for his family.' } },
      { from: 33.3, to: 37.7, k: { ru: 'Гур-Эмир · 1405', uz: 'Go‘ri Amir · 1405', en: 'Gur-e Amir · 1405' },
        text: { ru: 'Под этим ребристым куполом покоится сам Темур.', uz: 'Bu qovurg‘ali gumbaz ostida Temurning o‘zi yotibdi.', en: 'Beneath this ribbed dome lies Temur himself.' } },
      { from: 38.8, to: 43.8, motto: true },
      { from: 44.9, to: 49.0, k: { ru: 'Шесть веков спустя', uz: 'Olti asr o‘tib', en: 'Six centuries later' },
        text: { ru: 'Это наследие можно увидеть своими глазами.', uz: 'Bu merosni o‘z ko‘zing bilan ko‘rish mumkin.', en: 'You can see this legacy with your own eyes.' } }
    ],
    endAt: 49.0,
    invite: { ru: 'Отправиться в путешествие', uz: 'Sayohatga otlanish', en: 'Set off on the journey' }
  },

  /* ---------- chapters (menu + progress) ---------- */
  chapters: [
    { id: 'prologue', num: '', title: { ru: 'Фильм о Темуре', uz: 'Temur haqida film', en: 'The film' } },
    { id: 'journey', num: '', title: { ru: 'Тур «По следам Темура»', uz: '«Temur izidan» turi', en: 'The tour' } }
  ],

  journey: {
    kicker: { ru: 'Путешествие', uz: 'Sayohat', en: 'The journey' },
    title: { ru: 'Увидеть<br>своими глазами.', uz: 'O‘z ko‘zing<br>bilan ko‘r.', en: 'See it<br>for yourself.' },
    lead: {
      ru: 'Всё, что было в фильме, — в одном маршруте.',
      uz: 'Filmda ko‘rganlaringizning barchasi — bitta yo‘nalishda.',
      en: 'Everything in the film, in a single route.'
    },
    labels: {
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
      included: { ru: 'Включено', uz: 'Narxga kiritilgan', en: 'Included' },
      excluded: { ru: 'Не включено', uz: 'Narxga kiritilmagan', en: 'Not included' },
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
      ru: 'Откроется чат с командой TSTU Travel в Telegram',
      uz: 'TSTU Travel jamoasi bilan Telegram chat ochiladi',
      en: 'Opens a Telegram chat with the TSTU Travel team'
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
        text: { ru: 'Ташкент, Самарканд, Шахрисабз, Бухара. Гид отмечает луч в каждом городе.', uz: 'Toshkent, Samarqand, Shahrisabz, Buxoro. Gid har bir shaharda nurni belgilaydi.', en: 'Tashkent, Samarkand, Shahrisabz, Bukhara. Your guide marks a ray in each city.' } },
      { id: 'friend', n: 3,
        head: { ru: '3 луча — друзья', uz: '3 nur — do‘stlar', en: '3 rays: friends' },
        text: { ru: 'Каждый друг, который поедет в тур по вашей рекомендации, добавляет луч.', uz: 'Tavsiyangiz bilan turga borgan har bir do‘st bitta nur qo‘shadi.', en: 'Each friend who joins the tour on your recommendation adds a ray.' } },
      { id: 'return', n: 1,
        head: { ru: '1 луч — возвращение', uz: '1 nur — qaytish', en: '1 ray: coming back' },
        text: { ru: 'Следующая поездка с TSTU Travel замыкает звезду.', uz: 'TSTU Travel bilan navbatdagi safar yulduzni yakunlaydi.', en: 'Your next trip with TSTU Travel completes the star.' } }
    ],
    rewards: [
      { at: 4, text: { ru: 'Маршрут пройден: именной сертификат «Хранитель узора».', uz: 'Yo‘nalish bosib o‘tildi: «Naqsh posboni» nomli sertifikati.', en: 'Route complete: a named “Keeper of the Pattern” certificate.' } },
      { at: 8, text: { ru: 'Звезда собрана: скидка на следующий тур TSTU Travel.', uz: 'Yulduz to‘liq: TSTU Travel’ning keyingi turiga chegirma.', en: 'Star complete: a discount on your next TSTU Travel tour.' } }
    ],
    note: {
      ru: 'Размер скидки и условия подтверждает команда TSTU Travel.',
      uz: 'Chegirma miqdori va shartlarni TSTU Travel jamoasi tasdiqlaydi.',
      en: 'The discount and terms are confirmed by the TSTU Travel team.'
    }
  },

  footer: {
    event: 'Studturizm 2026',
    cities: { ru: 'Калининград × Узбекистан', uz: 'Kaliningrad × O‘zbekiston', en: 'Kaliningrad × Uzbekistan' },
    by: { ru: 'Проект TSTU Travel', uz: 'TSTU Travel loyihasi', en: 'A TSTU Travel project' }
  }
};
