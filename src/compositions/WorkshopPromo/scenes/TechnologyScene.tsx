import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  AnimatedTitle,
  BendIcon,
  Background,
  DrawPath,
  Eyebrow,
  FadeUp,
  LaserCutIcon,
  PlasmaIcon,
  Sfx,
  SfxName,
  Stage,
  WeldIcon,
} from "../../../components";
import { COLORS, FONTS } from "../../../theme";
import { progressBetween, useProgress } from "../../../utils/animation";
import { useSeconds } from "../../../utils/timing";
import { Copy } from "../copy";

/** Icon and sound per process, in the same order as copy.technology.processes. */
const PROCESS_VISUALS: { Icon: typeof LaserCutIcon; sound: SfxName }[] = [
  { Icon: LaserCutIcon, sound: "laser" },
  { Icon: WeldIcon, sound: "sparks" },
  { Icon: PlasmaIcon, sound: "laser" },
  { Icon: BendIcon, sound: "clank" },
];

const CARD_W = 380;
const GAP = 40;
const LEFT = 140;
/** When the card highlight sequence starts, and how long each card stays lit (seconds). */
const HIGHLIGHT_START = 2;
const HIGHLIGHT_LEN = 1.05;

export const TechnologyScene: React.FC<{ copy: Copy["technology"] }> = ({
  copy,
}) => {
  const frame = useCurrentFrame();
  const s = useSeconds();
  const PROCESSES = PROCESS_VISUALS.map((visual, i) => ({
    ...visual,
    ...copy.processes[i],
  }));

  const rail = useProgress(s(0.4), s(1.6));
  const highlightStart = s(HIGHLIGHT_START);
  const highlightLen = s(HIGHLIGHT_LEN);
  const centers = PROCESSES.map(
    (_, i) => LEFT + i * (CARD_W + GAP) + CARD_W / 2,
  );
  const dotX = interpolate(
    frame,
    centers.flatMap((_, i) => [
      highlightStart + i * highlightLen,
      highlightStart + i * highlightLen + 8,
    ]),
    centers.flatMap((c) => [c, c]),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <Background sparks={24} seed="tech" />
      {/* Sound: each card's process sound fires when its highlight starts */}
      {PROCESSES.map(({ title, sound }, i) => (
        <Sfx
          key={title}
          name={sound}
          atSeconds={HIGHLIGHT_START + i * HIGHLIGHT_LEN}
          volume={0.55}
        />
      ))}
      <Stage>
        <div
          style={{
            position: "absolute",
            left: LEFT,
            top: 90,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Eyebrow text={copy.eyebrow} />
          <AnimatedTitle
            text={copy.title.text}
            fontSize={74}
            delay={s(0.15)}
            highlight={copy.title.highlight}
            style={{ maxWidth: 1640 }}
          />
        </div>

        <svg
          width={1920}
          height={40}
          style={{ position: "absolute", left: 0, top: 380 }}
        >
          <DrawPath
            d={`M${centers[0]} 20 H${centers[centers.length - 1]}`}
            progress={rail}
            color={COLORS.line}
            width={3}
          />
          {centers.map((c, i) => (
            <circle
              key={c}
              cx={c}
              cy={20}
              r={8}
              fill={COLORS.panelLight}
              stroke={COLORS.steel}
              strokeWidth={2}
              opacity={progressBetween(frame, s(0.5) + i * 4, s(0.8) + i * 4)}
            />
          ))}
          <circle
            cx={dotX}
            cy={20}
            r={11}
            fill={COLORS.accent}
            opacity={progressBetween(frame, highlightStart - 6, highlightStart)}
            style={{ filter: `drop-shadow(0 0 10px ${COLORS.accent})` }}
          />
        </svg>

        <div
          style={{
            position: "absolute",
            left: LEFT,
            top: 440,
            display: "flex",
            gap: GAP,
          }}
        >
          {PROCESSES.map(({ Icon, title, detail, tag }, i) => {
            const delay = s(0.6) + i * s(0.15);
            const draw = progressBetween(frame, delay + s(0.2), delay + s(1.2));
            const ws = highlightStart + i * highlightLen;
            const active = interpolate(
              frame,
              [ws, ws + 6, ws + highlightLen - 4, ws + highlightLen + 4],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            return (
              <FadeUp key={title} delay={delay} distance={60}>
                <div
                  style={{
                    width: CARD_W,
                    height: 500,
                    boxSizing: "border-box",
                    padding: "36px 34px",
                    background: COLORS.panel,
                    border: `2px solid ${active > 0.5 ? COLORS.accent : COLORS.line}`,
                    boxShadow: `0 20px 60px ${COLORS.accent}${Math.round(
                      active * 70,
                    )
                      .toString(16)
                      .padStart(2, "0")}`,
                    transform: `translateY(${-14 * active}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 14,
                  }}
                >
                  <Icon progress={draw} active={active > 0.5} size={210} />
                  <div
                    style={{
                      fontFamily: FONTS.heading,
                      fontWeight: 600,
                      fontSize: 32,
                      whiteSpace: "nowrap",
                      textTransform: "uppercase",
                      color: COLORS.text,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 23,
                      lineHeight: 1.35,
                      color: COLORS.steel,
                    }}
                  >
                    {detail}
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      fontFamily: FONTS.body,
                      fontWeight: 600,
                      fontSize: 18,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: active > 0.5 ? COLORS.accent : COLORS.steel,
                    }}
                  >
                    {tag}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Stage>
    </AbsoluteFill>
  );
};
