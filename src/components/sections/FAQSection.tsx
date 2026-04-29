import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

type FAQItem = {
  question: string;
  answer: string;
};

const faqContent: Record<"ru" | "uz" | "en", { badge: string; title: string; description: string; items: FAQItem[] }> = {
  ru: {
    badge: "Частые вопросы",
    title: "Ответы на популярные вопросы",
    description: "Самое важное про аудит и налоговый консалтинг в Узбекистане",
    items: [
      {
        question: "Кому в Узбекистане обязательно проходить ежегодный аудит?",
        answer: "Обязательный аудит проходят: акционерные общества, банки и кредитные организации, страховые компании, инвестиционные и пенсионные фонды, биржи, предприятия с долей государства более 50%, а также крупные компании, превышающие установленные пороги по выручке, активам или численности сотрудников. Leader Audit имеет лицензию Минфина РУз и проводит обязательный аудит по международным стандартам МСА.",
      },
      {
        question: "Как вернуть НДС в Узбекистане?",
        answer: "Возврат НДС возможен при превышении входящего НДС над исходящим, при экспорте товаров и услуг, а также при инвестиционной деятельности. Процедура включает подготовку документов, подачу заявления в налоговый орган, проведение камеральной проверки и получение возврата на расчётный счёт. Leader Audit оказала клиентам содействие в возврате более 200 млрд сумов НДС.",
      },
      {
        question: "Что такое инициативный аудит и зачем он нужен?",
        answer: "Инициативный (добровольный) аудит проводится по решению руководства компании для оценки достоверности финансовой отчётности, выявления налоговых рисков, подготовки к привлечению инвестиций, продаже бизнеса или смене собственника. Особенно полезен перед налоговой проверкой и при выходе на международные рынки.",
      },
      {
        question: "Сколько стоят аудиторские услуги в Ташкенте?",
        answer: "Стоимость аудита зависит от объёма деятельности компании, сложности отчётности (МСА, МСФО, НСБУ), отрасли и количества хозяйственных операций. Цены формируются индивидуально после экспресс-анализа рисков. Leader Audit предоставляет первую консультацию бесплатно.",
      },
      {
        question: "Чем МСА отличается от НСБУ?",
        answer: "МСА (Международные стандарты аудита) — глобальные стандарты, применяемые при аудите по МСФО, признаваемые во всём мире. НСБУ (Национальные стандарты бухгалтерского учёта) — стандарты Республики Узбекистан, обязательные для всех местных компаний. Многие компании ведут параллельный учёт по обеим системам.",
      },
      {
        question: "Какая ответственность у аудиторской компании?",
        answer: "Leader Audit несёт полную материальную ответственность за качество аудиторского заключения. Профессиональная ответственность застрахована в соответствии с требованиями законодательства РУз — страховой полис гарантирует возмещение убытков клиента в случае профессиональной ошибки.",
      },
      {
        question: "С какими отраслями работает Leader Audit?",
        answer: "Leader Audit имеет глубокую экспертизу в сложных и регулируемых отраслях: медицина и фармацевтика (Medical), IT и SaaS, производство (Manufacturing), оптовая и розничная торговля, строительство, банковский сектор, страхование. У основателей квалификации CAP, CIPA, DipIFR (ACCA).",
      },
      {
        question: "Сколько времени занимает аудит компании?",
        answer: "Стандартный аудит малой компании занимает 2-3 недели, средней — 1-2 месяца, крупной с филиалами — 2-4 месяца. Сроки зависят от объёма документации, готовности учётных данных и сложности отрасли.",
      },
    ],
  },
  uz: {
    badge: "Tez-tez beriladigan savollar",
    title: "Mashhur savollarga javoblar",
    description: "O'zbekistonda audit va soliq konsalting haqida eng muhim ma'lumot",
    items: [
      {
        question: "O'zbekistonda kim majburiy yillik audit o'tkazishi kerak?",
        answer: "Majburiy auditdan o'tadi: aksiyadorlik jamiyatlari, banklar va kredit tashkilotlari, sug'urta kompaniyalari, investitsiya va pensiya fondlari, birjalar, davlat ulushi 50% dan ortiq bo'lgan korxonalar, shuningdek tushum, aktivlar yoki xodimlar soni belgilangan chegaralardan yuqori bo'lgan yirik kompaniyalar. Leader Audit O'zbekiston Moliya vazirligi litsenziyasiga ega va XAS bo'yicha audit o'tkazadi.",
      },
      {
        question: "O'zbekistonda QQSni qanday qaytarish mumkin?",
        answer: "QQSni qaytarish kiruvchi QQS chiquvchidan oshganida, eksport qilingan tovar va xizmatlar uchun, hamda investitsion faoliyatda mumkin. Jarayon hujjatlar tayyorlash, soliq organiga ariza topshirish, kameral tekshiruvni o'tkazish va hisob-kitob raqamiga qaytarish olishni o'z ichiga oladi. Leader Audit mijozlariga 200 mlrd so'mdan ortiq QQSni qaytarishda ko'maklashgan.",
      },
      {
        question: "Tashabbuskor audit nima va u nima uchun kerak?",
        answer: "Tashabbuskor (ixtiyoriy) audit kompaniya rahbariyatining qaroriga binoan moliyaviy hisobotning ishonchliligini baholash, soliq xavflarini aniqlash, investitsiya jalb qilishga, biznesni sotishga yoki egasi almashishiga tayyorgarlik uchun o'tkaziladi.",
      },
      {
        question: "Toshkentda audit xizmatlari qancha turadi?",
        answer: "Audit narxi kompaniya faoliyati hajmi, hisobot murakkabligi (XAS, XHXS, MHXS), soha va operatsiyalar soniga bog'liq. Narxlar ekspress tahlildan keyin individual shakllanadi. Leader Audit birinchi konsultatsiyani bepul taqdim etadi.",
      },
      {
        question: "XAS MHXSdan qanday farq qiladi?",
        answer: "XAS (Xalqaro audit standartlari) — XHXS bo'yicha auditda qo'llaniladigan global standartlar, butun dunyoda tan olinadi. MHXS — O'zbekiston Respublikasi standartlari, mahalliy kompaniyalar uchun majburiy. Ko'p kompaniyalar ikkala tizim bo'yicha parallel hisob yuritadi.",
      },
      {
        question: "Auditorlik kompaniyasining javobgarligi qanday?",
        answer: "Leader Audit auditorlik xulosasi sifati uchun to'liq moddiy javobgarlikka ega. Professional javobgarlik O'zbekiston qonunchiligi talablariga muvofiq sug'urtalangan — sug'urta polisi mijozning zararini auditorning xatosi natijasida qoplashni kafolatlaydi.",
      },
      {
        question: "Leader Audit qaysi sohalar bilan ishlaydi?",
        answer: "Leader Audit murakkab va tartibga solinadigan sohalarda chuqur tajribaga ega: tibbiyot va farmatsevtika (Medical), IT va SaaS, ishlab chiqarish (Manufacturing), ulgurji va chakana savdo, qurilish, bank sektori, sug'urta. Asoschilarda CAP, CIPA, DipIFR (ACCA) sertifikatlari bor.",
      },
      {
        question: "Kompaniya auditi qancha vaqt oladi?",
        answer: "Kichik kompaniya auditi odatda 2-3 hafta, o'rta hajmlilari — 1-2 oy, filiallari bo'lgan yirik kompaniyalar uchun 2-4 oy davom etadi. Muddatlar hujjatlar hajmiga, hisob ma'lumotlari tayyorligiga va soha murakkabligiga bog'liq.",
      },
    ],
  },
  en: {
    badge: "Frequently asked questions",
    title: "Answers to popular questions",
    description: "Key information about audit and tax consulting in Uzbekistan",
    items: [
      {
        question: "Who is required to undergo annual audit in Uzbekistan?",
        answer: "Statutory audit applies to: joint-stock companies, banks and credit organizations, insurance companies, investment and pension funds, exchanges, enterprises with state ownership exceeding 50%, as well as large companies exceeding established thresholds for revenue, assets or number of employees. Leader Audit is licensed by the Ministry of Finance of Uzbekistan and conducts statutory audits under ISA.",
      },
      {
        question: "How to refund VAT in Uzbekistan?",
        answer: "VAT refund is possible when input VAT exceeds output VAT, when exporting goods and services, and during investment activity. The procedure includes preparing documents, submitting an application to the tax authority, undergoing a desk audit and receiving the refund. Leader Audit has helped clients refund over 200 billion UZS in VAT.",
      },
      {
        question: "What is initiative audit and why do you need one?",
        answer: "Initiative (voluntary) audit is conducted at the management's discretion to assess financial statement reliability, identify tax risks, prepare for investor onboarding, business sale or ownership change. Especially valuable before tax inspections and when entering international markets.",
      },
      {
        question: "How much do audit services cost in Tashkent?",
        answer: "Audit cost depends on the scope of operations, complexity of reporting (ISA, IFRS, NAS), industry and number of transactions. Pricing is calculated individually after a quick risk analysis. Leader Audit offers a free initial consultation.",
      },
      {
        question: "How is ISA different from NAS?",
        answer: "ISA (International Standards on Auditing) are globally accepted standards used for IFRS-based audits. NAS (National Accounting Standards) are mandatory standards of Uzbekistan for local companies. Many companies maintain parallel records under both systems.",
      },
      {
        question: "What is the audit firm's liability?",
        answer: "Leader Audit bears full financial liability for the quality of the audit opinion. Professional liability is insured according to Uzbek legal requirements — the policy guarantees compensation to the client in case of a professional error.",
      },
      {
        question: "Which industries does Leader Audit work with?",
        answer: "Leader Audit has deep expertise in complex and regulated industries: medical and pharmaceuticals (Medical), IT and SaaS, manufacturing, wholesale and retail trade, construction, banking, insurance. Founders hold CAP, CIPA, DipIFR (ACCA) certifications.",
      },
      {
        question: "How long does an audit take?",
        answer: "A small company audit typically takes 2-3 weeks, mid-sized — 1-2 months, large with subsidiaries — 2-4 months. Timing depends on documentation volume, accounting data readiness and industry complexity.",
      },
    ],
  },
};

const FAQSection = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const content = faqContent[language];

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container-wide max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">
            {content.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
            {content.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            {content.description}
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {content.items.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 text-left hover:bg-muted/30 transition-colors"
                aria-expanded={openIndex === index}
              >
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                <h3 className="flex-1 text-sm sm:text-base md:text-lg font-semibold text-foreground">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pl-12 sm:pl-14 md:pl-16">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
