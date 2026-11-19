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
    skip: { ru: 'Пропустить интро', uz: 'Introni o‘tkazib yuborish', en: 'Skip intro' },
    scroll: { ru: 'Листайте, чтобы открыть', uz: 'Kashf etish uchun pastga suring', en: 'Scroll to discover' },
    soundOn: { ru: 'Включить звук', uz: 'Ovozni yoqish', en: 'Sound on' },
    soundOff: { ru: 'Выключить звук', uz: 'Ovozni o‘chirish', en: 'Sound off' },
    explore: { ru: 'Рассмотреть', uz: 'Yaqindan ko‘rish', en: 'Explore' },
    chapter: { ru: 'Глава', uz: 'Bob', en: 'Chapter' },
    toTour: { ru: 'Сразу к туру', uz: 'To‘g‘ridan-to‘g‘ri turga', en: 'Go to the journey' },
    credits: { ru: 'Фото и лицензии', uz: 'Suratlar va litsenziyalar', en: 'Photos & licences' },
    creditsIntro: {
      ru: 'Все фотографии реальные и используются по свободным лицензиям. Спасибо авторам.',
      uz: 'Barcha suratlar haqiqiy va erkin litsenziyalar asosida foydalanilgan. Mualliflarga rahmat.',
      en: 'All photographs are real and used under free licences. Thank you to the photographers.'
    },
    placeholder: { ru: 'Плейсхолдер', uz: 'Vaqtinchalik', en: 'Placeholder' },
    draft: { ru: 'Проект', uz: 'Loyiha', en: 'Draft' },
    photoSoon: { ru: 'Плейсхолдер · фото будет добавлено', uz: 'Vaqtinchalik · surat qo‘shiladi', en: 'Placeholder · photo coming' },
    noscript: {
      ru: 'Для просмотра сайта включите JavaScript.',
      uz: 'Saytni ko‘rish uchun JavaScript’ni yoqing.',
      en: 'Please enable JavaScript to view this site.'
    }
  },

  /* ---------- opening ---------- */
  intro: {
    line1: { ru: 'Сомневаешься…', uz: 'Agar shubha qilsang…', en: 'If you doubt…' },
    line2: { ru: '…в нашем могуществе?', uz: '…bizning qudratimizga —', en: '…our power —' },
    line3: { ru: 'Взгляни на наши творения!', uz: 'biz qurgan imoratlarga boq.', en: 'look at our buildings.' },
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
    place: { ru: 'Гур-Эмир · Самарканд', uz: 'Go‘ri Amir · Samarqand', en: 'Gur-e Amir · Samarkand' }
  },

  /* ---------- chapters (menu + progress) ---------- */
  chapters: [
    { id: 'prologue', num: '', title: { ru: 'Пролог', uz: 'Muqaddima', en: 'Prologue' } },
    { id: 'man', num: 'I', title: { ru: 'Человек за наследием', uz: 'Meros ortidagi inson', en: 'The man behind the legacy' } },
    { id: 'walls', num: 'II', title: { ru: 'Архитектура вне времени', uz: 'Vaqtga bo‘ysunmas me’morchilik', en: 'Architecture that defies time' } },
    { id: 'detail', num: 'III', title: { ru: 'Искусство вечности', uz: 'Abadiyat san’ati', en: 'The art of eternity' } },
    { id: 'country', num: 'IV', title: { ru: 'За пределами империи', uz: 'Saltanatdan narida', en: 'Beyond the empire' } },
    { id: 'people', num: 'V', title: { ru: 'Живое наследие', uz: 'Barhayot meros', en: 'The living legacy' } },
    { id: 'journey', num: 'VI', title: { ru: 'Путешествие', uz: 'Sayohat', en: 'The journey' } },
    { id: 'finale', num: '', title: { ru: 'Наследие продолжается', uz: 'Meros davom etadi', en: 'The legacy continues' } }
  ],

  /* ---------- I. The man behind the legacy ---------- */
  man: {
    title: { ru: 'Одно видение.<br>Непреходящее наследие.', uz: 'Bitta orzu.<br>Mangu meros.', en: 'One vision.<br>An enduring legacy.' },
    lead: {
      ru: 'Шесть с половиной веков назад один человек решил, что его столица должна поражать мир. Мир до сих пор приезжает на неё посмотреть.',
      uz: 'Olti yarim asr avval bir inson poytaxti dunyoni hayratga solishi kerak, deb qaror qildi. Dunyo hamon uni ko‘rgani keladi.',
      en: 'Six and a half centuries ago, one man decided that his capital should astonish the world. The world still comes to see it.'
    },
    portraitNote: {
      ru: 'Художественная интерпретация образа. Не историческое портретное сходство.',
      uz: 'Obrazning badiiy talqini. Tarixiy portret o‘xshashligi emas.',
      en: 'An artistic interpretation, not a verified historical likeness.'
    },
    moments: [
      {
        mark: '1336', image: 'temur_think',
        head: { ru: 'Жизнь начинается', uz: 'Hayot boshlanadi', en: 'A life begins' },
        text: {
          ru: 'Темур родился 9 апреля 1336 года близ Кеша — нынешнего Шахрисабза, в семье из рода барлас.',
          uz: 'Temur 1336-yil 9-aprelda Kesh — hozirgi Shahrisabz yaqinida, barlos urug‘idan bo‘lgan oilada tug‘ildi.',
          en: 'Temur was born on 9 April 1336 near Kesh, today’s Shahrisabz, into a family of the Barlas tribe.'
        }
      },
      {
        mark: '1370', image: 'temur_profile',
        head: { ru: 'Новая эра власти', uz: 'Qudratning yangi davri', en: 'A new era of power' },
        text: {
          ru: 'На курултае в Балхе его провозгласили правителем Мавераннахра. Своей столицей он сделал Самарканд.',
          uz: 'Balxdagi qurultoyda u Movarounnahr hukmdori deb e’lon qilindi. Samarqandni o‘z poytaxtiga aylantirdi.',
          en: 'At an assembly in Balkh he was proclaimed ruler of Transoxiana. He made Samarkand his capital.'
        }
      },
      {
        mark: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' }, image: 'samarqand_8',
        head: { ru: 'Сердце империи', uz: 'Saltanat yuragi', en: 'The heart of an empire' },
        text: {
          ru: 'Из походов Темур привозил в столицу зодчих, мастеров и ремесленников. Их руками Самарканд стал городом бирюзовых куполов.',
          uz: 'Temur yurishlardan poytaxtga me’mor, usta va hunarmandlarni olib kelardi. Ularning qo‘li bilan Samarqand moviy gumbazlar shahriga aylandi.',
          en: 'From his campaigns Temur brought architects, masters and craftsmen to the capital. Their hands made Samarkand a city of turquoise domes.'
        }
      },
      {
        mark: { ru: 'Карта', uz: 'Xarita', en: 'The map' }, image: 'map', fit: 'contain',
        head: { ru: 'От Малой Азии до Индии', uz: 'Kichik Osiyodan Hindistongacha', en: 'From Anatolia to India' },
        text: {
          ru: 'За тридцать пять лет походов держава Темура раскинулась от Кавказа и Малой Азии до границ Индии.',
          uz: 'O‘ttiz besh yillik yurishlar davomida Temur davlati Kavkaz va Kichik Osiyodan Hindiston chegaralarigacha yoyildi.',
          en: 'Over thirty-five years of campaigns, Temur’s realm stretched from the Caucasus and Anatolia to the borders of India.'
        }
      },
      {
        mark: '1405', image: 'gur_in',
        head: { ru: 'Конец пути', uz: 'Yo‘l nihoyasi', en: 'The end of the road' },
        text: {
          ru: 'Темур умер 18 февраля 1405 года в Отраре, в начале похода на Китай. Его похоронили в Самарканде, в мавзолее Гур-Эмир.',
          uz: 'Temur 1405-yil 18-fevralda Xitoyga yurish boshida O‘trorda vafot etdi. U Samarqanddagi Go‘ri Amir maqbarasiga dafn etildi.',
          en: 'Temur died on 18 February 1405 at Otrar, at the start of a campaign against China. He was buried in Samarkand, in the Gur-e Amir mausoleum.'
        }
      },
      {
        mark: { ru: 'Наследники', uz: 'Vorislar', en: 'The heirs' }, image: 'ulug',
        head: { ru: 'Наследие продолжили потомки', uz: 'Merosni avlodlar davom ettirdi', en: 'His descendants carried it on' },
        text: {
          ru: 'Многое из того, что называют тимуридским, создали его наследники. Внук Улугбек построил в Самарканде медресе на Регистане (1417–1420) и обсерваторию.',
          uz: 'Temuriylar davri deb ataladigan merosning ko‘pini uning vorislari yaratdi. Nabirasi Ulug‘bek Samarqandda Registondagi madrasani (1417–1420) va rasadxonani qurdirdi.',
          en: 'Much of what we call Timurid was created by his heirs. His grandson Ulugh Beg built the madrasa on the Registan (1417–1420) and an observatory in Samarkand.'
        }
      }
    ]
  },

  /* ---------- II. Architecture that defies time ---------- */
  walls: {
    kicker: { ru: 'Архитектура вне времени', uz: 'Vaqtga bo‘ysunmas me’morchilik', en: 'Architecture that defies time' },
    title: { ru: 'Если бы стены<br>могли говорить.', uz: 'Agar devorlar<br>gapira olsaydi.', en: 'If walls<br>could speak.' },
    lead: {
      ru: 'Четыре памятника Самарканда. Пройдите сквозь их порталы.',
      uz: 'Samarqandning to‘rt obidasi. Ularning peshtoqlaridan o‘ting.',
      en: 'Four monuments of Samarkand. Step through their portals.'
    },
    monuments: [
      {
        id: 'gur', image: 'gur_eve', more: ['gur_in', 'gur_day'],
        label: { ru: 'Самарканд · 1403–1404', uz: 'Samarqand · 1403–1404', en: 'Samarkand · 1403–1404' },
        name: { ru: 'Гур-Эмир', uz: 'Go‘ri Amir', en: 'Gur-e Amir' },
        head: { ru: 'Купол, под которым покоится эпоха', uz: 'Bir davr mangu uyquda yotgan gumbaz', en: 'A dome that shelters an era' },
        text: {
          ru: 'Темур начал строить мавзолей в 1403 году для любимого внука Мухаммад-Султана. Через два года здесь похоронили самого Темура, а позже и Улугбека.',
          uz: 'Temur maqbarani 1403-yilda suyukli nabirasi Muhammad Sulton uchun qurdira boshladi. Ikki yildan so‘ng bu yerga Temurning o‘zi, keyinroq Ulug‘bek ham dafn etildi.',
          en: 'Temur began the mausoleum in 1403 for his beloved grandson Muhammad Sultan. Two years later Temur himself was buried here, and later Ulugh Beg.'
        }
      },
      {
        id: 'bibi', image: 'bibi_wide', more: [],
        label: { ru: 'Самарканд · 1399–1404', uz: 'Samarqand · 1399–1404', en: 'Samarkand · 1399–1404' },
        name: { ru: 'Мечеть Биби-Ханым', uz: 'Bibixonim masjidi', en: 'Bibi-Khanym Mosque' },
        head: { ru: 'Мечта размером с небо', uz: 'Osmon qadar ulkan orzu', en: 'A dream the size of the sky' },
        text: {
          ru: 'Соборную мечеть заложили после индийского похода 1399 года. В своё время она была одной из крупнейших в исламском мире.',
          uz: 'Jome masjidi 1399-yilgi Hindiston yurishidan so‘ng barpo etila boshlandi. O‘z davrida u islom olamidagi eng yirik masjidlardan biri edi.',
          en: 'The congregational mosque was begun after the Indian campaign of 1399. In its day it was one of the largest in the Islamic world.'
        }
      },
      {
        id: 'shah', image: 'shah_wide', more: ['shah_street', 'det_geo'],
        label: { ru: 'Самарканд · XI–XIX века', uz: 'Samarqand · XI–XIX asrlar', en: 'Samarkand · 11th–19th c.' },
        name: { ru: 'Шахи-Зинда', uz: 'Shohi Zinda', en: 'Shah-i-Zinda' },
        head: { ru: 'Улица, где оживает глазурь', uz: 'Sirlar jonlanadigan ko‘cha', en: 'A street where glaze comes alive' },
        text: {
          ru: 'Некрополь вырос вокруг почитаемой гробницы Кусама ибн Аббаса. Большинство мавзолеев построено в XIV–XV веках, многие для родных Темура.',
          uz: 'Nekropol Qusam ibn Abbosning muqaddas qabri atrofida shakllangan. Maqbaralarning aksariyati XIV–XV asrlarda, ko‘pi Temurning yaqinlari uchun qurilgan.',
          en: 'The necropolis grew around the revered tomb of Qusam ibn Abbas. Most mausoleums date from the 14th–15th centuries, many built for Temur’s family.'
        }
      },
      {
        id: 'reg', image: 'samarqand_0', more: ['samarqand_6', 'reg_light'],
        label: { ru: 'Самарканд · XV–XVII века', uz: 'Samarqand · XV–XVII asrlar', en: 'Samarkand · 15th–17th c.' },
        name: { ru: 'Площадь Регистан', uz: 'Registon maydoni', en: 'Registan Square' },
        head: { ru: 'Три фасада, два столетия', uz: 'Uch peshtoq, ikki asr', en: 'Three façades, two centuries' },
        text: {
          ru: 'Первым здесь встало медресе Улугбека (1417–1420). Шердор (1619–1636) и Тилля-Кари (1646–1660) построили уже после Тимуридов.',
          uz: 'Bu yerda dastlab Ulug‘bek madrasasi (1417–1420) qad rostladi. Sherdor (1619–1636) va Tillakori (1646–1660) temuriylardan keyin qurilgan.',
          en: 'Ulugh Beg’s madrasa (1417–1420) came first. Sher-Dor (1619–1636) and Tilya-Kori (1646–1660) were built after the Timurid era.'
        }
      }
    ]
  },

  /* ---------- III. The art of eternity ---------- */
  detail: {
    kicker: { ru: 'Искусство вечности', uz: 'Abadiyat san’ati', en: 'The art of eternity' },
    title: { ru: 'Каждая деталь<br>хранит век.', uz: 'Har bir naqsh<br>bir asrni saqlaydi.', en: 'Every detail<br>holds a century.' },
    items: [
      {
        image: 'det_geo',
        head: { ru: 'Мозаика', uz: 'Koshin', en: 'Mosaic' },
        text: { ru: 'Тысячи кусочков глазури, собранные в геометрию. Шахи-Зинда.', uz: 'Minglab sirli bo‘lakchalar geometriyaga jamlangan. Shohi Zinda.', en: 'Thousands of glazed pieces set into geometry. Shah-i-Zinda.' }
      },
      {
        image: 'det_star',
        head: { ru: 'Каллиграфия', uz: 'Xattotlik', en: 'Calligraphy' },
        text: { ru: 'Слово, ставшее орнаментом, и звезда, ставшая словом. Шахи-Зинда.', uz: 'Naqshga aylangan so‘z va so‘zga aylangan yulduz. Shohi Zinda.', en: 'A word turned into ornament, a star turned into a word. Shah-i-Zinda.' }
      },
      {
        image: 'samarqand_8',
        head: { ru: 'Бирюза и глазурь', uz: 'Firuza va sir', en: 'Turquoise and glaze' },
        text: { ru: 'Купол и портал в изразцах: от неба до земли один узор. Самарканд.', uz: 'Koshinli gumbaz va peshtoq: osmondan yergacha bitta naqsh. Samarqand.', en: 'A tiled dome and portal: one pattern from sky to ground. Samarkand.' }
      },
      {
        image: 'det_orn',
        head: { ru: 'Резная глазурованная терракота', uz: 'O‘ymakor sirli terrakota', en: 'Carved glazed terracotta' },
        text: { ru: 'Рельеф, вырезанный до обжига, а затем покрытый глазурью.', uz: 'Pishirishdan oldin o‘yilib, so‘ng sir bilan qoplangan bo‘rtma naqsh.', en: 'Relief carved before firing, then covered in glaze.' }
      },
      {
        image: 'samarqand_4',
        head: { ru: 'Золото куполов', uz: 'Gumbazlar zari', en: 'The gold of domes' },
        text: { ru: 'Позолоченные соты сталактитов под куполом. Самарканд.', uz: 'Gumbaz ostidagi zarhal muqarnas kataklari. Samarqand.', en: 'Gilded honeycomb vaulting beneath a dome. Samarkand.' }
      },
      {
        image: 'buxoro_1',
        head: { ru: 'Узор из кирпича', uz: 'G‘ishtdan naqsh', en: 'Patterns in brick' },
        text: { ru: 'Обожжённый кирпич, уложенный в орнамент, и бирюзовый купол над ним. Бухара.', uz: 'Naqsh qilib terilgan pishiq g‘isht va uning uzra firuza gumbaz. Buxoro.', en: 'Fired brick laid as ornament beneath a turquoise dome. Bukhara.' }
      },
      {
        image: 'toshkent_3',
        head: { ru: 'Роспись купола', uz: 'Gumbaz naqshi', en: 'A painted dome' },
        text: { ru: 'Мастера продолжают традицию и сегодня. Ташкент.', uz: 'Ustalar bu an’anani bugun ham davom ettirmoqda. Toshkent.', en: 'Masters continue the tradition today. Tashkent.' }
      },
      {
        image: 'det_door',
        head: { ru: 'Резное дерево', uz: 'Yog‘och o‘ymakorligi', en: 'Carved wood' },
        text: { ru: 'Деревянные ворота западных ворот Ичан-Калы. Хива.', uz: 'Ichan qal’aning g‘arbiy darvozasidagi o‘ymakor tabaqalar. Xiva.', en: 'The carved wooden doors of Itchan Kala’s west gate. Khiva.' }
      },
      {
        image: 'det_column',
        head: { ru: 'Колонны Джума-мечети', uz: 'Juma masjidi ustunlari', en: 'Columns of the Juma Mosque' },
        text: { ru: 'Более двухсот резных колонн, часть из них старше самой мечети. Хива.', uz: 'Ikki yuzdan ortiq o‘ymakor ustun, ularning bir qismi masjidning o‘zidan ham qadimiy. Xiva.', en: 'More than two hundred carved columns, some older than the mosque itself. Khiva.' }
      }
    ],
    bridge: {
      ru: 'Один узор. Бесконечное повторение. Так строится и страна.',
      uz: 'Bitta naqsh. Cheksiz takror. Mamlakat ham shunday quriladi.',
      en: 'One pattern. Endless repetition. That is how a country is built, too.'
    }
  },

  /* ---------- IV. Beyond the empire ---------- */
  country: {
    kicker: { ru: 'За пределами империи', uz: 'Saltanatdan narida', en: 'Beyond the empire' },
    title: { ru: 'Одна страна.<br>Бесконечные истории.', uz: 'Bitta mamlakat.<br>Cheksiz hikoyalar.', en: 'One country.<br>Endless stories.' },
    places: [
      {
        id: 'samarkand', style: 'monument', images: ['samarqand_6', 'samarqand_7'],
        name: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
        tag: { ru: 'Монументы и Великий шёлковый путь', uz: 'Obidalar va Buyuk ipak yo‘li', en: 'Monuments and the Silk Road' },
        text: {
          ru: 'Город, отметивший 2750-летие, и перекрёсток культур в списке ЮНЕСКО с 2001 года.',
          uz: '2750 yillik yubileyini nishonlagan shahar, 2001-yildan YuNESKO ro‘yxatidagi madaniyatlar chorrahasi.',
          en: 'A city that has celebrated 2,750 years, on UNESCO’s list as a crossroads of cultures since 2001.'
        }
      },
      {
        id: 'bukhara', style: 'golden', images: ['buxoro_3', 'buxoro_2'],
        name: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
        tag: { ru: 'Старые улицы и живое наследие', uz: 'Qadimiy ko‘chalar va barhayot meros', en: 'Historic streets and living heritage' },
        text: {
          ru: 'Минарет Калян стоит над городом с 1127 года. Исторический центр Бухары в списке ЮНЕСКО с 1993 года.',
          uz: 'Minorai Kalon 1127-yildan beri shahar uzra qad rostlab turibdi. Buxoroning tarixiy markazi 1993-yildan YuNESKO ro‘yxatida.',
          en: 'The Kalyan Minaret has stood over the city since 1127. Bukhara’s historic centre has been on UNESCO’s list since 1993.'
        }
      },
      {
        id: 'khiva', style: 'walls', images: ['xiva_1', 'xiva_5'],
        name: { ru: 'Хива', uz: 'Xiva', en: 'Khiva' },
        tag: { ru: 'Город за стенами Ичан-Калы', uz: 'Ichan qal’a devorlari ortidagi shahar', en: 'The walled city of Itchan Kala' },
        text: {
          ru: 'Ичан-Кала — первый объект Узбекистана в списке ЮНЕСКО (1990). Внутри стен — узкие улицы, минареты и Кальта-Минар, оставшийся недостроенным.',
          uz: 'Ichan qal’a — O‘zbekistonning YuNESKO ro‘yxatidagi birinchi obyekti (1990). Devorlar ichida tor ko‘chalar, minoralar va chala qolgan Kalta minor bor.',
          en: 'Itchan Kala was Uzbekistan’s first UNESCO site (1990). Inside its walls: narrow lanes, minarets and the unfinished Kalta Minor.'
        }
      },
      {
        id: 'tashkent', style: 'shift', images: ['toshkent_3', 'toshkent_4'],
        name: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
        tag: { ru: 'Современная столица с глубокими корнями', uz: 'Chuqur ildizli zamonaviy poytaxt', en: 'A modern capital with deep roots' },
        text: {
          ru: 'Столица отметила 2200-летие в 2009 году. Здесь резные купола соседствуют с небоскрёбами, а метро открылось первым в Центральной Азии.',
          uz: 'Poytaxt 2009-yilda 2200 yilligini nishonladi. Bu yerda naqshinkor gumbazlar osmono‘par binolar bilan yonma-yon, metro esa Markaziy Osiyoda birinchi bo‘lib ochilgan.',
          en: 'The capital celebrated 2,200 years in 2009. Carved domes stand beside towers, and its metro was the first in Central Asia.'
        }
      }
    ]
  },


  /* ---------- Map of the legacy (inside chapter IV) ---------- */
  atlas: {
    kicker: { ru: 'Карта наследия', uz: 'Meros xaritasi', en: 'Map of the legacy' },
    title: { ru: 'Выбери свой ключ к стране', uz: 'Mamlakatga o‘z kalitingni tanla', en: 'Choose your key to the country' },
    lead: {
      ru: 'Отметьте, что вам интересно, и карта покажет, куда ехать. Нажмите на город, чтобы узнать больше и получить штамп в паспорт.',
      uz: 'Sizga nima qiziqligini belgilang, xarita qayerga borishni ko‘rsatadi. Batafsil bilish va pasportga muhr olish uchun shaharni bosing.',
      en: 'Pick what interests you and the map shows where to go. Tap a city to learn more and earn a passport stamp.'
    },
    all: { ru: 'Всё', uz: 'Hammasi', en: 'All' },
    route: { ru: 'Условная линия Великого шёлкового пути', uz: 'Buyuk ipak yo‘lining shartli chizig‘i', en: 'Indicative line of the Silk Road' },
    fromTashkent: { ru: 'км от Ташкента по прямой', uz: 'km Toshkentdan to‘g‘ri chiziqda', en: 'km from Tashkent as the crow flies' },
    capital: { ru: 'Столица', uz: 'Poytaxt', en: 'Capital' },
    more: { ru: 'Открыть историю города', uz: 'Shahar hikoyasini ochish', en: 'Open the city’s story' },
    pick: { ru: 'Выберите город на карте', uz: 'Xaritadan shaharni tanlang', en: 'Choose a city on the map' },
    themes: [
      { id: 'history', name: { ru: 'История Темура', uz: 'Temur tarixi', en: 'Temur’s history' } },
      { id: 'architecture', name: { ru: 'Архитектура', uz: 'Me’morchilik', en: 'Architecture' } },
      { id: 'crafts', name: { ru: 'Ремёсла', uz: 'Hunarmandchilik', en: 'Crafts' } },
      { id: 'taste', name: { ru: 'Вкусы', uz: 'Ta’mlar', en: 'Flavours' } },
      { id: 'modern', name: { ru: 'Современность', uz: 'Zamonaviylik', en: 'Modern life' } }
    ],
    cities: [
      { id: 'samarkand', place: 'samarkand', image: 'samarqand_0', km: 266, themes: ['history', 'architecture', 'crafts', 'taste'],
        name: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' },
        text: { ru: 'Столица Темура: Гур-Эмир, Биби-Ханым, Шахи-Зинда и Регистан.', uz: 'Temur poytaxti: Go‘ri Amir, Bibixonim, Shohi Zinda va Registon.', en: 'Temur’s capital: Gur-e Amir, Bibi-Khanym, Shah-i-Zinda and the Registan.' } },
      { id: 'shahrisabz', image: 'shahr_aks', km: 323, themes: ['history', 'architecture'],
        name: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' },
        text: { ru: 'Родина Темура. Руины дворца Ак-Сарай, который он начал строить в 1380 году. Исторический центр в списке ЮНЕСКО с 2000 года.', uz: 'Temurning vatani. U 1380-yilda qura boshlagan Oqsaroy saroyi xarobalari. Tarixiy markaz 2000-yildan YuNESKO ro‘yxatida.', en: 'Temur’s homeland. The ruins of the Ak-Saray palace he began in 1380. Its historic centre has been on UNESCO’s list since 2000.' } },
      { id: 'bukhara', place: 'bukhara', image: 'buxoro_3', km: 440, themes: ['architecture', 'crafts', 'taste'],
        name: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' },
        text: { ru: 'Торговые купола, медресе и мастерские старого города: золотое шитьё, ковры, чеканка.', uz: 'Savdo gumbazlari, madrasalar va eski shahar ustaxonalari: zardo‘zlik, gilamdo‘zlik, misgarlik.', en: 'Trading domes, madrasas and old-city workshops: gold embroidery, carpets, metal chasing.' } },
      { id: 'khiva', place: 'khiva', image: 'xiva_0', km: 741, themes: ['history', 'architecture', 'crafts'],
        name: { ru: 'Хива', uz: 'Xiva', en: 'Khiva' },
        text: { ru: 'Ичан-Кала: город за глиняными стенами и мастера резьбы по дереву.', uz: 'Ichan qal’a: loy devorlar ortidagi shahar va yog‘och o‘ymakorligi ustalari.', en: 'Itchan Kala: a city behind clay walls, and masters of wood carving.' } },
      { id: 'tashkent', place: 'tashkent', image: 'toshkent_4', km: 0, capital: true, themes: ['modern', 'taste', 'architecture'],
        name: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' },
        text: { ru: 'Метро, Ташкент-Сити, базар Чорсу и комплекс Хазрати Имам.', uz: 'Metro, Tashkent City, Chorsu bozori va Hazrati Imom majmuasi.', en: 'The metro, Tashkent City, Chorsu Bazaar and the Hazrati Imam complex.' } }
    ]
  },

  /* ---------- Heritage passport (stamps) ---------- */
  passport: {
    title: { ru: 'Паспорт наследия', uz: 'Meros pasporti', en: 'Heritage passport' },
    rules: {
      ru: 'Штамп ставится, когда вы проходите главу или открываете город на карте. Всё хранится только в вашем браузере.',
      uz: 'Bobni o‘tganingizda yoki xaritada shaharni ochganingizda muhr qo‘yiladi. Hammasi faqat brauzeringizda saqlanadi.',
      en: 'You get a stamp when you finish a chapter or open a city on the map. Everything stays in your browser only.'
    },
    got: { ru: 'Новый штамп', uz: 'Yangi muhr', en: 'New stamp' },
    done: { ru: 'Путь наследия пройден. Теперь — увидеть всё вживую.', uz: 'Meros yo‘li bosib o‘tildi. Endi hammasini o‘z ko‘zing bilan ko‘r.', en: 'The legacy trail is complete. Now see it for real.' },
    share: { ru: 'Поделиться', uz: 'Ulashish', en: 'Share' },
    copied: { ru: 'Ссылка скопирована', uz: 'Havola nusxalandi', en: 'Link copied' },
    reset: { ru: 'Начать заново', uz: 'Qaytadan boshlash', en: 'Start over' },
    stamps: [
      { id: 'man', name: { ru: 'Темур', uz: 'Temur', en: 'Temur' } },
      { id: 'walls', name: { ru: 'Порталы', uz: 'Peshtoqlar', en: 'Portals' } },
      { id: 'detail', name: { ru: 'Узоры', uz: 'Naqshlar', en: 'Patterns' } },
      { id: 'samarkand', name: { ru: 'Самарканд', uz: 'Samarqand', en: 'Samarkand' } },
      { id: 'shahrisabz', name: { ru: 'Шахрисабз', uz: 'Shahrisabz', en: 'Shahrisabz' } },
      { id: 'bukhara', name: { ru: 'Бухара', uz: 'Buxoro', en: 'Bukhara' } },
      { id: 'khiva', name: { ru: 'Хива', uz: 'Xiva', en: 'Khiva' } },
      { id: 'tashkent', name: { ru: 'Ташкент', uz: 'Toshkent', en: 'Tashkent' } }
    ]
  },

  /* ---------- V. The living legacy ---------- */
  people: {
    kicker: { ru: 'Живое наследие', uz: 'Barhayot meros', en: 'The living legacy' },
    title: { ru: 'Наследие<br>живёт в нас.', uz: 'Meros<br>bizda yashaydi.', en: 'The legacy<br>lives in us.' },
    statement: {
      ru: 'Величие Узбекистана не только в прошлом. Оно живёт в людях, которые строят его будущее.',
      uz: 'O‘zbekistonning buyukligi faqat o‘tmishda emas. U kelajakni qurayotgan insonlarda yashaydi.',
      en: 'Uzbekistan’s greatness is not only in its past. It lives in the people shaping its future.'
    },
    photos: [
      { image: 'buxoro_7', size: 'tall', cap: { ru: 'Ковровщица за станком, Бухара', uz: 'Gilamdo‘z dastgoh ortida, Buxoro', en: 'A carpet weaver at her loom, Bukhara' } },
      { image: 'ppl_plov', size: 'wide', cap: { ru: 'Плов на свадьбе: одно блюдо на всех гостей', uz: 'To‘y oshi: barcha mehmonlar uchun bir qozon', en: 'Wedding plov: one dish for every guest' } },
      { placeholder: 'students', size: 'square', cap: { ru: 'Студенты TSTU и друзья из других стран', uz: 'TSTU talabalari va xorijlik do‘stlari', en: 'TSTU students and friends from abroad' },
        note: { ru: 'Добавьте собственное фото команды: здесь нужен настоящий снимок, а не сток.', uz: 'Jamoaning o‘z suratini qo‘shing: bu yerga stok emas, haqiqiy surat kerak.', en: 'Add the team’s own photo here: this needs a real picture, not stock.' } },
      { image: 'mato_4', size: 'wide', cap: { ru: 'Мастер ткёт атлас', uz: 'Usta atlas to‘qimoqda', en: 'A master weaving atlas silk' } },
      { image: 'mato_6', size: 'square', cap: { ru: 'Лавка атласа и адраса', uz: 'Atlas va adras do‘koni', en: 'An atlas and adras shop' } },
      { image: 'ppl_bazaar', size: 'square', cap: { ru: 'Базар Чорсу, Ташкент', uz: 'Chorsu bozori, Toshkent', en: 'Chorsu Bazaar, Tashkent' } },
      { image: 'mato_5', size: 'tall', cap: { ru: 'Атлас и адрас в повседневной жизни', uz: 'Kundalik hayotda atlas va adras', en: 'Atlas and adras in everyday life' } },
      { placeholder: 'makers', size: 'square', cap: { ru: 'Молодые предприниматели и креаторы', uz: 'Yosh tadbirkorlar va ijodkorlar', en: 'Young entrepreneurs and creatives' },
        note: { ru: 'Добавьте реальное фото: стартап, студия, мастерская.', uz: 'Haqiqiy surat qo‘shing: startap, studiya, ustaxona.', en: 'Add a real photo: a startup, a studio, a workshop.' } },
      { image: 'mato_3', size: 'wide', cap: { ru: 'Расписная керамика к чаю', uz: 'Choy uchun naqshinkor sopol idishlar', en: 'Painted ceramics for tea' } }
    ]
  },

  /* ---------- VI. The journey ---------- */
  journey: {
    kicker: { ru: 'Путешествие', uz: 'Sayohat', en: 'The journey' },
    title: { ru: 'История<br>ждёт тебя.', uz: 'Tarix<br>seni kutmoqda.', en: 'History<br>is waiting for you.' },
    lead: {
      ru: 'Маршрут по следам наследия Темура. Программу готовит команда TSTU Travel.',
      uz: 'Temur merosi izidan sayohat. Dasturni TSTU Travel jamoasi tayyorlamoqda.',
      en: 'A journey in the footsteps of Temur’s legacy. The TSTU Travel team is preparing the programme.'
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
    cta: { ru: 'Начать путешествие', uz: 'Sayohatni boshlash', en: 'Begin your journey' },
    ctaNote: {
      ru: 'Откроется чат с командой TSTU Travel в Telegram',
      uz: 'TSTU Travel jamoasi bilan Telegram chat ochiladi',
      en: 'Opens a Telegram chat with the TSTU Travel team'
    }
  },

  /* ---------- Finale ---------- */
  finale: {
    image: 'samarqand_0',
    l1: { ru: 'Империи могут исчезнуть.', uz: 'Saltanatlar yo‘qolishi mumkin.', en: 'Empires may fade.' },
    l2: { ru: 'Но величие оставляет наследие.', uz: 'Ammo buyuklik meros qoldiradi.', en: 'But greatness leaves a legacy.' },
    country: { ru: 'Узбекистан', uz: 'O‘zbekiston', en: 'Uzbekistan' },
    title: { ru: 'The Legacy of Temur', uz: 'The Legacy of Temur', en: 'The Legacy of Temur' },
    l3: { ru: 'Приезжай увидеть наследие своими глазами.', uz: 'Merosni o‘z ko‘zing bilan ko‘rgani kel.', en: 'Come see the legacy for yourself.' },
    cta: { ru: 'Открыть путешествие', uz: 'Sayohatni kashf etish', en: 'Discover the journey' }
  },

  footer: {
    event: 'Studturizm 2026',
    cities: { ru: 'Калининград × Узбекистан', uz: 'Kaliningrad × O‘zbekiston', en: 'Kaliningrad × Uzbekistan' },
    by: { ru: 'Проект TSTU Travel', uz: 'TSTU Travel loyihasi', en: 'A TSTU Travel project' }
  }
};
