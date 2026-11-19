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
   * Now: a TEMPORARY clip made from the site's own photos (60 s, ambient sound),
   * scene starts 0, 5.7, 11.1, 16.5, 21.9, 27.3, 32.7, 37.3, 41.9, 46.1, 50.3. */
  film: {
    standIn: true,
    src: { landscape: 'video/temur-film-1080.mp4', portrait: 'video/temur-film-720v.mp4' },
    poster: { landscape: 'img/film-poster.webp', portrait: 'img/film-poster-v.webp' },
    endFrame: { landscape: 'img/film-end.webp', portrait: 'img/film-end-v.webp' },
    letterbox: 0.11,   // height of each black bar in the landscape cut (share of the frame); 0 = none
    cues: [
      { from: 0.9, to: 5.3, k: { ru: '1336 · Кеш', uz: '1336 · Kesh', en: '1336 · Kesh' },
        text: { ru: 'Близ Кеша, нынешнего Шахрисабза, рождается Темур.', uz: 'Kesh, hozirgi Shahrisabz yaqinida Temur dunyoga keladi.', en: 'Near Kesh, today’s Shahrisabz, Temur is born.' } },
      { from: 6.3, to: 10.7, k: { ru: 'Начало пути', uz: 'Yo‘l boshi', en: 'The road begins' },
        text: { ru: 'Сын рода барлас, с юности в седле — воин и стратег.', uz: 'Barlos urug‘ining o‘g‘li, yoshligidan egarda — jangchi va sarkarda.', en: 'A son of the Barlas clan, in the saddle from youth: a warrior and a strategist.' } },
      { from: 11.7, to: 16.1, k: { ru: '1370 · Самарканд', uz: '1370 · Samarqand', en: '1370 · Samarkand' },
        text: { ru: 'Его провозглашают правителем. Столицей он делает Самарканд.', uz: 'U hukmdor deb e’lon qilinadi. Samarqandni poytaxt qiladi.', en: 'He is proclaimed ruler, and he makes Samarkand his capital.' } },
      { from: 17.1, to: 21.5, k: { ru: 'Империя', uz: 'Saltanat', en: 'An empire' },
        text: { ru: 'Его держава протянется от Кавказа и Малой Азии до границ Индии.', uz: 'Uning davlati Kavkaz va Kichik Osiyodan Hindiston chegaralarigacha yoyiladi.', en: 'His realm will stretch from the Caucasus and Anatolia to the borders of India.' } },
      { from: 22.5, to: 26.9, k: { ru: 'Шахи-Зинда', uz: 'Shohi Zinda', en: 'Shah-i-Zinda' },
        text: { ru: 'Лучшие зодчие державы строят в Самарканде улицу бирюзовых мавзолеев.', uz: 'Saltanatning eng yaxshi me’morlari Samarqandda moviy maqbaralar ko‘chasini quradi.', en: 'The finest architects of his realm raise a street of turquoise mausoleums in Samarkand.' } },
      { from: 27.9, to: 32.3, k: { ru: 'Гур-Эмир · 1405', uz: 'Go‘ri Amir · 1405', en: 'Gur-e Amir · 1405' },
        text: { ru: 'Под этим ребристым куполом покоится сам Темур.', uz: 'Bu qovurg‘ali gumbaz ostida Temurning o‘zi yotibdi.', en: 'Beneath this ribbed dome lies Temur himself.' } },
      { from: 33.3, to: 36.9, k: { ru: 'Шесть веков спустя', uz: 'Olti asr o‘tib', en: 'Six centuries later' },
        text: { ru: 'Самарканд по-прежнему поражает мир.', uz: 'Samarqand hamon dunyoni hayratga soladi.', en: 'Samarkand still astonishes the world.' } },
      { from: 37.9, to: 41.5, k: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' },
        text: { ru: 'Порталы его дворца Ак-Сарай стоят до сих пор.', uz: 'Uning Oqsaroy saroyi peshtoqlari hamon tik turibdi.', en: 'The portals of his Ak-Saray palace still stand.' } },
      { from: 42.5, to: 45.7, k: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
        text: { ru: 'Купола и минареты древнего города.', uz: 'Qadimiy shaharning gumbaz va minoralari.', en: 'The domes and minarets of an ancient city.' } },
      { from: 46.7, to: 49.9, k: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
        text: { ru: 'Столица современного Узбекистана.', uz: 'Zamonaviy O‘zbekiston poytaxti.', en: 'The capital of modern Uzbekistan.' } },
      { from: 51.0, to: 55.8, motto: true },
      { from: 56.3, to: 60.3, invite: true }
    ],
    motto: {
      ru: ['Если ты сомневаешься в нашем могуществе —', 'взгляни на наши творения'],
      uz: ['Agar bizning qudratimizga shubha qilsang,', 'biz qurgan imoratlarga boq'],
      en: ['If you doubt our power,', 'look at our buildings']
    },
    invite: { ru: 'Теперь твоя очередь увидеть это своими глазами.', uz: 'Endi navbat senda — buni o‘z ko‘zing bilan ko‘r.', en: 'Now it’s your turn to see it with your own eyes.' },
    standInNote: {
      ru: 'Временный ролик из фотографий. Полноценный документальный фильм в работе.',
      uz: 'Suratlardan yig‘ilgan vaqtinchalik rolik. To‘liq hujjatli film tayyorlanmoqda.',
      en: 'A temporary clip made from photographs. The full documentary is in production.'
    },
    unlockLead: { ru: 'Хочешь увидеть это вживую? Вот наше путешествие.', uz: 'Buni jonli ko‘rishni xohlaysanmi? Mana bizning sayohatimiz.', en: 'Want to see it for real? Here is our journey.' }
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
