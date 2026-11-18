/**
 * Blueprint-style line drawings used where photos are not available yet.
 * Each stroke is drawn on once when it scrolls into view (CSS only, see global.css),
 * echoing the draw-on icons of the Radial Cons motion-graphics video.
 *
 * kind: "line" = main stroke (bronze) · "accent" = gold highlight · "dim" = thin steel dimension line
 */
type Stroke = { d: string; kind?: "line" | "accent" | "dim" };
export interface Drawing {
  viewBox: string;
  strokes: Stroke[];
}

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`;
const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy} A${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;

export const DRAWINGS = {
  stool: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: ellipse(200, 100, 72, 18) },
      { d: "M128 100 V114 A72 18 0 0 0 272 114 V100" },
      { d: "M192 132 V318 M208 132 V318" },
      { d: ellipse(200, 250, 58, 13) },
      { d: ellipse(200, 332, 82, 16) },
      { d: "M150 92 Q186 84 222 88", kind: "accent" },
      { d: "M214 160 V300", kind: "accent" },
      { d: "M96 100 V332 M88 100 H104 M88 332 H104", kind: "dim" },
      { d: "M118 370 H282 M118 362 V378 M282 362 V378", kind: "dim" },
    ],
  },
  firepit: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: ellipse(200, 178, 112, 22) },
      { d: "M92 184 Q108 280 200 284 Q292 280 308 184" },
      { d: circle(150, 224, 9), kind: "accent" },
      { d: circle(200, 238, 11), kind: "accent" },
      { d: circle(250, 224, 9), kind: "accent" },
      { d: "M118 210 L130 228 L112 232 Z M282 210 L270 228 L288 232 Z", kind: "accent" },
      { d: "M172 254 L186 262 L172 270 Z M228 254 L214 262 L228 270 Z", kind: "accent" },
      { d: "M140 274 L118 350 M260 274 L282 350 M200 286 V356" },
      { d: "M100 350 H136 M264 350 H300 M184 356 H216" },
      { d: "M176 172 C168 146 190 136 184 104 C206 128 210 146 204 172", kind: "accent" },
      { d: "M204 172 C204 140 230 128 226 92 C246 120 246 150 236 172", kind: "accent" },
      { d: "M84 120 H316 M84 112 V128 M316 112 V128", kind: "dim" },
    ],
  },
  table: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: "M70 130 H330 V146 H70 Z" },
      { d: "M120 146 L270 330 M280 146 L130 330" },
      { d: "M100 330 H160 M240 330 H300" },
      { d: "M110 146 H290", kind: "accent" },
      { d: "M168 238 H232", kind: "accent" },
      { d: "M70 100 H330 M70 92 V108 M330 92 V108", kind: "dim" },
      { d: "M352 146 V330 M344 146 H360 M344 330 H360", kind: "dim" },
    ],
  },
  hall: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: "M30 330 H370" },
      { d: "M70 330 V180 M290 330 V180" },
      { d: "M70 180 L180 110 L290 180", kind: "accent" },
      { d: "M70 180 H290" },
      { d: "M98 180 L125 163 L152 180 L180 140 L208 180 L235 163 L262 180" },
      { d: "M70 180 L130 150 M180 110 L240 80 M290 180 L350 150 L240 80" },
      { d: "M350 150 V300 M290 330 L350 300" },
      { d: "M290 250 L350 225 M290 220 L350 300", kind: "dim" },
      { d: "M40 180 V330 M32 180 H48 M32 330 H48", kind: "dim" },
    ],
  },
  solar: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: "M40 310 H360" },
      { d: "M60 220 L120 130 H340 L280 220 Z" },
      { d: "M115 220 L170 130 M170 220 L225 130 M225 220 L280 130 M90 175 H310" },
      { d: "M90 220 V310 M270 220 V310 M140 140 V310 M320 140 V310" },
      { d: "M90 270 L140 240 M270 270 L320 240", kind: "dim" },
      { d: circle(330, 70, 16), kind: "accent" },
      { d: "M330 36 V46 M330 94 V104 M296 70 H306 M354 70 H364 M306 46 L313 53 M347 87 L354 94 M354 46 L347 53 M313 87 L306 94", kind: "accent" },
    ],
  },
  part: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: "M110 110 H300 Q320 110 320 130 V180 Q320 200 300 200 H200 V310 Q200 330 180 330 H130 Q110 330 110 310 Z" },
      { d: circle(250, 155, 11), kind: "accent" },
      { d: circle(285, 155, 11), kind: "accent" },
      { d: circle(155, 205, 16), kind: "accent" },
      { d: circle(155, 285, 11), kind: "accent" },
      { d: "M110 80 H320 M110 72 V88 M320 72 V88", kind: "dim" },
      { d: "M80 110 V330 M72 110 H88 M72 330 H88", kind: "dim" },
      { d: "M230 250 H330 M230 290 H300", kind: "dim" },
    ],
  },
  railing: {
    viewBox: "0 0 400 400",
    strokes: [
      { d: "M40 340 H100 V310 H160 V280 H220 V250 H280 V220 H340 V190 H370" },
      { d: "M70 230 L350 90", kind: "accent" },
      { d: "M70 340 V230 M190 280 V170 M310 220 V110" },
      { d: "M70 270 L310 150 M70 300 L310 180" },
      { d: "M130 340 V200 M250 280 V140", kind: "dim" },
    ],
  },
  laser: {
    viewBox: "0 0 200 200",
    strokes: [
      { d: "M70 14 H130 V44 H70 Z" },
      { d: "M100 44 V112", kind: "accent" },
      { d: "M18 118 H182 V168 H18 Z" },
      { d: "M52 118 V140 A16 16 0 0 0 84 140 V118", kind: "accent" },
      { d: circle(128, 143, 13), kind: "accent" },
    ],
  },
  weld: {
    viewBox: "0 0 200 200",
    strokes: [
      { d: "M14 116 H96 V160 H14 Z" },
      { d: "M104 116 H186 V160 H104 Z" },
      { d: "M84 18 L116 18 L108 70 L92 70 Z" },
      { d: "M100 70 V112", kind: "accent" },
      { d: "M100 116 V160", kind: "accent" },
    ],
  },
  plasma: {
    viewBox: "0 0 200 200",
    strokes: [
      { d: "M78 14 H122 L110 58 H90 Z" },
      { d: "M100 58 C84 82 116 104 100 128", kind: "accent" },
      { d: "M20 128 H180 V180 H20 Z" },
      { d: "M100 128 V180", kind: "accent" },
    ],
  },
  bend: {
    viewBox: "0 0 200 200",
    strokes: [
      { d: "M88 30 V76 L100 92 L112 76 V30 Z" },
      { d: "M14 96 L100 128 L186 96", kind: "accent" },
      { d: "M60 150 L100 128 L140 150 V180 H60 Z" },
    ],
  },
} satisfies Record<string, Drawing>;

export type DrawingKey = keyof typeof DRAWINGS;
