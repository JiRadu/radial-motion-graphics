import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  AnimatedTitle,
  Background,
  DrawPath,
  Eyebrow,
  FeatureRow,
  Sfx,
  Stage,
} from "../../../components";
import { COLORS } from "../../../theme";
import {
  SPRINGS,
  springAt,
  useProgress,
  useSpringIn,
} from "../../../utils/animation";
import { useTimelineFps } from "../../../utils/speed";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

const flamePath = (
  cx: number,
  base: number,
  h: number,
  w: number,
  sway: number,
) =>
  `M${cx - w} ${base} C${cx - w} ${base - h * 0.45} ${cx + sway - w * 0.3} ${base - h * 0.6} ${cx + sway} ${base - h} ` +
  `C${cx + sway + w * 0.4} ${base - h * 0.55} ${cx + w} ${base - h * 0.4} ${cx + w} ${base} Z`;

const FLAMES = [
  { cx: 300, h: 200, w: 62 },
  { cx: 238, h: 125, w: 44 },
  { cx: 362, h: 140, w: 44 },
];

/** Stylised laser-cut firepit that draws itself, then ignites. */
const Firepit: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  const s = useSeconds();

  const bowl = useProgress(s(0.3), s(1.5));
  const legs = useProgress(s(1.0), s(1.8));
  const fill = useProgress(s(1.2), s(2));
  const ignite = useSpringIn(s(1.7), SPRINGS.bouncy);
  const t = frame / fps;

  return (
    <svg width={760} height={760} viewBox="0 0 600 600">
      <defs>
        <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={COLORS.accent} />
          <stop offset="60%" stopColor={COLORS.accentSoft} />
          <stop offset="100%" stopColor="#FFF3C4" />
        </linearGradient>
        <radialGradient id="heat">
          <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.55} />
          <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="bowlFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3F45" />
          <stop offset="100%" stopColor="#1A1D21" />
        </linearGradient>
      </defs>

      <circle
        cx={300}
        cy={240}
        r={250}
        fill="url(#heat)"
        opacity={ignite * (0.8 + 0.2 * Math.sin(t * 9))}
      />

      <g transform={`translate(300 300) scale(${ignite}) translate(-300 -300)`}>
        {FLAMES.map((f, i) => {
          const sway = Math.sin(t * 6 + i * 2) * 14;
          const h = f.h * (1 + 0.1 * Math.sin(t * 11 + i));
          return (
            <g key={i}>
              <path d={flamePath(f.cx, 305, h, f.w, sway)} fill="url(#flame)" />
              <path
                d={flamePath(f.cx, 305, h * 0.55, f.w * 0.45, sway * 0.6)}
                fill="#FFF3C4"
                opacity={0.85}
              />
            </g>
          );
        })}
      </g>

      <DrawPath
        d="M90 300 Q300 480 510 300 Z"
        progress={bowl}
        color={COLORS.steel}
        width={6}
        fill="url(#bowlFill)"
        fillOpacity={fill}
      />
      <DrawPath
        d="M90 300 A210 34 0 1 0 510 300 A210 34 0 1 0 90 300"
        progress={bowl}
        color={COLORS.accent}
        width={5}
        glow
      />

      {Array.from({ length: 7 }).map((_, i) => {
        const tt = 0.2 + i * 0.1;
        const x = 90 + 420 * tt;
        const y = 300 + 360 * tt * (1 - tt) * 0.55 + 6;
        const p = springAt(frame, fps, s(1.3) + i * 2, SPRINGS.bouncy);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={9 * p}
            fill={COLORS.accent}
            opacity={0.4 + 0.6 * ignite}
          />
        );
      })}

      <DrawPath d="M190 400 L160 530" progress={legs} width={8} />
      <DrawPath d="M410 400 L440 530" progress={legs} width={8} />
      <DrawPath d="M300 438 L300 545" progress={legs} width={8} />
      <DrawPath
        d="M70 548 H530"
        progress={legs}
        color={COLORS.line}
        width={3}
      />
    </svg>
  );
};

export const FurnitureScene: React.FC<{ copy: Copy["furniture"] }> = ({
  copy,
}) => {
  const s = useSeconds();
  return (
    <AbsoluteFill>
      <Background sparks={18} seed="furniture" />
      {/* Sound: a blip per feature row, crackle when the firepit ignites */}
      {copy.features.map((f, i) => (
        <Sfx
          key={f.title}
          name="blip"
          atSeconds={0.9 + i * 0.18}
          volume={0.3}
        />
      ))}
      <Sfx name="sparks" atSeconds={1.7} volume={0.75} />
      <Sfx name="sparks" atSeconds={2.9} volume={0.4} />
      <Stage>
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 140,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <Eyebrow text={copy.eyebrow} />
          <AnimatedTitle
            text={copy.title.text}
            fontSize={80}
            delay={s(0.15)}
            highlight={copy.title.highlight}
            style={{ maxWidth: 990 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              marginTop: 24,
            }}
          >
            {copy.features.map((f, i) => (
              <FeatureRow
                key={f.title}
                index={i + 1}
                title={f.title}
                detail={f.detail}
                delay={s(0.9) + i * s(0.18)}
              />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 1060, top: 170 }}>
          <Firepit />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
