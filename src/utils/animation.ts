import {
  Easing,
  interpolate,
  spring,
  SpringConfig,
  useCurrentFrame,
} from "remotion";
import { useTimelineFps } from "./speed";

/** Named spring presets. Prefer these over ad-hoc values for a consistent feel. */
export const SPRINGS = {
  /** No overshoot; the default for UI and text. */
  smooth: { damping: 200 },
  /** Fast with a tiny overshoot. */
  snappy: { damping: 20, stiffness: 200 },
  /** Playful bounce for pops and badges. */
  bouncy: { damping: 12 },
  /** Slow and weighty for large objects. */
  heavy: { damping: 15, stiffness: 80, mass: 2 },
} satisfies Record<string, Partial<SpringConfig>>;

/** Default ease-out used for draw-ons and reveals. */
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** 0 -> 1 spring that starts `delay` frames into the current sequence. */
export const useSpringIn = (
  delay = 0,
  config: Partial<SpringConfig> = SPRINGS.smooth,
  durationInFrames?: number,
) => {
  const frame = useCurrentFrame();
  const fps = useTimelineFps();
  return spring({ frame: frame - delay, fps, config, durationInFrames });
};

/**
 * Clamped, eased 0 -> 1 progress of `frame` between two frames.
 * Hook-free, so it is safe inside loops and .map().
 */
export const progressBetween = (
  frame: number,
  startFrame: number,
  endFrame: number,
  easing: (t: number) => number = EASE_OUT,
) =>
  interpolate(frame, [startFrame, Math.max(startFrame + 1, endFrame)], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Clamped, eased 0 -> 1 progress between two frames of the current sequence. */
export const useProgress = (
  startFrame: number,
  endFrame: number,
  easing: (t: number) => number = EASE_OUT,
) => progressBetween(useCurrentFrame(), startFrame, endFrame, easing);

/** Spring progress for item `delay` frames in; hook-free variant of useSpringIn. */
export const springAt = (
  frame: number,
  fps: number,
  delay: number,
  config: Partial<SpringConfig> = SPRINGS.smooth,
) => spring({ frame: frame - delay, fps, config });

/** Delay (frames) for item `index` in a staggered list. */
export const stagger = (index: number, perItem: number, offset = 0) =>
  offset + index * perItem;

/** Map a 0 -> 1 progress onto any range (clamped). */
export const mix = (progress: number, from: number, to: number) =>
  interpolate(progress, [0, 1], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Characters of `text` visible at `frame` for a typewriter effect. */
export const typewriter = (
  text: string,
  frame: number,
  fps: number,
  startFrame = 0,
  charsPerSecond = 24,
) => {
  const n = Math.floor(((frame - startFrame) / fps) * charsPerSecond);
  return text.slice(0, Math.max(0, Math.min(text.length, n)));
};

/** Count a number up from 0 for animated stats and dimensions. */
export const countUp = (progress: number, target: number, decimals = 0) =>
  (target * Math.min(1, Math.max(0, progress))).toFixed(decimals);
