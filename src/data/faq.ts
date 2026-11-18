import type { Lang } from "../i18n/ui";
import { SITE } from "./site";

type QA = { q: string; a: string };

/** General FAQ. Answers are written as plain, self-contained statements so search engines and AI assistants can quote them. */
export const FAQ: Record<Lang, { group: string; items: QA[] }[]> = {
  ro: [
    {
      group: "Despre atelier",
      items: [
        { q: "Ce este Radial Cons?", a: `Radial Cons SRL este un atelier de confecții metalice din Târgoviște, județul Dâmbovița, înființat în ${SITE.foundingYear}. Facem piese metalice la comandă: mobilier și vetre de foc, structuri metalice, prototipuri și serii mici, plus porți și balustrade.` },
        { q: "Unde se află atelierul?", a: `Atelierul este în ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, jud. ${SITE.address.county}. Toate piesele se proiectează și se execută aici.` },
        { q: "Lucrați și în afara județului Dâmbovița?", a: "Da. Lucrăm pentru clienți din toată România. Transportul și montajul se stabilesc în ofertă, în funcție de localitate." },
        { q: "Cu ce materiale lucrați?", a: "Lucrăm cu oțel carbon, inox, aluminiu și oțel corten." },
      ],
    },
    {
      group: "Comenzi și oferte",
      items: [
        { q: "Cum cer o ofertă?", a: `Scrie-ne la ${SITE.email} sau sună la ${SITE.phoneMobile.display}. Spune-ne ce vrei să realizăm, dimensiunile aproximative, materialul și finisajul dorit, dacă e nevoie de montaj și în ce localitate. Atașează schițe, poze de inspirație sau fișiere DXF/STEP, dacă ai.` },
        { q: "Vindeți produse standard, din stoc?", a: "Nu. Suntem un atelier, nu un magazin. Fiecare piesă se face la comandă, după desenul, schița sau ideea ta." },
        { q: "Faceți și piese unicat sau doar serii?", a: "Facem ambele: piese unicat, prototipuri și serii mici de producție." },
        { q: "Ce fișiere acceptați pentru producție?", a: "DXF pentru piese din tablă și STEP pentru piese 3D. Putem lucra și după schițe cotate, poze sau o piesă model." },
      ],
    },
    {
      group: "Tehnologie și finisaje",
      items: [
        { q: "Ce tehnologii folosiți?", a: "Debitare laser CNC (laser fiber pentru tablă, țeavă și profile), sudură laser pentru oțel, inox și aluminiu, debitare cu plasmă pentru tablă groasă și îndoire CNC pe abkant." },
        { q: "Ce finisaje oferiți?", a: "Luciu oglindă, periat, vopsit, și patina naturală a oțelului corten. Finisajul potrivit se alege în funcție de material și de locul unde va sta piesa." },
        { q: "Faceți și montaj?", a: "Da, putem livra și monta piesele. Spune-ne localitatea când ceri oferta." },
      ],
    },
  ],
  en: [
    {
      group: "About the workshop",
      items: [
        { q: "What is Radial Cons?", a: `Radial Cons SRL is a metal fabrication workshop in Târgoviște, Dâmbovița County, Romania, founded in ${SITE.foundingYear}. We make custom metal work: furniture and firepits, steel structures, prototypes and small batches, plus gates and railings.` },
        { q: "Where is the workshop?", a: `The workshop is at ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, Dâmbovița County, Romania. Every piece is designed and made here.` },
        { q: "Do you work outside Romania?", a: "We work for clients across Romania and can quote international projects. Transport and installation are agreed in the quote." },
        { q: "Which materials do you work with?", a: "Carbon steel, stainless steel, aluminium and corten steel." },
      ],
    },
    {
      group: "Orders and quotes",
      items: [
        { q: "How do I request a quote?", a: `Email ${SITE.email} or call ${SITE.phoneMobile.intl}. Tell us what you'd like made, rough dimensions, preferred material and finish, whether installation is needed and where. Attach sketches, inspiration photos or DXF/STEP files if you have them.` },
        { q: "Do you sell standard products from stock?", a: "No. We're a workshop, not a shop. Every piece is made to order from your drawing, sketch or idea." },
        { q: "Do you make one-offs or only batches?", a: "Both: one-off pieces, prototypes and small production batches." },
        { q: "Which files do you accept for production?", a: "DXF for sheet-metal parts and STEP for 3D parts. We can also work from dimensioned sketches, photos or a sample part." },
      ],
    },
    {
      group: "Technology and finishes",
      items: [
        { q: "Which technologies do you use?", a: "CNC laser cutting (fiber laser for sheet, tube and profiles), laser welding for steel, stainless and aluminium, plasma cutting for heavy plate, and CNC press-brake bending." },
        { q: "Which finishes do you offer?", a: "Mirror polish, brushed, painted, and corten's natural patina. The right finish depends on the material and where the piece will live." },
        { q: "Do you install?", a: "Yes, we can deliver and install. Tell us the location when you ask for a quote." },
      ],
    },
  ],
};
