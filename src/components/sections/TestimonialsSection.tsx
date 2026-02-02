import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
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
];

const TestimonialsSection = () => {
  const topRow = testimonials.slice(0, 4);
  const bottomRow = testimonials.slice(4, 8);

  const topRowDuplicated = [...topRow, ...topRow, ...topRow];
  const bottomRowDuplicated = [...bottomRow, ...bottomRow, ...bottomRow];

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container-wide mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-cta/10 text-cta rounded-full text-xs sm:text-sm font-medium mb-4">
            Отзывы клиентов
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Нам доверяют <span className="text-cta">500+</span> компаний
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Узнайте, что говорят наши клиенты о сотрудничестве с Leader Audit
          </p>
        </motion.div>
      </div>

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
