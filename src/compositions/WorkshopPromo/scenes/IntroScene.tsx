import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Polygon } from "@remotion/shapes";
import {
  AnimatedTitle,
  Background,
  Chip,
  Eyebrow,
  Sfx,
  Stage,
} from "../../../components";
import { COLORS, FONTS } from "../../../theme";
import { SPRINGS, useProgress, useSpringIn } from "../../../utils/animation";
import { useSpeed } from "../../../utils/speed";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

export const IntroScene: React.FC<{
  brandName: string;
  copy: Copy["intro"];
}> = ({ brandName, copy }) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const s = useSeconds();

  const sweep = useProgress(0, s(0.9));
  const open = useProgress(s(0.55), s(1.5));
  const brand = useSpringIn(s(0.55), SPRINGS.heavy);
  const pushIn = interpolate(frame, [0, s(5)], [1, 1.06]);

  return (
    <AbsoluteFill>
      <Background sparks={45} seed="intro" />
      {/* Sound: laser sweep -> logo impact -> a blip per service chip */}
      <Sfx name="laser" atSeconds={0} volume={0.7} />
      <Sfx name="impact" atSeconds={0.6} />
      {copy.services.map((label, i) => (
        <Sfx key={label} name="blip" atSeconds={2.3 + i * 0.12} volume={0.35} />
      ))}
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${pushIn})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              opacity: 0.22 * brand,
              transform: `rotate(${frame * speed * 0.25}deg) scale(${interpolate(brand, [0, 1], [0.7, 1])})`,
            }}
          >
            <Polygon
              points={6}
              radius={430}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={2}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Eyebrow text={copy.eyebrow} delay={s(0.15)} />

            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 700,
                  fontSize: 230,
                  lineHeight: 1,
                  letterSpacing: interpolate(brand, [0, 1], [70, 16]),
                  background: `linear-gradient(180deg, ${COLORS.text} 30%, ${COLORS.steel} 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  clipPath: `inset(${(1 - open) * 50}% 0 ${(1 - open) * 50}% 0)`,
                }}
              >
                {brandName}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  height: 4,
                  width: `${sweep * 120}%`,
                  transform: "translate(-50%, -50%)",
                  background: COLORS.laser,
                  boxShadow: `0 0 24px 6px ${COLORS.laser}`,
                  opacity: interpolate(open, [0.5, 1], [1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              />
            </div>

            <AnimatedTitle
              text={copy.tagline.text}
              fontSize={72}
              delay={s(1.5)}
              highlight={copy.tagline.highlight}
              style={{ fontWeight: 500, letterSpacing: 4 }}
            />

            <div style={{ display: "flex", gap: 22, marginTop: 20 }}>
              {copy.services.map((label, i) => (
                <Chip key={label} text={label} delay={s(2.3) + i * s(0.12)} />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </Stage>
    </AbsoluteFill>
  );
};
