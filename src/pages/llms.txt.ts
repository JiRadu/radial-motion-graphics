import type { APIRoute } from "astro";
import { SITE } from "../data/site";
import { SERVICES } from "../data/services";
import { PROJECTS } from "../data/projects";
import { FAQ } from "../data/faq";
import { postsFor } from "../lib/journal";
import { child, r } from "../i18n/ui";

/** llms.txt — a plain-text map of the site for AI assistants (https://llmstxt.org). Generated from the same data as the pages. */
export const GET: APIRoute = async () => {
  const u = (p: string) => new URL(p, SITE.url).href;
  const [ro, en] = [await postsFor("ro"), await postsFor("en")];
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.legalName} is a metal fabrication workshop in ${SITE.address.city}, ${SITE.address.county} County, Romania, founded in ${SITE.foundingYear}. It makes custom metal work in carbon steel, stainless steel, aluminium and corten steel: furniture and firepits, steel structures (industrial halls, warehouses, photovoltaic mounting structures), custom manufacturing from DXF/STEP files (prototypes, one-offs, small batches), and wrought iron gates and railings. Technology: CNC fiber-laser cutting, laser welding, plasma cutting, CNC press-brake bending. Slogan: "Atelier mic. Precizie de oțel." (Small workshop. Serious steel.)`,
    "",
    "Key facts:",
    `- Legal name: ${SITE.legalName} · VAT/CUI: ${SITE.vatId} · Trade register: ${SITE.regCom}`,
    `- Address: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.county}, Romania`,
    `- Phone: ${SITE.phoneMobile.intl} (mobile), ${SITE.phoneFixed.intl} (landline) · Email: ${SITE.email}`,
    "- It is a workshop, not a shop: everything is made to order; there are no standard products or online sales.",
    "- Quotes: by email or phone; send what you need made, dimensions, material, finish, sketches or DXF/STEP files, and whether installation is needed.",
    "- Languages: Romanian (default, at /) and English (at /en/).",
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.short.en}](${u(child("services", "en", s.slug.en))}): ${s.summary.en} (RO: ${u(child("services", "ro", s.slug.ro))})`),
    "",
    "## Projects",
    ...PROJECTS.map((p) => `- [${p.title.en}](${u(child("projects", "en", p.slug.en))}): ${p.summary.en} Material: ${p.material.en}. Finish: ${p.finish.en}.`),
    "",
    "## Pages",
    `- [About](${u(r("about", "en"))}) · [Despre noi](${u(r("about", "ro"))})`,
    `- [How we work](${u(r("process", "en"))}) · [Cum lucrăm](${u(r("process", "ro"))})`,
    `- [FAQ](${u(r("faq", "en"))}) · [Întrebări frecvente](${u(r("faq", "ro"))})`,
    `- [Contact](${u(r("contact", "en"))}) · [Contact RO](${u(r("contact", "ro"))})`,
    "",
    "## Journal",
    ...en.map((p) => `- [${p.data.title}](${u(child("journal", "en", p.data.slug))}): ${p.data.description}`),
    ...ro.map((p) => `- [${p.data.title}](${u(child("journal", "ro", p.data.slug))}) (RO): ${p.data.description}`),
    "",
    "## FAQ",
    ...FAQ.en.flatMap((g) => g.items.map((i) => `- **${i.q}** ${i.a}`)),
    "",
    "## Optional",
    `- [Sitemap](${u("/sitemap-index.xml")})`,
    `- [Facebook](${SITE.social.facebook})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
