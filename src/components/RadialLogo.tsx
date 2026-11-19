import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { progressBetween, SPRINGS, useSpringIn } from "../utils/animation";
import { useSeconds } from "../utils/timing";
import {
  LOGO_R_FILL,
  LOGO_R_PATH,
  LOGO_RAY_GRADIENT,
  LOGO_RAY_WIDTH,
  LOGO_RAYS,
  LOGO_TEXT_GRADIENT,
  LOGO_TEXT_PATH,
  LOGO_VIEWBOX,
} from "./logoData";

const CENTER_RAY = (LOGO_RAYS.length - 1) / 2;
/** Where the "R" sits; the sun is built around it. */
const R_CENTER = { x: 100, y: 100 };
const TEXT_START_X = 116;

/**
 * The official Radial Cons logo, assembled on screen:
 *   1. the sun's rays shoot out from the centre, middle ray first;
 *   2. the gold "R" lands in the middle;
 *   3. the wordmark is revealed left to right;
 *   4. a soft light glint runs across the wordmark.
 * Geometry and colours are the brandbook's, untouched. When `symbolOnly`,
 * only the sun and the "R" are drawn.
 */
export const RadialLogo: React.FC<{
  width: number;
  /** Frames before the first ray starts. */
  delay?: number;
  symbolOnly?: boolean;
  /** Plays the glint across the wordmark once it is revealed. */
  glint?: boolean;
  label?: string;
  /** Unique per instance so SVG ids do not clash between scenes. */
  id: string;
}> = ({ width, delay = 0, symbolOnly = false, glint = true, label, id }) => {
  const frame = useCurrentFrame();
  const s = useSeconds();

  const rayStagger = s(0.035);
  const rayLen = s(0.5);
  const raysDone = delay + CENTER_RAY * rayStagger + rayLen;
  const r = useSpringIn(delay + s(0.25), SPRINGS.snappy);
  const textReveal = progressBetween(
    frame,
    raysDone - s(0.35),
    raysDone + s(0.55),
  );
  const glintStart = raysDone + s(0.55);
  const glintX = interpolate(
    frame,
    [glintStart, glintStart + s(1.1)],
    [TEXT_START_X - 120, LOGO_VIEWBOX.width + 40],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const vbWidth = symbolOnly ? 200 : LOGO_VIEWBOX.width;
  const height = (width / vbWidth) * LOGO_VIEWBOX.height;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vbWidth} ${LOGO_VIEWBOX.height}`}
      role="img"
      aria-label={label}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={`${id}-rg`}
          gradientUnits="userSpaceOnUse"
          x1="170"
          y1="20"
          x2="30"
          y2="180"
        >
          <stop offset="0" stopColor={LOGO_RAY_GRADIENT.from} />
          <stop offset="1" stopColor={LOGO_RAY_GRADIENT.to} />
        </linearGradient>
        <linearGradient
          id={`${id}-tg`}
          gradientUnits="userSpaceOnUse"
          x1={TEXT_START_X}
          y1="0"
          x2="520"
          y2="0"
        >
          <stop offset="0" stopColor={LOGO_TEXT_GRADIENT.from} />
          <stop offset="1" stopColor={LOGO_TEXT_GRADIENT.to} />
        </linearGradient>
        <linearGradient id={`${id}-glint`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={COLORS.cream} stopOpacity={0} />
          <stop offset="0.5" stopColor={COLORS.cream} stopOpacity={0.75} />
          <stop offset="1" stopColor={COLORS.cream} stopOpacity={0} />
        </linearGradient>
        <clipPath id={`${id}-reveal`}>
          <rect
            x={TEXT_START_X - 4}
            y={0}
            width={(LOGO_VIEWBOX.width - TEXT_START_X + 8) * textReveal}
            height={LOGO_VIEWBOX.height}
          />
        </clipPath>
        <clipPath id={`${id}-text`}>
          <path d={LOGO_TEXT_PATH} />
        </clipPath>
      </defs>

      <g stroke={`url(#${id}-rg)`} strokeWidth={LOGO_RAY_WIDTH} fill="none">
        {LOGO_RAYS.map(([x1, y1, x2, y2], i) => {
          const start = delay + Math.abs(i - CENTER_RAY) * rayStagger;
          const p = progressBetween(frame, start, start + rayLen);
          if (p <= 0) {
            return null;
          }
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x1 + (x2 - x1) * p}
              y2={y1 + (y2 - y1) * p}
            />
          );
        })}
      </g>

      <g
        opacity={Math.min(1, r * 1.5)}
        transform={`translate(${R_CENTER.x} ${R_CENTER.y}) scale(${interpolate(r, [0, 1], [0.6, 1])}) translate(${-R_CENTER.x} ${-R_CENTER.y})`}
      >
        <path d={LOGO_R_PATH} fill={LOGO_R_FILL} />
      </g>

      {symbolOnly ? null : (
        <g clipPath={`url(#${id}-reveal)`}>
          <path d={LOGO_TEXT_PATH} fill={`url(#${id}-tg)`} />
          {glint ? (
            <rect
              clipPath={`url(#${id}-text)`}
              x={glintX}
              y={0}
              width={90}
              height={LOGO_VIEWBOX.height}
              fill={`url(#${id}-glint)`}
            />
          ) : null}
        </g>
      )}
    </svg>
  );
};

/**
 * Decorative fragment of the logo's sun (brandbook §9): large, cropped by the
 * frame edge, 10–20% opacity, at most one per scene. Rays grow out from the
 * centre, then breathe very slightly.
 */
export const RadialRays: React.FC<{
  /** Diameter of the full sun, in design pixels. */
  size?: number;
  /** Centre of the sun on the 1920x1080 stage (may be off-canvas). */
  x: number;
  y: number;
  opacity?: number;
  delay?: number;
  id: string;
}> = ({ size = 1400, x, y, opacity = 0.14, delay = 0, id }) => {
  const frame = useCurrentFrame();
  const s = useSeconds();
  // Full circle in the logo's rhythm: 15° apart, alternating long and short.
  const rays = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 * Math.PI) / 180;
    const [inner, outer] = i % 2 === 0 ? [34, 98] : [44, 74];
    return [
      100 + Math.cos(a) * inner,
      100 + Math.sin(a) * inner,
      100 + Math.cos(a) * outer,
      100 + Math.sin(a) * outer,
    ];
  });
  const breathe = 1 + 0.015 * Math.sin((frame / s(1)) * 0.9);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        opacity,
        transform: `scale(${breathe})`,
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient
          id={`${id}-rays`}
          gradientUnits="userSpaceOnUse"
          x1="170"
          y1="20"
          x2="30"
          y2="180"
        >
          <stop offset="0" stopColor={LOGO_RAY_GRADIENT.from} />
          <stop offset="1" stopColor={LOGO_RAY_GRADIENT.to} />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id}-rays)`} strokeWidth={1.4} fill="none">
        {rays.map(([x1, y1, x2, y2], i) => {
          const start = delay + i * s(0.025);
          const p = progressBetween(frame, start, start + s(0.9));
          return p > 0 ? (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x1 + (x2 - x1) * p}
              y2={y1 + (y2 - y1) * p}
            />
          ) : null;
        })}
      </g>
    </svg>
  );
};
