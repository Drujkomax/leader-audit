import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ru" | "uz" | "en";

const russianDictionary = {
  header: {
    services: "Услуги",
    about: "О нас",
    contact: "Контакты",
    consultation: "Консультация",
    toggleMenu: "Открыть/закрыть меню",
    language: "Язык",
  },
  hero: {
    license: "Лицензия Министерства финансов РУз",
    title: "Аудиторские услуги в Ташкенте",
    titleAccent: "и по всему Узбекистану",
    description:
      "Профессиональный аудит по международным стандартам. Находим скрытые риски там, где их не видит ваш главбух.",
    ctaPrimary: "Получить экспресс-анализ рисков",
    ctaSecondary: "Наши услуги",
    features: ["Стандарты МСА", "Материальная ответственность", "100% конфиденциальность"],
    learnMore: "Узнать больше",
  },
  trustBar: {
    title: "Нам доверяют лидеры рынка",
    twoSticksName: "Две палочки",
  },
  fomo: {
    badge: "Внимание: критические риски",
    title: "О чём вам не скажет бухгалтерия?",
    description: "Большинство финансовых рисков невидимы, пока не станет слишком поздно.",
    growingRisk: "Пока вы читаете этот текст, риски вашего бизнеса могут расти",
    problems: [
      {
        title: "Налоговый разрыв",
        description: "90% проверок заканчиваются доначислениями из-за ошибок прошлых периодов.",
        statSuffix: "%",
      },
      {
        title: "Заморозка счетов",
        description: "Неверная трактовка новых законов может остановить ваш бизнес за 1 день.",
        statSuffix: " день",
      },
      {
        title: "Скрытые убытки",
        description: "Неоптимальная налоговая нагрузка съедает бюджет на развитие.",
        statSuffix: "%",
        statPrefix: "до ",
      },
    ],
  },
  services: {
    badge: "Решения для бизнеса",
    title: "Услуги Leader Audit",
    description: "Комплексные решения для бизнеса в Узбекистане — от аудита до полного сопровождения учёта",
    learnMore: "Узнать подробнее",
    cards: [
      {
        title: "Обязательный аудит финансовой отчётности",
        description: "Профессиональный аудит в соответствии с международными стандартами и законодательством Республики Узбекистан.",
        features: ["Стандарты МСА", "Национальные стандарты", "Подтверждение достоверности", "Снижение налоговых рисков"],
      },
      {
        title: "Инициативный аудит",
        description: "Добровольная проверка для собственников бизнеса, инвесторов и перед сделками.",
        features: ["Оценка состояния учёта", "Выявление скрытых угроз", "Подготовка к налоговой проверке", "Анализ эффективности"],
      },
      {
        title: "Налоговый аудит и консалтинг",
        description: "Законная оптимизация налогообложения и правовая поддержка бизнеса в Узбекистане.",
        features: ["Налоговое консультирование", "Возврат НДС", "Международное налогообложение", "Сопровождение налоговых проверок"],
      },
      {
        title: "Бухгалтерский аутсорсинг",
        description: "Комплексное сопровождение бухгалтерского учёта для компаний любого масштаба в Ташкенте.",
        features: ["Ведение и восстановление учёта", "Подготовка финансовой отчётности", "Налоговая и статистическая отчётность", "Кадровый учёт"],
      },
      {
        title: "Аудит по МСФО и трансформация отчётности",
        description: "Переход на международные стандарты финансовой отчётности для выхода на глобальные рынки.",
        features: ["Трансформация из НСБУ в МСФО", "Консолидация отчётности", "Разработка учётной политики по МСФО", "Аудит отчётности по МСФО"],
      },
      {
        title: "Due Diligence для сделок M&A",
        description: "Всесторонний финансовый и налоговый анализ компании перед покупкой, слиянием или инвестированием.",
        features: ["Финансовый Due Diligence", "Налоговый Due Diligence", "Оценка рисков для инвесторов", "Quality of Earnings"],
      },
    ],
  },
  about: {
    badge: "О компании",
    title: "О нас",
    description:
      "Лицензированная аудиторская организация, осуществляющая деятельность в соответствии с законодательством Республики Узбекистан",
    stats: [
      "года в сфере аудита и бухгалтерского сопровождения",
      "проведенных аудиторских проверок",
      "высококвалифицированных сертифицированных аудиторов",
      "млрд сумов содействие в возврате НДС",
    ],
    paragraphsLeft: [
      "АО ООО «LEADER AUDIT» — надежный партнер в области аудита и консалтинга, созданный на основании Закона Республики Узбекистан «Об аудиторской деятельности».",
      "Мы несем полную ответственность за качество предоставляемых услуг, что подтверждается страхованием профессиональной ответственности.",
      "Основатели нашей компании — опытные аудиторы с международными и национальными сертификатами, включая CAP, CIPA и DipIFR.",
    ],
    paragraphsRight: [
      "Наша команда обладает многолетним опытом работы с финансово-хозяйственной деятельностью компаний различных отраслей.",
      "Партнерская сеть компании включает ведущих разработчиков программного обеспечения для внедрения современных решений управления.",
      "Основное направление нашей деятельности — налоговый аудит, налоговая экспертиза, оптимизация налогообложения и бухгалтерский консалтинг.",
    ],
    documentsTitle: "Документы, подтверждающие деятельность",
    documents: [
      {
        title: "Страховой полис",
        description: "Профессиональная ответственность аудитора застрахована в соответствии с требованиями законодательства Республики Узбекистан.",
        details: "Полис гарантирует возмещение убытков в случае профессиональной ошибки.",
      },
      {
        title: "Гувохнома (Лицензия)",
        description: "Лицензия на осуществление аудиторской деятельности, выданная Министерством финансов Республики Узбекистан.",
        details: "Подтверждает право на проведение обязательного и инициативного аудита.",
      },
      {
        title: "Регистрационный код НДС",
        description: "Компания зарегистрирована как плательщик налога на добавленную стоимость в Государственном налоговом комитете.",
        details: "Все услуги предоставляются с выставлением счёт-фактуры.",
      },
    ],
    legalNote: "Деятельность осуществляется на основании Закона Республики Узбекистан «Об аудиторской деятельности».",
  },
  expertise: {
    badge: "Почему мы",
    title: "Почему выбирают Leader Audit",
    description:
      "Профессиональная защита вашего капитала от внешних угроз. Каждый проект подкреплён международной экспертизой и полной материальной ответственностью.",
    facts: [
      {
        title: "Международные стандарты",
        description: "Работа по стандартам МСА (Международные стандарты аудита)",
      },
      {
        title: "Материальная ответственность",
        description: "Полная материальная ответственность за качество заключения",
      },
      {
        title: "Конфиденциальность",
        description: "Строжайшая политика конфиденциальности на всех этапах",
      },
      {
        title: "Сложные ниши",
        description: "Опыт в Medical, IT, Manufacturing и других отраслях",
      },
    ],
    statsTitle: "Leader Audit в цифрах",
    statsLabels: ["Лет на рынке", "Успешных проектов", "Клиентов довольны", "Претензий ГНК"],
    licensed: "Лицензированная аудиторская компания",
  },
  leadForm: {
    subject: "Новая заявка с сайта Leader Audit",
    successToast: "Заявка успешно отправлена!",
    errorToast: "Не удалось отправить заявку. Попробуйте ещё раз.",
    successTitle: "Спасибо за заявку!",
    successDescription: "Наш партнёр свяжется с вами в течение 24 часов.",
    submitAnother: "Отправить ещё одну заявку",
    title: "Получите бесплатную консультацию",
    description: "Первая консультация — бесплатно. Получите экспертную оценку рисков вашего бизнеса от профессионалов.",
    benefits: ["Полная конфиденциальность на этапе первого звонка", "Ответ в течение 24 часов", "Без обязательств"],
    nameLabel: "Ваше имя",
    namePlaceholder: "Иван Иванов",
    phoneLabel: "Телефон",
    companyLabel: "Название компании / ИНН",
    companyPlaceholder: "ООО «Название» или ИНН",
    submitting: "Отправка...",
    submit: "Записаться на консультацию",
    privacy: "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности",
    validation: {
      nameMin: "Имя должно содержать минимум 2 символа",
      nameMax: "Имя слишком длинное",
      phoneMin: "Введите корректный номер телефона",
      phoneMax: "Номер слишком длинный",
      companyMin: "Введите название компании",
      companyMax: "Название слишком длинное",
    },
  },
  footer: {
    description:
      "Leader Audit — лицензированная аудиторская компания. Мы защищаем ваш бизнес от финансовых рисков и обеспечиваем полное соответствие требованиям законодательства.",
    contacts: "Контакты",
    address: "г. Ташкент, ул. Мустакиллик, 12",
    services: "Услуги",
    serviceLinks: ["Обязательный аудит", "Инициативный аудит", "Налоговый консалтинг", "Сопровождение проверок"],
    rights: "Все права защищены.",
    license: "Лицензия на осуществление аудиторской деятельности выдана Министерством финансов Республики Узбекистан.",
    instagram: "Instagram",
    telegram: "Telegram",
  },
  floatingContact: {
    call: "Позвонить",
    close: "Закрыть",
    contactUs: "Связаться с нами",
  },
  scrollTop: {
    ariaLabel: "Наверх",
  },
  notFound: {
    title: "Упс! Страница не найдена",
    back: "Вернуться на главную",
    log: "404 Ошибка: пользователь попытался открыть несуществующий путь:",
  },
} as const;

const dictionaries = {
  uz: {
    header: {
      services: "Xizmatlar",
      about: "Biz haqimizda",
      contact: "Kontaktlar",
      consultation: "Konsultatsiya",
      toggleMenu: "Menyuni ochish/yopish",
      language: "Til",
    },
    hero: {
      license: "O'zbekiston Respublikasi Moliya vazirligi litsenziyasi",
      title: "Leader Audit: Sizning moliyaviy xavfsizligingiz",
      titleAccent: "to'liq soliq nazorati davrida",
      description:
        "Xalqaro standartlar asosida professional audit. Xatarlarni bosh buxgalter ko'rmaydigan joydan topamiz.",
      ctaPrimary: "Xatarlar bo'yicha tezkor tahlil olish",
      ctaSecondary: "Xizmatlarimiz",
      features: ["XAS standartlari", "Moddiy javobgarlik", "100% maxfiylik"],
      learnMore: "Batafsil",
    },
    trustBar: {
      title: "Bozor yetakchilari bizga ishonadi",
      twoSticksName: "Ikki tayoqcha",
    },
    fomo: {
      badge: "Diqqat: kritik xavflar",
      title: "Buxgalteriya sizga nimalarni aytmaydi?",
      description: "Moliyaviy xavflarning aksariyati juda kech bo'lguncha ko'rinmaydi.",
      growingRisk: "Siz bu matnni o'qiyotgan paytda biznesingiz xavflari ortib borishi mumkin",
      problems: [
        {
          title: "Soliq tafovuti",
          description: "Tekshiruvlarning 90% avvalgi davr xatolari sabab qo'shimcha hisob-kitob bilan yakunlanadi.",
          statSuffix: "%",
        },
        {
          title: "Hisoblar muzlatilishi",
          description: "Yangi qonunlarni noto'g'ri talqin qilish biznesni 1 kunda to'xtatishi mumkin.",
          statSuffix: " kun",
        },
        {
          title: "Yashirin yo'qotishlar",
          description: "Nooptimal soliq yuki rivojlanish byudjetini kamaytiradi.",
          statSuffix: "%",
          statPrefix: "gacha ",
        },
      ],
    },
    services: {
      badge: "Biznes uchun yechimlar",
      title: "Toshkentdagi xizmatlarimiz",
      description:
        "O'zbekistondagi biznes uchun kompleks yechimlar: auditdan to to'liq buxgalteriya qo'llab-quvvatlashigacha",
      learnMore: "Batafsil",
      cards: [
        {
          title: "Majburiy moliyaviy hisobot auditi",
          description: "Xalqaro standartlar va O'zbekiston Respublikasi qonunchiligiga muvofiq professional audit.",
          features: ["XAS standartlari", "Milliy standartlar", "Ishonchlilikni tasdiqlash", "Soliq xavflarini kamaytirish"],
        },
        {
          title: "Tashabbuskor audit",
          description: "Biznes egalari, investorlar uchun va bitimlardan oldin ixtiyoriy tekshiruv.",
          features: ["Hisob holatini baholash", "Yashirin xavflarni aniqlash", "Soliq tekshiruviga tayyorgarlik", "Samaradorlik tahlili"],
        },
        {
          title: "Soliq auditi va konsalting",
          description: "Soliqni qonuniy optimallashtirish va O'zbekistonda biznes uchun huquqiy ko'mak.",
          features: ["Soliq bo'yicha maslahat", "QQSni qaytarish", "Xalqaro soliqqa tortish", "Soliq tekshiruvlarida hamrohlik"],
        },
        {
          title: "Buxgalteriya autsorsingi",
          description: "Toshkentdagi har qanday miqyosdagi kompaniyalar uchun kompleks buxgalteriya qo'llab-quvvatlovi.",
          features: ["Hisob yuritish va tiklash", "Moliyaviy hisobot tayyorlash", "Soliq va statistik hisobot", "Kadrlar hisobi"],
        },
        {
          title: "MHXS bo'yicha audit va hisobot transformatsiyasi",
          description: "Global bozorlarga chiqish uchun xalqaro moliyaviy hisobot standartlariga o'tish.",
          features: ["MHXSdan XHXSga transformatsiya", "Hisobot konsolidatsiyasi", "MHXS bo'yicha hisob siyosatini ishlab chiqish", "MHXS hisoboti auditi"],
        },
        {
          title: "M&A bitimlari uchun Due Diligence",
          description: "Kompaniyani sotib olish, birlashtirish yoki investitsiya kiritishdan oldin har tomonlama moliyaviy va soliq tahlili.",
          features: ["Moliyaviy Due Diligence", "Soliq Due Diligence", "Investorlar uchun xavflarni baholash", "Quality of Earnings"],
        },
      ],
    },
    about: {
      badge: "Kompaniya haqida",
      title: "Biz haqimizda",
      description:
        "O'zbekiston Respublikasi qonunchiligiga muvofiq faoliyat yurituvchi litsenziyalangan auditorlik tashkiloti",
      stats: [
        "audit va buxgalteriya yo'nalishida yillik tajriba",
        "o'tkazilgan auditorlik tekshiruvi",
        "yuqori malakali sertifikatlangan auditor",
        "mlrd so'm QQS qaytarishga ko'mak",
      ],
      paragraphsLeft: [
        "'LEADER AUDIT' MCHJ OAJ O'zbekiston Respublikasining 'Auditorlik faoliyati to'g'risida'gi qonuni asosida tashkil etilgan audit va konsalting sohasidagi ishonchli hamkor.",
        "Biz xizmatlar sifati uchun to'liq javobgarlikni o'z zimmamizga olamiz; bu professional javobgarlik sug'urtasi bilan tasdiqlangan.",
        "Kompaniyamiz asoschilari CAP, CIPA, DipIFR kabi xalqaro va milliy sertifikatlarga ega tajribali auditorlardir.",
      ],
      paragraphsRight: [
        "Jamoamiz turli soha va mulk shaklidagi kompaniyalarning moliyaviy-xo'jalik faoliyatida ko'p yillik tajribaga ega.",
        "Hamkorlik tarmog'imiz yetakchi dasturiy ta'minot ishlab chiquvchilarini qamrab oladi va ular bilan birga zamonaviy boshqaruv yechimlarini joriy etamiz.",
        "Asosiy yo'nalishimiz: soliqlar va majburiy to'lovlarning to'g'ri hisoblanishi hamda to'lanishi bo'yicha audit, soliq ekspertizasi, optimallashtirish va buxgalteriya konsaltingi.",
      ],
      documentsTitle: "Faoliyatni tasdiqlovchi hujjatlar",
      documents: [
        {
          title: "Sug'urta polisi",
          description:
            "Auditorning professional javobgarligi O'zbekiston Respublikasi qonunchiligi talablariga muvofiq sug'urtalangan.",
          details: "Polis professional xato holatida zararlarni qoplashni kafolatlaydi.",
        },
        {
          title: "Guvohnoma (Litsenziya)",
          description: "Audit faoliyatini amalga oshirish uchun O'zbekiston Respublikasi Moliya vazirligi tomonidan berilgan litsenziya.",
          details: "Majburiy va tashabbuskor audit o'tkazish huquqini tasdiqlaydi.",
        },
        {
          title: "QQS ro'yxatga olish kodi",
          description: "Kompaniya Davlat soliq qo'mitasida qo'shilgan qiymat solig'i to'lovchisi sifatida ro'yxatdan o'tgan.",
          details: "Barcha xizmatlar hisob-faktura bilan taqdim etiladi.",
        },
      ],
      legalNote:
        "Faoliyat O'zbekiston Respublikasining 'Auditorlik faoliyati to'g'risida'gi qonuni asosida amalga oshiriladi.",
    },
    expertise: {
      badge: "Nega biz",
      title: "Ekspertlik va ishonchlilik",
      description:
        "Kapitalingizni tashqi xatarlardan professional himoya qilamiz. Har bir loyiha xalqaro ekspertiza va to'liq moddiy javobgarlik bilan ta'minlanadi.",
      facts: [
        {
          title: "Xalqaro standartlar",
          description: "XAS (Xalqaro audit standartlari) asosida ishlaymiz",
        },
        {
          title: "Moddiy javobgarlik",
          description: "Xulosa sifati uchun to'liq moddiy javobgarlik",
        },
        {
          title: "Maxfiylik",
          description: "Har bir bosqichda qat'iy maxfiylik siyosati",
        },
        {
          title: "Murakkab sohalar",
          description: "Medical, IT, Manufacturing va boshqa tarmoqlarda tajriba",
        },
      ],
      statsTitle: "Leader Audit raqamlarda",
      statsLabels: ["Bozorda yillik tajriba", "Muvaffaqiyatli loyiha", "Mamnun mijozlar", "Davlat soliq da'volari"],
      licensed: "Litsenziyalangan auditorlik kompaniyasi",
    },
    leadForm: {
      subject: "Leader Audit saytidan yangi so'rov",
      successToast: "So'rov muvaffaqiyatli yuborildi!",
      errorToast: "So'rovni yuborib bo'lmadi. Qayta urinib ko'ring.",
      successTitle: "So'rovingiz uchun rahmat!",
      successDescription: "Hamkorimiz 24 soat ichida siz bilan bog'lanadi.",
      submitAnother: "Yana bir so'rov yuborish",
      title: "Leader Audit hamkori bilan uchrashuv belgilang",
      description: "Birinchi konsultatsiya bepul. Xalqaro tajribaga ega mutaxassislardan biznes xatarlarini baholatib oling.",
      benefits: ["Birinchi qo'ng'iroq bosqichida to'liq maxfiylik", "24 soat ichida javob", "Majburiyatsiz"],
      nameLabel: "Ismingiz",
      namePlaceholder: "Ali Valiyev",
      phoneLabel: "Telefon",
      companyLabel: "Kompaniya nomi / STIR",
      companyPlaceholder: "MCHJ 'Nomi' yoki STIR",
      submitting: "Yuborilmoqda...",
      submit: "Konsultatsiyaga yozilish",
      privacy: "Tugmani bosish orqali maxfiylik siyosatiga rozilik bildirasiz",
      validation: {
        nameMin: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
        nameMax: "Ism juda uzun",
        phoneMin: "To'g'ri telefon raqamini kiriting",
        phoneMax: "Telefon raqami juda uzun",
        companyMin: "Kompaniya nomini kiriting",
        companyMax: "Kompaniya nomi juda uzun",
      },
    },
    footer: {
      description:
        "Leader Audit litsenziyalangan auditorlik kompaniyasi. Biz biznesingizni moliyaviy xatarlardan himoya qilamiz va qonunchilik talablariga to'liq moslikni ta'minlaymiz.",
      contacts: "Kontaktlar",
      address: "Toshkent shahri, Mustaqillik ko'chasi, 12",
      services: "Xizmatlar",
      serviceLinks: ["Majburiy audit", "Tashabbuskor audit", "Soliq konsaltingi", "Tekshiruvlarga hamrohlik"],
      rights: "Barcha huquqlar himoyalangan.",
      license: "Auditorlik faoliyati litsenziyasi O'zbekiston Respublikasi Moliya vazirligi tomonidan berilgan.",
      instagram: "Instagram",
      telegram: "Telegram",
    },
    floatingContact: {
      call: "Qo'ng'iroq qilish",
      close: "Yopish",
      contactUs: "Biz bilan bog'lanish",
    },
    scrollTop: {
      ariaLabel: "Yuqoriga",
    },
    notFound: {
      title: "Sahifa topilmadi",
      back: "Bosh sahifaga qaytish",
      log: "404 xato: foydalanuvchi mavjud bo'lmagan yo'lga kirdi:",
    },
  },
  en: {
    header: {
      services: "Services",
      about: "About",
      contact: "Contact",
      consultation: "Consultation",
      toggleMenu: "Toggle menu",
      language: "Language",
    },
    hero: {
      license: "License of the Ministry of Finance of the Republic of Uzbekistan",
      title: "Leader Audit: Your financial security",
      titleAccent: "in an era of total tax control",
      description:
        "Professional audit under international standards. We uncover hidden risks where your chief accountant may not see them.",
      ctaPrimary: "Get a quick risk assessment",
      ctaSecondary: "Our services",
      features: ["ISA standards", "Financial liability", "100% confidentiality"],
      learnMore: "Learn more",
    },
    trustBar: {
      title: "Market leaders trust us",
      twoSticksName: "Dve Palochki",
    },
    fomo: {
      badge: "Attention: critical risks",
      title: "What your accounting team may not tell you",
      description: "Most financial risks stay invisible until it is too late.",
      growingRisk: "While you read this, your business risks may already be growing",
      problems: [
        {
          title: "Tax gap",
          description: "90% of inspections end with additional tax charges due to errors from previous periods.",
          statSuffix: "%",
        },
        {
          title: "Account freeze",
          description: "Misinterpreting new regulations can stop your business in just 1 day.",
          statSuffix: " day",
        },
        {
          title: "Hidden losses",
          description: "An inefficient tax burden can consume your growth budget.",
          statSuffix: "%",
          statPrefix: "up to ",
        },
      ],
    },
    services: {
      badge: "Business solutions",
      title: "Our services in Tashkent",
      description: "Comprehensive solutions for businesses in Uzbekistan, from audit to full accounting support",
      learnMore: "Learn more",
      cards: [
        {
          title: "Statutory Financial Audit",
          description: "Professional audit in line with international standards and the laws of Uzbekistan.",
          features: ["ISA standards", "National standards", "Reliability confirmation", "Tax risk reduction"],
        },
        {
          title: "Initiative Audit",
          description: "Voluntary check for business owners, investors, and prior to transactions.",
          features: ["Accounting state assessment", "Hidden threats identification", "Tax inspection preparation", "Efficiency analysis"],
        },
        {
          title: "Tax Audit and Consulting",
          description: "Legal tax optimization and regulatory support for business in Uzbekistan.",
          features: ["Tax advisory", "VAT refunds", "International taxation", "Tax inspection support"],
        },
        {
          title: "Accounting Outsourcing",
          description: "Comprehensive accounting support for companies of all sizes in Tashkent.",
          features: ["Bookkeeping and restoration", "Financial reporting", "Tax and statistical reporting", "HR accounting"],
        },
        {
          title: "IFRS Audit and Transformation",
          description: "Transition to international financial reporting standards to enter global markets.",
          features: ["NAS to IFRS transformation", "Reporting consolidation", "IFRS accounting policy development", "IFRS reporting audit"],
        },
        {
          title: "Due Diligence for M&A",
          description: "Comprehensive financial and tax analysis of a company before acquisition, merger, or investment.",
          features: ["Financial Due Diligence", "Tax Due Diligence", "Risk assessment for investors", "Quality of Earnings"],
        },
      ],
    },
    about: {
      badge: "About company",
      title: "About us",
      description: "Licensed audit organization operating in accordance with the laws of Uzbekistan",
      stats: [
        "years in audit and accounting support",
        "audit engagements completed",
        "highly qualified certified auditors",
        "billion UZS in VAT refund assistance",
      ],
      paragraphsLeft: [
        "LEADER AUDIT LLC is a trusted partner in audit and consulting established under the Law of the Republic of Uzbekistan on Audit Activity.",
        "We bear full responsibility for service quality, confirmed by professional liability insurance.",
        "Our founders are experienced auditors with international and national qualifications, including CAP, CIPA and DipIFR.",
      ],
      paragraphsRight: [
        "Our team has many years of experience with financial and business operations across industries and ownership models.",
        "Our partner network includes leading software providers, with whom we implement advanced management solutions.",
        "Our core focus is tax audit, tax expertise, optimization, accounting setup and recovery, and financial consulting.",
      ],
      documentsTitle: "Documents confirming our activity",
      documents: [
        {
          title: "Insurance policy",
          description: "The auditor's professional liability is insured in accordance with legal requirements of Uzbekistan.",
          details: "The policy guarantees compensation in case of professional error.",
        },
        {
          title: "Certificate (License)",
          description: "License for audit activities issued by the Ministry of Finance of the Republic of Uzbekistan.",
          details: "Confirms the right to perform statutory and initiative audits.",
        },
        {
          title: "VAT registration code",
          description: "The company is registered as a VAT payer with the State Tax Committee.",
          details: "All services are provided with invoices.",
        },
      ],
      legalNote: "Activities are carried out in accordance with the Law of the Republic of Uzbekistan on Audit Activity.",
    },
    expertise: {
      badge: "Why us",
      title: "Expertise and reliability",
      description:
        "Professional protection of your capital from external threats. Every project is backed by international expertise and full financial liability.",
      facts: [
        {
          title: "International standards",
          description: "Work based on ISA (International Standards on Auditing)",
        },
        {
          title: "Financial liability",
          description: "Full financial liability for the quality of the audit opinion",
        },
        {
          title: "Confidentiality",
          description: "Strict confidentiality policy at every stage",
        },
        {
          title: "Complex industries",
          description: "Experience in Medical, IT, Manufacturing and other sectors",
        },
      ],
      statsTitle: "Leader Audit in numbers",
      statsLabels: ["Years in market", "Successful projects", "Satisfied clients", "Tax claims"],
      licensed: "Licensed audit company",
    },
    leadForm: {
      subject: "New request from Leader Audit website",
      successToast: "Request sent successfully!",
      errorToast: "Failed to send request. Please try again.",
      successTitle: "Thank you for your request!",
      successDescription: "Our partner will contact you within 24 hours.",
      submitAnother: "Submit another request",
      title: "Book a meeting with a Leader Audit partner",
      description: "Your first consultation is free. Get an expert assessment of your business risks.",
      benefits: ["Full confidentiality at the first call stage", "Response within 24 hours", "No obligations"],
      nameLabel: "Your name",
      namePlaceholder: "John Smith",
      phoneLabel: "Phone",
      companyLabel: "Company name / TIN",
      companyPlaceholder: "LLC 'Company' or TIN",
      submitting: "Sending...",
      submit: "Book a consultation",
      privacy: "By clicking the button, you agree to the privacy policy",
      validation: {
        nameMin: "Name must contain at least 2 characters",
        nameMax: "Name is too long",
        phoneMin: "Enter a valid phone number",
        phoneMax: "Phone number is too long",
        companyMin: "Enter company name",
        companyMax: "Company name is too long",
      },
    },
    footer: {
      description:
        "Leader Audit is a licensed audit company. We protect your business from financial risks and ensure full legal compliance.",
      contacts: "Contacts",
      address: "Tashkent, Mustaqillik street, 12",
      services: "Services",
      serviceLinks: ["Statutory audit", "Initiative audit", "Tax consulting", "Audit support"],
      rights: "All rights reserved.",
      license: "Audit activity license issued by the Ministry of Finance of the Republic of Uzbekistan.",
      instagram: "Instagram",
      telegram: "Telegram",
    },
    floatingContact: {
      call: "Call",
      close: "Close",
      contactUs: "Contact us",
    },
    scrollTop: {
      ariaLabel: "Back to top",
    },
    notFound: {
      title: "Oops! Page not found",
      back: "Return to Home",
      log: "404 Error: User attempted to access non-existent route:",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["uz"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "leader-audit-language";

const isLanguage = (value: string | null): value is Language => value === "ru" || value === "uz" || value === "en";

const detectLanguageFromUrl = (): Language => {
  if (typeof window === "undefined") return "ru";
  const path = window.location.pathname;
  if (path.startsWith("/uz")) return "uz";
  if (path.startsWith("/en")) return "en";
  return "ru";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "ru";
    }

    // URL takes priority — if user is on /uz/... or /en/... use that
    const urlLang = detectLanguageFromUrl();
    if (urlLang !== "ru") return urlLang;

    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(storedLanguage) ? storedLanguage : "ru";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: language === "ru" ? russianDictionary : dictionaries[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
