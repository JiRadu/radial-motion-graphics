import React from "react";
import { AbsoluteFill, Easing, useVideoConfig } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AudioTrack, Sfx, SoundProvider } from "../../components";
import { COLORS } from "../../theme";
import { SpeedProvider } from "../../utils/speed";
import { secondsToFrames } from "../../utils/timing";
import { COPY } from "./copy";
import { WorkshopPromoProps } from "./schema";
import { CustomScene } from "./scenes/CustomScene";
import { FurnitureScene } from "./scenes/FurnitureScene";
import { IntroScene } from "./scenes/IntroScene";
import { OutroScene } from "./scenes/OutroScene";
import { StructuresScene } from "./scenes/StructuresScene";
import { TechnologyScene } from "./scenes/TechnologyScene";

/**
 * Radial Cons promo — metal-fabrication workshop, styled to the Radial Cons brandbook.
 * Scene order:   intro -> furniture -> structures -> custom -> technology -> outro
 * Transitions:   slide,   wipe,         fade,       slide,    fade
 */
export const WorkshopPromo: React.FC<WorkshopPromoProps> = ({
  language,
  brandName,
  phone,
  website,
  email,
  sceneSeconds,
  transitionSeconds,
  musicFile,
  musicVolume,
  sfxEnabled,
  sfxVolume,
  speed,
}) => {
  const { fps } = useVideoConfig();
  const copy = COPY[language];
  // Design seconds -> real frames at the chosen playback speed.
  const timelineFps = fps / speed;
  const f = (seconds: number) => secondsToFrames(seconds, timelineFps);
  const transitionFrames = f(transitionSeconds);
  const timing = linearTiming({
    durationInFrames: transitionFrames,
    easing: Easing.inOut(Easing.cubic),
  });

  // Start frame of every scene after the first = where each transition begins.
  const sceneFrames = Object.values(sceneSeconds).map(f);
  const transitionStarts = sceneFrames
    .slice(0, -1)
    .reduce<number[]>((starts, dur, i) => {
      const prev = i === 0 ? 0 : starts[i - 1];
      return [...starts, prev + dur - transitionFrames];
    }, []);

  return (
    <SpeedProvider speed={speed}>
      <SoundProvider sfxEnabled={sfxEnabled} sfxVolume={sfxVolume}>
        <AbsoluteFill lang={copy.locale} style={{ backgroundColor: COLORS.bg }}>
          <TransitionSeries>
            <TransitionSeries.Sequence durationInFrames={f(sceneSeconds.intro)}>
              <IntroScene brandName={brandName} copy={copy.intro} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-right" })}
              timing={timing}
            />
            <TransitionSeries.Sequence
              durationInFrames={f(sceneSeconds.furniture)}
            >
              <FurnitureScene copy={copy.furniture} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={wipe({ direction: "from-left" })}
              timing={timing}
            />
            <TransitionSeries.Sequence
              durationInFrames={f(sceneSeconds.structures)}
            >
              <StructuresScene copy={copy.structures} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={timing}
            />
            <TransitionSeries.Sequence
              durationInFrames={f(sceneSeconds.custom)}
            >
              <CustomScene copy={copy.custom} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-bottom" })}
              timing={timing}
            />
            <TransitionSeries.Sequence
              durationInFrames={f(sceneSeconds.technology)}
            >
              <TechnologyScene copy={copy.technology} />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={timing}
            />
            <TransitionSeries.Sequence durationInFrames={f(sceneSeconds.outro)}>
              <OutroScene
                brandName={brandName}
                tagline={copy.intro.tagline}
                cta={copy.outro.cta}
                phone={phone}
                website={website}
                email={email}
                durationInFrames={f(sceneSeconds.outro)}
              />
            </TransitionSeries.Sequence>
          </TransitionSeries>

          {musicFile ? (
            <AudioTrack
              src={musicFile}
              volume={musicVolume}
              fadeInSeconds={0.3}
            />
          ) : null}
          {/* The whoosh peaks 0.55 real seconds into the file: centre that peak on
            each transition. Sfx takes design seconds, hence the / timelineFps. */}
          {transitionStarts.map((start) => (
            <Sfx
              key={start}
              name="whoosh"
              atSeconds={Math.max(
                0,
                (start + transitionFrames / 2 - 0.55 * fps) / timelineFps,
              )}
              volume={0.55}
            />
          ))}
        </AbsoluteFill>
      </SoundProvider>
    </SpeedProvider>
  );
};
