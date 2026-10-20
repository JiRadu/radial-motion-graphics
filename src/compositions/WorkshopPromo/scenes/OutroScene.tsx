import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Circle, Polygon } from "@remotion/shapes";
import {
  AnimatedTitle,
  Background,
  FadeUp,
  Sfx,
  Stage,
} from "../../../components";
import { COLORS, FONTS } from "../../../theme";
import { SPRINGS, useProgress, useSpringIn } from "../../../utils/animation";
import { useSpeed } from "../../../utils/speed";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

export const OutroScene: React.FC<{
  brandName: string;
  tagline: Copy["intro"]["tagline"];
  cta: string;
  website: string;
  email: string;
  durationInFrames: number;
}> = ({ brandName, tagline, cta, website, email, durationInFrames }) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const s = useSeconds();

  const ring = useSpringIn(s(0.2), SPRINGS.heavy);
  const brand = useSpringIn(s(0.4), SPRINGS.smooth);
  const divider = useProgress(s(1.4), s(2.2));
  const fadeOut = interpolate(
    frame,
    [durationInFrames - s(0.6), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: fadeOut, backgroundColor: "black" }}>
      <Background sparks={55} seed="outro" />
      {/* Sound: logo impact, blip on the call to action */}
      <Sfx name="impact" atSeconds={0.4} />
      <Sfx name="blip" atSeconds={1.8} volume={0.35} />
      <Stage>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              position: "absolute",
              opacity: 0.35 * ring,
              transform: `scale(${interpolate(ring, [0, 1], [0.5, 1])}) rotate(${-frame * speed * 0.2}deg)`,
            }}
          >
            <Circle
              radius={440}
              fill="none"
              stroke={COLORS.line}
              strokeWidth={2}
              strokeDasharray="6 14"
            />
          </div>
          <div
            style={{
              position: "absolute",
              opacity: 0.25 * ring,
              transform: `rotate(${frame * speed * 0.3}deg)`,
            }}
          >
            <Polygon
              points={6}
              radius={360}
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
              gap: 26,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontWeight: 700,
                fontSize: 200,
                lineHeight: 1,
                letterSpacing: interpolate(brand, [0, 1], [40, 14]),
                color: COLORS.text,
                opacity: brand,
                transform: `scale(${interpolate(brand, [0, 1], [0.9, 1])})`,
              }}
            >
              {brandName}
            </div>
            <AnimatedTitle
              text={tagline.text}
              fontSize={60}
              delay={s(0.8)}
              highlight={tagline.highlight}
              style={{ fontWeight: 500, letterSpacing: 4 }}
            />
            <div
              style={{
                width: 520 * divider,
                height: 3,
                background: COLORS.accent,
                margin: "10px 0",
              }}
            />
            <FadeUp delay={s(1.8)}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 500,
                  fontSize: 56,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  color: COLORS.accent,
                }}
              >
                {cta}
              </div>
            </FadeUp>
            <FadeUp delay={s(2.2)}>
              <div
                style={{
                  display: "flex",
                  gap: 50,
                  fontFamily: FONTS.body,
                  fontSize: 32,
                  color: COLORS.steel,
                }}
              >
                <span>{website}</span>
                <span style={{ color: COLORS.line }}>|</span>
                <span>{email}</span>
              </div>
            </FadeUp>
          </div>
        </AbsoluteFill>
      </Stage>
    </AbsoluteFill>
  );
};
