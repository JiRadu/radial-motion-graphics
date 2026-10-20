import { z } from "zod";
import { CalculateMetadataFunction } from "remotion";
import { seriesDuration } from "../../utils/timing";
import { LANGUAGES } from "./copy";

/**
 * Props for the WorkshopPromo composition. All of them are editable in
 * Remotion Studio's props panel and via `--props` on the CLI.
 */
export const workshopPromoSchema = z.object({
  /** On-screen text language; the texts themselves live in copy.ts. */
  language: z.enum(LANGUAGES),
  brandName: z.string(),
  website: z.string(),
  email: z.string(),
  width: z.number().int().min(16),
  height: z.number().int().min(16),
  fps: z.number().int().min(1).max(120),
  /** Overlap between consecutive scenes. */
  transitionSeconds: z.number().min(0.1).max(2),
  /** Length of each scene in seconds; the total duration is derived from these. */
  sceneSeconds: z.object({
    intro: z.number().min(1),
    furniture: z.number().min(1),
    structures: z.number().min(1),
    custom: z.number().min(1),
    technology: z.number().min(1),
    outro: z.number().min(1),
  }),
  /** File inside public/, e.g. "audio/music-bed.wav". Empty = no music. */
  musicFile: z.string(),
  musicVolume: z.number().min(0).max(1),
  /** Whooshes, impacts, laser, sparks and UI blips synced to the animation. */
  sfxEnabled: z.boolean(),
  sfxVolume: z.number().min(0).max(1),
  /**
   * Playback speed of the whole animation (1 = normal, 0.8 = 80%).
   * Scene lengths, transitions and SFX cues stretch with it; the output fps
   * does not change. Regenerate the music (`npm run audio`) after changing it
   * so the music bed matches the new length.
   */
  speed: z.number().min(0.25).max(2),
});

export type WorkshopPromoProps = z.infer<typeof workshopPromoSchema>;

// Default prop values live inline in src/Root.tsx so Remotion Studio can save
// edits from its props panel back to the file.

export const workshopPromoDuration = (props: WorkshopPromoProps) =>
  seriesDuration(
    Object.values(props.sceneSeconds),
    props.transitionSeconds,
    // Same design-seconds -> real-frames conversion the scenes use.
    props.fps / props.speed,
  );

/** Derives size, fps and duration from props so they can be changed in one place. */
export const calculateWorkshopPromoMetadata: CalculateMetadataFunction<
  WorkshopPromoProps
> = ({ props }) => ({
  width: props.width,
  height: props.height,
  fps: props.fps,
  durationInFrames: workshopPromoDuration(props),
});
