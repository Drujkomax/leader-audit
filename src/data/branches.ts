import type { Language } from "@/contexts/language-context";

// 3 confirmed offices of Leader Audit in Tashkent. Single NAP (same phone/email/hours),
// different addresses. Verified geo only for the head office — branch coordinates are
// intentionally omitted until confirmed in Google Business Profile (do not guess a pin).

export type Branch = {
  id: string;
  label: Record<Language, string>;
  street: Record<Language, string>;
  district: Record<Language, string>;
  /** Google Maps link — search by full address (no guessed pin) */
  mapUrl: string;
  /** verified coordinates, head office only */
  geo?: { lat: string; lng: string };
};

export const PHONE = "+998 97 410 04 47";
export const PHONE_HREF = "+998974100447";
export const EMAIL = "info@leaderaudit.uz";
export const HOURS: Record<Language, string> = {
  ru: "Пн–Пт: 09:00–18:00",
  uz: "Du–Ju: 09:00–18:00",
  en: "Mon–Fri: 09:00–18:00",
};

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const branches: Branch[] = [
  {
    id: "mustaqillik",
    label: { ru: "Головной офис", uz: "Bosh ofis", en: "Head office" },
    street: { ru: "ул. Мустакиллик, 12", uz: "Mustaqillik koʻchasi, 12", en: "12 Mustaqillik St" },
    district: { ru: "г. Ташкент", uz: "Toshkent sh.", en: "Tashkent" },
    mapUrl: maps("Leader Audit, ул. Мустакиллик 12, Ташкент"),
    geo: { lat: "41.311081", lng: "69.240562" },
  },
  {
    id: "navoi",
    label: { ru: "Офис Шайхантахур", uz: "Shayxontohur ofisi", en: "Shaykhantakhur office" },
    street: { ru: "пр. Алишера Навои, 37", uz: "Alisher Navoiy shoh koʻchasi, 37", en: "37 Alisher Navoi Ave" },
    district: { ru: "Шайхантахурский район, Ташкент", uz: "Shayxontohur tumani, Toshkent", en: "Shaykhantakhur district, Tashkent" },
    mapUrl: maps("Leader Audit, проспект Алишера Навои 37, Ташкент"),
  },
  {
    id: "chilanzar",
    label: { ru: "Офис Чиланзар", uz: "Chilonzor ofisi", en: "Chilanzar office" },
    street: { ru: "Чиланзар, 4-й квартал, 1", uz: "Chilonzor, 4-kvartal, 1", en: "Chilanzar, block 4, 1" },
    district: { ru: "Чиланзарский район, Ташкент", uz: "Chilonzor tumani, Toshkent", en: "Chilanzar district, Tashkent" },
    mapUrl: maps("Leader Audit, Чиланзар 4-й квартал 1, Ташкент"),
  },
];
