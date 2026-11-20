import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background, DrawPath } from "../../components";
import { COLORS, FONTS } from "../../theme";
import { progressBetween } from "../../utils/animation";

/**
 * Gas-pipe vent stacks ("răsuflători") in three lengths: 600, 1000 and 2000 mm.
 * A blueprint motion graphic for the project page (no photos yet): ground line,
 * the three pipes drawing up at true relative scale, the gold goose-neck bends,
 * base plates, dimension lines and, last, the vent arrows at each outlet.
 * Text-free apart from the millimetre dimensions, so it works in every language.
 * Canvas 1080x1350 (4:5, like the website's project photos).
 */
export const RASUFLATORI = {
  width: 1080,
  height: 1350,
  fps: 30,
  durationInFrames: 240,
} as const;

const GROUND = 1150;
const PX_PER_MM = 0.44; // 2000 mm -> 880 px
const PIPES = [
  { mm: 600, x: 250 },
  { mm: 1000, x: 520 },
  { mm: 2000, x: 790 },
];
const HALF = 15; // pipe half-width
const R_OUT = 50; // outer bend radius
const R_IN = 20; // inner bend radius
const LEG = 70; // outlet leg below the bend

/** Outline of a vent stack: straight pipe up, 180° bend to the right, short leg down. */
const pipeOutline = (x: number, topOuter: number) => {
  const yc = topOuter + R_OUT; // bend centre height
  const cx = x - HALF + R_OUT; // bend centre x
  return [
    `M${x - HALF} ${GROUND} V${yc}`,
    `A${R_OUT} ${R_OUT} 0 0 1 ${cx + R_OUT} ${yc}`,
    `V${yc + LEG} H${cx + R_IN}`,
    `V${yc} A${R_IN} ${R_IN} 0 0 0 ${x + HALF} ${yc} V${GROUND}`,
  ].join(" ");
};

/** Just the bend and outlet leg, drawn again in gold on top of the outline. */
const bendPath = (x: number, topOuter: number) => {
  const yc = topOuter + R_OUT;
  const cx = x - HALF + R_OUT;
  return `M${x - HALF} ${yc} A${R_OUT} ${R_OUT} 0 0 1 ${cx + R_OUT} ${yc} V${yc + LEG} H${cx + R_IN} V${yc} A${R_IN} ${R_IN} 0 0 0 ${x + HALF} ${yc}`;
};

export const Rasuflatori: React.FC = () => {
  const frame = useCurrentFrame();
  const ground = progressBetween(frame, 0, 28);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Background sparks={10} seed="rasuflatori" gridOpacity={0.28} />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1350"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Ground line with soil hatching */}
        <DrawPath
          d={`M70 ${GROUND} H1010`}
          progress={ground}
          color={COLORS.steel}
          width={3}
        />
        <DrawPath
          d={Array.from(
            { length: 24 },
            (_, i) => `M${90 + i * 38} ${GROUND + 6} l-22 26`,
          ).join(" ")}
          progress={progressBetween(frame, 10, 40)}
          color={COLORS.line}
          width={2}
        />

        {PIPES.map(({ mm, x }, i) => {
          const len = mm * PX_PER_MM;
          const topOuter = GROUND - len;
          const start = 18 + i * 14;
          const pipe = progressBetween(frame, start, start + 60);
          const bend = progressBetween(frame, start + 50, start + 80);
          const plate = progressBetween(frame, start, start + 20);
          const dim = progressBetween(frame, 112 + i * 12, 140 + i * 12);
          const label = interpolate(
            frame,
            [128 + i * 12, 146 + i * 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const vent = progressBetween(frame, 160 + i * 8, 190 + i * 8);
          const dimX = x - 62;
          const outletX = x - HALF + R_OUT + (R_IN + R_OUT) / 2;
          const outletY = topOuter + R_OUT + LEG;
          return (
            <g key={mm}>
              {/* Base plate */}
              <DrawPath
                d={`M${x - 46} ${GROUND} V${GROUND - 12} H${x + 46} V${GROUND}`}
                progress={plate}
                color={COLORS.steel}
                width={3}
              />
              {/* Pipe outline, then the bend again in gold */}
              <DrawPath
                d={pipeOutline(x, topOuter)}
                progress={pipe}
                color={COLORS.steel}
                width={4}
              />
              <DrawPath
                d={bendPath(x, topOuter)}
                progress={bend}
                color={COLORS.accent}
                width={4.5}
                glow={bend > 0.98}
              />
              {/* Dimension line: ground to the top of the bend */}
              <DrawPath
                d={`M${dimX} ${GROUND} V${topOuter} M${dimX - 10} ${GROUND} H${dimX + 10} M${dimX - 10} ${topOuter} H${dimX + 10}`}
                progress={dim}
                color={COLORS.bronze}
                width={2}
              />
              <text
                x={dimX - 16}
                y={topOuter + len / 2}
                transform={`rotate(-90 ${dimX - 16} ${topOuter + len / 2})`}
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
              {/* Vent arrows at the outlet */}
              <DrawPath
                d={`M${outletX} ${outletY + 14} V${outletY + 58} M${outletX - 12} ${outletY + 44} L${outletX} ${outletY + 58} L${outletX + 12} ${outletY + 44}`}
                progress={vent}
                color={COLORS.accentSoft}
                width={2.5}
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
