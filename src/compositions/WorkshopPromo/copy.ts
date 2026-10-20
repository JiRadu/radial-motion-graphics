/**
 * All on-screen text for WorkshopPromo, per language.
 *
 * - Pick the language with the `language` prop (Studio props panel or
 *   `--props='{"language":"en"}'`). Romanian is the default.
 * - `highlight` lists words (exactly as written in the title, including
 *   punctuation) that are tinted with the accent colour.
 * - Join words with a non-breaking space (\u00A0) to keep a phrase on one
 *   line; it is then animated and highlighted as a single word.
 * - Keep every language's arrays the same length and order: scenes pair them
 *   with icons, sounds and timings by index.
 */
export const LANGUAGES = ["ro", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

type Headline = { text: string; highlight: string[] };
type Item = { title: string; detail: string };

export type Copy = {
  /** BCP-47 tag, set on the root element so uppercasing/hyphenation follow the language. */
  locale: string;
  intro: {
    eyebrow: string;
    tagline: Headline;
    services: string[];
  };
  furniture: {
    eyebrow: string;
    title: Headline;
    features: Item[];
  };
  structures: {
    eyebrow: string;
    title: Headline;
    warehouses: string;
    solar: string;
  };
  custom: {
    eyebrow: string;
    title: Headline;
    points: string[];
    stamp: string;
  };
  technology: {
    eyebrow: string;
    title: Headline;
    /** Order: laser cutting, laser welding, plasma cutting, bending. */
    processes: (Item & { tag: string })[];
  };
  outro: {
    cta: string;
  };
};

export const COPY: Record<Language, Copy> = {
  ro: {
    locale: "ro-RO",
    intro: {
      eyebrow: "Atelier de confecții metalice",
      tagline: {
        text: "Atelier mic. Precizie de oțel.",
        highlight: ["Precizie", "de", "oțel."],
      },
      services: [
        "Mobilier",
        "Vetre de foc",
        "Structuri metalice",
        "Piese la comandă",
      ],
    },
    furniture: {
      eyebrow: "Pentru casă și grădină",
      title: {
        // Non-breaking spaces keep "vetre de foc" on one line (and one highlight).
        text: "Mobilier și vetre\u00A0de\u00A0foc făcute să dureze",
        highlight: ["vetre\u00A0de\u00A0foc"],
      },
      features: [
        {
          title: "Mobilier de interior și exterior",
          detail: "Mese, bănci, scaune, rafturi și cadre",
        },
        {
          title: "Vetre și boluri de foc",
          detail: "Modele decupate cu laser, din corten, oțel carbon sau inox",
        },
        {
          title: "Accesorii pentru mobilier",
          detail: "Picioare, baze, console și feronerie la comandă",
        },
      ],
    },
    structures: {
      eyebrow: "Proiecte industriale",
      title: {
        text: "Structuri metalice de mari dimensiuni",
        highlight: ["metalice"],
      },
      warehouses: "Hale și depozite industriale",
      solar: "Structuri pentru panouri fotovoltaice",
    },
    custom: {
      eyebrow: "Producție la comandă",
      title: {
        text: "Tu desenezi. Noi executăm.",
        highlight: ["Noi", "executăm."],
      },
      points: [
        "Prototipuri și piese unicat",
        "Serii mici de producție",
        "De la fișier DXF / STEP la piesa finită",
      ],
      stamp: "Gata de producție",
    },
    technology: {
      eyebrow: "Tehnologie de ultimă generație",
      title: {
        text: "Precizie la fiecare tăiere, sudură și îndoire",
        highlight: ["tăiere,", "sudură", "îndoire"],
      },
      processes: [
        {
          title: "Debitare laser CNC",
          detail: "Laser fiber de precizie pentru tablă și țeavă",
          tag: "Tablă · Țeavă · Profile",
        },
        {
          title: "Sudură laser",
          detail: "Îmbinări curate și rezistente, cu deformări minime",
          tag: "Oțel · Inox · Aluminiu",
        },
        {
          title: "Debitare cu plasmă",
          detail: "Tăiere rapidă și eficientă a tablei groase",
          tag: "Tablă groasă",
        },
        {
          title: "Îndoire CNC",
          detail: "Îndoire pe abkant, la unghiuri exacte",
          tag: "Unghiuri repetabile",
        },
      ],
    },
    outro: {
      cta: "Hai să construim ceva solid.",
    },
  },

  en: {
    locale: "en-US",
    intro: {
      eyebrow: "Metal fabrication workshop",
      tagline: {
        text: "Small workshop. Serious steel.",
        highlight: ["Serious", "steel."],
      },
      services: ["Furniture", "Firepits", "Steel structures", "Custom parts"],
    },
    furniture: {
      eyebrow: "Indoor & outdoor living",
      title: {
        text: "Furniture & firepits built to last",
        highlight: ["firepits"],
      },
      features: [
        {
          title: "Indoor & outdoor furniture",
          detail: "Tables, benches, chairs, shelving and frames",
        },
        {
          title: "Firepits & fire bowls",
          detail: "Laser-cut patterns in corten, carbon and stainless steel",
        },
        {
          title: "Furniture accessories",
          detail: "Legs, bases, brackets and custom hardware",
        },
      ],
    },
    structures: {
      eyebrow: "Industrial projects",
      title: { text: "Large-scale steel structures", highlight: ["steel"] },
      warehouses: "Warehouses & industrial halls",
      solar: "Photovoltaic mounting structures",
    },
    custom: {
      eyebrow: "Custom manufacturing",
      title: {
        text: "Your drawing. Our metal.",
        highlight: ["Our", "metal."],
      },
      points: [
        "Prototypes & one-off pieces",
        "Small-batch production runs",
        "From DXF / STEP file to finished part",
      ],
      stamp: "Ready for production",
    },
    technology: {
      eyebrow: "Latest technology",
      title: {
        text: "Precision in every cut, weld & bend",
        highlight: ["cut,", "weld", "bend"],
      },
      processes: [
        {
          title: "CNC laser cutting",
          detail: "Fiber-laser precision on sheet and tube",
          tag: "Sheet · Tube · Profiles",
        },
        {
          title: "Laser welding",
          detail: "Clean, strong seams with minimal distortion",
          tag: "Steel · Stainless · Alu",
        },
        {
          title: "Plasma cutting",
          detail: "Fast, efficient cutting of thick plate",
          tag: "Heavy plate",
        },
        {
          title: "CNC bending",
          detail: "Press-brake forming to exact angles",
          tag: "Repeatable angles",
        },
      ],
    },
    outro: {
      cta: "Let's build it in metal.",
    },
  },
};
