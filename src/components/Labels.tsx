import React from "react";
import { interpolate } from "remotion";
import { COLORS, FONTS, LABEL_TRACKING } from "../theme";
import { SPRINGS, useSpringIn } from "../utils/animation";
import { FadeUp } from "./FadeUp";

/** Small uppercase label with the brand's gold line (64 × 3 px) growing in. */
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
          height: 3,
          background: COLORS.accent,
        }}
      />
      <FadeUp delay={delay + 4} distance={14}>
        <span
          style={{
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: LABEL_TRACKING,
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

/** Numbered feature row: "01" in gold Montserrat, title, one line of detail. */
export const FeatureRow: React.FC<{
  index: number;
  title: string;
  detail: string;
  delay?: number;
  width?: number;
}> = ({ index, title, detail, delay = 0, width = 880 }) => {
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
        borderLeft: `3px solid ${COLORS.accent}`,
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-60, 0])}px)`,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.body,
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: "0.04em",
          color: COLORS.accent,
          minWidth: 64,
        }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: 32,
            color: COLORS.text,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{ fontFamily: FONTS.body, fontSize: 23, color: COLORS.steel }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};

/** Square-cornered label (brandbook §9: corners 0–4 px) that pops in. */
export const Chip: React.FC<{
  text: string;
  delay?: number;
  color?: string;
}> = ({ text, delay = 0, color = COLORS.accent }) => {
  const p = useSpringIn(delay, SPRINGS.snappy);
  return (
    <div
      style={{
        padding: "14px 26px",
        borderRadius: 2,
        border: `1.5px solid ${color}`,
        color: COLORS.ink,
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: 22,
        letterSpacing: LABEL_TRACKING,
        textTransform: "uppercase",
        opacity: p,
        transform: `scale(${interpolate(p, [0, 1], [0.6, 1])})`,
      }}
    >
      {text}
    </div>
  );
};
