"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Volume2, VolumeX } from "lucide-react";

type SoundKind = "move" | "success" | "miss" | "roll" | "tap" | "deal" | "accuse" | "reveal" | "round";
type AmbientKind = "raja-court";

type SoundContextValue = {
  enabled: boolean;
  ambient: AmbientKind | null;
  toggle: () => void;
  play: (kind: SoundKind) => void;
  startAmbient: (kind: AmbientKind) => void;
  stopAmbient: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const soundMap: Record<SoundKind, Array<{ delay: number; frequency: number; duration: number; gain: number; type: OscillatorType }>> = {
  move: [{ delay: 0, frequency: 320, duration: 0.08, gain: 0.07, type: "triangle" }],
  success: [
    { delay: 0, frequency: 520, duration: 0.09, gain: 0.06, type: "sine" },
    { delay: 0.08, frequency: 740, duration: 0.13, gain: 0.055, type: "sine" }
  ],
  miss: [{ delay: 0, frequency: 165, duration: 0.16, gain: 0.07, type: "sawtooth" }],
  roll: [
    { delay: 0, frequency: 420, duration: 0.06, gain: 0.055, type: "square" },
    { delay: 0.06, frequency: 280, duration: 0.07, gain: 0.05, type: "triangle" }
  ],
  tap: [{ delay: 0, frequency: 520, duration: 0.06, gain: 0.055, type: "triangle" }],
  deal: [
    { delay: 0, frequency: 392, duration: 0.07, gain: 0.055, type: "triangle" },
    { delay: 0.07, frequency: 523.25, duration: 0.07, gain: 0.055, type: "triangle" },
    { delay: 0.14, frequency: 659.25, duration: 0.09, gain: 0.05, type: "sine" }
  ],
  accuse: [
    { delay: 0, frequency: 146.83, duration: 0.12, gain: 0.08, type: "triangle" },
    { delay: 0.11, frequency: 220, duration: 0.09, gain: 0.055, type: "square" }
  ],
  reveal: [
    { delay: 0, frequency: 246.94, duration: 0.12, gain: 0.06, type: "triangle" },
    { delay: 0.11, frequency: 392, duration: 0.13, gain: 0.06, type: "sine" },
    { delay: 0.24, frequency: 783.99, duration: 0.18, gain: 0.05, type: "sine" }
  ],
  round: [
    { delay: 0, frequency: 196, duration: 0.14, gain: 0.06, type: "triangle" },
    { delay: 0.13, frequency: 293.66, duration: 0.16, gain: 0.055, type: "triangle" },
    { delay: 0.28, frequency: 392, duration: 0.22, gain: 0.052, type: "sine" }
  ]
};

type AmbientNodes = {
  interval: number;
  nodes: Array<OscillatorNode | GainNode | BiquadFilterNode>;
};

function getAudioContext(existing: AudioContext | null) {
  if (existing) return existing;
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
}

function playTone(audioContext: AudioContext, cue: { delay: number; frequency: number; duration: number; gain: number; type: OscillatorType }) {
  const start = audioContext.currentTime + cue.delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = cue.type;
  oscillator.frequency.setValueAtTime(cue.frequency, start);
  gain.gain.setValueAtTime(0.001, start);
  gain.gain.exponentialRampToValueAtTime(cue.gain, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, start + cue.duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + cue.duration + 0.02);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ambient, setAmbient] = useState<AmbientKind | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<AmbientNodes | null>(null);

  const stopAmbientNodes = useCallback(() => {
    if (ambientRef.current) {
      window.clearInterval(ambientRef.current.interval);
      for (const node of ambientRef.current.nodes) {
        if ("stop" in node) {
          try {
            node.stop();
          } catch {
            // Already stopped by browser cleanup.
          }
        }
        node.disconnect();
      }
      ambientRef.current = null;
    }
  }, []);

  const stopAmbient = useCallback(() => {
    stopAmbientNodes();
    setAmbient(null);
  }, [stopAmbientNodes]);

  useEffect(() => {
    return () => {
      stopAmbientNodes();
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, [stopAmbientNodes]);

  const ensureAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const audioContext = getAudioContext(audioContextRef.current);
    if (!audioContext) return null;
    audioContextRef.current = audioContext;
    if (audioContext.state === "suspended") void audioContext.resume();
    return audioContext;
  }, []);

  const play = useCallback(
    (kind: SoundKind) => {
      if (!enabled) return;
      const audioContext = ensureAudioContext();
      if (!audioContext) return;
      for (const cue of soundMap[kind]) playTone(audioContext, cue);
    },
    [enabled, ensureAudioContext]
  );

  const startAmbient = useCallback(
    (kind: AmbientKind) => {
      if (!enabled || ambientRef.current) return;
      const audioContext = ensureAudioContext();
      if (!audioContext) return;

      const filter = audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(620, audioContext.currentTime);
      filter.Q.setValueAtTime(0.4, audioContext.currentTime);
      filter.connect(audioContext.destination);

      const droneGain = audioContext.createGain();
      droneGain.gain.setValueAtTime(0.018, audioContext.currentTime);
      droneGain.connect(filter);

      const frequencies = [98, 196, 293.66];
      const oscillators = frequencies.map((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = index === 2 ? "sine" : "triangle";
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.detune.setValueAtTime(index * 4, audioContext.currentTime);
        oscillator.connect(droneGain);
        oscillator.start();
        return oscillator;
      });

      const interval = window.setInterval(() => {
        const cue = { delay: 0, frequency: 73.42, duration: 0.08, gain: 0.018, type: "triangle" as OscillatorType };
        playTone(audioContext, cue);
      }, 2600);

      ambientRef.current = { interval, nodes: [...oscillators, droneGain, filter] };
      setAmbient(kind);
    },
    [enabled, ensureAudioContext]
  );

  const toggle = useCallback(() => {
    if (enabled) {
      stopAmbientNodes();
      setAmbient(null);
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    }
    setEnabled(!enabled);
  }, [enabled, stopAmbientNodes]);

  const value = useMemo<SoundContextValue>(
    () => ({
      enabled,
      ambient,
      toggle,
      play,
      startAmbient,
      stopAmbient
    }),
    [ambient, enabled, play, startAmbient, stopAmbient, toggle]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useGameSound() {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      enabled: false,
      ambient: null,
      toggle: () => undefined,
      play: () => undefined,
      startAmbient: () => undefined,
      stopAmbient: () => undefined
    } satisfies SoundContextValue;
  }
  return context;
}

export function SoundToggle() {
  const { enabled, toggle } = useGameSound();
  return (
    <button
      type="button"
      onClick={toggle}
      className="focus-ring grid size-11 place-items-center rounded-lg border border-[rgba(240,179,91,0.28)] text-[#f8ecd4]"
      aria-label={enabled ? "Mute sound cues" : "Enable sound cues"}
      title={enabled ? "Mute sound cues" : "Enable sound cues"}
    >
      {enabled ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
    </button>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
