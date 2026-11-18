import { SITE } from "../data/site";
import { LOCALE, r, type Lang } from "../i18n/ui";

const abs = (path: string) => new URL(path, SITE.url).href;
export const ORG_ID = `${SITE.url}/#organization`;

/** LocalBusiness + Organization: the core entity search engines and AI assistants attach facts to. */
export function organization(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: abs("/brand/radialcons-simbol-color.png"),
    image: abs("/og/radial-cons-ro.png"),
    slogan: lang === "ro" ? "Atelier mic. Precizie de oțel." : "Small workshop. Serious steel.",
    description:
      lang === "ro"
        ? "Atelier de confecții metalice din Târgoviște, din 1999: mobilier și vetre de foc, structuri metalice, producție la comandă din DXF/STEP, debitare laser CNC, sudură laser, plasmă și îndoire CNC."
        : "Metal fabrication workshop in Târgoviște, Romania, since 1999: furniture and firepits, steel structures, custom manufacturing from DXF/STEP, CNC laser cutting, laser welding, plasma cutting and CNC bending.",
    foundingDate: String(SITE.foundingYear),
    vatID: SITE.vatId,
    taxID: SITE.vatId,
    telephone: SITE.phoneMobile.intl,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    hasMap: SITE.mapsUrl,
    areaServed: [{ "@type": "Country", name: "Romania" }],
    contactPoint: [
      { "@type": "ContactPoint", telephone: SITE.phoneMobile.intl, email: SITE.email, contactType: "sales", availableLanguage: ["ro", "en"] },
    ],
    sameAs: [SITE.social.facebook],
    knowsAbout: [
      "metal fabrication", "stainless steel furniture", "corten firepits", "steel structures",
      "industrial halls", "photovoltaic mounting structures", "CNC laser cutting", "laser welding",
      "plasma cutting", "CNC press brake bending", "wrought iron gates", "stainless railings",
    ],
    inLanguage: LOCALE[lang],
  };
}

export function website(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: abs(r("home", lang)),
    name: SITE.name,
    inLanguage: LOCALE[lang],
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function service(opts: { name: string; description: string; href: string; lang: Lang; offers: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: abs(opts.href),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Romania" },
    inLanguage: LOCALE[opts.lang],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
    },
  };
}

export function faqPage(items: { q: string; a: string }[], lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LOCALE[lang],
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

export function article(opts: { title: string; description: string; href: string; date: Date; lang: Lang; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: abs(opts.href),
    mainEntityOfPage: abs(opts.href),
    datePublished: opts.date.toISOString(),
    dateModified: opts.date.toISOString(),
    inLanguage: LOCALE[opts.lang],
    image: abs(opts.image),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function creativeWork(opts: { name: string; description: string; href: string; lang: Lang; material: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: abs(opts.href),
    material: opts.material,
    creator: { "@id": ORG_ID },
    inLanguage: LOCALE[opts.lang],
  };
}

export function video(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: lang === "ro" ? "Radial Cons — prezentarea atelierului" : "Radial Cons — workshop presentation",
    description:
      lang === "ro"
        ? "Prezentare animată: mobilier și vetre de foc, structuri metalice, producție la comandă și tehnologie laser și CNC."
        : "Animated presentation: furniture and firepits, steel structures, custom manufacturing and laser & CNC technology.",
    thumbnailUrl: abs(`/media/scene/intro-${lang}.webp`),
    contentUrl: abs(`/media/radial-cons-prezentare-${lang}.mp4`),
    uploadDate: "2026-10-20",
    duration: "PT36S",
    publisher: { "@id": ORG_ID },
    inLanguage: LOCALE[lang],
  };
}
