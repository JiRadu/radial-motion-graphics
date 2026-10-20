import React from "react";
import { interpolate } from "remotion";
import { COLORS, FONTS } from "../theme";
import { SPRINGS, useSpringIn } from "../utils/animation";
import { FadeUp } from "./FadeUp";

/** Small uppercase label with a growing accent bar, used above headlines. */
export const Eyebrow: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const bar = useSpringIn(delay, SPRINGS.smooth);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div
        style={{
          width: interpolate(bar, [0, 1], [0, 64]),
          height: 4,
          background: COLORS.accent,
        }}
      />
      <FadeUp delay={delay + 4} distance={14}>
        <span
          style={{
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: COLORS.steel,
          }}
        >
          {text}
        </span>
      </FadeUp>
    </div>
  );
};

/** Numbered feature row with an accent edge. */
export const FeatureRow: React.FC<{
  index: number;
  title: string;
  detail: string;
  delay?: number;
  width?: number;
}> = ({ index, title, detail, delay = 0, width = 780 }) => {
  const p = useSpringIn(delay, SPRINGS.smooth);
  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        alignItems: "center",
        padding: "20px 30px",
        width,
        background: COLORS.panel,
        borderLeft: `6px solid ${COLORS.accent}`,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-60, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 50,
          color: COLORS.accent,
          minWidth: 70,
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div
          style={{
            fontFamily: FONTS.heading,
            fontWeight: 600,
            fontSize: 34,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: COLORS.text,
          }}
        >
          {title}
        </div>
        <div
          style={{ fontFamily: FONTS.body, fontSize: 24, color: COLORS.steel }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};

/** Square-cornered label that pops in (brandbook: corners 0–4 px). */
export const Chip: React.FC<{
  text: string;
  delay?: number;
  color?: string;
}> = ({ text, delay = 0, color = COLORS.accent }) => {
  const p = useSpringIn(delay, SPRINGS.snappy);
  return (
    <div
      style={{
        padding: "12px 28px",
        borderRadius: 2,
        border: `2px solid ${color}`,
        color: COLORS.text,
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: 24,
        letterSpacing: 3,
        textTransform: "uppercase",
        opacity: p,
        transform: `scale(${interpolate(p, [0, 1], [0.6, 1])})`,
      }}
    >
      {text}
    </div>
  );
};
