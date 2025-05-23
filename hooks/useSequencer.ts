import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import createSequence from "@lib/createSequence";
import { initSteps8, initSteps16 } from "@lib/initSteps";
import { createInstruments } from "@lib/createInstruments";
import { Instrument, sampleData, StepsGrid } from "@types";

export default function useSequencer(stepCount: 8 | 16, preset: sampleData[]) {
  // Ensure a preset is provided
  if (preset.length === 0) {
    throw new Error("No instruments provided");
  }

  //==========Page state==========//
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  //==============================//

  //========Sequence state========//
  const masterSequence = useRef<Tone.Sequence<any> | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepsGrid, setStepsGrid] = useState<StepsGrid>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  //==============================//

  /*
   * On a preset change:
   * - Create the instruments from the sampleData
   * - Initialise an empty step grid
   * - Change the loading state when complete
   */
  useEffect(() => {
    // Create the instruments based on the provided preset
    const instruments = createInstruments(preset);

    // Initialise the grid based on the number of instruments
    // and the step count
    setStepsGrid(
      Array(instruments.length)
        .fill(null)
        .map(() => (stepCount === 8 ? initSteps8() : initSteps16())),
    );
    setInstruments([...instruments]);
    setIsLoading(false);
    return () => {
      instruments.forEach((inst) => inst.sampler.dispose());
    };
  }, [preset]);

  /*
   * Update the sequence if:
   * - A play/pause occurs
   * - The step grid changes
   * - The instruments change
   */
  useEffect(() => {
    if (isPlaying) {
      createSequence(
        masterSequence,
        setStepIndex,
        stepsGrid,
        instruments,
        stepCount,
      );
    }
    return () => {
      masterSequence.current?.dispose();
    };
  }, [isPlaying, stepsGrid, instruments]);

  const handlePlayPause = async () => {
    if (Tone.getContext().state !== "running") {
      Tone.setContext(new Tone.Context({ latencyHint: "playback" }));
      await Tone.start();
    }

    setIsPlaying((prev) => {
      if (!prev) Tone.getTransport().start();
      else {
        Tone.getTransport().stop();
        setStepIndex(0);
      }
      return !prev;
    });
  };

  const handleClearSequence = () => {
    setStepsGrid(
      Array(instruments.length)
        .fill(null)
        .map(() => (stepCount === 8 ? initSteps8() : initSteps16())),
    );
  };

  return {
    isLoading,
    isPlaying,
    stepIndex,
    stepsGrid,
    setStepsGrid,
    instruments,
    handlePlayPause,
    handleClearSequence,
  };
}
