import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Building2,
  User,
  CheckCircle,
  Shield,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/language-context";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/xqegblwl";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

// Имя: буквы RU/UZ/EN, пробел, дефис, апостроф. Цифры и спецсимволы — нет.
const NAME_ALLOWED = /[^A-Za-zА-Яа-яЁёЎўҚқҒғҲҳ\s'’ʻ`-]/g;

// Телефон храним как 9 цифр без кода страны; +998 живёт в разметке.
const PHONE_DIGITS = 9;

const sanitizeName = (value: string) => value.replace(NAME_ALLOWED, "");

const sanitizePhone = (value: string) => {
  let digits = value.replace(/\D/g, "");
  // Вставка из буфера вида «+998 90 123 45 67» или «998901234567».
  if (digits.length > PHONE_DIGITS && digits.startsWith("998")) {
    digits = digits.slice(3);
  }
  return digits.slice(0, PHONE_DIGITS);
};

// 901234567 → «90 123 45 67»
const formatPhone = (digits: string) =>
  [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)]
    .filter(Boolean)
    .join(" ");

type FormData = {
  name: string;
  phone: string;
  company: string;
};

type LeadPayload = Record<keyof FormData | "lang" | "page", string>;

const sendToCrm = async (payload: LeadPayload, attempt = 1): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Запрос переживёт закрытие вкладки сразу после отправки формы.
      keepalive: true,
    });
    if (!response.ok) throw new Error(`CRM responded ${response.status}`);
  } catch (error) {
    if (attempt < 2) return sendToCrm(payload, attempt + 1);
    // Лид всё равно уйдёт через Formspree на почту — но в Telegram его не
    // будет, поэтому оставляем след в консоли, а не глотаем ошибку.
    console.error("Lead did not reach CRM:", error);
  }
};

const LeadFormSection = () => {
  const { t, language } = useLanguage();
  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, t.leadForm.validation.nameMin)
      .max(100, t.leadForm.validation.nameMax)
      .regex(/^[^0-9]+$/, t.leadForm.validation.nameLetters),
    phone: z
      .string()
      .regex(new RegExp(`^\\d{${PHONE_DIGITS}}$`), t.leadForm.validation.phoneMin),
    company: z
      .string()
      .trim()
      .min(2, t.leadForm.validation.companyMin)
      .max(200, t.leadForm.validation.companyMax),
  });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Чистим прямо на вводе: запрещённый символ просто не появляется в поле.
    const cleaned =
      name === "name"
        ? sanitizeName(value)
        : name === "phone"
          ? sanitizePhone(value)
          : value;
    setFormData((prev) => ({ ...prev, [name]: cleaned }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const parsed = formSchema.parse(formData);
      // В CRM и Formspree уходит полный номер, а не 9 цифр из поля.
      const validated = { ...parsed, phone: `+998${parsed.phone}` };

      // CRM — источник уведомлений в Telegram, поэтому молча ронять этот
      // запрос нельзя: одна повторная попытка и keepalive на случай, если
      // пользователь закроет вкладку сразу после отправки.
      void sendToCrm({
        name: String(validated.name),
        phone: validated.phone,
        company: String(validated.company),
        lang: language,
        page: window.location.pathname,
      });

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...validated,
          _subject: t.leadForm.subject,
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setIsSubmitted(true);
      toast.success(t.leadForm.successToast);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error(t.leadForm.errorToast);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="py-12 sm:py-16 md:py-24 lg:py-32 bg-primary-dark"
      >
        <div className="container-wide max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              {t.leadForm.successTitle}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              {t.leadForm.successDescription}
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", phone: "", company: "" });
              }}
              className="text-primary font-semibold hover:underline text-sm sm:text-base"
            >
              {t.leadForm.submitAnother}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-24 lg:py-32 bg-primary-dark relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-cta/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-light/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary-foreground text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t.leadForm.title}
            </h2>
            <p className="text-primary-foreground/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              {t.leadForm.description}
            </p>

            <div className="space-y-3 sm:space-y-4 inline-block text-left">
              <div className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 text-sm sm:text-base">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cta flex-shrink-0" />
                <span>{t.leadForm.benefits[0]}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cta flex-shrink-0" />
                <span>{t.leadForm.benefits[1]}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-primary-foreground/80 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cta flex-shrink-0" />
                <span>{t.leadForm.benefits[2]}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg"
            >
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2"
                  >
                    {t.leadForm.nameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.leadForm.namePlaceholder}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base ${
                        errors.name ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2"
                  >
                    {t.leadForm.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <span className="absolute left-10 sm:left-12 top-1/2 -translate-y-1/2 text-foreground text-sm sm:text-base pointer-events-none select-none">
                      +998
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      id="phone"
                      name="phone"
                      value={formatPhone(formData.phone)}
                      onChange={handleChange}
                      placeholder="97 410 04 47"
                      className={`w-full pl-[5.25rem] sm:pl-24 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base ${
                        errors.phone ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs sm:text-sm font-medium text-foreground mb-1.5 sm:mb-2"
                  >
                    {t.leadForm.companyLabel}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t.leadForm.companyPlaceholder}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base ${
                        errors.company ? "border-destructive" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-destructive text-xs sm:text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-cta py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg font-semibold text-cta-foreground flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-cta-foreground/30 border-t-cta-foreground rounded-full animate-spin" />
                      <span>{t.leadForm.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{t.leadForm.submit}</span>
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-muted-foreground text-[10px] sm:text-xs text-center mt-3 sm:mt-4">
                {t.leadForm.privacy}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
