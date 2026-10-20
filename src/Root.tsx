import React from "react";
import { Composition, Folder } from "remotion";
import { VIDEO } from "./config/video";
import {
  calculateWorkshopPromoMetadata,
  workshopPromoSchema,
} from "./compositions/WorkshopPromo/schema";
import { WorkshopPromo } from "./compositions/WorkshopPromo/WorkshopPromo";
// @new-composition-imports (scripts/new-composition.mjs inserts imports above this line)

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Showcase">
        <Composition
          id="WorkshopPromo"
          component={WorkshopPromo}
          schema={workshopPromoSchema}
          // Resolution, fps and scene lengths are props: calculateMetadata
          // derives the composition's size, fps and total duration from them.
          // Keep this object inline so Studio can save edits back to this file.
          defaultProps={{
            language: "ro",
            brandName: "IRONWORKS",
            website: "www.atelierul-tau.ro",
            email: "contact@atelierul-tau.ro",
            width: 1920,
            height: 1080,
            fps: 30,
            transitionSeconds: 0.7,
            sceneSeconds: {
              intro: 4.5,
              furniture: 5.5,
              structures: 5.5,
              custom: 5.5,
              technology: 6.5,
              outro: 5,
            },
            musicFile: "audio/music-bed.wav",
            musicVolume: 0.45,
            sfxEnabled: true,
            sfxVolume: 0.8,
            speed: 0.8,
          }}
          calculateMetadata={calculateWorkshopPromoMetadata}
          // Placeholders only; calculateMetadata overrides all four.
          width={VIDEO.width}
          height={VIDEO.height}
          fps={VIDEO.fps}
          durationInFrames={VIDEO.fps}
        />
      </Folder>
      {/* @new-composition-entries (scripts/new-composition.mjs inserts compositions above this line) */}
    </>
  );
};
