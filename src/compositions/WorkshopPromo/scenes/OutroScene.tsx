import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  AnimatedTitle,
  Background,
  FadeUp,
  RadialLogo,
  Sfx,
  Stage,
} from "../../../components";
import { COLORS, FONTS } from "../../../theme";
import { useProgress } from "../../../utils/animation";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

/**
 * End card (brandbook §3, §7): logo, motto, the gold line, the closing line
 * and the official contact details, centred.
 */
export const OutroScene: React.FC<{
  brandName: string;
  tagline: Copy["intro"]["tagline"];
  cta: string;
  website: string;
  email: string;
  phone: string;
  durationInFrames: number;
}> = ({ brandName, tagline, cta, website, email, phone, durationInFrames }) => {
  const frame = useCurrentFrame();
  const s = useSeconds();

  const divider = useProgress(s(1.5), s(2.1));
  const fadeOut = interpolate(
    frame,
    [durationInFrames - s(0.6), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const contacts = [website, email, phone].filter(Boolean);

  return (
    <AbsoluteFill style={{ opacity: fadeOut, backgroundColor: "black" }}>
      <Background sparks={45} seed="outro" />
      {/* Sound: logo impact, blip on the closing line */}
      <Sfx name="impact" atSeconds={0.45} />
      <Sfx name="blip" atSeconds={1.9} volume={0.35} />
      <Stage>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 26,
            }}
          >
            <RadialLogo
              id="outro-logo"
              width={820}
              delay={s(0.15)}
              label={brandName}
            />
            <AnimatedTitle
              text={tagline.text}
              fontSize={64}
              delay={s(0.9)}
              highlight={tagline.highlight}
            />
            <div
              style={{
                width: 64 * divider,
                height: 3,
                background: COLORS.accent,
                margin: "6px 0",
              }}
            />
            <FadeUp delay={s(1.9)}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: 54,
                  color: COLORS.accent,
                }}
              >
                {cta}
              </div>
            </FadeUp>
            <FadeUp delay={s(2.3)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  marginTop: 14,
                  fontFamily: FONTS.body,
                  fontWeight: 500,
                  fontSize: 30,
                  color: COLORS.steel,
                }}
              >
                {contacts.map((c, i) => (
                  <React.Fragment key={c}>
                    {i > 0 ? (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          background: COLORS.bronze,
                        }}
                      />
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
