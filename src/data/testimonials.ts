import type { Lang } from "../i18n/ui";

/**
 * ⚠️ MOCK TESTIMONIALS — placeholders requested for the first version of the site.
 * They are NOT real client quotes. Replace them with real, approved quotes before launch
 * (EU consumer law treats invented reviews as an unfair commercial practice).
 * They are intentionally left out of the structured data (no Review / AggregateRating markup).
 */
export interface Testimonial {
  id: string;
  mock: true;
  initials: string;
  role: Record<Lang, string>;
  service: string;
  quote: Record<Lang, string>;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    mock: true,
    initials: "A.M.",
    role: { ro: "Proprietar restaurant, Târgoviște", en: "Restaurant owner, Târgoviște" },
    service: "furniture",
    quote: {
      ro: "Scaunele de bar au fost primul lucru pe care l-au remarcat clienții la redeschidere. Finisajul e impecabil, iar după un an de folosire zilnică arată ca în prima zi.",
      en: "The bar stools were the first thing guests noticed when we reopened. The finish is flawless, and after a year of daily use they still look brand new.",
    },
  },
  {
    id: "t2",
    mock: true,
    initials: "R.D.",
    role: { ro: "Inginer proiectant, firmă de automatizări", en: "Design engineer, automation company" },
    service: "custom",
    quote: {
      ro: "Am trimis fișierul STEP vineri și am primit întrebări bune, nu doar un preț. Prototipul a ieșit la cotă, iar seria a fost identică cu el.",
      en: "I sent the STEP file on a Friday and got good questions back, not just a price. The prototype was on dimension, and the batch matched it exactly.",
    },
  },
  {
    id: "t3",
    mock: true,
    initials: "C.P.",
    role: { ro: "Administrator, firmă de construcții", en: "Managing director, construction company" },
    service: "structures",
    quote: {
      ro: "Piesele pentru hală au venit marcate și s-au îmbinat din prima. Echipa de montaj n-a avut nimic de ajustat pe șantier.",
      en: "The hall members arrived marked and fitted first time. Our erection crew had nothing to adjust on site.",
    },
  },
  {
    id: "t4",
    mock: true,
    initials: "I.S.",
    role: { ro: "Designer de interior, București", en: "Interior designer, Bucharest" },
    service: "furniture",
    quote: {
      ro: "Lucrez cu ei pentru piesele pe care nu le găsesc în catalog. Înțeleg proporțiile, respectă desenul și propun soluții când e cazul.",
      en: "I work with them on pieces I can't find in any catalogue. They understand proportion, respect the drawing and suggest solutions when needed.",
    },
  },
  {
    id: "t5",
    mock: true,
    initials: "M.G.",
    role: { ro: "Proprietar casă, Dâmbovița", en: "Homeowner, Dâmbovița" },
    service: "furniture",
    quote: {
      ro: "Vatra de foc din corten e locul unde stăm toată vara. Modelul decupat arată superb seara. Lucrată cu suflet.",
      en: "The corten firepit is where we spend every summer evening. The cut-out pattern looks stunning at night. Made with real care.",
    },
  },
  {
    id: "t6",
    mock: true,
    initials: "V.T.",
    role: { ro: "Manager producție, producător de mobilier", en: "Production manager, furniture manufacturer" },
    service: "technology",
    quote: {
      ro: "Comandăm de la ei debitare laser și baze de masă în serie. Toleranțe constante, comunicare directă, fără surprize.",
      en: "We order laser cutting and table bases in series from them. Consistent tolerances, direct communication, no surprises.",
    },
  },
];
