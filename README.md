# ✨ drewdrum ✨

### 🌸 https://andrewglassett.github.io/drewdrum/ 🌸

---

A browser-based drum synthesizer that is pink and has stickers on it. Built with the Web Audio API — no dependencies, no frameworks, just vibes and math.

## What is it

drewdrum is a 4-voice synthesized drum machine with a 16-step sequencer. Every sound is generated in real time from scratch using oscillators, noise, filters, and waveshapers. Nothing is sampled. It does not care about your DAW.

## The Instruments

**BD-1 & BD-2** — Two independently tunable bass drums. Each one is a sine oscillator with a pitch sweep envelope (starts high, falls to the fundamental) run through a soft-clip waveshaper. Knobs for Pitch, Attack, Decay, and Drive.

**CH** — Closed hi-hat. 909-style white noise filtered through two cascaded highpass filters with a bit of resonance to get that metallic zing. Knobs for Tone (filter frequency) and Decay.

**OH** — Open hi-hat. Same synthesis as CH but with a much longer decay and a slightly lower tone default. Lets you leave it ringing over the beat.

## The Sequencer

16 steps per instrument, four groups of four. Click a step to toggle it. The playhead shows where you are. Spacebar starts and stops.

## The Effects

All three effects live on the master bus and default to zero so they don't color your sound until you reach for them.

**Delay** — Time (defaults to a dotted eighth at 120 BPM), Feedback, and Mix. Goes last in the chain so it echoes the already-processed signal.

**Distortion** — Soft-clip waveshaper on the master bus. Subtle at low values, aggressive at high ones.

**Reverb** — Convolution reverb with a procedurally generated impulse response. Size controls the room decay (0.1s to 6s). Mix controls how wet it gets.

## Per-Channel Controls

Each instrument has a **Vol** knob, a **Mute** button, and a **Solo** button. Multiple channels can be soloed at once. Muted channels dim their sequencer row.

## Running Locally

```bash
node server.js
```

Opens at `http://localhost:3000`. The server watches for file changes and live-reloads the browser automatically.

## Tech

- Web Audio API (no libraries)
- Lookahead scheduler (100ms ahead, 25ms tick) for accurate timing
- `requestAnimationFrame` loop decoupled from audio for visual sync
- Single HTML file — the whole thing is `index.html`

---

*made with ✨ and Comic Sans*
