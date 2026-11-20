import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background, DrawPath } from "../../components";
import { COLORS, FONTS } from "../../theme";
import { progressBetween } from "../../utils/animation";

/**
 * Gas-pipe vent stacks ("răsuflători") in three lengths: 600, 1000 and 2000 mm.
 * Blueprint motion graphic for the website project page. Each stack is a straight
 * steel pipe welded onto a saddle of rolled sheet (a half-shell that sits on the gas
 * main), with a cap and a small vent hole at the top. Seen along the gas main: the
 * main's cross-section, the gold saddle hugging it, the pipe rising at true relative
 * scale, the cap, then the dimension lines.
 * Text-free apart from the millimetre dimensions, so it works in every language.
 * Canvas 1080x1350 (4:5, like the website's project photos).
 */
export const RASUFLATORI = {
  width: 1080,
  height: 1350,
  fps: 30,
  durationInFrames: 240,
} as const;

const MAIN_Y = 1130; // centre of the gas main's cross-section
const R_MAIN = 58; // gas main radius = saddle inner radius
const R_SADDLE = 70; // saddle outer radius
const HALF = 17; // vent pipe half-width
const PX_PER_MM = 0.41; // 2000 mm -> 820 px
const PIPES = [
  { mm: 600, x: 250 },
  { mm: 1000, x: 540 },
  { mm: 2000, x: 830 },
];

const pt = (x: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(x + r * Math.cos(a)).toFixed(1)} ${(MAIN_Y + r * Math.sin(a)).toFixed(1)}`;
};

/** Saddle: a band of rolled sheet over the top of the gas main, from 200° to 340°. */
const saddlePath = (x: number) =>
  `M${pt(x, R_SADDLE, 200)} A${R_SADDLE} ${R_SADDLE} 0 0 1 ${pt(x, R_SADDLE, 340)} ` +
  `L${pt(x, R_MAIN, 340)} A${R_MAIN} ${R_MAIN} 0 0 0 ${pt(x, R_MAIN, 200)} Z`;

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`;

export const Rasuflatori: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = progressBetween(frame, 195, 215);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Background sparks={10} seed="rasuflatori" gridOpacity={0.28} />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1350"
        style={{ position: "absolute", inset: 0 }}
      >
        {PIPES.map(({ mm, x }, i) => {
          const len = mm * PX_PER_MM;
          // Where the pipe wall meets the saddle's outer curve.
          const base = MAIN_Y - Math.sqrt(R_SADDLE ** 2 - HALF ** 2);
          const top = base - len;
          const main = progressBetween(frame, i * 6, 30 + i * 6);
          const saddle = progressBetween(frame, 22 + i * 6, 52 + i * 6);
          const pipeStart = 45 + i * 12;
          const pipe = progressBetween(frame, pipeStart, pipeStart + 55);
          const cap = progressBetween(frame, pipeStart + 52, pipeStart + 68);
          const dim = progressBetween(frame, 120 + i * 12, 148 + i * 12);
          const label = interpolate(
            frame,
            [136 + i * 12, 154 + i * 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const dimX = x - 64;
          return (
            <g key={mm}>
              {/* Gas main, seen end-on, with its centre marks */}
              <DrawPath
                d={circle(x, MAIN_Y, R_MAIN)}
                progress={main}
                color={COLORS.bronze}
                width={2}
              />
              <DrawPath
                d={`M${x - 14} ${MAIN_Y} H${x + 14} M${x} ${MAIN_Y - 14} V${MAIN_Y + 14}`}
                progress={main}
                color={COLORS.line}
                width={1.5}
              />
              {/* Rolled-sheet saddle */}
              <DrawPath
                d={saddlePath(x)}
                progress={saddle}
                color={COLORS.accent}
                width={4}
                glow={settle > 0.5}
              />
              {/* Vent pipe walls */}
              <DrawPath
                d={`M${x - HALF} ${base} V${top} M${x + HALF} ${base} V${top}`}
                progress={pipe}
                color={COLORS.steel}
                width={4}
              />
              {/* Cap with the vent hole */}
              <DrawPath
                d={`M${x - HALF} ${top} A${HALF} 5 0 1 0 ${x + HALF} ${top} A${HALF} 5 0 1 0 ${x - HALF} ${top}`}
                progress={cap}
                color={COLORS.accent}
                width={4}
                glow={settle > 0.5}
              />
              <circle
                cx={x}
                cy={top}
                r={2.6}
                fill={COLORS.accentSoft}
                opacity={cap}
              />
              {/* Dimension line: saddle to the top of the pipe */}
              <DrawPath
                d={`M${dimX} ${base} V${top} M${dimX - 10} ${base} H${dimX + 10} M${dimX - 10} ${top} H${dimX + 10}`}
                progress={dim}
                color={COLORS.bronze}
                width={2}
              />
              <text
                x={dimX - 16}
                y={top + len / 2}
                transform={`rotate(-90 ${dimX - 16} ${top + len / 2})`}
                textAnchor="middle"
                fill={COLORS.accentSoft}
                opacity={label}
                style={{
                  fontFamily: FONTS.body,
                  fontWeight: 600,
                  fontSize: 30,
                  letterSpacing: "0.04em",
                }}
              >
                {mm} mm
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
