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
import { progressBetween, SPRINGS, springAt } from "../../../utils/animation";
import { useSpeed, useTimelineFps } from "../../../utils/speed";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

// Portal-frame steel hall in light perspective, drawn in this order.
const WAREHOUSE_PATHS = [
  "M40 440 H760",
  "M120 440 V210",
  "M520 440 V210",
  "M120 210 L320 100 L520 210",
  "M260 380 V150",
  "M660 380 V150",
  "M260 150 L460 40 L660 150",
  "M120 210 L260 150",
  "M320 100 L460 40",
  "M520 210 L660 150",
  "M520 440 L660 380",
  "M520 440 L660 150",
  "M520 210 L660 380",
  "M170 182 L310 122",
  "M220 155 L360 95",
  "M420 155 L560 95",
  "M470 182 L610 122",
];

const Warehouse: React.FC = () => {
  const frame = useCurrentFrame();
  const s = useSeconds();
  return (
    <svg width={800} height={480} viewBox="0 0 800 480">
      {WAREHOUSE_PATHS.map((d, i) => {
        const start = s(0.6) + i * s(0.07);
        return (
          <DrawPath
            key={d}
            d={d}
            progress={progressBetween(frame, start, start + s(0.6))}
            color={i < 7 ? COLORS.text : COLORS.steel}
            width={i < 7 ? 6 : 3}
          />
        );
      })}
    </svg>
  );
};

const ROWS = 3;
const COLS = 4;

const SolarArray: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  const speed = useSpeed();
  const s = useSeconds();
  const glintX = interpolate(frame, [s(1.8), s(4.5)], [-300, 1000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sun = springAt(frame, fps, s(0.6), SPRINGS.heavy);

  return (
    <svg width={800} height={480} viewBox="0 0 800 480">
      <defs>
        <linearGradient
          id="pv"
          gradientUnits="userSpaceOnUse"
          x1={glintX}
          y1={0}
          x2={glintX + 220}
          y2={120}
        >
          <stop offset="0%" stopColor={COLORS.solar} />
          <stop offset="50%" stopColor="#4F8FCC" />
          <stop offset="100%" stopColor={COLORS.solar} />
        </linearGradient>
      </defs>

      <g
        transform={`translate(${700} ${70}) rotate(${frame * speed * 0.6}) scale(${sun})`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={-44}
            x2={0}
            y2={-60}
            stroke={COLORS.accentSoft}
            strokeWidth={4}
            strokeLinecap="round"
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle r={32} fill={COLORS.accentSoft} />
      </g>

      <line
        x1={20}
        y1={440}
        x2={780}
        y2={440}
        stroke={COLORS.line}
        strokeWidth={3}
      />

      {Array.from({ length: ROWS * COLS }).map((_, idx) => {
        const r = Math.floor(idx / COLS);
        const c = idx % COLS;
        const x = 40 + c * 168 + r * 34;
        const y = 150 + r * 96;
        const p = springAt(
          frame,
          fps,
          s(0.8) + (r + c) * s(0.09),
          SPRINGS.snappy,
        );
        const pts = [
          [x + 18, y],
          [x + 162, y],
          [x + 150, y + 62],
          [x, y + 62],
        ];
        const mid = (a: number[], b: number[], k: number) => [
          a[0] + (b[0] - a[0]) * k,
          a[1] + (b[1] - a[1]) * k,
        ];
        return (
          <g
            key={idx}
            opacity={Math.min(1, p * 1.4)}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              transform: `scaleY(${p})`,
            }}
          >
            <line
              x1={x + 40}
              y1={y + 62}
              x2={x + 40}
              y2={y + 92}
              stroke={COLORS.steel}
              strokeWidth={4}
            />
            <line
              x1={x + 120}
              y1={y + 62}
              x2={x + 120}
              y2={y + 82}
              stroke={COLORS.steel}
              strokeWidth={4}
            />
            <polygon
              points={pts.map((pt) => pt.join(",")).join(" ")}
              fill="url(#pv)"
              stroke={COLORS.laser}
              strokeWidth={2}
            />
            {[1 / 3, 2 / 3].map((k) => {
              const a = mid(pts[0], pts[1], k);
              const b = mid(pts[3], pts[2], k);
              return (
                <line
                  key={k}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  stroke={COLORS.laser}
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                />
              );
            })}
            {(() => {
              const a = mid(pts[0], pts[3], 0.5);
              const b = mid(pts[1], pts[2], 0.5);
              return (
                <line
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  stroke={COLORS.laser}
                  strokeOpacity={0.5}
                  strokeWidth={1.5}
                />
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
};

const Panel: React.FC<{
  label: string;
  delay: number;
  children: React.ReactNode;
}> = ({ label, delay, children }) => (
  <FadeUp delay={delay} distance={50}>
    <div
      style={{
        width: 800,
        background: `${COLORS.panel}CC`,
        border: `1px solid ${COLORS.line}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
      <div
        style={{
          padding: "18px 28px",
          borderTop: `1px solid ${COLORS.line}`,
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 30,
          textTransform: "uppercase",
          letterSpacing: 2,
          color: COLORS.text,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ width: 14, height: 14, background: COLORS.accent }} />
        {label}
      </div>
    </div>
  </FadeUp>
);

export const StructuresScene: React.FC<{ copy: Copy["structures"] }> = ({
  copy,
}) => {
  const s = useSeconds();
  return (
    <AbsoluteFill>
      <Background glowColor={COLORS.laser} seed="structures" />
      {/* Sound: two muted knocks as the steel frames go up */}
      <Sfx name="clank" atSeconds={0.6} volume={0.7} />
      <Sfx name="clank" atSeconds={1.15} volume={0.45} />
      <Stage>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 90,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Eyebrow text={copy.eyebrow} />
          <AnimatedTitle
            text={copy.title.text}
            fontSize={84}
            delay={s(0.15)}
            highlight={copy.title.highlight}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 360,
            display: "flex",
            gap: 40,
          }}
        >
          <Panel label={copy.warehouses} delay={s(0.4)}>
            <Warehouse />
          </Panel>
          <Panel label={copy.solar} delay={s(0.55)}>
            <SolarArray />
          </Panel>
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
