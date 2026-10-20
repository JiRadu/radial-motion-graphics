import React from "react";
import { COLORS } from "../theme";

/**
 * The Radial Cons logo motif: thin rays radiating from a centre, alternating
 * long and short. `progress` (0 -> 1) grows the rays outwards, ray by ray.
 * Used as a large decorative element behind the logo in intro and outro.
 */
export const RadialBurst: React.FC<{
  radius: number;
  progress?: number;
  rays?: number;
  /** Fraction of the circle covered, starting at `startAngle` (degrees, 0 = right). */
  sweep?: number;
  startAngle?: number;
  innerRatio?: number;
  strokeWidth?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  radius,
  progress = 1,
  rays = 36,
  sweep = 1,
  startAngle = -90,
  innerRatio = 0.38,
  strokeWidth = 3,
  color = COLORS.bronze,
  style,
}) => {
  const size = radius * 2;
  const step = (360 * sweep) / (sweep === 1 ? rays : rays - 1);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-radius} ${-radius} ${size} ${size}`}
      style={style}
    >
      {Array.from({ length: rays }).map((_, i) => {
        const a = ((startAngle + i * step) * Math.PI) / 180;
        const long = i % 2 === 0;
        const r0 = radius * (long ? innerRatio : innerRatio + 0.1);
        const rMax = radius * (long ? 1 : 0.72);
        // Each ray starts growing slightly after the previous one.
        const local = Math.min(
          1,
          Math.max(0, progress * 1.6 - (i / rays) * 0.6),
        );
        const r1 = r0 + (rMax - r0) * local;
        return (
          <line
            key={i}
            x1={Math.cos(a) * r0}
            y1={Math.sin(a) * r0}
            x2={Math.cos(a) * r1}
            y2={Math.sin(a) * r1}
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={local > 0 ? 1 : 0}
          />
        );
      })}
    </svg>
  );
};
