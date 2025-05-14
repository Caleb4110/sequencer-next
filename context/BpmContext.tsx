"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Tone from "tone";

type BpmContextType = {
  bpm: number;
  setBpm: (bpm: number) => void;
};

// The bpm context determines the tempo for the sequencer
export const BpmContext = createContext<BpmContextType | null>(null);

// And automatically changes the ToneJS bpm accordingly
export const BpmProvider = ({ children }: { children: ReactNode }) => {
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  return (
    <BpmContext.Provider value={{ bpm, setBpm }}>
      {children}
    </BpmContext.Provider>
  );
};

export const useBpm = (): BpmContextType => {
  const context = useContext(BpmContext);
  if (!context) {
    throw new Error("useBpm must be used within a BpmProvider");
  }
  return context;
};
