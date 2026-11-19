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

/** Backrest channels: from the top of the inner backrest down to the seat. */
const TUFTS = [
  "M96 206 L103 251",
  "M140 177 L144 228",
  "M200 166 V220",
  "M260 177 L256 228",
  "M304 206 L297 251",
];

/**
 * Semicircular restaurant banquette with a pedestal table that draws itself,
 * then a pendant lamp above the table switches on.
 */
const Banquette: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  const s = useSeconds();

  const back = useProgress(s(0.3), s(1.4));
  const seat = useProgress(s(0.6), s(1.6));
  const fill = useProgress(s(1.1), s(1.9));
  const table = useProgress(s(1.0), s(1.8));
  const cord = useProgress(s(1.2), s(1.7));
  const light = useSpringIn(s(1.8), SPRINGS.bouncy);
  const t = frame / fps;
  const glow = light * (0.92 + 0.08 * Math.sin(t * 3));

  return (
    <svg width={760} height={760} viewBox="20 40 360 360">
      <defs>
        <linearGradient id="upholstery" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3530" />
          <stop offset="100%" stopColor="#1C1A18" />
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0%" stopColor={COLORS.accentSoft} stopOpacity={0.6} />
          <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="lampCone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.accentSoft} stopOpacity={0.35} />
          <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Warm pool of light behind everything once the lamp is on */}
      <circle cx={200} cy={250} r={170} fill="url(#lampGlow)" opacity={glow} />

      {/* Backrest: top band and inner face */}
      <DrawPath
        d="M60 240 A140 100 0 0 1 340 240 L320 246 A120 80 0 0 0 80 246 Z"
        progress={back}
        width={2.6}
        fill="url(#upholstery)"
        fillOpacity={fill}
      />
      <DrawPath
        d="M80 246 A120 80 0 0 1 320 246 L312 282 A112 62 0 0 0 88 282 Z"
        progress={back}
        width={2.6}
        fill="url(#upholstery)"
        fillOpacity={fill * 0.8}
      />
      {TUFTS.map((d, i) => (
        <DrawPath
          key={d}
          d={d}
          progress={springAt(frame, fps, s(1.2) + i * 3, SPRINGS.bouncy)}
          color={COLORS.accent}
          width={2.4}
        />
      ))}

      {/* Seat cushion and the two end panels */}
      <DrawPath
        d="M88 282 A112 62 0 0 1 312 282 L272 300 A72 36 0 0 0 128 300 Z"
        progress={seat}
        color={COLORS.accent}
        width={2.8}
        fill={COLORS.bronzeDark}
        fillOpacity={fill * 0.55}
        glow={light > 0.5}
      />
      <DrawPath
        d="M60 240 V318 L128 334 V300 L88 282 L80 246 Z"
        progress={seat}
        width={2.6}
        fill="url(#upholstery)"
        fillOpacity={fill}
      />
      <DrawPath
        d="M340 240 V318 L272 334 V300 L312 282 L320 246 Z"
        progress={seat}
        width={2.6}
        fill="url(#upholstery)"
        fillOpacity={fill}
      />

      {/* Light cone onto the table */}
      <path
        d="M190 236 L210 236 L262 306 L138 306 Z"
        fill="url(#lampCone)"
        opacity={glow}
      />

      {/* Pedestal table */}
      <DrawPath
        d="M146 306 A54 13 0 1 0 254 306 A54 13 0 1 0 146 306"
        progress={table}
        width={2.6}
        fill={COLORS.panel}
        fillOpacity={fill}
      />
      <DrawPath d="M200 319 V368 M172 368 H228" progress={table} width={2.6} />
      <DrawPath
        d="M60 378 H340"
        progress={table}
        color={COLORS.line}
        width={1.4}
      />

      {/* Pendant lamp */}
      <DrawPath
        d="M200 46 V222"
        progress={cord}
        color={COLORS.line}
        width={1.4}
      />
      <DrawPath
        d="M188 222 H212 L222 238 H178 Z"
        progress={cord}
        color={COLORS.accent}
        width={2.4}
        fill={COLORS.accent}
        fillOpacity={0.25 + 0.75 * light}
        glow={light > 0.5}
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
      {/* Sound: a blip per feature row, a knock as the table lands, a click when the lamp turns on */}
      {copy.features.map((f, i) => (
        <Sfx
          key={f.title}
          name="blip"
          atSeconds={0.9 + i * 0.18}
          volume={0.3}
        />
      ))}
      <Sfx name="clank" atSeconds={1.3} volume={0.45} />
      <Sfx name="blip" atSeconds={1.8} volume={0.6} />
      <Sfx name="laser" atSeconds={1.85} volume={0.35} />
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
          <Banquette />
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
