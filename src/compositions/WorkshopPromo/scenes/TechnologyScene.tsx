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
  LatheIcon,
  LiquidIcon,
  MillIcon,
  PlasmaIcon,
  PowderIcon,
  RollIcon,
  Sfx,
  SfxName,
  Stage,
  TapIcon,
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
  { Icon: MillIcon, sound: "clank" },
  { Icon: PowderIcon, sound: "whoosh" },
  { Icon: LiquidIcon, sound: "whoosh" },
  { Icon: RollIcon, sound: "clank" },
  { Icon: LatheIcon, sound: "sparks" },
  { Icon: TapIcon, sound: "blip" },
];

/** Two rows of five cards. */
const PER_ROW = 5;
const CARD_W = 304;
const CARD_H = 318;
const GAP = 28;
const ROW_GAP = 28;
const LEFT = (1920 - (PER_ROW * CARD_W + (PER_ROW - 1) * GAP)) / 2;
const TOP = 372;
/** When the card highlight sequence starts, and how long each card stays lit (seconds). */
const HIGHLIGHT_START = 1.8;
const HIGHLIGHT_LEN = 0.64;

export const TechnologyScene: React.FC<{ copy: Copy["technology"] }> = ({
  copy,
}) => {
  const frame = useCurrentFrame();
  const s = useSeconds();
  const PROCESSES = PROCESS_VISUALS.map((visual, i) => ({
    ...visual,
    ...copy.processes[i],
  }));

  const rail = useProgress(s(0.3), s(1.3));
  const highlightStart = s(HIGHLIGHT_START);
  const highlightLen = s(HIGHLIGHT_LEN);

  return (
    <AbsoluteFill>
      <Background sparks={24} seed="tech" />
      {/* Sound: each card's process sound fires when its highlight starts */}
      {PROCESSES.map(({ title, sound }, i) => (
        <Sfx
          key={title}
          name={sound}
          atSeconds={HIGHLIGHT_START + i * HIGHLIGHT_LEN}
          volume={0.4}
        />
      ))}
      <Stage>
        <div
          style={{
            position: "absolute",
            left: LEFT,
            top: 80,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Eyebrow text={copy.eyebrow} />
          <AnimatedTitle
            text={copy.title.text}
            fontSize={70}
            delay={s(0.15)}
            highlight={copy.title.highlight}
            style={{ maxWidth: 1640 }}
          />
        </div>

        {/* Thin rule between the title and the cards */}
        <svg
          width={1920}
          height={20}
          style={{ position: "absolute", left: 0, top: TOP - 40 }}
        >
          <DrawPath
            d={`M${LEFT} 10 H${1920 - LEFT}`}
            progress={rail}
            color={COLORS.line}
            width={2}
          />
        </svg>

        {PROCESSES.map(({ Icon, title, tag }, i) => {
          const row = Math.floor(i / PER_ROW);
          const col = i % PER_ROW;
          const delay = s(0.45) + i * s(0.07);
          const draw = progressBetween(frame, delay + s(0.15), delay + s(1));
          const ws = highlightStart + i * highlightLen;
          const active = interpolate(
            frame,
            [ws, ws + 5, ws + highlightLen - 3, ws + highlightLen + 4],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          // Once a card has had its turn it keeps a faint bronze edge.
          const done = frame > ws + highlightLen;
          return (
            <div
              key={title}
              style={{
                position: "absolute",
                left: LEFT + col * (CARD_W + GAP),
                top: TOP + row * (CARD_H + ROW_GAP),
              }}
            >
              <FadeUp delay={delay} distance={50}>
                <div
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    boxSizing: "border-box",
                    padding: "18px 20px 22px",
                    background: COLORS.panel,
                    border: `2px solid ${
                      active > 0.5
                        ? COLORS.accent
                        : done
                          ? COLORS.bronzeDark
                          : COLORS.line
                    }`,
                    boxShadow: `0 16px 50px ${COLORS.accent}${Math.round(
                      active * 70,
                    )
                      .toString(16)
                      .padStart(2, "0")}`,
                    transform: `translateY(${-10 * active}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 6,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 18,
                      fontFamily: FONTS.body,
                      fontWeight: 600,
                      fontSize: 16,
                      letterSpacing: "0.12em",
                      color:
                        active > 0.5 || done ? COLORS.accent : COLORS.steel,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Icon progress={draw} active={active > 0.5} size={150} />
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontWeight: 600,
                      fontSize: 25,
                      lineHeight: 1.2,
                      color: COLORS.text,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      fontFamily: FONTS.body,
                      fontWeight: 600,
                      fontSize: 14,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: active > 0.5 ? COLORS.accent : COLORS.steel,
                    }}
                  >
                    {tag}
                  </div>
                </div>
              </FadeUp>
            </div>
          );
        })}
      </Stage>
    </AbsoluteFill>
  );
};
