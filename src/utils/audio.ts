// Web Audio API Synthesizer for Magic Forest Caretaker Game
// Runs reliably in browser without any external audio asset dependencies!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!muted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.5);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // 8 musical scale chimes: Do Re Mi Fa Sol La Ti Do
  // Frequencies corresponding to C5, D5, E5, F5, G5, A5, B5, C6
  private chimeFreqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];

  public playChime(comboIndex: number) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const idx = Math.min(comboIndex % this.chimeFreqs.length, this.chimeFreqs.length - 1);
    const freq = this.chimeFreqs[idx];
    const now = this.ctx.currentTime;

    // Primary bell tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Harmonic overtone for glass bell sound
    const harmonicOsc = this.ctx.createOscillator();
    const harmonicGain = this.ctx.createGain();
    harmonicOsc.type = 'triangle';
    harmonicOsc.frequency.setValueAtTime(freq * 2.76, now); // Metallic glass overtone

    // Envelopes
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    harmonicGain.gain.setValueAtTime(0, now);
    harmonicGain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.95);
    harmonicOsc.start(now);
    harmonicOsc.stop(now + 0.45);
  }

  // Restaurant Magic Service Bell (清脆夸张的“叮！”上菜服务铃)
  public playBellDing() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const baseFreq = 2093; // High C7 bell chime

    // Primary bell strike
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, now);

    // High shimmer harmonic
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, now); // G7 fifth

    // Third harmonic for bright brass ring
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(baseFreq * 2.75, now);

    // Strike envelopes: quick 2ms attack, shimmering sustained ring
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.4, now + 0.003);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.25, now + 0.003);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    gain3.gain.setValueAtTime(0, now);
    gain3.gain.linearRampToValueAtTime(0.18, now + 0.002);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);

    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);

    osc3.connect(gain3);
    gain3.connect(this.ctx.destination);

    osc1.start(now);
    osc1.stop(now + 1.85);

    osc2.start(now);
    osc2.stop(now + 1.25);

    osc3.start(now);
    osc3.stop(now + 0.85);
  }

  // Correct fruit feed: playful pop + high sparkle
  public playFeedSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Pop sound
    const popOsc = this.ctx.createOscillator();
    const popGain = this.ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(320, now);
    popOsc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    popGain.gain.setValueAtTime(0.3, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    popOsc.connect(popGain);
    popGain.connect(this.ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.22);

    // Giggle twinkle chirp
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const chirpNow = this.ctx.currentTime;
      const chirpOsc = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();
      chirpOsc.type = 'triangle';
      chirpOsc.frequency.setValueAtTime(950, chirpNow);
      chirpOsc.frequency.linearRampToValueAtTime(1300, chirpNow + 0.1);
      chirpOsc.frequency.linearRampToValueAtTime(1600, chirpNow + 0.2);

      chirpGain.gain.setValueAtTime(0.18, chirpNow);
      chirpGain.gain.exponentialRampToValueAtTime(0.001, chirpNow + 0.25);

      chirpOsc.connect(chirpGain);
      chirpGain.connect(this.ctx.destination);
      chirpOsc.start(chirpNow);
      chirpOsc.stop(chirpNow + 0.26);
    }, 80);
  }

  // Comical Burp (超级大嗝) + Spring Boing + Wobble
  public playHiccupBurp() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Comical low vibration burp rumble
    const burpOsc = this.ctx.createOscillator();
    const burpGain = this.ctx.createGain();
    burpOsc.type = 'sawtooth';
    burpOsc.frequency.setValueAtTime(180, now);
    burpOsc.frequency.linearRampToValueAtTime(120, now + 0.1);
    burpOsc.frequency.linearRampToValueAtTime(240, now + 0.25);
    burpOsc.frequency.exponentialRampToValueAtTime(60, now + 0.6);

    // Low pass filter to make burp sound plump and comical
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    burpGain.gain.setValueAtTime(0, now);
    burpGain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    burpGain.gain.linearRampToValueAtTime(0.35, now + 0.35);
    burpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    burpOsc.connect(filter);
    filter.connect(burpGain);
    burpGain.connect(this.ctx.destination);

    burpOsc.start(now);
    burpOsc.stop(now + 0.7);

    // Spring boing effect
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const boingNow = this.ctx.currentTime;
      const boingOsc = this.ctx.createOscillator();
      const boingGain = this.ctx.createGain();
      boingOsc.type = 'sine';
      boingOsc.frequency.setValueAtTime(220, boingNow);
      boingOsc.frequency.exponentialRampToValueAtTime(750, boingNow + 0.18);
      boingOsc.frequency.exponentialRampToValueAtTime(320, boingNow + 0.4);

      boingGain.gain.setValueAtTime(0.25, boingNow);
      boingGain.gain.exponentialRampToValueAtTime(0.001, boingNow + 0.5);

      boingOsc.connect(boingGain);
      boingGain.connect(this.ctx.destination);
      boingOsc.start(boingNow);
      boingOsc.stop(boingNow + 0.52);
    }, 150);
  }

  // Safe pass ("好险"后怕/成功监测正向奖励)
  public playSafeRelief() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [783.99, 1046.50, 1318.51]; // G5, C6, E6 gentle uplift

    notes.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.16, now + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.45);
    });
  }

  // Full belly blast / beast swap fanfare
  public playBellyBurst() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C Major majestic arpeggio

    chords.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.06 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.25);
    });
  }

  // Victory fanfare
  public playVictoryFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const melody = [
      { f: 523.25, t: 0, d: 0.2 },
      { f: 659.25, t: 0.18, d: 0.2 },
      { f: 783.99, t: 0.36, d: 0.25 },
      { f: 1046.50, t: 0.58, d: 0.6 },
      { f: 880.00, t: 1.1, d: 0.2 },
      { f: 1046.50, t: 1.3, d: 0.9 },
    ];

    melody.forEach((item) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0, now + item.t);
      gain.gain.linearRampToValueAtTime(0.28, now + item.t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + item.t);
      osc.stop(now + item.t + item.d + 0.05);
    });
  }

  // Swipe swoosh sound
  public playSwipeSwoosh() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // No background humming/buzzing oscillator
  public startAmbient() {
    this.stopAmbient();
  }

  public stopAmbient() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
      } catch {
        // ignore
      }
      this.ambientOsc = null;
    }
  }
}

export const sound = new SoundEngine();
