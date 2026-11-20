const SOUND_KEY = 'op-doomsday:sound-enabled';
const CONTROL_SELECTOR = 'button, a[href], select, input[type="checkbox"], input[type="radio"], [role="button"], [data-action]:not([data-action="backdrop-click"])';
let soundEnabled = localStorage.getItem(SOUND_KEY) === 'true';
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let resuming: Promise<void> | null = null;
let userInteracted = false;

interface Note {
  frequency: number;
  endFrequency?: number;
  duration: number;
  delay?: number;
}

function isRunning(ctx: AudioContext): boolean {
  return ctx.state === 'running';
}

async function getAudioContext(): Promise<AudioContext | null> {
  if (!soundEnabled || !userInteracted) return null;
  if (!audioCtx || audioCtx.state === 'closed') {
    const AudioContextClass = window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) throw new Error('Este navegador não oferece suporte a áudio Web Audio.');
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);
  }
  const ctx = audioCtx;
  if (!isRunning(ctx)) {
    resuming ??= ctx.resume().finally(() => { resuming = null; });
    await resuming;
    if (!isRunning(ctx)) throw new Error('O navegador não liberou a reprodução de áudio.');
  }
  return ctx;
}

function reportAudioError(error: unknown): void {
  if (!soundEnabled) return;
  soundEnabled = false;
  localStorage.setItem(SOUND_KEY, 'false');
  if (audioCtx && masterGain) masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  console.error('Não foi possível reproduzir os efeitos 8-bit.', error);
  window.dispatchEvent(new CustomEvent('doomsday:audio-error'));
}

async function synthesize(notes: Note[], volume: number, type: OscillatorType): Promise<void> {
  const ctx = await getAudioContext();
  if (!ctx || !masterGain || !soundEnabled) return;
  masterGain.gain.setValueAtTime(1, ctx.currentTime);
  for (const note of notes) {
    const start = ctx.currentTime + 0.005 + (note.delay ?? 0);
    const end = start + note.duration;
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(note.frequency, start);
    if (note.endFrequency) oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, end);
    envelope.gain.setValueAtTime(0.001, start);
    envelope.gain.linearRampToValueAtTime(volume, start + 0.004);
    envelope.gain.exponentialRampToValueAtTime(0.001, end);
    oscillator.connect(envelope);
    envelope.connect(masterGain);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
    oscillator.start(start);
    oscillator.stop(end);
  }
}

function play(notes: Note[], volume = 0.075, type: OscillatorType = 'square'): void {
  void synthesize(notes, volume, type).catch(reportAudioError);
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

function silenceAudio(): void {
  if (audioCtx && masterGain) masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  localStorage.setItem(SOUND_KEY, String(soundEnabled));
  if (soundEnabled) {
    userInteracted = true;
    playCoinSound();
  } else {
    silenceAudio();
  }
  return soundEnabled;
}

export function playHoverSound(): void {
  play([{ frequency: 660, endFrequency: 880, duration: 0.045 }], 0.025, 'triangle');
}

export function playClickSound(): void {
  play([{ frequency: 880, endFrequency: 440, duration: 0.065 }], 0.055);
}

export function playCoinSound(): void {
  play([
    { frequency: 987.77, duration: 0.08 },
    { frequency: 1318.51, duration: 0.16, delay: 0.08 },
  ]);
}

export function playQuestCompleteSound(): void {
  play([523.25, 659.25, 783.99, 1046.5].map((frequency, index) => ({
    frequency, duration: 0.18, delay: index * 0.07,
  })));
}

export function playUndoSound(): void {
  play([{ frequency: 440, endFrequency: 160, duration: 0.15 }], 0.065, 'triangle');
}

export function playFanfareSound(): void {
  play([523.25, 659.25, 783.99, 1046.5].map((frequency, index) => ({
    frequency, duration: index === 3 ? 0.3 : 0.1, delay: index * 0.09,
  })));
}

export function playLevelUpSound(): void {
  play([
    { frequency: 392, duration: 0.09 },
    { frequency: 523.25, duration: 0.09, delay: 0.1 },
    { frequency: 659.25, duration: 0.09, delay: 0.2 },
    { frequency: 783.99, duration: 0.12, delay: 0.3 },
    { frequency: 987.77, duration: 0.09, delay: 0.42 },
    { frequency: 523.25, duration: 0.5, delay: 0.54 },
    { frequency: 659.25, duration: 0.5, delay: 0.54 },
    { frequency: 1046.5, duration: 0.5, delay: 0.54 },
  ], 0.055);
}

export function initAudioFeedback(): () => void {
  let lastHover = -Infinity;
  const unlock = () => {
    userInteracted = true;
    void getAudioContext().catch(reportAudioError);
  };
  const controlFor = (target: EventTarget | null): Element | null => {
    const control = target instanceof Element ? target.closest(CONTROL_SELECTOR) : null;
    return control?.closest(':disabled, [aria-disabled="true"]') ? null : control;
  };
  const hover = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const control = controlFor(event.target);
    if (!control || (event.relatedTarget instanceof Node && control.contains(event.relatedTarget))) return;
    const now = performance.now();
    if (now - lastHover < 80) return;
    lastHover = now;
    playHoverSound();
  };
  const focus = (event: FocusEvent) => {
    const control = controlFor(event.target);
    if (control?.matches(':focus-visible')) playHoverSound();
  };
  const click = (event: MouseEvent) => {
    const control = controlFor(event.target);
    if (!control || control.getAttribute('data-action') === 'toggle-sound') return;
    unlock();
    playClickSound();
  };

  document.addEventListener('pointerdown', unlock, true);
  document.addEventListener('keydown', unlock, true);
  document.addEventListener('pointerover', hover);
  document.addEventListener('focusin', focus);
  document.addEventListener('click', click, true);
  return () => {
    document.removeEventListener('pointerdown', unlock, true);
    document.removeEventListener('keydown', unlock, true);
    document.removeEventListener('pointerover', hover);
    document.removeEventListener('focusin', focus);
    document.removeEventListener('click', click, true);
  };
}
