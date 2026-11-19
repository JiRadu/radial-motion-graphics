import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  AnimatedTitle,
  Background,
  Chip,
  Eyebrow,
  RadialLogo,
  Sfx,
  Stage,
} from "../../../components";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

/**
 * Opening: the official logo assembles itself (rays shoot out from the
 * centre, the gold R lands, the wordmark slides into view and catches the
 * light), followed by the motto and the four product lines.
 */
export const IntroScene: React.FC<{
  brandName: string;
  copy: Copy["intro"];
}> = ({ brandName, copy }) => {
  const frame = useCurrentFrame();
  const s = useSeconds();
  const pushIn = interpolate(frame, [0, s(5)], [1, 1.05]);

  return (
    <AbsoluteFill>
      <Background sparks={40} seed="intro" />
      {/* Sound: rays shoot out -> R lands -> a blip per product line */}
      <Sfx name="laser" atSeconds={0.05} volume={0.6} />
      <Sfx name="impact" atSeconds={0.4} />
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Eyebrow text={copy.eyebrow} delay={s(0.15)} />

            <RadialLogo
              id="intro-logo"
              width={1080}
              delay={s(0.1)}
              label={brandName}
            />

            <AnimatedTitle
              text={copy.tagline.text}
              fontSize={78}
              delay={s(1.5)}
              highlight={copy.tagline.highlight}
              style={{ marginTop: 6 }}
            />

            <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
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
