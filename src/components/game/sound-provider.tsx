"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type SoundKind = "move" | "success" | "miss" | "roll" | "tap";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (kind: SoundKind) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const soundMap: Record<SoundKind, { frequency: number; duration: number; type: OscillatorType }> = {
  move: { frequency: 320, duration: 0.08, type: "triangle" },
  success: { frequency: 620, duration: 0.13, type: "sine" },
  miss: { frequency: 180, duration: 0.12, type: "sawtooth" },
  roll: { frequency: 420, duration: 0.1, type: "square" },
  tap: { frequency: 520, duration: 0.06, type: "triangle" }
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const value = useMemo<SoundContextValue>(
    () => ({
      enabled,
      toggle: () => setEnabled((current) => !current),
      play: (kind) => {
        if (!enabled || typeof window === "undefined") return;
        const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
        if (!AudioContextClass) return;
        const audioContext = new AudioContextClass();
        const cue = soundMap[kind];
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = cue.type;
        oscillator.frequency.value = cue.frequency;
        gain.gain.setValueAtTime(0.001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + cue.duration);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + cue.duration);
        window.setTimeout(() => audioContext.close(), (cue.duration + 0.05) * 1000);
      }
    }),
    [enabled]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useGameSound() {
  const context = useContext(SoundContext);
  if (!context) {
    return {
      enabled: false,
      toggle: () => undefined,
      play: () => undefined
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
