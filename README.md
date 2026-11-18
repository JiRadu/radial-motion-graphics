# radialcons.ro

Website-ul **Radial Cons SRL**: atelier de confecții metalice din Târgoviște, din 1999.
*Atelier mic. Precizie de oțel.*

Este un site static construit cu [Astro](https://astro.build), cu două limbi: română la `/` și engleză la `/en/`. Nu are bază de date, server sau magazin. Rezultatul build-ului (`dist/`) este HTML simplu și poate fi găzduit oriunde.

## Comenzi

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # generează dist/
npm run preview  # previzualizează dist/
npm run check    # verificare de tipuri
```

## Unde se modifică conținutul

| Ce | Fișier |
| --- | --- |
| Datele firmei (telefon, email, adresă, CUI) | `src/data/site.ts` |
| Servicii (cele 4 linii + fier forjat) | `src/data/services.ts` |
| Lucrări / portofoliu | `src/data/projects.ts` |
| Testimoniale | `src/data/testimonials.ts` ⚠️ **deocamdată mock** |
| Întrebări frecvente | `src/data/faq.ts` |
| Procesul în 4 pași | `src/data/process.ts` |
| Articole de jurnal | `src/content/journal/ro/*.md` și `src/content/journal/en/*.md` |
| Texte de interfață și adrese de pagini | `src/i18n/ui.ts` |
| Culori, fonturi, spațieri | `src/styles/global.css` (din `tokens.css` din brandbook) |

### Înainte de lansare

- **Testimonialele sunt exemple inventate.** Înlocuiește-le cu citate reale, aprobate de clienți. Legislația UE privind practicile comerciale neloiale interzice recenziile false. Ele nu apar în datele structurate (nu există marcaj Review sau AggregateRating).
- **Lucrările** descriu tipuri reale de lucrări, fără nume de clienți și fără cifre inventate. Când ai fotografii, pune-le în `public/media/work/` și completează `photos` în `projects.ts`. Pagina le folosește atunci în locul desenului tehnic.
- Programul de lucru, conturile de Instagram și TikTok și certificările nu sunt pe site, pentru că brandbook-ul le marchează „de completat”.

## Mișcare (motion): ce am ales și de ce

- **Clipul video** este randat din repo-ul `radial-motion-graphics`, în română și engleză, 720p, ~2,6 MB. **Nu pornește singur**: se încarcă doar la click (`preload="none"`), pentru că are sunet și pentru că brandbook-ul exclude animațiile care se mișcă singure. Până atunci, pagina încarcă doar un poster WebP de ~40 KB.
- **Desenele tehnice** (SVG) se desenează o singură dată când intră în ecran, doar din CSS. Nu se repetă în buclă și nu folosesc nicio librărie.
- Cine are activată opțiunea `prefers-reduced-motion` vede totul static. Fără JavaScript, conținutul e complet vizibil.
- Pagina principală are ~240 KB în total. Fonturile sunt găzduite local, deci nu se fac cereri către Google Fonts.

## SEO / GEO / LLM

- Fiecare pagină are titlu și descriere proprii, URL canonic, `hreflang` ro/en/x-default, Open Graph și imagine de distribuire.
- Date structurate JSON-LD: `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Service`, `FAQPage`, `Article`, `CreativeWork` și `VideoObject`.
- `sitemap-index.xml` cu alternative de limbă, `robots.txt` deschis tuturor crawlerelor (inclusiv asistenților AI) și `/llms.txt`, generat automat din aceleași date ca paginile.
- Textele sunt scrise ca afirmații clare, ușor de citat de motoarele de căutare și de asistenții AI.

## Publicare

Orice găzduire statică merge (Netlify, Cloudflare Pages, GitHub Pages, Vercel): comanda de build este `npm run build`, iar folderul publicat este `dist`. Domeniul `radialcons.ro` este setat în `astro.config.mjs`.

## Surse

- Brandbook: `JiRadu/radial-brandbook` (logo, culori, fonturi, voce, structura site-ului).
- Video: `JiRadu/radial-motion-graphics` (compoziția `WorkshopPromo`, randată cu numele și datele de contact Radial Cons).
