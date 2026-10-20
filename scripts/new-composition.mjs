#!/usr/bin/env node
/**
 * Scaffold a new composition and register it in src/Root.tsx.
 *
 *   npm run new -- ProductLaunch
 *   npm run new -- ProductLaunch --seconds=8
 *
 * Creates src/compositions/<Name>/<Name>.tsx from a starter scene that already
 * uses the project's Stage, Background, AnimatedTitle and timing helpers.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith("--"));
const secondsArg = args.find((a) => a.startsWith("--seconds="));
const seconds = secondsArg ? Number(secondsArg.split("=")[1]) : 6;

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(
    "Usage: npm run new -- <PascalCaseName> [--seconds=6]\n" +
      "Composition names must be PascalCase letters/digits (used as the composition id).",
  );
  process.exit(1);
}
if (!Number.isFinite(seconds) || seconds <= 0) {
  console.error("--seconds must be a positive number");
  process.exit(1);
}

const dir = path.join(root, "src", "compositions", name);
const file = path.join(dir, `${name}.tsx`);
if (fs.existsSync(file)) {
  console.error(`${path.relative(root, file)} already exists.`);
  process.exit(1);
}

const component = `import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedTitle, Background, Eyebrow, FadeUp, Stage } from "../../components";
import { COLORS, FONTS } from "../../theme";
import { useSeconds } from "../../utils/timing";

/** Length of this composition in seconds. */
export const ${name}Seconds = ${seconds};

export const ${name}: React.FC = () => {
  const s = useSeconds();
  return (
    <AbsoluteFill>
      <Background sparks={20} seed="${name}" />
      <Stage>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <Eyebrow text="New composition" />
          <AnimatedTitle text="${name}" fontSize={140} delay={s(0.2)} />
          <FadeUp delay={s(0.9)}>
            <div style={{ fontFamily: FONTS.body, fontSize: 36, color: COLORS.steel }}>
              Edit src/compositions/${name}/${name}.tsx
            </div>
          </FadeUp>
        </AbsoluteFill>
      </Stage>
    </AbsoluteFill>
  );
};
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, component);

const rootFile = path.join(root, "src", "Root.tsx");
let rootSrc = fs.readFileSync(rootFile, "utf8");
const importMarker = "// @new-composition-imports";
const entryMarker = "{/* @new-composition-entries";
if (!rootSrc.includes(importMarker) || !rootSrc.includes(entryMarker)) {
  console.error("Could not find the @new-composition markers in src/Root.tsx.");
  process.exit(1);
}

rootSrc = rootSrc.replace(
  importMarker,
  `import { ${name}, ${name}Seconds } from "./compositions/${name}/${name}";\n${importMarker}`,
);
const entry = `<Composition
        id="${name}"
        component={${name}}
        width={VIDEO.width}
        height={VIDEO.height}
        fps={VIDEO.fps}
        durationInFrames={Math.round(${name}Seconds * VIDEO.fps)}
      />
      `;
rootSrc = rootSrc.replace(entryMarker, entry + entryMarker);
fs.writeFileSync(rootFile, rootSrc);

console.log(
  `Created ${path.relative(root, file)} and registered "${name}" in src/Root.tsx`,
);
console.log(`Preview:  npm run dev`);
console.log(`Render:   npx remotion render ${name} out/${name}.mp4`);
