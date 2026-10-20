import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  AnimatedTitle,
  Background,
  FadeUp,
  RadialBurst,
  Sfx,
  Stage,
} from "../../../components";
import { COLORS, FONTS, LOGO } from "../../../theme";
import { SPRINGS, useProgress, useSpringIn } from "../../../utils/animation";
import { useSpeed } from "../../../utils/speed";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

const LOGO_WIDTH = 900;

export const OutroScene: React.FC<{
  brandName: string;
  tagline: Copy["intro"]["tagline"];
  cta: string;
  phone: string;
  website: string;
  email: string;
  durationInFrames: number;
}> = ({ brandName, tagline, cta, phone, website, email, durationInFrames }) => {
  const frame = useCurrentFrame();
  const speed = useSpeed();
  const s = useSeconds();

  const ring = useSpringIn(s(0.2), SPRINGS.heavy);
  const brand = useSpringIn(s(0.4), SPRINGS.smooth);
  const burst = useProgress(s(0.2), s(1.4));
  const divider = useProgress(s(1.4), s(2.2));
  const fadeOut = interpolate(
    frame,
    [durationInFrames - s(0.6), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const contacts = [phone, website, email].filter(Boolean);

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
              opacity: 0.14 * ring,
              transform: `scale(${interpolate(ring, [0, 1], [0.6, 1])}) rotate(${-frame * speed * 0.06}deg)`,
            }}
          >
            <RadialBurst radius={500} progress={burst} rays={40} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 26,
            }}
          >
            <Img
              src={staticFile(LOGO.horizontalColor)}
              alt={brandName}
              style={{
                display: "block",
                width: LOGO_WIDTH,
                height: LOGO_WIDTH / LOGO.horizontalAspect,
                opacity: brand,
                transform: `scale(${interpolate(brand, [0, 1], [0.9, 1])})`,
              }}
            />
            <AnimatedTitle
              text={tagline.text}
              fontSize={64}
              delay={s(0.8)}
              highlight={tagline.highlight}
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
                  fontFamily: FONTS.heading,
                  fontWeight: 600,
                  fontSize: 44,
                  textTransform: "uppercase",
                  letterSpacing: 6,
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
                  gap: 40,
                  fontFamily: FONTS.body,
                  fontSize: 30,
                  color: COLORS.steel,
                }}
              >
                {contacts.map((c, i) => (
                  <React.Fragment key={c}>
                    {i > 0 ? (
                      <span style={{ color: COLORS.line }}>|</span>
                    ) : null}
                    <span>{c}</span>
                  </React.Fragment>
                ))}
              </div>
            </FadeUp>
          </div>
        </AbsoluteFill>
      </Stage>
    </AbsoluteFill>
  );
};
