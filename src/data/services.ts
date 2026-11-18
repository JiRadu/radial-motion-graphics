import type { Lang } from "../i18n/ui";
import type { DrawingKey } from "../components/drawings";

type L<T> = Record<Lang, T>;

export interface Service {
  id: string;
  slug: L<string>;
  drawing: DrawingKey;
  /** Short label used in filters and cards. */
  short: L<string>;
  eyebrow: L<string>;
  title: L<string>;
  summary: L<string>;
  seoTitle: L<string>;
  seoDescription: L<string>;
  intro: L<string[]>;
  offer: L<{ title: string; text: string }[]>;
  forWhom: L<string>;
  faq: L<{ q: string; a: string }[]>;
  secondary?: boolean;
}

/** The four lines, in the order of the video presentation, then wrought iron (secondary). */
export const SERVICES: Service[] = [
  {
    id: "furniture",
    slug: { ro: "mobilier-si-vetre-de-foc", en: "furniture-and-firepits" },
    drawing: "firepit",
    short: { ro: "Mobilier și vetre de foc", en: "Furniture & firepits" },
    eyebrow: { ro: "Pentru casă și grădină", en: "Indoor & outdoor living" },
    title: {
      ro: "Mobilier și vetre de foc făcute să dureze.",
      en: "Furniture and firepits built to last.",
    },
    summary: {
      ro: "Mese, bănci, scaune de bar, rafturi și vetre de foc decupate laser, din inox, oțel carbon sau corten. Piese pe măsură pentru case, terase și HoReCa.",
      en: "Tables, benches, bar stools, shelving and laser-cut firepits in stainless, carbon or corten steel. Made-to-measure pieces for homes, terraces and hospitality.",
    },
    seoTitle: {
      ro: "Mobilier metalic la comandă și vetre de foc din corten și inox | Radial Cons",
      en: "Custom metal furniture & corten firepits | Radial Cons, Romania",
    },
    seoDescription: {
      ro: "Mobilier din inox și aluminiu la comandă, scaune de bar inox, mobilier HoReCa și vetre de foc decupate laser din corten. Lucrat și finisat în atelierul nostru din Târgoviște.",
      en: "Made-to-order stainless and aluminium furniture, bar stools, hospitality furniture and laser-cut corten firepits. Fabricated and finished in our workshop in Târgoviște, Romania.",
    },
    intro: {
      ro: [
        "O piesă de mobilier din metal trebuie să arate bine din orice unghi și să reziste ani la rând. De aceea o desenăm cu atenție la proporții, o sudăm curat și o finisăm până la ultimul colț.",
        "Lucrăm pentru case și grădini, pentru terase și restaurante, și împreună cu designeri de interior care au nevoie de un executant precis.",
      ],
      en: [
        "A metal furniture piece has to look right from every angle and hold up for years. So we draw it with care for proportion, weld it clean and finish it down to the last corner.",
        "We work for homes and gardens, terraces and restaurants, and alongside interior designers who need a precise maker.",
      ],
    },
    offer: {
      ro: [
        { title: "Mobilier de interior și exterior", text: "Mese, bănci, scaune, scaune de bar, rafturi și cadre — pe dimensiunile spațiului tău." },
        { title: "Vetre și boluri de foc", text: "Modele decupate cu laser, din corten, oțel carbon sau inox. Fiecare model poate fi personalizat." },
        { title: "Accesorii pentru mobilier", text: "Picioare, baze de masă, console și feronerie la comandă, pentru producători și tâmplari." },
        { title: "Piese decorative și signalistică", text: "Litere, panouri și obiecte cu finisaj oglindă sau periat." },
      ],
      en: [
        { title: "Indoor & outdoor furniture", text: "Tables, benches, chairs, bar stools, shelving and frames — sized to your space." },
        { title: "Firepits & fire bowls", text: "Laser-cut patterns in corten, carbon or stainless steel. Every pattern can be customised." },
        { title: "Furniture hardware", text: "Legs, table bases, brackets and custom hardware for furniture makers and joiners." },
        { title: "Decorative pieces & signage", text: "Letters, panels and objects with a mirror or brushed finish." },
      ],
    },
    forWhom: {
      ro: "Case și grădini, terase, restaurante și cafenele (HoReCa), designeri de interior, producători de mobilier.",
      en: "Homes and gardens, terraces, restaurants and cafés, interior designers, furniture manufacturers.",
    },
    faq: {
      ro: [
        { q: "Puteți face o piesă după o poză de inspirație?", a: "Da. Ne trimiți poza și dimensiunile aproximative, iar noi propunem materialul, finisajul și desenul de execuție." },
        { q: "Ce material recomandați pentru exterior?", a: "Pentru exterior folosim de regulă inox, aluminiu sau oțel corten, care își formează singur stratul protector de rugină. Oțelul carbon se poate folosi vopsit." },
      ],
      en: [
        { q: "Can you make a piece from an inspiration photo?", a: "Yes. Send the photo and rough dimensions, and we propose the material, finish and a fabrication drawing." },
        { q: "Which material do you recommend outdoors?", a: "Outdoors we usually use stainless steel, aluminium or corten steel, which forms its own protective patina. Carbon steel works when it's painted." },
      ],
    },
  },
  {
    id: "structures",
    slug: { ro: "structuri-metalice", en: "steel-structures" },
    drawing: "hall",
    short: { ro: "Structuri metalice", en: "Steel structures" },
    eyebrow: { ro: "Proiecte industriale", en: "Industrial projects" },
    title: { ro: "Structuri metalice de mari dimensiuni.", en: "Large-scale steel structures." },
    summary: {
      ro: "Hale și depozite industriale, structuri pentru panouri fotovoltaice, copertine și sere. Fabricate în atelier, livrate și montate.",
      en: "Industrial halls and warehouses, photovoltaic mounting structures, canopies and greenhouses. Fabricated in-house, delivered and installed.",
    },
    seoTitle: {
      ro: "Structuri metalice Târgoviște — hale, depozite, structuri fotovoltaice | Radial Cons",
      en: "Steel structures in Romania — halls, warehouses, PV mounting | Radial Cons",
    },
    seoDescription: {
      ro: "Confecții metalice pentru hale industriale, depozite, structuri pentru panouri fotovoltaice, copertine și sere. Atelier propriu în Târgoviște, Dâmbovița, din 1999.",
      en: "Steel fabrication for industrial halls, warehouses, photovoltaic mounting structures, canopies and greenhouses. Own workshop in Târgoviște, Dâmbovița, since 1999.",
    },
    intro: {
      ro: [
        "La structurile mari, precizia din atelier se vede pe șantier: piese care se îmbină din prima, găuri la locul lor, montaj fără improvizații.",
        "Debităm, găurim, sudăm și protejăm fiecare element în atelierul nostru, apoi le livrăm gata de montaj, cu marcaj clar pentru fiecare piesă.",
      ],
      en: [
        "On large structures, workshop precision shows on site: parts that fit first time, holes where they belong, assembly without improvising.",
        "We cut, drill, weld and protect every member in our own workshop, then deliver it ready to erect, with each part clearly marked.",
      ],
    },
    offer: {
      ro: [
        { title: "Hale și depozite industriale", text: "Structuri de rezistență, grinzi, stâlpi și contravântuiri, după proiectul inginerului." },
        { title: "Structuri pentru panouri fotovoltaice", text: "Structuri de montaj pe sol sau pe acoperiș, în serie, cu toleranțe constante." },
        { title: "Copertine și sere", text: "Copertine pentru intrări, parcări și rampe; structuri pentru sere și spații agricole." },
        { title: "Livrare și montaj", text: "Transportul și montajul pot fi incluse în ofertă, în funcție de proiect." },
      ],
      en: [
        { title: "Industrial halls & warehouses", text: "Primary frames, beams, columns and bracing, built to the structural engineer's design." },
        { title: "Photovoltaic mounting structures", text: "Ground- or roof-mounted systems, produced in series with consistent tolerances." },
        { title: "Canopies & greenhouses", text: "Canopies for entrances, car parks and loading bays; frames for greenhouses and farm buildings." },
        { title: "Delivery & installation", text: "Transport and erection can be included in the quote, depending on the project." },
      ],
    },
    forWhom: {
      ro: "Firme de construcții, dezvoltatori, fabrici, ferme și proiecte din agricultură și energie.",
      en: "Construction companies, developers, factories, farms, and agriculture and energy projects.",
    },
    faq: {
      ro: [
        { q: "Lucrați după proiect tehnic?", a: "Da. Structurile mari se execută după proiectul de rezistență. Dacă nu ai încă un proiect, îți spunem ce informații sunt necesare." },
        { q: "Asigurați și montajul?", a: "Putem include livrarea și montajul în ofertă. Spune-ne localitatea și termenul dorit." },
      ],
      en: [
        { q: "Do you work from engineering drawings?", a: "Yes. Large structures are fabricated to the structural design. If you don't have one yet, we'll tell you what's needed." },
        { q: "Do you also install?", a: "We can include delivery and installation in the quote. Tell us the location and your target date." },
      ],
    },
  },
  {
    id: "custom",
    slug: { ro: "productie-la-comanda", en: "custom-manufacturing" },
    drawing: "part",
    short: { ro: "Producție la comandă", en: "Custom manufacturing" },
    eyebrow: { ro: "Producție la comandă", en: "Custom manufacturing" },
    title: { ro: "Tu desenezi. Noi executăm.", en: "Your drawing. Our metal." },
    summary: {
      ro: "Prototipuri, piese unicat și serii mici, direct din fișierul tău DXF sau STEP. Debitate, îndoite, sudate și finisate în același atelier.",
      en: "Prototypes, one-off parts and small batches, straight from your DXF or STEP file. Cut, bent, welded and finished under one roof.",
    },
    seoTitle: {
      ro: "Piese metalice la comandă din DXF / STEP — prototipuri și serii mici | Radial Cons",
      en: "Custom metal parts from DXF / STEP — prototypes & small batches | Radial Cons",
    },
    seoDescription: {
      ro: "Producem prototipuri, piese unicat și serii mici din oțel, inox, aluminiu și corten, direct din fișiere DXF sau STEP. Debitare laser CNC, îndoire, sudură laser, finisaj.",
      en: "We produce prototypes, one-off parts and small batches in steel, stainless, aluminium and corten, straight from DXF or STEP files. CNC laser cutting, bending, laser welding, finishing.",
    },
    intro: {
      ro: [
        "Ai deja desenul? Trimite-ni-l. Verificăm fișierul, îți spunem dacă ceva trebuie ajustat pentru execuție și transformăm desenul în piesa finită.",
        "Pentru ingineri, producători și arhitecți suntem un partener de execuție de încredere: serii mici, repetabile, fără compromisuri la toleranțe.",
      ],
      en: [
        "Already have the drawing? Send it over. We check the file, flag anything that needs adjusting for production, and turn it into the finished part.",
        "For engineers, manufacturers and architects we're a dependable production partner: small, repeatable batches with no compromise on tolerances.",
      ],
    },
    offer: {
      ro: [
        { title: "Prototipuri", text: "Prima piesă, rapid, ca să poți testa forma și montajul înainte de serie." },
        { title: "Piese unicat", text: "Componente speciale, piese de schimb, elemente de design care nu există în catalog." },
        { title: "Serii mici de producție", text: "Zeci sau sute de piese identice, cu aceleași toleranțe de la prima la ultima." },
        { title: "Din fișier, direct în execuție", text: "Acceptăm DXF pentru tablă și STEP pentru piese 3D; și schițe cotate, dacă nu ai CAD." },
      ],
      en: [
        { title: "Prototypes", text: "The first part, quickly, so you can test fit and form before a batch." },
        { title: "One-off parts", text: "Special components, spare parts and design elements you won't find in a catalogue." },
        { title: "Small-batch production", text: "Tens or hundreds of identical parts, with the same tolerances from first to last." },
        { title: "From file to production", text: "We accept DXF for sheet parts and STEP for 3D parts — and dimensioned sketches if you don't use CAD." },
      ],
    },
    forWhom: {
      ro: "Ingineri, producători, designeri, arhitecți și orice firmă care are desene tehnice.",
      en: "Engineers, manufacturers, designers, architects and any company with technical drawings.",
    },
    faq: {
      ro: [
        { q: "Ce fișiere acceptați?", a: "DXF pentru piese din tablă și STEP pentru piese 3D. Putem lucra și după o schiță cotată sau o piesă model." },
        { q: "Faceți și o singură piesă?", a: "Da. Lucrăm atât piese unicat și prototipuri, cât și serii mici." },
      ],
      en: [
        { q: "Which file formats do you accept?", a: "DXF for sheet-metal parts and STEP for 3D parts. We can also work from a dimensioned sketch or a sample part." },
        { q: "Will you make just one part?", a: "Yes. We make one-offs and prototypes as well as small batches." },
      ],
    },
  },
  {
    id: "technology",
    slug: { ro: "tehnologie-debitare-sudura-laser", en: "laser-cutting-welding-technology" },
    drawing: "laser",
    short: { ro: "Tehnologie", en: "Technology" },
    eyebrow: { ro: "Tehnologie de ultimă generație", en: "Latest technology" },
    title: {
      ro: "Precizie la fiecare tăiere, sudură și îndoire.",
      en: "Precision in every cut, weld and bend.",
    },
    summary: {
      ro: "Debitare laser CNC, sudură laser, debitare cu plasmă și îndoire CNC pe abkant. Tehnologia din spatele fiecărei piese pe care o livrăm.",
      en: "CNC laser cutting, laser welding, plasma cutting and CNC press-brake bending. The technology behind every part we deliver.",
    },
    seoTitle: {
      ro: "Debitare laser CNC, sudură laser, plasmă și îndoire CNC în Târgoviște | Radial Cons",
      en: "CNC laser cutting, laser welding, plasma & CNC bending in Romania | Radial Cons",
    },
    seoDescription: {
      ro: "Debitare laser fiber pentru tablă, țeavă și profile, sudură laser pentru oțel, inox și aluminiu, debitare cu plasmă pentru tablă groasă și îndoire CNC. Atelier în Târgoviște.",
      en: "Fiber-laser cutting for sheet, tube and profiles, laser welding for steel, stainless and aluminium, plasma cutting for heavy plate and CNC bending. Workshop in Târgoviște, Romania.",
    },
    intro: {
      ro: [
        "Tehnologia nu e un scop în sine. E motivul pentru care o piesă iese curată, la cotă și la fel de fiecare dată.",
        "Toate procesele sunt în același atelier, așa că o piesă trece de la debitare la îndoire, sudură și finisaj fără să plece din mâinile noastre.",
      ],
      en: [
        "Technology isn't the point in itself. It's the reason a part comes out clean, on dimension and the same every time.",
        "Every process sits in the same workshop, so a part moves from cutting to bending, welding and finishing without leaving our hands.",
      ],
    },
    offer: {
      ro: [
        { title: "Debitare laser CNC", text: "Laser fiber de precizie pentru tablă, țeavă și profile. Contururi fine, margini curate." },
        { title: "Sudură laser", text: "Pentru oțel, inox și aluminiu. Îmbinări curate și rezistente, cu deformări minime." },
        { title: "Debitare cu plasmă", text: "Tăiere rapidă și eficientă a tablei groase, pentru piese de structură." },
        { title: "Îndoire CNC pe abkant", text: "Unghiuri exacte și repetabile, de la prima la ultima piesă din serie." },
      ],
      en: [
        { title: "CNC laser cutting", text: "Precision fiber laser for sheet, tube and profiles. Fine contours, clean edges." },
        { title: "Laser welding", text: "For steel, stainless and aluminium. Clean, strong seams with minimal distortion." },
        { title: "Plasma cutting", text: "Fast, efficient cutting of heavy plate for structural parts." },
        { title: "CNC press-brake bending", text: "Exact, repeatable angles from the first part in a batch to the last." },
      ],
    },
    forWhom: {
      ro: "Tuturor clienților noștri — și producătorilor care au nevoie doar de debitare, îndoire sau sudură.",
      en: "All our clients — and manufacturers who only need cutting, bending or welding.",
    },
    faq: {
      ro: [
        { q: "Pot comanda doar debitare laser?", a: "Da. Ne trimiți fișierul DXF, materialul și grosimea, iar noi îți facem oferta pentru debitare." },
        { q: "Ce avantaje are sudura laser?", a: "Îmbinări mai curate și mai înguste, cu deformări termice minime — important la inox și la piesele vizibile." },
      ],
      en: [
        { q: "Can I order laser cutting only?", a: "Yes. Send the DXF file, material and thickness, and we'll quote the cutting." },
        { q: "What's the advantage of laser welding?", a: "Cleaner, narrower seams with minimal heat distortion — which matters on stainless and visible parts." },
      ],
    },
  },
  {
    id: "wrought",
    slug: { ro: "fier-forjat-porti-balustrade", en: "wrought-iron-gates-railings" },
    drawing: "railing",
    secondary: true,
    short: { ro: "Fier forjat", en: "Wrought iron" },
    eyebrow: { ro: "Și tot din atelier", en: "Also from the workshop" },
    title: { ro: "Porți, garduri și balustrade.", en: "Gates, fences and railings." },
    summary: {
      ro: "Porți (inclusiv automate), garduri și balustrade de interior și exterior, din fier forjat, oțel sau inox.",
      en: "Gates (including automated), fences and indoor or outdoor railings in wrought iron, steel or stainless.",
    },
    seoTitle: {
      ro: "Fier forjat Dâmbovița — porți, garduri, balustrade inox | Radial Cons",
      en: "Wrought iron gates, fences & stainless railings | Radial Cons, Romania",
    },
    seoDescription: {
      ro: "Porți din fier forjat, porți automate, garduri și balustrade din inox sau oțel, la comandă. Atelier de confecții metalice în Târgoviște, Dâmbovița.",
      en: "Made-to-order wrought iron gates, automated gates, fences and stainless or steel railings. Metal fabrication workshop in Târgoviște, Dâmbovița, Romania.",
    },
    intro: {
      ro: [
        "Fierul forjat nu conduce comunicarea noastră, dar rămâne o meserie pe care o facem cu aceeași grijă la detaliu ca orice altă piesă.",
        "O poartă sau o balustradă este primul lucru pe care îl vede cineva când ajunge la tine. Merită să fie dreaptă, solidă și frumos finisată.",
      ],
      en: [
        "Wrought iron isn't what we lead with, but it's a craft we practise with the same care for detail as every other piece.",
        "A gate or a railing is the first thing anyone sees when they arrive. It deserves to be straight, solid and well finished.",
      ],
    },
    offer: {
      ro: [
        { title: "Porți", text: "Porți batante și culisante, pregătite pentru automatizare." },
        { title: "Garduri", text: "Panouri de gard din fier forjat, oțel sau tablă decupată laser." },
        { title: "Balustrade", text: "Balustrade de interior și exterior, din inox sau oțel vopsit." },
      ],
      en: [
        { title: "Gates", text: "Swing and sliding gates, ready for automation." },
        { title: "Fences", text: "Fence panels in wrought iron, steel or laser-cut sheet." },
        { title: "Railings", text: "Indoor and outdoor railings in stainless or painted steel." },
      ],
    },
    forWhom: {
      ro: "Case, blocuri, birouri și spații comerciale.",
      en: "Houses, apartment buildings, offices and commercial spaces.",
    },
    faq: {
      ro: [
        { q: "Poarta poate fi automatizată?", a: "Da. Pregătim poarta pentru automatizare, iar sistemul de acționare se stabilește la ofertare." },
      ],
      en: [
        { q: "Can the gate be automated?", a: "Yes. We prepare the gate for automation; the drive system is agreed at the quoting stage." },
      ],
    },
  },
];

export const serviceById = (id: string) => SERVICES.find((s) => s.id === id)!;
export const MAIN_SERVICES = SERVICES.filter((s) => !s.secondary);
