import React from "react";
import { random, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";
import { useSpeed, useTimelineFps } from "../utils/speed";
import { DrawPath } from "./DrawPath";

type IconProps = {
  /** 0 -> 1 draw-on progress. */
  progress: number;
  /** Turns on the live effect (beam glow, sparks, jet). */
  active?: boolean;
  size?: number;
};

const Sparks: React.FC<{ cx: number; cy: number; seed: string }> = ({
  cx,
  cy,
  seed,
}) => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  const t = frame / fps;
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = -Math.PI * (0.1 + random(`${seed}-a-${i}`) * 0.8);
        const life = (t * 1.6 + random(`${seed}-o-${i}`)) % 1;
        const d = 8 + life * 60;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(angle) * d}
            cy={cy + Math.sin(angle) * d + life * life * 30}
            r={2.6 * (1 - life) + 0.6}
            fill={COLORS.accentSoft}
            opacity={1 - life}
          />
        );
      })}
    </>
  );
};

/** CNC fiber-laser cutting: beam over a plate cutting a profile. */
export const LaserCutIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <DrawPath d="M70 14 H130 V44 H70 Z" progress={progress} />
    <DrawPath
      d="M100 44 V112"
      progress={progress}
      color={COLORS.laser}
      width={active ? 6 : 3}
      glow={active}
    />
    <DrawPath d="M18 118 H182 V168 H18 Z" progress={progress} />
    <DrawPath
      d="M52 118 V140 A16 16 0 0 0 84 140 V118"
      progress={progress}
      color={COLORS.laser}
    />
    <DrawPath
      d="M128 143 m-13 0 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0"
      progress={progress}
      color={COLORS.laser}
    />
    {active ? <Sparks cx={100} cy={116} seed="laser" /> : null}
  </svg>
);

/** Laser welding: two plates joined by a bright seam. */
export const WeldIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <DrawPath d="M14 116 H96 V160 H14 Z" progress={progress} />
    <DrawPath d="M104 116 H186 V160 H104 Z" progress={progress} />
    <DrawPath d="M84 18 L116 18 L108 70 L92 70 Z" progress={progress} />
    <DrawPath
      d="M100 70 V112"
      progress={progress}
      color={COLORS.accent}
      width={active ? 6 : 3}
      glow={active}
    />
    <DrawPath
      d="M100 116 V160"
      progress={progress}
      color={COLORS.accentSoft}
      width={5}
      glow={active}
    />
    {active ? <Sparks cx={100} cy={114} seed="weld" /> : null}
  </svg>
);

/** Plasma cutting: torch nozzle with an arc through thick plate. */
export const PlasmaIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const wobble = active ? Math.sin((frame * speed) / 2) * 8 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath d="M78 14 H122 L110 58 H90 Z" progress={progress} />
      <DrawPath
        d={`M100 58 C${84 + wobble} 82 ${116 - wobble} 104 100 128`}
        progress={progress}
        color={COLORS.laser}
        width={active ? 6 : 3}
        glow={active}
      />
      <DrawPath d="M20 128 H180 V180 H20 Z" progress={progress} />
      <DrawPath
        d="M100 128 V180"
        progress={progress}
        color={COLORS.accent}
        width={5}
        glow={active}
      />
      {active ? <Sparks cx={100} cy={180} seed="plasma" /> : null}
    </svg>
  );
};

/** CNC press-brake bending: punch forming a sheet into an angle. */
export const BendIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const press = active ? (Math.sin((frame * speed) / 8) + 1) / 2 : 1;
  const depth = 8 + press * 22;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath
        d={`M88 ${14 + depth} V${60 + depth} L100 ${76 + depth} L112 ${60 + depth} V${14 + depth} Z`}
        progress={progress}
      />
      <DrawPath
        d={`M14 ${110 - press * 30} L100 ${110 + press * 12} L186 ${110 - press * 30}`}
        progress={progress}
        color={COLORS.accent}
        width={7}
        glow={active}
      />
      <DrawPath d="M60 150 L100 128 L140 150 V180 H60 Z" progress={progress} />
    </svg>
  );
};
