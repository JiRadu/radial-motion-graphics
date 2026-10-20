import React, { createContext, useContext, useMemo } from "react";
import { Audio } from "@remotion/media";
import {
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useTimelineFps } from "../utils/speed";

/**
 * Background music for a whole composition, with fade in / fade out.
 * `src` is a path inside public/, e.g. "audio/music.mp3".
 */
export const AudioTrack: React.FC<{
  src: string;
  volume?: number;
  fadeInSeconds?: number;
  fadeOutSeconds?: number;
  /** Skip the first N seconds of the source file. */
  trimBeforeSeconds?: number;
}> = ({
  src,
  volume = 0.6,
  fadeInSeconds = 1,
  fadeOutSeconds = 1.5,
  trimBeforeSeconds = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = Math.max(1, Math.round(fadeInSeconds * fps));
  const fadeOutStart = Math.max(
    fadeIn + 1,
    durationInFrames - Math.round(fadeOutSeconds * fps),
  );
  const v = interpolate(
    frame,
    [0, fadeIn, fadeOutStart, Math.max(fadeOutStart + 1, durationInFrames)],
    [0, volume, volume, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Audio
      src={staticFile(src)}
      volume={v}
      trimBefore={Math.round(trimBeforeSeconds * fps)}
    />
  );
};

/**
 * Generated sound-effect library (see scripts/generate-audio.mjs).
 * Use the key with <Sfx name="whoosh" />.
 */
export const SFX = {
  whoosh: "audio/sfx/whoosh.wav",
  impact: "audio/sfx/impact.wav",
  laser: "audio/sfx/laser.wav",
  sparks: "audio/sfx/sparks.wav",
  clank: "audio/sfx/clank.wav",
  blip: "audio/sfx/blip.wav",
} as const;

export type SfxName = keyof typeof SFX;

type SoundSettings = { sfxEnabled: boolean; sfxVolume: number };

const SoundContext = createContext<SoundSettings>({
  sfxEnabled: true,
  sfxVolume: 1,
});

/** Wrap a composition to switch all <Sfx> on/off and scale their volume. */
export const SoundProvider: React.FC<
  SoundSettings & { children: React.ReactNode }
> = ({ sfxEnabled, sfxVolume, children }) => {
  const value = useMemo(
    () => ({ sfxEnabled, sfxVolume }),
    [sfxEnabled, sfxVolume],
  );
  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

/**
 * One-shot sound effect that starts `atSeconds` into the parent sequence,
 * so placing it inside a scene syncs it to that scene's own timeline.
 * Pass a library `name` or any `src` path inside public/.
 */
export const Sfx: React.FC<
  { atSeconds: number; volume?: number } & (
    | { name: SfxName; src?: never }
    | { src: string; name?: never }
  )
> = ({ name, src, atSeconds, volume = 1 }) => {
  // atSeconds is in design seconds, so cues stay synced at any playback speed.
  const fps = useTimelineFps();
  const { sfxEnabled, sfxVolume } = useContext(SoundContext);
  if (!sfxEnabled) {
    return null;
  }
  const file = name ? SFX[name] : src;
  return (
    <Sequence
      from={Math.round(atSeconds * fps)}
      layout="none"
      name={`SFX ${name ?? src}`}
    >
      <Audio src={staticFile(file)} volume={volume * sfxVolume} />
    </Sequence>
  );
};
