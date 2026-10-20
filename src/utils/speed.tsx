import React, { createContext, useContext } from "react";
import { useVideoConfig } from "remotion";

/**
 * Global playback speed for a composition's animation timeline.
 *
 * All scene timing is written in "design seconds". With speed 0.8, one design
 * second lasts 1.25 real seconds, so everything (animations, scene lengths,
 * transitions, sound-effect cues) plays at 80% speed while the output stays at
 * the composition's real fps. Audio files themselves are never time-stretched.
 */
const SpeedContext = createContext(1);

export const SpeedProvider: React.FC<{
  speed: number;
  children: React.ReactNode;
}> = ({ speed, children }) => (
  <SpeedContext.Provider value={speed}>{children}</SpeedContext.Provider>
);

/** Current playback speed (1 = normal, 0.8 = 80%). */
export const useSpeed = () => useContext(SpeedContext);

/**
 * "Timeline fps": real fps divided by speed. Use it anywhere you would use
 * `fps` for time maths (frame / fps, spring({ fps })), so motion honours speed.
 */
export const useTimelineFps = () => {
  const { fps } = useVideoConfig();
  return fps / useSpeed();
};
