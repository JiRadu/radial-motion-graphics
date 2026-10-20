import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { DESIGN } from "../config/video";

/**
 * Lays children out on a fixed 1920x1080 design canvas and scales it to fit
 * the real output size. Use absolute pixel values inside; they stay correct at
 * 720p, 1080p, 4K or any other resolution.
 */
export const Stage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width, height } = useVideoConfig();
  const scale = Math.min(width / DESIGN.width, height / DESIGN.height);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: DESIGN.width,
          height: DESIGN.height,
          flexShrink: 0,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
