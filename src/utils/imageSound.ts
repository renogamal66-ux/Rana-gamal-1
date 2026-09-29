/**
 * Interactive Audio Engine for Image Clicks & Sound Feedback
 * Built with standard Web Audio API for zero latency, offline reliability,
 * and warm, harmonic acoustic resonance matching the CORAM calm aesthetic.
 */

export type SoundProfile = 'portrait' | 'boxing' | 'medical' | 'rehab' | 'avatar' | 'pop' | 'escape';

// Harmonic frequencies on a tranquil healing scale (C, D, E, G, A, C)
const PENTATONIC_SCALE = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
let scaleNoteIndex = 0;

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a resonant, aesthetic sound synthesized live via Web Audio API.
 */
export function playImageSound(profile: SoundProfile = 'portrait') {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    switch (profile) {
      case 'boxing': {
        // High-energy athletic impact + deep sub-bass thump + swift air swoosh
        // 1. Sub-bass kick impact
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(160, now);
        subOsc.frequency.exponentialRampToValueAtTime(42, now + 0.28);

        subGain.gain.setValueAtTime(0.3, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.35);

        // 2. Athletic gloves kinetic snap (triangle wave snap)
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(380, now);
        snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

        snapGain.gain.setValueAtTime(0.18, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        snapOsc.connect(snapGain);
        snapGain.connect(ctx.destination);
        snapOsc.start(now);
        snapOsc.stop(now + 0.15);

        // 3. Resonant metallic championship bell ring
        const bellOsc = ctx.createOscillator();
        const bellGain = ctx.createGain();
        bellOsc.type = 'sine';
        bellOsc.frequency.setValueAtTime(880, now + 0.04);

        bellGain.gain.setValueAtTime(0.001, now);
        bellGain.gain.linearRampToValueAtTime(0.12, now + 0.05);
        bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        bellOsc.connect(bellGain);
        bellGain.connect(ctx.destination);
        bellOsc.start(now + 0.04);
        bellOsc.stop(now + 0.65);
        break;
      }

      case 'medical':
      case 'rehab': {
        // Futuristic Biometric Medical Sonar Ping + Harmonic Shimmer
        const baseFreq = profile === 'medical' ? 659.25 : 523.25; // E5 or C5

        const osc = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.25);

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(baseFreq * 2, now);
        oscHarmonic.frequency.linearRampToValueAtTime(baseFreq * 2.5, now + 0.1);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(filter);
        oscHarmonic.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + 0.75);
        oscHarmonic.stop(now + 0.75);
        break;
      }

      case 'avatar':
      case 'pop': {
        // Crisp tactile bubble pop / gentle wooden chime
        const note = PENTATONIC_SCALE[scaleNoteIndex % PENTATONIC_SCALE.length];
        scaleNoteIndex = (scaleNoteIndex + 1) % PENTATONIC_SCALE.length;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note * 1.4, now);
        osc.frequency.exponentialRampToValueAtTime(note, now + 0.07);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      case 'escape': {
        // Ethereal crystalline whisper arpeggio for words taking flight
        const freqs = [659.25, 783.99, 1046.5, 1318.5]; // E5, G5, C6, E6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const delay = idx * 0.055;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + delay);
          gain.gain.setValueAtTime(0.001, now + delay);
          gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + delay + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.48);
        });
        break;
      }

      case 'portrait':
      default: {
        // Elegant Zen Harmonic Chime & Warm Tibetan Crystal Bell
        // Cycles through pleasant pentatonic scale tones so repetitive clicks make music!
        const rootFreq = PENTATONIC_SCALE[scaleNoteIndex % PENTATONIC_SCALE.length];
        scaleNoteIndex = (scaleNoteIndex + 1) % PENTATONIC_SCALE.length;

        // Fundamental oscillator
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(rootFreq, now);

        // Fifth harmonic for sweet tranquil warmth
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(rootFreq * 1.5, now);

        // Octave shimmer
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(rootFreq * 2, now);

        gain1.gain.setValueAtTime(0.01, now);
        gain1.gain.linearRampToValueAtTime(0.18, now + 0.015);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        gain2.gain.setValueAtTime(0.01, now);
        gain2.gain.linearRampToValueAtTime(0.09, now + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        gain3.gain.setValueAtTime(0.005, now);
        gain3.gain.linearRampToValueAtTime(0.05, now + 0.02);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);

        gain1.connect(ctx.destination);
        gain2.connect(ctx.destination);
        gain3.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc3.start(now);

        osc1.stop(now + 0.95);
        osc2.stop(now + 0.75);
        osc3.stop(now + 0.55);
        break;
      }
    }
  } catch (err) {
    console.warn('Audio synthesis note:', err);
  }
}
