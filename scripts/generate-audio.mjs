#!/usr/bin/env node
/**
 * Synthesises the project's royalty-free soundtrack and sound effects as WAV
 * files in public/audio/. Everything is generated from code (no samples), and a
 * fixed seed makes the output identical on every run.
 *
 *   npm run audio
 *
 * Output:
 *   public/audio/music-bed.wav      industrial/cinematic bed, 96 BPM x VIDEO_SPEED,
 *                                   as long as the video (see VIDEO_SPEED below)
 *   public/audio/sfx/whoosh.wav     soft airy whoosh for scene transitions
 *   public/audio/sfx/impact.wav     deep cinematic boom for logo reveals, stamps
 *   public/audio/sfx/laser.wav      gentle rising shimmer for laser moments
 *   public/audio/sfx/sparks.wav     soft crackle + hiss for welding and fire
 *   public/audio/sfx/clank.wav      muted mechanical knock (bending, structures)
 *   public/audio/sfx/blip.wav       quiet wooden tick for chips and list items
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SR = 44100;
const TAU = Math.PI * 2;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const audioDir = path.join(root, "public", "audio");
const sfxDir = path.join(audioDir, "sfx");

/**
 * Keep in sync with the WorkshopPromo `speed` prop (src/Root.tsx). The music
 * bed is laid out on the video's design timeline (29 s at speed 1) and is
 * stretched to match: tempo and section changes slow down with the video.
 */
const VIDEO_SPEED = 0.8;
const DESIGN_LENGTH = 29;

// ---------------------------------------------------------------- helpers

/** Deterministic PRNG (mulberry32). */
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const stereo = (seconds) => {
  const n = Math.ceil(seconds * SR);
  return [new Float32Array(n), new Float32Array(n)];
};

/** One-pole low-pass; returns a stateful filter function. */
const lowpass = (fc) => {
  const a = 1 - Math.exp((-TAU * fc) / SR);
  let y = 0;
  return (x) => (y += a * (x - y));
};

/** One-pole high-pass. */
const highpass = (fc) => {
  const lp = lowpass(fc);
  return (x) => x - lp(x);
};

/** Chamberlin state-variable band-pass with a per-sample cutoff. */
const bandpass = () => {
  let low = 0;
  let band = 0;
  return (x, fc, damping = 0.7) => {
    const f = 2 * Math.sin((Math.PI * Math.min(fc, SR / 6)) / SR);
    low += f * band;
    const high = x - low - damping * band;
    band += f * high;
    return band;
  };
};

const writeWav = (file, [L, R], peakDb = -1) => {
  let peak = 1e-9;
  for (let i = 0; i < L.length; i++) {
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const gain = 10 ** (peakDb / 20) / peak;
  const n = L.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(2, 22); // stereo
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const l = Math.max(-1, Math.min(1, L[i] * gain));
    const r = Math.max(-1, Math.min(1, R[i] * gain));
    buf.writeInt16LE(Math.round(l * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(r * 32767), 46 + i * 4);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  console.log(
    `  ${path.relative(root, file)}  ${(n / SR).toFixed(2)}s  ${(buf.length / 1024).toFixed(0)} KB`,
  );
};

// ------------------------------------------------------------ music bed

const music = () => {
  // Real seconds = design seconds / speed.
  const real = (designSeconds) => designSeconds / VIDEO_SPEED;
  const dur = real(DESIGN_LENGTH) + 1;
  const bpm = 96 * VIDEO_SPEED;
  const beat = 60 / bpm;
  const bar = beat * 4;
  const drumsStart = bar; // drums enter after the logo reveal
  const drumsEnd = real(24.8); // drop out for the outro
  const [L, R] = stereo(dur);
  const noise = rng(11);

  // Am - F - C - G, one chord per bar.
  const CHORDS = [
    { bass: 55.0, pad: [220.0, 261.63, 329.63] },
    { bass: 43.65, pad: [174.61, 220.0, 261.63] },
    { bass: 65.41, pad: [261.63, 329.63, 392.0] },
    { bass: 49.0, pad: [196.0, 246.94, 293.66] },
  ];
  const CLANG = [
    [540, 0.5, 0.5],
    [1187, 0.3, 0.35],
    [1733, 0.2, 0.25],
    [2541, 0.12, 0.18],
  ];

  const padPh = [new Float64Array(3), new Float64Array(3)];
  let bassPh = 0;
  const padLp = [
    [lowpass(1300), lowpass(1300)],
    [lowpass(1300), lowpass(1300)],
  ];
  const bassLp = lowpass(260);
  const hatHp = highpass(7000);
  const snareBp = bandpass();

  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const chord = t >= drumsEnd ? CHORDS[0] : CHORDS[Math.floor(t / bar) % 4];
    const drums = t >= drumsStart && t < drumsEnd ? 1 : 0;

    const beatIdx = Math.floor(t / beat);
    const tb = t - beatIdx * beat;

    // Kick with pitch drop (phase computed analytically, no clicks).
    const kickEnv = drums * Math.exp(-tb / 0.18);
    const kick =
      kickEnv *
      Math.sin(TAU * (45 * tb + 105 * 0.03 * (1 - Math.exp(-tb / 0.03))));

    // Off-beat hats.
    const half = beat / 2;
    const hIdx = Math.floor(t / half);
    const th = t - hIdx * half;
    const n = noise() * 2 - 1;
    const hatRaw = hatHp(n);
    const hat = hIdx % 2 === 1 ? drums * hatRaw * Math.exp(-th / 0.03) : 0;

    // Snare on 2 and 4.
    const snareHit = beatIdx % 4 === 1 || beatIdx % 4 === 3;
    const snBody = snareBp(n, 1900, 0.9);
    const snare = snareHit
      ? drums *
        (snBody * Math.exp(-tb / 0.12) +
          0.4 * Math.sin(TAU * 185 * tb) * Math.exp(-tb / 0.05))
      : 0;

    // Metallic anvil clang every two bars.
    const tc = t % (bar * 2);
    let clang = 0;
    for (const [f, a, d] of CLANG) {
      clang += a * Math.sin(TAU * f * tc) * Math.exp(-tc / d);
    }
    clang *= drums;

    // Pulsing 8th-note bass.
    const te = t % half;
    bassPh = (bassPh + chord.bass / SR) % 1;
    const bassSaw = 2 * bassPh - 1;
    const bass =
      bassLp(bassSaw + 0.6 * Math.sin(TAU * bassPh)) *
      (0.35 + 0.65 * Math.exp(-te / 0.16)) *
      (drums ? 1 : 0.5);

    // Detuned saw pad (separate detune per channel for width).
    const pad = [0, 0];
    for (let ch = 0; ch < 2; ch++) {
      const detune = ch === 0 ? 0.9965 : 1.0035;
      let sum = 0;
      for (let v = 0; v < 3; v++) {
        padPh[ch][v] = (padPh[ch][v] + (chord.pad[v] * detune) / SR) % 1;
        sum += 2 * padPh[ch][v] - 1;
      }
      pad[ch] = padLp[ch][1](padLp[ch][0](sum / 3));
    }

    const drone =
      0.16 * Math.sin(TAU * 55 * t) + 0.06 * Math.sin(TAU * 82.41 * t);
    const swell = Math.min(1, t / real(2.2));
    const duck = 1 - 0.55 * kickEnv;
    const fadeOut = Math.min(1, (dur - t) / 3);

    const common =
      swell * (drone + duck * 0.5 * bass) + 0.95 * kick + 0.38 * snare;
    L[i] =
      fadeOut *
      Math.tanh(
        1.2 *
          (common + swell * duck * 0.42 * pad[0] + 0.12 * hat + 0.05 * clang),
      );
    R[i] =
      fadeOut *
      Math.tanh(
        1.2 *
          (common + swell * duck * 0.42 * pad[1] + 0.2 * hat + 0.035 * clang),
      );
  }
  return [L, R];
};

// ---------------------------------------------------------------- SFX
//
// Sound design goal: subtle, cinematic and "expensive" rather than cartoon-like.
// - no pitch glides or chirps (those read as game/UI cartoon sounds)
// - low, soft transients; bright content is filtered
// - every effect sits in a shared reverb so it has space and a natural tail

/**
 * Freeverb-style stereo reverb (8 damped combs + 4 all-passes per channel).
 * Returns a new, longer buffer: dry signal plus `wet` reverb with a `tail`.
 */
const reverb = (
  [L, R],
  { wet = 0.3, size = 0.84, damp = 0.45, tail = 1.5 } = {},
) => {
  const COMBS = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617];
  const ALLPASSES = [556, 441, 341, 225];
  const SPREAD = 23;
  const n = L.length + Math.ceil(tail * SR);
  const out = [new Float32Array(n), new Float32Array(n)];

  [L, R].forEach((input, ch) => {
    const offset = ch * SPREAD;
    const combs = COMBS.map((d) => ({
      buf: new Float32Array(d + offset),
      i: 0,
      store: 0,
    }));
    const aps = ALLPASSES.map((d) => ({
      buf: new Float32Array(d + offset),
      i: 0,
    }));
    for (let s = 0; s < n; s++) {
      const x = s < input.length ? input[s] : 0;
      const inGain = x * 0.015;
      let acc = 0;
      for (const c of combs) {
        const y = c.buf[c.i];
        c.store = y * (1 - damp) + c.store * damp;
        c.buf[c.i] = inGain + c.store * size;
        c.i = (c.i + 1) % c.buf.length;
        acc += y;
      }
      for (const a of aps) {
        const b = a.buf[a.i];
        a.buf[a.i] = acc + b * 0.5;
        acc = b - acc;
        a.i = (a.i + 1) % a.buf.length;
      }
      out[ch][s] = x + wet * acc;
    }
  });
  return out;
};

/** Smooth raised-cosine envelope helpers. */
const rise = (t, len) =>
  t >= len ? 1 : 0.5 - 0.5 * Math.cos((Math.PI * t) / len);

/** Transition whoosh: soft, airy, wide. Peaks ~0.55 s in (the video relies on that). */
const whoosh = () => {
  const dur = 1.4;
  const [L, R] = stereo(dur);
  const noise = rng(21);
  const bp = bandpass();
  const air = lowpass(320);
  const smooth = lowpass(5000);
  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const env = t < 0.55 ? rise(t, 0.55) : Math.exp(-(t - 0.55) / 0.22);
    const fc = 220 + 1300 * Math.sin(Math.PI * Math.min(1, t / 1.1)) ** 2;
    const n = noise() * 2 - 1;
    // High damping = broad, non-resonant band (no "whistle").
    const y = smooth(bp(n, fc, 1.5) * 0.9 + air(n) * 1.4) * env;
    const pan = 0.35 + 0.3 * Math.min(1, t / dur);
    L[i] = y * Math.cos((pan * Math.PI) / 2);
    R[i] = y * Math.sin((pan * Math.PI) / 2);
  }
  return reverb([L, R], { wet: 0.25, tail: 1 });
};

/** Logo / stamp hit: deep cinematic boom with a dark room tail, no metallic ring. */
const impact = () => {
  const dur = 1.6;
  const [L, R] = stereo(dur);
  const noise = rng(31);
  const thump = lowpass(380);
  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const attack = rise(t, 0.004);
    const sub =
      Math.sin(TAU * (40 * t + 30 * 0.12 * (1 - Math.exp(-t / 0.12)))) *
      Math.exp(-t / 0.75);
    const body = thump(noise() * 2 - 1) * Math.exp(-t / 0.09) * 2.2;
    const warmth = 0.18 * Math.sin(TAU * 98 * t) * Math.exp(-t / 0.35);
    const y = attack * (sub + body + warmth);
    L[i] = y;
    R[i] = y;
  }
  return reverb([L, R], { wet: 0.4, size: 0.86, damp: 0.6, tail: 2 });
};

/** Laser cue: a gentle airy shimmer sweeping upward, not a sci-fi "zap". */
const laser = () => {
  const dur = 1.2;
  const [L, R] = stereo(dur);
  const noise = rng(41);
  const bpL = bandpass();
  const bpR = bandpass();
  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const env = rise(t, 0.25) * Math.exp(-Math.max(0, t - 0.35) / 0.3);
    const fc = 1800 * Math.exp(t * 1.1);
    const shimmer =
      0.04 * (Math.sin(TAU * 3520 * t) + Math.sin(TAU * 3527 * t)) * env;
    L[i] = (bpL(noise() * 2 - 1, fc, 1.3) * 0.8 + shimmer) * env;
    R[i] = (bpR(noise() * 2 - 1, fc * 1.04, 1.3) * 0.8 + shimmer) * env;
  }
  return reverb([L, R], { wet: 0.35, tail: 1.2 });
};

/** Welding / fire: soft crackle over a quiet hiss, filtered so it never gets harsh. */
const sparks = () => {
  const dur = 1.4;
  const [L, R] = stereo(dur);
  const rand = rng(51);
  const hp = highpass(1400);
  const lp = lowpass(6500);
  const hissBp = bandpass();
  const noise = new Float32Array(L.length).map(() => lp(hp(rand() * 2 - 1)));
  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const hiss =
      hissBp(rand() * 2 - 1, 3500, 1.4) *
      0.12 *
      rise(t, 0.08) *
      Math.exp(-t / 0.6);
    L[i] += hiss;
    R[i] += hiss;
  }
  let t = 0;
  while (t < dur - 0.01) {
    const rate = 55 * Math.exp(-t / 0.5) + 6;
    t += -Math.log(1 - rand()) / rate;
    const start = Math.floor(t * SR);
    const len = Math.floor((0.0015 + rand() * 0.003) * SR);
    const amp = (0.2 + rand() * 0.5) * Math.exp(-t / 0.7);
    const pan = 0.25 + rand() * 0.5;
    for (let k = 0; k < len && start + k < L.length; k++) {
      const w = Math.sin((Math.PI * k) / len) ** 2; // Hann window: no hard clicks
      const v = noise[start + k] * amp * w;
      L[start + k] += v * (1 - pan);
      R[start + k] += v * pan;
    }
  }
  return reverb([L, R], { wet: 0.22, tail: 0.8 });
};

/** Mechanical "thock": a heavy, muted metal knock (bending, structures). */
const clank = () => {
  const dur = 0.8;
  const [L, R] = stereo(dur);
  const noise = rng(61);
  const knock = bandpass();
  const soften = lowpass(3200);
  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const attack = rise(t, 0.002);
    const thud = Math.sin(TAU * 120 * t) * Math.exp(-t / 0.07);
    const tap = knock(noise() * 2 - 1, 950, 1.1) * Math.exp(-t / 0.025) * 1.4;
    const ring =
      0.07 * Math.sin(TAU * 610 * t) * Math.exp(-t / 0.22) +
      0.04 * Math.sin(TAU * 1270 * t) * Math.exp(-t / 0.15);
    const y = soften(attack * (thud + tap + ring));
    L[i] = y;
    R[i] = y;
  }
  return reverb([L, R], { wet: 0.3, size: 0.8, tail: 1 });
};

/** UI tick: a short, soft wooden tick with a small room, no pitch movement. */
const blip = () => {
  const dur = 0.12;
  const [L, R] = stereo(dur);
  const noise = rng(71);
  const soften = lowpass(4500);
  for (let i = 0; i < L.length; i++) {
    const t = i / SR;
    const attack = rise(t, 0.0015);
    const y = soften(
      attack *
        (Math.sin(TAU * 880 * t) * Math.exp(-t / 0.018) +
          0.25 * Math.sin(TAU * 2200 * t) * Math.exp(-t / 0.007) +
          0.3 * (noise() * 2 - 1) * Math.exp(-t / 0.0015)),
    );
    L[i] = y;
    R[i] = y;
  }
  return reverb([L, R], { wet: 0.25, size: 0.7, tail: 0.5 });
};

// ----------------------------------------------------------------- main

console.log("Generating audio...");
writeWav(path.join(audioDir, "music-bed.wav"), music(), -1);
// Peak targets set the effects' relative loudness: big hits loud, ticks quiet.
writeWav(path.join(sfxDir, "whoosh.wav"), whoosh(), -4);
writeWav(path.join(sfxDir, "impact.wav"), impact(), -2);
writeWav(path.join(sfxDir, "laser.wav"), laser(), -8);
writeWav(path.join(sfxDir, "sparks.wav"), sparks(), -7);
writeWav(path.join(sfxDir, "clank.wav"), clank(), -5);
writeWav(path.join(sfxDir, "blip.wav"), blip(), -12);
console.log("Done.");
