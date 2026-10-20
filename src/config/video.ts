/**
 * Project-wide video defaults. Every composition starts from these values.
 *
 * - Change them here to affect all new compositions.
 * - Override per composition through its props (`width`, `height`, `fps`),
 *   in Remotion Studio's props panel, or on the CLI with
 *   `--props='{"fps":60}'`.
 *
 * Scenes are laid out on a fixed 1920x1080 design canvas (see <Stage>) and
 * scaled to the actual output size, so any resolution works.
 */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/** The reference canvas all layouts are designed on. */
export const DESIGN = {
  width: 1920,
  height: 1080,
} as const;
