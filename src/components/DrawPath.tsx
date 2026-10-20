import React from "react";
import { evolvePath } from "@remotion/paths";
import { COLORS } from "../theme";

/**
 * SVG path that draws itself as `progress` goes 0 -> 1.
 * Drive `progress` with useProgress() or useSpringIn().
 */
export const DrawPath: React.FC<{
  d: string;
  progress: number;
  color?: string;
  width?: number;
  fill?: string;
  fillOpacity?: number;
  glow?: boolean;
}> = ({
  d,
  progress,
  color = COLORS.steel,
  width = 4,
  fill = "none",
  fillOpacity = 1,
  glow = false,
}) => {
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);
  return (
    <path
      d={d}
      fill={fill}
      fillOpacity={fillOpacity}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      opacity={progress <= 0 ? 0 : 1}
      style={glow ? { filter: `drop-shadow(0 0 8px ${color})` } : undefined}
    />
  );
};
