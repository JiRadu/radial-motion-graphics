import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Fonts load once at module level; Remotion delays rendering until they are ready.
// "latin-ext" is required for Romanian diacritics (ă â î ș ț).
const display = loadOswald("normal", {
  weights: ["500", "700"],
  subsets: ["latin", "latin-ext"],
});
const body = loadInter("normal", {
  weights: ["400", "600"],
  subsets: ["latin", "latin-ext"],
});

export const FONTS = {
  display: display.fontFamily,
  body: body.fontFamily,
} as const;

export const COLORS = {
  bg: "#0B0D10",
  panel: "#14181D",
  panelLight: "#1C2228",
  line: "#2A313A",
  steel: "#9AA4AF",
  text: "#F4F6F8",
  accent: "#FF6A1A", // molten orange
  accentSoft: "#FFB347",
  laser: "#4FC3F7", // laser cyan
  solar: "#14324F",
} as const;
