class CalmSoundEngine {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.gainNode.connect(filter);
      filter.connect(this.ctx.destination);

      // Warm harmonic chords (A2, E3, C#4 - tranquil warm golden ambient)
      const freqs = [110, 164.81, 220, 277.18];
      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);
        // Subtle detune for rich warmth
        osc.detune.setValueAtTime((i % 2 === 0 ? 3 : -3), this.ctx!.currentTime);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.setValueAtTime(0.25 / freqs.length, this.ctx!.currentTime);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode!);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      if (this.gainNode) {
        this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          this.oscillators = [];
          if (this.ctx && this.ctx.state !== 'closed') {
            this.ctx.close();
          }
          this.isPlaying = false;
        }, 1100);
      } else {
        this.isPlaying = false;
      }
    } catch {
      this.isPlaying = false;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const calmAudio = new CalmSoundEngine();
