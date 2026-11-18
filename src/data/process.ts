import type { Lang } from "../i18n/ui";

/** The 4-step process from the brandbook: Proiectare → Execuție metalică → Finisaj → Livrare și montaj. */
export const STEPS: Record<Lang, { t: string; d: string }[]> = {
  ro: [
    { t: "Proiectare", d: "Pornim de la ideea, schița sau fișierul tău. Stabilim împreună materialul, finisajul și desenul de execuție." },
    { t: "Execuție metalică", d: "Debitare laser sau plasmă, îndoire CNC și sudură — totul în atelierul nostru din Târgoviște." },
    { t: "Finisaj", d: "Luciu oglindă, periat sau vopsit. Fiecare îmbinare e verificată și finisată înainte să plece piesa." },
    { t: "Livrare și montaj", d: "Ambalăm, livrăm și, când e nevoie, montăm la fața locului." },
  ],
  en: [
    { t: "Design", d: "We start from your idea, sketch or file, and agree the material, finish and fabrication drawing together." },
    { t: "Fabrication", d: "Laser or plasma cutting, CNC bending and welding — all in our own workshop in Târgoviște." },
    { t: "Finishing", d: "Mirror polish, brushed or painted. Every joint is checked and finished before a piece leaves." },
    { t: "Delivery & installation", d: "We pack, deliver and, when needed, install on site." },
  ],
};
