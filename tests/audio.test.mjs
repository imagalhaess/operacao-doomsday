import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { setImmediate } from 'node:timers/promises';
import { createServer } from 'vite';

let server;
let sequence = 0;
const descriptors = new Map(['window', 'localStorage'].map((key) => [
  key, Object.getOwnPropertyDescriptor(globalThis, key),
]));

before(async () => {
  server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
});

after(async () => {
  await server?.close();
  for (const [key, descriptor] of descriptors) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
});

async function loadAudio({ enabled = false, rejectResume = false } = {}) {
  const saved = new Map([['op-doomsday:sound-enabled', String(enabled)]]);
  const contexts = [];
  let releaseResume;
  const resumeGate = new Promise((resolve) => { releaseResume = resolve; });
  const window = new EventTarget();
  class AudioContext {
    state = 'suspended';
    currentTime = 4;
    destination = {};
    oscillators = [];
    gains = [];
    constructor() { contexts.push(this); }
    async resume() {
      if (rejectResume) throw new Error('Audio permission denied');
      await resumeGate;
      this.state = 'running';
    }
    createGain() {
      const gain = {
        values: [],
        gain: {
          setValueAtTime: (value) => gain.values.push(value),
          linearRampToValueAtTime: (value) => gain.values.push(value),
          exponentialRampToValueAtTime: (value) => gain.values.push(value),
        },
        connect() {},
        disconnect() {},
      };
      this.gains.push(gain);
      return gain;
    }
    createOscillator() {
      const oscillator = {
        frequency: {
          setValueAtTime(value) { oscillator.pitch = value; },
          exponentialRampToValueAtTime() {},
        },
        connect() {},
        disconnect() {},
        start(time) { this.started = time; },
        stop(time) { this.stopped = time; },
      };
      this.oscillators.push(oscillator);
      return oscillator;
    }
  }
  window.AudioContext = AudioContext;
  Object.defineProperty(globalThis, 'window', { configurable: true, value: window });
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) },
  });
  const audio = await server.ssrLoadModule(`/src/utils/audio.ts?audio-test=${++sequence}`);
  return { audio, contexts, saved, releaseResume, window };
}

test('effects stay silent before opt-in and before the browser unlocking gesture', async () => {
  for (const enabled of [false, true]) {
    const { audio, contexts } = await loadAudio({ enabled });
    audio.playHoverSound();
    audio.playClickSound();
    audio.playLevelUpSound();
    await setImmediate();
    assert.equal(contexts.length, 0);
  }
});

test('enabling sound waits for resume before scheduling audible effects', async () => {
  const { audio, contexts, releaseResume } = await loadAudio();
  assert.equal(audio.toggleSound(), true);
  assert.equal(contexts.length, 1);
  assert.equal(contexts[0].oscillators.length, 0);
  releaseResume();
  await setImmediate();
  const ctx = contexts[0];
  assert.equal(ctx.state, 'running');
  assert.equal(ctx.oscillators.length, 2);
  const baseline = ctx.oscillators.length;
  audio.playHoverSound();
  audio.playClickSound();
  await setImmediate();
  assert.equal(ctx.oscillators.length, baseline + 2);
  for (const oscillator of ctx.oscillators) assert.ok(oscillator.stopped > oscillator.started);
  assert.ok(ctx.gains.some((gain) => gain.values.some((value) => value > 0.01)));
});

test('muting silences the master output immediately and cancels pending effects', async () => {
  const { audio, contexts, releaseResume, saved } = await loadAudio();
  audio.toggleSound();
  audio.playLevelUpSound();
  audio.toggleSound();
  assert.equal(contexts[0].gains[0].values.at(-1), 0);
  releaseResume();
  await setImmediate();
  assert.equal(contexts[0].oscillators.length, 0);
  audio.playHoverSound();
  audio.playClickSound();
  audio.playLevelUpSound();
  await setImmediate();
  assert.equal(contexts[0].oscillators.length, 0);
  assert.equal(saved.get('op-doomsday:sound-enabled'), 'false');
});

test('level-up fanfare waits for audio activation and schedules a short ascending cue with a final chord', async () => {
  const { audio, contexts, releaseResume } = await loadAudio();
  audio.toggleSound();
  audio.playLevelUpSound();
  assert.equal(contexts[0].oscillators.length, 0);
  releaseResume();
  await setImmediate();
  const notes = contexts[0].oscillators.slice(2);
  assert.ok(notes.length > 4);
  for (let index = 1; index < 5; index++) assert.ok(notes[index].pitch > notes[index - 1].pitch);
  assert.ok(notes[1].started > notes[0].started);
  assert.ok(notes[2].started > notes[1].started);
  assert.equal(notes.at(-1).started, notes.at(-2).started);
  assert.equal(notes.at(-2).started, notes.at(-3).started);
  assert.ok(notes.at(-1).stopped > notes.at(-1).started + 0.2);
  assert.ok(Math.max(...notes.map(note => note.stopped)) - notes[0].started < 1.5);
  audio.toggleSound();
  assert.equal(contexts[0].gains[0].values.at(-1), 0);
});

test('blocked audio reports an error instead of leaving a false sound-on state', async () => {
  const { audio, window, saved } = await loadAudio({ rejectResume: true });
  let failures = 0;
  window.addEventListener('doomsday:audio-error', () => { failures++; });
  const original = console.error;
  const errors = [];
  console.error = (...args) => errors.push(args);
  try {
    audio.toggleSound();
    await setImmediate();
    assert.equal(audio.isSoundEnabled(), false);
    assert.equal(failures, 1);
    assert.equal(errors.length, 1);
    assert.equal(saved.get('op-doomsday:sound-enabled'), 'false');
  } finally {
    console.error = original;
  }
});
