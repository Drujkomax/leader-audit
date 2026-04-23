import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/language-context";

const testimonialsByLanguage = {
  ru: [
    {
      id: 1,
      name: "Азиз Каримов",
      company: "Seven",
      position: "Финансовый директор",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit помог нам выявить критические налоговые риски и сэкономить миллионы. Профессиональный подход и глубокая экспертиза впечатляют.",
    },
    {
      id: 2,
      name: "Дилноза Рахимова",
      company: "1fit",
      position: "CEO",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: "Благодаря аудиторам Leader Audit мы успешно прошли проверку налоговой без единого замечания. Рекомендую всем!",
    },
    {
      id: 3,
      name: "Бахтиёр Юсупов",
      company: "Saber",
      position: "Генеральный директор",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Сотрудничаем с Leader Audit уже 5 лет. Их консультации всегда точны и помогают принимать правильные решения.",
    },
    {
      id: 4,
      name: "Малика Насырова",
      company: "Buka",
      position: "Главный бухгалтер",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Качество работы на высшем уровне. Команда всегда на связи и готова ответить на любые вопросы.",
    },
    {
      id: 5,
      name: "Тимур Алимов",
      company: "BlackRock UZ",
      position: "Директор по финансам",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit — это надёжный партнёр для любого бизнеса. Их аудит помог нам оптимизировать налоговую нагрузку.",
    },
    {
      id: 6,
      name: "Севара Исмаилова",
      company: "TechCorp",
      position: "CFO",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "Очень довольны результатами сотрудничества. Профессионализм и внимание к деталям — их главные качества.",
    },
    {
      id: 7,
      name: "Жасур Холматов",
      company: "FinGroup",
      position: "Управляющий партнёр",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      text: "После аудита Leader Audit наша финансовая отчётность стала прозрачной и понятной для инвесторов.",
    },
    {
      id: 8,
      name: "Нигора Хашимова",
      company: "MedPharma",
      position: "Финансовый менеджер",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      text: "Рекомендую Leader Audit всем, кто ценит качество и профессионализм. Отличная команда специалистов!",
    },
  ],
  uz: [
    {
      id: 1,
      name: "Aziz Karimov",
      company: "Seven",
      position: "Moliya direktori",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit bizga muhim soliq xatarlarini aniqlash va katta mablag'ni tejashga yordam berdi.",
    },
    {
      id: 2,
      name: "Dilnoza Rahimova",
      company: "1fit",
      position: "CEO",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit jamoasi bilan soliq tekshiruvini e'tirozsiz o'tdik. Albatta tavsiya qilaman.",
    },
    {
      id: 3,
      name: "Baxtiyor Yusupov",
      company: "Saber",
      position: "Bosh direktor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "5 yildan beri hamkorlik qilamiz. Ularning maslahatlari doim aniq va foydali.",
    },
    {
      id: 4,
      name: "Malika Nasirova",
      company: "Buka",
      position: "Bosh buxgalter",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Ish sifati juda yuqori. Jamoa doim aloqada va savollarga tez javob beradi.",
    },
    {
      id: 5,
      name: "Timur Alimov",
      company: "BlackRock UZ",
      position: "Moliya bo'yicha direktor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit har qanday biznes uchun ishonchli hamkor. Audit soliq yukini optimallashtirishga yordam berdi.",
    },
    {
      id: 6,
      name: "Sevara Ismailova",
      company: "TechCorp",
      position: "CFO",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "Hamkorlik natijalaridan juda mamnunmiz. Professional yondashuv va detallarga e'tibor kuchli tomonlari.",
    },
    {
      id: 7,
      name: "Jasur Holmatov",
      company: "FinGroup",
      position: "Boshqaruvchi hamkor",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      text: "Auditdan so'ng moliyaviy hisobotimiz investorlar uchun aniqroq va shaffofroq bo'ldi.",
    },
    {
      id: 8,
      name: "Nigora Hashimova",
      company: "MedPharma",
      position: "Moliya menejeri",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      text: "Sifat va professionallikni qadrlaydiganlarga Leader Auditni tavsiya qilaman.",
    },
  ],
  en: [
    {
      id: 1,
      name: "Aziz Karimov",
      company: "Seven",
      position: "Finance Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit helped us identify critical tax risks and save significant resources.",
    },
    {
      id: 2,
      name: "Dilnoza Rakhimova",
      company: "1fit",
      position: "CEO",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: "With Leader Audit, we passed the tax inspection without a single remark.",
    },
    {
      id: 3,
      name: "Bakhtiyor Yusupov",
      company: "Saber",
      position: "General Director",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "We have worked with Leader Audit for 5 years. Their recommendations are always accurate.",
    },
    {
      id: 4,
      name: "Malika Nasyrova",
      company: "Buka",
      position: "Chief Accountant",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Excellent quality of work. The team is responsive and always ready to help.",
    },
    {
      id: 5,
      name: "Timur Alimov",
      company: "BlackRock UZ",
      position: "Director of Finance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Leader Audit is a reliable partner for any business. Their audit improved our tax efficiency.",
    },
    {
      id: 6,
      name: "Sevara Ismailova",
      company: "TechCorp",
      position: "CFO",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "We are very satisfied with the results. Professionalism and attention to detail stand out.",
    },
    {
      id: 7,
      name: "Jasur Kholmatov",
      company: "FinGroup",
      position: "Managing Partner",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      text: "After the audit, our financial reporting became much clearer for investors.",
    },
    {
      id: 8,
      name: "Nigora Khashimova",
      company: "MedPharma",
      position: "Finance Manager",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      text: "I recommend Leader Audit to anyone who values quality and professionalism.",
    },
  ],
} as const;

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const testimonials = testimonialsByLanguage[language];
  const topRow = testimonials.slice(0, 4);
  const bottomRow = testimonials.slice(4, 8);

  const topRowDuplicated = [...topRow, ...topRow, ...topRow];
  const bottomRowDuplicated = [...bottomRow, ...bottomRow, ...bottomRow];

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-4 sm:space-y-6"
      >
        {/* Top Row - Moves Left */}
        <div className="relative">
          <div className="flex animate-scroll-left-slow">
            {topRowDuplicated.map((testimonial, index) => (
              <TestimonialCard key={`top-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="relative">
          <div className="flex animate-scroll-right-slow">
            {bottomRowDuplicated.map((testimonial, index) => (
              <TestimonialCard key={`bottom-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    company: string;
    position: string;
    avatar: string;
    text: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] mx-2 sm:mx-3 md:mx-4">
      <div className="bg-card border border-border rounded-xl p-4 sm:p-5 md:p-6 h-full shadow-sm hover:shadow-md transition-shadow">
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-cta/30 mb-3 sm:mb-4" />
        
        <p className="text-foreground/80 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-4">
          "{testimonial.text}"
        </p>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-cta/10 text-cta text-sm">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm sm:text-base truncate">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm truncate">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
