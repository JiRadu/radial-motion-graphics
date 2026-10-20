import { useTimelineFps } from "./speed";

/** Seconds -> frames at a given fps. */
export const secondsToFrames = (seconds: number, fps: number) =>
  Math.round(seconds * fps);

/**
 * Returns `s(seconds)` that converts design seconds to real frames at the
 * current fps and playback speed. Write all timing in seconds so changing fps
 * or speed never breaks a scene.
 *
 *   const s = useSeconds();
 *   const p = useSpringIn(s(0.4));
 */
export const useSeconds = () => {
  const fps = useTimelineFps();
  return (seconds: number) => secondsToFrames(seconds, fps);
};

/**
 * Total length of a TransitionSeries: every scene minus the overlap of each
 * transition between them.
 */
export const seriesDuration = (
  sceneSeconds: number[],
  transitionSeconds: number,
  fps: number,
) => {
  const scenes = sceneSeconds.reduce(
    (sum, s) => sum + secondsToFrames(s, fps),
    0,
  );
  const overlap =
    Math.max(0, sceneSeconds.length - 1) *
    secondsToFrames(transitionSeconds, fps);
  return Math.max(1, scenes - overlap);
};
