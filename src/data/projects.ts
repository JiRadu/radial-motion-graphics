import type { Lang } from "../i18n/ui";
import type { DrawingKey } from "../components/drawings";
import photoManifest from "./photos.json";

type L<T> = Record<Lang, T>;

/**
 * Portfolio entries.
 *
 * These are written from the types of work shown in Radial Cons' posts and in the brandbook
 * (mirror-polished stainless bar stools, laser-cut firepits, halls, PV structures…). They name no
 * clients and contain no invented figures. Real photos: put originals in photos-in/<id>/ and run
 * `npm run photos` — they replace the technical drawing on the card and fill the project gallery.
 */
export interface Photo { src: string; srcSm: string; alt: L<string> }

export interface Project {
  id: string;
  slug: L<string>;
  service: string;
  drawing: DrawingKey;
  year?: number;
  title: L<string>;
  headline: L<string>;
  summary: L<string>;
  setting: L<string>;
  material: L<string>;
  finish: L<string>;
  scope: L<string[]>;
  story: L<string[]>;
  photos?: Photo[];
}

export const PROJECTS: Project[] = [
  {
    id: "bar-stools",
    slug: { ro: "scaune-bar-inox-luciu-oglinda", en: "mirror-polished-stainless-bar-stools" },
    service: "furniture",
    drawing: "stool",
    title: { ro: "Scaune de bar din inox lustruit oglindă", en: "Mirror-polished stainless bar stools" },
    headline: { ro: "Luciu oglindă. Impact pe măsură.", en: "Mirror finish. Matching impact." },
    summary: {
      ro: "Scaune de bar cu bază masivă din inox și șezut tapițat, pentru un restaurant care voia să strălucească.",
      en: "Bar stools with a solid stainless base and upholstered seat, for a restaurant that wanted to shine.",
    },
    setting: { ro: "Restaurant · HoReCa", en: "Restaurant · Hospitality" },
    material: { ro: "Inox", en: "Stainless steel" },
    finish: { ro: "Luciu oglindă", en: "Mirror polish" },
    scope: {
      ro: ["Desen de execuție după schița clientului", "Debitare laser și îndoire", "Sudură și polizare îmbinări", "Lustruire oglindă", "Montaj șezut tapițat"],
      en: ["Fabrication drawing from the client's sketch", "Laser cutting and bending", "Welding and seam grinding", "Mirror polishing", "Fitting the upholstered seat"],
    },
    story: {
      ro: [
        "Clientul avea o idee clară: un bar care să se vadă de la intrare. Scaunele trebuiau să fie stabile, ușor de curățat și să reflecte lumina caldă a localului.",
        "Am ales inoxul pentru rezistență și igienă. După sudură, fiecare îmbinare a fost polizată până nu s-a mai văzut, apoi piesa a fost lustruită oglindă. Toate scaunele din serie au aceleași cote și același finisaj.",
      ],
      en: [
        "The client had a clear idea: a bar you notice from the door. The stools had to be stable, easy to clean and reflect the venue's warm light.",
        "We chose stainless steel for strength and hygiene. After welding, every joint was ground until it disappeared, then each piece was mirror polished. Every stool in the series shares the same dimensions and finish.",
      ],
    },
  },
  {
    id: "firepit",
    slug: { ro: "vatra-de-foc-corten-decupata-laser", en: "laser-cut-corten-firepit" },
    service: "furniture",
    drawing: "firepit",
    title: { ro: "Vatră de foc din corten, decupată laser", en: "Laser-cut corten firepit" },
    headline: { ro: "Foc, lumină și caracter.", en: "Fire, light and character." },
    summary: {
      ro: "Bol de foc pentru grădină, cu model decupat laser care proiectează lumina în jur.",
      en: "A garden fire bowl with a laser-cut pattern that throws light all around it.",
    },
    setting: { ro: "Grădină · Terasă", en: "Garden · Terrace" },
    material: { ro: "Oțel corten", en: "Corten steel" },
    finish: { ro: "Patină naturală", en: "Natural patina" },
    scope: {
      ro: ["Desenarea modelului decorativ", "Debitare laser CNC", "Îndoire și sudură", "Pregătire pentru patinare"],
      en: ["Drawing the decorative pattern", "CNC laser cutting", "Bending and welding", "Preparation for weathering"],
    },
    story: {
      ro: [
        "Vetrele de foc sunt locul unde tehnologia laser se vede cel mai frumos. Modelul decupat lasă lumina să iasă printre forme, iar seara bolul devine felinar.",
        "Corten-ul își formează singur stratul de patină ruginie, care îl protejează și îi dă culoarea caldă. Nu are nevoie de vopsea și arată tot mai bine cu timpul.",
      ],
      en: [
        "Firepits are where laser technology looks its best. The cut-out pattern lets light escape between the shapes, and after dark the bowl becomes a lantern.",
        "Corten forms its own rust-coloured patina, which protects it and gives it a warm tone. It needs no paint and looks better with age.",
      ],
    },
  },
  {
    id: "table-bases",
    slug: { ro: "baze-masa-aluminiu-periat", en: "brushed-aluminium-table-bases" },
    service: "furniture",
    drawing: "table",
    title: { ro: "Baze de masă din aluminiu periat", en: "Brushed aluminium table bases" },
    headline: { ro: "Aluminiu. Precizie. Caracter.", en: "Aluminium. Precision. Character." },
    summary: {
      ro: "Serie de baze de masă pentru un producător de mobilier, lucrate identic, gata de montaj.",
      en: "A series of table bases for a furniture maker, made identical and ready to assemble.",
    },
    setting: { ro: "Producător de mobilier", en: "Furniture manufacturer" },
    material: { ro: "Aluminiu", en: "Aluminium" },
    finish: { ro: "Periat", en: "Brushed" },
    scope: {
      ro: ["Debitare laser", "Sudură laser aluminiu", "Periere uniformă", "Găuri de prindere la cotă"],
      en: ["Laser cutting", "Aluminium laser welding", "Uniform brushing", "Fixing holes on dimension"],
    },
    story: {
      ro: [
        "Un producător de mobilier avea nevoie de baze care să se monteze pe blat fără ajustări. Toleranța conta mai mult decât orice.",
        "Sudura laser ne-a permis îmbinări fine pe aluminiu, cu deformări minime. Perierea uniformă le dă un aspect tehnic, curat, care merge cu lemn, piatră sau sticlă.",
      ],
      en: [
        "A furniture maker needed bases that fit the tops with no adjustment. Tolerance mattered more than anything.",
        "Laser welding gave us fine joints on aluminium with minimal distortion. Uniform brushing gives them a clean, technical look that pairs with wood, stone or glass.",
      ],
    },
  },
  {
    id: "hall",
    slug: { ro: "structura-hala-industriala", en: "industrial-hall-steel-frame" },
    service: "structures",
    drawing: "hall",
    title: { ro: "Structură metalică pentru hală industrială", en: "Steel frame for an industrial hall" },
    headline: { ro: "Solid de la fundație la coamă.", en: "Solid from base to ridge." },
    summary: {
      ro: "Cadre, grinzi și contravântuiri fabricate în atelier și livrate gata de montaj.",
      en: "Frames, beams and bracing fabricated in the workshop and delivered ready to erect.",
    },
    setting: { ro: "Industrie · Depozitare", en: "Industrial · Storage" },
    material: { ro: "Oțel carbon", en: "Carbon steel" },
    finish: { ro: "Protecție anticorozivă", en: "Anti-corrosion coating" },
    scope: {
      ro: ["Execuție după proiectul de rezistență", "Debitare cu plasmă și găurire", "Sudură elemente", "Marcarea pieselor pentru montaj", "Livrare"],
      en: ["Fabrication to the structural design", "Plasma cutting and drilling", "Member welding", "Marking parts for erection", "Delivery"],
    },
    story: {
      ro: [
        "La o hală, fiecare milimetru greșit în atelier devine o oră pierdută pe șantier. De aceea verificăm cotele la fiecare etapă.",
        "Fiecare element pleacă din atelier marcat, cu plăcile de capăt și găurile la locul lor, ca montajul să meargă fără improvizații.",
      ],
      en: [
        "On a hall, every millimetre wrong in the workshop becomes an hour lost on site. That's why we check dimensions at every stage.",
        "Every member leaves the workshop marked, with end plates and holes in place, so erection goes ahead without improvising.",
      ],
    },
  },
  {
    // Real project — photos and text from the Radial Cons carousel "De la cadru la ultimul panou."
    id: "terasa-fotovoltaica",
    slug: { ro: "structura-panouri-fotovoltaice-terasa", en: "rooftop-terrace-solar-panel-structure" },
    service: "structures",
    drawing: "solar",
    title: { ro: "Structură metalică pentru panouri fotovoltaice pe terasă", en: "Steel structure for solar panels on a terrace" },
    headline: { ro: "De la cadru la ultimul panou.", en: "From frame to the last panel." },
    summary: {
      ro: "Structură din țeavă rectangulară vopsită, asamblată direct pe terasă, cu ușă de acces integrată și spațiu util sub panouri. Executată și montată de echipa Radial Cons.",
      en: "A painted rectangular-tube frame assembled right on the terrace, with an integrated access door and usable space under the panels. Fabricated and installed by the Radial Cons team.",
    },
    setting: { ro: "Terasă · Fotovoltaic", en: "Terrace · Solar" },
    material: { ro: "Țeavă rectangulară din oțel", en: "Rectangular steel tube" },
    finish: { ro: "Vopsit, gri antracit", en: "Painted, anthracite grey" },
    scope: {
      ro: ["Proiectarea cadrului pentru terasă", "Debitarea și sudura țevii rectangulare", "Vopsire în gri antracit", "Asamblare pe terasă, cu ușă de acces integrată", "Închiderea laturilor cu tablă cutată", "Montajul ramelor și al panourilor"],
      en: ["Designing the frame for the terrace", "Cutting and welding the rectangular tube", "Anthracite grey paint finish", "Assembly on the terrace, with an integrated access door", "Cladding the sides in corrugated sheet", "Fitting the rails and the panels"],
    },
    story: {
      ro: [
        "Întâi, cadrul de oțel. Țeava rectangulară vopsită a fost asamblată direct pe terasă. Ușa de acces e integrată în cadru, iar spațiul de sub panouri rămâne util.",
        "Apoi, panou cu panou. Laturile se închid cu tablă cutată, în același gri antracit, iar panourile se fixează pe rame, rând cu rând, la unghiul gândit pentru soare.",
        "Ai un acoperiș liber? Proiectăm și executăm structuri pentru panouri fotovoltaice pe terasă, pe acoperiș sau la sol.",
      ],
      en: [
        "First, the steel frame. The painted rectangular tube was assembled right on the terrace. The access door is built into the frame, and the space under the panels stays usable.",
        "Then, panel by panel. The sides are clad in corrugated sheet in the same anthracite grey, and the panels are fixed to the rails row by row, at the angle chosen for the sun.",
        "Got an unused roof? We design and build photovoltaic structures on terraces, roofs or on the ground.",
      ],
    },
  },
  {
    id: "prototype",
    slug: { ro: "prototip-piesa-din-fisier-step", en: "prototype-part-from-step-file" },
    service: "custom",
    drawing: "part",
    title: { ro: "Prototip din fișier STEP, apoi serie mică", en: "Prototype from a STEP file, then a small batch" },
    headline: { ro: "Din viziune, în realitate.", en: "From vision to reality." },
    summary: {
      ro: "Un inginer ne-a trimis fișierul. Am livrat prototipul, apoi seria, cu aceleași cote.",
      en: "An engineer sent us the file. We delivered the prototype, then the batch, to the same dimensions.",
    },
    setting: { ro: "Inginerie · Producție", en: "Engineering · Manufacturing" },
    material: { ro: "Inox", en: "Stainless steel" },
    finish: { ro: "Periat", en: "Brushed" },
    scope: {
      ro: ["Verificarea fișierului pentru execuție", "Prototip", "Ajustări după test", "Serie mică de producție"],
      en: ["File check for manufacturability", "Prototype", "Adjustments after testing", "Small production batch"],
    },
    story: {
      ro: [
        "Primul pas a fost verificarea fișierului: raze de îndoire, ordinea operațiilor, locul sudurilor. Am propus două mici ajustări care simplificau execuția fără să schimbe funcția.",
        "După ce prototipul a trecut testul clientului, am trecut la serie. Fiecare piesă a ieșit identică cu prima.",
      ],
      en: [
        "Step one was checking the file: bend radii, operation sequence, weld locations. We suggested two small changes that simplified production without changing the function.",
        "Once the prototype passed the client's test, we moved to the batch. Every part came out identical to the first.",
      ],
    },
  },
  {
    id: "railing",
    slug: { ro: "balustrada-inox-interior", en: "indoor-stainless-railing" },
    service: "wrought",
    drawing: "railing",
    title: { ro: "Balustradă din inox pentru scară interioară", en: "Stainless railing for an indoor staircase" },
    headline: { ro: "Detaliile fac diferența.", en: "Details make the difference." },
    summary: {
      ro: "Balustradă cu linii simple, măsurată la fața locului și montată fără compromisuri.",
      en: "A railing with simple lines, measured on site and installed without compromise.",
    },
    setting: { ro: "Locuință", en: "Private home" },
    material: { ro: "Inox", en: "Stainless steel" },
    finish: { ro: "Periat", en: "Brushed" },
    scope: {
      ro: ["Măsurători la fața locului", "Desen de execuție", "Debitare, îndoire și sudură", "Finisaj periat", "Montaj"],
      en: ["On-site survey", "Fabrication drawing", "Cutting, bending and welding", "Brushed finish", "Installation"],
    },
    story: {
      ro: [
        "O scară nu are niciodată unghiuri perfecte, așa că am măsurat totul la fața locului și am desenat balustrada după scara reală.",
        "Îmbinările sunt sudate și finisate astfel încât mâna să alunece fără să simtă vreo trecere.",
      ],
      en: [
        "A staircase never has perfect angles, so we measured everything on site and drew the railing to the real stair.",
        "Joints are welded and finished so a hand glides along without feeling any transition.",
      ],
    },
  },
];

// Attach normalised photos produced by `npm run photos` (src/data/photos.json).
type ManifestEntry = { src: string; srcSm: string; alt: L<string> | null };
const manifest = photoManifest as Record<string, ManifestEntry[]>;
for (const p of PROJECTS) {
  const list = manifest[p.id];
  if (list?.length) {
    p.photos = list.map((ph, i) => ({
      src: ph.src,
      srcSm: ph.srcSm,
      alt: ph.alt ?? { ro: `${p.title.ro} — fotografia ${i + 1}`, en: `${p.title.en} — photo ${i + 1}` },
    }));
  }
}

export const projectsByService = (serviceId: string) => PROJECTS.filter((p) => p.service === serviceId);
