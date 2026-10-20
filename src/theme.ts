import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

// Radial Cons brandbook: titles in Playfair Display, everything else in Montserrat.
// Fonts load once at module level; Remotion delays rendering until they are ready.
// "latin-ext" is required for Romanian diacritics (ă â î ș ț).
const display = loadPlayfair("normal", {
  weights: ["700"],
  subsets: ["latin", "latin-ext"],
});
const body = loadMontserrat("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

export const FONTS = {
  /** Headlines (Playfair Display 700). */
  display: display.fontFamily,
  /** Sub-headings, numbers, labels, buttons (Montserrat 600). */
  heading: body.fontFamily,
  /** Running text (Montserrat 400). */
  body: body.fontFamily,
} as const;

/** Radial Cons palette — see the brandbook (tokens.json). */
export const COLORS = {
  bg: "#121110", // Negru Atelier
  panel: "#23201D", // Grafit
  panelLight: "#2E2A26",
  line: "#3A3530",
  steel: "#A9AEB3", // Oțel
  text: "#F5F1EA",
  accent: "#F0A038", // Auriu Radial
  accentSoft: "#F6C27A", // light gold: sparks, flames, glints
  bronze: "#B8712A", // Bronz (logo rays)
  laser: "#FFE3B3", // warm white-gold beam / blueprint lines
  solar: "#1F2A33", // photovoltaic cells (illustration only)
} as const;

/** Official logo files in public/images (vector redraw of the Radial Cons logo). */
export const LOGO = {
  horizontalColor: "images/radialcons-logo-orizontal-color.svg",
  horizontalWhite: "images/radialcons-logo-orizontal-alb.svg",
  symbolColor: "images/radialcons-simbol-color.svg",
  /** width / height of the horizontal logo's viewBox. */
  horizontalAspect: 520 / 200,
} as const;
