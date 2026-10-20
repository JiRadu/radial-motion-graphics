import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  AnimatedTitle,
  Background,
  DrawPath,
  Eyebrow,
  FadeUp,
  Sfx,
  Stage,
} from "../../../components";
import { COLORS, FONTS } from "../../../theme";
import {
  countUp,
  SPRINGS,
  springAt,
  useProgress,
  useSpringIn,
} from "../../../utils/animation";
import { useTimelineFps } from "../../../utils/speed";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

const BRACKET =
  "M140 100 H500 A40 40 0 0 1 540 140 V180 A40 40 0 0 1 500 220 H300 V400 " +
  "A40 40 0 0 1 260 440 H140 A40 40 0 0 1 100 400 V140 A40 40 0 0 1 140 100 Z";

const HOLES = [
  { cx: 460, cy: 160, r: 20 },
  { cx: 380, cy: 160, r: 20 },
  { cx: 200, cy: 270, r: 34 },
  { cx: 200, cy: 380, r: 20 },
];

const dimText: React.CSSProperties = {
  fontFamily: FONTS.body,
  fontWeight: 600,
  fontSize: 22,
  fill: COLORS.laser,
};

/** Blueprint of a bracket that draws itself, gets dimensioned, then turns to steel. */
const Blueprint: React.FC<{ stamp: string }> = ({ stamp: stampText }) => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  const s = useSeconds();

  const outline = useProgress(s(0.4), s(1.7));
  const dims = useProgress(s(1.6), s(2.5));
  const metal = useProgress(s(2.8), s(3.7));
  const stamp = useSpringIn(s(3.5), SPRINGS.bouncy);

  return (
    <div
      style={{
        width: 760,
        height: 640,
        background: "#0D1F2E",
        border: `2px solid ${COLORS.laser}55`,
        backgroundImage: `linear-gradient(${COLORS.laser}18 1px, transparent 1px), linear-gradient(90deg, ${COLORS.laser}18 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        position: "relative",
      }}
    >
      <svg
        width={760}
        height={640}
        viewBox="0 0 640 540"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5C6670" />
            <stop offset="50%" stopColor="#C7CED6" />
            <stop offset="100%" stopColor="#6B757F" />
          </linearGradient>
          <mask id="holes">
            <rect width={640} height={540} fill="white" />
            {HOLES.map((h) => (
              <circle key={h.cx + h.cy} {...h} fill="black" />
            ))}
          </mask>
        </defs>

        <path
          d={BRACKET}
          fill="url(#steel)"
          opacity={metal}
          mask="url(#holes)"
        />
        <DrawPath
          d={BRACKET}
          progress={outline}
          color={metal > 0.5 ? COLORS.text : COLORS.laser}
          width={4}
          glow={metal < 0.5}
        />
        {HOLES.map((h, i) => {
          const p = springAt(frame, fps, s(1.3) + i * 3, SPRINGS.snappy);
          return (
            <circle
              key={i}
              cx={h.cx}
              cy={h.cy}
              r={h.r * p}
              fill="none"
              stroke={COLORS.laser}
              strokeWidth={3}
            />
          );
        })}

        <g opacity={interpolate(metal, [0, 1], [1, 0.55])}>
          <DrawPath
            d="M100 60 H540"
            progress={dims}
            color={COLORS.laser}
            width={2}
          />
          <DrawPath
            d="M100 48 V72 M540 48 V72"
            progress={dims}
            color={COLORS.laser}
            width={2}
          />
          <DrawPath
            d="M60 100 V440"
            progress={dims}
            color={COLORS.laser}
            width={2}
          />
          <DrawPath
            d="M48 100 H72 M48 440 H72"
            progress={dims}
            color={COLORS.laser}
            width={2}
          />
          <text
            x={320}
            y={44}
            textAnchor="middle"
            style={dimText}
            opacity={dims}
          >
            {countUp(dims, 440)} mm
          </text>
          <text
            x={40}
            y={270}
            textAnchor="middle"
            style={dimText}
            opacity={dims}
            transform="rotate(-90 40 270)"
          >
            {countUp(dims, 340)} mm
          </text>
          <text x={372} y={330} style={dimText} opacity={dims}>
            t = {countUp(dims, 6)} mm
          </text>
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 40,
          padding: "14px 26px",
          border: `4px solid ${COLORS.accent}`,
          color: COLORS.accent,
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: stamp,
          transform: `rotate(-8deg) scale(${interpolate(stamp, [0, 1], [1.8, 1])})`,
        }}
      >
        {stampText}
      </div>
    </div>
  );
};

export const CustomScene: React.FC<{ copy: Copy["custom"] }> = ({ copy }) => {
  const s = useSeconds();
  return (
    <AbsoluteFill>
      <Background glowColor={COLORS.laser} seed="custom" />
      {/* Sound: laser traces the outline, blips for list items, stamp impact */}
      <Sfx name="laser" atSeconds={0.4} volume={0.45} />
      {copy.points.map((p, i) => (
        <Sfx key={p} name="blip" atSeconds={1 + i * 0.2} volume={0.25} />
      ))}
      <Sfx name="impact" atSeconds={3.5} volume={0.75} />
      <Stage>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 200,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            width: 800,
          }}
        >
          <Eyebrow text={copy.eyebrow} />
          <AnimatedTitle
            text={copy.title.text}
            fontSize={112}
            delay={s(0.15)}
            highlight={copy.title.highlight}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              marginTop: 30,
            }}
          >
            {copy.points.map((p, i) => (
              <FadeUp key={p} delay={s(1) + i * s(0.2)} distance={24}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    fontFamily: FONTS.body,
                    fontSize: 34,
                    color: COLORS.text,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      background: COLORS.accent,
                      transform: "rotate(45deg)",
                    }}
                  />
                  {p}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        <FadeUp
          delay={s(0.2)}
          distance={60}
          style={{ position: "absolute", left: 1020, top: 220 }}
        >
          <Blueprint stamp={copy.stamp} />
        </FadeUp>
      </Stage>
    </AbsoluteFill>
  );
};
