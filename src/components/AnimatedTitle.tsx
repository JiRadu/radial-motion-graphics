import React from "react";
import { interpolate } from "remotion";
import { COLORS, FONTS } from "../theme";
import { SPRINGS, stagger, useSpringIn } from "../utils/animation";

const Word: React.FC<{
  word: string;
  delay: number;
  color: string;
  fontSize: number;
}> = ({ word, delay, color, fontSize }) => {
  const p = useSpringIn(delay, SPRINGS.smooth);
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        paddingBottom: fontSize * 0.06,
        marginRight: fontSize * 0.26,
      }}
    >
      <span
        style={{
          display: "inline-block",
          color,
          transform: `translateY(${interpolate(p, [0, 1], [110, 0])}%)`,
          opacity: interpolate(p, [0, 0.25], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {word}
      </span>
    </span>
  );
};

/**
 * Headline that reveals word by word from behind a mask.
 * Words listed in `highlight` are tinted with the accent colour.
 */
export const AnimatedTitle: React.FC<{
  text: string;
  fontSize?: number;
  /** Frames before the first word starts. */
  delay?: number;
  /** Frames between words. */
  wordStagger?: number;
  highlight?: string[];
  color?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  fontSize = 110,
  delay = 0,
  wordStagger = 4,
  highlight = [],
  color = COLORS.text,
  style,
}) => (
  <div
    style={{
      fontFamily: FONTS.display,
      fontWeight: 700,
      fontSize,
      lineHeight: 1.04,
      textTransform: "uppercase",
      letterSpacing: 1,
      ...style,
    }}
  >
    {text.split(" ").map((w, i) => (
      <Word
        key={`${w}-${i}`}
        word={w}
        delay={stagger(i, wordStagger, delay)}
        fontSize={fontSize}
        color={highlight.includes(w) ? COLORS.accent : color}
      />
    ))}
  </div>
);
