// Tiny Web Audio synth — no asset files. Created lazily on first use.
let ctx: AudioContext | null = null;
const get = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); }
    catch { return null; }
  }
  return ctx;
};

const tone = (freq: number, durationMs: number, type: OscillatorType = "sine", gain = 0.06) => {
  const ac = get(); if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + durationMs / 1000);
  osc.connect(g).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + durationMs / 1000);
};

export const sounds = {
  ding: () => { tone(880, 180, "sine"); setTimeout(() => tone(1320, 180, "sine"), 80); },
  whoosh: () => {
    const ac = get(); if (!ac) return;
    const osc = ac.createOscillator(); const g = ac.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ac.currentTime + 0.18);
    g.gain.setValueAtTime(0.04, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.2);
    osc.connect(g).connect(ac.destination);
    osc.start(); osc.stop(ac.currentTime + 0.22);
  },
  fanfare: () => {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 220, "triangle", 0.08), i * 130));
  },
  buzz: () => { tone(180, 200, "square", 0.05); },
};
