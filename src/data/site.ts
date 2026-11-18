/**
 * Company facts — the single source of truth, taken from the Radial Cons brandbook.
 * Change a value here and it updates everywhere (pages, footer, structured data, llms.txt).
 */
export const SITE = {
  url: "https://radialcons.ro",
  name: "Radial Cons",
  legalName: "RADIAL CONS SRL",
  foundingYear: 1999,
  vatId: "RO11380762",
  regCom: "J15/7/1999",
  euid: "ROONRC.J1999000007155",
  phoneMobile: { display: "0744 704 446", href: "tel:+40744704446", intl: "+40 744 704 446" },
  email: "radialcons@gmail.com",
  address: {
    street: "Calea Câmpulung nr. 121",
    postalCode: "130098",
    city: "Târgoviște",
    county: "Dâmbovița",
    region: "Dâmbovița",
    country: "RO",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Radial+Cons+Calea+C%C3%A2mpulung+121+T%C3%A2rgovi%C8%99te",
  social: {
    facebook: "https://www.facebook.com/radialcons",
  },
  materials: {
    ro: ["oțel carbon", "inox", "aluminiu", "oțel corten"],
    en: ["carbon steel", "stainless steel", "aluminium", "corten steel"],
  },
} as const;

export const yearsActive = () => new Date().getFullYear() - SITE.foundingYear;
