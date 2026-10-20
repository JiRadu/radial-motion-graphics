import React from "react";
import {
  AbsoluteFill,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../theme";
import { useTimelineFps } from "../utils/speed";

/**
 * Full-frame industrial backdrop: drifting blueprint grid, a moving glow and
 * optional rising sparks. Sparks use `random(seed)` so every render is identical.
 */
export const Background: React.FC<{
  glowColor?: string;
  sparks?: number;
  seed?: string;
  gridOpacity?: number;
}> = ({
  glowColor = COLORS.accent,
  sparks = 0,
  seed = "bg",
  gridOpacity = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const fps = useTimelineFps();
  const t = frame / fps;
  const drift = t * 14;
  const cell = Math.round(height / 13.5);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: `${drift}px ${drift}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${50 + Math.sin(t * 0.6) * 12}% 105%, ${glowColor}38 0%, transparent 62%)`,
        }}
      />
      {Array.from({ length: sparks }).map((_, i) => {
        const speed = (0.04 + random(`${seed}-v-${i}`) * 0.09) * height;
        const x = random(`${seed}-x-${i}`) * width;
        const startY = random(`${seed}-y-${i}`) * height;
        const y = (((startY - t * speed) % height) + height) % height;
        const size = (1.5 + random(`${seed}-z-${i}`) * 3.5) * (height / 1080);
        const flicker = 0.35 + 0.65 * Math.abs(Math.sin(t * 5 + i * 1.7));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.sin(t * 1.5 + i) * 16,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: COLORS.accentSoft,
              opacity: flicker * 0.75,
              boxShadow: `0 0 ${size * 4}px ${COLORS.accent}`,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
