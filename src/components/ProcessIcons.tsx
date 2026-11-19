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

/** Milling and taper drilling: a spinning end mill over a pocketed block. */
export const MillIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const spin = active ? (frame * speed * 3) % 16 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath d="M76 14 H124 V46 H76 Z" progress={progress} />
      <DrawPath d="M90 46 V96 L100 110 L110 96 V46" progress={progress} />
      <DrawPath
        d={`M90 ${54 + spin} L110 ${62 + spin} M90 ${70 + spin} L110 ${78 + spin}`}
        progress={progress}
        color={COLORS.accent}
        width={3}
        glow={active}
      />
      <DrawPath d="M18 118 H182 V168 H18 Z" progress={progress} />
      <DrawPath
        d="M40 118 V136 H74 V118 M130 118 L138 146 L146 118"
        progress={progress}
        color={COLORS.accent}
      />
      {active ? <Sparks cx={100} cy={114} seed="mill" /> : null}
    </svg>
  );
};

/** Particles streaming from a spray gun towards a hanging part. */
const SprayParticles: React.FC<{ seed: string; fan: number }> = ({
  seed,
  fan,
}) => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  const t = frame / fps;
  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const life = (t * 1.8 + random(`${seed}-o-${i}`)) % 1;
        const spread = (random(`${seed}-s-${i}`) - 0.5) * fan;
        return (
          <circle
            key={i}
            cx={78 + life * 62}
            cy={92 + spread * life}
            r={2.2}
            fill={COLORS.accentSoft}
            opacity={1 - life * 0.6}
          />
        );
      })}
    </>
  );
};

/** Electrostatic powder coating: gun, charged powder cloud, grounded part. */
export const PowderIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <DrawPath
      d="M18 80 L70 70 V114 L18 104 Z M40 106 V150 H54 V110"
      progress={progress}
    />
    <DrawPath d="M160 20 V58 M142 58 H178 V170 H142 Z" progress={progress} />
    <DrawPath
      d="M134 90 H128 M134 112 H126 M134 134 H128"
      progress={progress}
      color={COLORS.accent}
      width={3}
    />
    {active ? <SprayParticles seed="powder" fan={60} /> : null}
  </svg>
);

/** Electrostatic liquid painting: spray fan onto a panel, wet coat line. */
export const LiquidIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const coat = active ? 60 + ((frame * speed * 2) % 100) : 160;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath
        d="M18 74 H70 V100 H18 Z M40 100 V150 M28 150 H54"
        progress={progress}
      />
      <DrawPath
        d="M72 87 L138 60 M72 87 L138 87 M72 87 L138 114"
        progress={progress}
        color={COLORS.accentSoft}
        width={active ? 4 : 2}
        glow={active}
      />
      <DrawPath d="M146 40 H182 V170 H146 Z" progress={progress} />
      <DrawPath
        d={`M164 40 V${Math.min(170, coat)}`}
        progress={progress}
        color={COLORS.accent}
        width={6}
        glow={active}
      />
    </svg>
  );
};

/** Conical rolling: three rolls turning a plate into a cone. */
export const RollIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const a = active ? frame * speed * 0.15 : 0;
  const spoke = (cx: number, cy: number, dir: number) =>
    `M${cx} ${cy} L${cx + Math.cos(a * dir) * 16} ${cy + Math.sin(a * dir) * 16}`;
  const circle = (cx: number, cy: number) =>
    `M${cx - 18} ${cy} a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath d={circle(56, 52)} progress={progress} />
      <DrawPath d={circle(144, 52)} progress={progress} />
      <DrawPath d={circle(100, 92)} progress={progress} />
      <DrawPath
        d={`${spoke(56, 52, 1)} ${spoke(144, 52, 1)} ${spoke(100, 92, -1)}`}
        progress={progress}
        color={COLORS.accent}
        width={3}
      />
      <DrawPath
        d="M58 132 H142 L124 182 H76 Z M58 132 Q100 148 142 132"
        progress={progress}
        color={COLORS.accent}
        width={4}
        glow={active}
      />
    </svg>
  );
};

/** Turning: a rotating workpiece in the chuck, tool cutting a chip. */
export const LatheIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const shift = active ? (frame * speed * 2) % 20 : 0;
  const marks = [0, 20, 40, 60, 80]
    .map((x) => `M${64 + ((x + shift) % 100)} 82 V118`)
    .join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath d="M14 56 H54 V144 H14 Z" progress={progress} />
      <DrawPath
        d="M54 80 H164 V120 H54 M164 88 L184 100 L164 112"
        progress={progress}
      />
      <DrawPath d={marks} progress={progress} color={COLORS.line} width={2} />
      <DrawPath
        d="M112 168 L124 124 L136 168 Z"
        progress={progress}
        color={COLORS.accent}
        glow={active}
      />
      {active ? <Sparks cx={124} cy={122} seed="lathe" /> : null}
    </svg>
  );
};

/** Coordinate drilling and tapping: a tap threading holes at set positions. */
export const TapIcon: React.FC<IconProps> = ({
  progress,
  active = false,
  size = 200,
}) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const turn = active ? (frame * speed * 1.5) % 14 : 0;
  const threads = [0, 14, 28, 42]
    .map((y) => `M90 ${50 + y + turn} L110 ${57 + y + turn}`)
    .join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <DrawPath
        d="M84 14 H116 V44 H84 Z M92 44 V108 H108 V44"
        progress={progress}
      />
      <DrawPath
        d={threads}
        progress={progress}
        color={COLORS.accent}
        width={3}
        glow={active}
      />
      <DrawPath d="M18 118 H182 V168 H18 Z" progress={progress} />
      <DrawPath
        d="M18 108 H182 M52 100 V116 M148 100 V116"
        progress={progress}
        color={COLORS.line}
        width={2}
      />
      <DrawPath
        d="M44 143 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M140 143 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0"
        progress={progress}
        color={COLORS.accent}
      />
    </svg>
  );
};
