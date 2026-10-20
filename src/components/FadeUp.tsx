import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringIn } from "../utils/animation";

/** Fades and slides any children up into place after `delay` frames. */
export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 40, style }) => {
  const p = useSpringIn(delay, SPRINGS.smooth);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [distance, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
