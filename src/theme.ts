import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

/**
 * Radial Cons brand tokens (brandbook: github.com/JiRadu/radial-brandbook,
 * tokens.json / 00-brandbook.md §6–§9).
 *
 * Fonts load once at module level; Remotion delays rendering until they are ready.
 * "latin-ext" is required for Romanian diacritics (ă â î ș ț).
 */
const display = loadPlayfair("normal", {
  weights: ["600", "700"],
  subsets: ["latin", "latin-ext"],
});
const body = loadMontserrat("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
});

export const FONTS = {
  /** Titles: Playfair Display Bold, sentence case. */
  display: display.fontFamily,
  /** Body, labels, buttons: Montserrat Regular / SemiBold. */
  body: body.fontFamily,
} as const;

export const COLORS = {
  /** Negru Atelier — the brand background on screen. */
  bg: "#121110",
  /** Grafit — cards, bands. */
  panel: "#23201D",
  panelLight: "#2E2A26",
  /** Hairline on dark. */
  line: "#3A3530",
  /** Oțel — secondary text and icons on dark. */
  steel: "#A9AEB3",
  /** Titles on dark. */
  text: "#FFFFFF",
  /** Body text on dark (warm white). */
  ink: "#F5F1EA",
  /** Auriu Radial — accents, lines, highlights. */
  accent: "#F0A038",
  /** Lighter gold for sparks and flame cores only. */
  accentSoft: "#F6C27A",
  /** Bronz — logo rays, graphic elements (text only from 24 px up). */
  bronze: "#B8712A",
  bronzeDark: "#8A5220",
  /** Crem — used here for laser beams and technical-drawing lines. */
  cream: "#F8F4E8",
  laser: "#F8F4E8",
  /** Solar panel cells: warm graphite instead of off-brand blue. */
  solar: "#1C1A18",
} as const;

/** Brandbook gradient: logo and large decorative elements only. */
export const BRAND_GRADIENT = ["#E8A13E", "#B8712A"] as const;

/** Uppercase labels: Montserrat SemiBold, +18% tracking. */
export const LABEL_TRACKING = "0.18em";
