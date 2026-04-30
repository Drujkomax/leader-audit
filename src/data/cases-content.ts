import type { Language } from "@/contexts/language-context";

export type CaseStudy = {
  slug: string;
  industry: string;
  industryTag: string;
  serviceType: string;
  clientProfile: string;
  challenge: string;
  approach: string[];
  outcome: { metric: string; value: string }[];
  outcomeNarrative: string;
  duration: string;
};

export type CasesPageContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  filterAll: string;
  cases: CaseStudy[];
  trustHeading: string;
  trustParagraphs: string[];
  ctaHeading: string;
  ctaDescription: string;
  ctaButton: string;
  labels: {
    industry: string;
    service: string;
    client: string;
    challenge: string;
    approach: string;
    outcome: string;
    duration: string;
    confidential: string;
  };
};

type CasesContent = Record<Language, CasesPageContent>;

export const casesContent: CasesContent = {
  ru: {
    metaTitle: "Кейсы Leader Audit | Реальные результаты аудита и налогового консалтинга в Узбекистане",
    metaDescription:
      "Реальные кейсы Leader Audit: возврат НДС 18 млрд сум для производителя, выявление налоговых рисков на 4,2 млрд сум, подготовка отчётности по МСФО для IT-компании. Цифры, сроки, результат.",
    keywords:
      "кейсы аудита Узбекистан, примеры аудиторских проверок, возврат НДС кейс, оптимизация налогов результат, Leader Audit отзывы",
    heroBadge: "Реальные результаты",
    heroTitle: "Наши кейсы и проекты",
    heroDescription:
      "Обезличенные кейсы из практики Leader Audit с конкретными цифрами. Названия компаний скрыты по соглашению о конфиденциальности (NDA), но методы, риски и результаты — реальные.",
    filterAll: "Все кейсы",
    cases: [
      {
        slug: "manufacturing-vat-refund",
        industry: "Производство",
        industryTag: "Manufacturing",
        serviceType: "Возврат НДС",
        clientProfile:
          "Производитель строительных материалов, годовой оборот 85 млрд сум, 320 сотрудников, экспортирует продукцию в Казахстан, Кыргызстан и Таджикистан.",
        challenge:
          "Компания накопила 22 млрд сум превышения входного НДС за 2 года из-за крупных инвестиций в новый завод. Налоговый комитет дважды отказал в возврате со ссылкой на «недостаточность подтверждающих документов» и «несоответствие в актах сверки с поставщиками».",
        approach: [
          "Провели сплошную инвентаризацию счетов-фактур за 24 месяца, обнаружили и исправили 47 расхождений между книгой покупок и автоматизированной системой ГНК.",
          "Подготовили развёрнутую документацию по экспортным операциям с переводом ВЭД-контрактов и таможенных деклараций (CMR, инвойсы, паспорта сделок).",
          "Согласовали с ГНК новую методику признания экспортных операций для целей ставки 0% по НДС.",
          "Сопроводили выездную проверку по возврату НДС с присутствием на каждом мероприятии налогового контроля.",
        ],
        outcome: [
          { metric: "Возвращено НДС", value: "18,4 млрд сум" },
          { metric: "Срок возврата", value: "5 месяцев" },
          { metric: "Доначислений", value: "0 сум" },
          { metric: "Предотвращено штрафов на", value: "1,2 млрд сум" },
        ],
        outcomeNarrative:
          "Возврат прошёл без доначислений и штрафов. Дополнительно зафиксированы методологические рекомендации, что позволяет компании теперь возвращать НДС ежеквартально без задержек.",
        duration: "5 месяцев",
      },
      {
        slug: "it-park-resident-ifrs",
        industry: "IT",
        industryTag: "IT",
        serviceType: "Трансформация в МСФО",
        clientProfile:
          "Резидент IT-Парка Узбекистана, разработка финтех-платформы, 95 сотрудников, выручка 28 млрд сум, основные клиенты — банки СНГ и Ближнего Востока.",
        challenge:
          "Иностранный инвестор поставил условие — отчётность по МСФО за 3 года и независимое аудиторское заключение для прохождения due diligence перед раундом инвестиций. Срок — 3 месяца до закрытия сделки.",
        approach: [
          "Собрали и нормализовали данные из трёх различных систем учёта: 1С, внутренняя CRM и cap table в Carta.",
          "Применили IFRS 15 для признания выручки по подпискам (SaaS-модель) с учётом разделения performance obligations.",
          "Капитализировали затраты на разработку внутреннего ПО по IAS 38 и IFRS 38 с разделением фаз исследования и разработки.",
          "Провели аудит подготовленной отчётности по МСА, выпустили заключение без оговорок.",
        ],
        outcome: [
          { metric: "Подготовлено отчётности", value: "за 3 года" },
          { metric: "Тип заключения", value: "Без оговорок" },
          { metric: "Срок проекта", value: "11 недель" },
          { metric: "Привлечено инвестиций", value: "$4,5 млн" },
        ],
        outcomeNarrative:
          "Сделка закрылась в срок. Инвестор отметил высокое качество подготовленной отчётности и подробный disclosure по IFRS 9 (финансовые инструменты) и IFRS 16 (аренда).",
        duration: "11 недель",
      },
      {
        slug: "retail-tax-audit-defense",
        industry: "Торговля",
        industryTag: "Retail",
        serviceType: "Налоговый консалтинг",
        clientProfile:
          "Сеть розничных магазинов одежды, 18 точек по Узбекистану, годовой оборот 42 млрд сум, 280 сотрудников.",
        challenge:
          "Налоговая инспекция инициировала выездную проверку с предварительной оценкой возможных доначислений 4,2 млрд сум по НДС, налогу на прибыль и социальному налогу. Основные претензии — экономическая обоснованность маркетинговых расходов и трансфертные операции с аффилированной компанией-импортёром.",
        approach: [
          "Подготовили досье обоснований по каждой из 23 спорных операций с подтверждающими документами и расчётами рыночности цен.",
          "Применили метод сопоставимых рыночных цен (МСРЦ) к трансфертным операциям, доказали соответствие 90% сделок ст. 176 НК РУз.",
          "Подготовили меморандум по экономической обоснованности маркетинговых расходов с привязкой к росту выручки.",
          "Сопроводили все 14 рабочих встреч с инспекторами, добились частичного отзыва первоначального акта.",
        ],
        outcome: [
          { metric: "Изначально предъявлено", value: "4,2 млрд сум" },
          { metric: "Финальные доначисления", value: "180 млн сум" },
          { metric: "Снижение", value: "−95,7%" },
          { metric: "Штрафов", value: "0 (все списаны)" },
        ],
        outcomeNarrative:
          "Сумма доначислений снижена с 4,2 млрд до 180 млн сум — за счёт корректной аргументации позиции, без апелляций и судебных разбирательств. Клиент сохранил оборотный капитал и репутацию.",
        duration: "4 месяца",
      },
      {
        slug: "bank-isa-audit",
        industry: "Банки",
        industryTag: "Banking",
        serviceType: "Обязательный аудит",
        clientProfile:
          "Коммерческий банк второго эшелона, активы 2,1 трлн сум, кредитный портфель 1,3 трлн сум, 45 отделений, 720 сотрудников.",
        challenge:
          "Ежегодный обязательный аудит по МСА с углублённой проверкой портфеля кредитов, формирования резервов на возможные потери (РВП) и соблюдения пруденциальных требований ЦБ РУз.",
        approach: [
          "Применили выборочный метод тестирования портфеля кредитов: 142 кредита из 8 200, общая сумма выборки 38% от портфеля.",
          "Провели независимую оценку обеспечения по 56 крупным кредитам с привлечением сертифицированных оценщиков.",
          "Провели тестирование IFRS 9 модели ECL банка, проверили корректность migration matrix и forward-looking сценариев.",
          "Согласовали с банком 11 корректировок до выпуска заключения, сэкономив банку отдельный disclosure в годовом отчёте.",
        ],
        outcome: [
          { metric: "Покрытие выборкой", value: "38% портфеля" },
          { metric: "Корректировок РВП", value: "+47 млрд сум" },
          { metric: "Тип заключения", value: "Без оговорок" },
          { metric: "Соответствие нормативам ЦБ", value: "100%" },
        ],
        outcomeNarrative:
          "Заключение выдано в срок до подачи отчётности в ЦБ РУз. Банк прошёл проверку Центрального банка без замечаний — за счёт превентивных корректировок, согласованных в ходе аудита.",
        duration: "10 недель",
      },
      {
        slug: "pharma-restoration",
        industry: "Здравоохранение",
        industryTag: "Healthcare",
        serviceType: "Восстановление учёта",
        clientProfile:
          "Импортёр и дистрибьютор фармацевтической продукции, 6 региональных складов, годовой оборот 31 млрд сум.",
        challenge:
          "После увольнения главного бухгалтера обнаружено отсутствие первичных документов за 14 месяцев, расхождения в инвентаризации на 2,8 млрд сум, налоговая отчётность не сдавалась 4 квартала. Срок до плановой проверки ГНК — 2 месяца.",
        approach: [
          "Восстановили первичные документы по запросам контрагентам и через систему e-faktura — 8 400 счетов-фактур и 2 100 ТТН.",
          "Провели сплошную инвентаризацию по 6 складам с фотофиксацией остатков, выявили реальные расхождения 940 млн сум (вместо 2,8 млрд по предварительной оценке).",
          "Подготовили и сдали корректирующие декларации по НДС, налогу на прибыль и социальному налогу за 4 пропущенных периода.",
          "Внедрили регламент ежедневной сверки складских остатков с бухгалтерским учётом.",
        ],
        outcome: [
          { metric: "Восстановлено документов", value: "10 500 шт." },
          { metric: "Реальная недостача", value: "940 млн сум" },
          { metric: "Штрафов от ГНК", value: "0 (досдано добровольно)" },
          { metric: "Срок", value: "7 недель" },
        ],
        outcomeNarrative:
          "Успели до прихода налоговой проверки. Все недостающие декларации сданы, налоги доплачены добровольно — что освободило компанию от штрафов по ст. 219 НК РУз.",
        duration: "7 недель",
      },
      {
        slug: "ma-due-diligence",
        industry: "M&A",
        industryTag: "M&A",
        serviceType: "Due Diligence",
        clientProfile:
          "Покупатель — иностранный инвестиционный фонд. Объект — производственная компания в Узбекистане с оборотом 110 млрд сум и 450 сотрудниками. Сумма сделки — обсуждалась $12 млн.",
        challenge:
          "Финансово-налоговый due diligence перед покупкой бизнеса. Ограничение по времени — 6 недель, включая праздники. Скрытые риски, не отражённые в управленческой отчётности продавца.",
        approach: [
          "Финансовый DD: проверка качества выручки (по контрагентам, валюте, сезонности), нормализация EBITDA с исключением разовых статей.",
          "Налоговый DD: оценка рисков по НДС, налогу на прибыль, трансфертному ценообразованию, обязательствам по спорам.",
          "Юридический DD (с партнёром-юристом): обременения активов, корпоративные права, лицензии и разрешения.",
          "Подготовили отчёт DD на 84 страницы с отдельным quality of earnings (QoE) разделом и реестром рисков с количественной оценкой.",
        ],
        outcome: [
          { metric: "Скрытых рисков выявлено", value: "$2,1 млн" },
          { metric: "Корректировка цены сделки", value: "−$1,4 млн" },
          { metric: "Срок проекта", value: "5,5 недель" },
          { metric: "Сделка", value: "Закрыта" },
        ],
        outcomeNarrative:
          "Скрытые налоговые и юридические риски на $2,1 млн стали основанием для пересмотра цены сделки. Покупатель сэкономил $1,4 млн и заложил оставшуюся часть в escrow на 24 месяца.",
        duration: "5,5 недель",
      },
    ],
    trustHeading: "Почему мы делимся цифрами",
    trustParagraphs: [
      "Все кейсы выше — реальные проекты Leader Audit. Мы не вправе раскрывать названия клиентов, но методология, выявленные риски, использованные стандарты МСА/МСФО и достигнутые результаты — точные.",
      "Каждый кейс прошёл внутреннюю проверку и согласован с клиентом перед публикацией. Если вы узнаёте свой проект — это совпадение деталей с десятками подобных задач, которые мы решаем ежегодно.",
      "Готовы предоставить рекомендательное письмо от клиента из вашей отрасли по запросу — после подписания взаимного NDA.",
    ],
    ctaHeading: "Хотите похожий результат для вашей компании?",
    ctaDescription:
      "Расскажите о задаче — подберём аналогичный кейс из практики, оценим сложность и дадим ориентир по бюджету.",
    ctaButton: "Обсудить мой проект",
    labels: {
      industry: "Отрасль",
      service: "Услуга",
      client: "Профиль клиента",
      challenge: "Задача",
      approach: "Подход",
      outcome: "Результат",
      duration: "Срок",
      confidential: "По соглашению о конфиденциальности",
    },
  },

  uz: {
    metaTitle: "Leader Audit keyslari | O'zbekistonda audit va soliq konsalting natijalari",
    metaDescription:
      "Leader Auditning haqiqiy keyslari: ishlab chiqaruvchi uchun 18 mlrd so'm QQS qaytarish, 4,2 mlrd so'm soliq xavflarini aniqlash, IT-kompaniya uchun MHXS hisoboti tayyorlash. Raqamlar, muddatlar, natija.",
    keywords:
      "audit keyslari O'zbekiston, audit tekshiruvlari misollari, QQS qaytarish keysi, soliq optimallashtirish natijasi",
    heroBadge: "Haqiqiy natijalar",
    heroTitle: "Bizning keyslar va loyihalar",
    heroDescription:
      "Leader Audit amaliyotidan aniq raqamlar bilan anonim keyslar. Kompaniya nomlari maxfiylik shartnomasi (NDA) bo'yicha yashirilgan, lekin usullar, xavflar va natijalar haqiqiy.",
    filterAll: "Barcha keyslar",
    cases: [
      {
        slug: "manufacturing-vat-refund",
        industry: "Ishlab chiqarish",
        industryTag: "Manufacturing",
        serviceType: "QQS qaytarish",
        clientProfile:
          "Qurilish materiallari ishlab chiqaruvchisi, yillik aylanma 85 mlrd so'm, 320 xodim, mahsulotni Qozog'iston, Qirg'iziston va Tojikistonga eksport qiladi.",
        challenge:
          "Kompaniya yangi zavodga yirik investitsiyalar tufayli 2 yil ichida 22 mlrd so'mlik kirish QQS profitsitini to'pladi. Soliq qo'mitasi ikki marta qaytarishdan rad etdi.",
        approach: [
          "24 oy uchun schyot-fakturalarni to'liq inventarizatsiya qildik, xarid kitobi va DSQ avtomatlashtirilgan tizimi o'rtasidagi 47 nomuvofiqlikni topdik va tuzatdik.",
          "Eksport operatsiyalari bo'yicha tarjimasi bilan kengaytirilgan hujjatlarni tayyorladik (CMR, invoyslar, bitim pasportlari).",
          "Eksport operatsiyalarini tan olishning yangi metodologiyasini DSQ bilan kelishdik.",
          "Har bir nazorat tadbirida ishtirok etgan holda QQSni qaytarish bo'yicha sayyor tekshiruvni qo'llab-quvvatladik.",
        ],
        outcome: [
          { metric: "Qaytarilgan QQS", value: "18,4 mlrd so'm" },
          { metric: "Qaytarish muddati", value: "5 oy" },
          { metric: "Qo'shimcha hisoblar", value: "0 so'm" },
          { metric: "Oldini olingan jarimalar", value: "1,2 mlrd so'm" },
        ],
        outcomeNarrative:
          "Qaytarish qo'shimcha hisoblar va jarimalarsiz amalga oshirildi. Endi kompaniya har chorakda kechikishlarsiz QQSni qaytarib oladi.",
        duration: "5 oy",
      },
      {
        slug: "it-park-resident-ifrs",
        industry: "IT",
        industryTag: "IT",
        serviceType: "MHXSga o'tkazish",
        clientProfile:
          "O'zbekiston IT-Park rezidenti, fintech platformasini ishlab chiqish, 95 xodim, daromad 28 mlrd so'm, asosiy mijozlar — MDH va Yaqin Sharq banklari.",
        challenge:
          "Xorijiy investor 3 yil uchun MHXS bo'yicha hisobot va investitsiya raundi oldidan due diligence uchun mustaqil audit xulosasini shart qildi. Muddat — bitim yopilishigacha 3 oy.",
        approach: [
          "Uchta turli hisob tizimidan ma'lumotlarni yig'ib, normallashtirdik: 1С, ichki CRM va Cartadagi cap table.",
          "Obuna bo'yicha daromadni tan olishda IFRS 15 ni qo'lladik (SaaS modeli).",
          "Ichki dasturiy ta'minotni ishlab chiqish xarajatlarini IAS 38 va IFRS 38 bo'yicha kapitallashtirdik.",
          "Tayyorlangan hisobotni XAS bo'yicha audit qildik, xulosani qaydsiz chiqardik.",
        ],
        outcome: [
          { metric: "Tayyorlangan hisobot", value: "3 yil uchun" },
          { metric: "Xulosa turi", value: "Qaydsiz" },
          { metric: "Loyiha muddati", value: "11 hafta" },
          { metric: "Jalb qilingan investitsiyalar", value: "$4,5 mln" },
        ],
        outcomeNarrative:
          "Bitim o'z vaqtida yopildi. Investor tayyorlangan hisobotning yuqori sifatini va IFRS 9 hamda IFRS 16 bo'yicha batafsil disclosure ni qayd etdi.",
        duration: "11 hafta",
      },
      {
        slug: "retail-tax-audit-defense",
        industry: "Savdo",
        industryTag: "Retail",
        serviceType: "Soliq konsalting",
        clientProfile:
          "Kiyim chakana savdosi tarmog'i, O'zbekiston bo'ylab 18 nuqta, yillik aylanma 42 mlrd so'm, 280 xodim.",
        challenge:
          "Soliq inspektsiyasi QQS, foyda solig'i va ijtimoiy soliq bo'yicha 4,2 mlrd so'mlik mumkin bo'lgan qo'shimcha hisoblar bilan sayyor tekshiruvni boshladi.",
        approach: [
          "23 ta bahsli operatsiyaning har biri uchun asoslashlar dosyesini tayyorladik.",
          "Transfer operatsiyalariga taqqoslanadigan bozor narxlari (TBN) usulini qo'lladik.",
          "Marketing xarajatlarining iqtisodiy asosliligi bo'yicha memorandum tayyorladik.",
          "Inspektorlar bilan barcha 14 ish uchrashuvini qo'llab-quvvatladik.",
        ],
        outcome: [
          { metric: "Dastlab e'lon qilingan", value: "4,2 mlrd so'm" },
          { metric: "Yakuniy qo'shimcha hisoblar", value: "180 mln so'm" },
          { metric: "Kamayish", value: "−95,7%" },
          { metric: "Jarimalar", value: "0" },
        ],
        outcomeNarrative:
          "Qo'shimcha hisoblar miqdori 4,2 mlrddan 180 mln so'mga kamaytirildi — to'g'ri pozitsiya argumentatsiyasi hisobiga.",
        duration: "4 oy",
      },
      {
        slug: "bank-isa-audit",
        industry: "Banklar",
        industryTag: "Banking",
        serviceType: "Majburiy audit",
        clientProfile:
          "Ikkinchi qatlam tijorat banki, aktivlar 2,1 trln so'm, kredit portfeli 1,3 trln so'm, 45 filial, 720 xodim.",
        challenge:
          "Kredit portfelini chuqurlashtirilgan tekshirish, mumkin bo'lgan yo'qotishlar uchun zaxiralar tashkil etilishi va RUz Markaziy bankining prudensial talablariga rioya qilish bilan XAS bo'yicha yillik majburiy audit.",
        approach: [
          "Kredit portfelini sinov uchun namuna olish usulini qo'lladik: 8 200 dan 142 kredit, namunaning umumiy summasi portfelning 38%.",
          "56 yirik kredit bo'yicha mustaqil baholashni o'tkazdik.",
          "Bank IFRS 9 ECL modelini sinab ko'rdik, migration matrix to'g'riligini tekshirdik.",
          "Xulosani chiqarishdan oldin bank bilan 11 ta tuzatishni kelishdik.",
        ],
        outcome: [
          { metric: "Namuna qamrovi", value: "Portfelning 38%" },
          { metric: "RVP tuzatishlari", value: "+47 mlrd so'm" },
          { metric: "Xulosa turi", value: "Qaydsiz" },
          { metric: "MB me'yorlariga muvofiqlik", value: "100%" },
        ],
        outcomeNarrative:
          "Xulosa hisobotni RUz MBga topshirish muddatigacha berildi. Bank Markaziy bank tekshiruvidan izohsiz o'tdi.",
        duration: "10 hafta",
      },
      {
        slug: "pharma-restoration",
        industry: "Sog'liqni saqlash",
        industryTag: "Healthcare",
        serviceType: "Hisobni tiklash",
        clientProfile:
          "Farmatsevtika mahsulotlarining importyori va distribyutori, 6 mintaqaviy ombor, yillik aylanma 31 mlrd so'm.",
        challenge:
          "Bosh buxgalter ishdan ketganidan keyin 14 oylik birlamchi hujjatlar yo'qligi, 2,8 mlrd so'mlik inventarizatsiya farqlari aniqlandi, 4 chorak soliq hisoboti topshirilmagan.",
        approach: [
          "Kontragentlarga so'rovlar va e-faktura tizimi orqali birlamchi hujjatlarni tikladik — 8 400 schyot-faktura va 2 100 TTN.",
          "6 ombor bo'yicha to'liq inventarizatsiyani fotofiksatsiya bilan o'tkazdik.",
          "QQS, foyda solig'i va ijtimoiy soliq bo'yicha tuzatish deklaratsiyalarini tayyorladik va topshirdik.",
          "Ombor qoldiqlarini buxgalteriya hisobi bilan kunlik tekshirish reglamentini joriy qildik.",
        ],
        outcome: [
          { metric: "Tiklangan hujjatlar", value: "10 500 dona" },
          { metric: "Haqiqiy kamomad", value: "940 mln so'm" },
          { metric: "DSQ jarimalari", value: "0 (ixtiyoriy)" },
          { metric: "Muddat", value: "7 hafta" },
        ],
        outcomeNarrative:
          "Soliq tekshiruvi kelishidan oldin ulgurdik. Barcha etishmayotgan deklaratsiyalar topshirildi, soliqlar ixtiyoriy ravishda to'landi.",
        duration: "7 hafta",
      },
      {
        slug: "ma-due-diligence",
        industry: "M&A",
        industryTag: "M&A",
        serviceType: "Due Diligence",
        clientProfile:
          "Xaridor — xorijiy investitsiya fondi. Ob'ekt — O'zbekistonda 110 mlrd so'm aylanmasi va 450 xodimi bo'lgan ishlab chiqarish kompaniyasi. Bitim summasi $12 mln.",
        challenge:
          "Biznesni sotib olishdan oldin moliyaviy va soliq due diligence. Vaqt cheklovi — 6 hafta. Sotuvchining boshqaruv hisobotida aks etmagan yashirin xavflar.",
        approach: [
          "Moliyaviy DD: daromad sifatini tekshirish, EBITDA ni normallashtirish.",
          "Soliq DD: QQS, foyda solig'i, transfer narxlash, nizolar bo'yicha xavflarni baholash.",
          "Yuridik DD: aktivlar yuklamalari, korporativ huquqlar, litsenziyalar.",
          "Alohida quality of earnings bo'limi va xavflar reestri bilan 84 sahifalik DD hisobotini tayyorladik.",
        ],
        outcome: [
          { metric: "Aniqlangan yashirin xavflar", value: "$2,1 mln" },
          { metric: "Bitim narxini tuzatish", value: "−$1,4 mln" },
          { metric: "Loyiha muddati", value: "5,5 hafta" },
          { metric: "Bitim", value: "Yopildi" },
        ],
        outcomeNarrative:
          "$2,1 mln yashirin soliq va yuridik xavflar bitim narxini qayta ko'rib chiqish uchun asos bo'ldi.",
        duration: "5,5 hafta",
      },
    ],
    trustHeading: "Nima uchun raqamlar bilan o'rtoqlashamiz",
    trustParagraphs: [
      "Yuqoridagi barcha keyslar — Leader Auditning haqiqiy loyihalari. Biz mijozlar nomlarini oshkor qila olmaymiz, lekin metodologiya, aniqlangan xavflar, qo'llanilgan XAS/MHXS standartlari va erishilgan natijalar aniq.",
      "Har bir keys ichki tekshiruvdan o'tgan va nashr qilishdan oldin mijoz bilan kelishilgan.",
      "So'rov bo'yicha sizning sohangizdagi mijozdan tavsiyaviy xat taqdim etishga tayyormiz — o'zaro NDA imzolanganidan keyin.",
    ],
    ctaHeading: "Kompaniyangiz uchun shunga o'xshash natija xohlaysizmi?",
    ctaDescription:
      "Vazifa haqida gapirib bering — amaliyotdan o'xshash keysni tanlaymiz, murakkablikni baholaymiz va byudjet bo'yicha mo'ljal beramiz.",
    ctaButton: "Loyihamni muhokama qilish",
    labels: {
      industry: "Soha",
      service: "Xizmat",
      client: "Mijoz profili",
      challenge: "Vazifa",
      approach: "Yondashuv",
      outcome: "Natija",
      duration: "Muddat",
      confidential: "Maxfiylik shartnomasi bo'yicha",
    },
  },

  en: {
    metaTitle: "Leader Audit Case Studies | Real Results of Audit & Tax Consulting in Uzbekistan",
    metaDescription:
      "Real Leader Audit cases: 18 bn UZS VAT refund for a manufacturer, 4.2 bn UZS tax risk identified, IFRS reporting prepared for an IT company. Numbers, timelines, outcomes.",
    keywords:
      "audit case studies Uzbekistan, audit examples, VAT refund case, tax optimization results, Leader Audit reviews",
    heroBadge: "Real Results",
    heroTitle: "Our Cases & Projects",
    heroDescription:
      "Anonymized case studies from Leader Audit's practice with concrete numbers. Client names are hidden under non-disclosure agreements (NDA), but the methods, risks and outcomes are real.",
    filterAll: "All cases",
    cases: [
      {
        slug: "manufacturing-vat-refund",
        industry: "Manufacturing",
        industryTag: "Manufacturing",
        serviceType: "VAT Refund",
        clientProfile:
          "Manufacturer of construction materials, annual turnover 85 bn UZS, 320 employees, exports products to Kazakhstan, Kyrgyzstan and Tajikistan.",
        challenge:
          "The company accumulated 22 bn UZS of input VAT surplus over 2 years due to major investments in a new plant. The Tax Committee twice refused the refund citing 'insufficient supporting documents' and 'discrepancies in reconciliation acts with suppliers'.",
        approach: [
          "Performed a complete inventory of invoices for 24 months, found and corrected 47 discrepancies between the purchase ledger and the State Tax Committee's automated system.",
          "Prepared comprehensive documentation for export operations with translation of foreign trade contracts and customs declarations (CMR, invoices, transaction passports).",
          "Agreed a new methodology for recognizing export operations for the 0% VAT rate with the State Tax Committee.",
          "Supported the field VAT refund audit, attending every tax control event.",
        ],
        outcome: [
          { metric: "VAT refunded", value: "18.4 bn UZS" },
          { metric: "Refund timeline", value: "5 months" },
          { metric: "Additional assessments", value: "0 UZS" },
          { metric: "Penalties prevented", value: "1.2 bn UZS" },
        ],
        outcomeNarrative:
          "The refund went through with no additional assessments or penalties. Methodological recommendations were also fixed, allowing the company to now recover VAT quarterly without delays.",
        duration: "5 months",
      },
      {
        slug: "it-park-resident-ifrs",
        industry: "IT",
        industryTag: "IT",
        serviceType: "IFRS Transformation",
        clientProfile:
          "Uzbekistan IT Park resident, fintech platform development, 95 employees, revenue 28 bn UZS, primary clients are CIS and Middle East banks.",
        challenge:
          "A foreign investor required 3 years of IFRS financial statements and an independent audit opinion to pass due diligence before an investment round. Deadline — 3 months until deal close.",
        approach: [
          "Collected and normalized data from three different accounting systems: 1C, internal CRM and cap table in Carta.",
          "Applied IFRS 15 to revenue recognition for subscriptions (SaaS model) accounting for performance obligation separation.",
          "Capitalized internal software development costs under IAS 38 and IFRS 38 with separation of research and development phases.",
          "Audited the prepared statements under ISA, issued an unqualified opinion.",
        ],
        outcome: [
          { metric: "Statements prepared", value: "for 3 years" },
          { metric: "Opinion type", value: "Unqualified" },
          { metric: "Project duration", value: "11 weeks" },
          { metric: "Investment raised", value: "$4.5 M" },
        ],
        outcomeNarrative:
          "The deal closed on time. The investor noted the high quality of the statements and detailed disclosures under IFRS 9 (financial instruments) and IFRS 16 (leases).",
        duration: "11 weeks",
      },
      {
        slug: "retail-tax-audit-defense",
        industry: "Retail",
        industryTag: "Retail",
        serviceType: "Tax Consulting",
        clientProfile:
          "Retail clothing chain, 18 stores across Uzbekistan, annual turnover 42 bn UZS, 280 employees.",
        challenge:
          "The tax inspectorate initiated a field audit with a preliminary estimate of additional assessments of 4.2 bn UZS in VAT, profit tax and social tax. Main claims — economic substantiation of marketing costs and transfer pricing operations with an affiliated importer.",
        approach: [
          "Prepared substantiation files for each of 23 disputed transactions with supporting documents and market price calculations.",
          "Applied the comparable uncontrolled price (CUP) method to transfer transactions, proving 90% of deals comply with Article 176 of the Uzbek Tax Code.",
          "Prepared a memorandum on the economic substantiation of marketing costs linked to revenue growth.",
          "Supported all 14 working meetings with inspectors, achieving partial withdrawal of the initial assessment.",
        ],
        outcome: [
          { metric: "Initially claimed", value: "4.2 bn UZS" },
          { metric: "Final assessments", value: "180 mln UZS" },
          { metric: "Reduction", value: "−95.7%" },
          { metric: "Penalties", value: "0 (all dropped)" },
        ],
        outcomeNarrative:
          "Additional assessments reduced from 4.2 bn to 180 mln UZS — through correct positioning, with no appeals or court proceedings. The client preserved working capital and reputation.",
        duration: "4 months",
      },
      {
        slug: "bank-isa-audit",
        industry: "Banking",
        industryTag: "Banking",
        serviceType: "Statutory Audit",
        clientProfile:
          "Second-tier commercial bank, assets 2.1 trillion UZS, loan portfolio 1.3 trillion UZS, 45 branches, 720 employees.",
        challenge:
          "Annual statutory audit under ISA with in-depth review of the loan portfolio, loan loss provisions, and compliance with Central Bank of Uzbekistan prudential requirements.",
        approach: [
          "Applied a sample testing method to the loan portfolio: 142 loans out of 8,200, total sample size 38% of the portfolio.",
          "Conducted independent collateral valuation for 56 large loans engaging certified appraisers.",
          "Tested the bank's IFRS 9 ECL model, verified the migration matrix and forward-looking scenarios.",
          "Agreed 11 adjustments with the bank prior to issuing the opinion, saving the bank a separate disclosure in the annual report.",
        ],
        outcome: [
          { metric: "Sample coverage", value: "38% of portfolio" },
          { metric: "LLP adjustments", value: "+47 bn UZS" },
          { metric: "Opinion type", value: "Unqualified" },
          { metric: "CBU compliance", value: "100%" },
        ],
        outcomeNarrative:
          "Opinion issued before the reporting deadline to the CBU. The bank passed the Central Bank's review without comments — thanks to preventive adjustments agreed during the audit.",
        duration: "10 weeks",
      },
      {
        slug: "pharma-restoration",
        industry: "Healthcare",
        industryTag: "Healthcare",
        serviceType: "Bookkeeping Restoration",
        clientProfile:
          "Importer and distributor of pharmaceutical products, 6 regional warehouses, annual turnover 31 bn UZS.",
        challenge:
          "After the chief accountant resigned, primary documents for 14 months were missing, inventory discrepancies of 2.8 bn UZS, tax reporting not filed for 4 quarters. Time until scheduled tax inspection — 2 months.",
        approach: [
          "Restored primary documents through requests to counterparties and the e-faktura system — 8,400 invoices and 2,100 waybills.",
          "Performed a complete inventory of 6 warehouses with photo documentation, identified actual discrepancies of 940 mln UZS (vs the preliminary 2.8 bn estimate).",
          "Prepared and filed correcting declarations for VAT, profit tax and social tax for the 4 missed periods.",
          "Implemented a daily reconciliation regulation between warehouse balances and accounting records.",
        ],
        outcome: [
          { metric: "Documents restored", value: "10,500 items" },
          { metric: "Actual shortage", value: "940 mln UZS" },
          { metric: "STC penalties", value: "0 (voluntary filing)" },
          { metric: "Duration", value: "7 weeks" },
        ],
        outcomeNarrative:
          "We finished before the tax inspection arrived. All missing declarations filed, taxes paid voluntarily — exempting the company from penalties under Article 219 of the Tax Code.",
        duration: "7 weeks",
      },
      {
        slug: "ma-due-diligence",
        industry: "M&A",
        industryTag: "M&A",
        serviceType: "Due Diligence",
        clientProfile:
          "Buyer — foreign investment fund. Target — manufacturing company in Uzbekistan with 110 bn UZS turnover and 450 employees. Deal size — discussed at $12 M.",
        challenge:
          "Financial and tax due diligence before business acquisition. Time constraint — 6 weeks including holidays. Hidden risks not reflected in the seller's management reporting.",
        approach: [
          "Financial DD: revenue quality check (by counterparty, currency, seasonality), EBITDA normalization excluding one-time items.",
          "Tax DD: assessment of risks in VAT, profit tax, transfer pricing, dispute liabilities.",
          "Legal DD (with partner counsel): asset encumbrances, corporate rights, licenses and permits.",
          "Prepared an 84-page DD report with a separate quality of earnings (QoE) section and a quantified risk register.",
        ],
        outcome: [
          { metric: "Hidden risks identified", value: "$2.1 M" },
          { metric: "Deal price adjustment", value: "−$1.4 M" },
          { metric: "Project duration", value: "5.5 weeks" },
          { metric: "Deal", value: "Closed" },
        ],
        outcomeNarrative:
          "Hidden tax and legal risks of $2.1 M became grounds for revising the deal price. The buyer saved $1.4 M and placed the remainder in escrow for 24 months.",
        duration: "5.5 weeks",
      },
    ],
    trustHeading: "Why we share numbers",
    trustParagraphs: [
      "All cases above are real Leader Audit projects. We cannot disclose client names, but the methodology, identified risks, ISA/IFRS standards applied and outcomes achieved are accurate.",
      "Each case has passed internal review and been agreed with the client before publication. If you recognize your project — it is a coincidence with dozens of similar engagements we handle annually.",
      "We can provide a reference letter from a client in your industry on request — after a mutual NDA is signed.",
    ],
    ctaHeading: "Want a similar result for your company?",
    ctaDescription:
      "Tell us about your task — we will find a similar case from practice, estimate complexity and give a budget benchmark.",
    ctaButton: "Discuss my project",
    labels: {
      industry: "Industry",
      service: "Service",
      client: "Client profile",
      challenge: "Challenge",
      approach: "Approach",
      outcome: "Outcome",
      duration: "Duration",
      confidential: "Under non-disclosure agreement",
    },
  },
};
